// Future-Proofing: Adjustable Dumbbells & Treadmill Programs
// Ready to be enabled whenever your adjustable dumbbells and treadmill arrive!

import { DayOfWeek } from '../types';

export interface FutureExercise {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment: 'adjustable_dumbbells' | 'treadmill';
  suggestedWeightLbs?: string;
  defaultSets: number;
  defaultReps: string;
  restSeconds: number;
  cues: string[];
  apartmentTip: string;
}

export interface TreadmillProtocol {
  id: string;
  title: string;
  category: 'warmup' | 'zone2_cardio' | 'incline_hiit' | 'cooldown';
  durationMinutes: number;
  speedMph: string;
  inclinePct: string;
  description: string;
  cues: string[];
  benefits: string;
}

export const FUTURE_DUMBBELL_SCHEDULE: Record<DayOfWeek, {
  focusTitle: string;
  subtitle: string;
  exercises: FutureExercise[];
}> = {
  monday: {
    focusTitle: 'Push Focus A + Dumbbell Chest & Triceps',
    subtitle: 'Compound dumbbell pressing & isolation',
    exercises: [
      {
        id: 'db-m-1',
        name: 'Dumbbell Floor Press',
        targetMuscles: ['Chest', 'Anterior Delts', 'Triceps'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '25-45 lbs each',
        defaultSets: 4,
        defaultReps: '8-12',
        restSeconds: 90,
        cues: [
          'Lie flat on mat, triceps lightly touch floor without bouncing',
          'Elbows at 45 degrees to ribs to protect shoulders',
          'Press up smoothly and squeeze inner pecs',
        ],
        apartmentTip: 'Floor prevents shoulder hyperextension and dumbbells rest gently on mat.',
      },
      {
        id: 'db-m-2',
        name: 'Standing Neutral Dumbbell Overhead Press',
        targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '15-30 lbs each',
        defaultSets: 3,
        defaultReps: '8-10',
        restSeconds: 75,
        cues: [
          'Palms facing each other (neutral grip is easiest on rotator cuffs)',
          'Brace glutes and abs — do not lean backward',
          'Press overhead until elbows are fully locked',
        ],
        apartmentTip: 'Stationary standing movement with zero floor impact.',
      },
      {
        id: 'db-m-3',
        name: 'Overhead Two-Handed Dumbbell Triceps Extension',
        targetMuscles: ['Triceps Long Head'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '20-40 lbs (single dumbbell)',
        defaultSets: 3,
        defaultReps: '10-12',
        restSeconds: 60,
        cues: [
          'Hold one dumbbell vertically with both hands under top plate',
          'Keep elbows tucked forward, lower behind neck over 3 seconds',
          'Extend back to full lockout at the top',
        ],
        apartmentTip: 'Deep stretch on triceps long head with zero foot movement.',
      },
    ],
  },
  tuesday: {
    focusTitle: 'Pull Focus A + Dumbbell Back & Biceps',
    subtitle: 'Rowing strength & arm hypertrophy',
    exercises: [
      {
        id: 'db-tu-1',
        name: 'Bent-Over Dumbbell Rows (Neutral Grip)',
        targetMuscles: ['Lats', 'Rhomboids', 'Rear Delts'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '25-45 lbs each',
        defaultSets: 4,
        defaultReps: '8-12',
        restSeconds: 90,
        cues: [
          'Hinge hips back at 45 degrees with flat spine',
          'Pull dumbbells toward waist pocket, leading with elbows',
          'Squeeze shoulder blades together for 1 second at top',
        ],
        apartmentTip: 'Dead-stop on mat between sets for zero floor vibration.',
      },
      {
        id: 'db-tu-2',
        name: 'Standing Dumbbell Hammer Curls',
        targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '15-25 lbs each',
        defaultSets: 3,
        defaultReps: '10-12',
        restSeconds: 60,
        cues: [
          'Keep thumbs pointing upward throughout the curl',
          'Pin elbows by your sides without swinging torso',
          'Lower over 2 full seconds for maximum eccentric tension',
        ],
        apartmentTip: 'Pure arm isolation without movement of the feet.',
      },
      {
        id: 'db-tu-3',
        name: 'Dumbbell Incline/Mat Shrugs',
        targetMuscles: ['Upper Trapezius', 'Neck Stabilizers'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '30-50 lbs each',
        defaultSets: 3,
        defaultReps: '12-15',
        restSeconds: 60,
        cues: [
          'Elevate shoulders straight toward ears',
          'Hold peak contraction for 2 solid seconds',
          'Lower smoothly — do not roll shoulders in circles',
        ],
        apartmentTip: 'High-rep controlled tension on traps.',
      },
    ],
  },
  wednesday: {
    focusTitle: 'Legs A + Dumbbell Lower Body Hypertrophy',
    subtitle: 'Squat & hinge power with progressive overload',
    exercises: [
      {
        id: 'db-w-1',
        name: 'Dumbbell Goblet Squats',
        targetMuscles: ['Quads', 'Glutes', 'Core'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '30-60 lbs (single dumbbell)',
        defaultSets: 4,
        defaultReps: '8-12',
        restSeconds: 90,
        cues: [
          'Cup top of dumbbell against chest like a goblet',
          'Keep elbows inside knees as you descend deep',
          'Drive up through whole foot, keeping chest proud',
        ],
        apartmentTip: 'Completely silent, builds incredible leg size without knee pain.',
      },
      {
        id: 'db-w-2',
        name: 'Dumbbell Romanian Deadlifts (RDL)',
        targetMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '25-45 lbs each',
        defaultSets: 4,
        defaultReps: '8-10',
        restSeconds: 90,
        cues: [
          'Micro-bend in knees, push hips back like shutting a car door',
          'Lower dumbbells grazing shins until deep hamstring stretch',
          'Snap hips forward and squeeze glutes at top',
        ],
        apartmentTip: 'Strict hip hinge protects the spine and creates zero floor impact.',
      },
      {
        id: 'db-w-3',
        name: 'Dumbbell Standing Calf Raises',
        targetMuscles: ['Gastrocnemius', 'Soleus'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '20-40 lbs each',
        defaultSets: 4,
        defaultReps: '15-20',
        restSeconds: 60,
        cues: [
          'Hold dumbbells at sides, rise onto balls of feet',
          'Hold peak extension for 2 full seconds',
          'Lower slowly over 3 seconds for complete calf stretch',
        ],
        apartmentTip: 'Slow tempo prevents bouncy landings.',
      },
    ],
  },
  thursday: {
    focusTitle: 'Push Focus B + Dumbbell Shoulders & Incline',
    subtitle: 'Shoulder roundness & upper chest hypertrophy',
    exercises: [
      {
        id: 'db-th-1',
        name: 'Seated or Standing Arnold Press',
        targetMuscles: ['Anterior & Lateral Delts', 'Triceps'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '15-30 lbs each',
        defaultSets: 4,
        defaultReps: '8-10',
        restSeconds: 90,
        cues: [
          'Start with dumbbells at chin level, palms facing chest',
          'Rotate palms outward as you press overhead in a spiral arc',
          'Lower back down rotating smoothly to starting chin position',
        ],
        apartmentTip: 'Hits all 3 delt heads through smooth rotational mechanics.',
      },
      {
        id: 'db-th-2',
        name: 'Dumbbell Standing Lateral Raises',
        targetMuscles: ['Lateral Deltoids (Cap Width)'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '10-20 lbs each',
        defaultSets: 4,
        defaultReps: '12-15',
        restSeconds: 60,
        cues: [
          'Lean torso forward 10 degrees, slight bend in elbows',
          'Raise arms out to 9 o’clock and 3 o’clock to shoulder height',
          'Lead with elbows, pause 1 second at top',
        ],
        apartmentTip: 'Light weights with strict tempo deliver intense shoulder pump.',
      },
      {
        id: 'db-th-3',
        name: 'Dumbbell Skull Crushers (Floor Lying)',
        targetMuscles: ['Triceps Medial & Lateral Heads'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '12-25 lbs each',
        defaultSets: 3,
        defaultReps: '10-12',
        restSeconds: 60,
        cues: [
          'Lie on mat, arms perpendicular to ceiling',
          'Bend only at elbows, lowering dumbbells to sides of forehead',
          'Extend back to straight arms without moving upper arms',
        ],
        apartmentTip: 'Floor prevents elbow flare and gives immediate safe drop zone.',
      },
    ],
  },
  friday: {
    focusTitle: 'Pull Focus B + Dumbbell Upper Back & Arms',
    subtitle: 'Unilateral lat development & bicep thickness',
    exercises: [
      {
        id: 'db-f-1',
        name: 'Single-Arm Dumbbell Saw Rows',
        targetMuscles: ['Lats', 'Lower Traps', 'Biceps'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '30-55 lbs (single dumbbell)',
        defaultSets: 4,
        defaultReps: '8-10 per side',
        restSeconds: 75,
        cues: [
          'Place opposite hand and knee on a bench or chair for support',
          'Pull dumbbell in a backward arc toward hip bone',
          'Full stretch at bottom, strong lat squeeze at top',
        ],
        apartmentTip: 'Braced position takes all shear stress off lower back.',
      },
      {
        id: 'db-f-2',
        name: 'Standing Supinating Dumbbell Bicep Curls',
        targetMuscles: ['Biceps Brachii (Peak)'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '15-25 lbs each',
        defaultSets: 3,
        defaultReps: '10-12',
        restSeconds: 60,
        cues: [
          'Start neutral at bottom, rotate palms to ceiling halfway up',
          'Turn pinky fingers slightly outward at peak contraction',
          'Lower under strict control over 2.5 seconds',
        ],
        apartmentTip: 'Maximizes bicep peak activation without torso swing.',
      },
      {
        id: 'db-f-3',
        name: 'Dumbbell Rear Delt Reverse Flyes',
        targetMuscles: ['Rear Deltoids', 'Rhomboids'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '10-20 lbs each',
        defaultSets: 3,
        defaultReps: '12-15',
        restSeconds: 60,
        cues: [
          'Hinge hips back so chest is nearly parallel to floor',
          'Open arms wide like wings, squeezing back of shoulders',
          'Do not shrug traps toward ears',
        ],
        apartmentTip: 'Crucial for posture, shoulder health, and upper back balance.',
      },
    ],
  },
  saturday: {
    focusTitle: 'Legs & Core + Dumbbell Unilateral & Carries',
    subtitle: 'Single-leg balance, grip, and core stability',
    exercises: [
      {
        id: 'db-sa-1',
        name: 'Dumbbell Bulgarian Split Squats',
        targetMuscles: ['Quads', 'Glutes', 'Adductors'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '15-35 lbs each',
        defaultSets: 3,
        defaultReps: '8-10 per leg',
        restSeconds: 90,
        cues: [
          'Rear foot elevated on couch or bench, front foot 3 feet forward',
          'Drop rear knee down toward mat, keeping front shin nearly vertical',
          'Drive through front heel to return to top',
        ],
        apartmentTip: 'King of leg builders with light-to-moderate weights.',
      },
      {
        id: 'db-sa-2',
        name: 'Dumbbell Suitcase Carries (Core Bracing)',
        targetMuscles: ['Obliques', 'Quadratus Lumborum', 'Grip'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '30-50 lbs (single dumbbell)',
        defaultSets: 3,
        defaultReps: '45-60 seconds per side',
        restSeconds: 60,
        cues: [
          'Hold one heavy dumbbell in right hand, stand completely vertical',
          'Walk slowly across room without tilting toward or away from weight',
          'Switch hands and repeat',
        ],
        apartmentTip: 'Silent functional walking that builds bulletproof core stability.',
      },
      {
        id: 'db-sa-3',
        name: 'Dumbbell Sumo Deadlifts',
        targetMuscles: ['Glutes', 'Adductors', 'Hamstrings'],
        equipment: 'adjustable_dumbbells',
        suggestedWeightLbs: '35-60 lbs (single dumbbell)',
        defaultSets: 3,
        defaultReps: '10-12',
        restSeconds: 75,
        cues: [
          'Wide stance with toes flared at 45 degrees',
          'Hold dumbbell between legs with arms straight',
          'Drive floor away and squeeze glutes hard at top lockout',
        ],
        apartmentTip: 'Targets inner thighs and glutes with low spinal shear.',
      },
    ],
  },
  sunday: {
    focusTitle: 'Active Recovery & Rest Day',
    subtitle: 'Zero lifting — focus on pelvic floor & mobility',
    exercises: [],
  },
};

export const WEIGHTED_WORKOUT_SCHEDULE = FUTURE_DUMBBELL_SCHEDULE;

export const TREADMILL_PROTOCOLS: TreadmillProtocol[] = [
  {
    id: 'tm-warmup',
    title: '5-Minute Incline Walk Warmup',
    category: 'warmup',
    durationMinutes: 5,
    speedMph: '2.8 - 3.2 mph',
    inclinePct: '3% - 5%',
    description: 'Gentle pre-workout cardiovascular primer that lubricates knee joints and raises core temperature without fatigue.',
    cues: [
      'Natural arm swing — do not grip handrails tightly',
      'Walk tall with slight forward lean from ankles',
      'Breathe rhythmically in through nose, out through mouth',
    ],
    benefits: 'Warms up hips, knees, and ankles with zero pounding on the floor.',
  },
  {
    id: 'tm-zone2',
    title: 'Zone 2 Low-Impact Incline Walk',
    category: 'zone2_cardio',
    durationMinutes: 20,
    speedMph: '3.0 - 3.5 mph',
    inclinePct: '6% - 10%',
    description: 'The gold standard for sustainable fat oxidation, mitochondrial density, and aerobic conditioning without joint breakdown.',
    cues: [
      'Maintain conversational pace (nasal breathing or speaking in full sentences)',
      'Keep heels connecting with belt on each stride',
      'Let your glutes and calves power the incline climb',
    ],
    benefits: 'Burns ~150-250 kcal in 20 min, silent in apartments, zero joint impact.',
  },
  {
    id: 'tm-hiit',
    title: 'Incline Power Walk Interval Training',
    category: 'incline_hiit',
    durationMinutes: 15,
    speedMph: '3.5 - 4.0 mph (work) / 2.5 mph (recovery)',
    inclinePct: '10% - 12% (work) / 2% (recovery)',
    description: 'High-intensity interval conditioning using steep incline power walking instead of running, protecting joints while spiking VO2 max.',
    cues: [
      '1 minute WORK (10-12% incline @ 3.5-4.0 mph) / 1 minute RECOVERY (2% @ 2.5 mph)',
      'Repeat for 7 rounds + 1 min cooldown',
      'Drive arms vigorously to match leg drive',
    ],
    benefits: 'High caloric afterburn (EPOC) with zero ankle/knee impact from running.',
  },
  {
    id: 'tm-cooldown',
    title: '5-Minute Parasympathetic Flush Cooldown',
    category: 'cooldown',
    durationMinutes: 5,
    speedMph: '2.0 - 2.4 mph',
    inclinePct: '0%',
    description: 'Post-workout cooldown that returns heart rate to baseline, clears metabolic waste, and activates parasympathetic recovery.',
    cues: [
      'Flat belt, easy slow strolling pace',
      'Long, slow exhales to signal nervous system to start recovery',
      'Transition directly into your Daily Bladder Support routine',
    ],
    benefits: 'Accelerates muscle recovery and lowers cortisol post-exercise.',
  },
];
