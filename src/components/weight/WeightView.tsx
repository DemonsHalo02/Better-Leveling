import React, { useState } from 'react';
import { useWeightStore } from '../../store/useWeightStore';
import { useNutritionStore, getTodayDateString } from '../../store/useNutritionStore';
import { useAuthStore } from '../../store/useAuthStore';
import {
  TrendingUp,
  Scale,
  Zap,
  Plus,
  Trash2,
  Calendar,
  CheckCircle,
  Activity,
} from 'lucide-react';

export const WeightView: React.FC = () => {
  const { user } = useAuthStore();
  const { entries, addWeightEntry, deleteWeightEntry, getWeightTrend, getLatestWeight, getExpenditureReport } =
    useWeightStore();
  const { getAllDailyIntakeMap } = useNutritionStore();

  const [inputWeight, setInputWeight] = useState('');
  const [inputDate, setInputDate] = useState(getTodayDateString());
  const [inputNote, setInputNote] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);

  const trendPoints = getWeightTrend();
  const latest = getLatestWeight();
  const dailyCaloriesMap = getAllDailyIntakeMap();
  const expenditure = getExpenditureReport(dailyCaloriesMap);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(inputWeight);
    if (!w || isNaN(w)) return;

    addWeightEntry(w, inputDate, inputNote || undefined);
    setInputWeight('');
    setInputNote('');
    setShowLogForm(false);
  };

  // SVG Chart Calculations
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  const usableWidth = chartWidth - padding.left - padding.right;
  const usableHeight = chartHeight - padding.top - padding.bottom;

  let minWeight = 60;
  let maxWeight = 90;

  if (trendPoints.length > 0) {
    const allWeights = trendPoints.flatMap((p) => [p.rawWeight, p.trendWeight]);
    minWeight = Math.floor(Math.min(...allWeights) - 1);
    maxWeight = Math.ceil(Math.max(...allWeights) + 1);
  }

  const weightRange = Math.max(1, maxWeight - minWeight);

  const getX = (index: number) => {
    if (trendPoints.length <= 1) return padding.left + usableWidth / 2;
    return padding.left + (index / (trendPoints.length - 1)) * usableWidth;
  };

  const getY = (weight: number) => {
    return padding.top + usableHeight - ((weight - minWeight) / weightRange) * usableHeight;
  };

  // SVG path for smoothed trend line
  const trendPath = trendPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.trendWeight)}`)
    .join(' ');

  // SVG path for raw weight line
  const rawPath = trendPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.rawWeight)}`)
    .join(' ');

  return (
    <div className="space-y-5 pb-24">
      {/* Overview Cards: Current Weight vs Smoothed Trend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-dark-400">
            <Scale size={14} className="text-cyan-400" />
            <span>Today's Weight</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-dark-50">
              {latest ? latest.raw : '--'}
            </span>
            <span className="text-xs font-mono text-dark-400">kg</span>
          </div>
          <span className="text-[10px] text-dark-500 font-mono mt-1 block">
            {latest?.date || 'No weigh-in yet'}
          </span>
        </div>

        <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-dark-400">
            <TrendingUp size={14} className="text-amber-400" />
            <span>Smoothed Trend</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {latest ? latest.trend : '--'}
            </span>
            <span className="text-xs font-mono text-dark-400">kg</span>
          </div>
          <span className="text-[10px] text-dark-400 mt-1 block">
            Filters daily water & sodium
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-dark-850 border border-dark-750 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-dark-400">
            <Activity size={14} className="text-emerald-400" />
            <span>Weekly Change</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className={`text-2xl font-mono font-bold ${
              expenditure.weeklyWeightRateKg < 0 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {expenditure.weeklyWeightRateKg > 0 ? '+' : ''}
              {expenditure.weeklyWeightRateKg}
            </span>
            <span className="text-xs font-mono text-dark-400">kg/wk</span>
          </div>
          <span className="text-[10px] text-dark-400 mt-1 block capitalize">
            Goal: {user.goal.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Smart Expenditure (TDEE) Card */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-dark-50">Smart Energy Expenditure (TDEE)</h3>
              <p className="text-xs text-dark-400">
                Calculated from caloric intake vs. true physiological weight change
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-dark-800 text-dark-300">
            <span>Confidence:</span>
            <span className={`capitalize font-bold ${
              expenditure.confidenceScore === 'high'
                ? 'text-emerald-400'
                : expenditure.confidenceScore === 'moderate'
                ? 'text-amber-400'
                : 'text-dark-400'
            }`}>
              {expenditure.confidenceScore}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-center">
          <div className="p-3 rounded-xl bg-dark-900 border border-dark-800">
            <span className="text-[11px] text-dark-400 block">Estimated TDEE</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="text-2xl font-mono font-bold text-amber-400">
                {expenditure.estimatedTDEE}
              </span>
              <span className="text-[11px] font-mono text-dark-400">kcal/day</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-900 border border-dark-800">
            <span className="text-[11px] text-dark-400 block">Avg Daily Intake</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="text-2xl font-mono font-bold text-cyan-400">
                {expenditure.rollingAverageIntake}
              </span>
              <span className="text-[11px] font-mono text-dark-400">kcal</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-dark-900 border border-dark-800">
            <span className="text-[11px] text-dark-400 block">Daily Budget</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {user.macroGoals.calories}
              </span>
              <span className="text-[11px] font-mono text-dark-400">kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exponential Moving Average Trend Chart */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div>
            <h3 className="font-bold text-sm text-dark-50">Weight Trend Line</h3>
            <p className="text-xs text-dark-400">
              Yellow = Smoothed Trend • Grey = Daily Scale Readings
            </p>
          </div>

          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition shadow-sm"
          >
            <Plus size={14} />
            <span>Log Weight</span>
          </button>
        </div>

        {/* Inline Weight Form */}
        {showLogForm && (
          <form onSubmit={handleSubmit} className="mt-4 p-3 rounded-xl bg-dark-900 border border-dark-750 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-dark-400 mb-1">Date</label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-dark-50 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-dark-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 74.5"
                  required
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  className="w-full bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-dark-50 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-dark-400 mb-1">Note (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Morning fasted"
                  value={inputNote}
                  onChange={(e) => setInputNote(e.target.value)}
                  className="w-full bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-dark-50 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLogForm(false)}
                className="px-3 py-1 rounded-lg border border-dark-750 text-dark-400 hover:text-dark-200 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs"
              >
                Save Weigh-in
              </button>
            </div>
          </form>
        )}

        {/* SVG Chart Canvas */}
        <div className="mt-4 overflow-x-auto">
          {trendPoints.length === 0 ? (
            <div className="py-12 text-center text-xs text-dark-500">
              No weight data logged yet. Click <strong>Log Weight</strong> above to start tracking.
            </div>
          ) : (
            <div className="w-full min-w-[360px]">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                  const yVal = padding.top + usableHeight * (1 - pct);
                  const wVal = (minWeight + weightRange * pct).toFixed(1);
                  return (
                    <g key={idx}>
                      <line
                        x1={padding.left}
                        y1={yVal}
                        x2={chartWidth - padding.right}
                        y2={yVal}
                        stroke="#1C2436"
                        strokeDasharray="2 3"
                      />
                      <text
                        x={padding.left - 6}
                        y={yVal + 3}
                        fontSize="9"
                        fill="#5A6B88"
                        textAnchor="end"
                        className="font-mono"
                      >
                        {wVal}
                      </text>
                    </g>
                  );
                })}

                {/* Raw Weight Dotted Line */}
                <path
                  d={rawPath}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />

                {/* Smoothed Trend Solid Glow Line */}
                <path
                  d={trendPath}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
                />

                {/* Points */}
                {trendPoints.map((p, i) => (
                  <g key={p.date}>
                    <circle
                      cx={getX(i)}
                      cy={getY(p.rawWeight)}
                      r="2.5"
                      fill="#94A3B8"
                    />
                    <circle
                      cx={getX(i)}
                      cy={getY(p.trendWeight)}
                      r="3.5"
                      fill="#F59E0B"
                      stroke="#0B0E14"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 shadow-sm">
        <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-dark-400 mb-3">
          Weigh-in History
        </h4>
        <div className="divide-y divide-dark-800">
          {entries.map((entry) => (
            <div key={entry.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-dark-500" />
                <div>
                  <span className="font-mono text-dark-200">{entry.date}</span>
                  {entry.note && (
                    <span className="text-[11px] text-dark-400 ml-2">({entry.note})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-dark-50">{entry.weightKg} kg</span>
                <button
                  onClick={() => deleteWeightEntry(entry.id)}
                  className="p-1 rounded text-dark-600 hover:text-rose-400 transition"
                  title="Delete entry"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
