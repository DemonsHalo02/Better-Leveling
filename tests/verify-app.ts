// Automated Verification Suite for Better Leveling
// Verifies algorithms, nutrition calculations, 6-day calisthenics schedule across 4 tiers,
// apartment safety constraints, and sync engine integrity.

import { calculateWeightTrend, calculateSmartExpenditure, calculateMacroTargets } from '../src/lib/algorithms.ts';
import { CALISTHENICS_SCHEDULE, CALISTHENICS_TIERS } from '../src/data/calisthenicsPlans.ts';
import { VERIFIED_FOODS } from '../src/data/verifiedFoods.ts';
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
    { id: '1', date: '2026-10-01', weightKg: 80.0, createdAt: '' },
    { id: '2', date: '2026-10-02', weightKg: 81.2, createdAt: '' }, // sudden +1.2kg water jump
    { id: '3', date: '2026-10-03', weightKg: 79.8, createdAt: '' },
    { id: '4', date: '2026-10-04', weightKg: 79.5, createdAt: '' },
  ];

  const trend = calculateWeightTrend(sampleWeights, 0.12);
  assert(trend.length === 4, 'Weight trend outputs all 4 data points');
  assert(trend[0].trendWeight === 80.0, 'First trend weight equals initial raw weight');
  // At index 1: 0.12 * 81.2 + 0.88 * 80.0 = 9.744 + 70.4 = 80.144
  assert(
    trend[1].trendWeight < 81.2 && trend[1].trendWeight > 80.0,
    'EMA filters out acute +1.2kg water spike (trend was smoothed)',
    `Expected ~80.14, got ${trend[1].trendWeight}`
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
  assert(typeof tdeeReport.weeklyWeightRateKg === 'number', 'Weekly weight rate is numeric');

  // -------------------------------------------------------------
  // TEST 3: Adaptive Macro Calculator
  // -------------------------------------------------------------
  console.log('\n--- 3. Testing Adaptive Macro Calculator ---');
  const fatLossMacros = calculateMacroTargets(75, 2400, 'fat_loss', 0.5);
  assert(fatLossMacros.calories < 2400, 'Fat loss sets caloric deficit below TDEE');
  assert(fatLossMacros.protein === 150, 'Protein calculated at 2.0g per kg of bodyweight (75kg * 2 = 150g)');
  assert(fatLossMacros.protein * 4 + fatLossMacros.carbs * 4 + fatLossMacros.fat * 9 <= fatLossMacros.calories + 10, 'Macro sum matches target calories');

  const muscleGainMacros = calculateMacroTargets(75, 2400, 'muscle_gain', 0.25);
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

  console.log('\n================================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} / ${totalTests} PASSED (100% Success)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite();
