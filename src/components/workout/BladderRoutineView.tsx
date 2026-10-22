import React, { useState, useEffect } from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import {
  BLADDER_ROUTINE,
  BLADDER_HABITS,
  BLADDER_WORTH_KNOWING,
  BladderExercise,
} from '../../data/bladderSupportPlan';
import {
  Heart,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Check,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
  Droplets,
  AlertCircle,
  ShieldAlert,
  HeartHandshake,
  ArrowRight,
  Flame,
  Volume2,
} from 'lucide-react';
import { soundManager } from '../../lib/sound';
import { BladderHydrationHabitsView } from './BladderHydrationHabitsView';

export const BladderRoutineView: React.FC = () => {
  const { history, logBladderSession, isBladderCompletedToday } = useWorkoutStore();

  const isCompletedToday = isBladderCompletedToday();
  const todaysSession = history.find(
    (s) =>
      s.date === new Date().toISOString().split('T')[0] &&
      (s.focusTitle.includes('Bladder') || s.programMode === 'bladder_support')
  );

  const [activeSubTab, setActiveSubTab] = useState<'routine' | 'habits'>('routine');

  // Runner state
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [stepTimer, setStepTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [kegelPhase, setKegelPhase] = useState<'squeeze' | 'release'>('squeeze');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [enduranceHoldTarget, setEnduranceHoldTarget] = useState<5 | 10>(10);
  const [showHabitsGuide, setShowHabitsGuide] = useState<boolean>(false);

  const currentExercise: BladderExercise | null =
    activeStepIndex !== null ? BLADDER_ROUTINE[activeStepIndex] : null;

  // Active step timer ticker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && stepTimer > 0) {
      interval = setInterval(() => {
        setStepTimer((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            soundManager.playTimerDone();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, stepTimer]);

  // Breathing pacer effect (4s inhale, 6s exhale)
  useEffect(() => {
    let breathingInterval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && currentExercise?.type === 'timed_breathing') {
      breathingInterval = setInterval(() => {
        setBreathingPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      }, breathingPhase === 'inhale' ? 4000 : 6000);
    }
    return () => {
      if (breathingInterval) clearInterval(breathingInterval);
    };
  }, [isTimerRunning, currentExercise?.type, breathingPhase]);

  // Endurance Kegel pacer effect (hold target, release 10s)
  useEffect(() => {
    let kegelInterval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && currentExercise?.type === 'endurance_kegel') {
      const holdTimeMs = enduranceHoldTarget * 1000;
      const releaseTimeMs = 10000;
      kegelInterval = setInterval(() => {
        setKegelPhase((prev) => (prev === 'squeeze' ? 'release' : 'squeeze'));
      }, kegelPhase === 'squeeze' ? holdTimeMs : releaseTimeMs);
    }
    return () => {
      if (kegelInterval) clearInterval(kegelInterval);
    };
  }, [isTimerRunning, currentExercise?.type, kegelPhase, enduranceHoldTarget]);

  const handleStartStep = (index: number) => {
    setActiveStepIndex(index);
    const ex = BLADDER_ROUTINE[index];
    const initialSeconds = ex.timerSeconds || 60;
    setStepTimer(initialSeconds);
    setIsTimerRunning(true);
    setBreathingPhase('inhale');
    setKegelPhase('squeeze');
  };

  const handleToggleStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleNextStep = () => {
    if (activeStepIndex === null) return;
    const currentId = BLADDER_ROUTINE[activeStepIndex].id;
    setCompletedSteps((prev) => ({ ...prev, [currentId]: true }));

    if (activeStepIndex < BLADDER_ROUTINE.length - 1) {
      handleStartStep(activeStepIndex + 1);
    } else {
      // Completed all steps
      setActiveStepIndex(null);
      setIsTimerRunning(false);
      logBladderSession();
    }
  };

  const handleFinishEntireRoutine = () => {
    // Mark all steps completed
    const allCompleted: Record<string, boolean> = {};
    BLADDER_ROUTINE.forEach((ex) => {
      allCompleted[ex.id] = true;
    });
    setCompletedSteps(allCompleted);
    setActiveStepIndex(null);
    setIsTimerRunning(false);
    logBladderSession();
  };

  // Streak calculation (consecutive days of completed bladder routines)
  const calculateStreak = (): number => {
    const dates = new Set(
      history
        .filter((h) => h.focusTitle.includes('Bladder') || h.programMode === 'bladder_support')
        .map((h) => h.date)
    );

    let streak = 0;
    const checkDate = new Date();

    // Check today or yesterday as start
    const todayStr = checkDate.toISOString().split('T')[0];
    if (dates.has(todayStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dStr = checkDate.toISOString().split('T')[0];
      if (dates.has(dStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  const getHabitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock size={16} className="text-emerald-400" />;
      case 'AlertCircle':
        return <AlertCircle size={16} className="text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert size={16} className="text-rose-400" />;
      case 'Droplets':
        return <Droplets size={16} className="text-cyan-400" />;
      case 'HeartHandshake':
        return <HeartHandshake size={16} className="text-emerald-400" />;
      default:
        return <Sparkles size={16} className="text-amber-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Overview & Daily Status Hero */}
      <div className="bg-gradient-to-br from-emerald-950/40 via-dark-850 to-dark-900 border border-emerald-800/40 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase font-bold border border-emerald-500/30 flex items-center gap-1">
                <Heart size={11} className="text-emerald-400" />
                Daily Health Priority (7 Days/Wk)
              </span>
              <span className="text-xs font-mono text-dark-400">~15 Min</span>
            </div>

            <h2 className="font-extrabold text-lg text-dark-50 tracking-tight flex items-center gap-2">
              Overactive Bladder & Pelvic Support
            </h2>
            <p className="text-xs text-dark-300 max-w-xl leading-relaxed">
              Gentle, high-precision routine designed to improve urinary frequency, calm bladder stretch receptors, and strengthen pelvic floor coordination. Sits on top of your 6-day calisthenics plan every single day.
            </p>
          </div>

          {/* Daily Status & Streak Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="p-2.5 rounded-xl bg-dark-900/90 border border-dark-750 text-center min-w-[70px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-sm">
                <Flame size={14} className="fill-amber-400" />
                <span>{currentStreak}d</span>
              </div>
              <div className="text-[10px] text-dark-400 font-medium">Streak</div>
            </div>

            {isCompletedToday ? (
              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-xs">
                  <Check size={14} />
                  <span>Done Today</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400/80">
                  {todaysSession?.completedAt
                    ? new Date(todaysSession.completedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Logged'}
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleStartStep(0)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
              >
                <Play size={15} fill="currentColor" />
                <span>Start Routine</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Consistency Cue */}
        <div className="mt-3.5 pt-3 border-t border-dark-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-dark-400">
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            <span className="text-dark-200">
              <strong>Consistency beats intensity:</strong> A relaxed 15 min every day works better than one hard session a week.
            </span>
          </div>
          <button
            onClick={() => setShowHabitsGuide(!showHabitsGuide)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-[11px] flex items-center gap-1"
          >
            <span>{showHabitsGuide ? 'Hide Everyday Habits' : 'View Habits & Bladder Diet Tips'}</span>
            <ChevronDown size={13} className={`transform transition-transform ${showHabitsGuide ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sub-Tabs: 15-Min Routine vs Hydration & Habits */}
      <div className="flex gap-2 p-1 bg-dark-900 border border-dark-750 rounded-xl">
        <button
          onClick={() => setActiveSubTab('routine')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'routine'
              ? 'bg-emerald-500 text-dark-950 shadow-sm'
              : 'text-dark-400 hover:text-dark-200'
          }`}
        >
          <Heart size={14} />
          <span>15-Min Guided Routine</span>
        </button>
        <button
          onClick={() => setActiveSubTab('habits')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'habits'
              ? 'bg-emerald-500 text-dark-950 shadow-sm'
              : 'text-dark-400 hover:text-dark-200'
          }`}
        >
          <Droplets size={14} />
          <span>Hydration & Irritants Tracker</span>
        </button>
      </div>

      {activeSubTab === 'habits' && <BladderHydrationHabitsView />}

      {activeSubTab === 'routine' && (
        <div className="space-y-4">
          {/* Habits & Diet Drawer (Collapsible) */}
          {showHabitsGuide && (
        <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 space-y-4 animate-fadeIn">
          <div>
            <h3 className="font-bold text-sm text-dark-50 flex items-center gap-2">
              <Droplets size={16} className="text-cyan-400" />
              Everyday Habits That Support Bladder Retraining
            </h3>
            <p className="text-xs text-dark-400 mt-0.5">
              Physical exercises strengthen the base; everyday fluid habits train the bladder wall to hold comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {BLADDER_HABITS.map((habit, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-dark-800 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-dark-800">{getHabitIcon(habit.icon)}</div>
                  <h4 className="font-bold text-xs text-dark-100">{habit.title}</h4>
                </div>
                <p className="text-[11px] text-dark-400 leading-relaxed pl-7">{habit.description}</p>
              </div>
            ))}
          </div>

          {/* Form Rules & Worth Knowing */}
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Info size={14} />
              <span>Crucial Technique Rules:</span>
            </div>
            <ul className="space-y-1.5 text-[11.5px] text-dark-300 list-disc list-inside">
              {BLADDER_WORTH_KNOWING.map((note, i) => (
                <li key={i} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Active Step Runner Widget (When user clicks into an exercise or starts routine) */}
      {activeStepIndex !== null && currentExercise && (
        <div className="bg-dark-900 border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-dark-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Step {activeStepIndex + 1} of {BLADDER_ROUTINE.length}
                </span>
                <h3 className="font-extrabold text-base text-dark-50">{currentExercise.name}</h3>
              </div>
              <p className="text-xs text-dark-400 mt-1">{currentExercise.durationOrReps}</p>
            </div>

            <button
              onClick={() => {
                setActiveStepIndex(null);
                setIsTimerRunning(false);
              }}
              className="px-2.5 py-1 rounded-lg text-dark-400 hover:text-dark-200 text-xs border border-dark-750"
            >
              Exit Runner
            </button>
          </div>

          {/* Interactive Visual Cue Box */}
          {currentExercise.type === 'timed_breathing' && (
            <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-dark-950/60 rounded-2xl border border-dark-800">
              <div
                className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-center transition-all duration-1000 ${
                  breathingPhase === 'inhale'
                    ? 'scale-110 border-emerald-400 bg-emerald-500/15 shadow-xl shadow-emerald-500/20'
                    : 'scale-90 border-cyan-400/80 bg-cyan-500/10'
                }`}
              >
                <div>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-dark-50">
                    {breathingPhase === 'inhale' ? 'Inhale (4s)' : 'Exhale (6s)'}
                  </div>
                  <div className="text-[10px] text-dark-400 mt-0.5">
                    {breathingPhase === 'inhale' ? 'Belly Rises' : 'Slow Mouth Release'}
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono text-dark-300 flex items-center gap-2">
                <span>Remaining: </span>
                <span className="font-bold text-emerald-400 text-sm">
                  {Math.floor(stepTimer / 60)}:{(stepTimer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}

          {currentExercise.type === 'endurance_kegel' && (
            <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-dark-950/60 rounded-2xl border border-dark-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-dark-400">Hold Duration Target:</span>
                <div className="flex rounded-lg bg-dark-900 border border-dark-750 p-0.5">
                  <button
                    onClick={() => setEnduranceHoldTarget(5)}
                    className={`px-2.5 py-0.5 text-xs font-mono rounded ${
                      enduranceHoldTarget === 5
                        ? 'bg-emerald-500 text-dark-950 font-bold'
                        : 'text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    5s (Beginner)
                  </button>
                  <button
                    onClick={() => setEnduranceHoldTarget(10)}
                    className={`px-2.5 py-0.5 text-xs font-mono rounded ${
                      enduranceHoldTarget === 10
                        ? 'bg-emerald-500 text-dark-950 font-bold'
                        : 'text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    10s (Target)
                  </button>
                </div>
              </div>

              <div
                className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-center transition-all duration-700 ${
                  kegelPhase === 'squeeze'
                    ? 'border-amber-400 bg-amber-500/15 shadow-xl shadow-amber-500/20'
                    : 'border-emerald-400/60 bg-emerald-500/10'
                }`}
              >
                <div>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-dark-50">
                    {kegelPhase === 'squeeze' ? 'Squeeze & Lift' : 'Full Release'}
                  </div>
                  <div className="text-[10px] text-dark-400 mt-1">
                    {kegelPhase === 'squeeze'
                      ? `${enduranceHoldTarget}s upward lift`
                      : '10s relaxed rest'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form instructions & cues */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-dark-850 border border-dark-750">
              <span className="font-semibold text-emerald-400 block mb-0.5 text-[11px]">Action:</span>
              <p className="text-dark-200 leading-relaxed text-[11.5px]">{currentExercise.action}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-dark-850/60 border border-dark-800 text-[11px]">
                <span className="font-semibold text-dark-400 block mb-0.5">Position:</span>
                <span className="text-dark-300">{currentExercise.position}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-850/60 border border-dark-800 text-[11px]">
                <span className="font-semibold text-dark-400 block mb-0.5">Form Cues:</span>
                <ul className="list-disc list-inside text-dark-300 space-y-0.5">
                  {currentExercise.cues.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Controls: Play/Pause, Next Step */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {currentExercise.timerSeconds && (
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-mono border border-dark-700 transition"
                >
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  const s = currentExercise.timerSeconds || 60;
                  setStepTimer(s);
                  setIsTimerRunning(true);
                }}
                className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-400 hover:text-dark-200 border border-dark-700 transition"
                title="Restart Step Timer"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <button
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
            >
              <span>{activeStepIndex === BLADDER_ROUTINE.length - 1 ? 'Finish Routine' : 'Next Step'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Routine Steps Checklist */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-dark-800">
          <div>
            <h3 className="font-bold text-sm text-dark-50">6-Step Daily Sequence</h3>
            <p className="text-xs text-dark-400">Do the steps in order. Breathe normally throughout — never hold breath.</p>
          </div>

          <button
            onClick={handleFinishEntireRoutine}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition"
          >
            <Check size={14} />
            <span>Mark Complete</span>
          </button>
        </div>

        <div className="space-y-2">
          {BLADDER_ROUTINE.map((step, idx) => {
            const isDone = completedSteps[step.id] || isCompletedToday;
            const isCurrentlyActive = activeStepIndex === idx;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition ${
                  isCurrentlyActive
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-sm'
                    : isDone
                    ? 'bg-dark-900/40 border-dark-800/80 text-dark-400'
                    : 'bg-dark-900 border-dark-750 text-dark-200 hover:border-dark-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={() => handleToggleStepCompleted(step.id)}
                      className={`mt-0.5 transition ${
                        isDone ? 'text-emerald-400' : 'text-dark-500 hover:text-dark-300'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={18} className="fill-emerald-500/20" /> : <Circle size={18} />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-dark-500">#{idx + 1}</span>
                        <h4
                          className={`font-bold text-xs sm:text-sm ${
                            isDone ? 'line-through text-dark-400' : 'text-dark-100'
                          }`}
                        >
                          {step.name}
                        </h4>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-md">
                          {step.durationOrReps}
                        </span>
                      </div>
                      <p className="text-[11px] text-dark-400 mt-1 leading-relaxed">{step.action}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartStep(idx)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-300 hover:text-dark-100 text-[11px] font-mono border border-dark-700 transition flex-shrink-0"
                  >
                    <Play size={11} fill="currentColor" />
                    <span>Run</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )}
</div>
  );
};
