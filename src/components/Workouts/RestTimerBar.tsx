"use client";

import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, Sparkles, Bell, Volume2 } from 'lucide-react';
import { awardXp } from '@/lib/hunter-system';
import confetti from 'canvas-confetti';

export default function RestTimerBar() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [xpClaimed, setXpClaimed] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setTimerFinished(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#ffd700', '#22c55e']
        });
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
    setTimerFinished(false);
    setXpClaimed(false);
  };

  const togglePause = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setTimerFinished(false);
  };

  const handleClaimRestXp = () => {
    if (!xpClaimed && timerFinished) {
      awardXp(25, 'str');
      setXpClaimed(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-system-dark via-system-panel to-system-card p-5 rounded-2xl border border-system-blue/40 shadow-glow-blue space-y-4 animate-in fade-in duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-full bg-system-blue/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-system-blue/10 border border-system-blue flex items-center justify-center flex-shrink-0 animate-pulse-glow">
            <Timer className="w-5 h-5 text-system-blue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-system-cyan bg-system-blue/20 px-2 py-0.5 rounded border border-system-blue/30">
                ⏱️ General Hunter Feature
              </span>
              <span className="text-xs font-mono text-zinc-400">Set Recovery Engine</span>
            </div>
            <h3 className="text-base font-black text-white uppercase tracking-wider mt-0.5">
              Disciplined Rest & Stopwatch Timer
            </h3>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { label: '30s', time: 30 },
            { label: '60s', time: 60 },
            { label: '90s', time: 90 },
            { label: '2 Min', time: 120 },
            { label: '3 Min', time: 180 },
          ].map((preset) => (
            <button
              key={preset.time}
              onClick={() => startTimer(preset.time)}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs uppercase transition-all cursor-pointer ${
                totalTime === preset.time && (isRunning || timeLeft < totalTime)
                  ? 'bg-system-blue text-system-dark shadow-glow-blue scale-105'
                  : 'bg-system-dark/80 text-zinc-300 hover:text-white border border-white/10 hover:border-system-cyan/50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display & Bar */}
      <div className="bg-system-dark/90 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-white text-glow flex items-center gap-2">
            <span>{formatTime(timeLeft)}</span>
            {timerFinished && <Bell className="w-6 h-6 text-system-gold animate-bounce" />}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePause}
              disabled={timeLeft === 0 && !isRunning}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                isRunning
                  ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/30'
                  : 'bg-system-blue/20 border-system-blue/50 text-system-cyan hover:bg-system-blue/30'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
              title={isRunning ? "Pause timer" : "Start/Resume timer"}
            >
              {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-system-card/80 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Reward Claim */}
        <div className="flex-1 w-full sm:max-w-md space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold">
            <span className="text-zinc-400">Recovery Pacing</span>
            <span className={timerFinished ? "text-green-400 font-black animate-pulse" : "text-system-cyan"}>
              {timerFinished ? "SET RESTORED & READY!" : `${Math.round(progressPercentage)}% Complete`}
            </span>
          </div>
          <div className="w-full h-3 bg-black/80 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                timerFinished ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-gradient-to-r from-system-blue via-system-cyan to-white shadow-glow-blue'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {timerFinished && (
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs text-green-300 font-mono flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Optimal recovery achieved!
              </span>
              {!xpClaimed ? (
                <button
                  onClick={handleClaimRestXp}
                  className="px-3 py-1 rounded-lg bg-green-500 text-black font-black text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-md flex items-center gap-1 cursor-pointer animate-bounce"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Claim +25 Rest XP</span>
                </button>
              ) : (
                <span className="text-xs font-mono font-black text-system-gold bg-system-gold/10 px-2 py-0.5 rounded border border-system-gold/30">
                  +25 XP Claimed!
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
