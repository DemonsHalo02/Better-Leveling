// Authentication & User Profile Store
// Works both in offline/demo mode and with connected Supabase account

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
  heightCm: 175,
  startingWeightKg: 75.0,
  targetWeightKg: 70.0,
  goal: 'fat_loss',
  activityLevel: 'moderate',
  calisthenicsTier: 'beginner',
  macroGoals: {
    calories: 2100,
    protein: 160,
    carbs: 210,
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
      isSupabaseConfigured: false,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const supabase = getSupabase();

        if (!supabase) {
          // If Supabase not connected, log in as local user
          set({
            user: { ...get().user, email, displayName: email.split('@')[0] },
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;

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
              heightCm: Number(profileData?.height_cm) || 175,
              startingWeightKg: Number(profileData?.starting_weight_kg) || 75,
              targetWeightKg: Number(profileData?.target_weight_kg) || 70,
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
            email,
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

            // Save to profiles table
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              display_name: newProfile.displayName,
              macro_goals: newProfile.macroGoals,
              calisthenics_tier: newProfile.calisthenicsTier,
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
              height_cm: updated.heightCm,
              starting_weight_kg: updated.startingWeightKg,
              target_weight_kg: updated.targetWeightKg,
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
            set({
              isAuthenticated: true,
              isSupabaseConfigured: true,
            });
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
