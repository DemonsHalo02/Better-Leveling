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
    splitName: "System Restoration / K-pop-Inspired Recovery & Deep Stretch (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] K-pop-Inspired Active Recovery & Flexibility Flow",
    description: "Sunday is your official System Restoration Day. Use gentle mobility flows, deep hamstring and hip stretches, and mindful breathing to prepare for Monday's grocery run, Korea meal prep, and upper-body push day. Finish with your 45-minute dual cardio session (a 30-minute brisk walk plus a 15-minute run or silent march).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-kpop-1",
        name: "Recovery Yoga Flow: Cat-Cow to Downward Dog & Child's Pose [15 Minutes]",
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
        coachTip: "Sit cross-legged with your spine tall or lie flat. Breathe deeply through the nose for 4 counts, hold for 4, then exhale slowly for 6. This reset supports mental clarity, stress reduction, and core control."
      },
      {
        id: "sun-kpop-walk",
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 30 minutes of brisk steady walking (a calm, steady K-pop idol 'practice room' pace) followed by 15 minutes of silent indoor marching or light jogging. Low-impact steady-state cardio maximizes fat oxidation while preserving lean muscle mass!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "K-pop-Style Upper Body Push Sculpt + Monday Grocery & Korea Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Upper Body Push Sculpt & Korea Meal Prep Monday",
    description: "Official Monday Grocery Run & Weekly Batch Korea Meal Prep Day + Upper Body Push home workout! Hit Auburn ME Walmart for your weekly Korea Crispy Gochujang Chicken & Steamed Rice grocery staples, batch prep your meals for Tuesday start, and sculpt your chest, shoulders, and triceps with silent bodyweight exercises.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-kpop-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Korea Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Korea Crispy Gochujang Chicken & Steamed Rice & Scallion Egg Scramble Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your Korea Crispy Gochujang Chicken & Steamed Rice weekly groceries at Auburn ME Walmart using your active template filter. Batch-cook Gochujang Chicken with Steamed White Rice and broccoli on Monday so your high-protein eating begins seamlessly on Tuesday!"
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish your upper body session with 30 minutes of brisk outdoor walking plus 15 minutes of quiet, rhythmic power-stepping. Consistent daily cardio ensures clean fat loss while keeping your metabolism elevated!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "K-pop-Style Lower Body Tone & Sculpt - Start Eating Korea Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Lower Body Sculpt & Start Eating Korea Prep",
    description: "First day of eating your prepped Korea Crispy Gochujang Chicken & Steamed Rice meals! Build lean, toned legs and a lifted glute profile with silent bodyweight squats, lunges, wall sits, and glute bridges — completely apartment-friendly and zero floor impact.",
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
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
    splitName: "K-pop-Style Core & Waist Carve (Abs, Obliques, Deep Core)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Core & Waist Carve Session",
    description: "High-intensity core and waist-carving session for your K-pop-inspired weekly routine. Build a tight, defined midsection with bicycle crunches, Russian twists, side planks, and leg raises — completely silent on your mat.",
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
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
    splitName: "K-pop-Style Upper Body Pull & Posture Definition (Back, Shoulders, Arms)",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Upper Body Pull & Posture Definition",
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
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
    splitName: "K-pop-Style Full Body Conditioning & Core Finisher",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Full Body Conditioning & Core Finisher",
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
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
    splitName: "K-pop-Style Posture & Total Body Isometric Tension Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] K-pop-Style Posture & Total Body Isometric Circuit",
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
        name: "Silent K-pop Practice-Room Power Walk [45 Minutes Dual Cardio]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish Saturday with your 30-minute brisk walk and 15-minute conditioning run. You have completed a full week of your K-pop-inspired training and meal-prep routine—ready for Sunday active recovery tomorrow!"
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
    questTitle: "[Daily Quest] Planet Fitness Push Day & Korea Meal Prep Monday",
    description: "Official Monday Grocery Run at Auburn ME Walmart & Weekly Batch Meal Prep Day + Planet Fitness Chest & Tricep training! Grab your exact items for Korea Crispy Gochujang Chicken, prep your meals for Tuesday start, and hit the Planet Fitness machines and dumbbells for a massive chest & tricep pump.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-pf-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Korea Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Batch Prep Your Korea Crispy Gochujang Chicken & Rice (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Head to Auburn ME Walmart and pick up your exact items! Once home, batch prep your Gochujang chicken and rice so your high-protein eating begins seamlessly on Tuesday morning!"
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
    splitName: "Planet Fitness Lower Body & Glute Power - Start Eating Korea Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Leg Day & Start Eating Korea Prep",
    description: "First official day eating your prepped Korea Crispy Gochujang Chicken meals! Hit the Planet Fitness leg press, leg curls, leg extensions, and Smith machine squats for lean, powerful leg definition and glute lift.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-pf-1",
        name: "Planet Fitness Leg Press Machine [Quad, Hamstring & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Leg Press",
        coachTip: "Place feet midway up the sled, shoulder-width apart. Lower sled slowly until knees are 90 degrees, then drive through your heels to press up. Do not lock knees at the top."
      },
      {
        id: "tue-pf-2",
        name: "Smith Machine Squats [Glute & Quad Builder]",
        targetGroup: "Legs",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Planet Fitness Smith Machine",
        coachTip: "Set bar across traps, feet slightly forward of the bar to emphasize glutes and keep torso upright. Squat until thighs are parallel to the floor, pushing up through heels."
      },
      {
        id: "tue-pf-3",
        name: "Seated Leg Extensions [Quad Isolation & Teardrop Sculpt]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps",
        equipment: "Planet Fitness Leg Extension Machine",
        coachTip: "Squeeze quads hard at the top of the extension for 1 full second. Lower the weight slowly (3-second negative) to maximize time under tension."
      },
      {
        id: "tue-pf-4",
        name: "Lying or Seated Leg Curls [Hamstring Sweep Isolation]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Leg Curl Machine",
        coachTip: "Contract hamstrings to curl the pad toward your glutes. This balances out your quad development and creates a complete aesthetic leg profile."
      },
      {
        id: "tue-pf-5",
        name: "Calf Raises (On Leg Press or Smith Machine) [Lower Leg Definition]",
        targetGroup: "Legs",
        sets: 4,
        reps: "20 reps",
        equipment: "Planet Fitness Leg Press / Smith Machine",
        coachTip: "Place toes on edge of platform. Get a deep stretch at the bottom and push all the way up onto your big toes at the top. High reps are required to grow stubborn calves."
      },
      {
        id: "tue-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Flush lactic acid from your leg workout by hitting the treadmill for your 45-minute incline walk and jog."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Planet Fitness Back, Biceps & Posture Day",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Back & Biceps Pull Day",
    description: "Build a wide V-taper, thick upper back for regal posture, and peaked biceps using Planet Fitness lat pulldowns, cable rows, and dumbbell curls.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-pf-1",
        name: "Wide-Grip Lat Pulldown [Lats & V-Taper Width]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Lat Pulldown Station",
        coachTip: "Grip bar wider than shoulders. Lean back slightly and pull the bar down to your upper chest by driving your elbows down and back. Squeeze lats hard at the bottom."
      },
      {
        id: "wed-pf-2",
        name: "Seated Cable Row [Mid-Back Thickness & Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Seated Row Station",
        coachTip: "Use the close-grip V-handle or straight bar. Keep chest tall, pull handle into your stomach, and pinch shoulder blades together tightly to build back thickness."
      },
      {
        id: "wed-pf-3",
        name: "Dumbbell or Machine Preacher Curls [Bicep Peak Isolation]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12 reps",
        equipment: "Planet Fitness Preacher Curl Bench / Machine",
        coachTip: "Lock your upper arms onto the pad. Curl the weight up, squeezing the bicep peak, and lower it fully to get a deep stretch. Do not swing or use momentum."
      },
      {
        id: "wed-pf-4",
        name: "Alternating Dumbbell Hammer Curls [Brachialis & Forearm Thickness]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "10-12 reps per arm",
        equipment: "Planet Fitness Dumbbells",
        coachTip: "Hold dumbbells with a neutral grip (palms facing each other). Curl up toward the shoulder. This builds the brachialis muscle which pushes the bicep up, making arms look thicker."
      },
      {
        id: "wed-pf-5",
        name: "Smith Machine Shrugs or Dumbbell Shrugs [Upper Trap Definition]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Smith Machine / Dumbbells",
        coachTip: "Hold heavy dumbbells or the Smith bar. Shrug shoulders straight up toward your ears, hold for a 1-second contraction, and lower slowly. Avoid rolling the shoulders."
      },
      {
        id: "wed-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Hit the treadmill post-lift. 30 minutes incline walking, 15 minutes jogging to torch fat and keep cardiovascular health elite."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Planet Fitness Shoulders, Abs & Core Armor",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Boulder Shoulders & Core Armor",
    description: "Carve out 3D capped shoulders and a shredded 6-pack midsection using overhead presses, lateral raises, and the Planet Fitness ab machines / mat area.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-pf-1",
        name: "Dumbbell or Smith Machine Overhead Press [Anterior Delt Mass]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Dumbbells / Smith Machine",
        coachTip: "Set bench backrest upright. Press weight overhead until arms are nearly locked out, then lower slowly until elbows are just below 90 degrees. Keeps constant tension on the delts."
      },
      {
        id: "thu-pf-2",
        name: "Dumbbell Lateral Raises [Medial Delt Cap & Width]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "Planet Fitness Dumbbells",
        coachTip: "With a slight bend in elbows, raise dumbbells out to your sides until parallel with the floor. Pour water out of a pitcher at the top to isolate the side delt for maximum shoulder width."
      },
      {
        id: "thu-pf-3",
        name: "Machine or Cable Reverse Flyes [Rear Delt Posture & 3D Look]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Pec Deck (Reverse) / Cables",
        coachTip: "Face the machine chest-first. Pull handles backward squeezing your rear delts and upper back. This is critical for pulling shoulders back and improving posture."
      },
      {
        id: "thu-pf-4",
        name: "Planet Fitness Ab Crunch Machine [Upper/Mid Ab Thickness]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "Planet Fitness Ab Machine",
        coachTip: "Adjust seat appropriately. Crunch forward using only your abdominal muscles (don't pull with arms). Hold the contraction for 1 second at the bottom."
      },
      {
        id: "thu-pf-5",
        name: "Hanging Knee Raises or Captain's Chair [Lower Ab V-Taper Sculpt]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "Planet Fitness Captain's Chair Tower",
        coachTip: "Support yourself on the arm pads. Bring knees up toward your chest, rounding your lower back slightly at the top to fully contract the lower abs. Lower slowly to prevent swinging."
      },
      {
        id: "thu-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Finish off shoulder and ab day with your mandatory 45 minutes on the treadmill."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Planet Fitness Upper Body Pump / Weak Point Finisher",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Upper Body Pump & Finisher",
    description: "A high-volume, fast-paced pump session targeting your chest, back, and arms to drive nutrient-rich blood into the muscles for weekend recovery and growth.",
    xpReward: 550,
    exercises: [
      {
        id: "fri-pf-1",
        name: "Cable Crossovers (High to Low) [Lower Pec Definition]",
        targetGroup: "Chest",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Set pulleys high. Press cables down and together in front of your waist. Flex lower chest hard at the bottom of the movement."
      },
      {
        id: "fri-pf-2",
        name: "Straight-Arm Cable Pulldowns [Lat Isolation & Sweep]",
        targetGroup: "Back",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Use a straight bar or rope on a high pulley. Keep arms mostly straight and push the bar down in an arc to your thighs, squeezing the lats without engaging the biceps."
      },
      {
        id: "fri-pf-3",
        name: "Cable Rope Hammer Curls [Brachioradialis / Forearm Pump]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Use the rope attachment on a low pulley. Curl up with a neutral grip to target the outer bicep and forearms."
      },
      {
        id: "fri-pf-4",
        name: "Overhead Rope Tricep Extensions [Long Head Pump]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Face away from a high or low pulley. Extend rope overhead, spreading the rope at the top to maximally contract the triceps."
      },
      {
        id: "fri-pf-5",
        name: "Cable Woodchoppers (High to Low) [Oblique Torque]",
        targetGroup: "Abs",
        sets: 3,
        reps: "12 reps per side",
        equipment: "Planet Fitness Cable Station",
        coachTip: "Set pulley high. Grab handle with both hands and chop diagonally downward across your body, twisting your torso and engaging your obliques."
      },
      {
        id: "fri-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Complete 45 minutes of daily dual cardio right after your upper body pump session."
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Planet Fitness Full Body Machines & Core Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness 360 Machine Circuit",
    description: "Run through the Planet Fitness 30-Minute Express Circuit area or use standalone machines for a full-body mechanical tension workout, followed by mat core work.",
    xpReward: 600,
    exercises: [
      {
        id: "sat-pf-1",
        name: "Chest Press Machine [Chest & Triceps]",
        targetGroup: "Chest",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Machine Circuit",
        coachTip: "Smooth, controlled reps. Focus on the muscle stretch and contraction without resting at the top or bottom."
      },
      {
        id: "sat-pf-2",
        name: "Seated Row or Pulldown Machine [Back & Biceps]",
        targetGroup: "Back",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Machine Circuit",
        coachTip: "Pull with your elbows, not your hands. Squeeze your shoulder blades together on every rep."
      },
      {
        id: "sat-pf-3",
        name: "Leg Press or Leg Extension Machine [Quads & Glutes]",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Machine Circuit",
        coachTip: "Keep tension on the legs the entire time. Don't lock out the knees."
      },
      {
        id: "sat-pf-4",
        name: "Shoulder Press Machine [Deltoids]",
        targetGroup: "Shoulders",
        sets: 3,
        reps: "15 reps",
        equipment: "Planet Fitness Machine Circuit",
        coachTip: "Press overhead under control. Keep your lower back pressed firmly against the pad."
      },
      {
        id: "sat-pf-5",
        name: "Planet Fitness Mat Area Core Circuit (Planks & Crunches) [Total Core]",
        targetGroup: "Abs",
        sets: 3,
        reps: "60s Plank + 20 Crunches",
        equipment: "Planet Fitness Turf / Mat Area",
        coachTip: "Superset a 60-second forearm plank immediately into 20 strict abdominal crunches. Rest 45 seconds, then repeat 3 times."
      },
      {
        id: "sat-pf-cardio",
        name: "Planet Fitness Treadmill Dual Cardio: 30-Minute Incline Walk + 15-Minute Jog [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m 3.5mph walk at 6-8% incline + 15m 5.5mph jog)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Finish Saturday with your 45-minute treadmill routine. You've completed a full week of Planet Fitness training and Korea meal-prep—ready for Sunday active recovery tomorrow!"
      }
    ]
  }
];


// Helper: returns today's workout from the home bodyweight routine
export function getTodayWorkout(): WorkoutDay {
  const todayDow = new Date().getDay(); // 0=Sun, 1=Mon, ...
  return (
    PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE.find(d => d.dayOfWeek === todayDow) ||
    PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE[0]
  );
}

