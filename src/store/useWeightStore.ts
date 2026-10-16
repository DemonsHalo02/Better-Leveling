// Weight Store: Daily Weigh-in Logger, Exponential Moving Average Trend & Smart Expenditure Sync (US Units: lbs)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeightEntry, WeightAnalyticsPoint, ExpenditureReport } from '../types';
import { calculateWeightTrend, calculateSmartExpenditure } from '../lib/algorithms';
import { getTodayDateString } from './useNutritionStore';
import { getSupabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';
import { triggerAutoSync } from './useSyncStore';

interface WeightState {
  entries: WeightEntry[];

  // Actions
  addWeightEntry: (weightLbs: number, date?: string, note?: string) => WeightEntry;
  deleteWeightEntry: (id: string) => void;
  getWeightTrend: () => WeightAnalyticsPoint[];
  getLatestWeight: () => { raw: number; trend: number; date: string } | null;
  getExpenditureReport: (dailyCaloriesMap: Record<string, number>) => ExpenditureReport;
  replaceEntriesForSync: (entries: WeightEntry[]) => void;
}

// Initial realistic starter data in lbs
const INITIAL_ENTRIES: WeightEntry[] = [
  {
    id: 'w-init-1',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    weightLbs: 167.2,
    note: 'Initial weigh-in',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'w-init-2',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    weightLbs: 166.4,
    note: 'Fasted morning',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'w-init-3',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    weightLbs: 165.8,
    note: 'Post workout',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'w-init-4',
    date: getTodayDateString(),
    weightLbs: 165.2,
    note: 'Morning weigh-in',
    createdAt: new Date().toISOString(),
  },
];

export const useWeightStore = create<WeightState>()(
  persist(
    (set, get) => ({
      entries: INITIAL_ENTRIES,

      addWeightEntry: (weightLbs, targetDate, note) => {
        const date = targetDate || getTodayDateString();
        const existingIndex = get().entries.findIndex((e) => e.date === date);

        const newEntry: WeightEntry = {
          id: existingIndex >= 0 ? get().entries[existingIndex].id : `weight-${Date.now()}`,
          date,
          weightLbs: Number(weightLbs.toFixed(1)),
          note,
          createdAt: new Date().toISOString(),
        };

        let updatedEntries: WeightEntry[];
        if (existingIndex >= 0) {
          updatedEntries = [...get().entries];
          updatedEntries[existingIndex] = newEntry;
        } else {
          updatedEntries = [...get().entries, newEntry];
        }

        // Sort descending by date
        updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        set({ entries: updatedEntries });
        triggerAutoSync();
        return newEntry;
      },

      deleteWeightEntry: (id) => {
        set({
          entries: get().entries.filter((e) => e.id !== id),
        });

        // Delete from Supabase if authenticated
        const supabase = getSupabase();
        const auth = useAuthStore.getState();
        if (supabase && auth.isAuthenticated && auth.user.id !== 'local-athlete') {
          supabase
            .from('weight_logs')
            .delete()
            .eq('id', id)
            .eq('user_id', auth.user.id)
            .then(({ error }) => {
              if (error) console.error('Failed to delete weight log from Supabase:', error);
            });
        }

        triggerAutoSync();
      },

      getWeightTrend: () => {
        return calculateWeightTrend(get().entries);
      },

      getLatestWeight: () => {
        const trends = get().getWeightTrend();
        if (trends.length === 0) return null;
        const last = trends[trends.length - 1];
        return {
          raw: last.rawWeight,
          trend: last.trendWeight,
          date: last.date,
        };
      },

      getExpenditureReport: (dailyCaloriesMap) => {
        const trends = get().getWeightTrend();
        return calculateSmartExpenditure(trends, dailyCaloriesMap, 14);
      },

      replaceEntriesForSync: (newEntries) => {
        const sorted = [...newEntries].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        set({ entries: sorted });
      },
    }),
    {
      name: 'better_leveling_weight',
      partialize: (state) => ({
        entries: state.entries,
      }),
    }
  )
);
