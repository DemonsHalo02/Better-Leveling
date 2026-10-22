// Bladder Store: Steady Hydration Pacing, Evening Cutoff Timer, Irritant Logger & Timed Voids
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTodayDateString } from './useNutritionStore';

export type IrritantType = 'matcha' | 'gfuel' | 'coffee' | 'carbonation' | 'sweetener' | 'spicy' | 'other';
export type VoidUrgeLevel = 'gentle' | 'moderate' | 'strong';

export interface WaterLogEntry {
  id: string;
  date: string;
  time: string; // HH:MM
  amountOz: number;
}

export interface IrritantLogEntry {
  id: string;
  date: string;
  time: string; // HH:MM
  irritantType: IrritantType;
  label: string;
  notes?: string;
}

export interface TimedVoidEntry {
  id: string;
  date: string;
  time: string; // HH:MM
  timestampMs: number;
  urgeLevel: VoidUrgeLevel;
  notes?: string;
}

interface BladderState {
  targetWaterOz: number;
  bedtimeHour: number; // 24-hr format (e.g. 22 for 10 PM)
  cutoffHoursBeforeBed: number; // default 2 hours before bed
  waterLogs: WaterLogEntry[];
  irritantLogs: IrritantLogEntry[];
  timedVoids: TimedVoidEntry[];

  // Actions
  addWater: (amountOz: number) => void;
  deleteWater: (id: string) => void;
  logIrritant: (type: IrritantType, label: string, notes?: string) => void;
  deleteIrritant: (id: string) => void;
  logTimedVoid: (urgeLevel: VoidUrgeLevel, notes?: string) => void;
  deleteTimedVoid: (id: string) => void;
  setTargetWaterOz: (oz: number) => void;
  setBedtimeHour: (hour: number) => void;
  getTodayWaterOz: () => number;
  getTodayIrritants: () => IrritantLogEntry[];
  getTodayVoids: () => TimedVoidEntry[];
  getCutoffStatus: () => {
    isPastCutoff: boolean;
    hoursRemaining: number;
    minutesRemaining: number;
    cutoffTimeDisplay: string;
  };
  getMinutesSinceLastVoid: () => number | null;
}

function getCurrentTimeStr(): string {
  const now = new Date();
  return now.toTimeString().substring(0, 5); // "HH:MM"
}

export const useBladderStore = create<BladderState>()(
  persist(
    (set, get) => ({
      targetWaterOz: 72,
      bedtimeHour: 22, // 10 PM
      cutoffHoursBeforeBed: 2,
      waterLogs: [],
      irritantLogs: [],
      timedVoids: [],

      addWater: (amountOz: number) => {
        const today = getTodayDateString();
        const time = getCurrentTimeStr();
        const newEntry: WaterLogEntry = {
          id: `water-${Date.now()}`,
          date: today,
          time,
          amountOz,
        };
        set({ waterLogs: [newEntry, ...get().waterLogs] });
      },

      deleteWater: (id: string) => {
        set({ waterLogs: get().waterLogs.filter((w) => w.id !== id) });
      },

      logIrritant: (type, label, notes) => {
        const today = getTodayDateString();
        const time = getCurrentTimeStr();
        const newEntry: IrritantLogEntry = {
          id: `irritant-${Date.now()}`,
          date: today,
          time,
          irritantType: type,
          label,
          notes,
        };
        set({ irritantLogs: [newEntry, ...get().irritantLogs] });
      },

      deleteIrritant: (id: string) => {
        set({ irritantLogs: get().irritantLogs.filter((i) => i.id !== id) });
      },

      logTimedVoid: (urgeLevel, notes) => {
        const today = getTodayDateString();
        const time = getCurrentTimeStr();
        const newEntry: TimedVoidEntry = {
          id: `void-${Date.now()}`,
          date: today,
          time,
          timestampMs: Date.now(),
          urgeLevel,
          notes,
        };
        set({ timedVoids: [newEntry, ...get().timedVoids] });
      },

      deleteTimedVoid: (id: string) => {
        set({ timedVoids: get().timedVoids.filter((v) => v.id !== id) });
      },

      setTargetWaterOz: (oz) => set({ targetWaterOz: Math.max(32, Math.min(160, oz)) }),

      setBedtimeHour: (hour) => set({ bedtimeHour: Math.max(18, Math.min(24, hour)) }),

      getTodayWaterOz: () => {
        const today = getTodayDateString();
        return get().waterLogs
          .filter((w) => w.date === today)
          .reduce((sum, w) => sum + w.amountOz, 0);
      },

      getTodayIrritants: () => {
        const today = getTodayDateString();
        return get().irritantLogs.filter((i) => i.date === today);
      },

      getTodayVoids: () => {
        const today = getTodayDateString();
        return get().timedVoids.filter((v) => v.date === today);
      },

      getCutoffStatus: () => {
        const { bedtimeHour, cutoffHoursBeforeBed } = get();
        const cutoffHour = (bedtimeHour - cutoffHoursBeforeBed + 24) % 24;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        const currentTotalMin = currentHour * 60 + currentMinutes;
        const cutoffTotalMin = cutoffHour * 60;

        const isPastCutoff = currentTotalMin >= cutoffTotalMin;
        const diffMin = cutoffTotalMin - currentTotalMin;

        const hoursRemaining = Math.max(0, Math.floor(diffMin / 60));
        const minutesRemaining = Math.max(0, diffMin % 60);

        // Format cutoff string in 12hr format
        const period = cutoffHour >= 12 ? 'PM' : 'AM';
        const displayHour = cutoffHour % 12 === 0 ? 12 : cutoffHour % 12;
        const cutoffTimeDisplay = `${displayHour}:00 ${period}`;

        return {
          isPastCutoff,
          hoursRemaining,
          minutesRemaining,
          cutoffTimeDisplay,
        };
      },

      getMinutesSinceLastVoid: () => {
        const today = getTodayDateString();
        const todayVoids = get().timedVoids.filter((v) => v.date === today);
        if (todayVoids.length === 0) return null;
        const latestMs = Math.max(...todayVoids.map((v) => v.timestampMs));
        const elapsedMs = Date.now() - latestMs;
        return Math.floor(elapsedMs / (60 * 1000));
      },
    }),
    {
      name: 'better_leveling_bladder_tracking',
    }
  )
);
