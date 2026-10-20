// Daily Overactive Bladder Support & Pelvic Floor Routine
// Secondary routine that sits ON TOP of the regular workout plan (7 days/week, ~15 min)
// Kept separate so it never gets mixed up with the main calisthenics plan

export interface BladderExercise {
  id: string;
  name: string;
  durationOrReps: string;
  purpose: string;
  position: string;
  action: string;
  cues: string[];
  timerSeconds?: number;
  type: 'timed_breathing' | 'rapid_kegel' | 'endurance_kegel' | 'rep_hold' | 'timed_stretch' | 'timed_movement';
}

export const BLADDER_ROUTINE: BladderExercise[] = [
  {
    id: 'bladder-1',
    name: 'Diaphragmatic Breathing',
    durationOrReps: '2 Minutes',
    purpose: 'Downregulates the nervous system, releases pelvic floor tension, and coordinates breath with pelvic diaphragm.',
    position: 'Lie on your back with knees bent, feet flat on the mat. Place one hand on your chest and one on your belly.',
    action: 'Breathe in slowly through the nose over 4 seconds, feeling your belly and pelvic floor gently expand (hand on chest stays still). Breathe out gently through the mouth over 6 seconds as belly falls naturally.',
    cues: [
      'Never hold your breath',
      'Hand on chest remains quiet; hand on belly rises and falls',
      'Feel pelvic floor physically expand and relax on the inhale',
    ],
    timerSeconds: 120,
    type: 'timed_breathing',
  },
  {
    id: 'bladder-2',
    name: 'Quick-Flick Kegels',
    durationOrReps: '10 reps × 3 sets (30s rest)',
    purpose: 'Trains fast-twitch muscle fibers for emergency bladder inhibition and sudden urge suppression.',
    position: 'Lying comfortably on back or seated tall with neutral pelvis.',
    action: 'Squeeze the pelvic floor muscles quickly and firmly (like stopping the flow of urine or holding in gas), hold for 1 crisp second, then 100% fully release and relax for 1 second before the next flick.',
    cues: [
      'Squeeze fast, hold 1s, then fully let go',
      'Keep belly, thighs, and glutes completely relaxed',
      'The release is just as important as the squeeze',
      'Rest 30 seconds between sets of 10',
    ],
    type: 'rapid_kegel',
  },
  {
    id: 'bladder-3',
    name: 'Endurance Kegels',
    durationOrReps: '10 reps (10s hold, 10s release)',
    purpose: 'Builds slow-twitch endurance to support the bladder base throughout the day and increase holding capacity.',
    position: 'Lying on your back with knees bent and relaxed jaw.',
    action: 'Gently squeeze and lift the pelvic floor inward and upward. Hold steady for 10 seconds while breathing normally. Then fully release and rest for 10 seconds. (If 10s is too challenging initially, start with 5s holds and build up).',
    cues: [
      'Feel the contraction as an inward and upward LIFT, never bearing down',
      'Keep breathing steadily — do not hold your air',
      'Give yourself a full 10-second rest between each repetition',
    ],
    timerSeconds: 10,
    type: 'endurance_kegel',
  },
  {
    id: 'bladder-4',
    name: 'Bridge with Pelvic-Floor Lift',
    durationOrReps: '10 reps × 2 sets',
    purpose: 'Strengthens pelvic-gluteal co-activation and stabilizes pelvic floor under hip extension.',
    position: 'On your back, knees bent hip-width apart, arms resting flat at your sides.',
    action: 'Gently engage the pelvic floor, then press through your heels to lift your hips into a bridge. Hold for 5 seconds at the top with glutes and pelvic floor active. Lower down slowly and release fully.',
    cues: [
      'Engage pelvic floor first, then lift hips',
      'Hold 5 seconds at the top while breathing',
      'Lower down smoothly over 2 seconds, then relax pelvic floor at the bottom',
    ],
    type: 'rep_hold',
  },
  {
    id: 'bladder-5',
    name: 'Deep Squat Hold (Pelvic Drop)',
    durationOrReps: '1 Minute Hold',
    purpose: 'Lengthens and gently stretches hypertonic or tight pelvic floor muscles to prevent spasms and urge frequency.',
    position: 'Feet wider than hip-width, toes slightly flared outward. Lower down into a deep squat (hold a sturdy doorframe, bed frame, or pole for balance if needed).',
    action: 'Sink deep between your hips, keep heels down (or elevated on a folded towel), relax your pelvis, and breathe slowly into your lower belly for 60 seconds.',
    cues: [
      'Hold onto a doorframe for support so you can relax 100%',
      'Do NOT clench or squeeze — allow the pelvic floor to release and open',
      'Slow, rhythmic deep belly breaths',
    ],
    timerSeconds: 60,
    type: 'timed_stretch',
  },
  {
    id: 'bladder-6',
    name: 'Standing Marches with Pelvic Bracing',
    durationOrReps: '1 Minute',
    purpose: 'Transfers pelvic floor control into upright functional movement and walking.',
    position: 'Stand tall with feet hip-width apart and chest open.',
    action: 'Before lifting each knee, gently engage your pelvic floor and lower deep abdominal wall (transverse abdominis). Lift one knee to hip height slowly, lower with control, and alternate sides smoothly for 1 minute.',
    cues: [
      'Pre-engage pelvic floor gently before the knee lifts',
      'Move slowly and deliberately — not for cardio speed',
      'Maintain an upright posture without leaning side to side',
    ],
    timerSeconds: 60,
    type: 'timed_movement',
  },
];

