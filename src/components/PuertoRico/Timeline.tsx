"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface TimelineEvent {
  id: string;
  year: number;
  monthStr: string;
  badge: string;
  color: string;
  title: string;
  desc: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: "aug-2026", year: 2026, monthStr: "August 2026", badge: "Phase 1 🚀", color: "#6366f1", title: "The Journey Begins", desc: [
      "Aug 2026: DAY 1! Korean Course, Art Courses, and Figma design all in progress.",
      "Aug 22: Full-Stack Web Dev Bootcamp begins (Dr. Angela Yu)."
  ]},
  { id: "oct-2026", year: 2026, monthStr: "October 2026", badge: "Phase 1 🚀", color: "#6366f1", title: "Next.js & Frontend", desc: [
      "Oct 11: Next.js & React course begins.",
      "Focus heavily on building stunning frontend portfolios for freelance."
  ]},
  { id: "dec-2026", year: 2026, monthStr: "December 2026", badge: "Phase 1 🚀", color: "#6366f1", title: "Creator Era", desc: [
      "Dec 11: DaVinci Resolve Mastery begins.",
      "Start creating content using the Z Flip 8 setup."
  ]},
  { id: "jan-2027", year: 2027, monthStr: "January 2027", badge: "Phase 1 🚀", color: "#6366f1", title: "Java Backend", desc: [
      "Jan 1: Spring Boot & Hibernate begins.",
      "Building enterprise backend skills for the future Korean job market."
  ]},
  { id: "apr-2027", year: 2027, monthStr: "April 2027", badge: "Phase 2 🎓", color: "#8b5cf6", title: "HiSET & College Prep", desc: [
      "Apr 2: ✅ ALL 16 COURSES COMPLETE!",
      "Complete remaining HiSET subjects (Math, Science, etc.)."
  ]},
  { id: "jun-2027", year: 2027, monthStr: "June 2027", badge: "Phase 2 🎓", color: "#8b5cf6", title: "HiSET Complete", desc: [
      "Jun 2027: 🎓 HiSET diploma earned — Science, Math, Reading, Writing, and Social Studies all done!"
  ]},
  { id: "aug-2027", year: 2027, monthStr: "August 2027", badge: "Phase 3 📚", color: "#a855f7", title: "College Begins", desc: [
      "Aug 2027: 🎉 First semester of college starts!",
      "Start taking on freelance web dev clients on the side."
  ]},
  { id: "dec-2027", year: 2027, monthStr: "December 2027", badge: "Phase 3 📚", color: "#a855f7", title: "TOPIK Level 4", desc: [
      "Dec 2027: 🗣️ TOPIK II Level 4 EXAM — register by Sep 2027!"
  ]},
  { id: "dec-2028", year: 2028, monthStr: "December 2028", badge: "Phase 3 📚", color: "#a855f7", title: "Body & Level 5 Mastery", desc: [
      "Dec 2028: 💪 160 LBS ACHIEVED!",
      "Dec 2028: 🗣️ TOPIK II Level 5 EXAM!"
  ]},
  { id: "may-2031", year: 2031, monthStr: "May 2031", badge: "Phase 4 ✈️", color: "#3b82f6", title: "Graduation & Job Hunt", desc: [
      "May 2031: 🎓 College Graduation!",
      "Begin aggressive application process for E-7 Visa tech roles in Seoul."
  ]},
  { id: "aug-2031", year: 2031, monthStr: "August 2031", badge: "Phase 4 ✈️", color: "#3b82f6", title: "Departure", desc: [
      "Aug 2031: ✈️ FLY TO KOREA! New life begins with degree and job in hand!"
  ]},
  { id: "year-2036", year: 2036, monthStr: "2036", badge: "Phase 5 🇰🇷", color: "#14b8a6", title: "Established", desc: [
      "2036: 🇰🇷 10 YEARS. GOAL ACHIEVED. Fully established developer/creator in Korea!"
  ]}
];

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032];

export default function Timeline() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setData(getPRData());
  }, []);

  if (!data) return null;

  const handleNoteChange = (id: string, text: string) => {
    const updatedNotes = { ...data.timelineNotes, [id]: text };
    setData(savePRData({ timelineNotes: updatedNotes }));
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredEvents = TIMELINE_EVENTS.filter(e => {
    if (filterYear !== null) {
      if (filterYear === 2032 && e.year < 2032) return false;
      if (filterYear !== 2032 && e.year !== filterYear) return false;
    }
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      if (!e.title.toLowerCase().includes(s) && !e.desc.some(d => d.toLowerCase().includes(s)) && !e.monthStr.toLowerCase().includes(s)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-black text-white font-sans tracking-tight">📅 Master Plan</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setFilterYear(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-sm ${filterYear === null ? "bg-white text-black scale-105" : "bg-[#0a0a0a]/80 backdrop-blur-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/30"}`}
        >
          All
        </button>
        {YEARS.map(y => (
          <button 
            key={y}
            onClick={() => setFilterYear(y)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-sm ${filterYear === y ? "bg-indigo-500 text-white scale-105 shadow-[0_0_10px_rgba(99,102,241,0.5)] border-transparent" : "bg-[#0a0a0a]/80 backdrop-blur-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/30"}`}
          >
            {y === 2032 ? "2032+" : y}
          </button>
        ))}
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500 before:opacity-40">
        {filteredEvents.map(event => {
          const isExp = expanded[event.id] ? true : false;
          return (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] bg-[#050811] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ borderColor: event.color }}>
                <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: event.color }} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl hover:border-white/20 hover:bg-white/5 transition-all duration-300">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExpand(event.id)}>
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase shadow-sm border border-white/5" style={{ backgroundColor: `${event.color}30`, color: event.color }}>
                      {event.badge}
                    </span>
                    <h3 className="text-white font-bold mt-2">{event.monthStr}</h3>
                    <p className="text-sm font-sans" style={{ color: event.color }}>{event.title}</p>
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    {isExp ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                
                {isExp && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <ul className="space-y-2 text-sm text-zinc-300">
                      {event.desc.map((d, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-0.5" style={{ color: event.color }}>•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <textarea 
                      placeholder="Add personal notes for this milestone..."
                      value={data.timelineNotes[event.id] ? data.timelineNotes[event.id] : ""}
                      onChange={(e) => handleNoteChange(event.id, e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-indigo-500 resize-none h-24"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="text-center text-zinc-500 py-12 font-mono">No events found matching your search.</div>
        )}
      </div>
    </div>
  );
}