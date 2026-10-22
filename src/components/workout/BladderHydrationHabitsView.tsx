import React, { useState } from 'react';
import {
  useBladderStore,
  IrritantType,
  VoidUrgeLevel,
} from '../../store/useBladderStore';
import {
  Droplets,
  Moon,
  Clock,
  Plus,
  Trash2,
  AlertCircle,
  Coffee,
  Zap,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export const BladderHydrationHabitsView: React.FC = () => {
  const {
    targetWaterOz,
    bedtimeHour,
    addWater,
    deleteWater,
    logIrritant,
    deleteIrritant,
    logTimedVoid,
    deleteTimedVoid,
    setTargetWaterOz,
    setBedtimeHour,
    getTodayWaterOz,
    getTodayIrritants,
    getTodayVoids,
    getCutoffStatus,
    getMinutesSinceLastVoid,
  } = useBladderStore();

  const [selectedUrge, setSelectedUrge] = useState<VoidUrgeLevel>('moderate');
  const [showSettings, setShowSettings] = useState(false);

  const todayWaterOz = getTodayWaterOz();
  const waterPct = Math.min(100, Math.round((todayWaterOz / targetWaterOz) * 100));
  const todayIrritants = getTodayIrritants();
  const todayVoids = getTodayVoids();
  const cutoff = getCutoffStatus();
  const minutesSinceLast = getMinutesSinceLastVoid();

  const irritantPresets: { type: IrritantType; label: string; icon: string; defaultNote?: string }[] = [
    { type: 'matcha', label: 'Matcha Latte', icon: '🍵', defaultNote: 'Morning matcha caffeine' },
    { type: 'gfuel', label: 'G FUEL Energy', icon: '⚡', defaultNote: 'Pre-workout caffeine' },
    { type: 'coffee', label: 'Coffee / Espresso', icon: '☕' },
    { type: 'carbonation', label: 'Carbonated Drink', icon: '🥤' },
    { type: 'sweetener', label: 'Artificial Sweetener', icon: '🍬' },
    { type: 'spicy', label: 'Spicy / Acidic Food', icon: '🌶️' },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Steady Hydration Meter Card */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Droplets size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-dark-50">Steady Daytime Hydration</h3>
              <p className="text-[11px] text-dark-400">
                Paced fluid intake • Avoid large boluses / chugging
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cyan-400">
              {todayWaterOz} / {targetWaterOz} oz ({waterPct}%)
            </span>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition"
              title="Adjust goals"
            >
              <Sliders size={14} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${waterPct}%` }}
          />
        </div>

        {/* Settings Drawer */}
        {showSettings && (
          <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-dark-300">Daily Water Target</span>
              <div className="flex items-center gap-1 font-mono">
                {[64, 72, 84, 96].map((oz) => (
                  <button
                    key={oz}
                    onClick={() => setTargetWaterOz(oz)}
                    className={`px-2 py-1 rounded-md border text-[11px] ${
                      targetWaterOz === oz
                        ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300'
                        : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    {oz} oz
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dark-800">
              <span className="text-dark-300">Bedtime (for 2-hr cutoff)</span>
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
                    className={`px-2 py-1 rounded-md border text-[11px] ${
                      bedtimeHour === b.h
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300'
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

        {/* Quick Add Water Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { oz: 8, label: '+8 oz', sub: 'Glass' },
            { oz: 12, label: '+12 oz', sub: 'Mug' },
            { oz: 16, label: '+16 oz', sub: 'Pint' },
            { oz: 24, label: '+24 oz', sub: 'Bottle' },
          ].map((item) => (
            <button
              key={item.oz}
              onClick={() => addWater(item.oz)}
              className="py-2 px-1.5 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-750 text-center transition group"
            >
              <div className="font-mono text-xs font-bold text-dark-100 group-hover:text-cyan-400">
                {item.label}
              </div>
              <div className="text-[10px] text-dark-500">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Evening Fluid Cutoff Card */}
      <div
        className={`p-4 rounded-2xl border transition ${
          cutoff.isPastCutoff
            ? 'bg-indigo-950/25 border-indigo-800/40 text-indigo-200'
            : 'bg-dark-850 border-dark-750 text-dark-300'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-xl mt-0.5 ${
              cutoff.isPastCutoff
                ? 'bg-indigo-500/15 text-indigo-300'
                : 'bg-amber-500/10 text-amber-400'
            }`}
          >
            {cutoff.isPastCutoff ? <Moon size={18} /> : <Clock size={18} />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs sm:text-sm text-dark-100">
                Evening Fluid Cutoff: {cutoff.cutoffTimeDisplay}
              </h4>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  cutoff.isPastCutoff
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                    : 'bg-dark-900 text-amber-400 border-dark-700'
                }`}
              >
                {cutoff.isPastCutoff ? 'Cutoff Active' : 'Day Window'}
              </span>
            </div>
            <p className="text-xs text-dark-400 mt-1">
              {cutoff.isPastCutoff
                ? 'You are past your 2-hour pre-bed cutoff. Ease off fluids close to bedtime to prevent nighttime trips.'
                : `${cutoff.hoursRemaining}h ${cutoff.minutesRemaining}m remaining before evening cutoff. Steady hydration is safe.`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bladder Irritants Logger */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-dark-50 flex items-center gap-1.5">
              <span>Watch Bladder Irritants</span>
              <span className="text-[10px] font-mono text-dark-500">(1-Tap Log)</span>
            </h3>
            <p className="text-[11px] text-dark-400">
              Notice what affects you personally. No drastic diet change needed unless doctor advises.
            </p>
          </div>
        </div>

        {/* 1-Tap Irritant Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {irritantPresets.map((item) => (
            <button
              key={item.label}
              onClick={() => logIrritant(item.type, item.label, item.defaultNote)}
              className="flex items-center gap-2 p-2 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-750 text-left transition group"
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-semibold text-xs text-dark-200 group-hover:text-dark-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Today's Logged Irritants List */}
        {todayIrritants.length > 0 && (
          <div className="pt-2 border-t border-dark-800 space-y-1.5">
            <div className="text-[11px] font-mono text-dark-400">Logged Today:</div>
            <div className="flex flex-wrap gap-1.5">
              {todayIrritants.map((i) => (
                <span
                  key={i.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-900 border border-dark-750 text-xs text-dark-300"
                >
                  <span className="font-mono text-amber-400 text-[10px]">{i.time}</span>
                  <span>{i.label}</span>
                  <button
                    onClick={() => deleteIrritant(i.id)}
                    className="text-dark-500 hover:text-rose-400 ml-1"
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Timed Voids Tracker & Spacing */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-dark-50">Timed Voids & Spacing</h3>
            <p className="text-[11px] text-dark-400">
              Avoid "just in case" peeing • Train the bladder to hold comfortably
            </p>
          </div>

          {minutesSinceLast !== null && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900 border border-dark-750 text-[11px] font-mono text-emerald-400 self-start sm:self-auto">
              <span>Last void: {Math.floor(minutesSinceLast / 60)}h {minutesSinceLast % 60}m ago</span>
            </div>
          )}
        </div>

        {/* Log Void Row */}
        <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-dark-300">Urge Strength:</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              {(['gentle', 'moderate', 'strong'] as VoidUrgeLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedUrge(level)}
                  className={`px-2.5 py-1 rounded-lg border capitalize ${
                    selectedUrge === level
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 font-bold'
                      : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => logTimedVoid(selectedUrge)}
            className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={15} />
            <span>Log Timed Void Now</span>
          </button>
        </div>

        {/* Today's Voids Log */}
        {todayVoids.length > 0 && (
          <div className="pt-2 border-t border-dark-800 space-y-1.5">
            <div className="text-[11px] font-mono text-dark-400">
              Today's Voids ({todayVoids.length}):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {todayVoids.map((v) => (
                <span
                  key={v.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-900 border border-dark-750 text-xs text-dark-300"
                >
                  <span className="font-mono text-cyan-400 text-[10px]">{v.time}</span>
                  <span className="capitalize text-[11px]">({v.urgeLevel} urge)</span>
                  <button
                    onClick={() => deleteTimedVoid(v.id)}
                    className="text-dark-500 hover:text-rose-400 ml-1"
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
