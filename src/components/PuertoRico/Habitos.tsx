"use client";

import React, { useState, useEffect } from "react";
import { getPRData, PRStorageData } from "@/lib/pr-storage";
import { Target, Droplets, Brain, BookOpen, Dumbbell, Palette, Book, Flame } from "lucide-react";

const HABITS = [
  { id: "h0", title: "16oz Water Upon Waking", icon: Droplets, color: "#00f0ff" },
  { id: "h1", title: "Anki Flashcards (Kaishi & Kanji)", icon: Brain, color: "#4ade80" },
  { id: "h2", title: "Digital Art Course 1", icon: Palette, color: "#0a3d8f" },
  { id: "h3", title: "Workout (160lbs)", icon: Dumbbell, color: "#ff3366" },
  { id: "h4", title: "Digital Art Course 2", icon: Palette, color: "#ce1126" },
  { id: "h5", title: "Digital Art Course 3", icon: Palette, color: "#ce1126" },
  { id: "h6", title: "ProCreate Practice", icon: Palette, color: "#f5a623" },
  { id: "h7", title: "Journal / Planning", icon: Book, color: "#ffffff" }
];

export default function Habitos() {
  const [data, setData] = useState<PRStorageData | null>(null);

  useEffect(() => {
    setData(getPRData());
    const handleUpdate = () => setData(getPRData());
    window.addEventListener("prDataUpdated", handleUpdate);
    return () => window.removeEventListener("prDataUpdated", handleUpdate);
  }, []);

  if (!data) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  const habitsDone = HABITS.filter(h => data.habitHistory[`${todayStr}-${h.id}`]).length;
  const totalHabits = 8;
  const progress = (habitsDone / totalHabits) * 100;
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Generate last 30 days for heatmap
  const heatmapDays = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  const getDayScore = (date: string) => {
    return HABITS.filter(h => data.habitHistory[`${date}-${h.id}`]).length;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Ring */}
        <div className="md:col-span-1 bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ce1126]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <h2 className="text-xl font-black text-white mb-8 tracking-tight z-10">Today</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(206,17,38,0.4)]">
              <circle cx="96" cy="96" r="60" className="stroke-white/5" strokeWidth="12" fill="none" />
              <circle
                cx="96"
                cy="96"
                r="60"
                className="stroke-[#ce1126]"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white font-mono drop-shadow-md">{habitsDone}</span>
              <span className="text-xs text-zinc-400 font-bold font-mono mt-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/5 shadow-inner">/ {totalHabits} completed</span>
            </div>
          </div>
          
          <div className="bg-black/30 px-4 py-1.5 rounded-full border border-white/5 shadow-inner z-10">
            <p className="text-sm font-mono font-bold text-[#f5a623]">{progress.toFixed(0)}% of System</p>
          </div>
        </div>

        {/* Streaks */}
        <div className="md:col-span-2 bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <Flame className="w-6 h-6 text-[#ce1126] drop-shadow-[0_0_8px_rgba(206,17,38,0.6)]" /> Habit Streaks
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HABITS.map(h => {
              const streak = data.habitStreaks[h.id] ? data.habitStreaks[h.id] : 0;
              const doneToday = data.habitHistory[`${todayStr}-${h.id}`] ? true : false;
              
              return (
                <div key={h.id} className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${doneToday ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-black/30 border-white/5 hover:border-white/10 hover:bg-black/40'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-black/40 border border-white/5 shadow-inner transition-transform group-hover:scale-110 ${doneToday ? 'ring-1 ring-white/20' : ''}`}>
                      <h.icon className="w-5 h-5" style={{ color: h.color }} />
                    </div>
                    <span className={`text-sm font-bold tracking-wide transition-colors ${doneToday ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{h.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded-lg border border-white/10 shadow-inner">
                    <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-[#f5a623] drop-shadow-[0_0_5px_rgba(245,166,35,0.8)]' : 'text-zinc-600'}`} />
                    <span className="font-mono text-sm font-black text-white">{streak}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 30 Day Heatmap */}
      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative">
        <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <Target className="w-6 h-6 text-[#0a3d8f] drop-shadow-[0_0_8px_rgba(10,61,143,0.6)]" /> Last 30 Days
        </h3>
        
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {heatmapDays.map((dateStr, i) => {
            const score = getDayScore(dateStr);
            let bgColor = "bg-black/40 border-white/5"; // 0
            if (score > 0) bgColor = "bg-[#ce1126]/20 border-[#ce1126]/30"; // 1-3
            if (score >= 4) bgColor = "bg-[#ce1126]/60 border-[#ce1126]/80"; // 4-6
            if (score >= 7) bgColor = "bg-[#ce1126] border-[#ce1126] shadow-[0_0_12px_rgba(206,17,38,0.6)]"; // 7-8

            const isToday = dateStr === todayStr;

            return (
              <div 
                key={dateStr}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group relative ${bgColor} hover:scale-110 hover:z-10 cursor-pointer ${isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-[#11182c]' : ''}`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center z-20 w-max bg-white text-black font-mono px-3 py-2 rounded-lg shadow-xl border border-white/20">
                  <span className="text-xs font-bold mb-1 opacity-60 uppercase">{dateStr}</span>
                  <span className="text-sm font-black text-[#ce1126]">{score}/8 Habits</span>
                  <div className="absolute top-full w-3 h-3 bg-white rotate-45 border-r border-b border-white/20" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex items-center justify-end gap-3 text-xs font-mono font-bold text-zinc-400 bg-black/20 p-2 rounded-xl w-fit ml-auto border border-white/5">
          <span className="uppercase tracking-widest opacity-70">Less</span>
          <div className="flex gap-1.5">
            <div className="w-4 h-4 rounded-md border border-white/5 bg-black/40" />
            <div className="w-4 h-4 rounded-md border border-[#ce1126]/30 bg-[#ce1126]/20" />
            <div className="w-4 h-4 rounded-md border border-[#ce1126]/80 bg-[#ce1126]/60" />
            <div className="w-4 h-4 rounded-md border border-[#ce1126] bg-[#ce1126]" />
          </div>
          <span className="uppercase tracking-widest opacity-70">More</span>
        </div>
      </div>

    </div>
  );
}
