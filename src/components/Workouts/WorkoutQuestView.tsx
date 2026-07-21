"use client";

import React, { useState, useEffect } from 'react';
import { PLANET_FITNESS_PPL_ROUTINE, WorkoutDay, Exercise } from '@/lib/workout-data';
import { awardXp, loadHunterState, saveHunterState } from '@/lib/hunter-system';
import { Dumbbell, CheckCircle2, Circle, Trophy, Info, Sparkles, MapPin, Zap, Footprints, Flame, PlusCircle, RotateCcw } from 'lucide-react';
import RestTimerBar from './RestTimerBar';

export default function WorkoutQuestView() {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay()); // default today
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
  const [exerciseWeights, setExerciseWeights] = useState<Record<string, string>>({});
  const [questCleared, setQuestCleared] = useState<boolean>(false);

  // Planet Fitness Treadmill Cardio State (45 mins daily target: 30m walk + 15m run)
  const [treadmillMinutes, setTreadmillMinutes] = useState<number>(0);
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('');
  const TREADMILL_GOAL = 45;

  const currentDayWorkout = PLANET_FITNESS_PPL_ROUTINE.find(d => d.dayOfWeek === selectedDay) || PLANET_FITNESS_PPL_ROUTINE[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSets = localStorage.getItem(`pf_completed_sets_${selectedDay}`);
      if (savedSets) setCompletedSets(JSON.parse(savedSets));
      else setCompletedSets({});

      const savedWeights = localStorage.getItem(`pf_weights`);
      if (savedWeights) setExerciseWeights(JSON.parse(savedWeights));
      else setExerciseWeights({});

      const todayKey = new Date().toISOString().split('T')[0];
      const savedMinutes = localStorage.getItem(`pf_treadmill_minutes_${todayKey}`);
      if (savedMinutes) setTreadmillMinutes(parseInt(savedMinutes, 10));
    }
  }, [selectedDay]);

  const handleAddMinutes = (amount: number) => {
    const nextMinutes = Math.max(0, treadmillMinutes + amount);
    setTreadmillMinutes(nextMinutes);
    if (typeof window !== 'undefined') {
      const todayKey = new Date().toISOString().split('T')[0];
      localStorage.setItem(`pf_treadmill_minutes_${todayKey}`, nextMinutes.toString());
    }
    awardXp(amount >= 30 ? 75 : 35, 'agi');
    if (nextMinutes >= TREADMILL_GOAL) {
      const state = loadHunterState();
      state.completedQuestsToday.cardio = true;
      saveHunterState(state);
    }
  };

  const handleCustomMinutesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customMinutesInput.replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      handleAddMinutes(parsed);
      setCustomMinutesInput('');
    }
  };

  const handleSetToggle = (exerciseId: string, maxSets: number) => {
    const current = completedSets[exerciseId] || 0;
    const next = current < maxSets ? current + 1 : 0;
    const updated = { ...completedSets, [exerciseId]: next };
    setCompletedSets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pf_completed_sets_${selectedDay}`, JSON.stringify(updated));
    }

    const allCleared = currentDayWorkout.exercises.every(ex => (updated[ex.id] || 0) >= ex.sets);
    if (allCleared && !questCleared) {
      setQuestCleared(true);
      awardXp(currentDayWorkout.xpReward, 'str');
      const state = loadHunterState();
      state.completedQuestsToday.workout = true;
      saveHunterState(state);
    }
  };

  const handleWeightChange = (exerciseId: string, value: string) => {
    const updated = { ...exerciseWeights, [exerciseId]: value };
    setExerciseWeights(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pf_weights`, JSON.stringify(updated));
    }
  };

  const calculateDayProgress = () => {
    const totalSets = currentDayWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
    if (totalSets === 0) return 100;
    const doneSets = currentDayWorkout.exercises.reduce((acc, ex) => acc + (completedSets[ex.id] || 0), 0);
    return Math.min(100, Math.floor((doneSets / totalSets) * 100));
  };

  const progressPct = calculateDayProgress();
  const stepProgressPct = Math.min(100, Math.floor((treadmillMinutes / TREADMILL_GOAL) * 100));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Location Badge */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <MapPin className="w-3.5 h-3.5 text-system-blue" />
            <span>Japanese Samurai Quiet Apartment Bodyweight Dojo | 7-Day Routine</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Japanese Samurai Home Bodyweight Dojo
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Tailored specifically for quiet apartment bodyweight training (silent, no equipment needed, zero floor impact). Daily dual cardio: 15-minute run + 30-minute brisk walk. Sunday is Active Recovery Dojo & Flexibility Sculpt; Monday is Japanese Upper Body Sculpt + Auburn Walmart Grocery Run & Pan/Oven Crispy Fried Teriyaki Batch Meal Prep.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-system-dark/80 px-4 py-2.5 rounded-xl border border-system-blue/20">
          <Trophy className="w-6 h-6 text-system-gold" />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Quest Reward</div>
            <div className="text-sm font-black text-system-gold font-mono">+ {currentDayWorkout.xpReward} XP & STR Boost</div>
          </div>
        </div>
      </div>

      {/* POST-WORKOUT 45-MINUTE DUAL CARDIO LOG */}
      <div className="bg-gradient-to-br from-system-panel via-system-card to-system-dark p-6 rounded-2xl border border-system-cyan/50 shadow-glow-blue space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-gold mb-1">
              <Footprints className="w-4 h-4 text-system-cyan animate-pulse" />
              <span>Mandatory Daily Post-Workout Dual Cardio Protocol</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-wide">
              {treadmillMinutes} / {TREADMILL_GOAL} <span className="text-sm text-zinc-400 font-bold">Minutes Today (30m Brisk Walk + 15m Run)</span>
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">
              Perform your mandatory 45-minute dual cardio routine 7 days a week (30 minutes brisk walking + 15 minutes running outdoors or indoors). Essential for hitting your 160 lb target cleanly without muscle loss or loose skin!
            </p>
          </div>

          <div className="w-full md:w-64 bg-system-dark/80 p-3.5 rounded-xl border border-system-blue/30 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Cardio Goal (45m)</span>
              <span className="text-system-cyan font-mono">{stepProgressPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-system-blue via-system-cyan to-green-400 rounded-full transition-all duration-300 shadow-glow-blue"
                style={{ width: `${stepProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Log Buttons & Custom Input */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase mr-1">Quick Add:</span>
            <button
              onClick={() => handleAddMinutes(15)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-white/10 hover:border-system-cyan text-xs font-bold text-white hover:bg-system-blue/20 transition-all flex items-center gap-1.5"
            >
              <Footprints className="w-3.5 h-3.5 text-system-cyan" />
              <span>+15 Mins (Run Protocol)</span>
            </button>
            <button
              onClick={() => handleAddMinutes(30)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-white/10 hover:border-system-cyan text-xs font-bold text-white hover:bg-system-blue/20 transition-all flex items-center gap-1.5"
            >
              <Footprints className="w-3.5 h-3.5 text-system-gold" />
              <span>+30 Mins (Walk Protocol)</span>
            </button>
            <button
              onClick={() => handleAddMinutes(45)}
              className="px-3.5 py-2 rounded-xl bg-system-dark border border-system-blue/50 hover:border-system-cyan text-xs font-bold text-system-cyan hover:bg-system-blue hover:text-black transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>+45 Mins (Full Walk+Run Goal!)</span>
            </button>
          </div>

          <form onSubmit={handleCustomMinutesSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Custom mins..."
              value={customMinutesInput}
              onChange={(e) => setCustomMinutesInput(e.target.value)}
              className="w-28 bg-system-dark border border-system-blue/40 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-system-cyan"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-system-blue text-black font-black text-xs uppercase tracking-wider hover:bg-white transition-all"
            >
              Log
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset today's treadmill minutes to 0?")) setTreadmillMinutes(0);
              }}
              title="Reset minutes"
              className="p-2 rounded-xl bg-system-dark border border-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {PLANET_FITNESS_PPL_ROUTINE.map((day) => {
          const isSelected = selectedDay === day.dayOfWeek;
          const isToday = new Date().getDay() === day.dayOfWeek;
          return (
            <button
              key={day.dayOfWeek}
              onClick={() => {
                setSelectedDay(day.dayOfWeek);
                setQuestCleared(false);
              }}
              className={`flex-shrink-0 px-4 py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-system-blue text-system-dark border-system-blue font-black shadow-glow-blue scale-105'
                  : isToday
                  ? 'bg-system-card text-system-cyan border-system-cyan/50 hover:bg-system-blue/10'
                  : 'bg-system-panel text-zinc-400 border-white/10 hover:border-system-blue/30 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                {day.dayName}
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-system-cyan animate-ping" title="Today" />}
              </span>
              <span className={`text-[10px] font-mono ${isSelected ? 'text-system-dark/80' : 'text-zinc-500'}`}>
                {day.isRestDay ? 'Rest & Prep' : day.splitName.split('(')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Banner & Progress */}
      <div className="bg-system-card p-6 rounded-2xl border border-system-blue/20 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded ${
                currentDayWorkout.isRestDay ? 'bg-system-gold text-system-dark' : 'bg-system-blue text-system-dark'
              }`}>
                {currentDayWorkout.splitName}
              </span>
            </div>
            <h3 className="text-xl font-black text-white uppercase mt-1">
              {currentDayWorkout.questTitle}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              {currentDayWorkout.description}
            </p>
          </div>

          {!currentDayWorkout.isRestDay && (
            <div className="w-full md:w-64 bg-system-panel p-3.5 rounded-xl border border-system-blue/20 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Dungeon Completion</span>
                <span className="text-system-cyan font-mono">{progressPct}%</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-system-blue to-system-cyan rounded-full transition-all duration-300 shadow-glow-blue"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* General Feature: Rest & Recovery Timer Stopwatch */}
      {!currentDayWorkout.isRestDay && <RestTimerBar />}

      {/* Exercises List */}
      <div className="space-y-4">
        {currentDayWorkout.exercises.map((exercise, idx) => {
          const doneSets = completedSets[exercise.id] || 0;
          const isComplete = doneSets >= exercise.sets;
          const weightVal = exerciseWeights[exercise.id] || '';

          return (
            <div
              key={exercise.id}
              className={`rounded-2xl p-5 border transition-all duration-300 ${
                isComplete
                  ? 'bg-system-panel/50 border-green-500/40 shadow-sm opacity-85'
                  : 'bg-system-panel border-system-blue/30 shadow-md hover:border-system-blue/60'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                
                {/* Exercise Name & Equipment */}
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-base flex-shrink-0 mt-0.5 ${
                    isComplete ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-system-card text-system-cyan border border-system-blue/40 shadow-glow-blue'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className={`text-base font-black uppercase tracking-wide ${isComplete ? 'text-green-400 line-through' : 'text-white'}`}>
                        {exercise.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                        {exercise.targetGroup}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-system-blue/10 text-system-cyan border border-system-blue/30">
                        {exercise.equipment}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed flex items-start gap-1 pt-1">
                      <Info className="w-3.5 h-3.5 text-system-gold flex-shrink-0 mt-0.5" />
                      <span><strong className="text-system-gold">Coach Tip:</strong> {exercise.coachTip}</span>
                    </p>
                  </div>
                </div>

                {/* Sets & Weight Input Action */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-3.5 lg:pt-0 border-white/10">
                  
                  {/* Weight / Reps Input */}
                  {!currentDayWorkout.isRestDay && (
                    <div className="flex items-center justify-between sm:justify-start gap-2 bg-system-dark px-3.5 py-2 rounded-xl border border-white/10 shadow-inner">
                      <span className="text-xs text-zinc-400 font-bold uppercase font-mono">Weight / Reps:</span>
                      <input
                        type="text"
                        placeholder="e.g. 185 lbs x 8"
                        value={weightVal}
                        onChange={(e) => handleWeightChange(exercise.id, e.target.value)}
                        className="w-36 bg-transparent text-xs sm:text-sm font-mono font-bold text-white focus:outline-none placeholder:text-zinc-600 text-right"
                      />
                    </div>
                  )}

                  {/* Set Checkboxes */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleSetToggle(exercise.id, exercise.sets)}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all min-h-[44px] ${
                        isComplete
                          ? 'bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500/30 font-black shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                          : 'bg-gradient-to-r from-system-blue/20 to-system-cyan/20 text-system-cyan border border-system-blue hover:bg-system-blue hover:text-black shadow-glow-blue font-black'
                      }`}
                    >
                      {isComplete ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span>Cleared ({exercise.sets}/{exercise.sets})</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span>Log Set ({doneSets}/{exercise.sets})</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
