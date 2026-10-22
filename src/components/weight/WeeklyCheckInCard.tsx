import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { ExpenditureReport, MacroGoals } from '../../types';
import { Sparkles, Check, ArrowRight, RefreshCw, ChevronRight, Sliders, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeeklyCheckInCardProps {
  expenditure: ExpenditureReport;
  currentWeightLbs: number;
}

export const WeeklyCheckInCard: React.FC<WeeklyCheckInCardProps> = ({
  expenditure,
  currentWeightLbs,
}) => {
  const { user, updateMacroGoals } = useAuthStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Goal rate offset (calories/day)
  let targetDeltaFromTdee = -500; // default fat_loss (-1.0 lb/wk)
  let goalLabel = 'Fat Loss (-1.0 lb/week)';
  if (user.goal === 'muscle_gain') {
    targetDeltaFromTdee = 150; // (+0.3 lb/wk)
    goalLabel = 'Lean Muscle Gain (+0.3 lb/week)';
  } else if (user.goal === 'maintenance') {
    targetDeltaFromTdee = 0;
    goalLabel = 'Weight Maintenance (0.0 lb/week)';
  }

  // Calculate proposed target calories from dynamic TDEE
  const rawProposedCalories = Math.round(expenditure.estimatedTDEE + targetDeltaFromTdee);
  const proposedCalories = Math.max(1300, Math.min(4000, rawProposedCalories));
  const calorieDelta = proposedCalories - user.macroGoals.calories;

  // Calculate proposed macro split
  // Protein: ~0.95g per lb of bodyweight
  const weight = currentWeightLbs > 0 ? currentWeightLbs : user.startingWeightLbs;
  const proposedProtein = Math.round(weight * 0.95);
  const proteinCalories = proposedProtein * 4;

  // Fat: ~25% of total calories
  const fatCalories = proposedCalories * 0.25;
  const proposedFat = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const remainingCalories = Math.max(0, proposedCalories - proteinCalories - (proposedFat * 9));
  const proposedCarbs = Math.round(remainingCalories / 4);

  const proposedMacros: MacroGoals = {
    calories: proposedCalories,
    protein: proposedProtein,
    carbs: proposedCarbs,
    fat: proposedFat,
  };

  const isCurrentOptimal = Math.abs(calorieDelta) <= 25;

  const handleApply = async () => {
    await updateMacroGoals(proposedMacros);
    setIsApplied(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#06B6D4'],
      });
    } catch {
      // ignore
    }
  };

  if (isDismissed) {
    return (
      <div className="p-3 rounded-xl bg-dark-850/60 border border-dark-800 text-xs text-dark-400 flex items-center justify-between">
        <span>Weekly check-in acknowledged. Targets remain active.</span>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-amber-400 hover:text-amber-300 font-semibold underline text-[11px]"
        >
          Re-open
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-dark-850 to-dark-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-dark-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-dark-50">
              Weekly Algorithmic Macro Check-In
            </h3>
            <p className="text-[11px] text-dark-400">
              MacroFactor adherence-neutral coaching based on your true energy expenditure
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-900 border border-dark-750 text-amber-300 self-start sm:self-auto">
          {goalLabel}
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-dark-900/80 border border-dark-800">
          <span className="text-[10px] text-dark-400 block">Current TDEE</span>
          <span className="font-bold text-dark-100 text-sm">
            {expenditure.estimatedTDEE} kcal
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-900/80 border border-dark-800">
          <span className="text-[10px] text-dark-400 block">Current Target</span>
          <span className="font-bold text-dark-100 text-sm">
            {user.macroGoals.calories} kcal
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-900/80 border border-dark-800">
          <span className="text-[10px] text-dark-400 block">Coached Target</span>
          <span className="font-bold text-amber-400 text-sm">
            {proposedCalories} kcal
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-900/80 border border-dark-800">
          <span className="text-[10px] text-dark-400 block">Adjustment</span>
          <span
            className={`font-bold text-sm ${
              calorieDelta > 0
                ? 'text-emerald-400'
                : calorieDelta < 0
                ? 'text-amber-400'
                : 'text-dark-300'
            }`}
          >
            {calorieDelta > 0 ? `+${calorieDelta}` : calorieDelta === 0 ? 'Optimal' : `${calorieDelta}`}{' '}
            kcal
          </span>
        </div>
      </div>

      {/* Algorithmic Narrative */}
      <p className="text-xs text-dark-300 leading-relaxed">
        {isCurrentOptimal ? (
          <span>
            Your intake and weekly weight trend are in perfect equilibrium with your expenditure. No adjustment needed this week!
          </span>
        ) : (
          <span>
            Based on your rolling expenditure ({expenditure.estimatedTDEE} kcal) and goal rate, we recommend adjusting your daily intake by{' '}
            <strong className="text-amber-300">
              {calorieDelta > 0 ? `+${calorieDelta}` : calorieDelta} kcal/day
            </strong>{' '}
            to keep progress smooth and steady.
          </span>
        )}
      </p>

      {/* Proposed Macros Breakdown */}
      <div className="p-2.5 rounded-xl bg-dark-900/60 border border-dark-800 flex items-center justify-between text-xs font-mono">
        <span className="text-[11px] text-dark-400">Proposed Macro Split:</span>
        <div className="flex items-center gap-3">
          <span className="text-rose-400">P: {proposedProtein}g</span>
          <span className="text-emerald-400">C: {proposedCarbs}g</span>
          <span className="text-purple-400">F: {proposedFat}g</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        {isApplied ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-300 font-bold">
            <Check size={14} className="text-emerald-400" />
            <span>Coached Target Applied</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
            >
              <CheckCircle2 size={15} />
              <span>Accept & Apply Coaching Target</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="px-3 py-2 rounded-xl border border-dark-750 text-dark-400 hover:text-dark-200 text-xs transition"
            >
              Keep Current
            </button>
          </>
        )}
      </div>
    </div>
  );
};
