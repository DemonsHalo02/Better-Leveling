"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { Clock, Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight, Timer } from "lucide-react";

const HORARIO = [
  { time: "6:00 AM", task: "💧 Wake up, 16oz water", dur: "5min", habitId: "h0" },
  { time: "6:15 AM", task: "☕ Make Iced Coffee", dur: "10min" },
  { time: "6:30 AM", task: "🧼 Morning hygiene + mobility", dur: "15min" },
  { time: "7:00 AM", task: "🇪🇸 Korean — Anki flashcards", dur: "20min", habitId: "h1" },
  { time: "7:20 AM", task: "🇪🇸 Korean — Duolingo/podcast (casual)", dur: "30min", habitId: "h2" },
  { time: "8:30 AM", task: "🍌 Pre-workout banana", dur: "5min" },
  { time: "8:35 AM", task: "🏋️ Workout (Mon-Sat)", dur: "75–90min", habitId: "h3" },
  { time: "10:05 AM", task: "🧘 Cool down + stretch", dur: "15min" },
  { time: "10:20 AM", task: "🚿 Shower + recovery", dur: "20min" },
  { time: "10:40 AM", task: "🍳 Post-workout meal", dur: "25min" },
  { time: "12:00 PM", task: "💻 Udemy Study Block 1", dur: "90min", habitId: "h4" },
  { time: "1:30 PM", task: "🍱 Lunch", dur: "30min" },
  { time: "2:00 PM", task: "💻 Udemy Study Block 2", dur: "60min", habitId: "h5" },
  { time: "3:00 PM", task: "🎥 Content Creation — film/edit a clip", dur: "30min" },
  { time: "3:30 PM", task: "🥛 Snack — Greek yogurt", dur: "10min" },
  { time: "5:00 PM", task: "🎨 Art Practice / Content Ideas / rest", dur: "90min", habitId: "h6" },
  { time: "7:00 PM", task: "🍚 Dinner", dur: "30min" },
  { time: "8:00 PM", task: "🇪🇸 Casual Korean — reading/show with subtitles", dur: "30min" },
  { time: "8:30 PM", task: "📓 Journal + plan tomorrow", dur: "20min", habitId: "h7" },
  { time: "9:30 PM", task: "📵 Screens off", dur: "" },
  { time: "10:00 PM", task: "😴 Sleep", dur: "" },
];

