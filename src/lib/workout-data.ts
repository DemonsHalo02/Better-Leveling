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

export const PLANET_FITNESS_PPL_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Mana Recharge",
    isRestDay: true,
    questTitle: "[Daily Quest] Active Recovery & Preparation",
    description: "The System requires a mana recharge day. No workout lifting quests today! Use this time for light stretching, meal prepping at Auburn Walmart / Shaw's / Hannaford, drinking 1 gallon of water, and logging your weekly weigh-in.",
    xpReward: 250,
    exercises: [
      {
        id: "sun-1",
        name: "Full Body Static Stretching & Foam Rolling",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15-20 mins",
        equipment: "PF Stretching Area / Mat",
        coachTip: "Focus on opening up tight chest fibers, hip flexors, and hamstrings from your heavy lifting sessions."
      },
      {
        id: "sun-2",
        name: "Hydration & Weekly Boricua Meal Prep",
        targetGroup: "Full Body",
        sets: 1,
        reps: "Weekly Prep",
        equipment: "Kitchen / Walmart Auburn",
        coachTip: "Pre-cook your fresh Pollo Guisado (chicken stew), Chuletas, rice & beans, and stock up on Café Bustelo K-Cups & milk for sweet Café con Leche so your Puerto Rican cutting diet stays under $50 all week!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (Chest & Shoulder Heavy)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Push A Dungeon",
    description: "Heavy pressing using Planet Fitness Lewiston's Smith Machines and Cable Towers. Focus on controlled eccentric lowering to maximize muscle fiber recruitment without joint irritation.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-1",
        name: "Smith Machine Incline Bench Press",
        targetGroup: "Chest",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Smith Machine (PF Lewiston)",
        coachTip: "Set bench to a 30-degree incline. Lower bar slowly to upper chest, pause 1 second, then explode upward. Squeeze pecs at the top."
      },
      {
        id: "mon-2",
        name: "Seated Dumbbell Shoulder Press",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Dumbbells (Up to 75 lbs)",
        coachTip: "Keep your back flat against the bench. Press dumbbells overhead in a smooth arc without clanking them together."
      },
      {
        id: "mon-3",
        name: "Machine Pec Deck / Chest Fly",
        targetGroup: "Chest",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Pec Deck Machine",
        coachTip: "Imagine hugging a giant tree. Keep a slight bend in elbows and focus entirely on chest contraction."
      },
      {
        id: "mon-4",
        name: "Cable Lateral Raises",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "Functional Trainer / Cable Tower",
        coachTip: "Set pulley to bottom. Use a handle or wrist cuff. Lead with your elbows to build broad shoulder armor (AGI/STR boost)."
      },
      {
        id: "mon-5",
        name: "Tricep Rope Pushdowns",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Cable Tower with Rope Attachment",
        coachTip: "Pin your elbows to your sides. Spread the rope apart at the very bottom and lock out triceps hard for 1 second."
      },
      {
        id: "mon-6",
        name: "Overhead Cable Tricep Extension",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Cable Tower (High Pulley)",
        coachTip: "Step forward away from machine, lean torso forward, and extend elbows overhead for deep long-head stretch."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (Back Width & Bicep Peak)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Pull A Dungeon",
    description: "Build the iconic V-taper physique. Planet Fitness cables and lat pulldowns are incredible for constant tension on the lats and biceps.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Wide-Grip Lat Pulldown",
        targetGroup: "Back",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Lat Pulldown Station",
        coachTip: "Pull bar down to upper collarbone while driving elbows down and back. Keep chest elevated high."
      },
      {
        id: "tue-2",
        name: "Seated Cable Row (Close V-Bar)",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Seated Cable Row Station",
        coachTip: "Keep torso upright with minimal sway. Pull V-handle into your belly button and squeeze shoulder blades together."
      },
      {
        id: "tue-3",
        name: "Single-Arm Dumbbell Row",
        targetGroup: "Back",
        sets: 3,
        reps: "10-12 reps per side",
        equipment: "Dumbbells & Flat Bench",
        coachTip: "Support opposite hand and knee on bench. Pull dumbbell toward your hip pocket, keeping elbow tight to torso."
      },
      {
        id: "tue-4",
        name: "Rear Delt Machine Fly / Face Pulls",
        targetGroup: "Back",
        sets: 4,
        reps: "15 reps",
        equipment: "Reverse Pec Deck or Cable Rope",
        coachTip: "Pull rope toward bridge of nose with external rotation, or sit reverse on pec deck to isolate rear delts for posture."
      },
      {
        id: "tue-5",
        name: "Standing Cable Curls or Incline DB Curls",
        targetGroup: "Biceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Cable Tower or Incline Bench",
        coachTip: "Keep upper arm completely stationary. Curl weight up with pinky twisted inward to maximize bicep peak."
      },
      {
        id: "tue-6",
        name: "Dumbbell Hammer Curls",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Dumbbells",
        coachTip: "Neutral palm-facing-in grip. Targets the brachialis and forearm thickness to make arms look massive from all angles."
      },
      {
        id: "tue-7",
        name: "Behind-the-Back Cable / Dumbbell Wrist Curls",
        targetGroup: "Forearms",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Low Cable Pulley or Dumbbells",
        coachTip: "Let the bar/weight roll down to your fingertips at the bottom of each rep, then curl your wrists up hard and squeeze inner forearms for 1 second."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs & Abs A (Quad & Core Heavy)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Legs & Abs A Dungeon",
    description: "Leg day is where champions are forged. Planet Fitness's Leg Press and Smith Machine allow safe, heavy loading without balance risk.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-1",
        name: "45-Degree Leg Press",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Leg Press Machine (PF Lewiston)",
        coachTip: "Place feet shoulder-width in middle of sled. Lower until knees form 90-degree angle, press through heels. Never lock out knees!"
      },
      {
        id: "wed-2",
        name: "Smith Machine Romanian Deadlift (RDL)",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Smith Machine",
        coachTip: "Soft bend in knees. Push hips backward until you feel intense stretch in hamstrings and glutes, then drive hips forward to stand."
      },
      {
        id: "wed-3",
        name: "Leg Extension Machine",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps",
        equipment: "Leg Extension Machine",
        coachTip: "Extend legs fully and hold at top for 2 full seconds on every rep to burn out quad fibers."
      },
      {
        id: "wed-4",
        name: "Seated Leg Curl Machine",
        targetGroup: "Legs",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Seated or Lying Leg Curl Machine",
        coachTip: "Keep hips pressed firmly into seat pad while curling weight underneath."
      },
      {
        id: "wed-5",
        name: "Captain's Chair Hanging Leg Raises",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Captain's Chair Station",
        coachTip: "Support weight on forearms. Curl pelvis upward as you raise knees/legs toward chest. Don't just swing legs!"
      },
      {
        id: "wed-6",
        name: "Cable Ab Crunch or Machine Crunch",
        targetGroup: "Abs",
        sets: 3,
        reps: "15-20 reps",
        equipment: "Cable Tower with Rope or Ab Machine",
        coachTip: "Kneel below high pulley with rope behind neck. Flex spine downward, bringing ribcage toward pelvis for intense core burn."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (Chest Volume & Shoulder Armor)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Push B Dungeon",
    description: "Volume and isolation day for chest, front/side delts, and horseshoe triceps. High blood flow promotes rapid recovery and hypertrophy.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Flat Dumbbell Bench Press or Chest Machine",
        targetGroup: "Chest",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Dumbbells / Chest Press Machine",
        coachTip: "Lower dumbbells deep until thumbs touch outer chest level, press up and converge slightly at top."
      },
      {
        id: "thu-2",
        name: "Smith Machine Seated Shoulder Press",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Smith Machine & Upright Bench",
        coachTip: "Grip slightly wider than shoulders. Lower bar to chin/upper chest level, press smoothly."
      },
      {
        id: "thu-3",
        name: "Standing Cable Crossover / Fly",
        targetGroup: "Chest",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Dual Cable Tower",
        coachTip: "Set pulleys high. Step forward, keep slight elbow bend, and bring hands together in front of waist with a hard chest squeeze."
      },
      {
        id: "thu-4",
        name: "Dumbbell Lateral Raises",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Dumbbells",
        coachTip: "Raise weights to sides until arms are parallel to floor. Imagine pouring water out of a pitcher at top."
      },
      {
        id: "thu-5",
        name: "Assisted Machine Dips or Skull Crushers",
        targetGroup: "Triceps",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Assisted Dip Machine or Pre-fixed Barbell",
        coachTip: "For dips: keep torso vertical to keep tension on triceps rather than chest. For skull crushers: lower bar to forehead."
      },
      {
        id: "thu-6",
        name: "Single-Arm Cable Tricep Kickback / Pushdown",
        targetGroup: "Triceps",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Cable Tower (No attachment / D-Handle)",
        coachTip: "Extend arm fully backward, locking out elbow completely to target tricep lateral and medial heads."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B (Back Thickness & Bicep Volume)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Pull B Dungeon",
    description: "Build upper back thickness and biceps fullness. Planet Fitness machine rows and straight-arm pulldowns isolate lats without lower back fatigue.",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Close-Grip / Neutral Grip Lat Pulldown",
        targetGroup: "Back",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Lat Pulldown Station with V-Handle",
        coachTip: "Palms facing each other. Pull handle down to chest while arching upper back and pulling shoulders down."
      },
      {
        id: "fri-2",
        name: "Chest-Supported Machine Row or Smith Row",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Seated Row Machine",
        coachTip: "Let weight stretch your shoulder blades forward at start of rep, then pull handles back and squeeze shoulder blades hard."
      },
      {
        id: "fri-3",
        name: "Straight-Arm Lat Pulldown",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 reps",
        equipment: "High Cable Pulley with Straight Bar or Rope",
        coachTip: "Keep arms straight with locked elbows. Push bar down in an arc from eye level down to thighs using pure lat strength."
      },
      {
        id: "fri-4",
        name: "Reverse Pec Deck Machine (Rear Delts)",
        targetGroup: "Back",
        sets: 4,
        reps: "15 reps",
        equipment: "Pec Deck Machine (Reverse Seat)",
        coachTip: "Sit facing machine pad. Push handles outward and backward using rear shoulders, keeping arms level with shoulders."
      },
      {
        id: "fri-5",
        name: "Preacher Curl Machine or EZ-Bar Curl",
        targetGroup: "Biceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Preacher Curl Machine / Pre-fixed Bar",
        coachTip: "Rest triceps firmly on pad. Lower weight until arms are almost straight, then curl up without lifting elbows off pad."
      },
      {
        id: "fri-6",
        name: "Cable Rope Hammer Curls",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Low Pulley with Rope Attachment",
        coachTip: "Keep wrists straight and thumbs pointing up. Constant cable tension creates incredible bicep pump."
      },
      {
        id: "fri-7",
        name: "Reverse-Grip EZ-Bar / Cable Curls & Wrist Extensions",
        targetGroup: "Forearms",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Pre-fixed Barbell or Straight Cable Bar",
        coachTip: "Grip the bar overhand (palms facing down). Keeps constant tension on the brachioradialis and forearm extensors for thick, vascular Popeye forearms!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs & Abs B (Hamstring, Glute & Core)",
    isRestDay: false,
    questTitle: "[Daily Quest] Clear the Legs & Abs B Dungeon",
    description: "Complete your 6-day training cycle with posterior chain strength and core hardening. Finish strong before Sunday mana restoration!",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Smith Machine Squats or Bulgarian Split Squats",
        targetGroup: "Legs",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Smith Machine & Bench",
        coachTip: "Position feet slightly forward under bar. Descend until thighs are parallel to floor, drive up through whole foot."
      },
      {
        id: "sat-2",
        name: "Seated Leg Curls",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Seated Leg Curl Station",
        coachTip: "Control the return weight on every rep. Don't let the weight stack slam!"
      },
      {
        id: "sat-3",
        name: "Wide-Stance High Foot Leg Press",
        targetGroup: "Legs",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Leg Press Machine",
        coachTip: "Place feet high and wide on platform to shift emphasis onto glutes and hamstrings."
      },
      {
        id: "sat-4",
        name: "Standing Calf Raises on Smith Machine or Leg Press",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Smith Machine with Step or Leg Press",
        coachTip: "Lower heels deep for maximum stretch, pause 1 second at bottom, rise onto tiptoes and hold 1 second at top."
      },
      {
        id: "sat-5",
        name: "Russian Twists or Cable Woodchops",
        targetGroup: "Abs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Dumbbell or Cable Tower",
        coachTip: "Rotate torso from side to side, engaging internal and external obliques to tighten waistline."
      },
      {
        id: "sat-6",
        name: "Plank Hold / Ab Wheel Rollout",
        targetGroup: "Abs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Mat / Ab Wheel",
        coachTip: "Brace core as if taking a punch. Keep glutes squeezed and spine straight."
      }
    ]
  }
];

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return PLANET_FITNESS_PPL_ROUTINE.find(d => d.dayOfWeek === dayIndex) || PLANET_FITNESS_PPL_ROUTINE[0];
}
