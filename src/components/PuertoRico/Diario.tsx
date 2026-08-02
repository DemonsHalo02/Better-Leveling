"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { Clock, Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight, Timer } from "lucide-react";

const HORARIO = [
  { time: "6:00 AM", task: "💧 Levantarse, 16oz agua", dur: "5min", habitId: "h0" },
  { time: "6:15 AM", task: "☕ Hacer Café con Leche Helado", dur: "10min" },
  { time: "6:30 AM", task: "🧼 Higiene matutina + movilidad", dur: "15min" },
  { time: "7:00 AM", task: "🇵🇷 Español — Anki flashcards", dur: "30min", habitId: "h1" },
  { time: "7:30 AM", task: "🇵🇷 Español — Gramática/libro de texto", dur: "60min", habitId: "h2" },
  { time: "8:30 AM", task: "🍌 Banana pre-entrenamiento", dur: "5min" },
  { time: "8:35 AM", task: "🏋️ Entrenamiento (Lun–Sáb)", dur: "75–90min", habitId: "h3" },
  { time: "10:05 AM", task: "🧘 Enfriamiento + estiramiento", dur: "15min" },
  { time: "10:20 AM", task: "🚿 Ducha + recuperación", dur: "20min" },
  { time: "10:40 AM", task: "🍳 Comida post-entrenamiento", dur: "25min" },
  { time: "12:00 PM", task: "💻 Udemy Bloque de Estudio 1", dur: "90min", habitId: "h4" },
  { time: "1:30 PM", task: "🍱 Almuerzo", dur: "30min" },
  { time: "2:00 PM", task: "💻 Udemy Bloque de Estudio 2", dur: "60min", habitId: "h5" },
  { time: "3:00 PM", task: "🇵🇷 Inmersión Español (música/podcast/TV)", dur: "30min" },
  { time: "3:30 PM", task: "🥛 Merienda — Yogur griego", dur: "10min" },
  { time: "5:00 PM", task: "🎨 Arte / cultura PR / descanso", dur: "90min", habitId: "h6" },
  { time: "7:00 PM", task: "🍚 Cena", dur: "30min" },
  { time: "8:00 PM", task: "🇵🇷 Español nocturno — shadowing/telenovelas", dur: "30min" },
  { time: "8:30 PM", task: "📓 Diario + planear mañana", dur: "20min", habitId: "h7" },
  { time: "9:30 PM", task: "📵 Pantallas apagadas", dur: "" },
  { time: "10:00 PM", task: "😴 Dormir", dur: "" },
];

