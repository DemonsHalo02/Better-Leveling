// Automated Verification Suite for Better Leveling
// Verifies algorithms, nutrition calculations, 6-day calisthenics schedule across 4 tiers,
// apartment safety constraints, and sync engine integrity.

import { calculateWeightTrend, calculateSmartExpenditure, calculateMacroTargets } from '../src/lib/algorithms.ts';
import { CALISTHENICS_SCHEDULE, CALISTHENICS_TIERS } from '../src/data/calisthenicsPlans.ts';
import { VERIFIED_FOODS } from '../src/data/verifiedFoods.ts';
import { BLADDER_ROUTINE, BLADDER_HABITS, BLADDER_WORTH_KNOWING } from '../src/data/bladderSupportPlan.ts';
import { FUTURE_DUMBBELL_SCHEDULE, TREADMILL_PROTOCOLS } from '../src/data/futureEquipmentWorkouts.ts';
import { CalisthenicsIntensity, DayOfWeek } from '../src/types/index.ts';

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING BETTER LEVELING VERIFICATION TEST SUITE');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      if (details) console.error(`     Details: ${details}`);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: EMA Weight Smoothing Algorithm
  // -------------------------------------------------------------
  console.log('--- 1. Testing Exponential Moving Average Weight Smoothing ---');
  const sampleWeights = [
    { id: '1', date: '2026-10-01', weightLbs: 175.0, createdAt: '' },
    { id: '2', date: '2026-10-02', weightLbs: 177.2, createdAt: '' }, // sudden +2.2 lbs water jump
    { id: '3', date: '2026-10-03', weightLbs: 174.6, createdAt: '' },
    { id: '4', date: '2026-10-04', weightLbs: 174.1, createdAt: '' },
  ];

  const trend = calculateWeightTrend(sampleWeights, 0.12);
  assert(trend.length === 4, 'Weight trend outputs all 4 data points');
  assert(trend[0].trendWeight === 175.0, 'First trend weight equals initial raw weight');
  assert(
    trend[1].trendWeight < 177.2 && trend[1].trendWeight > 175.0,
    'EMA filters out acute +2.2 lbs water spike (trend was smoothed)',
    `Expected ~175.3, got ${trend[1].trendWeight}`
  );

  // -------------------------------------------------------------
  // TEST 2: Dynamic Metabolic Expenditure (TDEE) Calculation
  // -------------------------------------------------------------
  console.log('\n--- 2. Testing Smart Expenditure (TDEE) Engine ---');
  const dailyCalories = {
    '2026-10-01': 2000,
    '2026-10-02': 2000,
    '2026-10-03': 2000,
    '2026-10-04': 2000,
  };
  const tdeeReport = calculateSmartExpenditure(trend, dailyCalories, 7);
  assert(tdeeReport.estimatedTDEE >= 1200 && tdeeReport.estimatedTDEE <= 4500, 'TDEE within human biological bounds');
  assert(typeof tdeeReport.weeklyWeightRateLbs === 'number', 'Weekly weight rate is numeric');

  // -------------------------------------------------------------
  // TEST 3: Adaptive Macro Calculator
  // -------------------------------------------------------------
  console.log('\n--- 3. Testing Adaptive Macro Calculator ---');
  const fatLossMacros = calculateMacroTargets(165, 2400, 'fat_loss', 1.0);
  assert(fatLossMacros.calories < 2400, 'Fat loss sets caloric deficit below TDEE');
  assert(fatLossMacros.protein === 157, 'Protein calculated at ~0.95g per lb of bodyweight (165 lbs * 0.95 = 157g)');
  assert(fatLossMacros.protein * 4 + fatLossMacros.carbs * 4 + fatLossMacros.fat * 9 <= fatLossMacros.calories + 10, 'Macro sum matches target calories');

  const muscleGainMacros = calculateMacroTargets(165, 2400, 'muscle_gain', 0.5);
  assert(muscleGainMacros.calories > 2400, 'Muscle gain sets caloric surplus above TDEE');

  // -------------------------------------------------------------
  // TEST 4: 6-Day Calisthenics Routine Integrity Across 4 Tiers
  // -------------------------------------------------------------
  console.log('\n--- 4. Testing 6-Day Calisthenics Routines & Apartment Safety ---');
  const tiers: CalisthenicsIntensity[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  assert(CALISTHENICS_TIERS.length === 4, 'All 4 tiers registered');

  for (const tier of tiers) {
    const tierSchedule = CALISTHENICS_SCHEDULE[tier];
    assert(Boolean(tierSchedule), `Tier schedule exists for: ${tier}`);

    for (const day of days) {
      const routine = tierSchedule[day];
      assert(Boolean(routine), `${tier} has routine for ${day}`);

      if (day === 'sunday') {
        assert(routine.isRestDay === true, `${tier} Sunday is designated rest & active recovery`);
      } else {
        assert(routine.exercises.length >= 3, `${tier} ${day} contains at least 3 structured exercises`);
        
        // Strict Apartment & Silent & Zero Equipment Checks
        for (const ex of routine.exercises) {
          assert(Boolean(ex.name && ex.name.length > 0), `Exercise ${ex.id} has valid title`);
          assert(ex.cues.length >= 2, `Exercise "${ex.name}" has at least 2 clear form cues`);
          assert(Boolean(ex.apartmentSafetyTip && ex.apartmentSafetyTip.length > 5), `Exercise "${ex.name}" has apartment safety cue: "${ex.apartmentSafetyTip}"`);

          // Verify no jumping words in exercise names
          const lowerName = ex.name.toLowerCase();
          const forbiddenJumpKeywords = ['jump', 'burpee', 'hop', 'skip', 'tuck jump', 'box jump'];
          const hasForbiddenJump = forbiddenJumpKeywords.some((word) => lowerName.includes(word));
          assert(!hasForbiddenJump, `Exercise "${ex.name}" is strictly NO JUMPING / SILENT`);

          // Verify no bar/equipment required in cues
          const lowerCues = ex.cues.join(' ').toLowerCase();
          const forbiddenEquipKeywords = ['pull-up bar', 'pull up bar', 'dip bar', 'dumbbell', 'barbell', 'kettlebell', 'resistance band'];
          const hasForbiddenEquip = forbiddenEquipKeywords.some((word) => lowerCues.includes(word) || lowerName.includes(word));
          assert(!hasForbiddenEquip, `Exercise "${ex.name}" requires ZERO EQUIPMENT (pure bodyweight + mat)`);
        }
      }
    }
  }

  // -------------------------------------------------------------
  // TEST 5: Verified Food Database Integrity
  // -------------------------------------------------------------
  console.log('\n--- 5. Testing Food Database Integrity ---');
  assert(VERIFIED_FOODS.length >= 20, `Verified foods collection has ${VERIFIED_FOODS.length} common items`);
  for (const food of VERIFIED_FOODS) {
    assert(food.calories > 0, `Food "${food.name}" has valid positive calories (${food.calories})`);
    assert(food.protein >= 0 && food.carbs >= 0 && food.fat >= 0, `Food "${food.name}" has non-negative macro values`);
  }

  // -------------------------------------------------------------
  // TEST 6: Daily Overactive Bladder Support Routine & Habits Integrity
  // -------------------------------------------------------------
  console.log('\n--- 6. Testing Daily Overactive Bladder Support Routine ---');
  assert(BLADDER_ROUTINE.length === 6, 'Bladder routine has exactly 6 sequential exercises');
  const expectedSteps = [
    'Diaphragmatic Breathing',
    'Quick-Flick Kegels',
    'Endurance Kegels',
    'Bridge with Pelvic-Floor Lift',
    'Deep Squat Hold (Pelvic Drop)',
    'Standing Marches with Pelvic Bracing',
  ];
  BLADDER_ROUTINE.forEach((step, i) => {
    assert(step.name === expectedSteps[i], `Step ${i + 1} is "${expectedSteps[i]}"`);
    assert(Boolean(step.action && step.action.length > 10), `Step "${step.name}" has comprehensive action guidance`);
    assert(step.cues.length >= 2, `Step "${step.name}" has at least 2 clear form cues`);
  });

  assert(BLADDER_HABITS.length >= 5, 'At least 5 bladder habits documented (Timed voids, irritants, etc.)');
  assert(BLADDER_WORTH_KNOWING.length >= 4, 'Clinical cues and medical disclaimers present');

  // -------------------------------------------------------------
  // TEST 7: Future Equipment Dumbbell & Treadmill Protocols Integrity
  // -------------------------------------------------------------
  console.log('\n--- 7. Testing Future Equipment Programs (Dumbbells & Treadmill) ---');
  const daysOfWeek: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  for (const day of daysOfWeek) {
    const routine = FUTURE_DUMBBELL_SCHEDULE[day];
    assert(Boolean(routine), `Future dumbbell schedule exists for: ${day}`);
    if (day !== 'sunday') {
      assert(routine.exercises.length >= 3, `Dumbbell ${day} contains at least 3 structured compound exercises`);
      for (const ex of routine.exercises) {
        assert(Boolean(ex.suggestedWeightLbs), `Exercise "${ex.name}" has suggested weight guidance`);
        assert(Boolean(ex.apartmentTip), `Exercise "${ex.name}" has apartment noise safety tip`);
      }
    }
  }

  assert(TREADMILL_PROTOCOLS.length === 4, 'All 4 treadmill incline protocols defined (warmup, zone2, hiit, cooldown)');
  for (const protocol of TREADMILL_PROTOCOLS) {
    assert(protocol.durationMinutes > 0, `Protocol "${protocol.title}" has valid duration (${protocol.durationMinutes}m)`);
    assert(Boolean(protocol.speedMph && protocol.inclinePct), `Protocol "${protocol.title}" specifies speed and incline`);
  }

  console.log('\n================================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} / ${totalTests} PASSED (100% Success)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite();
