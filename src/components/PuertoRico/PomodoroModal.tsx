"use client";

import React, { useState, useEffect, useRef } from "react";
import { Timer, X, Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [sessions, setSessions] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playBeep();
      if (!isBreak) {
        setSessions((s) => s + 1);
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(workMinutes * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, workMinutes, breakMinutes]);

  const playBeep = () => {
    try {
      if (!audioCtxRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      setTimeout(() => osc.stop(), 500);
    } catch (e) {
      console.error("Audio beep failed", e);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalDuration = isBreak ? breakMinutes * 60 : workMinutes * 60;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 w-14 h-14 bg-gradient-to-r from-[#ce1126] to-[#f5a623] rounded-full shadow-lg shadow-[#ce1126]/50 flex items-center justify-center text-white z-50 hover:scale-110 transition-transform border border-white/20"
      >
        <Timer className="w-6 h-6 drop-shadow-sm" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-[#11182c]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-black/50 relative overflow-hidden">
            {/* Glow effects */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 ${isBreak ? 'bg-[#4ade80]' : 'bg-[#ce1126]'}`} />
            
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors hover:scale-110 z-10">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className={`text-2xl font-black font-mono text-center mb-8 tracking-tight relative z-10 ${isBreak ? 'text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-[#f5a623] drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]'}`}>
              {isBreak ? "Break Time" : "Focus Mode"}
            </h3>

            <div className="relative w-52 h-52 mx-auto mb-8 flex items-center justify-center z-10">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
                <circle cx="104" cy="104" r="45" className="stroke-white/5" strokeWidth="8" fill="none" />
                <circle
                  cx="104"
                  cy="104"
                  r="45"
                  className={isBreak ? "stroke-[#4ade80]" : "stroke-[#ce1126]"}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute text-5xl font-black font-mono text-white drop-shadow-md">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8 relative z-10">
              <button
                onClick={toggleTimer}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-lg hover:scale-110 ${isActive ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-[#ce1126]/20 border-[#ce1126]/40 text-[#ce1126] hover:bg-[#ce1126]/30'}`}
              >
                {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/15 transition-all duration-300 text-zinc-400 hover:text-white hover:scale-110 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Session dots */}
            <div className="flex justify-center gap-3 mb-8 relative z-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${i < (sessions % 4) ? "bg-[#f5a623] border-[#f5a623] shadow-[0_0_8px_rgba(245,166,35,0.6)]" : "bg-transparent border-white/20"}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-zinc-400 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Work (min)</label>
                <input
                  type="number"
                  value={workMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setWorkMinutes(isNaN(val) ? 25 : val);
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-center text-white font-bold outline-none focus:border-[#ce1126] focus:ring-1 focus:ring-[#ce1126]/50 transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Break (min)</label>
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setBreakMinutes(isNaN(val) ? 5 : val);
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-center text-white font-bold outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]/50 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