export const BLADDER_HABITS = [
  {
    title: 'Timed Voids (Bladder Retraining)',
    description:
      'Try to urinate on a predictable schedule (e.g. every 2 to 3 hours) rather than reacting to every sudden, small urge. Gradually spacing voids trains the bladder wall to comfortably tolerate normal volumes.',
    icon: 'Clock',
  },
  {
    title: 'Watch Common Bladder Irritants',
    description:
      'Caffeine (including morning matcha latte and G FUEL), carbonated sodas/seltzers, alcohol, artificial sweeteners, and highly acidic or spicy foods can irritate the bladder lining. Notice what affects your personal frequency rather than cutting everything at once.',
    icon: 'AlertCircle',
  },
  {
    title: 'Avoid "Just in Case" Urination',
    description:
      'Peeing when you do not actually feel a full bladder can habituate the bladder stretch receptors to trigger false urgency at low fluid volumes. Wait for a genuine urge unless traveling for long stretches without a restroom.',
    icon: 'ShieldAlert',
  },
  {
    title: 'Steady, Even Hydration',
    description:
      'Sip water steadily throughout the daytime rather than gulping massive amounts all at once. Taper fluids 2 hours before bedtime if nighttime awakenings (nocturia) are an issue.',
    icon: 'Droplets',
  },
  {
    title: 'Never Strain or Push',
    description:
      'Relax completely and take your time on the toilet. Straining or bearing down forces unnecessary pressure onto the pelvic floor and can worsen frequency and pelvic tension.',
    icon: 'HeartHandshake',
  },
];

export const BLADDER_WORTH_KNOWING = [
  'Lift vs. Bearing Down: You should always feel the pelvic contraction as an upward and inward "lift", never as bearing down or pushing. If you feel downward pressure, stop, reset, and use a 30% lighter squeeze.',
  'Isolated Effort: Your abdominal wall, inner thighs, and glutes should stay fairly relaxed during Kegels. The movement is subtle and internal, not a whole-body clench.',
  'Consistency Beats Intensity: A relaxed 15 minutes every single day produces far greater neurological and structural adaptation than one intense session a week. Keep the daily habit.',
  'Gradual Progression: Allow 4 to 8 weeks of consistent daily practice to experience noticeable improvements in bladder holding comfort.',
  'Medical Disclaimer: This is an evidence-based physical conditioning routine for pelvic floor wellness, not formal medical advice. If you ever experience burning, sharp pain, hematuria (blood in urine), or fever, consult a healthcare provider.',
];
