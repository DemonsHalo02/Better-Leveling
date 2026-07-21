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

export const JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Japanese Samurai Yoga & Active Recovery Flow (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Japanese Samurai Active Recovery & Flexibility Flow",
    description: "Sunday is your official System Restoration & Active Recovery Day! Focus on gentle Japanese mobility flows, deep stretching, and mindful breathing inside your quiet apartment to prepare your body for Monday's grocery run, Japanese Teriyaki meal prep, and Upper Body training. Concludes with your daily 45-minute dual cardio session (30-minute brisk walk + 15-minute run).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-1",
        name: "Japanese Samurai Mobility Flow: Cat-Cow to Downward Dog & Child's Pose [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (flow through poses slowly)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start on all fours. Alternate between Cat (round spine up) and Cow (arch spine down) for 10 slow breaths, then push hips up into Downward Dog holding 30 seconds to lengthen calves and hamstrings. Transition gently into Child's Pose to decompress the lumbar spine and calm the nervous system."
      },
      {
        id: "sun-2",
        name: "Deep Hip Flexor, Hamstring & Shoulder Opener Sequence [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 30-60 sec)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold each stretch for 30-60 seconds: pigeon pose for hips, seated forward fold for hamstrings, and doorway chest stretches for anterior shoulder flexibility to keep skin elastic and muscles supple during your fat loss journey."
      },
      {
        id: "sun-3",
        name: "Mindful Zen Breathing & Meditation [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins (4-4-6 breath pacing)",
        equipment: "Quiet Space (Home)",
        coachTip: "Sit comfortably cross-legged or lie flat on your back. Inhale deeply through the nose for 4 counts, hold for 4 counts, and exhale slowly for 6 counts. Promotes cortisol reduction, mental focus, and accelerated muscle repair."
      },
      {
        id: "sun-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Complete your daily 7-day cardio protocol: start with a steady 30-minute brisk fat-burning walk, followed immediately by a focused 15-minute conditioning run to keep daily calorie expenditure elevated while actively recovering!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (Japanese Samurai Upper Body Sculpt: Chest, Shoulders, Triceps) + Monday Grocery & Teriyaki Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Push A & Monday Walmart Teriyaki Prep",
    description: "Fuel up at 8:00 AM with Jade Leaf Matcha Latte (whisked with Soy Milk) & Banana right before your morning bodyweight workout & cardio! Carve out chest thickness, broad shoulders, and defined triceps using 100% silent, equipment-free bodyweight exercises. After training, hit Auburn ME Walmart for your weekly Japanese Teriyaki groceries ($50 budget limit) and complete your batch prep!",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Japanese Teriyaki Batch Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Japanese Teriyaki Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your exact weekly groceries at Auburn Maine Walmart Supercenter ($50 budget limit). Cut chicken breasts into 1-inch cubes, dip in egg white, coat lightly with cornstarch, air-fry or bake at 400°F (or pan crisp sear) until super crispy & crunchy outside, and toss with low-cal Japanese Teriyaki glaze!"
      },
      {
        id: "mon-1",
        name: "Standard Bodyweight Push-Ups [Chest & Tricep Compound]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps (2s negative)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Hands shoulder-width apart, body in straight line from head to heels. Lower chest to floor with a controlled 2-second negative, pause slightly, then press up explosively. Keep core and glutes braced."
      },
      {
        id: "mon-2",
        name: "Wide-Grip Push-Ups [Outer Chest & Broad Shoulder Frame]",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands wider than shoulder-width. This shifts tension directly to the outer pectoral fibers and anterior deltoids, carving out the broad, athletic V-taper of a Japanese warrior."
      },
      {
        id: "mon-3",
        name: "Pike Push-Ups [Overhead Shoulder Press Alternative]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Start in downward dog position with hips high in the air. Bend elbows to lower top of head toward the floor between your hands, then press back up. Mimics heavy overhead presses using only bodyweight!"
      },
      {
        id: "mon-4",
        name: "Chair/Couch Tricep Dips [Tricep Horseshoe Definition]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch Edge (Home)",
        coachTip: "Place palms firmly on the edge of a sturdy chair or couch behind you. Extend legs forward, lower hips vertically by bending elbows to 90 degrees, and press through your palms to lockout."
      },
      {
        id: "mon-5",
        name: "Diamond Push-Ups [Inner Chest & Tricep Burnout]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "8-10 reps (to failure)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place index fingers and thumbs together under your center chest forming a diamond shape. Lower chest to hands and press up. Ultimate finishing movement for tricep separation and inner chest striations."
      },
      {
        id: "mon-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Lock in your Monday cardio volume immediately after upper body training or split between morning/evening: 30 minutes of steady brisk walking plus 15 minutes of running to accelerate fat oxidation!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A (Japanese Samurai Back, Biceps & Forearms) - Start Eating Prepped Teriyaki Meals!",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Pull A - Start Eating Teriyaki Prep!",
    description: "First day of eating your prepped Pan or Oven Crispy Fried Japanese Teriyaki Chicken meals! Build back thickness, bicep peaks, and iron forearm grip strength right inside your apartment using isometric towel rows, doorframe pulls, and scapular retractions.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Isometric Doorframe / Towel Rows [Upper Back & Lats]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps / 30s max tension hold",
        equipment: "Sturdy Doorframe or Towel around Door Handle",
        coachTip: "Stand facing a sturdy doorframe or wrap a thick towel securely around a door knob/post. Lean back with feet forward, then pull your chest to your hands while driving elbows back and squeezing shoulder blades together."
      },
      {
        id: "tue-2",
        name: "Prone Cobra Holds [Lower Back & Spinal Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "45-60 seconds hold per set",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down on your mat. Lift chest, head, and arms off the floor while externally rotating your hands (palms facing out/up) and squeezing glutes and lower back. Perfect for counteracting desk posture."
      },
      {
        id: "tue-3",
        name: "Doorframe / Towel Bicep Isometric Curls [Bicep Peak Volume]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12 reps / 20s peak contraction hold",
        equipment: "Doorframe or Towel",
        coachTip: "Grip the doorframe or towel at waist height with underhand grip. Lean back slightly and curl your body upward using solely bicep contraction. Hold peak squeeze for 2 seconds on every rep."
      },
      {
        id: "tue-4",
        name: "Scapular Retraction Squeezes [Rhomboids & Mid-Traps]",
        targetGroup: "Back",
        sets: 3,
        reps: "15 reps (hold squeeze 3 sec each)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Stand tall with arms bent at 90 degrees out to sides. Drive elbows backward as hard as possible, pinching imaginary pencil between shoulder blades for 3 full seconds per rep to thicken mid-back armor."
      },
      {
        id: "tue-5",
        name: "Forearm Wall Press & Wrist Isometric Holds [Iron Grip & Forearms]",
        targetGroup: "Forearms",
        sets: 3,
        reps: "45 seconds hold per side",
        equipment: "Wall (Home)",
        coachTip: "Place palms flat against the wall at shoulder height with fingers pointing down or up, applying firm pressure through your fingertips and wrists to build dense, vascular forearm extensors and flexors."
      },
      {
        id: "tue-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Complete your Tuesday cardio session: 30 minutes of brisk walking followed by a 15-minute run to keep daily metabolism soaring and flush lactic acid from your back and arm muscles."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs & Glutes (Japanese Samurai Lower Body Power & Tone)",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Lower Body Power & Sculpt",
    description: "Carve out powerful, toned quad sweeps, hamstrings, and glutes with 100% silent, apartment-friendly lower body resistance training. Zero impact, zero noise for neighbors underneath, maximum muscle activation.",
    xpReward: 550,
    exercises: [
      {
        id: "wed-1",
        name: "Controlled Slow-Tempo Bodyweight Squats [Quad & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps (3s down, 1s pause)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Stand with feet shoulder-width apart, toes slightly out. Lower hips back and down over 3 slow seconds until thighs are parallel to floor. Pause at bottom, then drive through heels to stand. Absolutely silent."
      },
      {
        id: "wed-2",
        name: "Alternating Reverse Lunges [Quad & Glute Isolation]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12 reps per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step one foot backward softly, lowering back knee until hovering one inch above floor. Drive through front heel to step back up. Reverse lunges place zero stress on knees and generate zero floor noise."
      },
      {
        id: "wed-3",
        name: "Wall Sit Isometric Hold [Quad Endurance & Separation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "60 seconds hold per set",
        equipment: "Wall (Home)",
        coachTip: "Press back flat against wall and slide down until thighs are parallel to floor and knees are at 90 degrees. Hold position with core braced. Creates incredible quad burn and endurance without a single decibel of noise."
      },
      {
        id: "wed-4",
        name: "Single-Leg / Double-Leg Glute Bridges [Glute Lift & Hamstrings]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps (squeeze 2s at top)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back with knees bent and feet flat on floor. Drive hips vertically until body forms straight line from shoulders to knees. Squeeze glutes intensely for 2 seconds at peak before lowering."
      },
      {
        id: "wed-5",
        name: "Clamshells & Single-Leg Calf Raises [Hip Stabilizers & Calves]",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Mat / Wall Support",
        coachTip: "Alternate 15 clamshell repetitions lying on side for hip abductor stabilization with 15 controlled single-leg standing calf raises using wall for balance to build complete lower body symmetry."
      },
      {
        id: "wed-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Post-leg day cardio: 30 minutes of brisk walking promotes lower body circulation and reduces soreness, followed by your 15-minute run to maximize daily caloric expenditure!"
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Core & Oblique Carve (Japanese Samurai Midsection Armor)",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Core & Waist Sculpt Session",
    description: "High-intensity core, waist carving, and deep abdominal stabilization session. Build a tight, defined midsection with bicycle crunches, Russian twists, side planks, and leg raises — all completely silent on your mat.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Bicycle Crunches [Upper & Lower Ab Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 total reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back, hands lightly touching temples. Bring right elbow to meet left knee while extending right leg straight out right above floor. Rotate with control—focus on abdominal contraction rather than speed."
      },
      {
        id: "thu-2",
        name: "Russian Twists (Seated Torso Rotation) [Oblique Definition]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 total twists (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Sit on mat with knees bent, lean torso back 45 degrees, and lift feet slightly off floor (or keep heels lightly touching). Rotate torso side to side touching fingertips to floor beside hips to carve obliques."
      },
      {
        id: "thu-3",
        name: "Side Plank Hold [Lateral Core Armor & Waist Tightening]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45 seconds hold per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Support body on forearm and side of foot, keeping hips lifted high so body forms perfectly straight diagonal line. Builds bulletproof lateral stability and tightens waistline."
      },
      {
        id: "thu-4",
        name: "Lying Straight Leg Raises [Lower Abdominal Isolation]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 controlled reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back with hands placed slightly under hips for lumbar support. Raise straight legs to 90-degree vertical position, then slowly lower them until hovering 2 inches above floor without letting lower back arch."
      },
      {
        id: "thu-5",
        name: "Forearm Plank Hold [Deep Core Stability & Transverse Abdominis]",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 seconds hold",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold forearm plank position with elbows directly beneath shoulders. Squeeze glutes, draw belly button inward toward spine, and breathe steadily. Foundation of ironclad midsection strength."
      },
      {
        id: "thu-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Finish your core training with 30 minutes of steady brisk walking plus your 15-minute run to keep overall weekly fat oxidation right on target for your 160 lb goal!"
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Push B & Pull B Full Upper Body Hypertrophy + Weekly Nissin Raoh Ramen Reward!",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Upper Hypertrophy & Ramen Reward",
    description: "Hit total upper body hypertrophy targeting chest, upper back, shoulders, and arms right before enjoying your weekly Friday or Saturday Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen reward treat meal!",
    xpReward: 600,
    exercises: [
      {
        id: "fri-1",
        name: "Decline Push-Ups (Feet on Couch/Chair) [Upper Chest Focus]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Couch or Chair (Home)",
        coachTip: "Elevate feet securely on couch edge or chair while hands are flat on floor. Lower upper chest to floor and press up. Builds full clavicular chest shelf and shoulder separation."
      },
      {
        id: "fri-2",
        name: "Prone Y-T-W Raises [Rear Delts & Upper Back Posture]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "12 reps each position (Y, T, W)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down. Raise arms in Y position (overhead diagonal), T position (straight out to sides), and W position (elbows bent pulling back). Squeeze rear deltoids and traps hard on every repetition."
      },
      {
        id: "fri-3",
        name: "Close-Grip Push-Ups [Tricep Definition & Inner Pectorals]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Hands placed slightly narrower than shoulder-width with elbows tracking tightly against ribcage during descent. Maximizes tricep lockout power and inner chest separation."
      },
      {
        id: "fri-4",
        name: "Doorframe Row to Bicep Hold Combo [Back & Arm Finisher]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12 reps + 15s peak contraction hold",
        equipment: "Doorframe or Towel",
        coachTip: "Perform 12 crisp doorframe rows immediately followed by holding the top contracted position for 15 solid seconds to pump lats and biceps completely full of nutrient-rich blood."
      },
      {
        id: "fri-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Lock in your Friday cardio (30m walk + 15m run) right before your evening Nissin Raoh Umami Japanese Ramen reward treat meal! You earned it through 100% adherence!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Athletic Conditioning & Total Body Samurai Challenge",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Samurai Total Body Conditioning",
    description: "Final active training day of the week! Combine full-body isometric tension, silent athletic conditioning movements, and core endurance to finish out the 7-day cycle with peak caloric burn and mental toughness.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-1",
        name: "Silent Fast Marching / High Knees [Conditioning & Hip Activation]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "60 seconds fast pace",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Drive knees up toward chest alternating quickly while placing balls of feet down with feather-light silence. Accelerates heart rate and activates core without floor impact."
      },
      {
        id: "sat-2",
        name: "Bodyweight Squat to Calf Raise Combo [Lower Body Explosiveness]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Perform a deep, controlled squat, and as you stand up, drive immediately up onto the balls of your feet into a peak calf raise contraction. Smooth, continuous athletic flow."
      },
      {
        id: "sat-3",
        name: "Plank Shoulder Taps [Core Anti-Rotation & Shoulder Endurance]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "20 total taps (10 per shoulder)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold high push-up position. Lift right hand to tap left shoulder, then left hand to tap right shoulder. Keep hips completely locked and level to build deep core anti-rotational strength."
      },
      {
        id: "sat-4",
        name: "Isometric Push-Up Hold (Mid-Way Pause) [Total Body Tension]",
        targetGroup: "Chest",
        sets: 3,
        reps: "30-45 seconds hold midway down",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower halfway down into a push-up until elbows are at 90 degrees and hold position frozen for 30 to 45 seconds. Squeeze chest, triceps, core, and glutes simultaneously for ultimate mental resilience."
      },
      {
        id: "sat-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run)",
        equipment: "Outdoors / Treadmill / Silent Apartment Track",
        coachTip: "Finish out your Saturday with your 30-minute brisk walk and 15-minute conditioning run! You have now hit 7 complete days of consistency—ready to reset and conquer Sunday active recovery tomorrow!"
      }
    ]
  }
];

export const QUIET_APARTMENT_BODYWEIGHT_ROUTINE = JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE;
export const KPOP_HOME_BODYWEIGHT_ROUTINE = JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE;
export const KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE = JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE;

export const getTodayWorkout = (): WorkoutDay => {
  const dayIndex = new Date().getDay();
  return JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE.find(d => d.dayOfWeek === dayIndex) || JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE[0];
};
