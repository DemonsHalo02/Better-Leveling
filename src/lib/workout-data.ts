export interface Exercise {
  id: string;
  name: string;
  targetGroup: 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Forearms' | 'Legs' | 'Abs' | 'Full Body' | 'Cardio';
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

const dailyExercises: Exercise[] = [
  {
    id: "bw-squat",
    name: "Bodyweight Squats",
    targetGroup: "Legs",
    sets: 3,
    reps: "20 reps",
    equipment: "Bodyweight",
    coachTip: "Keep your chest up and go deep.",
    untilFailure: false
  },
  {
    id: "bw-crunches",
    name: "Crunches",
    targetGroup: "Abs",
    sets: 3,
    reps: "20 reps",
    equipment: "Bodyweight",
    coachTip: "Squeeze your abs at the top of the movement.",
    untilFailure: false
  },
  {
    id: "bw-pushups",
    name: "Pushups",
    targetGroup: "Chest",
    sets: 3,
    reps: "15 reps",
    equipment: "Bodyweight",
    coachTip: "Keep your core tight and back straight.",
    untilFailure: false
  },
  {
    id: "bw-plank",
    name: "Plank",
    targetGroup: "Abs",
    sets: 3,
    reps: "30 seconds",
    equipment: "Bodyweight",
    coachTip: "Keep your body in a straight line.",
    untilFailure: false
  }
];

export const DAILY_ROUTINE: WorkoutDay[] = [0, 1, 2, 3, 4, 5, 6].map(day => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    dayOfWeek: day,
    dayName: days[day],
    splitName: "Daily Bodyweight",
    isRestDay: false,
    questTitle: "[Daily Quest] Core Bodyweight",
    description: "Daily 20 reps bodyweight squats and crunches, 15 reps pushups, and 30 second plank. 3 sets daily with the option to do more.",
    xpReward: 500,
    exercises: dailyExercises
  };
});

export const getTodayWorkout = (): WorkoutDay => {
  const dayIndex = new Date().getDay();
  return DAILY_ROUTINE.find(d => d.dayOfWeek === dayIndex) || DAILY_ROUTINE[0];
};
