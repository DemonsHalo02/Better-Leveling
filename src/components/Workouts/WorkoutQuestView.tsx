"use client";

import React, { useState, useEffect } from 'react';
import { PLANET_FITNESS_PPL_ROUTINE, WorkoutDay, Exercise } from '@/lib/workout-data';
import { awardXp, loadHunterState, saveHunterState } from '@/lib/hunter-system';
import { Dumbbell, CheckCircle2, Circle, Trophy, Info, Sparkles, MapPin, Zap } from 'lucide-react';

export default function WorkoutQuestView() {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay()); // default today
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
  const [exerciseWeights, setExerciseWeights] = useState<Record<string, string>>({});
  const [questCleared, setQuestCleared] = useState<boolean>(false);

  const currentDayWorkout = PLANET_FITNESS_PPL_ROUTINE.find(d => d.dayOfWeek === selectedDay) || PLANET_FITNESS_PPL_ROUTINE[0];

  useEffect(() => {
    // Load stored workout logs for this day
    if (typeof window !== 'undefined') {
      const savedSets = localStorage.getItem(`pf_completed_sets_${selectedDay}`);
      if (savedSets) setCompletedSets(JSON.parse(savedSets));
      else setCompletedSets({});

      const savedWeights = localStorage.getItem(`pf_weights`);
      if (savedWeights) setExerciseWeights(JSON.parse(savedWeights));
      else setExerciseWeights({});
    }
  }, [selectedDay]);

  const handleSetToggle = (exerciseId: string, maxSets: number) => {
    const current = completedSets[exerciseId] || 0;
    const next = current < maxSets ? current + 1 : 0;
    const updated = { ...completedSets, [exerciseId]: next };
    setCompletedSets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pf_completed_sets_${selectedDay}`, JSON.stringify(updated));
    }

    // Check if entire workout quest is now cleared
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

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Location Badge */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <MapPin className="w-3.5 h-3.5 text-system-blue" />
            <span>Planet Fitness Equipment Profile | Lewiston, ME</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            6-Day Push / Pull / Legs Split
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Tailored specifically for Planet Fitness Smith machines, cable towers, leg presses, and dumbbells. Sunday is reserved for System Restoration (No Workout Quests).
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