export default function Diario() {
  const [view, setView] = useState<"schedule" | "planner">("schedule");
  const [data, setData] = useState<PRStorageData | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    setData(getPRData());
    const handleUpdate = () => setData(getPRData());
    window.addEventListener("prDataUpdated", handleUpdate);
    return () => window.removeEventListener("prDataUpdated", handleUpdate);
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
      <div className="flex bg-[#11182c]/80 backdrop-blur-sm border border-white/10 p-1.5 rounded-2xl w-fit mx-auto shadow-lg">
        <button
          onClick={() => setView("schedule")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
            view === "schedule" ? "bg-gradient-to-r from-[#ce1126] to-[#ff3366] text-white shadow-[0_0_15px_rgba(206,17,38,0.5)] scale-105" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-4 h-4" /> Schedule
        </button>
        <button
          onClick={() => setView("planner")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
            view === "planner" ? "bg-gradient-to-r from-[#0a3d8f] to-[#00f0ff] text-white shadow-[0_0_15px_rgba(10,61,143,0.5)] scale-105" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" /> Planner
        </button>
      </div>

      {view === "schedule" ? (
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_12px_rgba(245,166,35,0.6)]">
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
                <h3 className="text-2xl font-black text-white mb-1 tracking-tight">Daily Schedule</h3>
                <p className="text-sm text-zinc-400 font-medium">Key Habit Progress</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={markAll} className="px-4 py-2 bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 rounded-xl text-xs font-bold font-mono hover:bg-[#4ade80]/20 hover:border-[#4ade80]/60 transition-all hover:scale-105 shadow-sm">
                Mark All
              </button>
              <button onClick={resetToday} className="px-4 py-2 bg-white/5 text-zinc-400 border border-white/10 rounded-xl text-xs font-bold font-mono hover:bg-white/10 hover:text-white transition-all hover:scale-105 shadow-sm">
                Reset Today
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {HORARIO.map((item, idx) => {
              const isChecked = data.scheduleChecks[`${todayStr}-horario-${idx}`] ? true : false;
              const isKeyHabit = item.habitId ? true : false;
              return (
                <div 
                  key={idx}
                  onClick={() => toggleCheck(idx, item.habitId)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isChecked 
                      ? "bg-[#4ade80]/10 border-[#4ade80]/30 opacity-75" 
                      : isKeyHabit 
                        ? "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5" 
                        : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <button className={`shrink-0 transition-colors ${isChecked ? "text-[#4ade80]" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                    {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                  <div className="w-20 shrink-0 font-mono text-xs font-bold text-zinc-400">
                    {item.time}
                  </div>
                  <div className={`flex-1 font-medium text-sm transition-all ${isChecked ? "text-zinc-500 line-through" : "text-zinc-100"}`}>
                    {item.task}
                    {isKeyHabit && !isChecked && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[#f5a623] shadow-[0_0_8px_rgba(245,166,35,0.8)] animate-pulse" />}
                  </div>
                  {item.dur && (
                    <div className="font-mono text-[10px] text-zinc-400 font-bold bg-black/40 px-2.5 py-1 rounded-md border border-white/5 shadow-inner">
                      {item.dur}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8 bg-black/40 p-2 rounded-2xl border border-white/5 shadow-inner">
            <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))} className="p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-110">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-white font-mono font-bold text-base">
              Week {currentWeekNum} <span className="text-zinc-600">/ 35</span>
            </div>
            <button onClick={() => setWeekOffset(w => Math.min(34, w + 1))} className="p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-110">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dIdx) => (
              <div key={dIdx} className="bg-black/30 border border-white/5 rounded-2xl p-3 flex flex-col gap-3 shadow-inner">
                <div className="text-center font-mono font-black text-[#ce1126] text-xs pb-3 border-b border-white/10 uppercase tracking-widest drop-shadow-sm">
                  {day}
                </div>
                
                <StudyBlock title="🇪🇸 Korean" dur="50m" color="bg-[#ce1126]/10 text-[#ce1126] border-[#ce1126]/30 hover:bg-[#ce1126]/20 hover:border-[#ce1126]/50" />
                <StudyBlock title="💻 Udemy" dur="150m" color="bg-[#0a3d8f]/10 text-[#0a3d8f] border-[#0a3d8f]/30 hover:bg-[#0a3d8f]/20 hover:border-[#0a3d8f]/50" />
                <StudyBlock title="🎨 Art" dur="45m" color="bg-[#f5a623]/10 text-[#f5a623] border-[#f5a623]/30 hover:bg-[#f5a623]/20 hover:border-[#f5a623]/50" />
                <StudyBlock title="🧠 Anki" dur="20m" color="bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30 hover:bg-[#4ade80]/20 hover:border-[#4ade80]/50" />
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
    <div className={`p-3 rounded-xl border ${color} relative group overflow-hidden transition-all duration-300 cursor-pointer ${done ? "opacity-30 grayscale scale-95" : "hover:-translate-y-1 hover:shadow-lg"}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-[10px] uppercase truncate tracking-wider">{title}</span>
        <button onClick={(e) => { e.stopPropagation(); setDone(!done); }} className="transition-transform hover:scale-110">
          {done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-50" />}
        </button>
      </div>
      <div className="flex justify-between items-end mt-3">
        <span className="font-mono text-[10px] font-bold opacity-80">{dur}</span>
        <button onClick={(e) => { e.stopPropagation(); }} className="text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-lg transition-colors shadow-sm backdrop-blur-sm" title="Start Pomodoro">
          <Timer className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
