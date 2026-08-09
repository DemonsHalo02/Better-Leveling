"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { ChevronDown, ChevronUp, Star, CheckCircle2, Circle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  dates: string;
}

const COURSES = {
  coding: [
    { id: "c01", title: "The Complete Full-Stack Web Development Bootcamp", dates: "Aug 22–Oct 10" },
    { id: "c02", title: "Next.js & React - The Complete Guide", dates: "Oct 11–Nov 1" },
    { id: "c03", title: "Understanding TypeScript", dates: "Nov 2–22" },
    { id: "c04", title: "Git & GitHub - The Practical Guide", dates: "Nov 23–Dec 3" },
    { id: "c05", title: "The Complete SQL Bootcamp: Go from Zero to Hero", dates: "Dec 4–15" },
    { id: "c06", title: "Spring Boot 4, Spring 7 & Hibernate for Beginners", dates: "Jan 1–22 2027" },
    { id: "c07", title: "Full-Stack Java Developer Course with Spring Boot 4 & React", dates: "Jan 23–Feb 20 2027" }
  ],
  art_and_design: [
    { id: "c12", title: "Figma UI/UX Design Essentials", dates: "Aug 3–Sep 14" },
    { id: "c13", title: "Anatomy Art School: Drawing the Human Form", dates: "Sep 15–Oct 31" },
    { id: "c14", title: "Perspective Art School: The Complete Drawing Course", dates: "Nov 1–Dec 15" },
    { id: "c15", title: "Manga Art School: The Complete Anime & Manga Course", dates: "Dec 16–Jan 31" },
    { id: "c16", title: "Character Art School: Complete Character Drawing & Coloring", dates: "Feb 1–Mar 15" }
  ],
  important: [
    { id: "c17", title: "HSE/GED/TASC/HiSET Prep: A Complete Mathematics Curriculum", dates: "Aug 8–Sep 5" },
    { id: "c18", title: "The Complete Korean Course for Beginners | 10 courses in 1!", dates: "DAILY 90min" },
    { id: "c19", title: "DaVinci Resolve Mastery: The Complete Video Editing Bootcamp", dates: "Dec 11–20" },
    { id: "c20", title: "Running a Web Development Business: The Complete Guide", dates: "Mar 22–Apr 2 2027" }
  ]
};

const TOPIK_MILESTONES = [
  { id: "topik-1", label: "Level 1-2 Internal (Aug–Dec 2026): Hangul + basic grammar + 500 vocab" },
  { id: "topik-2", label: "Level 3 Internal (Jan–Jun 2027): Intermediate grammar + 1,500 vocab" },
  { id: "topik-3", label: "TOPIK II Level 4 EXAM — December 2027" },
  { id: "topik-4", label: "TOPIK II Level 5 EXAM — December 2028" },
  { id: "topik-5", label: "TOPIK II Level 6 EXAM — December 2030" },
];

