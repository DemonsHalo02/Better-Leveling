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
    splitName: "System Restoration / Puerto Rican Active Recovery Flow (Rest Day)",
    isRestDay: true,
    questTitle: "[Daily Quest] Puerto Rican Home Active Recovery & Mobility",
    description: "Sunday is your official System Restoration & Active Recovery Day inside your quiet apartment! Focus on gentle mobility flows, deep hamstring/hip stretches, and mindful breathing to prepare your muscles for Monday's Auburn ME Walmart grocery run and high-protein Crispy Pollo al Horno meal prep. Concludes with your daily 45-minute dual cardio session (30-minute brisk walk + 15-minute run/silent march).",
    xpReward: 300,
    exercises: [
      {
        id: "sun-home-1",
        name: "Apartment Mobility Flow: Cat-Cow to Downward Dog & Child's Pose [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (flow through poses slowly)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start on all fours on your mat. Alternate between Cat (round spine up) and Cow (arch spine down) for 10 slow breaths, then push hips high into Downward Dog holding 30 seconds to lengthen calves and hamstrings. Transition gently into Child's Pose to decompress the lumbar spine."
      },
      {
        id: "sun-home-2",
        name: "Deep Hip Flexor, Hamstring & Shoulder Opener Sequence [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 45 sec)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold half-kneeling hip flexor stretches for 45 seconds per leg, followed by seated forward hamstring folds and doorway chest stretches. Opening tight hips and chest improves your posture and squat depth."
      },
      {
        id: "sun-home-3",
        name: "Mindful Breathing & Postural Alignment [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins (4-4-6 breathing)",
        equipment: "Quiet Space (Home)",
        coachTip: "Sit cross-legged or lie flat on your back. Breathe in deeply through the nose for 4 seconds, hold at the top for 4 seconds, and exhale smoothly through the mouth for 6 seconds. Lowers cortisol and accelerates recovery."
      },
      {
        id: "sun-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete 30 minutes of brisk walking outdoors or silent indoor marching, followed by 15 minutes of higher tempo jogging or high-knee marching. This daily 45-minute cardio commitment burns 400+ calories right off your midsection while preserving lean muscle!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Home Upper Body Push Sculpt + Monday Grocery & Batch Meal Prep",
    isRestDay: false,
    questTitle: "[Daily Quest] Upper Body Push Sculpt & Puerto Rican Meal Prep Monday",
    description: "Official Monday Grocery Run at Auburn ME Walmart & Weekly Batch Puerto Rican Meal Prep Day + Apartment Upper Body Push training! Grab your staples (Café Bustelo, Adobo, Sazón, Sofrito, Gandules, and Chicken Breasts), prep your meals for Tuesday start, and sculpt your chest, shoulders, and triceps with silent bodyweight tension.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-home-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Puerto Rican Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Batch Prep Crispy Pollo al Horno & Arroz con Gandules (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Head to Auburn ME Walmart and pick up your exact grocery items! Once home, batch bake or pan sear your Crispy Pollo al Horno breast cubes and simmer a large pot of Arroz con Gandules so your high-protein eating begins seamlessly on Tuesday morning!"
      },
      {
        id: "mon-home-1",
        name: "Strict Controlled Bodyweight Push-Ups [Chest & Anterior Deltoids]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps (3 sec descent)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Keep hands shoulder-width apart, core braced. Lower slowly over 3 full seconds until your chest hovers 1 inch above the floor, then press explosively without locking out elbows. Total silent muscle control."
      },
      {
        id: "mon-home-2",
        name: "Wide-Stance Push-Ups [Outer Chest Width & Shoulder Frame]",
        targetGroup: "Chest",
        sets: 3,
        reps: "10-12 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Place hands 6 to 8 inches wider than shoulder width. This places deep stretch and tension on the outer pectorals and anterior deltoids for broad, athletic chest width."
      },
      {
        id: "mon-home-3",
        name: "Pike Push-Ups [Bodyweight Overhead Shoulder Press]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "8-10 reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Elevate hips high into an inverted V (downward dog posture). Bend elbows to lower crown of head toward the mat between your hands, then press vertically upward to sculpt rounded shoulder caps."
      },
      {
        id: "mon-home-4",
        name: "Sturdy Chair / Couch Edge Tricep Dips [Tricep Horseshoe Isolation]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Sturdy Chair or Couch Edge (Home)",
        coachTip: "Place palms securely on edge of sturdy chair or couch behind you, heels on floor. Lower body until elbows reach 90 degrees, press up by squeezing triceps hard at the top."
      },
      {
        id: "mon-home-5",
        name: "Diamond Push-Ups [Inner Chest & Tricep Burnout to Failure]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "8-12 reps to technical failure",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Form a diamond shape with index fingers and thumbs directly under your sternum. Keep elbows tucked tight to your ribs on the descent for the ultimate inner chest and horseshoe tricep pump."
      },
      {
        id: "mon-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Finish up your Monday session with 45 minutes of dual cardio! A 30-minute brisk walk followed by a 15-minute conditioning run or silent high-knee march keeps your fat oxidation roaring."
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Home Lower Body Sculpt & Glute Lift - Start Eating Puerto Rican Prep!",
    isRestDay: false,
    questTitle: "[Daily Quest] Lower Body Sculpt & Start Eating Puerto Rican Prep",
    description: "First official day eating your prepped Crispy Pollo al Horno & Arroz con Gandules meals! Build strong quads, tight hamstrings, and a lifted glute profile right in your quiet apartment with silent bodyweight squats, lunges, and wall sits.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-home-1",
        name: "Slow Tempo Bodyweight Squats [Quad & Glute Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps (2 sec down, 1 sec pause)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Stand with feet slightly wider than shoulders, toes out 15 degrees. Squat deep with weight evenly distributed, pause 1 second at the bottom below parallel, and drive up through heels. Zero noise, maximum muscle burn."
      },
      {
        id: "tue-home-2",
        name: "Alternating Reverse Lunges [Silent Quad & Glute Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg (24 total)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step backward with one foot and lower rear knee gently toward the mat without impacting the floor. Reverse lunges place less shear stress on knees and are completely silent for downstairs neighbors."
      },
      {
        id: "tue-home-3",
        name: "Wall Sit Isometric Hold [Quad Endurance & Mental Toughness]",
        targetGroup: "Legs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Wall (Home)",
        coachTip: "Press back flat against wall, slide down until thighs are parallel to the floor (90-degree knee angle). Keep hands off your thighs and hold frozen until quads burn deeply."
      },
      {
        id: "tue-home-4",
        name: "Single-Leg or Bilateral Glute Bridges [Glute & Hamstring Lift]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps with 2-sec top squeeze",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat on back with knees bent and heels planted near glutes. Drive hips toward the ceiling, squeezing glutes maximally for 2 full seconds at the top before lowering under control."
      },
      {
        id: "tue-home-5",
        name: "Lying Side Clamshells & Abductions [Hip & Glute Medius Stabilizers]",
        targetGroup: "Legs",
        sets: 3,
        reps: "15 reps per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on side with knees bent at 45 degrees, heels glued together. Open top knee wide like a clamshell against natural hip tension to sculpt the outer glutes and stabilize the hip girdle."
      },
      {
        id: "tue-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Flush leg lactic acid and keep weekly fat loss on track with your 45-minute dual cardio session right after lower body training!"
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Home Core Carve & Deep Waist Stabilization (Abs & Obliques)",
    isRestDay: false,
    questTitle: "[Daily Quest] Apartment Core Carve & Waist Sculpt",
    description: "High-tension core and waist carving session right on your living room mat! Carve out deep lower abs, oblique definition, and transverse abdominis tightness without a single sound or clanking weight.",
    xpReward: 600,
    exercises: [
      {
        id: "wed-home-1",
        name: "Slow Bicycle Crunches [Upper & Lower Ab Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "20 reps (10 per side, slow rotation)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie on back with hands gently behind ears. Rotate right elbow across to touch left knee while fully extending right leg forward. Move slowly with intentional contraction—momentum ruins ab development."
      },
      {
        id: "wed-home-2",
        name: "Seated Russian Twists [Oblique & Waist Definition]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 reps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Sit with knees bent, lean torso back 45 degrees to engage core, and raise heels slightly off mat. Twist shoulders from right to left touching fingertips to the floor beside your hips."
      },
      {
        id: "wed-home-3",
        name: "Side Plank Isometric Holds [Lateral Core & Oblique Armor]",
        targetGroup: "Abs",
        sets: 3,
        reps: "30-45 seconds per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Support body weight on right forearm and outer right foot, body straight like a plank. Lift lower hip high toward the ceiling and hold frozen. Switches to left forearm after 45 seconds."
      },
      {
        id: "wed-home-4",
        name: "Lying Straight Leg Raises [Lower Ab Isolation & V-Taper]",
        targetGroup: "Abs",
        sets: 4,
        reps: "12-15 reps (lower leg 3 sec down)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat with lower back pressed firmly into mat (hands under hips for support). Raise both straight legs vertical to 90 degrees, then lower smoothly over 3 seconds without heels touching the floor."
      },
      {
        id: "wed-home-5",
        name: "Forearm Plank Isometric Hold [Transverse Abdominis Deep Core Stability]",
        targetGroup: "Abs",
        sets: 3,
        reps: "45-60 seconds hold",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold forearm plank position with elbows directly under shoulders. Squeeze glutes hard and pull navel upward toward your spine to tighten your inner abdominal corset."
      },
      {
        id: "wed-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Complete your Wednesday cardio! 30 minutes of steady walking followed by 15 minutes of higher tempo jogging or indoor marching keeps your heart healthy and your ab definition popping."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Home Back Posture, Upper Back & Bicep Tension Training",
    isRestDay: false,
    questTitle: "[Daily Quest] Apartment Back Posture & Arm Sculpt Session",
    description: "Target upper back posture, rear deltoids, and bicep tension inside your apartment using Superman holds, towel dynamic rows, and plank shoulder taps to build an upright, athletic V-taper.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-home-1",
        name: "Superman Prone Holds [Lower Back, Spinal Erectors & Glute Posture]",
        targetGroup: "Back",
        sets: 4,
        reps: "12 reps (hold 3 sec at top of each rep)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with arms extended overhead and legs straight. Simultaneously raise arms, chest, and thighs off the floor. Squeeze shoulder blades and lower back for 3 full seconds at the peak before lowering."
      },
      {
        id: "thu-home-2",
        name: "Doorway or Towel Isometric Row Pulls [Back & Lats Engagement]",
        targetGroup: "Back",
        sets: 4,
        reps: "12-15 reps (or 30 sec max tension pull)",
        equipment: "Sturdy Doorframe or Bath Towel (Home)",
        coachTip: "Stand inside a sturdy doorframe, grasp the frame with both hands at chest height, lean back at 45 degrees, and pull chest forward toward frame squeezing lats and rhomboids. Or use a rolled towel held horizontal pulling outward against maximum tension."
      },
      {
        id: "thu-home-3",
        name: "High Plank Shoulder Taps [Shoulder & Core Anti-Rotation Stability]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "20 taps (10 per side)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Hold top push-up position. Lift right hand to tap left shoulder, then left hand to tap right shoulder. Keep core braced so hips never twist or sway side to side."
      },
      {
        id: "thu-home-4",
        name: "Isometric Bicep Towel Curls [Bicep Peak High-Tension Hold]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12 reps with 5-sec top squeeze hold per set",
        equipment: "Bath Towel & Body Tension (Home)",
        coachTip: "Loop a sturdy bath towel under one foot while holding the ends with both hands palm up. Pull upward into a bicep curl while pressing your foot downward against the towel creating intense self-resistance for 5 seconds per repetition!"
      },
      {
        id: "thu-home-5",
        name: "Prone Reverse Snow Angels [Rear Deltoids & Upper Back Scapular Health]",
        targetGroup: "Back",
        sets: 3,
        reps: "12-15 slow sweeps",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie face down with forehead resting gently on mat. Lift arms slightly off floor and sweep them from your sides all the way overhead like a snow angel, squeezing scapulae together throughout."
      },
      {
        id: "thu-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Thursday cardio check! 30 minutes of walking plus 15 minutes of running/marching ensures your metabolism stays elevated right through the evening."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Home Total Body High-Intensity Conditioning & Weekly Tostones Treat Meal!",
    isRestDay: false,
    questTitle: "[Daily Quest] Friday Total Body Conditioning & Tostones Treat",
    description: "High-energy apartment total body conditioning! Combine push, squat, lunge, and core stability into a seamless flow to maximize calorie burn right before enjoying your Friday/Saturday reward meal of Goya Tostones & garlic Pollo al Horno!",
    xpReward: 600,
    exercises: [
      {
        id: "fri-home-1",
        name: "Silent Bodyweight Squat to Knee-Lift Combo [Quad & Ab Conditioning]",
        targetGroup: "Full Body",
        sets: 4,
        reps: "16 total reps (8 squats + alternating knee lifts)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Perform a deep controlled bodyweight squat, and as you drive up to standing, bring right knee up to chest height while squeezing lower abs. Next squat bring left knee up. High metabolic demand with zero foot impact!"
      },
      {
        id: "fri-home-2",
        name: "Push-Up to Shoulder Tap Combo [Chest, Shoulder & Core Integration]",
        targetGroup: "Full Body",
        sets: 4,
        reps: "10-12 combo reps",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower into a strict push-up, press up, tap right hand to left shoulder, tap left hand to right shoulder. That equals one full repetition. Builds incredible upper body stamina and core armor."
      },
      {
        id: "fri-home-3",
        name: "Stationary Lunge with Isometric Bottom Pulse [Leg & Glute Endurance]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps + 10 sec bottom pulse hold per leg",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Step into stationary lunge stance. Lower and raise for 12 reps, and on the 12th rep stay down at the bottom pulsing 1 inch up and down for 10 seconds before switching legs. Pure glute and quad fire."
      },
      {
        id: "fri-home-4",
        name: "Bicycle Crunch to Leg Raise Super-Set [Complete Abdominal Burnout]",
        targetGroup: "Abs",
        sets: 3,
        reps: "15 bicycle crunches immediately into 10 leg raises",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Perform 15 slow bicycle crunches and without resting immediately transition into 10 controlled lying straight leg raises. The ultimate Friday core finisher!"
      },
      {
        id: "fri-home-5",
        name: "Plank to Downward Dog Pike Flow [Shoulder & Core Active Flexibility]",
        targetGroup: "Full Body",
        sets: 3,
        reps: "12 flow transitions",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Start in high plank. Push hips backward and upward into downward dog stretching calves and lats, then smoothly glide hips back forward into a braced high plank. Controlled and dynamic."
      },
      {
        id: "fri-home-cardio",
        name: "Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run or Silent Indoor March [45 Minutes Total]",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m brisk walk + 15m run/march)",
        equipment: "Outdoors / Silent Apartment Track",
        coachTip: "Earn your Friday Goya Tostones reward treat! Complete your 45-minute dual cardio session (30m walk + 15m run) and enjoy your evening meal completely guilt-free!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Home Full Body Tension Mastery & Core Stabilization Circuit",
    isRestDay: false,
    questTitle: "[Daily Quest] Saturday Full Body Mastery & Core Armor",
    description: "Cap off your training week inside your apartment with high-tension full body control, glute bridges, push-up isometric holds, and deep core work before hitting your weekend dual cardio run!",
    xpReward: 500,
    exercises: [
      {
        id: "sat-home-1",
        name: "Slow Tempo Squat with 3-Second Bottom Hold [Lower Body Mastery]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps (3 sec pause at bottom below parallel)",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower into a deep squat and hold completely still at the bottom for 3 full seconds per rep without resting thighs on calves. Squeeze quads and glutes to ascend."
      },
      {
        id: "sat-home-2",
        name: "Push-Up Isometric Mid-Way Hold [Chest & Tricep High-Tension Freeze]",
        targetGroup: "Chest",
        sets: 3,
        reps: "30-45 seconds frozen halfway down",
        equipment: "Bodyweight Only (Home)",
        coachTip: "Lower halfway down into a push-up until elbows reach 90 degrees and freeze in position. Hold for 30 to 45 seconds squeezing chest, triceps, core, and glutes simultaneously!"
      },
      {
        id: "sat-home-3",
        name: "Single-Leg Glute Bridge Holds [Hamstring & Glute Isolation]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12 reps per leg (hold 2 sec at peak)",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Lie flat with knees bent, extend right leg straight in the air. Drive hips upward using left glute and heel. Hold peak contraction for 2 seconds before lowering."
      },
      {
        id: "sat-home-4",
        name: "Russian Twists & Side Plank Super-Set [Complete Oblique Armor]",
        targetGroup: "Abs",
        sets: 3,
        reps: "20 Russian twists directly into 30 sec side plank per side",
        equipment: "Mat or Carpet (Home)",
        coachTip: "Complete 20 seated torso rotations and immediately flip onto your forearm to hold a side plank for 30 seconds on each side. Locks in a tight waist and iron core stability."
      },
      {
        id: "sat-home-cardio",
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
    questTitle: "[Daily Quest] Planet Fitness Push Day & Puerto Rican Meal Prep Monday",
    description: "Official Monday Grocery Run at Auburn ME Walmart & Weekly Batch Puerto Rican Meal Prep Day + Planet Fitness Chest & Tricep training! Grab your staples (Café Bustelo, Adobo, Sazón, Sofrito, Gandules, and Chicken Breasts), prep your meals for Tuesday start, and hit the Planet Fitness machines and dumbbells for a massive chest & tricep pump.",
    xpReward: 500,
    exercises: [
      {
        id: "mon-pf-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Puerto Rican Batch Meal Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Batch Prep Crispy Pollo al Horno & Arroz con Gandules (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Head to Auburn ME Walmart and pick up your exact Puerto Rican staples! Once home, batch bake or pan sear your Crispy Pollo al Horno breast cubes and simmer Arroz con Gandules so your high-protein eating begins seamlessly on Tuesday morning!"
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

export const QUIET_APARTMENT_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
export const PLANET_FITNESS_PPL_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = PUERTO_RICAN_PLANET_FITNESS_ROUTINE;
export const KPOP_HOME_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
export const KPOP_IDOL_HOME_BODYWEIGHT_ROUTINE = PUERTO_RICAN_HOME_BODYWEIGHT_ROUTINE;
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
