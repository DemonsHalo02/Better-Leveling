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
    { id: "c01", title: "Tailwind CSS From Scratch | Learn By Building Projects", dates: "Sep 3–14" },
    { id: "c02", title: "Git & GitHub - The Practical Guide", dates: "Oct 4–11" },
    { id: "c03", title: "Next.js & React - The Complete Guide", dates: "Oct 4–24" },
    { id: "c04", title: "iOS Development Masterclass 2027 - SwiftUI, SwiftData, AI", dates: "Jan 10–Feb 20" },
    { id: "c05", title: "The Complete Full-Stack Web Development Bootcamp", dates: "Sep 3–Nov 1" },
    { id: "c06", title: "Understanding TypeScript", dates: "Nov 1–14" },
    { id: "c07", title: "The Complete SQL Bootcamp: Go from Zero to Hero", dates: "Nov 1–14" },
    { id: "c08", title: "The Complete Python Bootcamp From Zero to Hero in Python", dates: "Dec 6–Jan 10" },
    { id: "c09", title: "Java Masterclass 2025: 130+ Hours of Expert Lessons", dates: "Jan 10–Feb 15" }
  ],
  art: [
    { id: "a01", title: "Clip Studio Paint Masterclass: From Beginner To Expert", dates: "Sep 3–Oct 4" },
    { id: "a02", title: "Drawing Webtoons: From Planning to Publishing", dates: "Oct 18–Nov 15" },
    { id: "a03", title: "Clip Studio Paint - Essential Training Course", dates: "Oct 18–Nov 15" },
    { id: "a04", title: "Anatomy Art School: Drawing the Human Form", dates: "Nov 15–Dec 20" },
    { id: "a05", title: "Perspective Art School: The Complete Drawing Course", dates: "Dec 20–Jan 24" },
    { id: "a06", title: "Manga Art School: The Complete Anime & Manga Drawing Course", dates: "Dec 20–Jan 24" },
    { id: "a07", title: "The Complete Environment Painting Super Course", dates: "Jan 24–Feb 21" },
    { id: "a08", title: "Character Art School: Complete Coloring & Painting", dates: "Feb 7–Mar 15" },
    { id: "a09", title: "Character Art School: Complete Character Drawing", dates: "Feb 7–Mar 15" }
  ],
  filmmaking: [
    { id: "f01", title: "iPhone Filmmaker Masterclass", dates: "Sep 17–Oct 15" },
    { id: "f02", title: "The Freelance Masterclass: For Creatives", dates: "Feb 21–Apr 2" },
    { id: "f03", title: "Final Cut Pro X - Beginner To Advanced (FCP MASTERY 2026)", dates: "Nov 15–Jan 15" },
    { id: "f04", title: "Local Marketing 2026: Google My Business, SEO, Social Media", dates: "Feb 21–Apr 2" }
  ],
  important: [
    { id: "i01", title: "TOPIK II Reading Complete Prep: Target Level 4+", dates: "Jan 24–Apr 2" },
    { id: "i02", title: "The Complete Korean Course for Beginners | 10 courses in 1!", dates: "Sep 3–Jan 24" },
    { id: "i03", title: "HSE/GED/TASC/HiSET Prep: A Complete Mathematics Curriculum", dates: "Sep 3–Oct 15" }
  ]
};

