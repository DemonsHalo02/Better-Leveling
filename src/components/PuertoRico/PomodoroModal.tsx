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
        className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 w-14 h-14 bg-gradient-to-r from-[#ce1126] to-[#f5a623] rounded-full shadow-lg shadow-[#ce1126]/50 flex items-center justify-center text-white z-50 hover:scale-110 transition-transform"
      >
        <Timer className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#11182c] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold font-mono text-center mb-6 text-[#f5a623]">
              {isBreak ? "Descanso" : "Enfoque"}
            </h3>

            <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="45" className="stroke-white/10" strokeWidth="8" fill="none" />
                <circle
                  cx="96"
                  cy="96"
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
              <div className="absolute text-4xl font-black font-mono">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={toggleTimer}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              <button
                onClick={resetTimer}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < (sessions % 4) ? "bg-[#f5a623]" : "bg-white/20"}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-zinc-400">
              <div className="space-y-2">
                <label>Work (min)</label>
                <input
                  type="number"
                  value={workMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setWorkMinutes(isNaN(val) ? 25 : val);
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded p-2 text-center text-white outline-none focus:border-[#ce1126]"
                />
              </div>
              <div className="space-y-2">
                <label>Break (min)</label>
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setBreakMinutes(isNaN(val) ? 5 : val);
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded p-2 text-center text-white outline-none focus:border-[#4ade80]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
