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
    { id: "c01", title: "The Complete Python Bootcamp From Zero to Hero in Python", dates: "Aug 3–14" },
    { id: "c02", title: "The Complete SQL Bootcamp: Go from Zero to Hero", dates: "Aug 15–21" },
    { id: "c03", title: "The Complete Full-Stack Web Development Bootcamp", dates: "Aug 22–Oct 10" },
    { id: "c04", title: "Next.js & React - The Complete Guide", dates: "Oct 11–Nov 1" },
    { id: "c05", title: "Typescript: The Complete Developer's Guide", dates: "Nov 2–22" }
  ],
  cloud: [
    { id: "c06", title: "GCP for Beginners - Become a Google Cloud Digital Leader", dates: "Nov 23–Dec 3" },
    { id: "c07", title: "Google Cloud Generative AI Leader Full Course 2026", dates: "Dec 4–15" },
    { id: "c08", title: "Google AI Studio Bootcamp: Build Apps, Media & Master Gen AI", dates: "Dec 16–31" },
    { id: "c09", title: "Build Dynamic Web Apps with React & Firebase", dates: "Jan 1–12 2027" },
    { id: "c10", title: "Firebase In Depth", dates: "Jan 13–22 2027" },
    { id: "c11", title: "Ultimate AWS Certified Cloud Practitioner CLF-C02", dates: "Jan 23–Feb 5 2027" }
  ],
  art: [
    { id: "c12", title: "Perspective Art School: The Complete Drawing Course", dates: "Aug 3–Sep 14" },
    { id: "c13", title: "Anatomy Art School: Drawing the Human Form", dates: "Sep 15–Oct 31" },
    { id: "c14", title: "Manga Art School: The Complete Anime & Manga Course", dates: "Nov 1–Dec 15" },
    { id: "c15", title: "Character Art School: Complete Character Drawing", dates: "Dec 16–Jan 31" },
    { id: "c16", title: "Character Art School: Complete Coloring & Painting", dates: "Feb 1–Mar 15" }
  ],
  important: [
    { id: "c17", title: "Video Editing in CapCut | Beginner to Pro", dates: "Feb 6–15 2027" },
    { id: "c18", title: "Complete Spanish Course: Master Spanish Beginner to Advanced", dates: "DAILY 90min" },
    { id: "c19", title: "HSE/GED/TASC/HiSET Prep: Complete Mathematics", dates: "Starts Apr 2027" }
  ]
};

const DELE_MILESTONES = [
  { id: "dele-a1", label: "A1 Internal (Aug–Dec 2026): Duolingo basics + 500 vocab" },
  { id: "dele-a2", label: "A2 Internal (Jan–Jun 2027): Grammar solid + 1,500 vocab" },
  { id: "dele-b1", label: "DELE B1 EXAM — December 2027" },
  { id: "dele-b2", label: "DELE B2 EXAM — December 2028" },
  { id: "dele-c1", label: "DELE C1 EXAM — December 2030" },
];

