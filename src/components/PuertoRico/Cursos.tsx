"use client";

import React from 'react';
import { BookOpen, CheckCircle2, Circle, Clock, Code, Palette, Languages, MonitorPlay, Video } from "lucide-react";

const COURSES = [
  {
    category: "Coding",
    icon: Code,
    items: [
      { id: "cod01", title: "Tailwind CSS From Scratch | Learn By Building Projects", dates: "Sep 2–Apr 2" },
      { id: "cod02", title: "Git & GitHub - The Practical Guide", dates: "Sep 2–Apr 2" },
      { id: "cod03", title: "Next.js & React - The Complete Guide", dates: "Sep 2–Apr 2" },
      { id: "cod04", title: "The Complete Full-Stack Web Development Bootcamp", dates: "Sep 2–Apr 2" },
      { id: "cod05", title: "Understanding TypeScript", dates: "Sep 2–Apr 2" },
      { id: "cod06", title: "The Complete SQL Bootcamp: Go from Zero to Hero", dates: "Sep 2–Apr 2" }
    ]
  },
  {
    category: "Content Creation",
    icon: Video,
    items: [
      { id: "cc01", title: "Getting Started In Apple Motion 5", dates: "Sep 2–Apr 2" },
      { id: "cc02", title: "Final Cut Pro X - Beginner To Advanced (FCP MASTERY 2026)", dates: "Sep 2–Apr 2" },
      { id: "cc03", title: "Music Production in Logic Pro - The Complete Course!", dates: "Sep 2–Apr 2" }
    ]
  },
  {
    category: "Art",
    icon: Palette,
    items: [
      { id: "art01", title: "Anatomy Art School: Drawing the Human Form", dates: "Sep 2–Apr 2" },
      { id: "art02", title: "Perspective Art School: The Complete Drawing Course", dates: "Sep 2–Apr 2" },
      { id: "art03", title: "The Complete ProCreate Masterclass Course", dates: "Sep 2–Apr 2" },
      { id: "art04", title: "Manga Art School: The Complete Anime & Manga Drawing Course", dates: "Sep 2–Apr 2" },
      { id: "art05", title: "Character Art School: Complete Coloring & Painting", dates: "Sep 2–Apr 2" },
      { id: "art06", title: "Character Art School: Complete Character Drawing", dates: "Sep 2–Apr 2" }
    ]
  },
  {
    category: "Languages",
    icon: Languages,
    items: [
      { id: "lang01", title: "Ultimate Japanese Bootcamp: Speak Like a Native + JLPT N5-N1", dates: "Sep 2–Apr 2" }
    ]
  }
];

const JAPANESE_MILESTONES = [
  { id: "jp-lvl1", label: "JLPT N5 — Basic Japanese Foundation" },
  { id: "jp-lvl2", label: "JLPT N4 — Everyday conversations" },
  { id: "jp-lvl3", label: "JLPT N3 — Conversational fluency" },
  { id: "jp-lvl4", label: "JLPT N2 — Enjoying Anime/J-Pop & translating apps (by Dec 2028)" },
  { id: "jp-lvl5", label: "JLPT N1 — Native-level fluency (by Dec 2029)" }
];

export default function Cursos() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-system-panel border border-system-blue shadow-glow-blue p-6 sm:p-8 flex items-center gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-system-blue/10 to-transparent opacity-50 pointer-events-none" />
        <div className="h-14 w-14 rounded-xl bg-system-blue/20 flex items-center justify-center border border-system-blue/50 shrink-0 shadow-glow-blue relative z-10">
          <BookOpen className="w-7 h-7 text-system-cyan" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">Courses & Master Plan</h2>
          <p className="text-sm text-system-cyan/80 font-mono mt-1">Full-Stack Web Dev + Art + Content Creation + Japanese (Sept 2nd – April 2nd)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {COURSES.map(category => (
          <div key={category.category} className="space-y-4 relative">
            
            <div className="flex items-center gap-3 ml-2">
              <category.icon className="w-5 h-5 text-system-cyan" />
              <h3 className="text-lg font-black text-white tracking-wide uppercase">{category.category}</h3>
            </div>

            <div className="bg-system-panel rounded-2xl border border-system-blue/30 overflow-hidden shadow-lg flex flex-col h-full">
              {category.items.map((course, idx) => (
                <div 
                  key={course.id}
                  className={`flex items-start gap-4 p-4 hover:bg-white/5 transition-colors ${idx !== category.items.length - 1 ? 'border-b border-system-blue/10' : ''}`}
                >
                  <Circle className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200 leading-tight mb-1">{course.title}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-system-cyan/70 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{course.dates}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Japanese Milestones Tracker */}
      <div className="bg-system-panel rounded-2xl border border-system-blue/30 overflow-hidden shadow-lg mt-4 p-6">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Languages className="w-4 h-4 text-system-gold" />
          Japanese JLPT Milestones
        </h3>
        <div className="space-y-3">
          {JAPANESE_MILESTONES.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3">
              <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
              <span className="text-sm text-zinc-300 font-medium">{milestone.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
