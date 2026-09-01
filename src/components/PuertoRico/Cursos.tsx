"use client";

import React from 'react';
import { BookOpen, Circle, Clock, Palette, Languages, Video } from "lucide-react";

const COURSES = [
  {
    category: "Art (Udemy)",
    icon: Palette,
    items: [
      { id: "art01", title: "Clip Studio Paint Masterclass: From Beginner to Expert", dates: "Sep 2–Apr 2" },
      { id: "art02", title: "Anatomy Art School: Drawing the Human Form", dates: "Sep 2–Apr 2" },
      { id: "art03", title: "Perspective Art School: The Complete Drawing Course", dates: "Sep 2–Apr 2" },
      { id: "art04", title: "Manga Art School: The Complete Anime & Manga Drawing Course", dates: "Sep 2–Apr 2" },
      { id: "art05", title: "Character Art School: Complete Coloring & Painting", dates: "Sep 2–Apr 2" },
      { id: "art06", title: "Character Art School: Complete Character Drawing", dates: "Sep 2–Apr 2" }
    ]
  },
  {
    category: "Languages (Udemy)",
    icon: Languages,
    items: [
      { id: "lang01", title: "The Complete Korean Course for Beginners | 10 courses in 1!", dates: "Sep 2–Apr 2" },
      { id: "lang02", title: "TOPIK II Reading Complete Prep: Target Level 4+", dates: "Sep 2–Apr 2" }
    ]
  },
  {
    category: "Free Courses (YouTube)",
    icon: Video,
    items: [
      { id: "yt01", title: "Introduction to DaVinci Resolve - [Full Course] for Beginners (2026)", dates: "Sep 2–Apr 2" },
      { id: "yt02", title: "Everything You Need to Know to Get Started with Affinity by Canva", dates: "Sep 2–Apr 2" }
    ]
  }
];

const KOREAN_MILESTONES = [
  { id: "kr-lvl1", label: "TOPIK 1 (Level 1-2) — Basic Korean Foundation" },
  { id: "kr-lvl2", label: "TOPIK 2 (Level 3-4) — Conversational fluency" },
  { id: "kr-lvl3", label: "TOPIK 2 (Level 5-6) — Advanced fluency & media comprehension (by Dec 2029)" }
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
          <p className="text-sm text-system-cyan/80 font-mono mt-1">Digital Art + Korean + DaVinci Resolve + Affinity (Sept 2 – April 2)</p>
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

      {/* Anki Decks */}
      <div className="bg-system-panel rounded-2xl border border-system-blue/30 overflow-hidden shadow-lg mt-4 p-6">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-system-gold" />
          Daily Anki Decks
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-sm text-zinc-300 font-medium">Kaishi 1.5k — Core Japanese Vocabulary</span>
          </div>
          <div className="flex items-center gap-3">
            <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-sm text-zinc-300 font-medium">All In One Kanji — Full Kanji Recognition</span>
          </div>
          <div className="flex items-center gap-3">
            <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-sm text-zinc-300 font-medium">TOPIK 1 & TOPIK 2 Vocabulary</span>
          </div>
        </div>
      </div>

      {/* Korean Milestones Tracker */}
      <div className="bg-system-panel rounded-2xl border border-system-blue/30 overflow-hidden shadow-lg mt-4 p-6">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Languages className="w-4 h-4 text-system-gold" />
          Korean TOPIK Milestones
        </h3>
        <div className="space-y-3">
          {KOREAN_MILESTONES.map((milestone) => (
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
