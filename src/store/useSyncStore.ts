// Multi-Device Cloud Synchronization Engine
// Coordinates dual-layer sync: Local Zustand Store <-> Supabase PostgreSQL

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SyncState, LoggedMealItem, WeightEntry, LoggedWorkoutSession, FoodItem } from '../types';
import { getSupabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';
import { useNutritionStore } from './useNutritionStore';
import { useWeightStore } from './useWeightStore';
import { useWorkoutStore } from './useWorkoutStore';

interface SyncStoreState extends SyncState {
  isAutoSyncEnabled: boolean;
  syncNow: () => Promise<{ success: boolean; message: string }>;
  triggerAutoSync: (delayMs?: number) => void;
  setAutoSync: (enabled: boolean) => void;
}

let autoSyncTimer: ReturnType<typeof setTimeout> | null = null;
let isSyncInProgress = false;
let queuedSyncScheduled = false;

export const triggerAutoSync = (delayMs = 1200) => {
  const store = useSyncStore.getState();
  const auth = useAuthStore.getState();

  if (!store.isAutoSyncEnabled || !auth.isAuthenticated || auth.user.id === 'local-athlete') {
    return;
  }

  useSyncStore.setState((s) => ({ pendingMutations: s.pendingMutations + 1 }));

  if (autoSyncTimer) {
    clearTimeout(autoSyncTimer);
  }

  autoSyncTimer = setTimeout(async () => {
    autoSyncTimer = null;
    await useSyncStore.getState().syncNow();
  }, delayMs);
};

export const useSyncStore = create<SyncStoreState>()(
  persist(
    (set, get) => ({
      status: 'offline',
      lastSyncedAt: null,
      pendingMutations: 0,
      errorMessage: undefined,
      isAutoSyncEnabled: true,

      setAutoSync: (enabled: boolean) => set({ isAutoSyncEnabled: enabled }),
      triggerAutoSync: (delayMs?: number) => triggerAutoSync(delayMs),

      syncNow: async () => {
        const supabase = getSupabase();
        const authUser = useAuthStore.getState().user;
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!supabase || !isAuthenticated || authUser.id === 'local-athlete') {
          set({
            status: 'offline',
            errorMessage: 'Not signed in to Supabase. Running in local offline mode.',
          });
          return {
            success: false,
            message: 'Running in offline mode. Sign in to sync across devices.',
          };
        }

        if (isSyncInProgress) {
          queuedSyncScheduled = true;
          return { success: true, message: 'Sync queued' };
        }

        isSyncInProgress = true;
        set({ status: 'syncing', errorMessage: undefined });

        try {
      const userId = authUser.id;

      // -----------------------------------------------------------
      // 1. SYNC PROFILE
      // -----------------------------------------------------------
      const { error: profileErr } = await supabase.from('profiles').upsert({
        id: userId,
        email: authUser.email,
        display_name: authUser.displayName,
        gender: authUser.gender,
        height_cm: Math.round((authUser.heightFeet * 12 + authUser.heightInches) * 2.54),
        starting_weight_kg: Number((authUser.startingWeightLbs / 2.20462).toFixed(2)),
        target_weight_kg: Number((authUser.targetWeightLbs / 2.20462).toFixed(2)),
        goal: authUser.goal,
        activity_level: authUser.activityLevel,
        calisthenics_tier: authUser.calisthenicsTier,
        macro_goals: authUser.macroGoals,
        updated_at: new Date().toISOString(),
      });
      if (profileErr) throw profileErr;

      // -----------------------------------------------------------
      // 2. SYNC WEIGHT ENTRIES
      // -----------------------------------------------------------
      const localWeights = useWeightStore.getState().entries;
      if (localWeights.length > 0) {
        const payload = localWeights.map((w) => ({
          id: w.id,
          user_id: userId,
          date: w.date,
          weight_kg: Number((w.weightLbs / 2.20462).toFixed(2)),
          note: w.note || null,
          created_at: w.createdAt,
        }));
        const { error: wErr } = await supabase.from('weight_logs').upsert(payload, { onConflict: 'user_id,date' });
        if (wErr) throw wErr;
      }

      // Fetch all remote weights
      const { data: remoteWeights } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', userId);

      if (remoteWeights && remoteWeights.length > 0) {
        const mappedRemote: WeightEntry[] = remoteWeights.map((rw) => ({
          id: rw.id,
          date: rw.date,
          weightLbs: rw.weight_lbs ? Number(rw.weight_lbs) : Number((Number(rw.weight_kg) * 2.20462).toFixed(1)),
          note: rw.note || undefined,
          createdAt: rw.created_at,
        }));
        useWeightStore.getState().replaceEntriesForSync(mappedRemote);
      }

      // -----------------------------------------------------------
      // 3. SYNC FOOD LOGS
      // -----------------------------------------------------------
      const localDailyLogs = useNutritionStore.getState().dailyLogs;
      const allLocalMealItems: (LoggedMealItem & { date: string })[] = [];

      for (const [date, items] of Object.entries(localDailyLogs)) {
        for (const item of items) {
          allLocalMealItems.push({ ...item, date });
        }
      }

      if (allLocalMealItems.length > 0) {
        const foodPayload = allLocalMealItems.map((item) => ({
          id: item.id,
          user_id: userId,
          date: item.date,
          meal_type: item.mealType,
          food_id: item.foodId,
          name: item.name,
          brand: item.brand || null,
          servings: item.servings,
          serving_size_grams: item.servingSizeGrams,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          logged_at: item.loggedAt,
        }));
        const { error: fErr } = await supabase.from('food_logs').upsert(foodPayload, { onConflict: 'id' });
        if (fErr) throw fErr;
      }

      // Fetch remote food logs
      const { data: remoteFoodLogs } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', userId);

      if (remoteFoodLogs && remoteFoodLogs.length > 0) {
        const groupedLogs: Record<string, LoggedMealItem[]> = {};
        for (const rf of remoteFoodLogs) {
          const item: LoggedMealItem = {
            id: rf.id,
            foodId: rf.food_id,
            name: rf.name,
            brand: rf.brand || undefined,
            mealType: rf.meal_type,
            servings: Number(rf.servings),
            servingSizeGrams: Number(rf.serving_size_grams),
            servingSizeOz: Number((Number(rf.serving_size_grams) / 28.35).toFixed(1)),
            calories: Number(rf.calories),
            protein: Number(rf.protein),
            carbs: Number(rf.carbs),
            fat: Number(rf.fat),
            loggedAt: rf.logged_at,
          };
          if (!groupedLogs[rf.date]) {
            groupedLogs[rf.date] = [];
          }
          groupedLogs[rf.date].push(item);
        }
        useNutritionStore.getState().replaceLogsForSync(groupedLogs);
      }

      // -----------------------------------------------------------
      // 4. SYNC WORKOUT SESSIONS
      // -----------------------------------------------------------
      const localHistory = useWorkoutStore.getState().history;
      if (localHistory.length > 0) {
        const workoutPayload = localHistory.map((s) => ({
          id: s.id,
          user_id: userId,
          date: s.date,
          day: s.day,
          intensity: s.intensity,
          focus_title: s.focusTitle,
          is_completed: s.isCompleted,
          exercise_logs: s.exerciseLogs,
          notes: s.notes || null,
          started_at: s.startedAt,
          completed_at: s.completedAt || null,
        }));
        const { error: woErr } = await supabase.from('workout_logs').upsert(workoutPayload, { onConflict: 'id' });
        if (woErr) throw woErr;
      }

      // Fetch remote workout logs
      const { data: remoteWorkouts } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', userId);

      if (remoteWorkouts && remoteWorkouts.length > 0) {
        const mappedWorkouts: LoggedWorkoutSession[] = remoteWorkouts.map((rw) => ({
          id: rw.id,
          date: rw.date,
          day: rw.day,
          intensity: rw.intensity,
          focusTitle: rw.focus_title,
          isCompleted: rw.is_completed,
          exerciseLogs: rw.exercise_logs,
          notes: rw.notes || undefined,
          programMode: rw.focus_title?.includes('Bladder') ? 'bladder_support' : undefined,
          startedAt: rw.started_at,
          completedAt: rw.completed_at || undefined,
        }));
        useWorkoutStore.getState().replaceHistoryForSync(mappedWorkouts);
      }

      // -----------------------------------------------------------
      // 5. SYNC CUSTOM FOODS
      // -----------------------------------------------------------
      const localCustomFoods = useNutritionStore.getState().customFoods;
      if (localCustomFoods.length > 0) {
        const customPayload = localCustomFoods.map((cf) => ({
          id: cf.id,
          user_id: userId,
          barcode: cf.barcode || null,
          name: cf.name,
          brand: cf.brand || null,
          serving_size_grams: cf.servingSizeGrams,
          serving_unit: cf.servingUnit,
          calories: cf.calories,
          protein: cf.protein,
          carbs: cf.carbs,
          fat: cf.fat,
          fiber: cf.fiber || null,
        }));
        const { error: cfErr } = await supabase.from('custom_foods').upsert(customPayload, { onConflict: 'id' });
        if (cfErr) throw cfErr;
      }

      const { data: remoteCustomFoods } = await supabase
        .from('custom_foods')
        .select('*')
        .eq('user_id', userId);

      if (remoteCustomFoods && remoteCustomFoods.length > 0) {
        const mappedCustom: FoodItem[] = remoteCustomFoods.map((rc) => ({
          id: rc.id,
          barcode: rc.barcode || undefined,
          name: rc.name,
          brand: rc.brand || undefined,
          servingSizeGrams: Number(rc.serving_size_grams),
          servingUnit: rc.serving_unit,
          calories: Number(rc.calories),
          protein: Number(rc.protein),
          carbs: Number(rc.carbs),
          fat: Number(rc.fat),
          fiber: rc.fiber ? Number(rc.fiber) : undefined,
          isCustom: true,
        }));
        useNutritionStore.getState().replaceCustomFoodsForSync(mappedCustom);
      }

      const syncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      set({
        status: 'synced',
        lastSyncedAt: syncTimestamp,
        pendingMutations: 0,
        errorMessage: undefined,
      });

      return { success: true, message: `Synced at ${syncTimestamp}` };
    } catch (err: unknown) {
      console.error('Sync failed:', err);
      const message = err instanceof Error ? err.message : 'Cloud synchronization failed';
      set({
        status: 'error',
        errorMessage: message,
      });
      return { success: false, message };
    } finally {
      isSyncInProgress = false;
      if (queuedSyncScheduled) {
        queuedSyncScheduled = false;
        setTimeout(() => {
          useSyncStore.getState().syncNow();
        }, 500);
      }
    }
  },
}),
{
  name: 'better_leveling_sync',
  partialize: (state) => ({
    isAutoSyncEnabled: state.isAutoSyncEnabled,
    lastSyncedAt: state.lastSyncedAt,
  }),
}
)
);