export default function Diario() {
  const [view, setView] = useState<"horario" | "planificador">("horario");
  const [data, setData] = useState<PRStorageData | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    setData(getPRData());
  }, []);

  if (!data) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  const toggleCheck = (idx: number, habitId?: string) => {
    const key = `${todayStr}-horario-${idx}`;
    const current = data.scheduleChecks[key] ? true : false;
    const newChecks = { ...data.scheduleChecks, [key]: !current };
    
    let newHabitHistory = data.habitHistory;
    let newStreaks = data.habitStreaks;
    
    if (habitId) {
      const hKey = `${todayStr}-${habitId}`;
      const hCurrent = data.habitHistory[hKey] ? true : false;
      newHabitHistory = { ...data.habitHistory, [hKey]: !hCurrent };
      
      // Basic streak logic (1 if just checked, 0 if unchecked for today)
      const currentStreak = data.habitStreaks[habitId] ? data.habitStreaks[habitId] : 0;
      newStreaks = { ...data.habitStreaks, [habitId]: !hCurrent ? Math.max(1, currentStreak) : Math.max(0, currentStreak - 1) };
    }

    setData(savePRData({ scheduleChecks: newChecks, habitHistory: newHabitHistory, habitStreaks: newStreaks }));
  };

  const markAll = () => {
    const newChecks = { ...data.scheduleChecks };
    const newHistory = { ...data.habitHistory };
    const newStreaks = { ...data.habitStreaks };

    HORARIO.forEach((item, idx) => {
      newChecks[`${todayStr}-horario-${idx}`] = true;
      if (item.habitId) {
        newHistory[`${todayStr}-${item.habitId}`] = true;
        newStreaks[item.habitId] = Math.max(1, data.habitStreaks[item.habitId] ? data.habitStreaks[item.habitId] : 0);
      }
    });
    setData(savePRData({ scheduleChecks: newChecks, habitHistory: newHistory, habitStreaks: newStreaks }));
  };

  const resetToday = () => {
    const newChecks = { ...data.scheduleChecks };
    const newHistory = { ...data.habitHistory };
    
    HORARIO.forEach((item, idx) => {
      newChecks[`${todayStr}-horario-${idx}`] = false;
      if (item.habitId) {
        newHistory[`${todayStr}-${item.habitId}`] = false;
      }
    });
    setData(savePRData({ scheduleChecks: newChecks, habitHistory: newHistory }));
  };

  const habitsDone = HORARIO.filter(h => h.habitId && data.habitHistory[`${todayStr}-${h.habitId}`]).length;
  const totalHabits = 8;
  const progress = (habitsDone / totalHabits) * 100;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const currentWeekNum = 1 + weekOffset;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toggles */}
      <div className="flex bg-[#11182c] border border-white/10 p-1 rounded-xl w-fit mx-auto shadow-md">
        <button
          onClick={() => setView("horario")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all ${
            view === "horario" ? "bg-[#ce1126] text-white shadow-md" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-4 h-4" /> Horario
        </button>
        <button
          onClick={() => setView("planificador")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all ${
            view === "planificador" ? "bg-[#0a3d8f] text-white shadow-md" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" /> Planificador
        </button>
      </div>

      {view === "horario" ? (
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(245,166,35,0.5)]">
                  <circle cx="48" cy="48" r="36" className="stroke-white/5" strokeWidth="8" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    className="stroke-[#f5a623]"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white font-mono">{habitsDone}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">/ {totalHabits}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Horario Diario</h3>
                <p className="text-sm text-zinc-400">Progreso de Hábitos Clave</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={markAll} className="px-4 py-2 bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/50 rounded-lg text-xs font-bold font-mono hover:bg-[#4ade80]/30 transition-colors">
                Marcar Todo
              </button>
              <button onClick={resetToday} className="px-4 py-2 bg-white/5 text-zinc-400 border border-white/10 rounded-lg text-xs font-bold font-mono hover:bg-white/10 hover:text-white transition-colors">
                Reiniciar Hoy
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {HORARIO.map((item, idx) => {
              const isChecked = data.scheduleChecks[`${todayStr}-horario-${idx}`] ? true : false;
              const isKeyHabit = item.habitId ? true : false;
              return (
                <div 
                  key={idx}
                  onClick={() => toggleCheck(idx, item.habitId)}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked 
                      ? "bg-[#4ade80]/5 border-[#4ade80]/20 opacity-60" 
                      : isKeyHabit 
                        ? "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                  }`}
                >
                  <button className={`shrink-0 transition-colors ${isChecked ? "text-[#4ade80]" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                    {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                  <div className="w-20 shrink-0 font-mono text-xs font-bold text-zinc-500">
                    {item.time}
                  </div>
                  <div className={`flex-1 font-medium text-sm transition-all ${isChecked ? "text-zinc-500 line-through" : "text-zinc-200"}`}>
                    {item.task}
                    {isKeyHabit && !isChecked && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[#f5a623] shadow-glow-gold" />}
                  </div>
                  {item.dur && (
                    <div className="font-mono text-[10px] text-zinc-600 bg-black/30 px-2 py-0.5 rounded">
                      {item.dur}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6 bg-black/40 p-2 rounded-xl border border-white/5">
            <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-white font-mono font-bold text-sm">
              Semana {currentWeekNum} <span className="text-zinc-500">/ 35</span>
            </div>
            <button onClick={() => setWeekOffset(w => Math.min(34, w + 1))} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, dIdx) => (
              <div key={dIdx} className="bg-black/20 border border-white/5 rounded-xl p-3 flex flex-col gap-3">
                <div className="text-center font-mono font-bold text-[#ce1126] text-xs pb-2 border-b border-white/5 uppercase">
                  {day}
                </div>
                
                <StudyBlock title="🇵🇷 Español" dur="90m" color="bg-[#ce1126]/20 text-[#ce1126] border-[#ce1126]/30" />
                <StudyBlock title="💻 Udemy" dur="150m" color="bg-[#0a3d8f]/20 text-[#0a3d8f] border-[#0a3d8f]/30" />
                <StudyBlock title="🎨 Arte" dur="45m" color="bg-[#f5a623]/20 text-[#f5a623] border-[#f5a623]/30" />
                <StudyBlock title="🧠 Anki" dur="20m" color="bg-[#4ade80]/20 text-[#4ade80] border-[#4ade80]/30" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StudyBlock({ title, dur, color }: { title: string, dur: string, color: string }) {
  const [done, setDone] = useState(false);

  return (
    <div className={`p-2 rounded-lg border ${color} relative group overflow-hidden transition-all ${done ? "opacity-40 grayscale" : ""}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-[10px] uppercase truncate">{title}</span>
        <button onClick={() => setDone(!done)}>
          {done ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
        </button>
      </div>
      <div className="flex justify-between items-end mt-2">
        <span className="font-mono text-[9px] opacity-70">{dur}</span>
        <button className="text-white bg-white/10 hover:bg-white/20 p-1 rounded transition-colors shadow-sm" title="Start Pomodoro">
          <Timer className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}