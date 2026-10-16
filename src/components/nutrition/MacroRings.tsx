import React from 'react';
import { MacroGoals } from '../../types';

interface MacroRingsProps {
  goals: MacroGoals;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const MacroRings: React.FC<MacroRingsProps> = ({ goals, consumed }) => {
  const caloriesRemaining = goals.calories - consumed.calories;
  const calPercent = Math.min(100, Math.round((consumed.calories / goals.calories) * 100));

  const macros = [
    {
      label: 'Protein',
      consumed: consumed.protein,
      goal: goals.protein,
      unit: 'g',
      color: '#06B6D4', // Cyan
      bgColor: 'rgba(6, 182, 212, 0.12)',
      textColor: 'text-cyan-400',
    },
    {
      label: 'Carbs',
      consumed: consumed.carbs,
      goal: goals.carbs,
      unit: 'g',
      color: '#10B981', // Mint/Emerald
      bgColor: 'rgba(16, 185, 129, 0.12)',
      textColor: 'text-emerald-400',
    },
    {
      label: 'Fat',
      consumed: consumed.fat,
      goal: goals.fat,
      unit: 'g',
      color: '#8B5CF6', // Purple/Violet
      bgColor: 'rgba(139, 92, 246, 0.12)',
      textColor: 'text-purple-400',
    },
  ];

  // SVG ring circumference calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const calStrokeOffset = circumference - (calPercent / 100) * circumference;

  return (
    <div className="bg-dark-850/80 border border-dark-750 rounded-2xl p-4 sm:p-5 backdrop-blur shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Main Calorie Dial */}
        <div className="flex items-center gap-4">
          <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#1A2232"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress Arc */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#F59E0B"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={calStrokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-dark-400">
                Remaining
              </span>
              <span className="text-xl font-mono font-bold text-dark-50 tracking-tight">
                {caloriesRemaining}
              </span>
              <span className="text-[10px] font-mono text-amber-400">kcal</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-dark-50">{consumed.calories}</span>
              <span className="text-xs font-mono text-dark-400">/ {goals.calories} kcal</span>
            </div>
            <div className="w-full bg-dark-750 h-1.5 rounded-full overflow-hidden mt-1.5 max-w-[130px]">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (consumed.calories / goals.calories) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-dark-400 mt-1">
              {calPercent}% of daily budget
            </span>
          </div>
        </div>

        {/* 3 Macro Progress Bars */}
        <div className="w-full sm:w-auto flex-1 grid grid-cols-3 gap-2.5 sm:gap-3">
          {macros.map((m) => {
            const remaining = Math.max(0, m.goal - m.consumed);
            const pct = Math.min(100, Math.round((m.consumed / m.goal) * 100));

            return (
              <div
                key={m.label}
                className="bg-dark-900/60 border border-dark-750/70 rounded-xl p-2.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold ${m.textColor}`}>
                    {m.label}
                  </span>
                  <span className="text-[10px] font-mono text-dark-400">
                    {pct}%
                  </span>
                </div>

                <div className="my-1.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base font-mono font-bold text-dark-50">
                      {Math.round(m.consumed)}
                    </span>
                    <span className="text-[10px] font-mono text-dark-400">
                      /{m.goal}{m.unit}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-dark-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>

                <span className="text-[9.5px] font-mono text-dark-400 mt-1 truncate">
                  {remaining > 0 ? `${Math.round(remaining)}${m.unit} left` : 'Goal met'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
