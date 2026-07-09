export interface Exercise {
  id: string;
  name: string;
  targetGroup: 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Forearms' | 'Legs' | 'Abs' | 'Full Body';
  sets: number;
  reps: string;
  equipment: string;
  coachTip: string;
  weightUsed?: number;
  completedSets?: number;
}

export interface WorkoutDay {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  dayName: string;
  splitName: string;
  isRestDay: boolean;
  questTitle: string;
  description: string;
  xpReward: number;
  exercises: Exercise[];
}

export const JAPANESE_HOME_WORKOUT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Dojo Zen Recovery (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Japanese Dojo Active Recovery & Zen Meditation",
    description: "Sunday is your official Dojo Rest & Zen Day! Focus on full-body mobility stretching, green tea hydration, and recovery to prepare your mind and body for Monday's workouts and meal prep.",
    xpReward: 250,
    exercises: [
      {
        id: "sun-1",
        name: "Samurai Full Body Mobility & Posture Stretching [Beginner -> Expert]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15-20 mins",
        equipment: "Home Mat / Floor",
        coachTip: "[Beginner: Gentle child's pose & doorway chest opener | Intermediate: Samurai kneeling hip flexor & thoracic stretches | Expert: Full pancake split & bridge progressions] Open your posture and relieve muscle soreness."
      },
      {
        id: "sun-2",
        name: "Active Hydration & Green Tea Recovery Protocol",
        targetGroup: "Full Body",
        sets: 1,
        reps: "1 Gallon Water + Matcha",
        equipment: "Water Jug",
        coachTip: "Hydrate thoroughly with 1 gallon of water and Japanese antioxidant green tea to recover your muscles for Monday's workouts and meal prep!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (Dojo Striking & Push) + Official Monday Meal Prep Day",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push A & Japanese Monday Weekly Meal Prep",
    description: "Official Monday Grocery Run & Weekly Batch Meal Prep Day + Home Dojo Push workout for chest, shoulders, and triceps. Hit Auburn ME Walmart for your under-$50 list and prep your Samurai Teriyaki & Dirty Matcha!",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Japanese Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Weekly Samurai Teriyaki & Matcha Prep",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your under-$50 Japanese core grocery list at Auburn ME Walmart, batch-sear your teriyaki chicken breasts and soft-boiled eggs, and get your Dirty Matcha ingredients ready!"
      },
      {
        id: "mon-1",
        name: "Dojo Push-Ups Progression [Beginner -> Intermediate -> Expert]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Floor or Chair/Couch Edge",
        coachTip: "[Beginner: Wall or Incline Push-Ups on couch edge | Intermediate: Strict Dojo Floor Push-Ups with 2s negative | Expert: Archer Push-Ups or Decline Diamond Push-Ups] Keep body rigid from heels to crown."
      },
      {
        id: "mon-2",
        name: "Pike Push-Ups Progression [Beginner -> Intermediate -> Expert]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Floor / Bodyweight",
        coachTip: "[Beginner: Knee Pike Push-Ups | Intermediate: Standard Inverted V Pike Push-Ups | Expert: Feet-Elevated Pike Push-Ups or Handstand Push-Up Negatives] Build rounded samurai shoulder armor."
      },
      {
        id: "mon-3",
        name: "Tricep Extension Dips [Beginner -> Intermediate -> Expert]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch",
        coachTip: "[Beginner: Chair Dips with bent knees flat on floor | Intermediate: Straight-leg Chair Dips | Expert: Elevated-feet Dips or Diamond Floor Push-Ups] Lock out triceps hard at the top."
      },
      {
        id: "mon-4",
        name: "Samurai Wall Slides & Posture Correction",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Wall",
        coachTip: "[Beginner -> Expert] Press lower back, elbows, and wrists against wall. Slide arms overhead while keeping contact to open chest and improve posture."
      },
      {
        id: "mon-5",
        name: "Isometric Dojo Chest Squeeze Hold",
        targetGroup: "Chest",
        sets: 3,
        reps: "30-45 seconds hold",
        equipment: "Towel or Resistance Band",
        coachTip: "[Beginner: 30s Hold | Intermediate: 45s Hold | Expert: 60s Pulse & Hold] Squeeze hands together against towel/band at chest height with maximum tension."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (Samurai Back Width & Bicep Toning)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull A Home Dojo Sculpt",
    description: "Sculpt upper back V-taper, posture, and bicep strength at home using doorframe rows, backpacks/dumbbells, or resistance bands.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Bodyweight Rows Progression [Beginner -> Intermediate -> Expert]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Doorframe / Table / Bar",
        coachTip: "[Beginner: Doorframe Isometric Rows | Intermediate: Incline Table/Sheet Rows | Expert: Strict Pull-Ups or Slow-Negative Table Rows] Drive elbows back and squeeze shoulder blades."
      },
      {
        id: "tue-2",
        name: "Bent-Over Backpack / Dumbbell Rows [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells or Loaded Backpack",
        coachTip: "[Beginner: Single-arm supported row | Intermediate: Double-arm bent row | Expert: 3-second hold at contraction] Pull weight into lower ribcage keeping flat spine."
      },
      {
        id: "tue-3",
        name: "Prone Reverse Snow Angels [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: Unweighted sweep | Intermediate: Hold light water bottles | Expert: Hover chest and legs simultaneously] Strengthen upper back and rear deltoids."
      },
      {
        id: "tue-4",
        name: "Samurai Bicep Curls [Beginner -> Intermediate -> Expert]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells, Backpack, or Bands",
        coachTip: "[Beginner: Standard controlled curls | Intermediate: 3s negative curls | Expert: Zottman curls with twist] Keep elbows pinned to ribs throughout."
      },
      {
        id: "tue-5",
        name: "Dojo Prone Cobra Posture Hold [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 3,
        reps: "45 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: 30s | Intermediate: 45s | Expert: 60s with arm pulses] Lie face down, lift chest and hands off floor with thumbs pointing up."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs & Core A (Samurai Lower Body & Core Armor)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Legs & Core A Home Dojo Sculpt",
    description: "High-energy lower body power and dojo core conditioning for strong legs and carved abdominal armor.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-1",
        name: "Samurai Sumo & Tempo Squats [Beginner -> Intermediate -> Expert]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Bodyweight",
        coachTip: "[Beginner: Chair-assisted squats | Intermediate: 3s negative Samurai Sumo Squats | Expert: Jump Squats or Pistol Squats progression] Keep heels planted and chest proud."
      },
      {
        id: "wed-2",
        name: "Bulgarian Split Squats [Beginner -> Intermediate -> Expert]",
        targetGroup: "Legs",
        sets: 3,
        reps: "10-12 reps per leg",
        equipment: "Chair / Couch & Bodyweight",
        coachTip: "[Beginner: Split stationary lunges on floor | Intermediate: Rear foot elevated on couch | Expert: Rear foot elevated + slow bottom pause] Carves glutes and quads."
      },
      {
        id: "wed-3",
        name: "Dojo High-Knee Agility Intervals [Beginner -> Expert]",
        targetGroup: "Legs",
        sets: 4,
        reps: "45 seconds work / 15s rest",
        equipment: "Bodyweight",
        coachTip: "[Beginner: Fast marching | Intermediate: High knees running | Expert: Explosive tuck jumps / shadow boxing knees] Torch fat and condition stamina."
      },
      {
        id: "wed-4",
        name: "Samurai Lying Core Leg Raises [Beginner -> Expert]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: Single-leg alternating raises | Intermediate: Double leg raises | Expert: Dragon flag negatives] Keep lower back pressed firmly into floor."
      },
      {
        id: "wed-5",
        name: "Dojo Hollow Body Hold [Beginner -> Intermediate -> Expert]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: Tuck Hollow Hold | Intermediate: Full Hollow Body Hold | Expert: Hollow Body Rocks] Lock ribcage down to build unbreakable core armor."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (Explosive Striking Push & Shoulder Sculpt)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push B Home Dojo Sculpt",
    description: "Target upper chest, medial deltoids, and tricep definition with explosive dojo push variations.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Decline / Elevated Dojo Push-Ups [Beginner -> Expert]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Chair / Couch & Floor",
        coachTip: "[Beginner: Incline push-ups on couch | Intermediate: Feet elevated decline push-ups | Expert: Plyometric clapping or plyo push-ups] Focus on upper chest squeeze."
      },
      {
        id: "thu-2",
        name: "Diamond / Close-Grip Push-Ups [Beginner -> Expert]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Floor / Bodyweight",
        coachTip: "[Beginner: Close-grip hands on wall/couch | Intermediate: Diamond hands on knees | Expert: Strict full Diamond Push-Ups] Carves tricep horseshoes and inner pecs."
      },
      {
        id: "thu-3",
        name: "Lateral Shoulder Raises (Water Bottles / Dumbbells)",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "Dumbbells or Water Bottles",
        coachTip: "[Beginner -> Expert] Raise arms out to sides with slight elbow bend until parallel to floor. Builds broad shoulder width."
      },
      {
        id: "thu-4",
        name: "Overhead Tricep Extension (Dumbbell or Backpack)",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Dumbbell or Backpack",
        coachTip: "[Beginner -> Expert] Keep upper arms close to ears. Extend weight overhead smoothly to target long head of triceps."
      },
      {
        id: "thu-5",
        name: "Shadow Boxing & Striking Shoulder Burnout",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "60 seconds",
        equipment: "Bodyweight",
        coachTip: "[Beginner -> Expert] Fast, crisp straight punches and hooks to condition shoulder endurance and core rotation."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B (Samurai Back Thickness & Bicep Peak)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull B Home Dojo Sculpt",
    description: "Develop mid-back density, posture, and bicep peak definition to complete your upper body V-taper.",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Underhand Grip Rows / Chin-Up Progression [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Table / Doorframe / Bar",
        coachTip: "[Beginner: Underhand doorframe row | Intermediate: Underhand inverted table row | Expert: Strict Chin-Ups] Targets lower lats and biceps."
      },
      {
        id: "fri-2",
        name: "Single-Arm Backpack Lawn Mower Rows [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 3,
        reps: "12 reps per side",
        equipment: "Backpack or Dumbbell",
        coachTip: "[Beginner: Moderate weight | Intermediate: Heavy weight with stretch | Expert: Explosive pull + 2s squeeze] Core braced and back flat."
      },
      {
        id: "fri-3",
        name: "Rear Delt T-Raises & Y-Raises [Beginner -> Expert]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Floor or Light Bottles",
        coachTip: "[Beginner: Unweighted lying T/Y raises | Intermediate: Light water bottles | Expert: High-rep slow tempo] Builds rear delts and posture."
      },
      {
        id: "fri-4",
        name: "Hammer Curls Progression [Beginner -> Expert]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells or Backpack",
        coachTip: "[Beginner -> Expert] Neutral palm-in grip curls. Sculpts brachialis for fuller arm appearance."
      },
      {
        id: "fri-5",
        name: "Samurai Superman Hold [Beginner -> Expert]",
        targetGroup: "Back",
        sets: 3,
        reps: "45 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: 30s | Intermediate: 45s | Expert: 60s arch hold] Strengthens lower back erectors and glutes."
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs & Core B (Agility, Speed & Core Mastery)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Saturday Dojo Agility & Core Finale",
    description: "Weekend lower body agility, lateral glute strength, and core mastery to finish off the week with maximum XP.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Reverse & Lateral Dojo Lunges [Beginner -> Expert]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12 reps per leg",
        equipment: "Bodyweight",
        coachTip: "[Beginner: Alternating reverse lunges | Intermediate: Lateral side lunges | Expert: Plyo jumping lunges] Excellent for hip mobility and glute tone."
      },
      {
        id: "sat-2",
        name: "Single-Leg Glute Bridges [Beginner -> Expert]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12-15 reps per leg",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: Double-leg glute bridge | Intermediate: Single-leg bridge | Expert: Single-leg elevated bridge] Drive through heel and squeeze glutes."
      },
      {
        id: "sat-3",
        name: "Samurai Skater Hops [Beginner -> Expert]",
        targetGroup: "Legs",
        sets: 3,
        reps: "45 seconds work",
        equipment: "Bodyweight",
        coachTip: "[Beginner: Step skaters | Intermediate: Bound skater hops | Expert: Explosive distance hops] Lateral power and cardio conditioning."
      },
      {
        id: "sat-4",
        name: "Dojo Russian Core Twists [Beginner -> Expert]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 twists (10 per side)",
        equipment: "Floor / Light Weight",
        coachTip: "[Beginner: Heels lightly touching floor | Intermediate: Elevated heels | Expert: Weighted twist with pause] Carves obliques."
      },
      {
        id: "sat-5",
        name: "Samurai Forearm Plank Hold [Beginner -> Expert]",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "[Beginner: 30-45s | Intermediate: 60s | Expert: Long-lever plank walkouts] Complete full-body tension to finish the training week."
      }
    ]
  }
];

export const KPOP_HOME_WORKOUT_ROUTINE = JAPANESE_HOME_WORKOUT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = JAPANESE_HOME_WORKOUT_ROUTINE;

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return JAPANESE_HOME_WORKOUT_ROUTINE.find(d => d.dayOfWeek === dayIndex) || JAPANESE_HOME_WORKOUT_ROUTINE[0];
}
