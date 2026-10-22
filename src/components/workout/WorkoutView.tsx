import React, { useState } from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import {
  CALISTHENICS_TIERS,
  CALISTHENICS_SCHEDULE,
} from '../../data/calisthenicsPlans';
import { CalisthenicsIntensity, DayOfWeek } from '../../types';
import { RestTimerBar } from './RestTimerBar';
import { BladderRoutineView } from './BladderRoutineView';
import { WeightedWorkoutView } from './WeightedWorkoutView';
import {
  Flame,
  CheckCircle2,
  Circle,
  Play,
  Check,
  Plus,
  VolumeX,
  ShieldCheck,
  ChevronDown,
  Info,
  Calendar,
  Sparkles,
  Heart,
  Dumbbell,
  Activity,
} from 'lucide-react';

export const WorkoutView: React.FC = () => {
  const {
    currentTier,
    selectedDay,
    selectedProgram,
    setSelectedProgram,
    activeSession,
    setTier,
    setSelectedDay,
    startWorkout,
    updateSet,
    toggleSetCompleted,
    addSetToExercise,
    finishWorkout,
    cancelWorkout,
    isBladderCompletedToday,
  } = useWorkoutStore();

  const [sectionMode, setSectionMode] = useState<'calisthenics' | 'bladder' | 'weighted'>(
    selectedProgram === 'weighted' ? 'weighted' : 'calisthenics'
  );
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  const days: { id: DayOfWeek; short: string; label: string }[] = [
    { id: 'monday', short: 'Mon', label: 'Push A' },
    { id: 'tuesday', short: 'Tue', label: 'Pull A' },
    { id: 'wednesday', short: 'Wed', label: 'Legs A' },
    { id: 'thursday', short: 'Thu', label: 'Push B' },
    { id: 'friday', short: 'Fri', label: 'Pull B' },
    { id: 'saturday', short: 'Sat', label: 'Skill/Legs' },
    { id: 'sunday', short: 'Sun', label: 'Recovery' },
  ];

  const currentRoutine = CALISTHENICS_SCHEDULE[currentTier][selectedDay];
  const activeTierObj = CALISTHENICS_TIERS.find((t) => t.id === currentTier);

  const isSessionRunning = Boolean(
    activeSession &&
      (activeSession.programMode === 'calisthenics' || !activeSession.programMode) &&
      activeSession.day === selectedDay
  );

  const totalSets = activeSession?.exercises.reduce((sum, e) => sum + e.sets.length, 0) || 0;
  const completedSets = activeSession?.exercises.reduce(
    (sum, e) => sum + e.sets.filter((s) => s.completed).length,
    0
  ) || 0;
  const completionPct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="space-y-5 pb-28">
      {/* Rest Timer Floating Bar */}
      <RestTimerBar />

      {/* Top Program & Routine Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => {
            setSelectedProgram('calisthenics');
            setSectionMode('calisthenics');
          }}
          className={`flex items-center justify-between p-3 rounded-2xl border transition text-left ${
            sectionMode === 'calisthenics'
              ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
              : 'bg-dark-850/80 border-dark-750 text-dark-300 hover:text-dark-100 hover:bg-dark-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${
                sectionMode === 'calisthenics'
                  ? 'bg-emerald-500 text-dark-950 font-bold'
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              <Flame size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-dark-100">6-Day Calisthenics</div>
              <div className="text-[10px] text-dark-400">Pure Bodyweight & Mat</div>
            </div>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              selectedProgram === 'calisthenics'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-dark-900 border-dark-750 text-dark-400'
            }`}
          >
            {selectedProgram === 'calisthenics' ? 'Active' : 'Switch'}
          </span>
        </button>

        <button
          onClick={() => setSectionMode('bladder')}
          className={`flex items-center justify-between p-3 rounded-2xl border transition text-left ${
            sectionMode === 'bladder'
              ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
              : 'bg-dark-850/80 border-dark-750 text-dark-300 hover:text-dark-100 hover:bg-dark-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${
                sectionMode === 'bladder'
                  ? 'bg-emerald-500 text-dark-950 font-bold'
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              <Heart size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-dark-100">Daily Bladder Support</div>
              <div className="text-[10px] text-dark-400">~15 Min • Everyday</div>
            </div>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isBladderCompletedToday()
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/50'
            }`}
          >
            {isBladderCompletedToday() ? '● Done' : '○ Daily'}
          </span>
        </button>

        <button
          onClick={() => {
            setSelectedProgram('weighted');
            setSectionMode('weighted');
          }}
          className={`flex items-center justify-between p-3 rounded-2xl border transition text-left ${
            sectionMode === 'weighted'
              ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-md shadow-amber-500/10'
              : 'bg-dark-850/80 border-dark-750 text-dark-300 hover:text-dark-100 hover:bg-dark-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${
                sectionMode === 'weighted'
                  ? 'bg-amber-500 text-dark-950 font-bold'
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              <Dumbbell size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-dark-100">6-Day Weighted Workout</div>
              <div className="text-[10px] text-dark-400">Dumbbells & Treadmill</div>
            </div>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              selectedProgram === 'weighted'
                ? 'bg-amber-950 text-amber-300 border-amber-800'
                : 'bg-dark-900 border-dark-750 text-dark-400'
            }`}
          >
            {selectedProgram === 'weighted' ? 'Active' : 'Switch'}
          </span>
        </button>
      </div>

      {/* RENDER SELECTED VIEW */}
      {sectionMode === 'bladder' && <BladderRoutineView />}

      {sectionMode === 'weighted' && (
        <WeightedWorkoutView
          onSwitchToCalisthenics={() => {
            setSelectedProgram('calisthenics');
            setSectionMode('calisthenics');
          }}
        />
      )}

      {sectionMode === 'calisthenics' && (
        <div className="space-y-4">
          {/* Daily Bladder Routine Callout Banner */}
          <div className="p-3.5 rounded-2xl bg-dark-850/90 border border-dark-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Heart size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-dark-100">
                    Daily Secondary Routine: Bladder Support
                  </span>
                  {isBladderCompletedToday() ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Completed Today
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50">
                      Pending Today (~15m)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-dark-400 mt-0.5">
                  Gentle diaphragmatic breathing & pelvic floor coordination. Sits on top of calisthenics 7 days a week.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSectionMode('bladder')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition whitespace-nowrap self-start sm:self-auto"
            >
              {isBladderCompletedToday() ? 'View Bladder Routine' : 'Start Bladder Routine (15m)'}
            </button>
          </div>

          {/* Tier Selector Card */}
          <div className="bg-dark-850/80 border border-dark-750 rounded-2xl p-4 backdrop-blur shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Flame size={18} />
                  </div>
                  <h2 className="font-extrabold text-base text-dark-50">
                    6-Day Calisthenics Program
                  </h2>
                </div>
                <p className="text-xs text-dark-400 mt-0.5">
                  Strictly bodyweight & mat only. 100% silent apartment-friendly.
                </p>
              </div>

              {/* Program Status & Apartment Silent Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                {selectedProgram === 'calisthenics' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-[11px] font-mono text-emerald-300 font-bold">
                    <Check size={13} className="text-emerald-400" />
                    <span>Primary Active</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedProgram('calisthenics')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-[11px] transition"
                  >
                    <Sparkles size={13} />
                    <span>Set as Active</span>
                  </button>
                )}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-300">
                  <VolumeX size={13} className="text-emerald-400" />
                  <span>Zero Jumping</span>
                </div>
              </div>
            </div>

            {/* 4 Intensity Tier Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {CALISTHENICS_TIERS.map((tier) => {
                const isSelected = currentTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setTier(tier.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'bg-dark-900/60 border-dark-750 text-dark-400 hover:text-dark-200 hover:bg-dark-800'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{tier.name}</div>
                    <div className="text-[10px] text-dark-400 truncate mt-0.5">
                      {tier.tagline.split('&')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {activeTierObj && (
              <div className="mt-3 p-2.5 rounded-xl bg-dark-900/60 border border-dark-800 text-[11px] text-dark-300 flex items-start gap-2">
                <Info size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>{activeTierObj.description}</p>
              </div>
            )}
          </div>

          {/* 6-Day Schedule Bar */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {days.map((day) => {
              const isSelected = selectedDay === day.id;
              const isRest = day.id === 'sunday';

              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`flex-1 min-w-[58px] py-2 px-1.5 rounded-xl border text-center transition ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 font-bold'
                      : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                  }`}
                >
                  <div className="text-xs uppercase font-mono">{day.short}</div>
                  <div className="text-[10px] font-normal truncate mt-0.5 opacity-80">
                    {isRest ? 'Rest' : day.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Day Routine Card & Active Session Controls */}
          <div className="bg-dark-850/80 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            {/* Routine Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-800 text-amber-400 font-bold uppercase">
                    {selectedDay}
                  </span>
                  <h3 className="font-bold text-base text-dark-50">
                    {currentRoutine.focusTitle}
                  </h3>
                </div>
                <p className="text-xs text-dark-400 mt-1">{currentRoutine.subtitle}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentRoutine.targetAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 rounded-md bg-dark-800 border border-dark-750 text-[10px] font-mono text-dark-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              {!currentRoutine.isRestDay && (
                <div>
                  {!isSessionRunning ? (
                    <button
                      onClick={() => startWorkout(selectedDay, currentTier)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Start Workout</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={cancelWorkout}
                        className="px-3 py-2 rounded-xl border border-dark-750 text-dark-400 hover:text-dark-200 text-xs transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={finishWorkout}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
                      >
                        <Check size={16} />
                        <span>Complete ({completedSets}/{totalSets})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Active Session Progress Bar */}
            {isSessionRunning && (
              <div className="bg-dark-900 p-3 rounded-xl border border-dark-750 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">
                    Workout in Progress ({completionPct}% Complete)
                  </span>
                  <span className="text-dark-400">
                    {completedSets} of {totalSets} Sets
                  </span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Rest Day Message */}
            {currentRoutine.isRestDay ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-dark-800 text-emerald-400 flex items-center justify-center mx-auto">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-bold text-sm text-dark-100">Sunday Rest & Active Recovery</h4>
                <p className="text-xs text-dark-400 max-w-sm mx-auto">
                  Muscles repair, tendons remodel, and glycogen stores replenish on rest days. Focus on hydration, gentle mobility, and adequate protein intake.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSectionMode('bladder')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
                  >
                    <Heart size={14} />
                    <span>Complete Sunday Bladder Routine (~15m)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Exercise List */
              <div className="space-y-3">
                {currentRoutine.exercises.map((exercise, exIndex) => {
                  const isExpanded = expandedExerciseId === exercise.id;
                  const sessionExercise = activeSession?.exercises[exIndex];

                  return (
                    <div
                      key={exercise.id}
                      className="rounded-xl bg-dark-900/70 border border-dark-750/90 overflow-hidden transition"
                    >
                      {/* Exercise Header */}
                      <div className="p-3.5 flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-dark-400">
                              #{exIndex + 1}
                            </span>
                            <h4 className="font-bold text-xs sm:text-sm text-dark-50">
                              {exercise.name}
                            </h4>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] font-mono text-dark-400">
                            <span className="text-emerald-400 font-semibold">
                              {exercise.defaultSets} Sets × {exercise.defaultReps}
                            </span>
                            {exercise.tempo && <span>• Tempo: {exercise.tempo}</span>}
                            <span>• Rest: {exercise.restSeconds}s</span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedExerciseId(isExpanded ? null : exercise.id)
                          }
                          className="p-1 rounded-lg text-dark-400 hover:text-dark-200 transition"
                          title="View form cues"
                        >
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              isExpanded ? 'rotate-180 text-emerald-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Form Cues & Apartment Tips Accordion */}
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-dark-800 text-xs space-y-2 bg-dark-950/40">
                          <div>
                            <span className="font-semibold text-dark-300 block mb-1 text-[11px]">
                              Key Form Cues:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-dark-400 text-[11px]">
                              {exercise.cues.map((cue, i) => (
                                <li key={i}>{cue}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[10.5px] text-emerald-300 flex items-start gap-1.5">
                            <ShieldCheck size={14} className="flex-shrink-0 mt-0.5 text-emerald-400" />
                            <span>
                              <strong>Apartment Tip:</strong> {exercise.apartmentSafetyTip}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Interactive Set Logger (Visible when workout is running) */}
                      {isSessionRunning && sessionExercise && (
                        <div className="px-3.5 pb-3 border-t border-dark-800/80 pt-2.5">
                          <div className="space-y-1.5">
                            {sessionExercise.sets.map((set, setIndex) => (
                              <div
                                key={set.id}
                                className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition ${
                                  set.completed
                                    ? 'bg-emerald-950/25 border border-emerald-800/30 text-emerald-300'
                                    : 'bg-dark-850/80 border border-dark-750 text-dark-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="font-bold text-[11px] text-dark-400">
                                    Set {set.setNumber}
                                  </span>
                                  <span className="text-[11px] text-dark-400">
                                    Target: {set.targetReps}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  {/* Actual Reps Input */}
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-dark-500">Reps:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      value={set.actualReps}
                                      onChange={(e) =>
                                        updateSet(exIndex, setIndex, {
                                          actualReps: parseInt(e.target.value) || 0,
                                        })
                                      }
                                      className="w-12 bg-dark-900 border border-dark-700 rounded px-1.5 py-0.5 text-center font-bold text-dark-50 focus:outline-none focus:border-emerald-400"
                                    />
                                  </div>

                                  {/* Completed Checkbox Circle */}
                                  <button
                                    onClick={() => toggleSetCompleted(exIndex, setIndex)}
                                    className={`p-1 rounded-md transition ${
                                      set.completed
                                        ? 'text-emerald-400 hover:text-emerald-300'
                                        : 'text-dark-500 hover:text-dark-300'
                                    }`}
                                    title={set.completed ? 'Mark incomplete' : 'Complete set & start rest timer'}
                                  >
                                    {set.completed ? (
                                      <CheckCircle2 size={20} className="fill-emerald-500/20" />
                                    ) : (
                                      <Circle size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Add Set Button */}
                          <button
                            onClick={() => addSetToExercise(exIndex)}
                            className="mt-2 text-[11px] font-mono text-dark-400 hover:text-emerald-400 flex items-center gap-1 transition"
                          >
                            <Plus size={13} />
                            <span>Add Extra Set</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
