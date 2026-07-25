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

export const PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "System Restoration / Puerto Rican Yoga & Deep Stretch (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Puerto Rican Active Recovery & Flexibility Flow",
    description: "Sunday is your official System Restoration Day! Inspired by Puerto Rican trainee conditioning and Pilates flexibility routines, focus on gentle mobility flows, deep hamstring/hip stretches, and mindful breathing to prepare your body for Monday's grocery run, Puerto Rican meal prep, and Upper Body Push day. Concludes with your daily 45-minute dual cardio session (30-minute brisk walk + 15-minute run/silent march).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-kpop-1",
        name: "Puerto Rican Yoga Flow: Cat-Cow to Downward Dog & Child's Pose [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (flow through poses slowly)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start on all fours on your mat. Alternate between Cat (round spine up) and Cow (arch spine down) for 10 slow breaths, then push hips high into Downward Dog holding 30 seconds to lengthen calves and hamstrings. Transition gently into Child's Pose to decompress the spine and improve posture."
      },
      {
        id: "sun-kpop-2",
        name: "Full Body Deep Stretch: Hip Flexors, Hamstrings & Shoulder Openers [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 30-60 sec)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold each stretch for 30-60 seconds: pigeon pose for hips, seated forward fold for hamstrings, and doorway chest stretch for shoulders. Deep breathing throughout promotes muscle recovery and skin elasticity without adding bulky mass."
      },
      {
        id: "sun-kpop-3",
        name: "Mindful Breathing & Posture Alignment [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins (4-4-6 rhythmic breath cycle)",
        equipment: "Quiet Space (Home)",
        coachTip: "Sit cross-legged with spine perfectly tall or lie flat. Breathe deeply through the nose for 4 counts, hold 4 counts, exhale slowly for 6 counts. Puerto Rican Boricuas use breathwork for mental clarity, stress reduction, and core control."
      },
      {
        id: "sun-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 30 minutes of brisk steady walking followed by 15 minutes of silent indoor marching or light jogging. Low-impact steady-state cardio maximizes fat oxidation while preserving lean muscle mass!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Puerto Rican Upper Body Push Sculpt + Monday Grocery & Puerto Rican Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Upper Body Push Sculpt & Puerto Rican Meal Prep Monday",
    description: "Official Monday Grocery Run & Weekly Batch Puerto Rican Meal Prep Day + Upper Body Push home workout! Hit Auburn ME Walmart for your weekly Puerto Rican Arroz con Kielbasa grocery staples, batch prep your meals for Tuesday start, and sculpt your chest, shoulders, and triceps with silent bodyweight exercises.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-kpop-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Puerto Rican Gochujang Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Puerto Rican Arroz con Kielbasa & Recaito Scramble Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your Puerto Rican Arroz con Kielbasa weekly groceries at Auburn ME Walmart using your active template filter. Batch-cook chicken breasts with gochujang glaze, jasmine rice, and broccoli on Monday so your high-protein eating begins seamlessly on Tuesday!"
      },
      {
        id: "mon-kpop-1",
        name: "Standard Push-Ups [Chest & Tricep Compound Tone]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Hands shoulder-width apart, body in a straight line from crown to heels. Lower chest to floor with a 2-second negative, push up explosively while keeping core tight. If needed, start on knees and progress to full push-ups."
      },
      {
        id: "mon-kpop-2",
        name: "Wide Push-Ups [Outer Chest & Shoulder Frame Sculpt]",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands wider than shoulder-width. This shifts tension to the outer chest and anterior deltoids, building a broad, clean shoulder frame without heavy weight."
      },
      {
        id: "mon-kpop-3",
        name: "Pike Push-Ups [Capped Shoulder Press Alternative]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Start in a downward dog position with hips high. Bend elbows to lower your head gently toward the floor, then press back up. This mimics an overhead shoulder press using only bodyweight for capped, defined shoulders."
      },
      {
        id: "mon-kpop-4",
        name: "Chair/Couch Tricep Dips [Tricep Horseshoe Sculpt]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch Edge (Home)",
        coachTip: "Place hands on the edge of a sturdy chair behind you with legs extended. Lower your body by bending elbows to 90 degrees, then press back up. Carves out clean tricep definition."
      },
      {
        id: "mon-kpop-5",
        name: "Diamond Push-Ups [Inner Chest & Tricep Burnout]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "8-10 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands together under your chest forming a diamond shape with thumbs and index fingers. This is the ultimate tricep and inner chest burnout to finish off your upper body push session."
      },
      {
        id: "mon-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish your upper body session with 30 minutes of brisk outdoor walking plus 15 minutes of rhythmic Salsa/Reggaeton side-stepping. Consistent daily cardio ensures clean fat loss while keeping your metabolism elevated!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Puerto Rican Lower Body Tone & Sculpt - Start Eating Puerto Rican Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Lower Body Sculpt & Start Eating Puerto Rican Prep",
    description: "First day of eating your prepped Puerto Rican Arroz con Kielbasa meals! Build lean, toned legs and a lifted glute profile with silent bodyweight squats, lunges, wall sits, and glute bridges — completely apartment-friendly and zero floor impact.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-kpop-1",
        name: "Bodyweight Squats [Quad & Glute Tone]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Stand with feet shoulder-width apart, toes pointing slightly out. Squat deep with weight evenly distributed in heels, chest proud. Drive up through glutes. Slow and controlled — zero noise or stomping."
      },
      {
        id: "tue-kpop-2",
        name: "Reverse Lunges (Alternating) [Quad & Glute Medius Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step one foot back into a lunge, gently lowering your back knee toward the floor. Push through front heel to return. Reverse lunges are quieter and gentler on knee joints than forward lunges while sculpting lean legs."
      },
      {
        id: "tue-kpop-3",
        name: "Wall Sit Hold [Quad Endurance & Lean Muscle Burn]",
        targetGroup: "Legs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Wall (Home)",
        coachTip: "Lean flat against a wall and slide down until thighs are parallel to the floor (90-degree knee bend). Hold completely still with core engaged. Devastatingly effective for endurance and lean quad tone without adding bulk."
      },
      {
        id: "tue-kpop-4",
        name: "Glute Bridges [Glute Activation & Lift without Bulk]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back with knees bent and feet flat on floor. Drive hips up by squeezing glutes hard at the top. Hold 2 seconds at peak contraction. Builds a lifted glute profile without heavy barbell strain."
      },
      {
        id: "tue-kpop-5",
        name: "Clamshells (Lying Side Leg Opens) [Hip & Glute Stabilizer]",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on your side with knees bent at 45 degrees and feet stacked. Open top knee like a clamshell while keeping feet touching. Targets the gluteus medius for balanced leg symmetry and hip stability."
      },
      {
        id: "tue-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 45 minutes of daily dual cardio after your leg training. Walking after lower body work flushes lactic acid and accelerates muscle recovery!"
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Puerto Rican Core & Waist Carve (Abs, Obliques, Deep Core)",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Core & Waist Carve Session",
    description: "High-intensity core and waist carving session inspired by Puerto Rican Pilates training. Build a tight, defined midsection with bicycle crunches, Russian twists, side planks, and leg raises — completely silent on your mat.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-kpop-1",
        name: "Bicycle Crunches [Upper & Lower Ab Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back, hands behind head. Bring opposite elbow to opposite knee while extending the other leg straight. Move slowly with deliberate contraction — speed doesn't build abs, muscular tension does."
      },
      {
        id: "wed-kpop-2",
        name: "Russian Twists (Seated Torso Rotation) [Oblique & Waist Definition]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Sit with knees bent, lean back 45 degrees, keeping core braced. Twist torso side to side touching the floor beside each hip. Carves the obliques for a tight, defined waistline."
      },
      {
        id: "wed-kpop-3",
        name: "Side Plank Hold [Lateral Core Armor & Oblique Control]",
        targetGroup: "Abs",
        sets: 3,
        reps: "30-45 seconds per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Support body on one forearm and outer foot, keeping body in a rigid straight line. Hold with hip elevated high. Builds lateral core stability and bulletproof obliques."
      },
      {
        id: "wed-kpop-4",
        name: "Lying Leg Raises [Lower Ab Flat Stomach Isolation]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back, hands under lower back for support. Raise straight legs to 90 degrees, then lower slowly without letting heels touch the floor. The ultimate lower ab isolation exercise."
      },
      {
        id: "wed-kpop-5",
        name: "Forearm Plank Hold [Deep Core Stability & Anti-Extension]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold a forearm plank with body in a straight line from crown to heels. Squeeze abs and glutes tightly, breathing steadily. The foundation of deep transverse abdominis strength."
      },
      {
        id: "wed-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish your core training with 45 minutes of steady walking to maintain high daily calorie expenditure while your abdominal muscles recover."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Puerto Rican Upper Body Pull & Posture Definition (Back, Shoulders, Arms)",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Upper Body Pull & Posture Definition",
    description: "Target upper back posture, shoulder blade stability, and arm definition using bodyweight holds like Superman holds, shoulder taps, and Y-T-W raises — completely silent and equipment-free.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-kpop-1",
        name: "Superman Holds [Lower Back Strengthener & Regal Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "10 reps (hold 3 sec each)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with arms extended overhead. Simultaneously lift arms, chest, and legs off the floor. Hold 3 seconds squeezing lower back and glutes. Builds the strong erect posture essential for stage presence."
      },
      {
        id: "thu-kpop-2",
        name: "Plank Shoulder Taps [Anti-Rotation Core & Shoulder Stability]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold a high push-up plank position. Tap your left shoulder with your right hand, then alternate. Keep hips rock-solid and completely still to engage anti-rotation core stabilizers."
      },
      {
        id: "thu-kpop-3",
        name: "Close-Grip Push-Ups [Tricep Tone & Inner Chest Definition]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands closer than shoulder-width with elbows tucked directly against your ribs during the descent. Excellent for building defined triceps and inner chest separation."
      },
      {
        id: "thu-kpop-4",
        name: "Prone Y-T-W Raises [Rear Delt & Upper Back Posture Sculpt]",
        targetGroup: "Back",
        sets: 3,
        reps: "8 reps each position (Y, T, W)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down. Lift arms into a Y position (overhead), T position (out to sides), and W position (elbows bent at sides). Hold each contraction for 2 seconds to sculpt rear delts and mid-back."
      },
      {
        id: "thu-kpop-5",
        name: "Standing Arm Circles & Isometric Bicep Flex [Arm Tone]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "30s forward circles + 30s backward + 15s bicep flex hold",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Extend arms straight out to sides. Make small controlled circles forward for 30 seconds, then backward. Immediately finish with a 15-second maximum isometric bicep flex hold to tone arm muscles."
      },
      {
        id: "thu-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 45 minutes of daily dual cardio to stay on track toward your 160 lb target weight."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Puerto Rican Full Body Conditioning & Core Finisher",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Full Body Conditioning & Core Finisher",
    description: "High-energy full-body flow combining bodyweight squats, T-rotations, and slow controlled mountain climbers to burn calories, tone muscles, and elevate athletic stamina without jumping or noise.",
    xpReward: 550,
    exercises: [
      {
        id: "fri-kpop-1",
        name: "Bodyweight Squat to Overhead Reach [Full Body Flow & Mobility]",
        targetGroup: "Full Body",
        sets: 4,
        reps: "15 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Perform a deep bodyweight squat, then as you drive up through your heels, reach both arms straight overhead onto your toes. Fluid, athletic movement that opens the hips and chest."
      },
      {
        id: "fri-kpop-2",
        name: "Push-Up to T-Rotation [Chest, Shoulders & Oblique Control]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "10 reps (5 per side)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Perform a standard push-up, then as you reach the top, rotate your torso and extend one arm toward the ceiling into a side T-plank. Return to center and alternate sides."
      },
      {
        id: "fri-kpop-3",
        name: "Alternating Reverse Lunges with Knee Drive [Leg Tone & Balance]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step back into a reverse lunge, then as you stand up, drive the back knee smoothly up toward your chest while balancing on the front leg. Builds core balance and athletic leg definition."
      },
      {
        id: "fri-kpop-4",
        name: "Silent Mountain Climbers [Slow Controlled Core Pace]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per leg)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "In a high plank position, bring one knee slowly toward your chest, hold 1 second, then extend back. Do not jump or bounce feet. Controlled pacing places 100% tension on deep core flexors."
      },
      {
        id: "fri-kpop-5",
        name: "Dead Bug Core Progression [Deep Transverse Abdomen Control]",
        targetGroup: "Abs",
        sets: 3,
        reps: "12 reps (6 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back with arms reaching toward ceiling and knees bent at 90 degrees. Lower opposite arm and leg slowly toward floor while keeping lower back pressed firmly into the mat. Return and alternate."
      },
      {
        id: "fri-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 45 minutes of daily dual cardio right after your full-body conditioning session."
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Puerto Rican Posture & Total Body Isometric Tension Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] Puerto Rican Posture & Total Body Isometric Circuit",
    description: "Master total body muscular control and endurance with this isometric hold circuit. By holding contractions (wall sits, push-up holds, hollow body holds), you build deep muscle fiber density and poise without heavy lifting.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-kpop-1",
        name: "Wall Sit with Shoulder Blade Squeeze [Quad Burn & Posture Alignment]",
        targetGroup: "Legs",
        sets: 4,
        reps: "45-60 seconds hold",
        equipment: "Wall (Home)",
        coachTip: "Hold a 90-degree wall sit while actively squeezing your shoulder blades flat against the wall and tucking chin slightly. Aligns posture while building serious quad endurance."
      },
      {
        id: "sat-kpop-2",
        name: "Isometric Push-Up Bottom Hold [Chest & Tricep Endurance]",
        targetGroup: "Chest",
        sets: 3,
        reps: "20-30 seconds hold at 90 degrees",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower halfway down into a push-up until elbows are at 90 degrees and hold completely still. Squeeze chest, core, and glutes. Tremendous isometric strength builder."
      },
      {
        id: "sat-kpop-3",
        name: "Single-Leg Glute Bridge Hold [Unilateral Glute & Hamstring Tone]",
        targetGroup: "Legs",
        sets: 3,
        reps: "20-30 seconds hold per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "In a glute bridge position, extend one leg straight out while driving hips high with the grounded heel. Hold isometric contraction at the top, then switch legs."
      },
      {
        id: "sat-kpop-4",
        name: "Hollow Body Hold [Core Armor & Gymnastic Compression]",
        targetGroup: "Abs",
        sets: 4,
        reps: "30-45 seconds hold",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back. Lift arms extended overhead, shoulder blades, and legs slightly off the floor, pressing your lower back firmly into the ground forming a banana/hollow shape. The ultimate core hold."
      },
      {
        id: "sat-kpop-5",
        name: "Isometric Bicep Wall Press [Arm Definition & Shoulder Stability]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "20 seconds hold per arm pressing upward against wall",
        equipment: "Wall (Home)",
        coachTip: "Stand facing or next to a wall, bend elbow 90 degrees with palm facing up against the wall or shelf edge. Press up as hard as possible for 20 seconds without moving. Isometric peak bicep contraction."
      },
      {
        id: "sat-kpop-walk",
        name: "Salsa/Reggaeton Active Rest Steps or Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish out your Saturday with your 30-minute brisk walk and 15-minute conditioning run! You have now conquered 7 complete days of Puerto Rican training—ready for Sunday active recovery tomorrow!"
      }
    ]
  }
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
