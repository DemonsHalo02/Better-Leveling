// Workout Store: 6-Day Calisthenics Program Tracker & Live Rest Timer
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CalisthenicsIntensity,
  DayOfWeek,
  DailyWorkoutRoutine,
  LoggedWorkoutSession,
  ExerciseSet,
} from '../types';
import { CALISTHENICS_SCHEDULE } from '../data/calisthenicsPlans';
import { soundManager } from '../lib/sound';
import confetti from 'canvas-confetti';
import { getTodayDateString } from './useNutritionStore';
import { triggerAutoSync } from './useSyncStore';

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
  activeSession: {
    date: string;
    day: DayOfWeek;
    intensity: CalisthenicsIntensity;
    focusTitle: string;
    startedAt: string;
    isCompleted: boolean;
    exercises: ActiveSessionExercise[];
  } | null;
  restTimer: RestTimerState;
  history: LoggedWorkoutSession[];

  // Actions
  setTier: (tier: CalisthenicsIntensity) => void;
  setSelectedDay: (day: DayOfWeek) => void;
  startWorkout: (day?: DayOfWeek, tier?: CalisthenicsIntensity) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<ExerciseSet>
  ) => void;
  toggleSetCompleted: (exerciseIndex: number, setIndex: number) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  finishWorkout: () => LoggedWorkoutSession | null;
  cancelWorkout: () => void;

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
          get().startWorkout(active.day, tier);
        }
      },

      setSelectedDay: (day) => {
        set({ selectedDay: day });
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
          const routine = CALISTHENICS_SCHEDULE[active.intensity][active.day];
          const exerciseDef = routine.exercises[exerciseIndex];
          const restTime = exerciseDef?.restSeconds || 60;
          get().startRestTimer(restTime, exerciseDef?.name || 'Rest Interval');
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
    }),
    {
      name: 'better_leveling_workout',
      partialize: (state) => ({
        currentTier: state.currentTier,
        history: state.history,
        activeSession: state.activeSession,
      }),
    }
  )
);
