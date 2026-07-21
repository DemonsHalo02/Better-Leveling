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
    cardio?: boolean;
    matchaTea?: boolean;
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
  mp: 0,
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
    targetWeight: 160,
    targetDate: "2028-01-01",
    dailyCalorieGoal: 2080,
    dailyProteinGoal: 178,
    dailyCarbGoal: 200,
    dailyFatGoal: 60,
    gymName: "Japanese Samurai Quiet Apartment Bodyweight Dojo (No Equipment + 45m Cardio)",
    dietName: "Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Matcha Latte Shred Blueprint",
  },
  completedQuestsToday: {
    workout: false,
    calories: false,
    protein: false,
    hydration: false,
    weighIn: false,
    cardio: false,
    matchaTea: false,
  },
  customQuests: [],
};

const STORAGE_KEY = 'better_leveling_v2_state';

export const HYDRATION_GOAL_OZ = 128;
export const HYDRATION_INCREMENT_OZ = 24;
export const HYDRATION_INCREMENT_MP = (HYDRATION_INCREMENT_OZ / HYDRATION_GOAL_OZ) * 100;

const HYDRATION_ONE_TIME_RESET_KEY = 'pf_hydration_force_reset_20260717_reset_now';

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
    
    // Check if new day to reset daily quests (using local date instead of UTC)
    const getLocalDateStr = () => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const today = getLocalDateStr();
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
      parsed.mp = 0; // Reset hydration to 0% at start of each new day
      parsed.completedQuestsToday = {
        workout: false,
        calories: false,
        protein: false,
        hydration: false,
        weighIn: false,
        cardio: false,
        matchaTea: false,
      };
      saveHunterState(parsed);
    }

    let needsSave = false;
    if (parsed.profile) {
      if (parsed.profile.dailyProteinGoal === 170) { parsed.profile.dailyProteinGoal = 178; needsSave = true; }
      if (parsed.profile.dailyCalorieGoal === 2150) { parsed.profile.dailyCalorieGoal = 2080; needsSave = true; }
      if (parsed.profile.targetWeight === 170) { parsed.profile.targetWeight = 160; needsSave = true; }
      if (!parsed.profile.currentWeight || parsed.profile.currentWeight < 50) {
        parsed.profile.currentWeight = parsed.profile.startWeight || 242;
        needsSave = true;
      }
      if (parsed.profile.currentWeight === 170 && !localStorage.getItem('pf_fixed_170_weight_bug_v2')) {
        parsed.profile.currentWeight = parsed.profile.startWeight || 242;
        localStorage.setItem('pf_fixed_170_weight_bug_v2', 'done');
        needsSave = true;
      }
      if (parsed.profile.dietName !== "Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Matcha Latte Shred Blueprint") {
        parsed.profile.dietName = "Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Matcha Latte Shred Blueprint";
        needsSave = true;
      }
      if (parsed.profile.gymName !== "Japanese Samurai Quiet Apartment Bodyweight Dojo (No Equipment + 45m Cardio)") {
        parsed.profile.gymName = "Japanese Samurai Quiet Apartment Bodyweight Dojo (No Equipment + 45m Cardio)";
        needsSave = true;
      }
    }
    if (!parsed.completedQuestsToday) {
      parsed.completedQuestsToday = { workout: false, calories: false, protein: false, hydration: false, weighIn: false, cardio: false, matchaTea: false };
      needsSave = true;
    }
    // Reset mp if it's stuck at 100 but hydration quest not completed today
    if (parsed.mp >= 100 && !parsed.completedQuestsToday?.hydration) {
      parsed.mp = 0;
      needsSave = true;
    }
    // One-time hydration reset so users can track water intake fresh today
    if (!localStorage.getItem(HYDRATION_ONE_TIME_RESET_KEY)) {
      parsed.mp = 0;
      if (parsed.completedQuestsToday) {
        parsed.completedQuestsToday.hydration = false;
      }
      localStorage.setItem(HYDRATION_ONE_TIME_RESET_KEY, 'done');
      needsSave = true;
    }
    if (needsSave) {
      saveHunterState(parsed);
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

export function resetHunterState(): HunterState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const curr = loadHunterState();
    const fresh: HunterState = {
      ...DEFAULT_STATE,
      profile: {
        ...DEFAULT_STATE.profile,
        name: curr.profile?.name || DEFAULT_STATE.profile.name,
        age: curr.profile?.age || DEFAULT_STATE.profile.age,
        heightInches: curr.profile?.heightInches || DEFAULT_STATE.profile.heightInches,
        startWeight: curr.profile?.startWeight || DEFAULT_STATE.profile.startWeight,
        currentWeight: curr.profile?.startWeight || DEFAULT_STATE.profile.startWeight,
        targetWeight: curr.profile?.targetWeight || DEFAULT_STATE.profile.targetWeight,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    localStorage.removeItem('better_leveling_v2_logs');
    window.dispatchEvent(new CustomEvent('hunterStateChanged', { detail: fresh }));
    window.dispatchEvent(new CustomEvent('storage'));
    return fresh;
  } catch (e) {
    console.error("Error resetting hunter state:", e);
    return DEFAULT_STATE;
  }
}

export function awardXp(amount: number, statType?: keyof Omit<HunterStats, 'availablePoints'>, existingState?: HunterState): HunterState {
  const state = existingState || loadHunterState();
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
  // Always save the weight first so it persists in localStorage
  saveHunterState(state);
  if (!state.completedQuestsToday.weighIn) {
    state.completedQuestsToday.weighIn = true;
    saveHunterState(state);
    awardXp(100, 'per', state); // 100 XP for daily weigh in
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

export function resetDailyHydration(): HunterState {
  const state = loadHunterState();
  state.mp = 0;
  if (!state.completedQuestsToday) {
    state.completedQuestsToday = { workout: false, calories: false, protein: false, hydration: false, weighIn: false, cardio: false, matchaTea: false };
  } else {
    state.completedQuestsToday.hydration = false;
  }
  saveHunterState(state);
  return state;
}

export function getHydrationOzConsumed(mp: number): number {
  return Math.round((mp / 100) * HYDRATION_GOAL_OZ * 10) / 10;
}

export function drinkWaterAmount(oz: number): HunterState {
  const current = loadHunterState();
  const incrementMp = (oz / HYDRATION_GOAL_OZ) * 100;
  current.mp = Math.min(100, Math.round((current.mp + incrementMp) * 10) / 10);
  if (!current.completedQuestsToday?.hydration && current.mp >= 100) {
    if (!current.completedQuestsToday) {
      current.completedQuestsToday = { workout: false, calories: false, protein: false, hydration: true, weighIn: false, cardio: false, matchaTea: false };
    } else {
      current.completedQuestsToday.hydration = true;
    }
    awardXp(150, 'vit', current);
  } else {
    saveHunterState(current);
  }
  return loadHunterState();
}

export function toggleQuestCompletion(questType: keyof HunterState['completedQuestsToday'], xpReward: number = 150, statType: keyof Omit<HunterStats, 'availablePoints'> = 'str'): HunterState {
  const state = loadHunterState();
  if (!state.completedQuestsToday) {
    state.completedQuestsToday = { workout: false, calories: false, protein: false, hydration: false, weighIn: false, cardio: false, matchaTea: false };
  }
  const isCompleted = state.completedQuestsToday[questType];
  if (!isCompleted) {
    state.completedQuestsToday[questType] = true;
    saveHunterState(state);
    awardXp(xpReward, statType, state);
  } else {
    state.completedQuestsToday[questType] = false;
    saveHunterState(state);
  }
  return state;
}

export function isSystemAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem("hunter_is_admin") === "true") return true;
  if (localStorage.getItem("hunter_is_admin") === "false") return false;
  try {
    const savedUser = localStorage.getItem("hunter_current_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const email = (parsed.email || "").trim().toLowerCase();
      if (email === "nickcrossonofficial@outlook.com" || email === "ncrossonofficial06@gmail.com") {
        return true;
      }
    }
    // If running on local device with default or Nick's profile, ensure Nick gets admin privileges
    const state = loadHunterState();
    const name = (state.profile?.name || "").toLowerCase();
    if (name.includes("nick crosson") || name.includes("shadow monarch nick")) {
      return true;
    }
  } catch {}
  return false;
}


