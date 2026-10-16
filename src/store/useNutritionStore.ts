// Nutrition Store: MacroFactor-inspired tracking, quick add, meal logs, and daily aggregations
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FoodItem, LoggedMealItem, MealType } from '../types';
import { VERIFIED_FOODS } from '../data/verifiedFoods';
import { getSupabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';
import { triggerAutoSync } from './useSyncStore';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

interface NutritionState {
  selectedDate: string; // YYYY-MM-DD
  dailyLogs: Record<string, LoggedMealItem[]>; // date -> items
  customFoods: FoodItem[];
  recentFoods: FoodItem[];

  // Actions
  setSelectedDate: (date: string) => void;
  addFoodToLog: (
    mealType: MealType,
    food: FoodItem,
    servings: number,
    date?: string
  ) => LoggedMealItem;
  quickAddMacros: (
    mealType: MealType,
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    date?: string
  ) => LoggedMealItem;
  updateMealItem: (
    id: string,
    updates: Partial<LoggedMealItem>,
    date?: string
  ) => void;
  removeMealItem: (id: string, date?: string) => void;
  saveCustomFood: (food: FoodItem) => void;
  deleteCustomFood: (id: string) => void;
  getDailyTotals: (date?: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  getAllDailyIntakeMap: () => Record<string, number>; // date -> total calories
  replaceLogsForSync: (logsByDate: Record<string, LoggedMealItem[]>) => void;
  replaceCustomFoodsForSync: (foods: FoodItem[]) => void;
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      selectedDate: getTodayDateString(),
      dailyLogs: {},
      customFoods: [],
      recentFoods: VERIFIED_FOODS.slice(0, 5),

      setSelectedDate: (date: string) => set({ selectedDate: date }),

      addFoodToLog: (mealType, food, servings, targetDate) => {
        const date = targetDate || get().selectedDate;
        const currentList = get().dailyLogs[date] || [];

        const multiplier = Math.max(0.1, servings);
        const newItem: LoggedMealItem = {
          id: `meal-${Date.now()}-${Math.random().toString(36).substring(5)}`,
          foodId: food.id,
          name: food.name,
          brand: food.brand,
          mealType,
          servings: Number(servings.toFixed(2)),
          servingSizeGrams: Math.round(food.servingSizeGrams * multiplier),
          servingSizeOz: Number(((food.servingSizeGrams * multiplier) / 28.35).toFixed(1)),
          calories: Math.round(food.calories * multiplier),
          protein: Number((food.protein * multiplier).toFixed(1)),
          carbs: Number((food.carbs * multiplier).toFixed(1)),
          fat: Number((food.fat * multiplier).toFixed(1)),
          loggedAt: new Date().toISOString(),
        };

        const updatedList = [newItem, ...currentList];

        // Also add food to recents (deduped)
        const currentRecents = get().recentFoods.filter((f) => f.id !== food.id);
        const updatedRecents = [food, ...currentRecents].slice(0, 15);

        set({
          dailyLogs: {
            ...get().dailyLogs,
            [date]: updatedList,
          },
          recentFoods: updatedRecents,
        });

        triggerAutoSync();
        return newItem;
      },

      quickAddMacros: (mealType, name, calories, protein, carbs, fat, targetDate) => {
        const date = targetDate || get().selectedDate;
        const currentList = get().dailyLogs[date] || [];

        const newItem: LoggedMealItem = {
          id: `quick-${Date.now()}-${Math.random().toString(36).substring(5)}`,
          foodId: 'quick-entry',
          name: name.trim() || 'Quick Macro Add',
          mealType,
          servings: 1,
          servingSizeGrams: 100,
          servingSizeOz: 3.5,
          calories: Math.round(calories),
          protein: Number(protein.toFixed(1)),
          carbs: Number(carbs.toFixed(1)),
          fat: Number(fat.toFixed(1)),
          loggedAt: new Date().toISOString(),
        };

        set({
          dailyLogs: {
            ...get().dailyLogs,
            [date]: [newItem, ...currentList],
          },
        });

        triggerAutoSync();
        return newItem;
      },

      updateMealItem: (id, updates, targetDate) => {
        const date = targetDate || get().selectedDate;
        const currentList = get().dailyLogs[date] || [];

        const updatedList = currentList.map((item) => {
          if (item.id === id) {
            return { ...item, ...updates };
          }
          return item;
        });

        set({
          dailyLogs: {
            ...get().dailyLogs,
            [date]: updatedList,
          },
        });

        triggerAutoSync();
      },

      removeMealItem: (id, targetDate) => {
        const date = targetDate || get().selectedDate;
        const currentList = get().dailyLogs[date] || [];

        set({
          dailyLogs: {
            ...get().dailyLogs,
            [date]: currentList.filter((item) => item.id !== id),
          },
        });

        // Delete from Supabase if authenticated
        const supabase = getSupabase();
        const auth = useAuthStore.getState();
        if (supabase && auth.isAuthenticated && auth.user.id !== 'local-athlete') {
          supabase
            .from('food_logs')
            .delete()
            .eq('id', id)
            .eq('user_id', auth.user.id)
            .then(({ error }) => {
              if (error) console.error('Failed to delete food log from Supabase:', error);
            });
        }

        triggerAutoSync();
      },

      saveCustomFood: (food) => {
        const existing = get().customFoods.filter((f) => f.id !== food.id);
        set({
          customFoods: [food, ...existing],
        });
        triggerAutoSync();
      },

      deleteCustomFood: (id) => {
        set({
          customFoods: get().customFoods.filter((f) => f.id !== id),
        });

        // Delete from Supabase if authenticated
        const supabase = getSupabase();
        const auth = useAuthStore.getState();
        if (supabase && auth.isAuthenticated && auth.user.id !== 'local-athlete') {
          supabase
            .from('custom_foods')
            .delete()
            .eq('id', id)
            .eq('user_id', auth.user.id)
            .then(({ error }) => {
              if (error) console.error('Failed to delete custom food from Supabase:', error);
            });
        }

        triggerAutoSync();
      },

      getDailyTotals: (targetDate) => {
        const date = targetDate || get().selectedDate;
        const items = get().dailyLogs[date] || [];

        return items.reduce(
          (acc, item) => {
            acc.calories += item.calories;
            acc.protein += item.protein;
            acc.carbs += item.carbs;
            acc.fat += item.fat;
            return acc;
          },
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
      },

      getAllDailyIntakeMap: () => {
        const logs = get().dailyLogs;
        const intakeMap: Record<string, number> = {};

        for (const [date, items] of Object.entries(logs)) {
          const totalCal = items.reduce((sum, item) => sum + item.calories, 0);
          intakeMap[date] = totalCal;
        }

        return intakeMap;
      },

      replaceLogsForSync: (logsByDate) => {
        set({
          dailyLogs: logsByDate,
        });
      },

      replaceCustomFoodsForSync: (foods) => {
        set({ customFoods: foods });
      },
    }),
    {
      name: 'better_leveling_nutrition',
      partialize: (state) => ({
        dailyLogs: state.dailyLogs,
        customFoods: state.customFoods,
        recentFoods: state.recentFoods,
      }),
    }
  )
);
