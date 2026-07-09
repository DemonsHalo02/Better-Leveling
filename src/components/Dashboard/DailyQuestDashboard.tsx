"use client";

import React, { useEffect, useState } from 'react';
import { loadHunterState, saveHunterState, awardXp, allocateStatPoint, updateWeight, addCustomQuest, toggleCustomQuest, deleteCustomQuest, HunterState } from '@/lib/hunter-system';
import { getTodayWorkout } from '@/lib/workout-data';
import { Shield, Zap, Flame, Award, Dumbbell, Utensils, Droplets, Scale, CheckCircle2, Circle, PlusCircle, Sparkles, ArrowRight, Trash2, Settings } from 'lucide-react';
import { TabType } from '../Navigation/SystemSidebar';
import MotivationOracle from './MotivationOracle';

interface DailyQuestDashboardProps {
  onNavigate: (tab: TabType) => void;
}

export default function DailyQuestDashboard({ onNavigate }: DailyQuestDashboardProps) {
  const [state, setState] = useState<HunterState | null>(null);
  const [newWeightInput, setNewWeightInput] = useState<string>('');
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [customQuestTitle, setCustomQuestTitle] = useState<string>('');
  const todayWorkout = getTodayWorkout();

  useEffect(() => {
    setState(loadHunterState());
    const handleUpdate = () => setState(loadHunterState());
    window.addEventListener('hunterStateChanged', handleUpdate);
    return () => window.removeEventListener('hunterStateChanged', handleUpdate);
  }, []);

  if (!state) return null;

  const targetDateStr = state.profile?.targetDate || '2027-12-31';
  const targetDate = new Date(targetDateStr).getTime();
  const todayTime = new Date().getTime();
  const daysRemaining = Math.max(0, Math.round((targetDate - todayTime) / (1000 * 60 * 60 * 24)));
  const startWeight = state.profile?.startWeight || 242;
  const targetWeight = state.profile?.targetWeight || 170;
  let currentWeight = state.profile?.currentWeight || startWeight;
  if (typeof window !== 'undefined') {
    try {
      const savedWeights = localStorage.getItem('pf_weight_history');
      if (savedWeights) {
        const parsed = JSON.parse(savedWeights);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[parsed.length - 1]?.weight === 'number') {
          currentWeight = parsed[parsed.length - 1].weight;
        }
      }
    } catch {
      // ignore
    }
  }
  const lbsLost = Math.max(0, Number((startWeight - currentWeight).toFixed(1)));
  const totalLossNeeded = Math.max(1, startWeight - targetWeight);
  const raidProgress = Math.min(100, Math.max(5, Math.round((lbsLost / totalLossNeeded) * 100)));

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

  const handleAddCustomQuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestTitle.trim()) return;
    addCustomQuest(customQuestTitle.trim(), 100);
    setCustomQuestTitle('');
  };

  const handleToggleCustomQuest = (id: string) => {
    toggleCustomQuest(id);
  };

  const handleDeleteCustomQuest = (id: string) => {
    deleteCustomQuest(id);
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
              Your mission is clear: transform from {startWeight} lbs down to a shredded, muscular <span className="text-system-cyan font-bold">{targetWeight} lbs by {new Date(targetDateStr).toLocaleDateString()}</span>. Complete your daily quests to level up your real-life stats and build impressive density at {state.profile.gymName || 'Planet Fitness Lewiston'}!
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

      {/* ⚔️ Boss Raid Cutting Countdown Deck */}
      <div className="bg-gradient-to-r from-system-dark via-system-panel to-system-card p-6 rounded-2xl border-2 border-system-gold/60 shadow-glow-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-system-gold/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-system-gold text-system-dark font-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded shadow-sm">
                👑 S-Rank Boss Raid Directive
              </span>
              <span className="text-xs font-mono text-system-cyan">Target: {targetWeight} LBS by {new Date(targetDateStr).toLocaleDateString()}</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-wider flex flex-wrap items-center gap-2">
              <span>The {targetWeight} LB Shredded Transformation</span>
              <span className="text-sm font-mono font-bold text-system-gold">({daysRemaining} Days Left)</span>
            </h3>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              Every clean meal prep and every PR at {state.profile.gymName || 'Planet Fitness Lewiston'} chops HP off this boss raid. Stay consistent on the {state.profile.dietName || 'Boricua cutting diet'} to avoid loose skin and emerge at peak definition!
            </p>

            {/* Boss HP Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                <span className="text-zinc-400">Start: {startWeight} LBS</span>
                <span className="text-system-gold animate-pulse">Current: {currentWeight} LBS (-{lbsLost} lbs lost)</span>
                <span className="text-system-cyan">Goal: {targetWeight} LBS</span>
              </div>
              <div className="w-full h-4 bg-system-dark rounded-full overflow-hidden border border-system-gold/40 p-0.5 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-system-blue via-system-cyan to-system-gold rounded-full transition-all duration-1000 shadow-glow-gold"
                  style={{ width: `${raidProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-gold/40 text-center min-w-[160px] flex flex-col justify-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Raid Completion</div>
            <div className="text-3xl font-black text-system-gold font-mono my-1 text-glow-gold">
              {raidProgress}%
            </div>
            <button
              onClick={() => setShowWeightModal(true)}
              className="mt-2 w-full py-1.5 px-3 rounded-lg bg-system-gold text-system-dark font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-sm"
            >
              Log Weigh-In
            </button>
          </div>
        </div>
      </div>

      {/* General Feature & VIP Teaser: Daily Motivation Oracle */}
      <MotivationOracle onNavigate={(tab) => onNavigate(tab as TabType)} />

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
                <span>{todayWorkout.isRestDay ? 'View Prep Checklist' : 'Start Idol Workout'}</span>
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
                <h4 className="text-base font-black text-white uppercase">{state.profile.dailyCalorieGoal || 2150} kcal | {state.profile.dailyProteinGoal || 170}g Protein</h4>
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
                <p className="text-xs text-zinc-400 mt-1">Target: <span className="text-system-cyan font-bold">{targetWeight} lbs</span> (~0.92 lbs/wk pace).</p>
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

          {/* Custom Quests & Personal Goals Section */}
          <div className="bg-gradient-to-br from-system-panel to-system-dark p-6 rounded-2xl border border-system-gold/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-system-gold/20 text-system-gold font-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded border border-system-gold/30">
                    🎯 Personal Directives
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Custom Hunter Goals</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider mt-1 flex items-center gap-2">
                  <span>My Custom Daily Quests</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('settings')}
                className="px-3.5 py-1.5 rounded-xl bg-system-card hover:bg-system-blue/20 border border-system-blue/40 text-system-cyan text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Manage Profile & Goals</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomQuestSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={customQuestTitle}
                onChange={(e) => setCustomQuestTitle(e.target.value)}
                placeholder="Add a new custom goal or daily task (e.g., Read 15 mins, 10k steps, Stretching)..."
                className="flex-1 bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-system-gold transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-system-gold text-system-dark hover:bg-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-glow-gold flex-shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Goal (+100 XP)</span>
              </button>
            </form>

            {(!state.customQuests || state.customQuests.length === 0) ? (
              <div className="text-center py-6 bg-system-dark/50 rounded-xl border border-dashed border-white/10">
                <p className="text-xs text-zinc-400 font-mono">No custom quests added yet! Create your own personal goals above to gain bonus XP every day!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {state.customQuests.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => handleToggleCustomQuest(q.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all transform hover:scale-[1.01] ${
                      q.completed
                        ? 'bg-green-500/10 border-green-500/40 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                        : 'bg-system-card/90 border-white/10 hover:border-system-gold/50 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {q.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm font-bold truncate ${q.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                        {q.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono font-black text-system-gold bg-system-gold/10 px-2 py-0.5 rounded border border-system-gold/20">
                        +{q.xpReward || 100} XP
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCustomQuest(q.id);
                        }}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete custom goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                You are on track to reach <span className="text-white font-bold">{targetWeight} lbs by {new Date(targetDateStr).toLocaleDateString()}</span>. Why is this ~1 lb/week pace so vital? When you lose weight gradually while hitting <span className="text-system-cyan font-bold">{state.profile.dailyProteinGoal || 206}g of protein</span> and lifting heavy on this 6-day PPL split, your 20-year-old skin naturally retracts over the newly built muscle underneath. You will build a rock-hard physique without sagging skin!
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
                  inputMode="decimal"
                  step="0.1"
                  placeholder="e.g. 241.5"
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className="w-full bg-system-dark border border-system-blue/50 rounded-xl px-4 py-3.5 font-mono text-xl font-bold text-white focus:outline-none focus:border-system-blue shadow-inner"
                  autoFocus
                  required
                />
                <span className="absolute right-4 top-4 text-zinc-400 font-mono font-bold">lbs</span>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 py-3 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs sm:text-sm uppercase min-h-[44px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black hover:bg-white font-black text-xs sm:text-sm uppercase shadow-glow-blue transition-all min-h-[44px]"
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
