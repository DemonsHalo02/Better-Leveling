const fs = require('fs');

const runExercise = {
  id: 'cal-run',
  name: '15-Minute Run',
  targetGroup: 'Cardio',
  sets: 1,
  reps: '15 minutes',
  equipment: 'Outdoors / Treadmill',
  coachTip: 'Keep a steady pace. Focus on nasal breathing. This is essential for your cardio health and reaching your target weight cleanly.',
  untilFailure: false,
};

function createDays(routineName, description, xp, exercises) {
  return [0, 1, 2, 3, 4, 5, 6].map(day => ({
    dayOfWeek: day,
    dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
    splitName: routineName,
    isRestDay: false,
    questTitle: '[Daily Quest] ' + routineName,
    description: description,
    xpReward: xp,
    exercises: exercises
  }));
}

const beginner = [
  runExercise,
  { id: 'beg-push', name: 'Knee Push-Ups', targetGroup: 'Chest', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Keep your core tight and back straight. Lower until chest touches the mat.', untilFailure: true },
  { id: 'beg-squat', name: 'Chair Assisted Squats', targetGroup: 'Legs', sets: 3, reps: 'Until failure', equipment: 'Chair', coachTip: 'Lightly tap the chair with your glutes and stand back up. Keep weight in your heels.', untilFailure: true },
  { id: 'beg-abs', name: 'Mat Crunches', targetGroup: 'Abs', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Squeeze your abs to lift your shoulders off the mat. Do not pull on your neck.', untilFailure: true },
  { id: 'beg-dips', name: 'Chair Dips (Bent Knees)', targetGroup: 'Triceps', sets: 3, reps: 'Until failure', equipment: 'Chair', coachTip: 'Keep your back close to the chair. Lower until elbows are at 90 degrees.', untilFailure: true },
];

const intermediate = [
  runExercise,
  { id: 'int-push', name: 'Standard Push-Ups', targetGroup: 'Chest', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Full range of motion. Keep elbows tucked at 45 degrees. Silent execution.', untilFailure: true },
  { id: 'int-squat', name: 'Bulgarian Split Squats', targetGroup: 'Legs', sets: 3, reps: 'Until failure (per leg)', equipment: 'Chair', coachTip: 'Rest one foot on the chair behind you. Squat until front thigh is parallel.', untilFailure: true },
  { id: 'int-abs', name: 'Lying Leg Raises', targetGroup: 'Abs', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Keep lower back pressed flat into the mat. Lower legs slowly and under control.', untilFailure: true },
  { id: 'int-dips', name: 'Chair Dips (Straight Legs)', targetGroup: 'Triceps', sets: 3, reps: 'Until failure', equipment: 'Chair', coachTip: 'Legs straight out. Squeeze triceps hard at the top lockout.', untilFailure: true },
  { id: 'int-dec-push', name: 'Decline Push-Ups', targetGroup: 'Chest', sets: 3, reps: 'Until failure', equipment: 'Chair', coachTip: 'Feet on the chair, hands on the mat. Targets upper chest and shoulders.', untilFailure: true },
];

const advanced = [
  runExercise,
  { id: 'adv-push', name: 'Diamond Push-Ups', targetGroup: 'Triceps', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Hands form a diamond under your chest. Keep elbows tight to the body.', untilFailure: true },
  { id: 'adv-squat', name: 'Archer Squats', targetGroup: 'Legs', sets: 3, reps: 'Until failure (per leg)', equipment: 'Bodyweight', coachTip: 'Wide stance, squat deeply to one side keeping the other leg straight.', untilFailure: true },
  { id: 'adv-abs', name: 'V-Ups', targetGroup: 'Abs', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Snap up into a V shape, touching toes with your hands. Control the descent.', untilFailure: true },
  { id: 'adv-pike', name: 'Pike Push-Ups', targetGroup: 'Shoulders', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Hips high in an inverted V. Lower head towards the floor in front of your hands.', untilFailure: true },
  { id: 'adv-lsit', name: 'L-Sit Hold (Seconds)', targetGroup: 'Abs', sets: 3, reps: 'Until failure', equipment: 'Chair / Mat', coachTip: 'Support yourself on the chair edges or floor and hold legs straight out. Log your seconds.', untilFailure: true },
];

const expert = [
  runExercise,
  { id: 'exp-push', name: 'Pseudo Planche Push-Ups', targetGroup: 'Chest', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Lean forward so hands are near your hips. Keep body hollow and tight.', untilFailure: true },
  { id: 'exp-squat', name: 'Pistol Squats', targetGroup: 'Legs', sets: 3, reps: 'Until failure (per leg)', equipment: 'Bodyweight', coachTip: 'Full single-leg squat. Use the chair for balance only if absolutely necessary.', untilFailure: true },
  { id: 'exp-hspu', name: 'Handstand Push-Ups (Wall)', targetGroup: 'Shoulders', sets: 3, reps: 'Until failure', equipment: 'Wall / Mat', coachTip: 'Kick up against a wall. Lower until head gently touches mat, press up to lockout.', untilFailure: true },
  { id: 'exp-hollow', name: 'Hollow Body Rocks (Seconds)', targetGroup: 'Abs', sets: 3, reps: 'Until failure', equipment: 'Mat', coachTip: 'Hold the hollow position and rock smoothly. Log your seconds held.', untilFailure: true },
  { id: 'exp-one-push', name: 'One-Arm Push-Up Progressions', targetGroup: 'Chest', sets: 3, reps: 'Until failure (per arm)', equipment: 'Mat', coachTip: 'Wide feet, one hand centered. Keep torso as flat as possible. True mastery.', untilFailure: true },
];

const fileContent = `export interface Exercise {
  id: string;
  name: string;
  targetGroup: 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Forearms' | 'Legs' | 'Abs' | 'Full Body' | 'Nutrition / Batch Prep' | 'Cardio';
  sets: number;
  reps: string;
  equipment: string;
  coachTip: string;
  weightUsed?: number;
  completedSets?: number;
  untilFailure?: boolean;
}

export interface WorkoutDay {
  dayOfWeek: number;
  dayName: string;
  splitName: string;
  isRestDay: boolean;
  questTitle: string;
  description: string;
  xpReward: number;
  exercises: Exercise[];
}

export const CALISTHENICS_BEGINNER: WorkoutDay[] = ${JSON.stringify(createDays('Beginner Calisthenics', 'A fundamental bodyweight routine to build baseline strength using just a mat and a chair. Includes daily 15-minute run.', 400, beginner), null, 2)};
export const CALISTHENICS_INTERMEDIATE: WorkoutDay[] = ${JSON.stringify(createDays('Intermediate Calisthenics', 'Elevate your bodyweight control with more challenging leverage and deeper ranges of motion. Includes daily 15-minute run.', 500, intermediate), null, 2)};
export const CALISTHENICS_ADVANCED: WorkoutDay[] = ${JSON.stringify(createDays('Advanced Calisthenics', 'High-tension bodyweight mastery focusing on unilateral strength and advanced core control. Includes daily 15-minute run.', 600, advanced), null, 2)};
export const CALISTHENICS_EXPERT: WorkoutDay[] = ${JSON.stringify(createDays('Expert Calisthenics', 'Elite bodyweight manipulation. Requires immense balance, core strength, and joint stability. Includes daily 15-minute run.', 800, expert), null, 2)};

export type PlanTier = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const getTodayWorkout = (planType: PlanTier = 'beginner'): WorkoutDay => {
  const dayIndex = new Date().getDay();
  let activePlan = planType;
  if (typeof window !== 'undefined') {
    const savedType = localStorage.getItem('active_workout_routine_type') as PlanTier | null;
    if (savedType && ['beginner', 'intermediate', 'advanced', 'expert'].includes(savedType)) {
      activePlan = savedType;
    }
  }
  
  let routine;
  switch (activePlan) {
    case 'intermediate': routine = CALISTHENICS_INTERMEDIATE; break;
    case 'advanced': routine = CALISTHENICS_ADVANCED; break;
    case 'expert': routine = CALISTHENICS_EXPERT; break;
    case 'beginner':
    default:
      routine = CALISTHENICS_BEGINNER; break;
  }
  
  return routine.find((d: any) => d.dayOfWeek === dayIndex) || routine[0];
};
`;

fs.writeFileSync('src/lib/workout-data.ts', fileContent);