export default function Cursos() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>("coding");

  useEffect(() => {
    setData(getPRData());
  }, []);

  if (!data) return null;

  const totalCourses = 19;
  const completedCount = Object.values(data.courseProgress).filter(p => p === 100).length;

  const handleProgressChange = (id: string, val: number) => {
    const wasCompleted = data.courseProgress[id] === 100;
    const isCompleted = val === 100;
    
    // trigger confetti logic can just be setting state if we wanted, but the global confetti runs on showConfetti
    // I will dispatch an event if a course hits 100%
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
      <div className="bg-[#11182c] border border-white/5 rounded-2xl overflow-hidden shadow-md">
        <button 
          onClick={() => setExpandedSection(isExp ? "" : key)}
          className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${isExp ? color : 'from-black/40 to-transparent'} hover:bg-white/5 transition-all text-left`}
        >
          <h3 className="font-bold text-white text-sm sm:text-base font-mono uppercase tracking-widest">{title}</h3>
          {isExp ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
        </button>
        
        {isExp && (
          <div className="p-4 space-y-6">
            {courses.map(course => {
              const prog = data.courseProgress[course.id] !== undefined ? data.courseProgress[course.id] : 0;
              const note = data.courseNotes[course.id] !== undefined ? data.courseNotes[course.id] : "";
              const isDone = prog === 100;

              return (
                <div key={course.id} className={`p-4 rounded-xl border transition-all ${isDone ? 'bg-[#4ade80]/10 border-[#4ade80]/30 shadow-[0_0_15px_rgba(74,222,128,0.15)]' : 'bg-black/40 border-white/10'}`}>
                  <div className="flex gap-4 items-start mb-4">
                    <button onClick={() => handleProgressChange(course.id, isDone ? 0 : 100)} className={`mt-1 shrink-0 ${isDone ? 'text-[#4ade80]' : 'text-zinc-500 hover:text-white'}`}>
                      {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className={`font-bold text-sm sm:text-base ${isDone ? 'text-white' : 'text-zinc-200'}`}>{course.title}</h4>
                        <span className="shrink-0 bg-white/10 px-2 py-1 rounded text-[10px] font-mono text-zinc-400">{course.dates}</span>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                          <span>Progreso</span>
                          <span>{prog}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={prog} 
                          onChange={(e) => handleProgressChange(course.id, parseInt(e.target.value))}
                          className="w-full accent-[#ce1126] cursor-pointer"
                        />
                        <div className="h-1.5 w-full bg-black rounded-full mt-2 overflow-hidden border border-white/10">
                          <div className="h-full bg-gradient-to-r from-[#ce1126] to-[#f5a623] transition-all duration-300" style={{ width: `${prog}%` }} />
                        </div>
                      </div>

                      <textarea 
                        placeholder="Course notes & key takeaways..."
                        value={note}
                        onChange={(e) => handleNoteChange(course.id, e.target.value)}
                        className="w-full mt-4 bg-black/50 border border-white/5 rounded-lg p-2 text-xs text-white outline-none focus:border-[#ce1126] resize-none h-16"
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
      <div className="bg-gradient-to-r from-[#f5a623] to-[#ce1126] p-6 rounded-2xl shadow-lg shadow-[#ce1126]/20 border border-[#f5a623]/30 text-white">
        <h2 className="text-2xl font-black mb-2 tracking-tight">📚 Plan de Cursos (19 Masterclasses)</h2>
        <p className="font-mono text-sm opacity-90">Aug 3 2026 → Feb 16 2027 · ~520 total hours</p>
        <div className="mt-4 flex gap-4 text-sm font-bold bg-black/20 p-3 rounded-xl border border-white/10">
          <div><span className="text-xl">{completedCount}</span> / 19 <span className="opacity-70 text-xs">Completados</span></div>
          <div className="w-px bg-white/20" />
          <div>Spanish: <span className="text-[#0a3d8f]">EVERY DAY</span></div>
          <div className="w-px bg-white/20" />
          <div>Art: <span className="text-[#4ade80]">PARALLEL</span></div>
        </div>
      </div>

      {renderSection("coding", "💻 SECTION 1 — CODING (5)", "from-[#0a3d8f]/40 to-transparent border-l-4 border-l-[#0a3d8f]", COURSES.coding)}
      {renderSection("cloud", "☁️ SECTION 2 — GOOGLE & CLOUD (6)", "from-[#ce1126]/40 to-transparent border-l-4 border-l-[#ce1126]", COURSES.cloud)}
      {renderSection("art", "🎨 SECTION 3 — ART PARALLEL (5)", "from-[#f5a623]/40 to-transparent border-l-4 border-l-[#f5a623]", COURSES.art)}
      {renderSection("important", "⭐ SECTION 4 — IMPORTANT (3)", "from-[#4ade80]/40 to-transparent border-l-4 border-l-[#4ade80]", COURSES.important)}

      {/* DELE Tracker */}
      <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md mt-8">
        <h3 className="text-xl font-black text-white font-mono mb-4 flex items-center gap-2">
          <span>🇵🇷</span> DELE Master Plan
        </h3>
        <p className="text-xs text-zinc-400 mb-6 font-mono">Instituto Cervantes Official Certification Track</p>
        
        <div className="space-y-3">
          {DELE_MILESTONES.map((ms) => {
            const isDone = data.deleProgress[ms.id] ? true : false;
            return (
              <label key={ms.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${isDone ? 'bg-[#0a3d8f]/20 border-[#0a3d8f]/50' : 'bg-black/30 border-white/10 hover:border-white/30'}`}>
                <input 
                  type="checkbox" 
                  checked={isDone} 
                  onChange={() => toggleDele(ms.id)}
                  className="w-5 h-5 accent-[#0a3d8f] bg-transparent border-white/20 rounded cursor-pointer"
                />
                <span className={`text-sm font-medium ${isDone ? 'text-white' : 'text-zinc-300'}`}>{ms.label}</span>
                {isDone && <span className="ml-auto text-[10px] font-mono text-[#4ade80] uppercase">Logrado</span>}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}