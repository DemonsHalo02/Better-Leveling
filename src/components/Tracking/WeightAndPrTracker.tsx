"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, saveHunterState, awardXp } from '@/lib/hunter-system';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from 'recharts';
import { TrendingDown, Trophy, Plus, Award, Shield, Flame, Target, Calendar } from 'lucide-react';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load weight history
      const savedWeights = localStorage.getItem('pf_weight_history');
      if (savedWeights) {
        setWeightLogs(JSON.parse(savedWeights));
      } else {
        // Default initial data points demonstrating the safe curve to 170 lbs by Dec 2027
        const initial: WeightLog[] = [
          { date: 'Start (242 lbs)', weight: 242, targetWeight: 242 },
          { date: 'Month 3', weight: 233, targetWeight: 232 },
          { date: 'Month 6', weight: 224, targetWeight: 222 },
          { date: 'Month 12', weight: 206, targetWeight: 204 },
          { date: 'Month 18', weight: 190, targetWeight: 188 },
          { date: 'Dec 2027 (Goal)', weight: 170, targetWeight: 170 },
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

    awardXp(150, 'str');
    setShowPrModal(false);
    setPrExercise('');
    setPrWeight('');
    setPrReps('');
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
            Track your journey from 242 lbs to 170 lbs by Dec 31, 2027. By maintaining a steady ~0.92 lb/week loss while building heavy lifting PRs, you prevent loose skin completely.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-system-dark px-4 py-2.5 rounded-xl border border-system-gold/30">
          <Trophy className="w-6 h-6 text-system-gold" />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Cut Goal</div>
            <div className="text-sm font-black text-system-gold font-mono">242 lbs ➔ 170 lbs (-72 lbs)</div>
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
            <p>At age 20, your skin possesses high levels of natural collagen and elastin. By targeting roughly <span className="text-system-cyan font-bold">0.92 lbs per week</span> (rather than crash dieting 3-4 lbs/week), your skin elasticity adapts in lockstep with fat reduction. Meanwhile, your Planet Fitness Push/Pull/Legs volume replaces lost adipose tissue with firm, dense muscle.</p>
          </div>
        </div>
      </div>

      {/* Strength PR Vault */}
      <div className="bg-system-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-5 h-5 text-system-gold" /> Hunter Strength PR Vault
            </h3>
            <p className="text-xs text-zinc-400">Log your heaviest weights lifted at Planet Fitness Lewiston to level up your STR stat!</p>
          </div>
          <button
            onClick={() => setShowPrModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-system-gold text-system-dark font-black uppercase text-xs tracking-wider hover:bg-white transition-all shadow-glow-gold"
          >
            <Plus className="w-4 h-4" />
            <span>Add New PR</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prs.map((pr) => (
            <div key={pr.id} className="bg-system-dark p-5 rounded-xl border border-system-blue/30 relative overflow-hidden group hover:border-system-blue transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-system-blue/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform" />
              <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">{pr.date}</div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{pr.exercise}</h4>
              <div className="text-2xl font-black text-system-cyan font-mono mt-2 text-glow">
                {pr.weightLbs} <span className="text-xs font-normal text-zinc-400">lbs</span>
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                x {pr.reps} {pr.reps === 1 ? 'Rep' : 'Reps'} (Max Effort)
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
                  className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 mt-1 text-sm text-white focus:outline-none focus:border-system-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Weight (lbs)</label>
                  <input
                    type="number"
                    placeholder="e.g. 205"
                    value={prWeight}
                    onChange={(e) => setPrWeight(e.target.value)}
                    className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 mt-1 text-sm font-mono font-bold text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Reps Performed</label>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    value={prReps}
                    onChange={(e) => setPrReps(e.target.value)}
                    className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-2.5 mt-1 text-sm font-mono font-bold text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPrModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-system-gold text-system-dark hover:bg-white font-black text-xs uppercase shadow-glow-gold transition-all"
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
