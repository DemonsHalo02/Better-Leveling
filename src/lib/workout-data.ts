export interface Exercise {
  id: string;
  name: string;
  targetGroup: 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Forearms' | 'Legs' | 'Abs' | 'Full Body' | 'Nutrition / Batch Prep' | 'Cardio';
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

export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Active Recovery & Green Tea Detox (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Planet Fitness Active Recovery & Green Tea Detox",
    description: "Sunday is your official System Restoration Day! Focus on 20-30 minutes of gentle incline walking on Planet Fitness treadmills, full-body foam rolling/stretching, and 100% green tea hydration to prepare your physique for Monday's grocery run, batch meal prep, and Push A training.",
    xpReward: 250,
    exercises: [
      {
        id: "sun-1",
        name: "Planet Fitness Incline Treadmill Active Recovery Walk [20-30 Minutes]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 2.5-3.0 MPH, 6-10% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Set treadmill to a moderate incline (6-10%) and steady pace (2.5-3.0 MPH). Low-impact steady-state walking increases blood flow, flushes metabolic waste, and burns fat without stressing joints or skin."
      },
      {
        id: "sun-2",
        name: "Full Body Stretching, Posture Mobility & PF Stretching Area Mat Work",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15-20 mins",
        equipment: "Stretching Area Mat & Foam Roller (Lewiston PF)",
        coachTip: "Use the PF stretching area mats and foam rollers to release tension in chest, lats, hips, and hamstrings before the Monday training week begins."
      },
      {
        id: "sun-3",
        name: "Active Hydration & 100% Green Tea Antioxidant Protocol",
        targetGroup: "Full Body",
        sets: 1,
        reps: "1 Gallon Water + Green Tea Bags",
        equipment: "Water Jug & Green Tea",
        coachTip: "Hydrate thoroughly with 1 gallon of water and antioxidant green tea to support skin elasticity during weight loss and recover your muscles for Monday's workouts and Korean Gochujang Shred meal prep!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (Chest, Anterior Delts, Triceps) + Monday Grocery & Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push A & Korean Gochujang Shred Monday Batch Meal Prep",
    description: "Official Monday Grocery Run & Weekly Batch Meal Prep Day + Push A workout using Lewiston Maine Planet Fitness equipment! Hit Auburn ME Walmart for your $45.38 weekly list ($32.78 restock), batch prep your Korean Gochujang Shred meals for Tuesday start, and crush your chest/shoulder/tricep workout.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Korean Gochujang Shred Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Korean Gochujang Shred Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your under-$50 Korean Gochujang Shred Weekly Consumables ($45.38) at Auburn ME Walmart. Batch-cook chicken breasts, rice, and broccoli on Monday so your meal prep eating begins seamlessly on Tuesday!"
      },
      {
        id: "mon-1",
        name: "Planet Fitness Smith Machine Flat Bench Press [Chest Compound]",
        targetGroup: "Chest",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Smith Machine & Flat Bench (Lewiston PF)",
        coachTip: "Position flat bench centrally under Smith bar. Lower bar smoothly to mid-chest with 2-second negative, drive up explosively. Builds dense pectoral armor while maintaining control."
      },
      {
        id: "mon-2",
        name: "Planet Fitness Seated Chest Press Machine or Incline Dumbbell Press",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Chest Press Machine or Dumbbells & Incline Bench",
        coachTip: "Adjust seat height so handles align with upper chest. Squeeze chest hard at full extension without locking elbows to maintain constant muscular tension."
      },
      {
        id: "mon-3",
        name: "Dual Adjustable Pulley / Cable Crossover Flys [Chest Isolation]",
        targetGroup: "Chest",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Cable Cross Station (Lewiston PF)",
        coachTip: "Set pulleys to mid/high position. Step forward with one foot, bring handles together in front of chest in a hugging motion with a 1-second squeeze."
      },
      {
        id: "mon-4",
        name: "Planet Fitness Seated Shoulder Press Machine or Dumbbell Overhead Press",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Shoulder Press Machine or Dumbbells",
        coachTip: "Keep core braced against back pad. Press upward overhead, stopping just short of lockout to keep tension on anterior and medial deltoids."
      },
      {
        id: "mon-5",
        name: "Planet Fitness Cable Tricep Pushdowns (Rope or V-Bar Attachment)",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Cable Pulley Station & Rope/V-Bar",
        coachTip: "Pin upper arms firmly to sides. Push down and spread rope ends at the bottom, locking out triceps for maximum horseshoe contraction."
      },
      {
        id: "mon-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 3.0 MPH, 5-8% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Complete your 20-30 minutes of steady incline walking on the treadmill right after lifting. Optimal for burning 1 lb/week without muscle loss or loose skin!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (Upper Back Width, Lats, Rear Delts, Biceps) - Start Eating Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull A V-Taper Sculpt & Start Eating Prep",
    description: "First day of eating your prepped Korean Gochujang Shred meals + Pull A workout at Lewiston Maine Planet Fitness! Build wide lats, upper back thickness, and bicep peaks using cable stations and machines.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Planet Fitness Wide-Grip Lat Pulldown Machine [Back V-Taper Width]",
        targetGroup: "Back",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Lat Pulldown Machine (Lewiston PF)",
        coachTip: "Take a wide grip on the bar. Drive elbows straight down toward ribs while lifting chest up. Squeeze lats hard at bottom of movement."
      },
      {
        id: "tue-2",
        name: "Planet Fitness Seated Cable Row (Close-Grip V-Bar or Wide Attachment)",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Seated Cable Row Station (Lewiston PF)",
        coachTip: "Keep slight bend in knees and upright spine. Pull V-bar directly into lower ribcage, squeezing shoulder blades together for 2 full seconds."
      },
      {
        id: "tue-3",
        name: "Pec Deck Rear Delt Fly Machine or Cable Face Pulls",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Rear Delt Machine or Cable Pulley Station",
        coachTip: "Face toward the machine pad or use rope attachment on high pulley. Pull weight out and back to target rear deltoids and upper trap posture."
      },
      {
        id: "tue-4",
        name: "Planet Fitness Standing EZ-Bar or Dumbbell Bicep Curls",
        targetGroup: "Biceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Fixed EZ-Bars or Dumbbells (Lewiston PF)",
        coachTip: "Keep elbows glued to ribs. Curl bar smoothly toward chin with zero body swinging. Lower with a controlled 3-second negative."
      },
      {
        id: "tue-5",
        name: "Single-Arm Cable Curls or Preacher Curl Machine [Bicep Isolation]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Preacher Machine or Low Cable Pulley",
        coachTip: "Isolate bicep peak by keeping upper arm stationary on pad or against ribs. Squeeze peak hard at top contraction."
      },
      {
        id: "tue-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 3.0 MPH, 5-8% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Complete 20-30 minutes of incline walking on the treadmill after lifting to keep fat oxidation high while preserving lean muscle mass."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs & Core A (Quads, Hamstrings, Calves, Abdominal Carve)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Legs & Core A Lower Body Sculpt",
    description: "High-intensity lower body training and core armor conditioning using Lewiston Maine Planet Fitness leg machines and Captain's Chair abdominal station.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-1",
        name: "Planet Fitness Leg Press Machine [Quad & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Leg Press Machine (Lewiston PF)",
        coachTip: "Place feet shoulder-width on sled. Lower sled deeply with control until knees are near 90 degrees without letting lower back lift off pad. Press up through mid-foot."
      },
      {
        id: "wed-2",
        name: "Planet Fitness Leg Extension Machine [Quad Isolation & Tear Drop]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Leg Extension Machine (Lewiston PF)",
        coachTip: "Extend legs fully and pause at top for 2 seconds to isolate quad tear-drop (VMO). Lower under strict control."
      },
      {
        id: "wed-3",
        name: "Planet Fitness Seated or Lying Leg Curl Machine [Hamstring Sculpt]",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Leg Curl Machine (Lewiston PF)",
        coachTip: "Curl weight toward glutes smoothly. Focus on hamstring stretch at extension and forceful contraction at flexion."
      },
      {
        id: "wed-4",
        name: "Seated or Standing Calf Raise Machine [Lower Leg Armor]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Calf Raise Machine or Leg Press Calf Press",
        coachTip: "Allow heels to drop for deep stretch at bottom, push up onto balls of feet with full ankle extension and hold for 1 second."
      },
      {
        id: "wed-5",
        name: "Captain's Chair Hanging Knee / Leg Raises or Abdominal Crunch Machine",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Captain's Chair Station or Ab Crunch Machine",
        coachTip: "Support upper body on Captain's Chair pads. Raise knees/legs toward chest by rolling pelvis upward to engage lower abdominals completely."
      },
      {
        id: "wed-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 2.8-3.0 MPH, Moderate Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Finish leg day with 20-30 minutes of steady walking to flush lactic acid from lower body while burning abdominal fat."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (Upper Chest Focus, Lateral Delt Capping, Triceps)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Push B Upper Chest & Shoulder Capping",
    description: "Target upper chest, medial deltoid width, and tricep horseshoe definition using Smith machine incline press and cable lateral raises at Lewiston Planet Fitness.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Planet Fitness Smith Machine Incline Bench Press [Upper Chest]",
        targetGroup: "Chest",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Smith Machine & 30-Degree Incline Bench (Lewiston PF)",
        coachTip: "Set incline bench to 30 degrees under bar. Lower bar slowly to upper clavicle area, drive upward focusing on upper chest contraction."
      },
      {
        id: "thu-2",
        name: "Planet Fitness Pec Deck Fly Machine (Chest Fly Station)",
        targetGroup: "Chest",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Pec Deck Machine (Lewiston PF)",
        coachTip: "Keep elbows slightly bent. Bring arms together smoothly across chest, squeezing inner pecs hard at center."
      },
      {
        id: "thu-3",
        name: "Cable Lateral Raises (Dual Pulley or Single-Arm) or Dumbbell Raises",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "Low Cable Pulley or Dumbbells",
        coachTip: "Raise cables or dumbbells out to sides until parallel to floor. Lead slightly with elbows to cap lateral deltoid width."
      },
      {
        id: "thu-4",
        name: "Overhead Cable Tricep Extension (Rope Attachment Facing Away)",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Cable Station & Rope Attachment",
        coachTip: "Face away from cable tower with rope held behind head. Extend overhead to place maximum stretch and tension on long head of triceps."
      },
      {
        id: "thu-5",
        name: "Planet Fitness Dumbbell or Cable Shrugs [Upper Trap Density]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Heavy Dumbbells or Low Cable Bar",
        coachTip: "Shrug shoulders straight toward ears with a 2-second hold at the top. Do not roll shoulders."
      },
      {
        id: "thu-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 3.0 MPH, 5-8% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Complete 20-30 minutes of steady-state incline walking on the treadmill right after lifting."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B (Back Thickness, Lats Stretch, Brachialis & Biceps Peak)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Pull B Mid-Back Density & Brachialis Peak",
    description: "Develop mid-back density, lower lat stretch, and thicker forearms/biceps using single-arm dumbbell rows and neutral-grip pulldowns.",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Neutral-Grip Lat Pulldown or Assisted Pull-Up Machine",
        targetGroup: "Back",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Lat Pulldown (V-Bar / Parallel Handle) or Assisted Pull-Up",
        coachTip: "Use neutral (palms facing each other) handle. Pull straight down to upper chest, emphasizing lower lat squeeze and biceps."
      },
      {
        id: "fri-2",
        name: "Single-Arm Dumbbell Row on Flat Bench [Mid-Back Thickness]",
        targetGroup: "Back",
        sets: 3,
        reps: "10-12 reps per side",
        equipment: "Heavy Dumbbells & Flat Bench (Lewiston PF)",
        coachTip: "Support opposite knee and hand on flat bench. Pull dumbbell up to lower hip/ribcage, keeping back flat and elbow close to body."
      },
      {
        id: "fri-3",
        name: "Straight-Arm Lat Pulldown (Cable Rope Attachment) [Lat Isolation]",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 reps",
        equipment: "High Cable Pulley & Rope Attachment",
        coachTip: "Keep arms straight with slight elbow bend. Pull rope down from forehead height to thighs using only lats without bending elbows."
      },
      {
        id: "fri-4",
        name: "Planet Fitness Dumbbell Hammer Curls [Brachialis & Forearm Thickness]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Dumbbells (Lewiston PF)",
        coachTip: "Keep palms facing inward (neutral grip) throughout entire curl. Sculpts brachialis muscle under biceps for thicker arm look."
      },
      {
        id: "fri-5",
        name: "Cable Rope Hammer Curls or High Pulley Bicep Flex Curls",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Low Cable Pulley with Rope",
        coachTip: "Keep elbows fixed against ribs. Curl rope ends toward front delts with constant cable tension at bottom and top."
      },
      {
        id: "fri-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 3.0 MPH, 5-8% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Finish off your pull day with 20-30 minutes of steady incline walking on the treadmill."
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs & Core B (Hamstrings Focus, Glute Density, Core Carve)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear Saturday Legs B & Core Carve Finale",
    description: "Weekend lower body density focusing on hamstrings, glutes, and obliques using Romanian deadlifts and lunges at Lewiston Planet Fitness to finish off the training week.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Smith Machine Romanian Deadlifts (RDLs) or Dumbbell RDLs",
        targetGroup: "Legs",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Smith Machine or Dumbbells (Lewiston PF)",
        coachTip: "Keep slight bend in knees, hinge hips straight back while lowering bar along shins until deep hamstring stretch is felt. Squeeze glutes to stand."
      },
      {
        id: "sat-2",
        name: "Planet Fitness Leg Press (High Foot Placement for Glutes / Hamstrings)",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Leg Press Machine (Lewiston PF)",
        coachTip: "Place feet high and wide on leg press footboard. Shifts focus directly to posterior chain (glutes and hamstrings)."
      },
      {
        id: "sat-3",
        name: "Walking Dumbbell Lunges or Stationary Split Squats",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg",
        equipment: "Dumbbells & Gym Floor / Turf",
        coachTip: "Step forward into deep lunge with upright torso. Drive through front heel to return or step through for walking lunges."
      },
      {
        id: "sat-4",
        name: "Rotary Torso Machine or Cable Woodchoppers [Oblique Carve]",
        targetGroup: "Abs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Rotary Torso Machine or Cable Pulley",
        coachTip: "Rotate torso against resistance with controlled speed. Carves tight obliques and lateral core armor."
      },
      {
        id: "sat-5",
        name: "Mat Forearm Plank Hold & Captain's Chair Leg Raises Burnout",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds hold / 15 raises",
        equipment: "Stretching Area Mat & Captain's Chair",
        coachTip: "Finish the 6-day split with a 60-second strict plank superset with hanging leg raises to lock in core strength and aesthetic posture."
      },
      {
        id: "sat-cardio",
        name: "Daily Planet Fitness Treadmill Walk [20-30 Minutes Fat Burning Target]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "20-30 mins (@ 3.0 MPH, 5-8% Incline)",
        equipment: "Matrix / Life Fitness Treadmill (Lewiston PF)",
        coachTip: "Finish your training week with 20-30 minutes of incline treadmill walking. Consistent daily walking guarantees 1 lb/week fat loss while maintaining muscular fullness!"
      }
    ]
  }
];

export const KPOP_HOME_WORKOUT_ROUTINE = PLANET_FITNESS_LEWISTON_6DAY_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = PLANET_FITNESS_LEWISTON_6DAY_ROUTINE;
export const JAPANESE_HOME_WORKOUT_ROUTINE = PLANET_FITNESS_LEWISTON_6DAY_ROUTINE;

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return PLANET_FITNESS_LEWISTON_6DAY_ROUTINE.find(d => d.dayOfWeek === dayIndex) || PLANET_FITNESS_LEWISTON_6DAY_ROUTINE[0];
}
