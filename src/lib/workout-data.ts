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

export const JAPANESE_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Japanese Zazen Active Recovery & Dojo Mobility (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Japanese Zazen Active Recovery & Flexibility Flow",
    description: "Sunday is your official Dojo Restoration Day! Inspired by Japanese martial arts conditioning and Zazen meditation, focus on gentle mobility flows, deep hamstring/hip stretches, and mindful breathing to prepare your body for Monday's grocery run, meal prep, and Upper Body Push day. Concludes with your daily 45-minute dual cardio session (30-minute brisk walk + 15-minute run/silent march).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-jap-1",
        name: "Japanese Dojo Mobility Flow: Cat-Cow to Downward Dog & Child's Pose [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (flow through poses slowly)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start on all fours on your mat. Alternate between Cat (round spine up) and Cow (arch spine down) for 10 slow breaths, then push hips high into Downward Dog holding 30 seconds to lengthen calves and hamstrings. Transition gently into Child's Pose to decompress the spine like a resting warrior."
      },
      {
        id: "sun-jap-2",
        name: "Samurai Deep Hip Flexor, Hamstring & Shoulder Opener Sequence [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 45 sec)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold half-kneeling hip flexor stretches for 45 seconds per leg, followed by seated forward hamstring folds and doorway chest stretches. Opening tight hips and shoulders improves posture and squat depth."
      },
      {
        id: "sun-jap-3",
        name: "Zazen Mindful Breathing & Postural Alignment [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins (4-4-6 breathing)",
        equipment: "Quiet Space (Home)",
        coachTip: "Sit in Seiza (kneeling) or cross-legged posture. Breathe in deeply through the nose for 4 seconds, hold at the top for 4 seconds, and exhale smoothly through the mouth for 6 seconds. Traditional Zazen breathwork lowers cortisol and sharpens mental focus."
      },
      {
        id: "sun-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 30 minutes of brisk walking outdoors or silent indoor marching, followed by 15 minutes of higher tempo jogging or high-knee marching. This daily 45-minute cardio commitment burns 400+ calories while preserving lean muscle!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Japanese Dojo Upper Body Push Sculpt + Monday Grocery & Batch Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Upper Body Push Sculpt & Meal Prep Monday",
    description: "Official Monday Grocery Run at Auburn ME Walmart & Weekly Batch Meal Prep Day + Japanese Dojo Upper Body Push training! Grab your items from your chosen 19-Country Global Blueprint, prep your meals for Tuesday start, and sculpt your chest, shoulders, and triceps using strict Japanese calisthenics tension.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-jap-prep",
        name: "Monday Auburn ME Walmart Grocery Run & 19-Country Global Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Batch Prep Your Chosen 19-Country Global S-Rank Chicken & Carbs (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Head to Auburn ME Walmart and pick up your exact grocery items from your selected national cuisine blueprint! Once home, batch bake or pan sear your crispy chicken breast cubes and prepare your complex carb staple so your high-protein eating begins seamlessly on Tuesday morning!"
      },
      {
        id: "mon-jap-1",
        name: "Strict Samurai Controlled Bodyweight Push-Ups [Chest & Anterior Deltoids]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps (3 sec descent)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Keep hands shoulder-width apart, core braced. Lower slowly over 3 full seconds until your chest hovers 1 inch above the floor, then press explosively without locking out elbows. Total silent muscle control."
      },
      {
        id: "mon-jap-2",
        name: "Wide-Stance Dojo Push-Ups [Outer Chest Width & Shoulder Frame]",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands 6 to 8 inches wider than shoulder width. This places deep stretch and tension on the outer pectorals and anterior deltoids for broad, athletic chest width."
      },
      {
        id: "mon-jap-3",
        name: "Samurai Pike Push-Ups [Bodyweight Overhead Shoulder Press]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Elevate hips high into an inverted V (downward dog posture). Bend elbows to lower crown of head toward the mat between your hands, then press vertically upward to sculpt rounded shoulder caps."
      },
      {
        id: "mon-jap-4",
        name: "Sturdy Chair / Couch Edge Tricep Dips [Tricep Horseshoe Isolation]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch Edge (Home)",
        coachTip: "Place hands securely on the edge of a sturdy chair or couch behind you, legs extended forward. Lower your hips by bending elbows to 90 degrees, then press back up. Builds a defined tricep horseshoe."
      },
      {
        id: "mon-jap-5",
        name: "Diamond Push-Ups [Inner Chest & Tricep Burnout]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "8-10 reps to failure",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Form a diamond shape with your thumbs and index fingers under your center chest. Lower with tight elbows and push explosively. High-tension burnout for tricep definition."
      },
      {
        id: "mon-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish your push day with 30 minutes of brisk walking and 15 minutes of conditioning run or silent indoor marching. Keeps fat oxidation high post-workout!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Japanese Dojo Lower Body Power & Glute Sculpt",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Lower Body Power & Shiko Stance Day",
    description: "First full day eating your prepped meals! Build powerful, toned legs and a lifted glute profile with traditional Japanese Shiko (Sumo/Samurai stance) squats, slow-controlled lunges, horse stance wall sits, and glute bridges — all apartment-friendly and completely silent.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-jap-1",
        name: "Shiko Sumo Bodyweight Squats [Inner Thigh & Glute Power]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps (deep stance)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Adopt a wide stance with toes pointed out at 45 degrees, inspired by traditional Shiko sumo training. Squat deep keeping torso upright and knees tracking over toes. Drive up through heels and glutes."
      },
      {
        id: "tue-jap-2",
        name: "Alternating Reverse Lunges [Glute & Quad Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step backward softly into a deep lunge until back knee hovers just above the carpet. Drive through front heel to return. Quieter and gentler on knee joints than forward lunges."
      },
      {
        id: "tue-jap-3",
        name: "Kiba-Dachi (Horse Stance) Wall Sit Hold [Quad Endurance & Mental Toughness]",
        targetGroup: "Legs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Wall (Home)",
        coachTip: "Lean back against a wall and slide down into a 90-degree thigh parallel position (inspired by martial arts Kiba-Dachi stance). Hold completely still, breathing steadily through the thigh burn."
      },
      {
        id: "tue-jap-4",
        name: "Glute Bridges with 2-Second Top Pause [Glute Activation & Posterior Chain]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on your back, knees bent, feet shoulder-width apart. Drive hips upward and squeeze glutes hard at the top for 2 seconds before lowering. Rebuilds posterior chain strength."
      },
      {
        id: "tue-jap-5",
        name: "Lying Clamshells [Hip Stability & Glute Medius]",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on your side with knees bent at 45 degrees. Open top knee upward like a clamshell while keeping feet pressed together. Stabilizes hips and sculpts outer thighs."
      },
      {
        id: "tue-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Flush lactic acid from your legs with your daily 45-minute dual cardio session!"
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Japanese Dojo Core Armor & Waist Carve (Abs, Obliques, Deep Core)",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Core Armor & Waist Sculpting Session",
    description: "High-intensity core and waist carving session inspired by Japanese martial arts core conditioning (Hara/Tanden training). Build a tight, ironclad midsection with controlled bicycle crunches, Russian twists, side planks, and leg raises — all silent on a mat.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-jap-1",
        name: "Controlled Bicycle Crunches [Upper & Lower Abdominal Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per side, slow tempo)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back, hands behind head. Bring opposite elbow to opposite knee while extending the alternate leg straight. Move slowly with intentional contraction — speed reduces abdominal tension."
      },
      {
        id: "wed-jap-2",
        name: "Seated Russian Twists [Oblique & Intercostal Definition]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Sit with knees bent, lean back 45 degrees with core braced. Twist torso side to side touching the mat beside each hip. Carves the obliques for a tight, tapered waist."
      },
      {
        id: "wed-jap-3",
        name: "Side Plank Hold [Lateral Core Armor & Obliques]",
        targetGroup: "Abs",
        sets: 3,
        reps: "30-45 seconds per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Support body on one forearm and outer edge of foot, body straight. Hold hips elevated high. Builds indestructible lateral core stability and sharpens waistlines."
      },
      {
        id: "wed-jap-4",
        name: "Lying Straight Leg Raises [Lower Abdominal Isolation]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back, hands under glutes for lower back support. Raise straight legs to 90 degrees, then lower slowly without letting heels touch the floor. The premier lower abdominal carver."
      },
      {
        id: "wed-jap-5",
        name: "Hara Forearm Plank Hold [Deep Tanden Core Stability]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold a forearm plank with body in a straight line from head to heels. Focus your mind on your Hara (center core 2 inches below navel), squeezing abs and glutes tightly."
      },
      {
        id: "wed-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Lock in your core progress and torch abdominal fat with your 45-minute dual cardio session!"
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Japanese Dojo Upper Body Pull & Posture Definition (Back, Shoulders, Arms)",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Upper Body Pull & Posture Definition",
    description: "Target back posture, shoulder definition, and arm tone using traditional Japanese calisthenics like Superman holds, high plank anti-rotation taps, and Y-T-W postural raises — completely silent and equipment-free.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-jap-1",
        name: "Prone Superman Holds [Lower Back & Spinal Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "10 reps (3 sec top squeeze each)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with arms extended overhead. Simultaneously lift chest, arms, and legs off the mat. Hold for 3 seconds squeezing lower back and glutes. Restores upright posture."
      },
      {
        id: "thu-jap-2",
        name: "High Plank Anti-Rotation Shoulder Taps [Core & Shoulder Stability]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold a braced push-up position. Tap right shoulder with left hand, then left shoulder with right hand while keeping hips completely still. Builds deep stabilizing strength across shoulders and core."
      },
      {
        id: "thu-jap-3",
        name: "Close-Grip Push-Ups [Tricep & Inner Pectoral Focus]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands narrow with elbows tucked close to your ribs during descent and ascent. Shifts maximal mechanical tension to triceps and inner chest."
      },
      {
        id: "thu-jap-4",
        name: "Prone Y-T-W Shoulder Raises [Rear Deltoids & Upper Back Posture]",
        targetGroup: "Back",
        sets: 3,
        reps: "8 reps each position (Y, T, W)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down. Lift arms into Y position (overhead), T position (out to sides), and W position (elbows bent at sides). Hold each raise 2 seconds to strengthen rear delts and rhomboids."
      },
      {
        id: "thu-jap-5",
        name: "Standing Arm Circles & Isometric Bicep Flex Holds [Arm Tone & Endurance]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "30s forward circles + 30s backward + 15s flex hold",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Extend arms straight out to sides. Make small fast circles forward for 30 seconds, then backward for 30 seconds. Finish immediately with a 15-second maximal isometric bicep flex hold!"
      },
      {
        id: "thu-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 45 minutes of steady walking and running to maximize your daily caloric expenditure!"
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Japanese Dojo Full Body Conditioning & Core Finisher",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese Full Body Conditioning & Core Finisher",
    description: "Full body metabolic conditioning circuit designed with Japanese martial arts stamina drills! Combine squats, push-ups, lunges, bicycle crunches, and dynamic downward dog flows for maximum fat burning without a single jump.",
    xpReward: 600,
    exercises: [
      {
        id: "fri-jap-1",
        name: "Silent Shiko Squat to Knee-Lift Combo [Quad & Core Conditioning]",
        targetGroup: "Full Body",
        sets: 4,
        reps: "16 total reps (8 squats + alternating knee lifts)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Perform a deep controlled bodyweight squat, and as you drive up to standing, bring right knee high to chest while squeezing lower abs. Next squat bring left knee up. High metabolic demand with zero foot impact!"
      },
      {
        id: "fri-jap-2",
        name: "Push-Up to Shoulder Tap Combo [Chest, Shoulder & Core Integration]",
        targetGroup: "Full Body",
        sets: 4,
        reps: "10-12 combo reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower into a strict push-up, press up, tap right hand to left shoulder, tap left hand to right shoulder. That equals one full repetition. Builds incredible upper body stamina and core armor."
      },
      {
        id: "fri-jap-3",
        name: "Stationary Lunge with Isometric Bottom Pulse [Leg & Glute Endurance]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps + 10 sec bottom pulse hold per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step into stationary lunge stance. Lower and raise for 12 reps, and on the 12th rep stay down at the bottom pulsing 1 inch up and down for 10 seconds before switching legs. Pure glute and quad fire."
      },
      {
        id: "fri-jap-4",
        name: "Bicycle Crunch to Leg Raise Super-Set [Complete Abdominal Burnout]",
        targetGroup: "Abs",
        sets: 3,
        reps: "15 bicycle crunches immediately into 10 leg raises",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Perform 15 slow bicycle crunches and without resting immediately transition into 10 controlled lying straight leg raises. The ultimate Friday core finisher!"
      },
      {
        id: "fri-jap-5",
        name: "Plank to Downward Dog Pike Flow [Shoulder & Core Active Flexibility]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "12 flow transitions",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start in high plank. Push hips backward and upward into downward dog stretching calves and lats, then smoothly glide hips back forward into a braced high plank. Controlled and dynamic."
      },
      {
        id: "fri-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Earn your Friday reward treat! Complete your 45-minute dual cardio session (30m walk + 15m run) and enjoy your evening meal completely guilt-free!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Japanese Dojo Full Body Tension Mastery & Core Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] Saturday Japanese Full Body Mastery & Core Armor",
    description: "Cap off your training week inside your apartment with high-tension Japanese calisthenics control, glute bridges, push-up isometric holds, and deep core work before hitting your weekend dual cardio run!",
    xpReward: 500,
    exercises: [
      {
        id: "sat-jap-1",
        name: "Slow Tempo Squat with 3-Second Bottom Hold [Lower Body Mastery]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps (3 sec pause at bottom below parallel)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower into a deep squat and hold completely still at the bottom for 3 full seconds per rep without resting thighs on calves. Squeeze quads and glutes to ascend."
      },
      {
        id: "sat-jap-2",
        name: "Push-Up Isometric Mid-Way Hold [Chest & Tricep High-Tension Freeze]",
        targetGroup: "Chest",
        sets: 3,
        reps: "30-45 seconds frozen halfway down",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower halfway down into a push-up until elbows reach 90 degrees and freeze in position. Hold for 30 to 45 seconds squeezing chest, triceps, core, and glutes simultaneously!"
      },
      {
        id: "sat-jap-3",
        name: "Single-Leg Glute Bridge Holds [Hamstring & Glute Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg (hold 2 sec at peak)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat with knees bent, extend right leg straight in the air. Drive hips upward using left glute and heel. Hold peak contraction for 2 seconds before lowering."
      },
      {
        id: "sat-jap-4",
        name: "Russian Twists & Side Plank Super-Set [Complete Oblique Armor]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 Russian twists directly into 30 sec side plank per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Complete 20 seated torso rotations and immediately flip onto your forearm to hold a side plank for 30 seconds on each side. Locks in a tight waist and iron core stability."
      },
      {
        id: "sat-jap-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish out your Saturday with your 30-minute brisk walk and 15-minute conditioning run! You have now conquered 7 complete days of consistency—ready for Sunday active recovery tomorrow!"
      }
    ]
  }
];

export const PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = JAPANESE_HOME_BODYWEIGHT_ROUTINE;

export const PUERTO_RICAN_PLANET_FITNESS_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Planet Fitness Active Recovery & Mobility (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Planet Fitness Active Recovery & Stretching Area",
    description: "Sunday is your official System Restoration Day! Head to the Planet Fitness stretching/mobility turf area or do this flow right at home. Focus on gentle mobility flows, foam rolling, and deep stretching to prepare your body for Monday's grocery run, meal prep, and Planet Fitness Chest & Tricep day. Concludes with your 45-minute dual cardio on the Planet Fitness treadmill!",
    xpReward: 300,
    exercises: [
      {
        id: "sun-pf-1",
        name: "Planet Fitness Turf Foam Rolling & Mobility Flow [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (roll quads, lats, upper back)",
        equipment: "Foam Roller & Stretching Mat (Planet Fitness / Home)",
        coachTip: "Use the Planet Fitness foam rollers to slowly release tight knots in your quads, upper back (thoracic spine), and lats for 15 minutes. Follow with Cat-Cow and Downward Dog stretches."
      },
      {
        id: "sun-pf-2",
        name: "Deep Hip Flexor, Hamstring & Shoulder Opener Sequence [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 45 sec)",
        equipment: "Stretching Mat (Planet Fitness / Home)",
        coachTip: "Hold half-kneeling hip flexor stretches for 45 seconds per leg, followed by seated forward hamstring stretches and doorway/cage chest openers to restore joint range of motion."
      },
      {
        id: "sun-pf-3",
        name: "Mindful Breathing & Postural Reset [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins (4-4-6 breathing)",
        equipment: "Quiet Area / Mat",
        coachTip: "Breathe deeply through the nose for 4 seconds, hold 4 seconds, exhale smoothly for 6 seconds. Decompresses the spine and optimizes mental readiness for Monday training."
      },
      {
        id: "sun-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Step onto the Planet Fitness treadmill! Walk briskly at 3.5 mph with a 6% to 8% incline for 30 minutes to maximize low-impact fat burn, then lower incline and jog at 5.5 to 6.0 mph for 15 minutes!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Planet Fitness Chest & Triceps Push Day + Monday Grocery & Batch Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Push Day & 19-Country Global Meal Prep Monday",
    description: "Official Monday Grocery Run at Auburn ME Walmart & Weekly Batch Meal Prep Day + Planet Fitness Chest & Tricep training! Grab your exact items from your chosen 19-Country Global Blueprint (Puerto Rico, USA, Canada, Mexico, Dominican Republic, El Salvador, Colombia, Brazil, Venezuela, Argentina, Spain, Italy, France, Germany, Russia, Japan, Korea, China, or India), prep your meals for Tuesday start, and hit the Planet Fitness machines and dumbbells for a massive chest & tricep pump.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-pf-prep",
        name: "Monday Auburn ME Walmart Grocery Run & 19-Country Global Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Batch Prep Your Chosen 19-Country Global S-Rank Chicken & Carbs (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Head to Auburn ME Walmart and pick up your exact items from your selected national cuisine blueprint! Once home, batch bake or pan sear your crispy chicken breast cubes and prepare your complex carb staple so your high-protein eating begins seamlessly on Tuesday morning!"
      },
      {
        id: "mon-pf-1",
        name: "Dumbbell Flat or Incline Bench Press [Chest & Anterior Deltoid Power]",
        targetGroup: "Chest",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Dumbbells & Adjustable Bench",
        coachTip: "Lie flat or at a 30-degree incline on a Planet Fitness bench. Press dumbbells upward with controlled speed, squeezing pecs at the top. Lower with a 2-second negative until feeling a deep pectoral stretch."
      },
      {
        id: "mon-pf-2",
        name: "Seated Chest Press Machine [Pectoral Isolation & Constant Tension]",
        targetGroup: "Chest",
        sets: 3,
        reps: "12 reps (last set drop set)",
        equipment: "Planet Fitness Chest Press Machine",
        coachTip: "Adjust seat so handles align with mid-chest. Push forward steadily keeping shoulder blades pinched back against the pad. On the 3rd set, drop the weight pin by 20 lbs and pump out 6 extra reps to failure!"
      },
      {
        id: "mon-pf-3",
        name: "Cable or Machine Pec Flyes [Outer Pec Stretch & Inner Chest Separation]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Pec Deck / Cable Crossover",
        coachTip: "Maintain a slight bend in elbows and bring handles together in an hugging arc. Hold peak contraction at the center for 1 full second squeezing inner chest."
      },
      {
        id: "mon-pf-4",
        name: "Cable Tricep Pushdowns (Rope or V-Bar) [Tricep Horseshoe Isolation]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Keep elbows pinned fixed to your ribcage. Push bar or split rope downward until elbows fully lock out, contracting the lateral and long heads of the tricep."
      },
      {
        id: "mon-pf-5",
        name: "Overhead Dumbbell or Cable Tricep Extension [Long Head Stretch & Size]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12 reps",
        equipment: "Planet Fitness Dumbbell or Cable Station",
        coachTip: "Extend weight overhead while keeping upper arms vertical beside your ears. Lower behind your head to fully stretch the tricep long head, then press vertical."
      },
      {
        id: "mon-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Step onto the treadmill after lifting! 30 minutes of brisk 3.5 mph walking at 6-8% incline followed by 15 minutes of 5.5 mph jogging for ultimate cardiovascular conditioning."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Planet Fitness Lower Body & Glute Power - Start Eating Puerto Rican Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Leg Day & Start Eating Puerto Rican Prep",
    description: "First official day eating your prepped Crispy Pollo al Horno & Arroz con Gandules meals! Hit the Planet Fitness leg press, leg curls, leg extensions, and Smith machine squats for lean, powerful leg definition and glute lift.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-pf-1",
        name: "Planet Fitness Leg Press Machine [Quad, Hamstring & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Sled Leg Press Machine",
        coachTip: "Place feet shoulder-width apart on sled platform. Lower weight smoothly until knees reach 90 degrees without letting lower back lift off pad, then press up through heels and mid-foot."
      },
      {
        id: "tue-pf-2",
        name: "Seated Leg Extension Machine [Quad Rectus Femoris Peak Isolation]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps (hold 1 sec at top extension)",
        equipment: "Planet Fitness Leg Extension Machine",
        coachTip: "Extend legs until straight, hold frozen for 1 second squeezing your quad teardrop muscles, then lower under 2-second negative control."
      },
      {
        id: "tue-pf-3",
        name: "Seated or Lying Leg Curl Machine [Hamstring & Posterior Chain]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Leg Curl Machine",
        coachTip: "Curl pad toward glutes while keeping hips pressed into the bench. Builds balanced hamstring strength and protects knee health."
      },
      {
        id: "tue-pf-4",
        name: "Smith Machine Reverse Lunges or Hip Thrusts [Glute & Hip Power]",
        targetGroup: "Legs",
        sets: 3,
        reps: "10-12 reps per leg (or 12-15 hip thrusts)",
        equipment: "Planet Fitness Smith Machine",
        coachTip: "Position bar securely across shoulders or across hips on a bench. For lunges step back cleanly with 90-degree knee tracking. For hip thrusts drive hips up squeezing glutes hard at peak."
      },
      {
        id: "tue-pf-5",
        name: "Seated Calf Raise or Leg Press Calf Extension [Calf & Ankle Strength]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps with full stretch at bottom",
        equipment: "Planet Fitness Leg Press or Calf Machine",
        coachTip: "Allow heels to drop for a deep calf stretch at the bottom of the movement, then rise onto toes holding peak contraction for 1 second."
      },
      {
        id: "tue-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Flush leg lactic acid and keep weekly fat loss roaring with your 45-minute treadmill dual cardio session right after leg training!"
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Planet Fitness Back & Bicep Pull Day + Core & Oblique Carve",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Back, Bicep & Core Session",
    description: "Develop a wide, V-taper back and dense biceps using Planet Fitness lat pulldowns, seated cable rows, and dumbbell curls, paired with cable crunches and hanging knee raises for an iron midsection.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-pf-1",
        name: "Lat Pulldown Machine (Wide Grip) [Upper Lat Width & V-Taper]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Lat Pulldown Station",
        coachTip: "Grip bar wider than shoulders. Drive elbows straight down toward ribs while puffing chest up. Pause 1 second at collarbone squeezing lats before slowly letting bar rise."
      },
      {
        id: "wed-pf-2",
        name: "Seated Cable Row (Close V-Grip or Wide Bar) [Mid-Back Thickness & Rhomboids]",
        targetGroup: "Back",
        sets: 4,
        reps: "12 reps",
        equipment: "Planet Fitness Seated Row Cable Station",
        coachTip: "Keep torso upright with slight knee bend. Pull V-handle right into upper abdomen, pinching shoulder blades together tightly at the completion of the stroke."
      },
      {
        id: "wed-pf-3",
        name: "Standing Dumbbell Alternating or Hammer Curls [Bicep Peak & Brachialis]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12 reps per arm",
        equipment: "Planet Fitness Dumbbells",
        coachTip: "Keep elbows fixed tight beside your hips without swinging. Curl dumbbell smoothly twisting palm upward at the top (or hammer grip) for full bicep activation."
      },
      {
        id: "wed-pf-4",
        name: "Preacher Curl Machine or Cable Curl [Bicep Isolation & Burnout]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Planet Fitness Preacher Machine or Cable",
        coachTip: "Rest triceps firmly against the angled pad so shoulders cannot assist. Curl weight smoothly and control the descent completely."
      },
      {
        id: "wed-pf-5",
        name: "Cable Rope Crunches or Captain's Chair Knee Raises [Deep Core & Ab Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Planet Fitness Cable Station or Captain's Chair",
        coachTip: "For cable crunches kneel holding rope behind ears and crunch torso downward contracting abs. For Captain's chair raise knees to chest while rounding lower lumbar."
      },
      {
        id: "wed-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Complete your Wednesday treadmill session! 30 minutes of incline walking plus 15 minutes of jogging keeps your cardiovascular system peak and abs visible."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Planet Fitness Shoulder Cannon & Core Sculpt Day",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Shoulder & Core Sculpt Session",
    description: "Build rounded, capped 3D shoulders using Planet Fitness dumbbell overhead presses, lateral raises, face pulls, and reverse pec deck, paired with Russian twists and side planks.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-pf-1",
        name: "Seated Dumbbell or Machine Shoulder Press [Anterior & Lateral Deltoid Mass]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Dumbbells or Shoulder Press Machine",
        coachTip: "Sit upright with back supported. Press dumbbells smoothly overhead until nearly touching, then lower until dumbbells reach ear level for full deltoid stretch."
      },
      {
        id: "thu-pf-2",
        name: "Standing Dumbbell Lateral Raises [Deltoid Width & 3D Capping]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Dumbbells",
        coachTip: "Maintain slight elbow bend and raise arms directly out to your sides until parallel to the floor (like pouring water out of a pitcher). Controls descent over 2 seconds."
      },
      {
        id: "thu-pf-3",
        name: "Cable Face Pulls with Rope Attachment [Rear Deltoids, Rotator Cuff & Posture]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps with 1-sec hold at bridge of nose",
        equipment: "Planet Fitness High Pulley Cable Station",
        coachTip: "Set pulley at upper chest height. Pull rope handles directly toward nose and ears while separating ends wide and rotating knuckles backward. Exceptional posture builder."
      },
      {
        id: "thu-pf-4",
        name: "Reverse Pec Deck Machine [Rear Deltoid & Upper Back Isolation]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Planet Fitness Pec Deck Machine (Reverse Setup)",
        coachTip: "Sit facing the machine pad with arms extended forward. Sweep handles outward and backward squeezing rear deltoids and scapulae tightly."
      },
      {
        id: "thu-pf-5",
        name: "Abdominal Crunch Machine or Russian Twists [Abdominal & Oblique Definition]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Planet Fitness Ab Machine or Turf Mat",
        coachTip: "Execute crisp, controlled repetitions squeezing abdominal wall at peak flexion without relying on hip flexor momentum."
      },
      {
        id: "thu-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Thursday cardio check! Hit your 30-minute incline walk and 15-minute conditioning jog to maintain daily calorie deficit."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Planet Fitness Total Upper Body Hypertrophy & Weekly Tostones Treat Meal!",
    isRestDay: false,
    questTitle: "[Daily Quest] Friday Upper Body Pump & Tostones Treat",
    description: "Friday full upper body pump circuit across chest, back, shoulders, and arms to maximize nutrient uptake right before enjoying your weekly reward meal of Goya Tostones & garlic Pollo al Horno!",
    xpReward: 600,
    exercises: [
      {
        id: "fri-pf-1",
        name: "Incline Dumbbell Press or Machine Press [Upper Chest Hypertrophy]",
        targetGroup: "Chest",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Dumbbells or Incline Machine",
        coachTip: "Target the upper pectoral fibers by pressing cleanly at a 30-degree bench incline. Keep shoulders tucked down and back."
      },
      {
        id: "fri-pf-2",
        name: "Machine Assist Pull-Ups or Close-Grip Lat Pulldowns [Lats & Bicep Integration]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Assisted Pull-Up or Lat Station",
        coachTip: "Use underhand or neutral close grip. Pull chin smoothly above bar (or bar down to chest) contracting lats and biceps simultaneously."
      },
      {
        id: "fri-pf-3",
        name: "Cable Lateral Raise or Upright Row [Side Deltoid & Trap Pump]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "12-15 reps",
        equipment: "Planet Fitness Low Cable Station",
        coachTip: "Using low cable pulley, raise handle laterally across body for continuous cable tension that builds rounded lateral deltoid heads."
      },
      {
        id: "fri-pf-4",
        name: "Cable Tricep Pushdown & Bicep Curl Super-Set [Complete Arm Pump]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "12 tricep pushdowns immediately into 12 cable bicep curls",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Perform 12 crisp tricep pushdowns and immediately switch cable attachment to perform 12 bicep curls without rest. Massive upper arm blood flow and sleeve-stretching pump!"
      },
      {
        id: "fri-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Earn your Friday Goya Tostones reward treat! Complete your 45-minute treadmill session and enjoy your savory Puerto Rican evening meal with 100% adherence and zero guilt!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Planet Fitness Total Body Conditioning & Glute/Ab Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] Saturday Total Body Conditioning Circuit",
    description: "Cap off your training week with a high-energy Planet Fitness total body conditioning and core/glute circuit using dumbbell squats, cable rows, push-ups, and hanging leg raises before your weekend cardio run!",
    xpReward: 500,
    exercises: [
      {
        id: "sat-pf-1",
        name: "Goblet Dumbbell Squats or Smith Machine Squats [Total Lower Body Power]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Dumbbells or Smith Machine",
        coachTip: "Hold a dumbbell vertically against chest or position Smith bar across shoulders. Squat deep below parallel with upright torso and drive up hard through mid-foot."
      },
      {
        id: "sat-pf-2",
        name: "Seated Cable Row to Push-Up Super-Set [Back & Chest Balance]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "12 cable rows immediately into 12 strict push-ups on turf",
        equipment: "Planet Fitness Cable Row & Turf Area",
        coachTip: "Complete 12 seated cable rows squeezing rhomboids and immediately step onto the turf to execute 12 strict push-ups. Dynamic anterior and posterior balance."
      },
      {
        id: "sat-pf-3",
        name: "Dumbbell Romanian Deadlifts (RDLs) [Hamstring Stretch & Glute Engagement]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps (3 sec lower down shins)",
        equipment: "Planet Fitness Dumbbells",
        coachTip: "Hold dumbbells in front of thighs, hinge hips backward while keeping back flat and slight knee bend. Lower until feeling a deep hamstring stretch, then squeeze glutes to return vertical."
      },
      {
        id: "sat-pf-4",
        name: "Captain's Chair Hanging Leg Raises & Plank Hold Combo [Core Armor]",
        targetGroup: "Abs",
        sets: 3,
        reps: "15 leg raises into 45 sec turf forearm plank hold",
        equipment: "Planet Fitness Captain's Chair & Turf",
        coachTip: "Perform 15 hanging knee/leg raises and step directly onto the turf for a 45-second forearm plank hold to lock in an iron abdominal wall!"
      },
      {
        id: "sat-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Finish out your Saturday with your 30-minute incline walk and 15-minute conditioning jog! You have now conquered 7 complete days of Planet Fitness training—ready for Sunday active recovery tomorrow!"
      }
    ]
  }
];

export const QUIET_APARTMENT_BODYWEIGHT_ROUTINE = JAPANESE_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const KPOP_HOME_BODYWEIGHT_ROUTINE = JAPANESE_HOME_BODYWEIGHT_ROUTINE;
export const KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE = JAPANESE_HOME_BODYWEIGHT_ROUTINE;
export const JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE = JAPANESE_HOME_BODYWEIGHT_ROUTINE;

export const getTodayWorkout = (planType: 'home' | 'pf' = 'home'): WorkoutDay => {
  const dayIndex = new Date().getDay();
  if (typeof window !== 'undefined') {
    const savedType = localStorage.getItem('active_workout_routine_type') as 'home' | 'pf' | null;
    if (savedType === 'home' || savedType === 'pf') {
      planType = savedType;
    }
  }
  const routine = planType === 'pf' ? PUERTO_RICAN_PLANET_FITNESS_ROUTINE : JAPANESE_HOME_BODYWEIGHT_ROUTINE;
  return routine.find(d => d.dayOfWeek === dayIndex) || routine[0];
};
