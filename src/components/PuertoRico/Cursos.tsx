"use client";

import React from 'react';
import { BookOpen, Circle, Clock, Code, Languages, Calculator } from "lucide-react";

const COURSES = [
  {
    category: "Web Engineering (Udemy)",
    icon: Code,
    items: [
      { id: "web01", title: "The Complete Full-Stack Web Development Bootcamp", dates: "Sep 3–Apr 2" },
      { id: "web02", title: "Java Masterclass 2025: 130+ Hours of Expert Lessons", dates: "Sep 3–Apr 2" },
      { id: "web03", title: "[NEW] Spring Boot 4, Spring Framework 7: Beginner to Guru", dates: "Sep 3–Apr 2" },
      { id: "web04", title: "React - The Complete Guide (incl. Next.js, Redux)", dates: "Sep 3–Apr 2" },
      { id: "web05", title: "The Complete Node.js Developer Course (3rd Edition)", dates: "Sep 3–Apr 2" },
      { id: "web06", title: "The Complete SQL Bootcamp: Go from Zero to Hero", dates: "Sep 3–Apr 2" },
      { id: "web07", title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026", dates: "Sep 3–Apr 2" }
    ]
  },
  {
    category: "Languages (Udemy)",
    icon: Languages,
    items: [
      { id: "lang01", title: "Ultimate Japanese Bootcamp: Speak Like a Native + JLPT N5-N1", dates: "Sep 3–Apr 2" }
    ]
  },
  {
    category: "Other (Udemy)",
    icon: Calculator,
    items: [
      { id: "other01", title: "HSE/GED/TASC/HiSET Prep: A Complete Mathematics Curriculum", dates: "Sep 3–Apr 2" }
    ]
  }
];

const JAPANESE_MILESTONES = [
  { id: "jp-lvl1", label: "JLPT N5 — Basic Japanese Foundation" },
  { id: "jp-lvl2", label: "JLPT N4 — Everyday conversations" },
  { id: "jp-lvl3", label: "JLPT N3 — Conversational fluency" },
  { id: "jp-lvl4", label: "JLPT N2 — IT Vocational School Admission Requirement" },
  { id: "jp-lvl5", label: "JLPT N1 — Native-level fluency" }
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
          <p className="text-sm text-system-cyan/80 font-mono mt-1">Web Engineering + Japanese + HiSET Math (Sept 3 – April 2)</p>
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
        </div>
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
