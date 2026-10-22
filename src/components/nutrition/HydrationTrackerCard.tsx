import React, { useState } from 'react';
import { useBladderStore, IrritantType } from '../../store/useBladderStore';
import {
  Droplets,
  Plus,
  Trash2,
  Clock,
  Moon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  AlertCircle,
} from 'lucide-react';

export const HydrationTrackerCard: React.FC = () => {
  const {
    targetWaterOz,
    bedtimeHour,
    addWater,
    deleteWater,
    logIrritant,
    deleteIrritant,
    setTargetWaterOz,
    setBedtimeHour,
    getTodayWaterOz,
    getTodayIrritants,
    getCutoffStatus,
  } = useBladderStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customOz, setCustomOz] = useState('');

  const todayWaterOz = getTodayWaterOz();
  const waterPct = Math.min(100, Math.round((todayWaterOz / targetWaterOz) * 100));
  const todayIrritants = getTodayIrritants();
  const cutoff = getCutoffStatus();

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customOz);
    if (val && !isNaN(val) && val > 0) {
      addWater(Math.round(val));
      setCustomOz('');
    }
  };

  const irritantsList: { type: IrritantType; label: string; icon: string }[] = [
    { type: 'matcha', label: 'Matcha Latte', icon: '🍵' },
    { type: 'gfuel', label: 'G FUEL Energy', icon: '⚡' },
    { type: 'coffee', label: 'Coffee', icon: '☕' },
    { type: 'carbonation', label: 'Soda / Seltzer', icon: '🥤' },
    { type: 'sweetener', label: 'Artificial Sweetener', icon: '🍬' },
  ];

  return (
    <div className="bg-dark-850/90 border border-dark-750/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 transition hover:border-dark-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Droplets size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-dark-50">Hydration & Water Intake</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                Paced
              </span>
            </div>
            <p className="text-[11px] text-dark-400">
              Steady intake throughout the day • Taper before bed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-mono text-sm font-bold text-cyan-400">
              {todayWaterOz} <span className="text-xs text-dark-400">/ {targetWaterOz} oz</span>
            </div>
            <div className="text-[10px] font-mono text-dark-500">{waterPct}% of goal</div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Fluid Meter Bar */}
      <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-cyan-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${waterPct}%` }}
        />
      </div>

      {/* Quick Add Water Buttons (Always Visible) */}
      <div className="grid grid-cols-4 gap-2 pt-0.5">
        {[
          { oz: 8, label: '+8 oz', sub: 'Glass' },
          { oz: 12, label: '+12 oz', sub: 'Mug' },
          { oz: 16, label: '+16 oz', sub: 'Pint' },
          { oz: 24, label: '+24 oz', sub: 'Bottle' },
        ].map((item) => (
          <button
            key={item.oz}
            onClick={() => addWater(item.oz)}
            className="py-2 px-1 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-750 text-center transition group hover:border-cyan-500/40"
          >
            <div className="font-mono text-xs font-bold text-dark-100 group-hover:text-cyan-400">
              {item.label}
            </div>
            <div className="text-[9.5px] text-dark-500">{item.sub}</div>
          </button>
        ))}
      </div>

      {/* Expanded Details: Evening Cutoff & Irritants Logger */}
      {isExpanded && (
        <div className="space-y-3 pt-3 border-t border-dark-800 animate-fadeIn">
          {/* Custom Amount Form & Settings */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <form onSubmit={handleCustomAdd} className="flex items-center gap-1.5">
              <input
                type="number"
                placeholder="Custom oz..."
                value={customOz}
                onChange={(e) => setCustomOz(e.target.value)}
                className="w-28 bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1 text-xs font-mono text-dark-50 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40 text-xs transition"
              >
                + Add
              </button>
            </form>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-[11px] text-dark-400 hover:text-dark-200 flex items-center gap-1 underline self-start sm:self-auto"
            >
              <Sliders size={12} />
              <span>Change Target / Bedtime</span>
            </button>
          </div>

          {/* Goal & Bedtime Settings */}
          {showSettings && (
            <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Daily Target (oz):</span>
                <div className="flex items-center gap-1 font-mono">
                  {[64, 72, 84, 96].map((oz) => (
                    <button
                      key={oz}
                      onClick={() => setTargetWaterOz(oz)}
                      className={`px-2 py-0.5 rounded-md border text-[11px] ${
                        targetWaterOz === oz
                          ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 font-bold'
                          : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      {oz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-dark-800">
                <span className="text-dark-300">Bedtime (for 2-hr cutoff):</span>
                <div className="flex items-center gap-1 font-mono">
                  {[
                    { h: 21, label: '9 PM' },
                    { h: 22, label: '10 PM' },
                    { h: 23, label: '11 PM' },
                    { h: 24, label: '12 AM' },
                  ].map((b) => (
                    <button
                      key={b.h}
                      onClick={() => setBedtimeHour(b.h)}
                      className={`px-2 py-0.5 rounded-md border text-[11px] ${
                        bedtimeHour === b.h
                          ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold'
                          : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Evening Cutoff Notice */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
              cutoff.isPastCutoff
                ? 'bg-indigo-950/30 border-indigo-800/40 text-indigo-300'
                : 'bg-dark-900 border-dark-800 text-dark-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {cutoff.isPastCutoff ? (
                <Moon size={15} className="text-indigo-400" />
              ) : (
                <Clock size={15} className="text-amber-400" />
              )}
              <span>
                <strong>Cutoff: {cutoff.cutoffTimeDisplay}</strong> (2h before bed)
              </span>
            </div>
            <span className="font-mono text-[11px]">
              {cutoff.isPastCutoff
                ? 'Ease off fluids'
                : `${cutoff.hoursRemaining}h ${cutoff.minutesRemaining}m remaining`}
            </span>
          </div>

          {/* Quick Irritants Tracker */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono text-dark-400 block">
              1-Tap Bladder Irritants Tag:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {irritantsList.map((item) => (
                <button
                  key={item.label}
                  onClick={() => logIrritant(item.type, item.label)}
                  className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 border border-dark-750 text-[11px] text-dark-300 hover:text-dark-100 flex items-center gap-1 transition"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {todayIrritants.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {todayIrritants.map((i) => (
                  <span
                    key={i.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-dark-900 border border-dark-800 text-[10px] text-dark-400"
                  >
                    <span className="text-amber-400 font-mono">{i.time}</span>
                    <span>{i.label}</span>
                    <button
                      onClick={() => deleteIrritant(i.id)}
                      className="text-dark-500 hover:text-rose-400 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
