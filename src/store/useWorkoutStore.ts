// Workout Store: 6-Day Calisthenics Program Tracker & Live Rest Timer
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CalisthenicsIntensity,
  DayOfWeek,
  DailyWorkoutRoutine,
  LoggedWorkoutSession,
  ExerciseSet,
  WorkoutProgramMode,
} from '../types';
import { CALISTHENICS_SCHEDULE } from '../data/calisthenicsPlans';
import { BLADDER_ROUTINE } from '../data/bladderSupportPlan';
import { FUTURE_DUMBBELL_SCHEDULE } from '../data/futureEquipmentWorkouts';
import { soundManager } from '../lib/sound';
import confetti from 'canvas-confetti';
import { getTodayDateString } from './useNutritionStore';
import { triggerAutoSync } from './useSyncStore';
import { getSupabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';

export function getCurrentDayOfWeek(): DayOfWeek {
  const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const map: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return map[dayIndex];
}

interface ActiveSessionExercise {
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSet[];
}

interface RestTimerState {
  isActive: boolean;
  remainingSeconds: number;
  totalSeconds: number;
  exerciseName: string;
}

interface WorkoutState {
  currentTier: CalisthenicsIntensity;
  selectedDay: DayOfWeek;
  selectedProgram: 'calisthenics' | 'weighted';
  equipmentMode: WorkoutProgramMode;
  activeSession: {
    date: string;
    day: DayOfWeek;
    intensity: CalisthenicsIntensity;
    focusTitle: string;
    startedAt: string;
    isCompleted: boolean;
    programMode?: 'calisthenics' | 'weighted';
    exercises: ActiveSessionExercise[];
  } | null;
  restTimer: RestTimerState;
  history: LoggedWorkoutSession[];

  // Actions
  setTier: (tier: CalisthenicsIntensity) => void;
  setSelectedDay: (day: DayOfWeek) => void;
  setSelectedProgram: (program: 'calisthenics' | 'weighted') => void;
  setEquipmentMode: (mode: WorkoutProgramMode) => void;
  startWorkout: (day?: DayOfWeek, tier?: CalisthenicsIntensity) => void;
  startWeightedWorkout: (day?: DayOfWeek) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<ExerciseSet>
  ) => void;
  toggleSetCompleted: (exerciseIndex: number, setIndex: number) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  finishWorkout: () => LoggedWorkoutSession | null;
  cancelWorkout: () => void;

  // Bladder Support Actions
  logBladderSession: (customNotes?: string) => LoggedWorkoutSession;
  isBladderCompletedToday: () => boolean;

  // Progressive Overload & PRs
  getExerciseLastPerformance: (exerciseId: string) => {
    loadLbs?: number;
    actualReps: number;
    date: string;
  } | null;
  getExercisePR: (exerciseId: string) => {
    maxLoadLbs: number;
    maxRepsAtMaxLoad: number;
  } | null;

  // History & Deletion
  deleteWorkoutSession: (sessionId: string) => void;

  // Rest Timer actions
  startRestTimer: (seconds: number, exerciseName?: string) => void;
  tickRestTimer: () => void;
  stopRestTimer: () => void;
  addRestSeconds: (seconds: number) => void;

  // Sync actions
  replaceHistoryForSync: (sessions: LoggedWorkoutSession[]) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentTier: 'beginner',
      selectedDay: getCurrentDayOfWeek(),
      selectedProgram: 'calisthenics',
      equipmentMode: 'calisthenics',
      activeSession: null,
      restTimer: {
        isActive: false,
        remainingSeconds: 0,
        totalSeconds: 0,
        exerciseName: '',
      },
      history: [],

      setTier: (tier) => {
        set({ currentTier: tier });
        // If an active session exists and hasn't had sets logged, re-initialize
        const active = get().activeSession;
        if (active && !active.exercises.some((e) => e.sets.some((s) => s.completed))) {
          if (active.programMode === 'weighted') {
            get().startWeightedWorkout(active.day);
          } else {
            get().startWorkout(active.day, tier);
          }
        }
      },

      setSelectedDay: (day) => {
        set({ selectedDay: day });
      },

      setSelectedProgram: (program) => {
        set({ selectedProgram: program });
      },

      setEquipmentMode: (mode) => {
        set({ equipmentMode: mode });
      },

      startWorkout: (targetDay, targetTier) => {
        const day = targetDay || get().selectedDay;
        const tier = targetTier || get().currentTier;
        const routine: DailyWorkoutRoutine = CALISTHENICS_SCHEDULE[tier][day];

        if (routine.isRestDay) {
          return;
        }

        const activeExercises: ActiveSessionExercise[] = routine.exercises.map((ex) => {
          const sets: ExerciseSet[] = [];
          for (let i = 1; i <= ex.defaultSets; i++) {
            sets.push({
              id: `set-${ex.id}-${i}-${Date.now()}`,
              setNumber: i,
              targetReps: ex.defaultReps,
              actualReps: parseInt(ex.defaultReps.split('-')[0]) || 10,
              completed: false,
            });
          }
          return {
            exerciseId: ex.id,
            exerciseName: ex.name,
            sets,
          };
        });

        set({
          activeSession: {
            date: getTodayDateString(),
            day,
            intensity: tier,
            focusTitle: routine.focusTitle,
            startedAt: new Date().toISOString(),
            isCompleted: false,
            programMode: 'calisthenics',
            exercises: activeExercises,
          },
        });
      },

      startWeightedWorkout: (targetDay) => {
        const day = targetDay || get().selectedDay;
        const routine = FUTURE_DUMBBELL_SCHEDULE[day];

        if (day === 'sunday' || !routine || routine.exercises.length === 0) {
          return;
        }

        const activeExercises: ActiveSessionExercise[] = routine.exercises.map((ex) => {
          const sets: ExerciseSet[] = [];
          const lastPerf = get().getExerciseLastPerformance(ex.id);

          let defaultWeight = 20;
          if (lastPerf?.loadLbs) {
            defaultWeight = lastPerf.loadLbs;
          } else if (ex.suggestedWeightLbs) {
            const match = ex.suggestedWeightLbs.match(/\d+/);
            if (match) defaultWeight = parseInt(match[0], 10);
          }

          const defaultReps = lastPerf?.actualReps || (parseInt(ex.defaultReps.split('-')[0], 10) || 10);

          for (let i = 1; i <= ex.defaultSets; i++) {
            sets.push({
              id: `set-${ex.id}-${i}-${Date.now()}`,
              setNumber: i,
              targetReps: ex.defaultReps,
              actualReps: defaultReps,
              loadLbs: defaultWeight,
              completed: false,
            });
          }
          return {
            exerciseId: ex.id,
            exerciseName: ex.name,
            sets,
          };
        });

        set({
          activeSession: {
            date: getTodayDateString(),
            day,
            intensity: 'intermediate',
            focusTitle: routine.focusTitle,
            startedAt: new Date().toISOString(),
            isCompleted: false,
            programMode: 'weighted',
            exercises: activeExercises,
          },
        });
      },

      updateSet: (exerciseIndex, setIndex, updates) => {
        const active = get().activeSession;
        if (!active) return;

        const updatedExercises = [...active.exercises];
        const targetExercise = { ...updatedExercises[exerciseIndex] };
        const targetSets = [...targetExercise.sets];

        targetSets[setIndex] = {
          ...targetSets[setIndex],
          ...updates,
        };

        targetExercise.sets = targetSets;
        updatedExercises[exerciseIndex] = targetExercise;

        set({
          activeSession: {
            ...active,
            exercises: updatedExercises,
          },
        });
      },

      toggleSetCompleted: (exerciseIndex, setIndex) => {
        const active = get().activeSession;
        if (!active) return;

        const currentSet = active.exercises[exerciseIndex]?.sets[setIndex];
        if (!currentSet) return;

        const newCompleted = !currentSet.completed;
        get().updateSet(exerciseIndex, setIndex, { completed: newCompleted });

        // If completed, trigger rest timer automatically based on exercise default rest
        if (newCompleted) {
          let restTime = 60;
          let exerciseName = 'Rest Interval';
          if (active.programMode === 'weighted') {
            const routine = FUTURE_DUMBBELL_SCHEDULE[active.day];
            const exDef = routine?.exercises[exerciseIndex];
            restTime = exDef?.restSeconds || 75;
            exerciseName = exDef?.name || 'Rest Interval';
          } else {
            const routine = CALISTHENICS_SCHEDULE[active.intensity][active.day];
            const exerciseDef = routine?.exercises[exerciseIndex];
            restTime = exerciseDef?.restSeconds || 60;
            exerciseName = exerciseDef?.name || 'Rest Interval';
          }
          get().startRestTimer(restTime, exerciseName);
        }

        triggerAutoSync(3000);
      },

      addSetToExercise: (exerciseIndex) => {
        const active = get().activeSession;
        if (!active) return;

        const updatedExercises = [...active.exercises];
        const targetEx = { ...updatedExercises[exerciseIndex] };
        const newSetNumber = targetEx.sets.length + 1;
        const lastSet = targetEx.sets[targetEx.sets.length - 1];

        targetEx.sets = [
          ...targetEx.sets,
          {
            id: `set-extra-${Date.now()}`,
            setNumber: newSetNumber,
            targetReps: lastSet?.targetReps || '8-12',
            actualReps: lastSet?.actualReps || 10,
            loadLbs: lastSet?.loadLbs || 0,
            completed: false,
          },
        ];

        updatedExercises[exerciseIndex] = targetEx;
        set({
          activeSession: {
            ...active,
            exercises: updatedExercises,
          },
        });
      },

      finishWorkout: () => {
        const active = get().activeSession;
        if (!active) return null;

        const completedSession: LoggedWorkoutSession = {
          id: `workout-${Date.now()}`,
          date: active.date,
          day: active.day,
          intensity: active.intensity,
          focusTitle: active.focusTitle,
          startedAt: active.startedAt,
          completedAt: new Date().toISOString(),
          isCompleted: true,
          programMode: active.programMode || 'calisthenics',
          exerciseLogs: active.exercises,
        };

        // Trigger celebratory audio and confetti
        soundManager.playWorkoutComplete();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F59E0B', '#10B981', '#06B6D4', '#8B5CF6'],
          });
        } catch {
          // ignore if canvas unavailable
        }

        set({
          history: [completedSession, ...get().history],
          activeSession: null,
          restTimer: {
            isActive: false,
            remainingSeconds: 0,
            totalSeconds: 0,
            exerciseName: '',
          },
        });

        triggerAutoSync(300);
        return completedSession;
      },

      cancelWorkout: () => {
        set({
          activeSession: null,
          restTimer: {
            isActive: false,
            remainingSeconds: 0,
            totalSeconds: 0,
            exerciseName: '',
          },
        });
      },

      startRestTimer: (seconds, exerciseName = 'Rest') => {
        set({
          restTimer: {
            isActive: true,
            remainingSeconds: seconds,
            totalSeconds: seconds,
            exerciseName,
          },
        });
      },

      tickRestTimer: () => {
        const timer = get().restTimer;
        if (!timer.isActive) return;

        if (timer.remainingSeconds <= 1) {
          soundManager.playTimerDone();
          set({
            restTimer: {
              ...timer,
              isActive: false,
              remainingSeconds: 0,
            },
          });
        } else {
          // Play tick for last 3 seconds
          if (timer.remainingSeconds <= 4 && timer.remainingSeconds > 1) {
            soundManager.playCountdownTick();
          }
          set({
            restTimer: {
              ...timer,
              remainingSeconds: timer.remainingSeconds - 1,
            },
          });
        }
      },

      stopRestTimer: () => {
        set({
          restTimer: {
            isActive: false,
            remainingSeconds: 0,
            totalSeconds: 0,
            exerciseName: '',
          },
        });
      },

      addRestSeconds: (seconds) => {
        const timer = get().restTimer;
        set({
          restTimer: {
            ...timer,
            remainingSeconds: timer.remainingSeconds + seconds,
            totalSeconds: timer.totalSeconds + seconds,
          },
        });
      },

      replaceHistoryForSync: (sessions) => {
        set({ history: sessions });
      },

      logBladderSession: (customNotes?: string) => {
        const todayDate = getTodayDateString();
        const currentDay = getCurrentDayOfWeek();

        const bladderExercises = BLADDER_ROUTINE.map((ex) => {
          let setsCount = 1;
          if (ex.id === 'bladder-2') setsCount = 3; // 3 sets of quick flicks
          if (ex.id === 'bladder-4') setsCount = 2; // 2 sets of bridges

          const sets: ExerciseSet[] = [];
          for (let i = 1; i <= setsCount; i++) {
            sets.push({
              id: `set-${ex.id}-${i}-${Date.now()}`,
              setNumber: i,
              targetReps: ex.durationOrReps,
              actualReps: ex.timerSeconds ? ex.timerSeconds : 10,
              completed: true,
            });
          }

          return {
            exerciseId: ex.id,
            exerciseName: ex.name,
            sets,
          };
        });

        const completedSession: LoggedWorkoutSession = {
          id: `bladder-${Date.now()}`,
          date: todayDate,
          day: currentDay,
          intensity: 'beginner',
          focusTitle: 'Daily Overactive Bladder Support',
          startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          completedAt: new Date().toISOString(),
          isCompleted: true,
          programMode: 'bladder_support',
          notes: customNotes || 'Daily 15-min pelvic floor & diaphragmatic breathing routine completed.',
          exerciseLogs: bladderExercises,
        };

        soundManager.playWorkoutComplete();
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#6EE7B7', '#F59E0B'],
          });
        } catch {
          // ignore
        }

        set({
          history: [completedSession, ...get().history],
        });

        triggerAutoSync(300);
        return completedSession;
      },

      isBladderCompletedToday: () => {
        const today = getTodayDateString();
        return get().history.some(
          (s) => s.date === today && (s.focusTitle.includes('Bladder') || s.programMode === 'bladder_support')
        );
      },

      getExerciseLastPerformance: (exerciseId: string) => {
        const history = get().history;
        for (const session of history) {
          if (!session.exerciseLogs) continue;
          const match = session.exerciseLogs.find((e) => e.exerciseId === exerciseId);
          if (match) {
            const completedSets = match.sets.filter((s) => s.completed);
            if (completedSets.length > 0) {
              const lastSet = completedSets[completedSets.length - 1];
              return {
                loadLbs: lastSet.loadLbs,
                actualReps: lastSet.actualReps,
                date: session.date,
              };
            }
          }
        }
        return null;
      },

      getExercisePR: (exerciseId: string) => {
        const history = get().history;
        let maxWeight = 0;
        let repsAtMax = 0;

        for (const session of history) {
          if (!session.exerciseLogs) continue;
          const match = session.exerciseLogs.find((e) => e.exerciseId === exerciseId);
          if (match) {
            for (const set of match.sets) {
              if (set.completed && set.loadLbs && set.loadLbs > maxWeight) {
                maxWeight = set.loadLbs;
                repsAtMax = set.actualReps;
              }
            }
          }
        }

        if (maxWeight > 0) {
          return { maxLoadLbs: maxWeight, maxRepsAtMaxLoad: repsAtMax };
        }
        return null;
      },

      deleteWorkoutSession: (sessionId: string) => {
        set({
          history: get().history.filter((s) => s.id !== sessionId),
        });

        const supabase = getSupabase();
        const auth = useAuthStore.getState();
        if (supabase && auth.isAuthenticated && auth.user.id !== 'local-athlete') {
          supabase
            .from('workout_logs')
            .delete()
            .eq('id', sessionId)
            .eq('user_id', auth.user.id)
            .then(({ error }) => {
              if (error) console.error('Failed to delete workout log from Supabase:', error);
            });
        }

        triggerAutoSync(500);
      },
    }),
    {
      name: 'better_leveling_workout',
      partialize: (state) => ({
        currentTier: state.currentTier,
        selectedProgram: state.selectedProgram,
        equipmentMode: state.equipmentMode,
        history: state.history,
        activeSession: state.activeSession,
      }),
    }
  )
);