const KOREAN_MILESTONES = [
  { id: "ko-lvl1", label: "TOPIK I Level 1 (Sep–Dec 2026): Basic survival Korean & Hangul" },
  { id: "ko-lvl2", label: "TOPIK I Level 2 (Jan–Jun 2027): Everyday conversations and simple texts" },
  { id: "ko-lvl3", label: "TOPIK II Level 3 — Intermediate fluency (by Dec 2027)" },
  { id: "ko-lvl4", label: "TOPIK II Level 4 — Enjoying K-Dramas/K-Pop with minimal subtitles (by Dec 2028)" },
  { id: "ko-lvl5", label: "TOPIK II Level 5 & 6 — Full fluency (by 2030)" },
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
      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300">
        <button 
          onClick={() => setExpandedSection(isExp ? "" : key)}
          className={`w-full flex items-center justify-between p-5 bg-gradient-to-r ${isExp ? color : 'from-black/40 to-transparent'} hover:bg-white/5 transition-all text-left border-b ${isExp ? 'border-white/10' : 'border-transparent'}`}
        >
          <h3 className="font-black text-white text-sm sm:text-base font-mono uppercase tracking-widest drop-shadow-sm">{title}</h3>
          {isExp ? <ChevronUp className="w-5 h-5 text-white drop-shadow-sm" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
        </button>
        
        {isExp && (
          <div className="p-5 space-y-6">
            {courses.map(course => {
              const prog = data.courseProgress[course.id] !== undefined ? data.courseProgress[course.id] : 0;
              const note = data.courseNotes[course.id] !== undefined ? data.courseNotes[course.id] : "";
              const isDone = prog === 100;

              return (
                <div key={course.id} className={`p-5 rounded-2xl border transition-all duration-300 ${isDone ? 'bg-[#4ade80]/10 border-[#4ade80]/30 shadow-[0_0_20px_rgba(74,222,128,0.15)]' : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/40'}`}>
                  <div className="flex gap-4 items-start mb-4">
                    <button onClick={() => handleProgressChange(course.id, isDone ? 0 : 100)} className={`mt-1 shrink-0 transition-transform duration-300 ${isDone ? 'text-[#4ade80] scale-110 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'text-zinc-600 hover:text-white hover:scale-110'}`}>
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
                          <span className={isDone ? 'text-[#4ade80] drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-zinc-300'}>{prog}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={prog} 
                          onChange={(e) => handleProgressChange(course.id, parseInt(e.target.value))}
                          className="w-full accent-[#ce1126] cursor-pointer"
                        />
                        <div className="h-2 w-full bg-black/60 rounded-full mt-3 overflow-hidden border border-white/10 shadow-inner">
                          <div className={`h-full bg-gradient-to-r ${isDone ? 'from-[#4ade80] to-[#00ff88]' : 'from-[#ce1126] to-[#f5a623]'} transition-all duration-500 ease-out`} style={{ width: `${prog}%` }} />
                        </div>
                      </div>

                      <textarea 
                        placeholder="Course notes & key takeaways..."
                        value={note}
                        onChange={(e) => handleNoteChange(course.id, e.target.value)}
                        className="w-full mt-4 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-zinc-200 outline-none focus:border-[#ce1126] focus:ring-1 focus:ring-[#ce1126]/50 transition-all resize-none h-20 shadow-inner placeholder:text-zinc-600"
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
      <div className="group bg-gradient-to-br from-[#f5a623]/90 to-[#ce1126]/90 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-[#ce1126]/20 border border-white/20 text-white relative overflow-hidden transition-all duration-500 hover:shadow-[#ce1126]/40 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tighter drop-shadow-md flex items-center gap-3">
            <Star className="w-8 h-8 fill-current text-[#f5a623] drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
            Course Plan <span className="text-xl sm:text-2xl opacity-90">(25 Masterclasses)</span>
          </h2>
          <p className="font-mono text-sm sm:text-base font-medium opacity-90 tracking-wide drop-shadow-sm mb-6">Sept 3 2026 → Apr 2 2027</p>
          
          <div className="flex flex-wrap gap-4 text-sm font-bold bg-black/30 p-4 rounded-2xl border border-white/20 shadow-inner backdrop-blur-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-white drop-shadow-md">{completedCount}</span> 
              <span className="text-zinc-300">/ 25</span> 
              <span className="opacity-80 text-xs ml-1 uppercase tracking-wider">Completed</span>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 uppercase tracking-wider text-xs">Korean:</span> 
              <span className="text-[#0a3d8f] bg-white px-2 py-0.5 rounded text-xs drop-shadow-sm">EVERY DAY</span>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 uppercase tracking-wider text-xs">Art/Film:</span> 
              <span className="text-[#4ade80] bg-black/50 border border-[#4ade80]/50 px-2 py-0.5 rounded text-xs drop-shadow-sm">HOBBIES</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {renderSection("coding", "💻 SECTION 1 — CODING (9)", "from-[#0a3d8f]/30 to-transparent border-l-4 border-l-[#0a3d8f]", COURSES.coding)}
        {renderSection("art", "🎨 SECTION 2 — ART (9)", "from-[#c084fc]/30 to-transparent border-l-4 border-l-[#c084fc]", COURSES.art)}
        {renderSection("filmmaking", "🎥 SECTION 3 — FILMMAKING (4)", "from-[#f5a623]/30 to-transparent border-l-4 border-l-[#f5a623]", COURSES.filmmaking)}
        {renderSection("important", "⭐ SECTION 4 — IMPORTANT (3)", "from-[#4ade80]/30 to-transparent border-l-4 border-l-[#4ade80]", COURSES.important)}
      </div>

      {/* Korean Tracker */}
      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mt-8">
        <h3 className="text-2xl font-black text-white font-mono mb-2 flex items-center gap-3 tracking-tight">
          <span className="text-3xl drop-shadow-md">🇰🇷</span> Korean Plan (TOPIK)
        </h3>
        <p className="text-sm text-zinc-400 mb-8 font-medium tracking-wide">Goal: K-Pop & K-Dramas</p>
        
        <div className="space-y-4">
          {KOREAN_MILESTONES.map((ms) => {
            const isDone = data.deleProgress[ms.id] ? true : false;
            return (
              <label key={ms.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isDone ? 'bg-[#0a3d8f]/20 border-[#0a3d8f]/50 shadow-[0_0_15px_rgba(10,61,143,0.15)]' : 'bg-black/30 border-white/10 hover:border-white/30 hover:bg-black/40 hover:-translate-y-0.5'}`}>
                <div className="relative flex items-center justify-center shrink-0">
                  <input 
                    type="checkbox" 
                    checked={isDone} 
                    onChange={() => toggleDele(ms.id)}
                    className="w-6 h-6 accent-[#0a3d8f] bg-transparent border-white/20 rounded cursor-pointer peer opacity-0 absolute inset-0 z-10"
                  />
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${isDone ? 'bg-[#0a3d8f] border-[#0a3d8f]' : 'border-zinc-500 peer-hover:border-zinc-300 bg-black/40'}`}>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className={`text-sm sm:text-base font-medium transition-colors ${isDone ? 'text-white' : 'text-zinc-300'}`}>{ms.label}</span>
                {isDone && <span className="ml-auto text-[10px] sm:text-xs font-mono font-bold text-[#4ade80] uppercase tracking-widest bg-[#4ade80]/10 px-2 py-1 rounded-md border border-[#4ade80]/20 shadow-sm">Achieved</span>}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}