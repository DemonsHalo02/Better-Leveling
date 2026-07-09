"use client";

import confetti from 'canvas-confetti';

export type HunterRank = 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank' | 'Shadow Monarch';

export interface HunterStats {
  str: number; // Strength - lifting & workouts
  agi: number; // Agility - cardio & reps
  vit: number; // Vitality - hydration & sleep
  int: number; // Intelligence - nutrition tracking
  per: number; // Perception - consistency & streak
  availablePoints: number;
}

export interface CustomQuest {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  heightInches: number;
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  targetDate: string; // YYYY-MM-DD
  dailyCalorieGoal: number;
  dailyProteinGoal: number;
  dailyCarbGoal: number;
  dailyFatGoal: number;
  gymName?: string;
  dietName?: string;
}

export interface HunterState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: HunterRank;
  title: string;
  hp: number; // Max 100
  mp: number; // Max 100
  streakDays: number;
  lastActiveDate: string;
  stats: HunterStats;
  profile: UserProfile;
  completedQuestsToday: {
    workout: boolean;
    calories: boolean;
    protein: boolean;
    hydration: boolean;
    weighIn: boolean;
  };
  customQuests?: CustomQuest[];
}

const DEFAULT_STATE: HunterState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 500,
  rank: 'E-Rank',
  title: 'Awakened Hunter',
  hp: 100,
  mp: 100,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  stats: {
    str: 10,
    agi: 10,
    vit: 10,
    int: 10,
    per: 10,
    availablePoints: 0,
  },
  profile: {
    name: "Nick Crosson",
    age: 20,
    heightInches: 70, // 5'10"
    startWeight: 242,
    currentWeight: 242,
    targetWeight: 170,
    targetDate: "2027-12-31",
    dailyCalorieGoal: 2150,
    dailyProteinGoal: 170,
    dailyCarbGoal: 200,
    dailyFatGoal: 60,
    gymName: "K-Pop Idol Home Training Dojo",
    dietName: "Japanese Samurai Dojo Clean Shred",
  },
  completedQuestsToday: {
    workout: false,
    calories: false,
    protein: false,
    hydration: false,
    weighIn: false,
  },
  customQuests: [],
};

const STORAGE_KEY = 'better_leveling_v2_state';

export function getRankFromLevel(level: number): { rank: HunterRank; title: string } {
  if (level >= 100) return { rank: 'Shadow Monarch', title: 'Monarch of Shadows' };
  if (level >= 70) return { rank: 'S-Rank', title: 'National Level Hunter' };
  if (level >= 45) return { rank: 'A-Rank', title: 'Elite Raid Captain' };
  if (level >= 25) return { rank: 'B-Rank', title: 'Dungeon Striker' };
  if (level >= 10) return { rank: 'C-Rank', title: 'Guild Vanguard' };
  return { rank: 'E-Rank', title: 'Awakened Hunter' };
}

export function calculateXpForNextLevel(level: number): number {
  return Math.floor(500 * Math.pow(1.15, level - 1));
}

export function loadHunterState(): HunterState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      saveHunterState(DEFAULT_STATE);
      return DEFAULT_STATE;
    }
    const parsed = JSON.parse(saved) as HunterState;
    
    // Check if new day to reset daily quests
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      // Check streak (if yesterday, increment; if missed > 1 day, reset to 1 unless Sunday)
      const lastDate = new Date(parsed.lastActiveDate);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      
      parsed.lastActiveDate = today;
      parsed.completedQuestsToday = {
        workout: false,
        calories: false,
        protein: false,
        hydration: false,
        weighIn: false,
      };
      saveHunterState(parsed);
    }

    if (parsed.profile) {
      if (parsed.profile.dailyProteinGoal === 206) parsed.profile.dailyProteinGoal = 170;
      if (parsed.profile.dietName === "Boricua Cutting Blueprint" || parsed.profile.dietName === "Korean Bulgogi Shred") {
        parsed.profile.dietName = "Japanese Samurai Dojo Clean Shred";
      }
      if (parsed.profile.gymName === "Planet Fitness Lewiston") {
        parsed.profile.gymName = "K-Pop Idol Home Training Dojo";
      }
    }
    
    return parsed;
  } catch (e) {
    console.error("Error loading hunter state:", e);
    return DEFAULT_STATE;
  }
}

export function saveHunterState(state: HunterState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event so UI components can re-render reactively
    window.dispatchEvent(new CustomEvent('hunterStateChanged', { detail: state }));
  } catch (e) {
    console.error("Error saving hunter state:", e);
  }
}

export function awardXp(amount: number, statType?: keyof Omit<HunterStats, 'availablePoints'>): HunterState {
  const state = loadHunterState();
  state.xp += amount;
  
  if (statType) {
    state.stats[statType] += Math.max(1, Math.floor(amount / 50));
  }
  
  let leveledUp = false;
  while (state.xp >= state.xpToNextLevel) {
    state.xp -= state.xpToNextLevel;
    state.level += 1;
    state.stats.availablePoints += 3; // 3 stat points per level up
    state.xpToNextLevel = calculateXpForNextLevel(state.level);
    leveledUp = true;
  }
  
  const rankInfo = getRankFromLevel(state.level);
  state.rank = rankInfo.rank;
  state.title = rankInfo.title;
  
  saveHunterState(state);
  
  if (leveledUp && typeof window !== 'undefined') {
    triggerLevelUpCelebration();
  }
  
  return state;
}

export function triggerLevelUpCelebration() {
  try {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#7000ff', '#ffd700', '#ffffff'],
    });
    
    // Optional Level up sound audio visual cue
    if (typeof window !== 'undefined') {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    }
  } catch {
    // Ignore audio or confetti error if not permitted
  }
}

export function allocateStatPoint(stat: keyof Omit<HunterStats, 'availablePoints'>): HunterState {
  const state = loadHunterState();
  if (state.stats.availablePoints > 0) {
    state.stats[stat] += 1;
    state.stats.availablePoints -= 1;
    saveHunterState(state);
  }
  return state;
}

export function updateWeight(newWeight: number): HunterState {
  const state = loadHunterState();
  state.profile.currentWeight = newWeight;
  if (!state.completedQuestsToday.weighIn) {
    state.completedQuestsToday.weighIn = true;
    awardXp(100, 'per'); // 100 XP for daily weigh in
  } else {
    saveHunterState(state);
  }
  return state;
}

export function addCustomQuest(title: string, xpReward: number = 100): HunterState {
  const state = loadHunterState();
  if (!state.customQuests) state.customQuests = [];
  state.customQuests.push({
    id: `quest-${Date.now()}`,
    title,
    xpReward,
    completed: false,
  });
  saveHunterState(state);
  return state;
}

export function toggleCustomQuest(id: string): HunterState {
  const state = loadHunterState();
  if (!state.customQuests) return state;
  const quest = state.customQuests.find(q => q.id === id);
  if (quest) {
    if (!quest.completed) {
      quest.completed = true;
      saveHunterState(state);
      awardXp(quest.xpReward || 100, 'per');
    } else {
      quest.completed = false;
      saveHunterState(state);
    }
  }
  return state;
}

export function deleteCustomQuest(id: string): HunterState {
  const state = loadHunterState();
  if (!state.customQuests) return state;
  state.customQuests = state.customQuests.filter(q => q.id !== id);
  saveHunterState(state);
  return state;
}

export function updateUserProfile(updates: Partial<UserProfile>): HunterState {
  const state = loadHunterState();
  state.profile = { ...state.profile, ...updates };
  saveHunterState(state);
  return state;
}