export default function Cursos() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>("coding");

  useEffect(() => {
    setData(getPRData());
    const handleUpdate = () => setData(getPRData());
    window.addEventListener("prDataUpdated", handleUpdate);
    return () => window.removeEventListener("prDataUpdated", handleUpdate);
  }, []);

  if (!data) return null;

  const completedCount = Object.values(data.courseProgress).filter(p => p === 100).length;

  const handleProgressChange = (id: string, val: number) => {
    const wasCompleted = data.courseProgress[id] === 100;
    const isCompleted = val === 100;
    
    if (isCompleted && !wasCompleted) {
      window.dispatchEvent(new Event('triggerConfetti'));
    }

    const newProg = { ...data.courseProgress, [id]: val };
    setData(savePRData({ courseProgress: newProg }));
  };

  const handleNoteChange = (id: string, text: string) => {
    const newNotes = { ...data.courseNotes, [id]: text };
    setData(savePRData({ courseNotes: newNotes }));
  };

  const toggleDele = (id: string) => {
    const current = data.deleProgress[id] ? true : false;
    if (!current) window.dispatchEvent(new Event('triggerConfetti'));
    const newDele = { ...data.deleProgress, [id]: !current };
    setData(savePRData({ deleProgress: newDele }));
  };

  const renderSection = (key: string, title: string, color: string, courses: Course[]) => {
    const isExp = expandedSection === key;
    return (
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300">
        <button 
          onClick={() => setExpandedSection(isExp ? "" : key)}
          className={`w-full flex items-center justify-between p-5 bg-gradient-to-r ${isExp ? color : 'from-black/40 to-transparent'} hover:bg-white/5 transition-all text-left border-b ${isExp ? 'border-white/10' : 'border-transparent'}`}
        >
          <h3 className="font-bold text-white text-sm sm:text-base font-sans uppercase tracking-widest drop-shadow-sm">{title}</h3>
          {isExp ? <ChevronUp className="w-5 h-5 text-white drop-shadow-sm" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
        </button>
        
        {isExp && (
          <div className="p-5 space-y-6">
            {courses.map(course => {
              const prog = data.courseProgress[course.id] !== undefined ? data.courseProgress[course.id] : 0;
              const note = data.courseNotes[course.id] !== undefined ? data.courseNotes[course.id] : "";
              const isDone = prog === 100;

              return (
                <div key={course.id} className={`p-5 rounded-2xl border transition-all duration-300 ${isDone ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/40'}`}>
                  <div className="flex gap-4 items-start mb-4">
                    <button onClick={() => handleProgressChange(course.id, isDone ? 0 : 100)} className={`mt-1 shrink-0 transition-transform duration-300 ${isDone ? 'text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'text-zinc-600 hover:text-white hover:scale-110'}`}>
                      {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-2">
                        <h4 className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${isDone ? 'text-white' : 'text-zinc-300'}`}>{course.title}</h4>
                        <span className="shrink-0 bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-zinc-300 border border-white/5 shadow-inner whitespace-nowrap self-start">
                          {course.dates}
                        </span>
                      </div>
                      
                      <div className="mt-5 bg-black/20 p-3 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-2 font-bold uppercase tracking-wider">
                          <span>Progress</span>
                          <span className={isDone ? 'text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]' : 'text-zinc-300'}>{prog}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={prog} 
                          onChange={(e) => handleProgressChange(course.id, parseInt(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                        <div className="h-2 w-full bg-black/60 rounded-full mt-3 overflow-hidden border border-white/10 shadow-inner">
                          <div className={`h-full bg-gradient-to-r ${isDone ? 'from-indigo-400 to-purple-500' : 'from-indigo-600 to-indigo-400'} transition-all duration-500 ease-out`} style={{ width: `${prog}%` }} />
                        </div>
                      </div>

                      <textarea 
                        placeholder="Course notes & key takeaways..."
                        value={note}
                        onChange={(e) => handleNoteChange(course.id, e.target.value)}
                        className="w-full mt-4 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none h-20 shadow-inner placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="group bg-gradient-to-br from-indigo-900 to-purple-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 text-white relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/20 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tighter drop-shadow-md flex items-center gap-3">
            <Star className="w-8 h-8 fill-current text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
            Course Plan <span className="text-xl sm:text-2xl opacity-90">(16 Masterclasses)</span>
          </h2>
          <p className="font-sans text-sm sm:text-base font-medium opacity-90 tracking-wide drop-shadow-sm mb-6">Aug 2026 → Mar 2027 · Full-Stack & Creator Journey</p>
          
          <div className="flex flex-wrap gap-4 text-sm font-bold bg-black/30 p-4 rounded-2xl border border-white/20 shadow-inner backdrop-blur-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-white drop-shadow-md">{completedCount}</span> 
              <span className="text-zinc-300">/ 16</span> 
              <span className="opacity-80 text-xs ml-1 uppercase tracking-wider">Completed</span>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 uppercase tracking-wider text-xs">Korean:</span> 
              <span className="text-indigo-900 bg-indigo-200 px-2 py-0.5 rounded text-xs drop-shadow-sm font-bold">EVERY DAY</span>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 uppercase tracking-wider text-xs">Art/Design:</span> 
              <span className="text-purple-300 bg-purple-900/50 border border-purple-500/50 px-2 py-0.5 rounded text-xs drop-shadow-sm">PARALLEL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {renderSection("coding", "💻 SECTION 1 — WEB DEV & JAVA (7)", "from-indigo-600/30 to-transparent border-l-4 border-l-indigo-500", COURSES.coding)}
        {renderSection("art_and_design", "🎨 SECTION 2 — ART & DESIGN (5)", "from-purple-600/30 to-transparent border-l-4 border-l-purple-500", COURSES.art_and_design)}
        {renderSection("important", "⭐ SECTION 3 — FOUNDATIONS (4)", "from-emerald-600/30 to-transparent border-l-4 border-l-emerald-500", COURSES.important)}
      </div>

      {/* TOPIK Tracker */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mt-8">
        <h3 className="text-2xl font-black text-white font-sans mb-2 flex items-center gap-3 tracking-tight">
          <span className="text-3xl drop-shadow-md">🇰🇷</span> TOPIK Master Plan
        </h3>
        <p className="text-sm text-zinc-400 mb-8 font-medium tracking-wide">Official Test of Proficiency in Korean (TOPIK) Certification Track</p>
        
        <div className="space-y-4">
          {TOPIK_MILESTONES.map((ms) => {
            const isDone = data.deleProgress[ms.id] ? true : false;
            return (
              <label key={ms.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isDone ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'bg-black/30 border-white/10 hover:border-white/30 hover:bg-black/40 hover:-translate-y-0.5'}`}>
                <div className="relative flex items-center justify-center shrink-0">
                  <input 
                    type="checkbox" 
                    checked={isDone} 
                    onChange={() => toggleDele(ms.id)}
                    className="w-6 h-6 accent-indigo-500 bg-transparent border-white/20 rounded cursor-pointer peer opacity-0 absolute inset-0 z-10"
                  />
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${isDone ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-500 peer-hover:border-zinc-300 bg-black/40'}`}>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className={`text-sm sm:text-base font-medium transition-colors ${isDone ? 'text-white' : 'text-zinc-300'}`}>{ms.label}</span>
                {isDone && <span className="ml-auto text-[10px] sm:text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20 shadow-sm">Achieved</span>}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}