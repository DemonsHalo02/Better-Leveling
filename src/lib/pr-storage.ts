"use client";

export interface PRStorageData {
  timelineNotes: Record<string, string>;
  scheduleChecks: Record<string, boolean>;
  courseProgress: Record<string, number>;
  courseNotes: Record<string, string>;
  deleProgress: Record<string, boolean>;
  savingsIncome: number;
  savingsExpenses: number;
  savingsEntries: Array<{ id: string; date: string; amount: number; description: string }>;
  habitStreaks: Record<string, number>;
  habitHistory: Record<string, boolean>;
  unlockedAchievements: Record<string, boolean>;
  weightLogs: Array<{ date: string; weight: number }>;
}

const STORAGE_KEY = "npuertorico2026";

const DEFAULT_DATA: PRStorageData = {
  timelineNotes: {},
  scheduleChecks: {},
  courseProgress: {},
  courseNotes: {},
  deleProgress: {},
  savingsIncome: 0,
  savingsExpenses: 0,
  savingsEntries: [],
  habitStreaks: {},
  habitHistory: {},
  unlockedAchievements: {},
  weightLogs: []
};

export function getPRData(): PRStorageData {
  if (typeof window === 'undefined') {
    return DEFAULT_DATA;
  }

  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (rawData !== null) {
      const parsed = JSON.parse(rawData);
      if (parsed !== null && typeof parsed === 'object') {
        return {
          timelineNotes: parsed.timelineNotes !== undefined && parsed.timelineNotes !== null ? parsed.timelineNotes : DEFAULT_DATA.timelineNotes,
          scheduleChecks: parsed.scheduleChecks !== undefined && parsed.scheduleChecks !== null ? parsed.scheduleChecks : DEFAULT_DATA.scheduleChecks,
          courseProgress: parsed.courseProgress !== undefined && parsed.courseProgress !== null ? parsed.courseProgress : DEFAULT_DATA.courseProgress,
          courseNotes: parsed.courseNotes !== undefined && parsed.courseNotes !== null ? parsed.courseNotes : DEFAULT_DATA.courseNotes,
          deleProgress: parsed.deleProgress !== undefined && parsed.deleProgress !== null ? parsed.deleProgress : DEFAULT_DATA.deleProgress,
          savingsIncome: parsed.savingsIncome !== undefined && parsed.savingsIncome !== null ? parsed.savingsIncome : DEFAULT_DATA.savingsIncome,
          savingsExpenses: parsed.savingsExpenses !== undefined && parsed.savingsExpenses !== null ? parsed.savingsExpenses : DEFAULT_DATA.savingsExpenses,
          savingsEntries: parsed.savingsEntries !== undefined && Array.isArray(parsed.savingsEntries) ? parsed.savingsEntries : DEFAULT_DATA.savingsEntries,
          habitStreaks: parsed.habitStreaks !== undefined && parsed.habitStreaks !== null ? parsed.habitStreaks : DEFAULT_DATA.habitStreaks,
          habitHistory: parsed.habitHistory !== undefined && parsed.habitHistory !== null ? parsed.habitHistory : DEFAULT_DATA.habitHistory,
          unlockedAchievements: parsed.unlockedAchievements !== undefined && parsed.unlockedAchievements !== null ? parsed.unlockedAchievements : DEFAULT_DATA.unlockedAchievements,
          weightLogs: parsed.weightLogs !== undefined && Array.isArray(parsed.weightLogs) ? parsed.weightLogs : DEFAULT_DATA.weightLogs
        };
      }
    }
  } catch (error) {
    console.error("Failed to load PR Data", error);
  }

  return DEFAULT_DATA;
}

export function savePRData(data: Partial<PRStorageData>): PRStorageData {
  const currentData = getPRData();
  const mergedData: PRStorageData = {
    timelineNotes: data.timelineNotes !== undefined ? data.timelineNotes : currentData.timelineNotes,
    scheduleChecks: data.scheduleChecks !== undefined ? data.scheduleChecks : currentData.scheduleChecks,
    courseProgress: data.courseProgress !== undefined ? data.courseProgress : currentData.courseProgress,
    courseNotes: data.courseNotes !== undefined ? data.courseNotes : currentData.courseNotes,
    deleProgress: data.deleProgress !== undefined ? data.deleProgress : currentData.deleProgress,
    savingsIncome: data.savingsIncome !== undefined ? data.savingsIncome : currentData.savingsIncome,
    savingsExpenses: data.savingsExpenses !== undefined ? data.savingsExpenses : currentData.savingsExpenses,
    savingsEntries: data.savingsEntries !== undefined ? data.savingsEntries : currentData.savingsEntries,
    habitStreaks: data.habitStreaks !== undefined ? data.habitStreaks : currentData.habitStreaks,
    habitHistory: data.habitHistory !== undefined ? data.habitHistory : currentData.habitHistory,
    unlockedAchievements: data.unlockedAchievements !== undefined ? data.unlockedAchievements : currentData.unlockedAchievements,
    weightLogs: data.weightLogs !== undefined ? data.weightLogs : currentData.weightLogs
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
      window.dispatchEvent(new Event('prDataUpdated'));
    } catch (error) {
      console.error("Failed to save PR Data", error);
    }
  }
  
  return mergedData;
}
