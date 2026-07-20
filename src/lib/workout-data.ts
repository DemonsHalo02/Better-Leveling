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

export const PLANET_FITNESS_PPL_ROUTINE: WorkoutDay[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: "Sunday",
    splitName: "Rest Day (Active Recovery & 45m Treadmill Cardio)",
    isRestDay: true,
    questTitle: "[Daily Quest] Planet Fitness Active Recovery & Treadmill Cardio",
    description: "Sunday is your active recovery and cardio day at Planet Fitness Lewiston! Perform a thorough full-body stretching and mobility routine on the stretch mats, then complete your mandatory 45-minute cardio protocol (30 minutes brisk walking + 15 minutes running on the Planet Fitness treadmills) to burn fat and prepare for Monday's heavy Push session.",
    xpReward: 300,
    exercises: [
      {
        id: "sun-1",
        name: "Planet Fitness Stretch Mat Mobility & Foam Rolling [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (slowly roll & release tension)",
        equipment: "PF Stretch Area / Mats & Foam Roller",
        coachTip: "Spend 15 minutes on the Planet Fitness stretching mats rolling out tight calves, quads, IT bands, and lats. This accelerates muscle recovery and prevents injury."
      },
      {
        id: "sun-2",
        name: "Deep Hip Flexor, Hamstring & Thoracic Spine Stretch [15 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "15 mins (hold each stretch 30-60 sec)",
        equipment: "PF Stretch Area / Mats",
        coachTip: "Hold deep stretches for 30-60 seconds per pose: pigeon pose for glutes/hips, seated hamstring stretches, and doorway/rack chest stretches. Keeps your joints lubricated and skin elastic."
      },
      {
        id: "sun-3",
        name: "HydroMassage / Total Body Enhancement & Green Tea Hydration [10 Minutes]",
        targetGroup: "Full Body",
        sets: 1,
        reps: "10 mins session + 1 cup Green Tea",
        equipment: "PF Black Card Lounge",
        coachTip: "Take advantage of the Planet Fitness Black Card HydroMassage or Total Body Enhancement (red light therapy) to soothe muscles and stimulate cellular turnover!"
      },
      {
        id: "sun-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Hop on the Planet Fitness treadmill for 30 minutes of brisk incline walking (3.5 MPH @ 3-5% incline) followed immediately by 15 minutes of steady jogging/running (6.0 MPH). Burns maximum fat while protecting muscle!"
      }
    ]
  },
  {
    dayOfWeek: 1, // Monday
    dayName: "Monday",
    splitName: "Push A (Chest, Shoulders & Triceps Hypertrophy)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Push A & Monday Walmart Grocery Prep",
    description: "Fuel up at 8:00 AM with Death Wish Espresso Roast Black Coffee & Banana, then hit Planet Fitness Lewiston for Push A! Build chest thickness, capped shoulders, and horseshoe triceps on PF equipment, followed immediately by 45 minutes of treadmill cardio. After gym, execute your weekly Walmart Auburn grocery run & Japanese Teriyaki meal prep!",
    xpReward: 500,
    exercises: [
      {
        id: "mon-prep",
        name: "Monday Auburn ME Walmart Grocery Run & Japanese Chicken Teriyaki Batch Prep",
        targetGroup: "Nutrition / Batch Prep",
        sets: 1,
        reps: "Teriyaki Batch Prep (For Tuesday Start)",
        equipment: "Auburn ME Walmart & Kitchen",
        coachTip: "Pick up your exact weekly groceries ($45.38 cutting / $43.76 bulking + $32.98 restock with Salmon). Cut chicken breasts into cubes, wok-sear with low-cal Japanese Teriyaki glaze, cook bulk rice, and portion across 14 containers!"
      },
      {
        id: "mon-1",
        name: "Smith Machine Flat Bench Press [Chest & Front Delt Compound]",
        targetGroup: "Chest",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Smith Machine & Bench",
        coachTip: "Set flat bench under Smith machine bar. Grip slightly wider than shoulder-width. Lower bar with a 2-second negative to mid-chest, press up explosively. Keep scapula retracted and feet planted."
      },
      {
        id: "mon-2",
        name: "Seated Chest Press Machine [Mid & Outer Chest Hypertrophy]",
        targetGroup: "Chest",
        sets: 3,
        reps: "12-15 reps",
        equipment: "PF Chest Press Machine",
        coachTip: "Adjust seat height so handles align with mid-chest. Drive handles forward with a deep chest squeeze, control the eccentric all the way back without letting weight stack slam."
      },
      {
        id: "mon-3",
        name: "Dumbbell Overhead Shoulder Press [Capped Shoulders & Width]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Sit upright with back support. Press dumbbells overhead until arms are extended, lower slowly until elbows are at 90 degrees. Builds broad, capped shoulder caps."
      },
      {
        id: "mon-4",
        name: "Dumbbell Lateral Raises [Outer Shoulder Cap Width]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Stand tall holding moderate dumbbells. Raise arms out to sides with slight elbow bend until wrists align with shoulder height. Lead with elbows for maximum medial head activation."
      },
      {
        id: "mon-5",
        name: "Cable Tricep Pushdowns (Rope Attachment) [Tricep Horseshoe Isolation]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF Cable Tower / Rope Attachment",
        coachTip: "Pin elbows tightly to your sides. Push rope down and pull ends apart at the bottom with a 1-second squeeze. Carves deep definition into the lateral and long tricep heads."
      },
      {
        id: "mon-6",
        name: "Overhead Dumbbell Tricep Extension [Long Head Tricep Growth]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Hold a single dumbbell overhead with both hands cupping the top plate. Lower weight behind head by bending elbows, press back up to full extension."
      },
      {
        id: "mon-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Immediately after finishing your last set of triceps, step onto the Planet Fitness treadmill for 30 minutes of brisk walking (3.5 MPH @ 3% incline) followed by a 15-minute steady run (6.0 MPH)!"
      }
    ]
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: "Tuesday",
    splitName: "Pull A + Forearms (Back Width, Biceps & PF Forearm Forge)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Pull A & Forearm Forge",
    description: "Start eating your prepped Chinese General Tso's Glazed Chicken bowls today! Hit Planet Fitness Lewiston for Pull A + Forearms: expand lat width, build thick bicep peaks, and carve crushing forearm density with dedicated hammer curls, bench wrist curls, and low-pulley cable wrist flexions on PF equipment. Finish strong with 45 minutes on the PF treadmill.",
    xpReward: 500,
    exercises: [
      {
        id: "tue-1",
        name: "Wide-Grip Lat Pulldown [Lat Width & V-Taper Compound]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Lat Pulldown Machine",
        coachTip: "Grip wide bar slightly wider than shoulder width. Drive elbows straight down toward your hips, pulling bar to upper chest. Squeeze lats hard at bottom before slowly releasing upward."
      },
      {
        id: "tue-2",
        name: "Seated Cable Row (V-Bar Attachment) [Mid-Back Thickness & Rhomboids]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Seated Cable Row Machine",
        coachTip: "Keep torso upright with slight knee bend. Pull V-bar into your midsection while drawing shoulder blades together. Builds thick, dense mid-back posture."
      },
      {
        id: "tue-3",
        name: "Assisted Pull-Up Machine [Upper Lat & Teres Major Control]",
        targetGroup: "Back",
        sets: 3,
        reps: "10-12 reps",
        equipment: "PF Assisted Pull-Up / Dip Machine",
        coachTip: "Set appropriate counterbalance weight on knees. Pull chest up to handles with controlled tempo. Excellent for mastering pull-up mechanics while targeting upper lats."
      },
      {
        id: "tue-4",
        name: "Dumbbell Alternating Curl with Supination [Bicep Peak Hypertrophy]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12 reps per arm",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Start with palms facing thighs. As you curl dumbbell up, rotate palm upward (supinate) and squeeze bicep peak hard at the top."
      },
      {
        id: "tue-5",
        name: "Preacher Curl Machine [Isolated Bicep Short Head Density]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "12-15 reps",
        equipment: "PF Preacher Curl Machine",
        coachTip: "Rest triceps flat against preacher pad so arms cannot swing. Curl handles toward chin and lower slowly. Eliminates momentum for maximum bicep isolation."
      },
      {
        id: "tue-6",
        name: "Dumbbell Hammer Curls [Brachialis & Radial Forearm Thickness]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "12-15 reps per arm",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Keep palms facing each other (neutral grip) throughout entire movement. Curl dumbbells toward anterior deltoids. Directly builds the outer brachialis and thick radial forearm flexors."
      },
      {
        id: "tue-7",
        name: "Seated Barbell/Dumbbell Wrist Curls (Palms Up & Down Super-Set) [Forearm Flexor & Extensor Carve]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "15-20 reps",
        equipment: "PF Bench & EZ-Bar / Dumbbells",
        coachTip: "Rest forearms on bench with wrists hanging over edge. Perform 15 palms-up wrist curls immediately followed by 15 palms-down reverse wrist curls. Pumps both forearm flexors and extensors!"
      },
      {
        id: "tue-8",
        name: "Cable Behind-the-Back Forearm Wrist Curls [Deep Flexor Isolation & Peak Squeeze]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Cable Tower / Low Pulley & Straight Bar",
        coachTip: "Stand facing away from low pulley with straight bar in hands behind your glutes using a shoulder-width overhand grip. Let bar roll down to your fingers, then curl fingers and wrists up hard for a devastating forearm burn!"
      },
      {
        id: "tue-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Step onto the Planet Fitness treadmill right after your forearm super-set! Complete your 30 minutes of brisk walking plus 15 minutes of running to keep fat burning high."
      }
    ]
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: "Wednesday",
    splitName: "Legs A + Abs (Quads, Hamstrings, Glutes & PF Ab Armor)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Legs A & Abdominal Armor",
    description: "Legs A plus high-intensity Abdominal Training at Planet Fitness Lewiston! Build strong quads, tight hamstrings, and a lifted glute profile while carving deep abdominal armor using the PF Captain's Chair, Cable Tower rope crunches, and the Selectorized Ab Crunch Machine. Followed immediately by your 45-minute post-workout treadmill walk and run.",
    xpReward: 500,
    exercises: [
      {
        id: "wed-1",
        name: "Leg Press Machine [Quad & Glute Heavy Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF Leg Press Machine",
        coachTip: "Place feet shoulder-width on platform. Lower sled deeply until knees reach 90 degrees without letting lower back round off pad. Drive weight up through mid-foot and heels."
      },
      {
        id: "wed-2",
        name: "Seated Leg Extension Machine [Quad Sweep & Rectus Femoris Isolation]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Leg Extension Machine",
        coachTip: "Align knees with pivot point of machine. Extend legs smoothly until knees are locked out, pause for 1 second squeezing quads, lower with a 2-second eccentric."
      },
      {
        id: "wed-3",
        name: "Lying Leg Curl Machine [Hamstring Belly & Knee Flexion]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF Lying Leg Curl Machine",
        coachTip: "Lie face down with roller pad securely just below calves. Curl heels smoothly toward glutes and squeeze hamstrings hard at peak contraction."
      },
      {
        id: "wed-4",
        name: "Goblet Squat [Quad Depth & Core Stabilization]",
        targetGroup: "Legs",
        sets: 3,
        reps: "12-15 reps",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Hold a single heavy dumbbell vertically against chest. Squat deep keeping elbows tucked inside knees, chest upright, and weight centered across feet."
      },
      {
        id: "wed-5",
        name: "Seated Calf Raise / Leg Press Calf Press [Calf Diamond Carve]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "PF Leg Press / Calf Machine",
        coachTip: "Place balls of feet on bottom edge of leg press platform. Lower heels for maximum stretch, then press high onto toes and hold for 2 seconds. Carves diamond calf striations."
      },
      {
        id: "wed-6",
        name: "Captain's Chair Hanging Leg / Knee Raises [Lower Ab & Hip Flexor Isolation]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "PF Captain's Chair / Tower",
        coachTip: "Support upper body on forearm pads of Captain's Chair. Raise knees or straight legs toward chest by curling your pelvis upward. The #1 exercise for lower abdominal definition."
      },
      {
        id: "wed-7",
        name: "High Cable Ab Crunch (Rope Attachment) [Upper Ab Rectus Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "PF Cable Tower / Rope Attachment",
        coachTip: "Kneel below high pulley holding rope behind neck. Crunch torso downward bringing elbows toward knees by flexing spine (do not pull with arms). Carves deep upper ab blocks."
      },
      {
        id: "wed-8",
        name: "PF Selectorized Abdominal Crunch Machine [Weighted Core Contraction & 6-Pack Density]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Ab Crunch Machine",
        coachTip: "Sit in the Planet Fitness Ab Crunch Machine gripping upper handles with chest pad secure. Curl upper torso down while drawing pelvis forward to create intense, controlled resistance right across all 6 abdominal blocks!"
      },
      {
        id: "wed-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Fluff out leg lactic acid on the Planet Fitness treadmill right after your abdominal routine! 30 minutes brisk walking plus 15 minutes running."
      }
    ]
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: "Thursday",
    splitName: "Push B (Upper Chest, Delts & Tricep Power)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Push B & Shoulder Capping",
    description: "Push B focuses on upper chest fullness, extreme side deltoid width, and heavy tricep extension at Planet Fitness Lewiston. Always pre-fuel at 8:00 AM with Death Wish Black Coffee & Banana and finish with your 45-minute treadmill cardio.",
    xpReward: 500,
    exercises: [
      {
        id: "thu-1",
        name: "Smith Machine Incline Bench Press [Upper Chest & Anterior Delt Focus]",
        targetGroup: "Chest",
        sets: 4,
        reps: "10-12 reps",
        equipment: "Planet Fitness Smith Machine & Incline Bench",
        coachTip: "Set bench to 30-45 degree incline under Smith machine. Lower bar slowly to upper chest / collarbone area, press upward squeezing upper pectorals. Builds broad chest shelf."
      },
      {
        id: "thu-2",
        name: "Cable Chest Fly (Mid/High Pulley) [Inner Chest Pec Striations]",
        targetGroup: "Chest",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF Dual Cable Cross / Tower",
        coachTip: "Stand between dual cables with handles set at shoulder height or higher. Bring hands together in front of chest hugging an imaginary barrel. Squeeze inner chest striations hard at midline."
      },
      {
        id: "thu-3",
        name: "Machine Shoulder Press [Heavy Overhead Delt Compound]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Shoulder Press Machine",
        coachTip: "Use neutral or pronated handles on shoulder press machine. Drive weight overhead with steady power, lower until handles reach ear height."
      },
      {
        id: "thu-4",
        name: "Cable Single-Arm Lateral Raise [Continuous Tension Side Delt Cap]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps per arm",
        equipment: "PF Cable Tower / Single D-Handle",
        coachTip: "Set low cable pulley and grasp handle with opposite hand behind your back or at side. Raise arm out laterally with slight elbow bend. Cables provide constant tension on side delts across entire range of motion!"
      },
      {
        id: "thu-5",
        name: "EZ-Bar / Cable Skull Crushers [Tricep Mass & Overhead Stretch]",
        targetGroup: "Triceps",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Cable Tower / EZ-Bar Attachment",
        coachTip: "Lie flat on bench holding straight bar or EZ-bar attached to low/mid cable. Lower bar toward forehead by bending elbows, press back up to full lockout. Builds massive tricep belly."
      },
      {
        id: "thu-6",
        name: "Tricep Dip Machine [Tricep Horseshoe Burnout]",
        targetGroup: "Triceps",
        sets: 3,
        reps: "15 reps",
        equipment: "PF Assisted Dip / Tricep Machine",
        coachTip: "Press handles straight down locking out elbows with torso slightly upright. Go to failure on your final set for a tremendous tricep pump."
      },
      {
        id: "thu-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Hit the Planet Fitness treadmill right after completing your last tricep dip set! 30 minutes brisk walking plus 15 minutes running."
      }
    ]
  },
  {
    dayOfWeek: 5, // Friday
    dayName: "Friday",
    splitName: "Pull B + Forearms (Back Thickness, Biceps & PF Grip Forge)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Pull B & Forearm Grip Forge",
    description: "Pull B + Forearms at Planet Fitness Lewiston targets thick mid-back musculature, rear deltoid posture, bicep density, and intense forearm grip development using fixed EZ-bars, heavy dumbbells, and cable rollers on PF equipment. Plus your Friday evening Chinese Chow Mein treat meal after hitting your 45-minute treadmill cardio!",
    xpReward: 500,
    exercises: [
      {
        id: "fri-1",
        name: "Single-Arm Dumbbell Row [Lat Stretch & Mid-Back Thickness]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps per arm",
        equipment: "PF Free Weight Area / Dumbbells & Bench",
        coachTip: "Place one knee and supporting hand on flat bench. Pull heavy dumbbell toward your hip with working arm, driving elbow high to contract lats and rhomboids."
      },
      {
        id: "fri-2",
        name: "Close-Grip Front Pulldown (V-Bar / Mag Grip) [Lower Lat & Teres Focus]",
        targetGroup: "Back",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Lat Pulldown Machine / V-Bar",
        coachTip: "Attach close-grip V-bar to pulldown cable. Pull bar directly to lower chest while keeping chest lifted high. Targets lower lat insertion and thickness."
      },
      {
        id: "fri-3",
        name: "Rear Delt Face Pulls (Rope Attachment) [Rear Delts & Upper Back Posture]",
        targetGroup: "Shoulders",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Cable Tower / Rope Attachment",
        coachTip: "Set pulley to upper face height holding rope ends. Pull rope toward bridge of nose while separating hands and rotating wrists back. Builds rear deltoids and corrects rounded posture."
      },
      {
        id: "fri-4",
        name: "Standing Cable Curl (Straight / EZ Bar) [Continuous Tension Bicep Mass]",
        targetGroup: "Biceps",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF Low Cable Pulley / Straight Bar",
        coachTip: "Keep elbows locked against ribs. Curl cable bar up squeezing biceps at the top. Cable resistance keeps biceps under tension at bottom and top of every rep."
      },
      {
        id: "fri-5",
        name: "Incline Dumbbell Curl [Long Head Bicep Peak Stretch]",
        targetGroup: "Biceps",
        sets: 3,
        reps: "10-12 reps",
        equipment: "PF Incline Bench & Dumbbells",
        coachTip: "Set bench to 45 degree incline. Let arms hang behind torso to put maximum stretch on bicep long head. Curl dumbbells smoothly without moving elbows forward."
      },
      {
        id: "fri-6",
        name: "Standing Reverse EZ-Bar Curls (Overhand Grip) [Brachioradialis Forearm Top Carve]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "12-15 reps",
        equipment: "PF EZ-Bar Rack / Fixed Barbells",
        coachTip: "Grip pre-loaded fixed EZ-bar with an overhand (pronated) grip. Curl bar upward keeping elbows tucked. Directly targets top forearm brachioradialis and outer bicep!"
      },
      {
        id: "fri-7",
        name: "Heavy Dumbbell Farmer Curls / Static Hold to Failure [Forearm Grip Endurance & Striations]",
        targetGroup: "Forearms",
        sets: 3,
        reps: "45-60 sec hold / 15 reps",
        equipment: "PF Free Weight Area / Heavy Dumbbells",
        coachTip: "Hold heavy dumbbells in neutral grip with elbows bent at 90 degrees for 30 seconds, then immediately pump out 15 hammer curls. Forges iron grip strength and forearm vascularity!"
      },
      {
        id: "fri-8",
        name: "Cable Forearm Wrist Roller / Wrist Flexions [Continuous Tension Forearm Pump]",
        targetGroup: "Forearms",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Cable Tower / Straight Bar Attachment",
        coachTip: "Attach a straight bar to the low pulley on the Planet Fitness Cable Tower. Grasp bar with an overhand grip, rest forearms against your thighs, and roll wrists upward against constant cable tension until forearms are thoroughly pumped!"
      },
      {
        id: "fri-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Complete your Friday 45-minute treadmill walk & run right after your forearm burnout before heading home to enjoy your weekly Japanese Ramen treat meal!"
      }
    ]
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: "Saturday",
    splitName: "Legs B + Abs (Glute Lift, Hamstrings, Calves & PF Deep Core)",
    isRestDay: false,
    questTitle: "[Daily Quest] Planet Fitness Legs B & Deep Core Carve",
    description: "Finish your 6-day PPL lifting split with Legs B plus intense deep abdominal carving at Planet Fitness Lewiston! Target glute separation, hamstring detail, diamond calves, and a shredded midsection on PF Decline Benches, Cable Towers, and stretch mats before completing your 45-minute post-workout treadmill cardio.",
    xpReward: 500,
    exercises: [
      {
        id: "sat-1",
        name: "Dumbbell Romanian Deadlifts (RDLs) [Hamstring & Glute Stretch Compound]",
        targetGroup: "Legs",
        sets: 4,
        reps: "10-12 reps",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Stand holding dumbbells in front of thighs with slight knee bend. Hinge hips straight back keeping flat spine until dumbbells reach mid-shin and you feel a deep hamstring stretch. Drive hips forward to stand and squeeze glutes."
      },
      {
        id: "sat-2",
        name: "Dumbbell Walking Lunges or Bulgarian Split Squats [Unilateral Quad & Glute Tone]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12 reps per leg",
        equipment: "PF Free Weight Area / Dumbbells",
        coachTip: "Step forward into a lunge or place rear foot on bench for split squats. Lower rear knee gently toward floor. Unilateral training balances leg symmetry and carves deep glute separation."
      },
      {
        id: "sat-3",
        name: "Smith Machine Glute Bridge / Hip Thrust [Glute Activation & Peak Lift]",
        targetGroup: "Legs",
        sets: 4,
        reps: "12-15 reps",
        equipment: "Planet Fitness Smith Machine & Bench",
        coachTip: "Position upper back across flat bench and Smith bar across hips (use bar pad). Drive hips toward ceiling squeezing glutes hard for 2 seconds at full extension."
      },
      {
        id: "sat-4",
        name: "Seated / Standing Calf Raise Machine [Calf Soleus & Gastrocnemius Density]",
        targetGroup: "Legs",
        sets: 4,
        reps: "15-20 reps",
        equipment: "PF Calf Machine",
        coachTip: "Lower heels deeply for full stretch, drive up onto big toes and hold peak contraction for 2 seconds. High volume builds dense, diamond calf heads."
      },
      {
        id: "sat-5",
        name: "Decline Bench Sit-Ups with Weighted Plate [Rectus Abdominis Mass & Carve]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps",
        equipment: "PF Decline Ab Bench & Weight Plate",
        coachTip: "Hook feet under decline ab bench pads holding a 10-25 lb plate against chest. Curl torso up rounding spine to contract abs, lower slowly under control. Builds deep 6-pack block thickness."
      },
      {
        id: "sat-6",
        name: "Cable Oblique Woodchoppers (High to Low & Low to High) [V-Taper Oblique Armor]",
        targetGroup: "Abs",
        sets: 4,
        reps: "15 reps per side",
        equipment: "PF Cable Tower / Single Handle",
        coachTip: "Stand sideways to cable tower. Pull handle diagonally across body from high pulley down across hip (or low to high) while twisting torso and tightening obliques. Carves sharp side oblique armor."
      },
      {
        id: "sat-7",
        name: "PF Torso Rotation Machine / Abdominal Russian Twist Burnout [Deep Core Stabilization]",
        targetGroup: "Abs",
        sets: 3,
        reps: "60 sec hold + 20 twists",
        equipment: "PF Torso Rotation Machine / Stretch Mats",
        coachTip: "Use the Planet Fitness Torso Rotation Machine or sit on the stretch area mats for 60 seconds of rigid forearm planking followed immediately by 20 Russian twists. Ultimate core finisher!"
      },
      {
        id: "sat-cardio",
        name: "Post-Workout Cardio: 30-Minute Brisk Walk + 15-Minute Run on Treadmill",
        targetGroup: "Cardio",
        sets: 1,
        reps: "45 mins total (30m walk @ 3.5 MPH + 15m run @ 6.0 MPH)",
        equipment: "Planet Fitness Treadmill",
        coachTip: "Conquer your Saturday training week with your final 45-minute treadmill walk and run session at Planet Fitness Lewiston!"
      }
    ]
  }
];

export const JAPANESE_HOME_BODYWEIGHT_ROUTINE = PLANET_FITNESS_PPL_ROUTINE;
export const JAPANESE_APARTMENT_BODYWEIGHT_ROUTINE = PLANET_FITNESS_PPL_ROUTINE;
export const PLANET_FITNESS_LEWISTON_6DAY_ROUTINE = PLANET_FITNESS_PPL_ROUTINE;

export function getTodayWorkout(): WorkoutDay {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  return PLANET_FITNESS_PPL_ROUTINE.find(d => d.dayOfWeek === dayIndex) || PLANET_FITNESS_PPL_ROUTINE[0];
}
