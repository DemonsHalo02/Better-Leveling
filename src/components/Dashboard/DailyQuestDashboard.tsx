"use client";

import React, { useEffect, useState } from 'react';
import { loadHunterState, saveHunterState, awardXp, allocateStatPoint, updateWeight, HunterState } from '@/lib/hunter-system';
import { getTodayWorkout } from '@/lib/workout-data';
import { Shield, Zap, Flame, Award, Dumbbell, Utensils, Droplets, Scale, CheckCircle2, Circle, PlusCircle, Sparkles, ArrowRight } from 'lucide-react';
import { TabType } from '../Navigation/SystemSidebar';

interface DailyQuestDashboardProps {
  onNavigate: (tab: TabType) => void;
}

export default function DailyQuestDashboard({ onNavigate }: DailyQuestDashboardProps) {
  const [state, setState] = useState<HunterState | null>(null);
  const [newWeightInput, setNewWeightInput] = useState<string>('');
  const [showWeightModal, setShowWeightModal] = useState(false);
  const todayWorkout = getTodayWorkout();

  useEffect(() => {
    setState(loadHunterState());
    const handleUpdate = () => setState(loadHunterState());
    window.addEventListener('hunterStateChanged', handleUpdate);
    return () => window.removeEventListener('hunterStateChanged', handleUpdate);
  }, []);

  if (!state) return null;

  const handleStatUpgrade = (stat: 'str' | 'agi' | 'vit' | 'int' | 'per') => {
    allocateStatPoint(stat);
  };

  const handleDrinkWater = () => {
    const nextState = { ...state };
    nextState.mp = Math.min(100, nextState.mp + 20);
    if (!nextState.completedQuestsToday.hydration && nextState.mp >= 100) {
      nextState.completedQuestsToday.hydration = true;
      saveHunterState(nextState);
      awardXp(150, 'vit');
    } else {
      saveHunterState(nextState);
    }
  };

  const handleWeighInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeightInput);
    if (!isNaN(val) && val > 50 && val < 500) {
      updateWeight(val);
      setShowWeightModal(false);
      setNewWeightInput('');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner: Awakening Notification */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-blue/40 shadow-glow-blue">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-system-blue/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-blue/10 border border-system-blue text-system-cyan text-xs font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-system-blue animate-spin" />
              Daily System Directives Active
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow">
              Arise, <span className="text-system-blue">{state.profile.name}</span>.
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Your mission is clear: transform from 242 lbs down to a shredded, muscular <span className="text-system-cyan font-bold">170 lbs by Dec 31, 2027</span>. Complete your daily quests to level up your real-life stats and build impressive density at Planet Fitness Lewiston!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('workouts')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-system-blue text-system-dark font-black uppercase text-sm tracking-widest shadow-glow-blue hover:bg-white transition-all transform hover:scale-105"
            >
              <Dumbbell className="w-4 h-4" />
              Start Workout Quest
            </button>
            <button
              onClick={() => onNavigate('scanner')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-system-panel border border-system-cyan/40 text-system-cyan font-bold uppercase text-sm tracking-widest hover:bg-system-blue/20 transition-all"
            >
              <Utensils className="w-4 h-4" />
              Scan Meal Barcode
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Stat Sheet & Today's Workout Quest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Hunter Stat Sheet */}
        <div className="bg-system-panel rounded-2xl p-6 border border-system-blue/30 space-y-6 shadow-lg">
          <div className="flex items-center justify-between border-b border-system-blue/20 pb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-system-blue" />
              <h3 className="text-base font-black tracking-widest uppercase text-white">Hunter Stat Sheet</h3>
            </div>
            {state.stats.availablePoints > 0 && (
              <span className="text-xs bg-system-purple/20 border border-system-purple text-system-cyan px-2.5 py-1 rounded-full font-bold animate-pulse shadow-glow-purple">
                {state.stats.availablePoints} Pts Available
              </span>
            )}
          </div>

          <div className="space-y-4 font-mono text-sm">
            {/* STR */}
            <div className="flex items-center justify-between bg-system-card p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-zinc-400 text-xs font-bold uppercase">STR (Strength)</div>
                <div className="text-xs text-zinc-500">Lifting volume & PRs</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-system-cyan">{state.stats.str}</span>
                {state.stats.availablePoints > 0 && (
                  <button
                    onClick={() => handleStatUpgrade('str')}
                    className="w-7 h-7 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-blue hover:text-system-dark flex items-center justify-center font-bold border border-system-blue transition-all"
                    title="Allocate +1 STR"
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* AGI */}
            <div className="flex items-center justify-between bg-system-card p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-zinc-400 text-xs font-bold uppercase">AGI (Agility)</div>
                <div className="text-xs text-zinc-500">Cardio, reps & stamina</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-system-cyan">{state.stats.agi}</span>
                {state.stats.availablePoints > 0 && (
                  <button
                    onClick={() => handleStatUpgrade('agi')}
                    className="w-7 h-7 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-blue hover:text-system-dark flex items-center justify-center font-bold border border-system-blue transition-all"
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* VIT */}
            <div className="flex items-center justify-between bg-system-card p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-zinc-400 text-xs font-bold uppercase">VIT (Vitality)</div>
                <div className="text-xs text-zinc-500">Water, recovery & sleep</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-system-cyan">{state.stats.vit}</span>
                {state.stats.availablePoints > 0 && (
                  <button
                    onClick={() => handleStatUpgrade('vit')}
                    className="w-7 h-7 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-blue hover:text-system-dark flex items-center justify-center font-bold border border-system-blue transition-all"
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* INT */}
            <div className="flex items-center justify-between bg-system-card p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-zinc-400 text-xs font-bold uppercase">INT (Intelligence)</div>
                <div className="text-xs text-zinc-500">Nutrition & barcode scanning</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-system-cyan">{state.stats.int}</span>
                {state.stats.availablePoints > 0 && (
                  <button
                    onClick={() => handleStatUpgrade('int')}
                    className="w-7 h-7 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-blue hover:text-system-dark flex items-center justify-center font-bold border border-system-blue transition-all"
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* PER */}
            <div className="flex items-center justify-between bg-system-card p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-zinc-400 text-xs font-bold uppercase">PER (Perception)</div>
                <div className="text-xs text-zinc-500">Daily weigh-ins & streak</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-system-cyan">{state.stats.per}</span>
                {state.stats.availablePoints > 0 && (
                  <button
                    onClick={() => handleStatUpgrade('per')}
                    className="w-7 h-7 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-blue hover:text-system-dark flex items-center justify-center font-bold border border-system-blue transition-all"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-system-dark/80 p-3.5 rounded-xl border border-system-blue/20 text-xs text-zinc-400 space-y-1">
            <div className="text-system-gold font-bold uppercase tracking-wider">Coach's Stat Advice:</div>
            <p>Every level up grants <span className="text-white font-bold">+3 Stat Points</span>. For your body recomposition goal, invest heavily in <span className="text-system-cyan">STR</span> to build arm and shoulder armor, and <span className="text-system-cyan">INT</span> to master your macros!</p>
          </div>
        </div>

        {/* Right 2 Cols: Daily Quests List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Workout Quest Box */}
          <div className={`rounded-2xl p-6 border transition-all duration-300 shadow-xl ${
            todayWorkout.isRestDay
              ? 'bg-gradient-to-br from-system-panel to-system-card border-system-gold/50 shadow-glow-gold'
              : 'bg-gradient-to-br from-system-panel via-system-card to-system-dark border-system-blue shadow-glow-blue'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded ${
                    todayWorkout.isRestDay ? 'bg-system-gold text-system-dark' : 'bg-system-blue text-system-dark'
                  }`}>
                    {todayWorkout.dayName} Directive
                  </span>
                  <span className="text-xs font-mono text-system-cyan">+ {todayWorkout.xpReward} XP Reward</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-wide text-white uppercase mt-1">
                  {todayWorkout.questTitle}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('workouts')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${
                  todayWorkout.isRestDay
                    ? 'bg-system-gold text-system-dark hover:bg-white font-black'
                    : 'bg-system-blue text-system-dark hover:bg-white font-black shadow-glow-blue'
                }`}
              >
                <span>{todayWorkout.isRestDay ? 'View Prep Checklist' : 'Enter PF Dungeon'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              {todayWorkout.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayWorkout.exercises.map((ex, idx) => (
                <div key={ex.id} className="bg-system-dark/90 p-3.5 rounded-xl border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-system-panel border border-system-blue/40 flex items-center justify-center font-mono font-bold text-system-cyan text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">{ex.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{ex.sets} Sets x {ex.reps}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 whitespace-nowrap">
                    {ex.targetGroup}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Nutrition & Health Quests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Calorie & Protein Quest */}
            <div className="bg-system-panel p-5 rounded-2xl border border-system-blue/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-system-cyan flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-system-blue" /> Nutrition Quest
                  </span>
                  <span className="text-xs font-mono text-system-gold">+200 XP</span>
                </div>
                <h4 className="text-base font-black text-white uppercase">2,650 kcal | 190g Protein</h4>
                <p className="text-xs text-zinc-400 mt-1">High protein prevents muscle loss & loose skin during your cut.</p>
              </div>
              <button
                onClick={() => onNavigate('scanner')}
                className="mt-4 w-full py-2 rounded-xl bg-system-card hover:bg-system-blue/20 border border-system-blue/40 text-system-cyan text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>Scan / Log Meals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hydration Quest */}
            <div className="bg-system-panel p-5 rounded-2xl border border-blue-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-400" /> Mana Hydration
                  </span>
                  <span className="text-xs font-mono text-system-gold">+150 XP</span>
                </div>
                <h4 className="text-base font-black text-white uppercase">1 Gallon (128 oz)</h4>
                <p className="text-xs text-zinc-400 mt-1">Status: <span className="text-blue-300 font-mono font-bold">{state.mp}% Hydrated</span> today.</p>
              </div>
              <button
                onClick={handleDrinkWater}
                className="mt-4 w-full py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Drink +20 oz Water</span>
              </button>
            </div>

            {/* Weigh-In Quest */}
            <div className="bg-system-panel p-5 rounded-2xl border border-system-purple/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-system-purple flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-system-purple" /> Daily Weigh-In
                  </span>
                  <span className="text-xs font-mono text-system-gold">+100 XP</span>
                </div>
                <h4 className="text-base font-black text-white uppercase">Current: {state.profile.currentWeight} lbs</h4>
                <p className="text-xs text-zinc-400 mt-1">Target: <span className="text-system-cyan font-bold">170 lbs</span> (~0.92 lbs/wk pace).</p>
              </div>
              {state.completedQuestsToday.weighIn ? (
                <div className="mt-4 w-full py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Logged Today (+100 XP)</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowWeightModal(true)}
                  className="mt-4 w-full py-2 rounded-xl bg-system-purple/20 hover:bg-system-purple text-system-cyan hover:text-white border border-system-purple/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-glow-purple"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Log Body Weight</span>
                </button>
              )}
            </div>

          </div>

          {/* Coach's Loose Skin Prevention & Bodybuilding Box */}
          <div className="rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-cyan/30 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-system-blue/10 border border-system-blue flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-system-blue" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>Fitness Coach & Nutritionist Briefing</span>
                <span className="text-[10px] font-mono bg-system-blue/20 text-system-cyan px-2 py-0.5 rounded">Golden Standard Pace</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                You are on track to reach <span className="text-white font-bold">170 lbs by Dec 31, 2027</span>. Why is this ~1 lb/week pace so vital? When you lose weight gradually while hitting <span className="text-system-cyan font-bold">190g of protein</span> and lifting heavy on this 6-day PPL split, your 20-year-old skin naturally retracts over the newly built muscle underneath. You will build a rock-hard physique without sagging skin!
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-system-panel border border-system-blue rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-glow-blue animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Scale className="w-5 h-5 text-system-blue" /> Daily Weigh-In Quest
              </h3>
              <button onClick={() => setShowWeightModal(false)} className="text-zinc-400 hover:text-white text-sm font-bold">✕</button>
            </div>
            <p className="text-xs text-zinc-300">Enter your morning weight (after waking up, before breakfast) for accurate tracking:</p>
            <form onSubmit={handleWeighInSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 241.5"
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className="w-full bg-system-dark border border-system-blue/50 rounded-xl px-4 py-3 font-mono text-xl font-bold text-white focus:outline-none focus:border-system-blue"
                  autoFocus
                  required
                />
                <span className="absolute right-4 top-3.5 text-zinc-400 font-mono font-bold">lbs</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-system-blue text-system-dark hover:bg-white font-black text-xs uppercase shadow-glow-blue transition-all"
                >
                  Submit (+100 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
