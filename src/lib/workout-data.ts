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

export const KPOP_HOME_WORKOUT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Idol Recharge (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] K-Pop Idol Active Recovery & Flexibility",
    description: "Sunday is your official Idol Rest Day! No high-intensity workout quests today. Focus on K-Pop idol stretching, posture alignment, and hydrating with 1 gallon of water to recharge for Monday.",
    xpReward: 250,
    exercises: [
      {
        id: "sun-1",
        name: "Idol Full Body Flexibility & Posture Stretching",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15-20 mins",
        equipment: "Home Mat / Floor",
        coachTip: "Gently stretch hip flexors, hamstrings, shoulders, and chest to maintain the elegant, upright K-Pop idol posture and relieve muscle soreness."
      },
      {
        id: "sun-2",
        name: "Active Hydration & Idol Recovery Protocol",
        targetGroup: "Full Body",
        sets: 1,
        reps: "1 Gallon Water",
        equipment: "Water Jug",
        coachTip: "Hydrate thoroughly with 1 gallon of water and ensure optimal rest to recover your muscles for Monday's workouts and meal prep!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A + Official Monday Meal Prep Day",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push A & Monday Weekly Meal Prep",
    description: "Official Monday Grocery Run & Weekly Batch Meal Prep Day + Home sculpting for chest, shoulders, and triceps. Hit Auburn ME Walmart for your under-$50 list and prep your Korean Bulgogi & Dirty Chai!",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Weekly Bulgogi & Chai Prep",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your under-$50 core grocery list at Auburn ME Walmart, batch-prep your Korean Bulgogi beef bowls, and mix your Tazo Dirty Chai concentrate for the week!"
      },
      {
        id: "mon-1",
        name: "Home Bodyweight Push-Ups (or Elevated Push-Ups)",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Floor or Chair/Couch Edge",
        coachTip: "Keep body in a rigid straight line from heels to head. Lower until chest barely brushes floor, explode upward while squeezing pecs."
      },
      {
        id: "mon-2",
        name: "Pike Push-Ups (Idol Shoulder Armor)",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Floor / Bodyweight",
        coachTip: "Hinge at hips into an inverted V position. Lower crown of head toward floor and press back up to sculpt rounded shoulder caps."
      },
      {
        id: "mon-3",
        name: "Chair or Couch Edge Tricep Dips",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch",
        coachTip: "Keep back close to the edge of chair. Lower elbows to 90 degrees and lock out triceps hard at the top."
      },
      {
        id: "mon-4",
        name: "Idol Standing Posture Wall Slides",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Wall",
        coachTip: "Press lower back, elbows, and wrists against wall. Slide arms overhead while keeping contact to fix posture and open chest."
      },
      {
        id: "mon-5",
        name: "Isometric Towel / Resistance Chest Squeeze",
        targetGroup: "Chest",
        sets: 3,
        reps: "30 seconds hold",
        equipment: "Towel or Resistance Band",
        coachTip: "Hold towel in front of chest with palms pressing inward hard. Squeeze pecs continuously for 30 seconds."
      },
      {
        id: "mon-6",
        name: "K-Pop Choreography Arm Circle Burnout",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "45 seconds",
        equipment: "Bodyweight",
        coachTip: "Fast, controlled arm circles forward and backward to tone shoulder definition and endurance."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (Idol V-Taper Back & Bicep Toning)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull A Home Idol Sculpt",
    description: "Sculpt upper back width, posture, and arm tone at home using resistance bands, dumbbells/water bottles, or doorway frame rows.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Doorframe Isometric Rows or Towel Rows",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Doorframe or Towel",
        coachTip: "Grip doorframe or wrapped towel, lean back with rigid torso, and pull chest forward by driving elbows backward."
      },
      {
        id: "tue-2",
        name: "Bent-Over Dumbbell / Backpack Rows",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells or Weighted Backpack",
        coachTip: "Hinge at hips with flat lower back. Pull weight into your belly button, squeezing shoulder blades together at the top."
      },
      {
        id: "tue-3",
        name: "Prone Reverse Snow Angels",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Floor / Mat",
        coachTip: "Lie face down, lift chest slightly, and sweep arms from hips up overhead while squeezing upper back and rear delts."
      },
      {
        id: "tue-4",
        name: "Standing Bicep Curls (Dumbbells or Bands)",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells or Resistance Band",
        coachTip: "Keep elbows pinned to your ribs. Curl weight up smoothly and contract bicep peak for 1 second."
      },
      {
        id: "tue-5",
        name: "Idol Prone Cobra Posture Hold",
        targetGroup: "Back",
        sets: 3,
        reps: "45 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "Lie face down, lift chest and hands off floor with thumbs pointed to ceiling. Builds incredible K-Pop stage posture."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs & Core A (Idol Lower Body & Choreography Abs)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Legs & Core A Home Idol Sculpt",
    description: "High-energy lower body sculpting and choreography-inspired core work for lean idol leg lines and tight abs.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-1",
        name: "K-Pop Idol Tempo Bodyweight Squats",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Bodyweight",
        coachTip: "Descend 3 seconds down, pause 1 second at 90 degrees, drive up quickly. Keeps constant tension on quads and glutes."
      },
      {
        id: "wed-2",
        name: "Bulgarian Split Squats (Rear Foot Elevated)",
        targetGroup: "Legs",
        sets: 3,
        reps: "10-12 reps per leg",
        equipment: "Chair / Couch & Bodyweight",
        coachTip: "Elevate back foot on sturdy chair. Lower rear knee toward floor while keeping front foot flat. Incredible glute & quad sculptor."
      },
      {
        id: "wed-3",
        name: "Choreography High-Knee Cardio Intervals",
        targetGroup: "Legs",
        sets: 4,
        reps: "45 seconds work / 15s rest",
        equipment: "Bodyweight",
        coachTip: "Drive knees high to waist level to K-Pop tempo. Burns fat rapidly while conditioning hip flexors."
      },
      {
        id: "wed-4",
        name: "Idol 11-Line Abs Lying Leg Raises",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Floor / Mat",
        coachTip: "Press lower back firmly into mat. Lower straightened legs until just above floor, then lift using lower abs."
      },
      {
        id: "wed-5",
        name: "Standing Oblique Knee-to-Elbow Crunches",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 reps (10 per side)",
        equipment: "Bodyweight",
        coachTip: "Bring elbow to meet opposite driving knee with a sharp torso twist to sculpt tight waistlines."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (Idol Shoulder Armor & Tricep Sculpt)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push B Home Idol Sculpt",
    description: "Focus on shoulder width and tricep definition to give your upper body clean, crisp proportions.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Diamond / Close-Grip Push-Ups",
        targetGroup: "Triceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Floor or Elevated Bench",
        coachTip: "Form a diamond with thumbs and index fingers under chest. Targets triceps and inner chest."
      },
      {
        id: "thu-2",
        name: "Standing Lateral Raises (Dumbbells or Bands)",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "Dumbbells or Bands",
        coachTip: "Raise arms out to sides until parallel to floor. Builds wide idol shoulders that make your waist look smaller."
      },
      {
        id: "thu-3",
        name: "Decline Push-Ups (Feet Elevated on Chair)",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Chair / Couch",
        coachTip: "Elevating feet shifts focus to upper chest and anterior delts for a complete, square chest profile."
      },
      {
        id: "thu-4",
        name: "Overhead Tricep Extension (Dumbbell or Band)",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Dumbbell or Resistance Band",
        coachTip: "Keep elbows pointing forward overhead. Lower weight behind head for deep long-head tricep stretch."
      },
      {
        id: "thu-5",
        name: "Idol High Plank Hold",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "Hold top of push-up position with glutes locked and belly button drawn in tight."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B (Idol Back Thickness & Arm Definition)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull B Home Idol Sculpt",
    description: "Back thickness and arm vascularity sculpting using home equipment and targeted posture holds.",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Single-Arm Dumbbell / Backpack Rows",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps per side",
        equipment: "Dumbbell or Weighted Backpack",
        coachTip: "Brace non-working hand on chair. Pull elbow straight toward ceiling, squeezing lat hard at top."
      },
      {
        id: "fri-2",
        name: "Idol Prone Y-T-W Posture Raises",
        targetGroup: "Back",
        sets: 3,
        reps: "10 reps each position (30 total)",
        equipment: "Floor / Mat",
        coachTip: "Form Y, T, and W shapes with arms lying face down. Strengthens rotator cuff and upper back for confident stage posture."
      },
      {
        id: "fri-3",
        name: "Hammer Curls (Neutral Grip)",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells",
        coachTip: "Palms facing each other. Builds forearm thickness and bicep height."
      },
      {
        id: "fri-4",
        name: "Doorframe Isometric Lat Squeeze",
        targetGroup: "Back",
        sets: 3,
        reps: "30 seconds hold",
        equipment: "Doorframe",
        coachTip: "Stand inside doorway, press elbows outward against frame hard for 30 seconds to activate lat fibers."
      },
      {
        id: "fri-5",
        name: "Wrist Curls & Extensions",
        targetGroup: "Forearms",
        sets: 3,
        reps: "15-20 reps",
        equipment: "Light Dumbbells or Water Bottles",
        coachTip: "Curl wrists up and down over edge of knee for defined forearm vascularity."
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs & Core B (Idol Glutes, Hamstrings & 11-Line Abs)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Legs & Core B Home Idol Sculpt",
    description: "Complete your 6-day training split with glute/hamstring toning and K-Pop 11-line ab sculpting before Sunday rest day!",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Single-Leg Glute Bridges",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps per leg",
        equipment: "Floor / Mat",
        coachTip: "Drive through heel of grounded foot, lifting hips until torso and thigh form a straight line. Squeeze glutes hard."
      },
      {
        id: "sat-2",
        name: "Romanian Deadlifts (Dumbbells or Backpack)",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells or Weighted Backpack",
        coachTip: "Soft bend in knees. Hinge hips backward until hamstrings stretch deep, then squeeze glutes forward to stand."
      },
      {
        id: "sat-3",
        name: "K-Pop Choreography Skater Hops",
        targetGroup: "Legs",
        sets: 3,
        reps: "45 seconds work",
        equipment: "Bodyweight",
        coachTip: "Hop laterally from foot to foot like an ice skater, absorbing landing smoothly. Great lateral glute & cardio conditioner."
      },
      {
        id: "sat-4",
        name: "K-Pop Idol Russian Twists",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 twists (10 per side)",
        equipment: "Floor / Light Weight",
        coachTip: "Balance on sit bones with feet slightly elevated. Rotate torso smoothly side to side."
      },
      {
        id: "sat-5",
        name: "11-Line Abs Elbow Plank Hold",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds hold",
        equipment: "Floor / Mat",
        coachTip: "Squeeze glutes and draw belly button toward spine to carve deep vertical core definition."
      }
    ]
  }
];

export const PLANET_FITNESS_PPL_ROUTINE = KPOP_HOME_WORKOUT_ROUTINE;

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return KPOP_HOME_WORKOUT_ROUTINE.find(d => d.dayOfWeek === dayIndex) || KPOP_HOME_WORKOUT_ROUTINE[0];
}
