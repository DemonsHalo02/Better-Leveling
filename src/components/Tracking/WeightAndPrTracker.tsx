"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, saveHunterState, awardXp, triggerLevelUpCelebration } from '@/lib/hunter-system';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from 'recharts';
import { TrendingDown, Trophy, Plus, Award, Shield, Flame, Target, Calendar, Footprints } from 'lucide-react';

interface WeightLog {
  date: string;
  weight: number;
  targetWeight: number;
}

interface StrengthPR {
  id: string;
  exercise: string;
  weightLbs: number;
  reps: number;
  date: string;
}

export default function WeightAndPrTracker() {
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [prs, setPrs] = useState<StrengthPR[]>([]);
  const [showPrModal, setShowPrModal] = useState(false);
  const [prExercise, setPrExercise] = useState('');
  const [prWeight, setPrWeight] = useState('');
  const [prReps, setPrReps] = useState('');
  const [hunterStr, setHunterStr] = useState<number>(10);
  const [dailySteps, setDailySteps] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateStr = () => {
        setHunterStr(loadHunterState().stats.str);
      };
      updateStr();
      window.addEventListener('hunterStateChanged', updateStr);

      // Load weight history
      // Load weight history
      const savedWeights = localStorage.getItem('pf_weight_history');
      if (savedWeights) {
        let parsed = JSON.parse(savedWeights) as WeightLog[];
        parsed = parsed.map(p => p.date.includes('Goal') || p.targetWeight === 170 ? { ...p, weight: p.date.includes('Goal') ? 160 : p.weight, targetWeight: p.targetWeight === 170 ? 160 : p.targetWeight } : p);
        setWeightLogs(parsed);
      } else {
        // Default initial data points demonstrating the safe curve to 160 lbs by Dec 2027
        const initial: WeightLog[] = [
          { date: 'Start (242 lbs)', weight: 242, targetWeight: 242 },
          { date: 'Month 3', weight: 233, targetWeight: 232 },
          { date: 'Month 6', weight: 224, targetWeight: 222 },
          { date: 'Month 12', weight: 206, targetWeight: 204 },
          { date: 'Month 18', weight: 190, targetWeight: 188 },
          { date: 'Dec 2027 (Goal)', weight: 160, targetWeight: 160 },
        ];
        setWeightLogs(initial);
        localStorage.setItem('pf_weight_history', JSON.stringify(initial));
      }

      // Load PRs
      const savedPrs = localStorage.getItem('pf_strength_prs');
      if (savedPrs) {
        setPrs(JSON.parse(savedPrs));
      } else {
        const initialPrs: StrengthPR[] = [
          { id: 'pr-1', exercise: 'Smith Machine Bench Press', weightLbs: 185, reps: 8, date: 'Recent' },
          { id: 'pr-2', exercise: 'Lat Pulldown (Wide Grip)', weightLbs: 160, reps: 10, date: 'Recent' },
          { id: 'pr-3', exercise: 'Leg Press Machine', weightLbs: 360, reps: 10, date: 'Recent' },
          { id: 'pr-4', exercise: 'Seated Cable Row', weightLbs: 150, reps: 10, date: 'Recent' },
        ];
        setPrs(initialPrs);
        localStorage.setItem('pf_strength_prs', JSON.stringify(initialPrs));
      }
    }
  }, []);

  const handleAddPr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prExercise.trim() || !prWeight) return;

    const newPr: StrengthPR = {
      id: Date.now().toString(),
      exercise: prExercise.trim(),
      weightLbs: parseFloat(prWeight) || 0,
      reps: parseInt(prReps) || 1,
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
    };

    const updated = [newPr, ...prs];
    setPrs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_strength_prs', JSON.stringify(updated));
    }

    const state = loadHunterState();
    state.stats.str += 1;
    saveHunterState(state);
    awardXp(150, 'str');
    triggerLevelUpCelebration();

    setShowPrModal(false);
    setPrExercise('');
    setPrWeight('');
    setPrReps('');
  };

  const handleAddSteps = (amount: number) => {
    const nextSteps = Math.max(0, dailySteps + amount);
    setDailySteps(nextSteps);
    if (typeof window !== 'undefined') {
      const todayKey = new Date().toISOString().split('T')[0];
      localStorage.setItem(`calisthenics_daily_steps_${todayKey}`, nextSteps.toString());
    }
    awardXp(amount >= 2500 ? 50 : 25, 'agi');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <Target className="w-3.5 h-3.5 text-system-blue" />
            <span>Body Recomposition Roadmap | Age 20, 5'10"</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Weight Trajectory & PR Vault
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Track your journey from 242 lbs to 160 lbs by Dec 31, 2027. By maintaining a steady ~0.92 lb/week loss while building heavy lifting PRs, you prevent loose skin completely.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-system-dark px-4 py-2.5 rounded-xl border border-system-gold/30">
          <Trophy className="w-6 h-6 text-system-gold" />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Cut Goal</div>
            <div className="text-sm font-black text-system-gold font-mono">242 lbs ➔ 160 lbs (-82 lbs)</div>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/20 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-system-blue" />
              <span>Golden Standard Weight Loss Trajectory</span>
            </h3>
            <p className="text-xs text-zinc-400">Comparing your logged body weight against the loose-skin prevention curve.</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-system-cyan" />
              <span className="text-white">Actual Weight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-system-purple border border-system-purple" />
              <span className="text-zinc-400">Safe Target Curve</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[320px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightLogs} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[160, 250]} tickLine={false} unit=" lbs" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0e17', borderColor: '#00f0ff', borderRadius: '12px' }}
                itemStyle={{ color: '#00f0ff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" name="Your Weight (lbs)" />
              <Line type="monotone" dataKey="targetWeight" stroke="#7000ff" strokeWidth={2} strokeDasharray="5 5" name="Safe Target (lbs)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-system-dark/80 p-4 rounded-xl border border-white/5 flex items-start gap-3">
          <Shield className="w-5 h-5 text-system-blue flex-shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
            <div className="font-bold text-white uppercase tracking-wider">Why This Pace Safeguards Your Skin:</div>
            <p>At age 20, your skin possesses high levels of natural collagen and elastin. By targeting roughly <span className="text-system-cyan font-bold">0.92 lbs per week</span> (rather than crash dieting 3-4 lbs/week), your skin elasticity adapts in lockstep with fat reduction. Meanwhile, your calisthenics volume replaces lost adipose tissue with firm, dense muscle.</p>
          </div>
        </div>
      </div>

      {/* Daily & Weekly Walking & Step Log */}
      <div className="bg-gradient-to-br from-system-panel via-system-card to-system-dark p-6 rounded-2xl border border-system-cyan/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
              <Footprints className="w-4 h-4 text-system-cyan animate-pulse" />
              <span>Daily Walking & Cardio Log</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-wide">
              {dailySteps.toLocaleString()} / 10,000 <span className="text-sm text-zinc-400 font-bold">Steps Today (~{(dailySteps * 0.00045).toFixed(1)} Miles)</span>
            </h3>
            <p className="text-xs text-zinc-300">Daily brisk walking accelerates fat oxidation and awards AGI points without taxing recovery.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleAddSteps(1000)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-white/10 hover:border-system-cyan text-xs font-bold text-white hover:bg-system-blue/20 transition-all flex items-center gap-1.5"
            >
              <Footprints className="w-3.5 h-3.5 text-system-cyan" />
              <span>+1,000 (~10m)</span>
            </button>
            <button
              onClick={() => handleAddSteps(2500)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-white/10 hover:border-system-cyan text-xs font-bold text-white hover:bg-system-blue/20 transition-all flex items-center gap-1.5"
            >
              <Footprints className="w-3.5 h-3.5 text-system-gold" />
              <span>+2,500 (~25m)</span>
            </button>
            <button
              onClick={() => handleAddSteps(5000)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-system-blue/50 hover:border-system-cyan text-xs font-bold text-system-cyan hover:bg-system-blue hover:text-black transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>+5,000 (~45m Treadmill Walk/Run)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strength PR Vault */}
      <div className="bg-system-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-5 h-5 text-system-gold" /> Hunter Strength PR Vault
            </h3>
            <p className="text-xs text-zinc-400">Log your highest rep counts per set during Calisthenics Workouts to level up your STR stat!</p>
          </div>
          <button
            onClick={() => setShowPrModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-system-gold text-system-dark font-black uppercase text-xs sm:text-sm tracking-wider hover:bg-white transition-all shadow-glow-gold min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New PR</span>
          </button>
        </div>

        {/* STR Stat Level Up Progress Box */}
        <div className="bg-system-card p-4 rounded-xl border border-system-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-system-gold/20 border border-system-gold/50 flex items-center justify-center font-black text-xl text-system-gold shadow-glow-gold">
              {hunterStr}
            </div>
            <div>
              <div className="text-xs font-bold text-system-gold uppercase tracking-wider flex items-center gap-1.5">
                <span>STR (Strength) Attribute Level</span>
                <span className="text-[10px] bg-system-gold/20 px-1.5 py-0.2 rounded font-mono text-white">+1 Per PR</span>
              </div>
              <p className="text-xs text-zinc-400">Every personal record logged during your Calisthenics Workout increases your STR stat by +1 and awards 150 XP!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase bg-black/40 px-3.5 py-2 rounded-lg border border-white/10 text-system-cyan whitespace-nowrap">
            <Trophy className="w-4 h-4 text-system-gold" />
            <span>Next Rank: {hunterStr + (5 - (hunterStr % 5 || 5))} STR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prs.map((pr) => (
            <div key={pr.id} className="bg-system-dark p-5 rounded-xl border border-system-blue/30 relative overflow-hidden group hover:border-system-blue transition-all flex flex-col justify-between">
              <div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-system-blue/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform" />
                <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">{pr.date}</div>
                <div className="text-sm font-bold text-white line-clamp-1">{pr.exercise}</div>
                <div className="text-2xl font-black text-system-gold font-mono mt-2">
                  {pr.weightLbs} <span className="text-xs font-normal text-zinc-400">lbs</span>
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  x {pr.reps} {pr.reps === 1 ? 'Rep' : 'Reps'} (Max Effort)
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-system-gold/20 text-system-gold border border-system-gold/40">
                  💪 +1 STR LEVEL
                </span>
                {pr.weightLbs >= 200 && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    🔥 200+ LB IRON BEAST
                  </span>
                )}
                {pr.weightLbs >= 150 && pr.weightLbs < 200 && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-system-cyan border border-system-blue/40">
                    ⚡ ELITE LIFT
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PR Modal */}
      {showPrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-system-panel border border-system-gold rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-glow-gold animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Trophy className="w-5 h-5 text-system-gold" /> Record Strength PR
              </h3>
              <button onClick={() => setShowPrModal(false)} className="text-zinc-400 hover:text-white text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddPr} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase">Exercise Name</label>
                <input
                  type="text"
                  placeholder="e.g. Smith Machine Bench Press"
                  value={prExercise}
                  onChange={(e) => setPrExercise(e.target.value)}
                  className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-3 mt-1 text-sm text-white focus:outline-none focus:border-system-gold shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Weight (lbs)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 205"
                    value={prWeight}
                    onChange={(e) => setPrWeight(e.target.value)}
                    className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-3 mt-1 text-sm font-mono font-bold text-white focus:outline-none shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Reps Performed</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 6"
                    value={prReps}
                    onChange={(e) => setPrReps(e.target.value)}
                    className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-3 mt-1 text-sm font-mono font-bold text-white focus:outline-none shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPrModal(false)}
                  className="flex-1 py-3.5 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs sm:text-sm uppercase min-h-[44px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-system-gold text-system-dark hover:bg-white font-black text-xs sm:text-sm uppercase shadow-glow-gold transition-all min-h-[44px]"
                >
                  Save PR (+150 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
