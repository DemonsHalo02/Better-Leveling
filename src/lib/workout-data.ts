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
  untilFailure?: boolean; // If true, user does reps until failure and logs the count
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

// ─── Japanese-Style Daily Home Routine ─────────────────────────────────────
// 15-min run + 3 sets each of pushups, situps, squats — all until failure.
// Done EVERY DAY until goal weight is reached (no muscle loss, no loose skin).
// Each exercise has untilFailure: true so the UI shows a reps-logged input.

const DAILY_EXERCISES: Exercise[] = [
  {
    id: "jp-run",
    name: "15-Minute Run",
    targetGroup: "Cardio",
    sets: 1,
    reps: "15 minutes",
    equipment: "Outdoors or Treadmill",
    coachTip: "Keep a steady pace you can maintain for the full 15 minutes. Breathe through your nose when possible. Gradually increase speed as your cardio improves over weeks.",
    untilFailure: false,
  },
  {
    id: "jp-pushups",
    name: "Push-Ups",
    targetGroup: "Chest",
    sets: 3,
    reps: "Until failure",
    equipment: "Bodyweight Only",
    coachTip: "Full range of motion — chest touches the floor, arms lock out at top. Keep your core rigid and hips level. Log every rep of each set and beat your previous best!",
    untilFailure: true,
  },
  {
    id: "jp-situps",
    name: "Sit-Ups",
    targetGroup: "Abs",
    sets: 3,
    reps: "Until failure",
    equipment: "Mat or Carpet",
    coachTip: "Hands behind your head or crossed over chest. Come all the way up until elbows touch knees, then lower slowly. Controlled breathing — exhale on the way up.",
    untilFailure: true,
  },
  {
    id: "jp-squats",
    name: "Squats",
    targetGroup: "Legs",
    sets: 3,
    reps: "Until failure",
    equipment: "Bodyweight Only",
    coachTip: "Feet shoulder-width apart, toes slightly out. Squat until thighs are parallel to the floor (or lower). Drive through your heels to stand. Chest up the entire time.",
    untilFailure: true,
  },
];

// Build 7 identical workout days (same routine every day)
export const PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0,
    dayName: "Sunday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 1,
    dayName: "Monday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 2,
    dayName: "Tuesday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 3,
    dayName: "Wednesday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 4,
    dayName: "Thursday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 5,
    dayName: "Friday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
  {
    dayOfWeek: 6,
    dayName: "Saturday",
    splitName: "Japanese Daily Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Japanese-Style Fitness Routine",
    description: "Run for 15 minutes then complete 3 sets each of push-ups, sit-ups, and squats — all until failure. Log your reps to track personal records. Do this every single day until you hit your goal weight.",
    xpReward: 400,
    exercises: DAILY_EXERCISES,
  },
];







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

export const JAPANESE_HOME_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
export const QUIET_APARTMENT_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const KPOP_HOME_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
export const JAPANESE_SAMURAI_HOME_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;

export const getTodayWorkout = (planType: 'home' | 'pf' = 'home'): WorkoutDay => {
  const dayIndex = new Date().getDay();
  if (typeof window !== 'undefined') {
    const savedType = localStorage.getItem('active_workout_routine_type') as 'home' | 'pf' | null;
    if (savedType === 'home' || savedType === 'pf') {
      planType = savedType;
    }
  }
  const routine = planType === 'pf' ? PUERTO_RICAN_PLANET_FITNESS_ROUTINE : PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
  return routine.find(d => d.dayOfWeek === dayIndex) || routine[0];
};

