// Authentication & User Profile Store (US Measurements: lbs, ft/in)
// Connects seamlessly to Supabase PostgreSQL & Auth with local-first persistence

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, GoalType, CalisthenicsIntensity, MacroGoals } from '../types';
import { getSupabase } from '../lib/supabase';
import { useSyncStore } from './useSyncStore';

interface AuthState {
  user: UserProfile;
  isAuthenticated: boolean;
  isSupabaseConfigured: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateMacroGoals: (macroGoals: MacroGoals) => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-athlete',
  email: 'athlete@betterleveling.local',
  displayName: 'Athlete',
  gender: 'other',
  heightFeet: 5,
  heightInches: 10,
  startingWeightLbs: 165.0,
  targetWeightLbs: 155.0,
  goal: 'fat_loss',
  activityLevel: 'moderate',
  calisthenicsTier: 'beginner',
  macroGoals: {
    calories: 2100,
    protein: 165,
    carbs: 215,
    fat: 65,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_PROFILE,
      isAuthenticated: false,
      isSupabaseConfigured: true,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const supabase = getSupabase();

        if (!supabase) {
          set({
            user: { ...get().user, email, displayName: email.split('@')[0] },
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
          if (error) {
            if (error.message.includes('Email not confirmed') || (error as { code?: string }).code === 'email_not_confirmed') {
              throw new Error(
                'Email not confirmed yet. Please check your email inbox to confirm, OR in your Supabase dashboard turn OFF "Confirm email" under Authentication -> Providers -> Email for instant login.'
              );
            }
            throw error;
          }

          if (data.user) {
            // Fetch profile from database
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            const currentUser = get().user;
            let heightFeet = currentUser.heightFeet || 5;
            let heightInches = currentUser.heightInches || 10;
            if (profileData?.height_cm) {
              const totalInches = Math.round(Number(profileData.height_cm) / 2.54);
              heightFeet = Math.floor(totalInches / 12) || 5;
              heightInches = totalInches % 12;
            }

            const startingWeightLbs = profileData?.starting_weight_kg
              ? Number((Number(profileData.starting_weight_kg) * 2.20462).toFixed(1))
              : currentUser.startingWeightLbs || 165.0;

            const targetWeightLbs = profileData?.target_weight_kg
              ? Number((Number(profileData.target_weight_kg) * 2.20462).toFixed(1))
              : currentUser.targetWeightLbs || 155.0;

            const updatedProfile: UserProfile = {
              id: data.user.id,
              email: data.user.email || email,
              displayName: profileData?.display_name || currentUser.displayName || email.split('@')[0],
              gender: profileData?.gender || currentUser.gender || 'other',
              heightFeet,
              heightInches,
              startingWeightLbs,
              targetWeightLbs,
              goal: (profileData?.goal as GoalType) || currentUser.goal || 'fat_loss',
              activityLevel: profileData?.activity_level || currentUser.activityLevel || 'moderate',
              calisthenicsTier: (profileData?.calisthenics_tier as CalisthenicsIntensity) || currentUser.calisthenicsTier || 'beginner',
              macroGoals: profileData?.macro_goals || currentUser.macroGoals,
              createdAt: profileData?.created_at || new Date().toISOString(),
              updatedAt: profileData?.updated_at || new Date().toISOString(),
            };

            set({
              user: updatedProfile,
              isAuthenticated: true,
              isSupabaseConfigured: true,
              isLoading: false,
            });
            // Automatically pull down cloud data on login
            useSyncStore.getState().syncNow().catch((e) => console.error('Initial login sync:', e));
            return { success: true };
          }
          set({ isLoading: false });
          return { success: false, error: 'User data not returned' };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Login failed';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      signUp: async (email: string, password: string, displayName?: string) => {
        set({ isLoading: true, error: null });
        const supabase = getSupabase();

        if (!supabase) {
          set({
            user: {
              ...get().user,
              email,
              displayName: displayName || email.split('@')[0],
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        }

        try {
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                display_name: displayName || email.split('@')[0],
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            const current = get().user;
            const newProfile: UserProfile = {
              ...current,
              id: data.user.id,
              email: data.user.email || email,
              displayName: displayName || current.displayName || email.split('@')[0],
            };

            // If session is null, Supabase requires email confirmation
            if (!data.session) {
              set({ isLoading: false });
              return {
                success: false,
                error: 'Account registered! Supabase email confirmation is currently enabled. Check your inbox to confirm, OR in your Supabase dashboard turn OFF "Confirm email" (Authentication -> Providers -> Email) to sign in immediately without waiting for emails.',
              };
            }

            // Save to profiles table using PostgreSQL schema columns
            const heightCm = Math.round(((newProfile.heightFeet || 5) * 12 + (newProfile.heightInches || 10)) * 2.54);
            const startKg = Number(((newProfile.startingWeightLbs || 165) / 2.20462).toFixed(2));
            const targetKg = Number(((newProfile.targetWeightLbs || 155) / 2.20462).toFixed(2));

            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              display_name: newProfile.displayName,
              gender: newProfile.gender || 'other',
              height_cm: heightCm,
              starting_weight_kg: startKg,
              target_weight_kg: targetKg,
              goal: newProfile.goal || 'fat_loss',
              activity_level: newProfile.activityLevel || 'moderate',
              calisthenics_tier: newProfile.calisthenicsTier || 'beginner',
              macro_goals: newProfile.macroGoals,
              updated_at: new Date().toISOString(),
            });

            set({
              user: newProfile,
              isAuthenticated: true,
              isSupabaseConfigured: true,
              isLoading: false,
            });
            // Automatically pull down/sync cloud data on account creation
            useSyncStore.getState().syncNow().catch((e) => console.error('Initial signup sync:', e));
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Registration incomplete' };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Registration failed';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      signOut: async () => {
        const supabase = getSupabase();
        if (supabase) {
          try {
            await supabase.auth.signOut();
          } catch (e) {
            console.error('Error signing out of Supabase:', e);
          }
        }
        set({
          isAuthenticated: false,
          user: {
            ...get().user,
            id: 'local-athlete',
          },
        });
        useSyncStore.setState({ status: 'offline', lastSyncedAt: null });
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        const updated = {
          ...get().user,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        set({ user: updated });

        const supabase = getSupabase();
        if (supabase && get().isAuthenticated && updated.id !== 'local-athlete') {
          try {
            const heightCm = Math.round(((updated.heightFeet || 5) * 12 + (updated.heightInches || 10)) * 2.54);
            const startKg = Number(((updated.startingWeightLbs || 165) / 2.20462).toFixed(2));
            const targetKg = Number(((updated.targetWeightLbs || 155) / 2.20462).toFixed(2));

            await supabase.from('profiles').upsert({
              id: updated.id,
              email: updated.email,
              display_name: updated.displayName,
              gender: updated.gender,
              height_cm: heightCm,
              starting_weight_kg: startKg,
              target_weight_kg: targetKg,
              goal: updated.goal,
              activity_level: updated.activityLevel,
              calisthenics_tier: updated.calisthenicsTier,
              macro_goals: updated.macroGoals,
              updated_at: updated.updatedAt,
            });
          } catch (err) {
            console.error('Failed to sync profile update to Supabase:', err);
          }
        }
        useSyncStore.getState().triggerAutoSync();
      },

      updateMacroGoals: async (macroGoals: MacroGoals) => {
        await get().updateProfile({ macroGoals });
      },

      checkSession: async () => {
        const supabase = getSupabase();
        if (!supabase) {
          set({ isSupabaseConfigured: false, isAuthenticated: false });
          return;
        }

        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('Session retrieval error:', error);
            set({ isAuthenticated: false });
            return;
          }

          if (data.session?.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .single();

            const currentUser = get().user;
            let heightFeet = currentUser.heightFeet || 5;
            let heightInches = currentUser.heightInches || 10;
            if (profileData?.height_cm) {
              const totalInches = Math.round(Number(profileData.height_cm) / 2.54);
              heightFeet = Math.floor(totalInches / 12) || 5;
              heightInches = totalInches % 12;
            }

            const startingWeightLbs = profileData?.starting_weight_kg
              ? Number((Number(profileData.starting_weight_kg) * 2.20462).toFixed(1))
              : currentUser.startingWeightLbs || 165.0;

            const targetWeightLbs = profileData?.target_weight_kg
              ? Number((Number(profileData.target_weight_kg) * 2.20462).toFixed(1))
              : currentUser.targetWeightLbs || 155.0;

            const updatedProfile: UserProfile = {
              ...currentUser,
              id: data.session.user.id,
              email: data.session.user.email || currentUser.email,
              displayName: profileData?.display_name || currentUser.displayName || data.session.user.email?.split('@')[0] || 'Athlete',
              gender: profileData?.gender || currentUser.gender || 'other',
              heightFeet,
              heightInches,
              startingWeightLbs,
              targetWeightLbs,
              goal: (profileData?.goal as GoalType) || currentUser.goal || 'fat_loss',
              activityLevel: profileData?.activity_level || currentUser.activityLevel || 'moderate',
              calisthenicsTier: (profileData?.calisthenics_tier as CalisthenicsIntensity) || currentUser.calisthenicsTier || 'beginner',
              macroGoals: profileData?.macro_goals || currentUser.macroGoals,
            };

            set({
              user: updatedProfile,
              isAuthenticated: true,
              isSupabaseConfigured: true,
            });
          } else {
            // No active session in Supabase Auth
            set({
              isAuthenticated: false,
              isSupabaseConfigured: true,
              user: {
                ...get().user,
                id: 'local-athlete',
              },
            });
          }
        } catch (err) {
          console.error('Session check error:', err);
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: 'better_leveling_auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
