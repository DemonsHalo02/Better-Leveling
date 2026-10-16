// Algorithmic engines inspired by MacroFactor (USA Standard Units: lbs, calories, grams):
// 1. Exponential Moving Average (EMA) Weight Smoothing
// 2. Dynamic Metabolic Expenditure (TDEE) Calculation (3,500 kcal per lb body tissue)
// 3. Adaptive Caloric & Macro Target Calculation (0.9-1.0g protein per lb of bodyweight)

import { WeightEntry, WeightAnalyticsPoint, ExpenditureReport, GoalType, MacroGoals } from '../types';

/**
 * Calculates smoothed trend weight using Exponential Moving Average (EMA).
 * Alpha (0.12) is optimized to filter acute daily water/sodium/glycogen noise
 * without lagging behind true fat loss or muscle gain.
 */
export function calculateWeightTrend(
  entries: WeightEntry[],
  alpha: number = 0.12
): WeightAnalyticsPoint[] {
  if (!entries || entries.length === 0) return [];

  // Sort chronologically ascending
  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const results: WeightAnalyticsPoint[] = [];
  let currentTrend = sorted[0].weightLbs;

  for (let i = 0; i < sorted.length; i++) {
    const entry = sorted[i];
    // First point initializes the trend
    if (i === 0) {
      currentTrend = entry.weightLbs;
    } else {
      currentTrend = alpha * entry.weightLbs + (1 - alpha) * currentTrend;
    }

    results.push({
      date: entry.date,
      rawWeight: Number(entry.weightLbs.toFixed(1)),
      trendWeight: Number(currentTrend.toFixed(1)),
    });
  }

  return results;
}

/**
 * Calculates true Total Daily Energy Expenditure (TDEE).
 * 1 lb of human tissue delta ~ 3,500 kcal.
 * TDEE = Daily Intake - (Daily Weight Trend Delta in lbs * 3500)
 */
export function calculateSmartExpenditure(
  weightPoints: WeightAnalyticsPoint[],
  dailyCaloriesMap: Record<string, number>, // date -> calories
  windowDays: number = 14
): ExpenditureReport {
  // Fallback defaults for new users
  const defaultReport: ExpenditureReport = {
    estimatedTDEE: 2200,
    rollingAverageIntake: 2000,
    weeklyWeightRateLbs: 0,
    confidenceScore: 'low',
  };

  if (!weightPoints || weightPoints.length < 3) {
    return defaultReport;
  }

  // Take the most recent entries within windowDays
  const recentWeights = weightPoints.slice(-windowDays);
  if (recentWeights.length < 3) return defaultReport;

  const firstPoint = recentWeights[0];
  const lastPoint = recentWeights[recentWeights.length - 1];

  const firstDate = new Date(firstPoint.date).getTime();
  const lastDate = new Date(lastPoint.date).getTime();
  const daysDiff = Math.max(1, (lastDate - firstDate) / (1000 * 60 * 60 * 24));

  // Trend weight change in lbs
  const trendDeltaLbs = lastPoint.trendWeight - firstPoint.trendWeight;
  const weeklyRateLbs = (trendDeltaLbs / daysDiff) * 7;

  // Average caloric intake across the logged days in the window
  let totalIntake = 0;
  let loggedDaysCount = 0;

  for (const pt of recentWeights) {
    const intake = dailyCaloriesMap[pt.date];
    if (intake !== undefined && intake > 400) {
      totalIntake += intake;
      loggedDaysCount++;
    }
  }

  const averageIntake = loggedDaysCount > 0 ? totalIntake / loggedDaysCount : 2000;

  // Daily energy delta: deltaLbs / days * 3500 kcal/lb
  const dailySurplusOrDeficitKcal = (trendDeltaLbs / daysDiff) * 3500;

  // TDEE = Intake - Surplus (or Intake + Deficit)
  let calculatedTDEE = Math.round(averageIntake - dailySurplusOrDeficitKcal);

  // Biological sanity guardrails (1200 - 4500 kcal)
  calculatedTDEE = Math.min(4500, Math.max(1200, calculatedTDEE));

  const confidenceScore =
    recentWeights.length >= 14 && loggedDaysCount >= 10
      ? 'high'
      : recentWeights.length >= 7 && loggedDaysCount >= 4
      ? 'moderate'
      : 'low';

  return {
    estimatedTDEE: calculatedTDEE,
    rollingAverageIntake: Math.round(averageIntake),
    weeklyWeightRateLbs: Number(weeklyRateLbs.toFixed(1)),
    confidenceScore,
  };
}

/**
 * Calculates adaptive macro targets based on goal, weight in lbs, and TDEE.
 */
export function calculateMacroTargets(
  weightLbs: number,
  tdee: number,
  goal: GoalType,
  targetWeeklyRateLbs: number = 1.0 // Standard US fat loss rate: ~1 lb/week
): MacroGoals {
  let targetCalories = tdee;

  if (goal === 'fat_loss') {
    // 3,500 kcal per lb / 7 days = 500 kcal deficit per 1 lb/week loss
    const dailyDeficit = (targetWeeklyRateLbs * 3500) / 7;
    targetCalories = Math.max(1300, Math.round(tdee - dailyDeficit));
  } else if (goal === 'muscle_gain') {
    // Conservative lean surplus (approx +250 kcal/day for lean tissue)
    const dailySurplus = (targetWeeklyRateLbs * 3500) / 7;
    targetCalories = Math.round(tdee + Math.min(400, dailySurplus));
  } else {
    // Maintenance
    targetCalories = tdee;
  }

  // Protein: High protein optimal for calisthenics & muscle preservation (0.9 - 1.0g per lb of bodyweight)
  const proteinGrams = Math.round(weightLbs * 0.95);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% of total caloric intake
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: Remainder of calories (fuel for workouts)
  const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatGrams * 9));
  const carbGrams = Math.round(remainingCalories / 4);

  return {
    calories: targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
  };
}
