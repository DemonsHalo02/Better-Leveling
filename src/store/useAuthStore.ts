// Authentication & User Profile Store (US Measurements: lbs, ft/in)
// Connects seamlessly to Supabase PostgreSQL & Auth with local-first persistence

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, GoalType, CalisthenicsIntensity, MacroGoals } from '../types';
import { getSupabase } from '../lib/supabase';

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

            const updatedProfile: UserProfile = {
              id: data.user.id,
              email: data.user.email || email,
              displayName: profileData?.display_name || email.split('@')[0],
              gender: profileData?.gender || 'other',
              heightFeet: Number(profileData?.height_feet) || 5,
              heightInches: Number(profileData?.height_inches) || 10,
              startingWeightLbs: Number(profileData?.starting_weight_lbs) || (profileData?.starting_weight_kg ? Number((profileData.starting_weight_kg * 2.20462).toFixed(1)) : 165.0),
              targetWeightLbs: Number(profileData?.target_weight_lbs) || (profileData?.target_weight_kg ? Number((profileData.target_weight_kg * 2.20462).toFixed(1)) : 155.0),
              goal: (profileData?.goal as GoalType) || 'fat_loss',
              activityLevel: profileData?.activity_level || 'moderate',
              calisthenicsTier: (profileData?.calisthenics_tier as CalisthenicsIntensity) || 'beginner',
              macroGoals: profileData?.macro_goals || get().user.macroGoals,
              createdAt: profileData?.created_at || new Date().toISOString(),
              updatedAt: profileData?.updated_at || new Date().toISOString(),
            };

            set({
              user: updatedProfile,
              isAuthenticated: true,
              isSupabaseConfigured: true,
              isLoading: false,
            });
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
            const newProfile: UserProfile = {
              ...get().user,
              id: data.user.id,
              email: data.user.email || email,
              displayName: displayName || email.split('@')[0],
            };

            // If session is null, Supabase requires email confirmation
            if (!data.session) {
              set({ isLoading: false });
              return {
                success: true,
                error: 'Account created! Please check your email to confirm, OR in your Supabase dashboard turn OFF "Confirm email" under Authentication -> Providers -> Email to log in immediately without confirmation.',
              };
            }

            // Save to profiles table
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              display_name: newProfile.displayName,
              macro_goals: newProfile.macroGoals,
              calisthenics_tier: newProfile.calisthenicsTier,
              height_feet: newProfile.heightFeet,
              height_inches: newProfile.heightInches,
              starting_weight_lbs: newProfile.startingWeightLbs,
              target_weight_lbs: newProfile.targetWeightLbs,
            });

            set({
              user: newProfile,
              isAuthenticated: true,
              isSupabaseConfigured: true,
              isLoading: false,
            });
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
          user: DEFAULT_PROFILE,
        });
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
            await supabase.from('profiles').upsert({
              id: updated.id,
              display_name: updated.displayName,
              gender: updated.gender,
              height_feet: updated.heightFeet,
              height_inches: updated.heightInches,
              starting_weight_lbs: updated.startingWeightLbs,
              target_weight_lbs: updated.targetWeightLbs,
              starting_weight_kg: Number((updated.startingWeightLbs / 2.20462).toFixed(1)),
              target_weight_kg: Number((updated.targetWeightLbs / 2.20462).toFixed(1)),
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
      },

      updateMacroGoals: async (macroGoals: MacroGoals) => {
        await get().updateProfile({ macroGoals });
      },

      checkSession: async () => {
        const supabase = getSupabase();
        if (!supabase) {
          set({ isSupabaseConfigured: false });
          return;
        }

        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .single();

            if (profileData) {
              set({
                user: {
                  ...get().user,
                  id: data.session.user.id,
                  email: data.session.user.email || get().user.email,
                  displayName: profileData.display_name || get().user.displayName,
                  heightFeet: Number(profileData.height_feet) || 5,
                  heightInches: Number(profileData.height_inches) || 10,
                  startingWeightLbs: Number(profileData.starting_weight_lbs) || (profileData.starting_weight_kg ? Number((profileData.starting_weight_kg * 2.20462).toFixed(1)) : 165.0),
                  targetWeightLbs: Number(profileData.target_weight_lbs) || (profileData.target_weight_kg ? Number((profileData.target_weight_kg * 2.20462).toFixed(1)) : 155.0),
                  goal: profileData.goal || get().user.goal,
                  calisthenicsTier: profileData.calisthenics_tier || get().user.calisthenicsTier,
                  macroGoals: profileData.macro_goals || get().user.macroGoals,
                },
                isAuthenticated: true,
                isSupabaseConfigured: true,
              });
            } else {
              set({
                isAuthenticated: true,
                isSupabaseConfigured: true,
              });
            }
          } else {
            set({ isSupabaseConfigured: true });
          }
        } catch (err) {
          console.error('Session check error:', err);
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
