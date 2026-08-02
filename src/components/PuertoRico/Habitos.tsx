"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { Target, Droplets, Brain, BookOpen, Dumbbell, Code, Palette, Book, Flame } from "lucide-react";

const HABITS = [
  { id: "h0", title: "16oz Agua al Despertar", icon: Droplets, color: "#00f0ff" },
  { id: "h1", title: "Anki Flashcards", icon: Brain, color: "#4ade80" },
  { id: "h2", title: "Español Gramática", icon: BookOpen, color: "#0a3d8f" },
  { id: "h3", title: "Entrenamiento (160lbs)", icon: Dumbbell, color: "#ff3366" },
  { id: "h4", title: "Udemy Bloque 1", icon: Code, color: "#ce1126" },
  { id: "h5", title: "Udemy Bloque 2", icon: Code, color: "#ce1126" },
  { id: "h6", title: "Estudio de Arte", icon: Palette, color: "#f5a623" },
  { id: "h7", title: "Diario / Planificación", icon: Book, color: "#ffffff" }
];

export default function Habitos() {
  const [data, setData] = useState<PRStorageData | null>(null);

  useEffect(() => {
    setData(getPRData());
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
        <div className="md:col-span-1 bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-white mb-6">Hoy</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(206,17,38,0.3)]">
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
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white font-mono">{habitsDone}</span>
              <span className="text-xs text-zinc-400 font-mono mt-1">/ {totalHabits} completados</span>
            </div>
          </div>
          <p className="text-sm font-mono text-[#f5a623]">{progress.toFixed(0)}% del Sistema</p>
        </div>

        {/* Streaks */}
        <div className="md:col-span-2 bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ce1126]" /> Racha de Hábitos
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HABITS.map(h => {
              const streak = data.habitStreaks[h.id] ? data.habitStreaks[h.id] : 0;
              const doneToday = data.habitHistory[`${todayStr}-${h.id}`] ? true : false;
              
              return (
                <div key={h.id} className={`flex items-center justify-between p-3 rounded-xl border ${doneToday ? 'bg-white/10 border-white/20' : 'bg-black/30 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <h.icon className="w-4 h-4" style={{ color: h.color }} />
                    <span className={`text-sm font-bold ${doneToday ? 'text-white' : 'text-zinc-400'}`}>{h.title}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded border border-white/5">
                    <Flame className={`w-3 h-3 ${streak > 0 ? 'text-[#f5a623]' : 'text-zinc-600'}`} />
                    <span className="font-mono text-xs font-bold text-white">{streak}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 30 Day Heatmap */}
      <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#0a3d8f]" /> Últimos 30 Días
        </h3>
        
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {heatmapDays.map((dateStr, i) => {
            const score = getDayScore(dateStr);
            let bgColor = "bg-white/5 border-white/5"; // 0
            if (score > 0) bgColor = "bg-[#ce1126]/20 border-[#ce1126]/30"; // 1-3
            if (score >= 4) bgColor = "bg-[#ce1126]/60 border-[#ce1126]/80"; // 4-6
            if (score >= 7) bgColor = "bg-[#ce1126] border-[#ce1126] shadow-[0_0_10px_rgba(206,17,38,0.6)]"; // 7-8

            const isToday = dateStr === todayStr;

            return (
              <div 
                key={dateStr}
                className={`w-8 h-8 rounded border flex items-center justify-center transition-colors group relative ${bgColor} ${isToday ? 'ring-2 ring-white ring-offset-1 ring-offset-[#11182c]' : ''}`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-10 w-max bg-black text-white text-[10px] font-mono px-2 py-1 rounded">
                  <span>{dateStr}</span>
                  <span className="text-[#f5a623]">{score}/8 Hábitos</span>
                  <div className="absolute top-full w-2 h-2 bg-black rotate-45" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-mono text-zinc-400">
          <span>Menos</span>
          <div className="w-3 h-3 rounded bg-white/5" />
          <div className="w-3 h-3 rounded bg-[#ce1126]/20" />
          <div className="w-3 h-3 rounded bg-[#ce1126]/60" />
          <div className="w-3 h-3 rounded bg-[#ce1126]" />
          <span>Más</span>
        </div>
      </div>

    </div>
  );
}