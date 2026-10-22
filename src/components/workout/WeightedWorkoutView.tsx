import React, { useState } from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import {
  FUTURE_DUMBBELL_SCHEDULE,
  TREADMILL_PROTOCOLS,
  FutureExercise,
  TreadmillProtocol,
} from '../../data/futureEquipmentWorkouts';
import { DayOfWeek } from '../../types';
import {
  Dumbbell,
  Activity,
  Flame,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Info,
  VolumeX,
  Gauge,
  Check,
  Play,
  CheckCircle2,
  Circle,
  Plus,
  RotateCcw,
} from 'lucide-react';

interface WeightedWorkoutViewProps {
  onSwitchToCalisthenics?: () => void;
}

export const WeightedWorkoutView: React.FC<WeightedWorkoutViewProps> = ({
  onSwitchToCalisthenics,
}) => {
  const {
    selectedDay,
    setSelectedDay,
    selectedProgram,
    setSelectedProgram,
    activeSession,
    startWeightedWorkout,
    updateSet,
    toggleSetCompleted,
    addSetToExercise,
    finishWorkout,
    cancelWorkout,
    getExerciseLastPerformance,
    getExercisePR,
  } = useWorkoutStore();

  const [activeTab, setActiveTab] = useState<'dumbbells' | 'treadmill'>('dumbbells');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  const days: { id: DayOfWeek; short: string; label: string }[] = [
    { id: 'monday', short: 'Mon', label: 'Push A' },
    { id: 'tuesday', short: 'Tue', label: 'Pull A' },
    { id: 'wednesday', short: 'Wed', label: 'Legs A' },
    { id: 'thursday', short: 'Thu', label: 'Push B' },
    { id: 'friday', short: 'Fri', label: 'Pull B' },
    { id: 'saturday', short: 'Sat', label: 'Skill/Legs' },
    { id: 'sunday', short: 'Sun', label: 'Rest' },
  ];

  const currentDayRoutines = FUTURE_DUMBBELL_SCHEDULE[selectedDay];
  const isSessionRunning = Boolean(
    activeSession && activeSession.programMode === 'weighted' && activeSession.day === selectedDay
  );

  const totalSets = activeSession?.exercises.reduce((sum, e) => sum + e.sets.length, 0) || 0;
  const completedSets = activeSession?.exercises.reduce(
    (sum, e) => sum + e.sets.filter((s) => s.completed).length,
    0
  ) || 0;
  const completionPct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const sessionVolumeLbs =
    activeSession?.exercises.reduce(
      (sum, e) =>
        sum +
        e.sets.reduce((sSum, s) => {
          if (s.completed && s.loadLbs) {
            return sSum + s.loadLbs * s.actualReps;
          }
          return sSum;
        }, 0),
      0
    ) || 0;

  const isWeightedActive = selectedProgram === 'weighted';

  return (
    <div className="space-y-4">
      {/* Hero Control Banner: 6-Day Weighted Workout */}
      <div className="bg-dark-850/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Dumbbell size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-dark-50">
                  6-Day Weighted Workout
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50 font-bold">
                  Dumbbells & Treadmill
                </span>
              </div>
              <p className="text-xs text-dark-400 mt-0.5">
                Targeted progressive overload with adjustable dumbbells + silent incline treadmill protocols
              </p>
            </div>
          </div>

          {/* Program Activation Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isWeightedActive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs font-mono text-emerald-300 font-bold">
                <Check size={14} className="text-emerald-400" />
                <span>Primary Program Active</span>
              </span>
            ) : (
              <button
                onClick={() => setSelectedProgram('weighted')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
              >
                <Sparkles size={13} />
                <span>Set as Active Workout</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Mode Switcher & Explanation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-dark-800 text-xs">
          <div className="text-dark-300 text-[11.5px]">
            <span>Switch anytime: </span>
            {onSwitchToCalisthenics && (
              <button
                onClick={onSwitchToCalisthenics}
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold ml-1"
              >
                Switch back to 6-Day Calisthenics
              </button>
            )}
          </div>

          {/* Sub-Tabs: Dumbbell Split vs Treadmill Incline */}
          <div className="flex rounded-xl bg-dark-900 border border-dark-750 p-1">
            <button
              onClick={() => setActiveTab('dumbbells')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeTab === 'dumbbells'
                  ? 'bg-amber-500 text-dark-950 shadow-sm'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
            >
              <Dumbbell size={13} />
              <span>Dumbbell Routines</span>
            </button>
            <button
              onClick={() => setActiveTab('treadmill')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeTab === 'treadmill'
                  ? 'bg-amber-500 text-dark-950 shadow-sm'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
            >
              <Activity size={13} />
              <span>Treadmill Protocols</span>
            </button>
          </div>
        </div>
      </div>

      {/* DUMBBELL WORKOUT INTERACTIVE SECTION */}
      {activeTab === 'dumbbells' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Day Selector */}
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
                      ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold'
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

          {/* Routine Header & Runner Controls */}
          <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-800 text-amber-400 font-bold uppercase">
                    {selectedDay}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-dark-50">
                    {currentDayRoutines.focusTitle}
                  </h3>
                </div>
                <p className="text-xs text-dark-400 mt-1">{currentDayRoutines.subtitle}</p>
              </div>

              {/* Action Buttons: Start / Complete */}
              {selectedDay !== 'sunday' && (
                <div>
                  {!isSessionRunning ? (
                    <button
                      onClick={() => startWeightedWorkout(selectedDay)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Start Weighted Workout</span>
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
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
                <div className="flex flex-wrap justify-between items-center text-xs font-mono gap-1">
                  <span className="text-amber-400 font-bold">
                    Weighted Workout in Progress ({completionPct}% Complete)
                  </span>
                  <div className="flex items-center gap-2 text-dark-400">
                    {sessionVolumeLbs > 0 && (
                      <span className="text-amber-300 font-semibold">
                        Volume: {sessionVolumeLbs.toLocaleString()} lbs
                      </span>
                    )}
                    <span>
                      {completedSets}/{totalSets} Sets
                    </span>
                  </div>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Sunday Rest Day */}
            {selectedDay === 'sunday' ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-dark-800 text-amber-400 flex items-center justify-center mx-auto">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-bold text-sm text-dark-100">Sunday Rest & Recovery</h4>
                <p className="text-xs text-dark-400 max-w-sm mx-auto">
                  Zero heavy lifting on Sundays. Allow neuromuscular recovery, hydrate steadily, and complete your Daily Bladder Support routine!
                </p>
              </div>
            ) : (
              /* Exercises List */
              <div className="space-y-3">
                {currentDayRoutines.exercises.map((exercise: FutureExercise, exIndex) => {
                  const isExpanded = expandedExerciseId === exercise.id;
                  const sessionExercise = activeSession?.exercises[exIndex];
                  const lastPerf = getExerciseLastPerformance(exercise.id);
                  const pr = getExercisePR(exercise.id);

                  return (
                    <div
                      key={exercise.id}
                      className="rounded-xl bg-dark-900 border border-dark-750 overflow-hidden transition"
                    >
                      {/* Exercise Header */}
                      <div className="p-3.5 flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono text-dark-500">#{exIndex + 1}</span>
                            <h4 className="font-bold text-xs sm:text-sm text-dark-50">
                              {exercise.name}
                            </h4>
                            {lastPerf && (
                              <span className="px-2 py-0.5 rounded-md bg-dark-800 border border-dark-750 text-dark-300 text-[10px] font-mono">
                                Last: {lastPerf.loadLbs ? `${lastPerf.loadLbs} lbs × ` : ''}{lastPerf.actualReps}
                              </span>
                            )}
                            {pr && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-800/50 text-amber-300 text-[10px] font-mono font-bold">
                                ★ PR: {pr.maxLoadLbs} lbs
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] font-mono text-dark-400">
                            <span className="text-amber-400 font-semibold">
                              {exercise.defaultSets} Sets × {exercise.defaultReps}
                            </span>
                            {exercise.suggestedWeightLbs && (
                              <span className="text-dark-300">
                                • Suggested: {exercise.suggestedWeightLbs}
                              </span>
                            )}
                            <span>• Rest: {exercise.restSeconds}s</span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedExerciseId(isExpanded ? null : exercise.id)
                          }
                          className="p-1 rounded-lg text-dark-400 hover:text-dark-200"
                        >
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              isExpanded ? 'rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Form Cues & Safety */}
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-dark-800 text-xs space-y-2 bg-dark-950/40">
                          <div>
                            <span className="font-semibold text-dark-300 block mb-1 text-[11px]">
                              Form Cues:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-dark-400 text-[11px]">
                              {exercise.cues.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[10.5px] text-emerald-300 flex items-start gap-1.5">
                            <ShieldCheck size={14} className="flex-shrink-0 mt-0.5 text-emerald-400" />
                            <span>
                              <strong>Apartment Tip:</strong> {exercise.apartmentTip}
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
                                    ? 'bg-amber-950/25 border border-amber-800/40 text-amber-300'
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
                                  {/* Weight Input (lbs) */}
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-dark-500">Lbs:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="2.5"
                                      value={set.loadLbs || 0}
                                      onChange={(e) =>
                                        updateSet(exIndex, setIndex, {
                                          loadLbs: parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      className="w-14 bg-dark-900 border border-dark-700 rounded px-1.5 py-0.5 text-center font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                                    />
                                  </div>

                                  {/* Actual Reps Input */}
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-dark-500">Reps:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      value={set.actualReps}
                                      onChange={(e) =>
                                        updateSet(exIndex, setIndex, {
                                          actualReps: parseInt(e.target.value, 10) || 0,
                                        })
                                      }
                                      className="w-12 bg-dark-900 border border-dark-700 rounded px-1.5 py-0.5 text-center font-bold text-dark-50 focus:outline-none focus:border-amber-400"
                                    />
                                  </div>

                                  {/* Completed Button */}
                                  <button
                                    onClick={() => toggleSetCompleted(exIndex, setIndex)}
                                    className={`p-1 rounded-md transition ${
                                      set.completed
                                        ? 'text-amber-400 hover:text-amber-300'
                                        : 'text-dark-500 hover:text-dark-300'
                                    }`}
                                    title={set.completed ? 'Mark incomplete' : 'Complete set & start rest timer'}
                                  >
                                    {set.completed ? (
                                      <CheckCircle2 size={20} className="fill-amber-500/20" />
                                    ) : (
                                      <Circle size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Add Extra Set */}
                          <button
                            onClick={() => addSetToExercise(exIndex)}
                            className="mt-2 text-[11px] font-mono text-dark-400 hover:text-amber-400 flex items-center gap-1 transition"
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

      {/* TREADMILL PROTOCOLS */}
      {activeTab === 'treadmill' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 space-y-3">
            <div>
              <h3 className="font-bold text-sm text-dark-50">Treadmill Incline Protocols</h3>
              <p className="text-xs text-dark-400 mt-0.5">
                Steep incline power walking delivers high cardiovascular calorie burn with zero knee impact and silent apartment operation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TREADMILL_PROTOCOLS.map((protocol: TreadmillProtocol) => (
                <div
                  key={protocol.id}
                  className="p-4 rounded-xl bg-dark-900 border border-dark-750 space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-dark-800">
                    <h4 className="font-bold text-xs sm:text-sm text-dark-100 flex items-center gap-1.5">
                      <Gauge size={15} className="text-amber-400" />
                      <span>{protocol.title}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2 py-0.5 rounded-md">
                      {protocol.durationMinutes} Min
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-dark-850 border border-dark-800">
                      <span className="text-[10px] text-dark-400 block">Speed</span>
                      <span className="font-bold text-dark-100">{protocol.speedMph}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-850 border border-dark-800">
                      <span className="text-[10px] text-dark-400 block">Incline</span>
                      <span className="font-bold text-amber-400">{protocol.inclinePct}</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-dark-300 leading-relaxed">{protocol.description}</p>

                  <div className="p-2 rounded-lg bg-dark-850/60 border border-dark-800 text-[11px] text-dark-400">
                    <span className="font-semibold text-amber-400 block mb-0.5">Key Benefit:</span>
                    <span>{protocol.benefits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Backward-compatible alias
export const FutureEquipmentView = WeightedWorkoutView;
