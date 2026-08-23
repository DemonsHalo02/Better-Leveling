export interface Exercise {
  id: string;
  name: string;
  targetGroup: 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Forearms' | 'Legs' | 'Abs' | 'Full Body' | 'Cardio';
  sets: number;
  reps: string;
  equipment: string;
  coachTip: string;
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

export const PLANET_FITNESS_PLAN: WorkoutDay[] = [
  {
    dayOfWeek: 0,
    dayName: "Sunday",
    splitName: "Active Recovery",
    isRestDay: true,
    questTitle: "[Daily Quest] Rest & Recover",
    description: "Rest day to allow muscles to rebuild. Optional light cardio or track mobility work.",
    xpReward: 150,
    exercises: [
      { id: "pf-sun-1", name: "Treadmill or Outdoor Walk", targetGroup: "Cardio", sets: 1, reps: "30-45 mins", equipment: "Treadmill / Track", coachTip: "Keep heart rate low (Zone 1-2). Focus on blood flow and recovery.", untilFailure: false }
    ]
  },
  {
    dayOfWeek: 1,
    dayName: "Monday",
    splitName: "Push (Chest, Shoulders, Triceps)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Push",
    description: "Build a broad chest, capped shoulders, and thick triceps.",
    xpReward: 400,
    exercises: [
      { id: "pf-mon-1", name: "Smith Machine Incline Press", targetGroup: "Chest", sets: 4, reps: "8-10", equipment: "Smith Machine", coachTip: "Focus on upper chest to build a shelf-like aesthetic.", untilFailure: false },
      { id: "pf-mon-2", name: "Dumbbell Flat Bench Press", targetGroup: "Chest", sets: 3, reps: "8-12", equipment: "Dumbbells", coachTip: "Get a deep stretch at the bottom of the movement.", untilFailure: false },
      { id: "pf-mon-3", name: "Dumbbell Shoulder Press", targetGroup: "Shoulders", sets: 3, reps: "8-12", equipment: "Dumbbells", coachTip: "Keep elbows slightly tucked to protect the shoulder joint.", untilFailure: false },
      { id: "pf-mon-4", name: "Cable Lateral Raises", targetGroup: "Shoulders", sets: 4, reps: "12-15", equipment: "Cable Machine", coachTip: "Constant tension. This builds the wide shoulder aesthetic.", untilFailure: true },
      { id: "pf-mon-5", name: "Tricep Rope Pushdowns", targetGroup: "Triceps", sets: 3, reps: "10-15", equipment: "Cable Machine", coachTip: "Spread the rope apart at the very bottom.", untilFailure: true }
    ]
  },
  {
    dayOfWeek: 2,
    dayName: "Tuesday",
    splitName: "Pull (Back & Biceps)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Pull",
    description: "Develop a wide back and peaked biceps for the V-taper look.",
    xpReward: 400,
    exercises: [
      { id: "pf-tue-1", name: "Lat Pulldowns", targetGroup: "Back", sets: 4, reps: "8-12", equipment: "Cable Machine", coachTip: "Pull the bar down to your upper chest, squeeze the lats.", untilFailure: false },
      { id: "pf-tue-2", name: "Seated Cable Rows", targetGroup: "Back", sets: 3, reps: "8-12", equipment: "Cable Row Machine", coachTip: "Keep your chest up and pull with your elbows.", untilFailure: false },
      { id: "pf-tue-3", name: "Straight Arm Pulldowns", targetGroup: "Back", sets: 3, reps: "12-15", equipment: "Cable Machine", coachTip: "Great for isolating the lats and building wings.", untilFailure: true },
      { id: "pf-tue-4", name: "Dumbbell Hammer Curls", targetGroup: "Biceps", sets: 3, reps: "10-12", equipment: "Dumbbells", coachTip: "Builds brachialis for thicker looking arms.", untilFailure: false },
      { id: "pf-tue-5", name: "Cable Bicep Curls", targetGroup: "Biceps", sets: 3, reps: "12-15", equipment: "Cable Machine", coachTip: "Squeeze hard at the top of the curl.", untilFailure: true }
    ]
  },
  {
    dayOfWeek: 3,
    dayName: "Wednesday",
    splitName: "Legs (Track Strength)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Legs",
    description: "Explosive leg day for track running power and aesthetic quads.",
    xpReward: 400,
    exercises: [
      { id: "pf-wed-1", name: "Smith Machine Squats", targetGroup: "Legs", sets: 4, reps: "6-10", equipment: "Smith Machine", coachTip: "Go heavy but control the descent. Excellent for raw leg power.", untilFailure: false },
      { id: "pf-wed-2", name: "Dumbbell Bulgarian Split Squats", targetGroup: "Legs", sets: 3, reps: "8-12", equipment: "Dumbbells & Bench", coachTip: "Crucial for runners to build unilateral strength and stability.", untilFailure: false },
      { id: "pf-wed-3", name: "Leg Press", targetGroup: "Legs", sets: 3, reps: "10-15", equipment: "Leg Press Machine", coachTip: "Place feet high for glutes/hams, low for quads.", untilFailure: false },
      { id: "pf-wed-4", name: "Leg Extensions", targetGroup: "Legs", sets: 3, reps: "12-15", equipment: "Leg Extension Machine", coachTip: "Squeeze the quads hard at the top. Defines the teardrop muscle.", untilFailure: true },
      { id: "pf-wed-5", name: "Standing Calf Raises", targetGroup: "Legs", sets: 4, reps: "15-20", equipment: "Smith Machine", coachTip: "Vital for track sprinting. Squeeze at the top, deep stretch at the bottom.", untilFailure: true }
    ]
  },
  {
    dayOfWeek: 4,
    dayName: "Thursday",
    splitName: "Upper Body",
    isRestDay: false,
    questTitle: "[Daily Quest] Upper Body Hypertrophy",
    description: "High volume upper body to maximize muscle definition and pump.",
    xpReward: 400,
    exercises: [
      { id: "pf-thu-1", name: "Machine Chest Press", targetGroup: "Chest", sets: 3, reps: "10-15", equipment: "Chest Press Machine", coachTip: "Focus on the squeeze in the center of the chest.", untilFailure: false },
      { id: "pf-thu-2", name: "T-Bar Row (Machine)", targetGroup: "Back", sets: 3, reps: "10-12", equipment: "Row Machine", coachTip: "Keep your lower back safe and pull with your back muscles.", untilFailure: false },
      { id: "pf-thu-3", name: "Pec Deck Flyes", targetGroup: "Chest", sets: 3, reps: "12-15", equipment: "Pec Deck Machine", coachTip: "Hug a barrel, keep a slight bend in your elbows.", untilFailure: true },
      { id: "pf-thu-4", name: "Dumbbell Lateral Raises", targetGroup: "Shoulders", sets: 3, reps: "12-15", equipment: "Dumbbells", coachTip: "Lean slightly forward to target the side delts better.", untilFailure: true },
      { id: "pf-thu-5", name: "Overhead Tricep Extensions", targetGroup: "Triceps", sets: 3, reps: "12-15", equipment: "Cable Machine", coachTip: "Stretch the long head of the tricep for maximum growth.", untilFailure: true }
    ]
  },
  {
    dayOfWeek: 5,
    dayName: "Friday",
    splitName: "Abs & Core (Shredded 6-Pack)",
    isRestDay: false,
    questTitle: "[Daily Quest] Shredded Core",
    description: "Deep, weighted core work for thick, blocky, highly visible abs.",
    xpReward: 400,
    exercises: [
      { id: "pf-fri-1", name: "Heavy Cable Crunches", targetGroup: "Abs", sets: 4, reps: "10-15", equipment: "Cable Machine", coachTip: "Use weight to build thick ab blocks. Keep hips locked, crunch downward.", untilFailure: false },
      { id: "pf-fri-2", name: "Captain's Chair Leg Raises", targetGroup: "Abs", sets: 4, reps: "12-20", equipment: "Captain's Chair", coachTip: "Targets the lower abs. Don't use momentum to swing up.", untilFailure: true },
      { id: "pf-fri-3", name: "Machine Ab Crunches", targetGroup: "Abs", sets: 3, reps: "15-20", equipment: "Ab Machine", coachTip: "Exhale sharply on the crunch to contract fully.", untilFailure: true },
      { id: "pf-fri-4", name: "Weighted Plank", targetGroup: "Abs", sets: 3, reps: "60-90 secs", equipment: "Mat / Weight Plate", coachTip: "Deep core stability. Crucial for heavy lifting and running.", untilFailure: false },
      { id: "pf-fri-5", name: "Dumbbell Side Bends", targetGroup: "Abs", sets: 3, reps: "12-15 (per side)", equipment: "Dumbbells", coachTip: "Builds the obliques for the complete aesthetic core look.", untilFailure: false }
    ]
  },
  {
    dayOfWeek: 6,
    dayName: "Saturday",
    splitName: "Lower Body & Weak Points",
    isRestDay: false,
    questTitle: "[Daily Quest] Legs & Weak Points",
    description: "Hamstrings, glutes, and targeted weak point isolation.",
    xpReward: 400,
    exercises: [
      { id: "pf-sat-1", name: "Smith Machine Romanian Deadlifts", targetGroup: "Legs", sets: 4, reps: "8-12", equipment: "Smith Machine", coachTip: "Push hips back. Essential for hamstring and glute running power.", untilFailure: false },
      { id: "pf-sat-2", name: "Lying Leg Curls", targetGroup: "Legs", sets: 3, reps: "10-15", equipment: "Leg Curl Machine", coachTip: "Isolates the hamstring completely.", untilFailure: true },
      { id: "pf-sat-3", name: "Leg Press Calf Raises", targetGroup: "Legs", sets: 4, reps: "15-20", equipment: "Leg Press", coachTip: "Heavy load on the calves for track explosive speed.", untilFailure: true },
      { id: "pf-sat-4", name: "Face Pulls", targetGroup: "Shoulders", sets: 3, reps: "15-20", equipment: "Cable Machine", coachTip: "Improves posture and rear delts (a common weak point).", untilFailure: true },
      { id: "pf-sat-5", name: "Reverse Pec Deck", targetGroup: "Shoulders", sets: 3, reps: "12-15", equipment: "Pec Deck Machine", coachTip: "Isolates the rear delts for a 3D shoulder look.", untilFailure: true }
    ]
  }
];

export function getTodayWorkout(): WorkoutDay {
  const day = new Date().getDay();
  return PLANET_FITNESS_PLAN[day];
}

export type PlanTier = 'planet_fitness';
