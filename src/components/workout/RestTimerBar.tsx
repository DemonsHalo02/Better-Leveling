import React, { useEffect } from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { Timer, X, Plus } from 'lucide-react';

export const RestTimerBar: React.FC = () => {
  const { restTimer, tickRestTimer, stopRestTimer, addRestSeconds } = useWorkoutStore();

  useEffect(() => {
    if (!restTimer.isActive) return;

    const interval = setInterval(() => {
      tickRestTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimer.isActive, tickRestTimer]);

  if (!restTimer.isActive && restTimer.remainingSeconds <= 0) return null;

  const minutes = Math.floor(restTimer.remainingSeconds / 60);
  const seconds = restTimer.remainingSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercent = restTimer.totalSeconds > 0
    ? ((restTimer.totalSeconds - restTimer.remainingSeconds) / restTimer.totalSeconds) * 100
    : 0;

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40 animate-slideUp">
      <div className="bg-dark-900/95 border border-amber-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Timer size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-dark-400">
                Rest Interval
              </div>
              <div className="text-xs font-semibold text-dark-100 truncate max-w-[130px]">
                {restTimer.exerciseName || 'Next Set Prep'}
              </div>
            </div>
          </div>

          {/* Countdown & Quick Modifiers */}
          <div className="flex items-center gap-2">
            <div className="font-mono text-xl font-bold text-amber-400 min-w-[50px] text-right">
              {formattedTime}
            </div>

            <button
              onClick={() => addRestSeconds(15)}
              className="px-2 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-mono border border-dark-700 flex items-center gap-0.5"
              title="Add 15 seconds"
            >
              <Plus size={12} />
              15s
            </button>

            <button
              onClick={stopRestTimer}
              className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-400 hover:text-dark-100 transition"
              title="Skip Rest"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-800 h-1.5 rounded-full overflow-hidden mt-2">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
