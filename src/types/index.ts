// Core Type Definitions for Better Leveling (US Measurements: lbs, oz, ft/in, grams)

export type CalisthenicsIntensity = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type GoalType = 'fat_loss' | 'maintenance' | 'muscle_gain';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MacroGoals {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  heightFeet: number; // e.g. 5 ft
  heightInches: number; // e.g. 10 in
  startingWeightLbs: number; // lbs
  targetWeightLbs: number;   // lbs
  goal: GoalType;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'high';
  calisthenicsTier: CalisthenicsIntensity;
  macroGoals: MacroGoals;
  createdAt: string;
  updatedAt: string;
}

export interface FoodItem {
  id: string;
  barcode?: string;
  name: string;
  brand?: string;
  servingSizeGrams: number;
  servingSizeOz?: number; // e.g. 3.5 oz
  servingUnit: string;    // e.g. "100g / 3.5 oz", "1 scoop (30g / 1 oz)"
  calories: number;       // per serving
  protein: number;        // grams
  carbs: number;          // grams
  fat: number;            // grams
  fiber?: number;         // grams
  isCustom?: boolean;
}

export interface LoggedMealItem {
  id: string;
  foodId: string;
  name: string;
  brand?: string;
  mealType: MealType;
  servings: number;
  servingSizeGrams: number;
  servingSizeOz: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  loggedAt: string; // ISO string
}

export interface DailyNutritionLog {
  date: string; // YYYY-MM-DD
  items: LoggedMealItem[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface ExerciseSet {
  id: string;
  setNumber: number;
  targetReps: string; // e.g., "8-12", "30s hold", "AMRAP"
  actualReps: number;
  loadLbs?: number; // extra resistance in lbs (0 for pure bodyweight)
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completed: boolean;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  progressionLevel: CalisthenicsIntensity;
  cues: string[];
  tempo?: string; // e.g., "3-0-1-0" (slow eccentric, zero pause, explosive up)
  defaultSets: number;
  defaultReps: string;
  restSeconds: number;
  apartmentSafetyTip: string; // Why it's 100% silent & zero equipment
}

export interface DailyWorkoutRoutine {
  day: DayOfWeek;
  focusTitle: string;
  subtitle: string;
  targetAreas: string[];
  exercises: Exercise[];
  isRestDay?: boolean;
}

export type WorkoutProgramMode = 'calisthenics' | 'weighted' | 'dumbbell_hybrid' | 'treadmill';

export interface LoggedWorkoutSession {
  id: string;
  date: string; // YYYY-MM-DD
  day: DayOfWeek;
  intensity: CalisthenicsIntensity;
  focusTitle: string;
  startedAt: string;
  completedAt?: string;
  isCompleted: boolean;
  notes?: string;
  programMode?: WorkoutProgramMode | 'bladder_support';
  exerciseLogs: {
    exerciseId: string;
    exerciseName: string;
    sets: ExerciseSet[];
  }[];
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightLbs: number; // in lbs
  note?: string;
  createdAt: string;
}

export interface WeightAnalyticsPoint {
  date: string;
  rawWeight: number;   // lbs
  trendWeight: number; // Smoothed EMA weight in lbs
}

export interface ExpenditureReport {
  estimatedTDEE: number; // Estimated true calories burned
  rollingAverageIntake: number;
  weeklyWeightRateLbs: number; // e.g. -1.0 lbs/week
  confidenceScore: 'low' | 'moderate' | 'high'; // Based on number of days tracked
}

export interface SyncState {
  status: 'synced' | 'syncing' | 'offline' | 'error';
  lastSyncedAt: string | null;
  pendingMutations: number;
  errorMessage?: string;
}
