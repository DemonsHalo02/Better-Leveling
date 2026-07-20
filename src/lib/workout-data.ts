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

export const KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / K-Pop Idol Yoga & Deep Stretch (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] K-Pop Idol Active Recovery & Flexibility Flow",
    description: "Sunday is your official System Restoration Day! Focus on gentle K-Pop idol yoga flows, deep stretching, and mindful breathing inside your quiet apartment to prepare your body for Monday's grocery run, Korean meal prep, and Upper Body training. Concludes with your daily 45-minute dual cardio session (30-minute brisk walk + 15-minute run).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-1",
        name: "K-Pop Idol Mobility Flow: Cat-Cow to Downward Dog [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (flow through poses slowly)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start on all fours. Alternate between Cat (round spine up) and Cow (arch spine down) for 10 slow breaths, then push hips up into Downward Dog holding 30 seconds to lengthen calves and hamstrings. Used by K-Pop trainees to maintain elite posture and flexibility."
      },
      {
        id: "sun-2",
        name: "Deep Hip Flexor, Hamstring & Shoulder Opener Sequence [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 30-60 sec)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold each stretch for 30-60 seconds: pigeon pose for hips, seated forward fold for hamstrings, and doorway chest stretches for anterior shoulder flexibility to keep skin elastic and muscles supple."
      },
      {
        id: "sun-3",
        name: "Mindful Breathing & Core Decompression [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins",
        equipment: "Quiet Space (Home)",
        coachTip: "Lie flat on your back or sit cross-legged. Practice box breathing (4 sec inhale, 4 sec hold, 6 sec exhale) to lower cortisol and accelerate muscle and nervous system recovery."
      },
      {
        id: "sun-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Complete 30 minutes of brisk, steady walking followed immediately by 15 minutes of running. This 45-minute dual protocol oxidizes stubborn fat while keeping your cardiovascular endurance elite."
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (K-Pop Idol Upper Body Sculpt: Chest, Shoulders, Triceps) + Monday Grocery & Korean Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Push A & Monday Walmart Korean Prep",
    description: "Fuel up at 8:00 AM with Death Wish Espresso Roast Black Coffee & Banana right before your morning bodyweight workout & cardio! Carve out chest thickness, broad shoulders, and defined triceps using 100% silent, equipment-free bodyweight exercises. After training, hit Auburn ME Walmart for your weekly Korean Gochujang groceries and complete your batch prep!",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Korean Gochujang Batch Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Korean Gochujang Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your exact weekly groceries ($45.38 cutting / $43.76 bulking + $32.78 restock). Cut chicken breasts into 1-inch cubes, wok-sear with low-cal Korean Gochujang / Bibigo glaze, cook bulk rice, and portion across 14 containers!"
      },
      {
        id: "mon-1",
        name: "Standard Push-Ups [Chest & Anterior Delt Compound]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Hands shoulder-width apart, body in a straight line from head to heels. Lower chest to floor with a controlled 2-second negative, push up explosively without locking out elbows. Completely silent and apartment-friendly."
      },
      {
        id: "mon-2",
        name: "Wide Push-Ups [Outer Chest & Shoulder Width Isolation]",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands wider than shoulder-width. This shifts tension directly onto the outer pecs and anterior deltoids to widen your upper body V-taper for that broad K-Pop idol shoulder frame."
      },
      {
        id: "mon-3",
        name: "Pike Push-Ups [Overhead Shoulder Press Alternative]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Start in a downward dog / pike position with hips high in the air. Bend elbows to lower crown of head gently toward the floor, then press up. This mimics a heavy dumbbell overhead press using only bodyweight!"
      },
      {
        id: "mon-4",
        name: "Chair/Couch Edge Tricep Dips [Tricep Horseshoe Sculpt]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch Edge (Home)",
        coachTip: "Place hands on the sturdy edge of a chair behind you with legs extended. Lower your body by bending elbows to 90 degrees, then press back up squeezing the triceps hard at the top."
      },
      {
        id: "mon-5",
        name: "Diamond Push-Ups [Inner Chest & Tricep Burnout]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "8-10 reps (to failure)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place index fingers and thumbs together under your chest to form a diamond shape. Lower chest to hands and press up. The ultimate burnout finisher for inner chest definition and tricep horseshoe fullness."
      },
      {
        id: "mon-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Conquer your daily cardio goal right after lifting: 30 minutes of brisk walking followed by 15 minutes of steady jogging/running. Keeps daily calorie burn high while protecting lean muscle gains."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (K-Pop Idol Back & Arm Definition + Forearm Grip Forge)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Pull A - Start Eating Korean Prep!",
    description: "First day of eating your prepped Korean Gochujang Chicken meals! Build back thickness, bicep peaks, and iron forearm grip strength right inside your apartment using isometric towel rows, doorframe pulls, and scapular retractions.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Doorframe / Towel Isometric Rows [Upper Back & Lat Thickness]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps (or 30s max contraction holds)",
        equipment: "Sturdy Doorframe or Towel (Home)",
        coachTip: "Stand facing a sturdy doorframe gripping both sides at chest height, or loop a thick towel around a sturdy anchor. Lean back slightly and pull your chest up to the frame squeezing your shoulder blades together."
      },
      {
        id: "tue-2",
        name: "Superman Lat Pull-Ins [Lat Activation & Lower Back Armor]",
        targetGroup: "Back",
        sets: 4,
        reps: "12 reps with 3s hold at peak",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with arms extended forward. Lift chest off floor, then pull elbows back toward your hips imagining pulling a heavy bar down. Squeeze lats hard for 3 seconds before extending arms back out."
      },
      {
        id: "tue-3",
        name: "Reverse Snow Angels [Rear Delt & Upper Back Posture]",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with arms at sides, palms facing floor. Lift chest slightly and sweep straight arms out and around overhead until thumbs touch, then sweep back down to hips. Builds bulletproof posture."
      },
      {
        id: "tue-4",
        name: "Isometric Towel Bicep Curls [Bicep Peak Hypertrophy]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "4 x 30-second max tension holds",
        equipment: "Towel & Foot Anchor (Home)",
        coachTip: "Step on the center of a rolled towel with one foot while holding both ends with underhand grip at 90 degrees. Pull upward with maximum bicep contraction against the unmoving towel for 30 seconds per set."
      },
      {
        id: "tue-5",
        name: "Fingertip Push-Ups or Wall Forearm Presses [Forearm & Wrist Forge]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Wall or Floor (Home)",
        coachTip: "Perform push-ups against the wall (or floor) resting on your fingertips to build crushing finger and forearm tendon strength, or do wrist extensions against the wall."
      },
      {
        id: "tue-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Fluff up your metabolism and flush out upper back fatigue with 30 minutes of brisk walking followed immediately by 15 minutes of running."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs A & K-Pop Idol V-Taper Core Carve (Quads, Hamstrings & Abs)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Legs A & Core Carve Session",
    description: "Build lean, athletic quads and carve razor-sharp abdominal definition using 100% silent lower body and core movements. Controlled tempos ensure maximum muscle tension without a single stomp or impact noise in your apartment.",
    xpReward: 550,
    exercises: [
      {
        id: "wed-1",
        name: "Slow-Tempo Bodyweight Squats [Quad & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps (3s down, 1s up)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Stand with feet shoulder-width, toes slightly pointed out. Lower down slowly for 3 seconds keeping weight in heels and chest proud. Drive up smoothly through glutes without stomping or jumping."
      },
      {
        id: "wed-2",
        name: "Alternating Reverse Lunges [Quad & Hamstring Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step backward with right foot, lowering back knee softly to an inch above the floor. Push through front heel to return. Reverse lunges are completely silent and much gentler on knee joints."
      },
      {
        id: "wed-3",
        name: "Wall Sit Hold [Quad Endurance & Burnout]",
        targetGroup: "Legs",
        sets: 3,
        reps: "60 seconds hold per set",
        equipment: "Wall (Home)",
        coachTip: "Lean flat against a wall and slide down until thighs are parallel to the floor (90-degree knee bend). Hold motionless for 60 seconds. Devastating quad pump with zero equipment."
      },
      {
        id: "wed-4",
        name: "Lying Leg Raises [Lower Ab Isolation & Flat Stomach]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back with hands placed under glutes for lower back support. Raise straight legs up to 90 degrees, then lower slowly until heels are 2 inches off floor without touching."
      },
      {
        id: "wed-5",
        name: "Bicycle Crunches [Upper Ab & Oblique Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Bring opposite elbow to opposite knee while extending the other leg straight. Move with slow, controlled precision to carve deep oblique lines for a tight K-Pop idol waist."
      },
      {
        id: "wed-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Walking and running right after leg day flushes lactic acid and promotes leg muscle recovery while keeping fat burning at peak velocity."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (K-Pop Idol Upper Chest Focus, Shoulder Capping & Triceps)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Push B Definition & Posture Session",
    description: "Hit your second push session of the week with an emphasis on upper chest fullness, lateral shoulder capping, and tricep burnout. All movements are silent and bodyweight-focused.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Decline Push-Ups (Feet on Chair/Couch) [Upper Chest Focus]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Chair or Couch Edge (Home)",
        coachTip: "Elevate your feet on the edge of a sturdy chair or couch with hands on the floor. Lower upper chest toward floor and press up. Shifts overload directly to the clavicular upper pecs!"
      },
      {
        id: "thu-2",
        name: "Isometric Push-Up Holds [Chest & Core Density]",
        targetGroup: "Chest",
        sets: 3,
        reps: "3 x 30-45 second bottom holds",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower down halfway until elbows are at 90 degrees and hold completely still for 30-45 seconds per set. Builds deep chest density and mental toughness."
      },
      {
        id: "thu-3",
        name: "Plank to Push-Up Transitions [Shoulder Stability & Triceps]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "12 reps (alternate lead arm)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start in a forearm plank. Push up one hand at a time into a high push-up position, then lower back down one forearm at a time. Keep core braced and hips square."
      },
      {
        id: "thu-4",
        name: "Overhead Tricep Wall Extensions [Tricep Long Head]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Wall (Home)",
        coachTip: "Stand facing a wall about 2 feet back. Place forearms/palms against the wall overhead. Bend elbows letting your forehead approach the wall, then push through palms to extend elbows fully."
      },
      {
        id: "thu-5",
        name: "Side Plank Holds [Lateral Oblique Armor]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45 seconds hold per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Support body on one forearm and outer edge of foot forming a rigid diagonal line. Hold hips elevated for 45 seconds per side to build lateral core stability."
      },
      {
        id: "thu-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Finish Push B with your mandatory 45-minute dual cardio protocol (30m walk + 15m run) to keep your metabolism elevated all afternoon."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B & K-Pop Idol Posture Sculpt (Back Thickness, Biceps & Forearms)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Pull B Posture Sculpt & Korean Ramen Reward",
    description: "Sculpt upper back posture, rear deltoids, and bicep definition right before enjoying your weekly Friday or Saturday Samyang Buldak Korean Ramen reward treat meal! Uses Prone Y-T-W raises and isometric holds.",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Prone Y-T-W Raises [Scapular Retraction & Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "8 reps each position (Y, T, W = 24 reps total/set)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down on mat. Raise straight arms into Y position holding 2 sec, lower; raise out into T position holding 2 sec, lower; bend elbows into W position pulling shoulder blades together. Cures slouched posture instantly!"
      },
      {
        id: "fri-2",
        name: "Doorway / Frame Scapular Retractions [Mid-Back Thickness]",
        targetGroup: "Back",
        sets: 4,
        reps: "15 reps with 2s squeeze",
        equipment: "Doorframe (Home)",
        coachTip: "Grip doorframe with hands at waist height. Keep arms straight and pull chest slightly forward just by squeezing shoulder blades backward together as hard as possible."
      },
      {
        id: "fri-3",
        name: "Prone Cobra Holds [Lower Back & Spinal Erectors]",
        targetGroup: "Back",
        sets: 3,
        reps: "45-second holds",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down, lift chest off floor, sweep arms down along sides with palms facing out and thumbs up. Squeeze glutes and upper back holding motionless for 45 seconds."
      },
      {
        id: "fri-4",
        name: "Towel Resistance Hammer Curls [Brachialis & Bicep Peak]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps (self-resistance)",
        equipment: "Towel (Home)",
        coachTip: "Hold towel with neutral grip (palms facing each other) while stepping on center. Push down slightly with your foot while pulling up with biceps to create heavy, customized resistance through the full curl range."
      },
      {
        id: "fri-5",
        name: "Isometric Forearm & Wrist Roller Holds [Forearm Density]",
        targetGroup: "Forearms",
        sets: 3,
        reps: "60 seconds hold per side",
        equipment: "Towel or Doorframe (Home)",
        coachTip: "Grip thick towel or doorframe tightly and twist your wrists outward holding maximum forearm tension for 60 seconds per arm."
      },
      {
        id: "fri-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Lock in your Friday cardio (30m walk + 15m run) before your evening Samyang Buldak Korean Ramen treat meal!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs B & K-Pop Idol Ab Armor (Glutes, Hamstrings & Core Burnout)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-Pop Idol Legs B Glute Forge & Core Armor",
    description: "Conquer your training week with high-intensity lower body glute/hamstring sculpting and deep abdominal core armor. All silent bodyweight movements inside your quiet apartment.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Single-Leg Glute Bridges [Glute & Hamstring Isolation]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps per leg",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back with right knee bent and left leg extended straight in the air. Drive hips upward through right heel squeezing glute hard for 2 seconds at the top. Lower with control."
      },
      {
        id: "sat-2",
        name: "Bulgarian Split Squats (Rear Foot Elevated on Couch/Chair) [Quad & Glute Medius]",
        targetGroup: "Legs",
        sets: 3,
        reps: "10-12 reps per leg",
        equipment: "Chair or Couch Edge (Home)",
        coachTip: "Place rear foot up on couch or chair edge, step front foot forward. Lower rear knee straight down until front thigh is parallel to floor. Drive up through front heel. Supreme balance and leg development."
      },
      {
        id: "sat-3",
        name: "Single-Leg Calf Raises (Stair/Doorstep Edge) [Calf Definition]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps per leg",
        equipment: "Stair Edge or Book (Home)",
        coachTip: "Stand on one foot on edge of a step or thick book. Lower heel below edge for deep stretch, then rise onto ball of foot holding 2 seconds at peak contraction."
      },
      {
        id: "sat-4",
        name: "Russian Twists (Seated Torso Rotation) [V-Taper Oblique Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Sit with knees bent, lean back 45 degrees keeping spine long. Twist torso side to side touching hands to floor beside each hip. Carves tight oblique definition for a slim waistline."
      },
      {
        id: "sat-5",
        name: "Forearm Plank to Side Plank Rotation Burnout [Core Stability]",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds continuous rotation",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold center forearm plank for 20 seconds, rotate right holding right side plank 20 seconds, rotate left holding left side plank 20 seconds. Complete 60-second core armor challenge!"
      },
      {
        id: "sat-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors or Apartment Track",
        coachTip: "Finish off Saturday with your final 45-minute cardio run/walk! Consistent daily cardio ensures rapid fat loss while preserving your hard-earned muscle and skin elasticity."
      }
    ]
  }
];

export const QUIET_APARTMENT_BODYWEIGHT_ROUTINE = KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE;
export const KPOP_HOME_BODYWEIGHT_ROUTINE = KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE;

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE.find(d => d.dayOfWeek === dayIndex) || KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE[0];
}
