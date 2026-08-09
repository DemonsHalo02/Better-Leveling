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
  { id: "aug-2026", year: 2026, monthStr: "August 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "The Journey Begins", desc: [
      "Aug 8: DAY 1! Git & GitHub, HiSET Math Prep, and Perspective Art all in progress.",
      "Aug 8: Casual Spanish practice begins — 30min/day, no pressure.",
      "Aug 22: Full-Stack Web Dev Bootcamp begins (Dr. Angela Yu)."
  ]},
  { id: "sep-2026", year: 2026, monthStr: "September 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "HiSET Math & Anatomy", desc: [
      "Sep 5: HiSET Mathematics Prep course complete — HiSET Math exam scheduling begins.",
      "Sep 21: Anatomy Art School begins."
  ]},
  { id: "oct-2026", year: 2026, monthStr: "October 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "TypeScript & Tailwind", desc: [
      "Oct 11: Understanding TypeScript begins (Maximilian Schwarzmüller).",
      "Oct 25: Tailwind CSS From Scratch begins (Brad Traversy)."
  ]},
  { id: "nov-2026", year: 2026, monthStr: "November 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "Next.js & React", desc: [
      "Nov 1: Next.js & React - The Complete Guide begins.",
      "Nov 7: Manga Art School begins.",
      "Nov 22: Next.js 15 & Firebase begins."
  ]},
  { id: "dec-2026", year: 2026, monthStr: "December 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "E-Commerce Capstone", desc: [
      "Dec 6: Master Next.js 15 - Build and Deploy an E-Commerce Project begins — the coding capstone!"
  ]},
  { id: "jan-2027", year: 2027, monthStr: "January 2027", badge: "Phase 1 🚀", color: "#ce1126", title: "Character Art School", desc: [
      "Jan: Character Art School: Complete Character Drawing continues."
  ]},
  { id: "feb-2027", year: 2027, monthStr: "February 2027", badge: "Phase 1 🚀", color: "#ce1126", title: "Coloring & Painting", desc: [
      "Feb 7: Character Art School: Complete Coloring & Painting begins."
  ]},
  { id: "mar-2027", year: 2027, monthStr: "March 2027", badge: "Phase 1 🚀", color: "#ce1126", title: "Final Course Stretch", desc: [
      "Mar 22: Running a Web Development Business — final course begins."
  ]},
  { id: "apr-2027", year: 2027, monthStr: "April 2027", badge: "Phase 2 🎓", color: "#0a3d8f", title: "All Courses Complete", desc: [
      "Apr 2: ✅ ALL 16 UDEMY COURSES COMPLETE!",
      "Apr 2027: Remaining HiSET subjects (Reading, Writing, Social Studies) scheduled. Start building portfolio projects."
  ]},
  { id: "jun-2027", year: 2027, monthStr: "June 2027", badge: "Phase 2 🎓", color: "#0a3d8f", title: "HiSET Complete", desc: [
      "Jun 2027: 🎓 HiSET diploma earned — Science, Math, Reading, Writing, and Social Studies all done!"
  ]},
  { id: "aug-2027", year: 2027, monthStr: "August 2027", badge: "Phase 3 💼", color: "#f5a623", title: "Job or Freelance Launch", desc: [
      "Aug 2027: 🎉 Portfolio ready! Applying to full-stack jobs and pitching freelance clients simultaneously.",
      "Aug 2027: Content creation channel launches — coding + art + life updates."
  ]},
  { id: "dec-2027", year: 2027, monthStr: "December 2027", badge: "Phase 3 💼", color: "#f5a623", title: "First Win", desc: [
      "Dec 2027: 💼 First job offer or first paid freelance client — whichever comes first!"
  ]},
  { id: "jan-2028", year: 2028, monthStr: "January 2028", badge: "Phase 3 💼", color: "#f5a623", title: "Working & Creating", desc: [
      "Jan 2028: Full-stack income flowing! Content creation and art practice continue as steady side habits."
  ]},
  { id: "dec-2028", year: 2028, monthStr: "December 2028", badge: "Phase 4 🎨", color: "#4ade80", title: "Body Goal & Momentum", desc: [
      "Dec 2028: 💪 160 LBS ACHIEVED!",
      "Dec 2028: Content channel and art skills both leveling up steadily."
  ]},
  { id: "dec-2029", year: 2029, monthStr: "December 2029", badge: "Phase 4 🎨", color: "#4ade80", title: "Spanish Comfortable", desc: [
      "Dec 2029: 🗣️ Comfortable holding a casual conversation in Spanish — no textbook needed!",
      "Dec 2029: Savings ~$10K toward the MacBook Pro + iPad Pro + emergency fund."
  ]},
  { id: "mar-2030", year: 2030, monthStr: "March 2030", badge: "Phase 5 💰", color: "#ce1126", title: "Tech Upgrade", desc: [
      "Mar 2030: $15K saved! MacBook Pro + iPad Pro purchased for dev, art, and content work."
  ]},
  { id: "dec-2030", year: 2030, monthStr: "December 2030", badge: "Phase 5 💰", color: "#ce1126", title: "Career Stable", desc: [
      "Dec 2030: Full-stack career (job or freelance) fully established and stable."
  ]},
  { id: "year-2036", year: 2036, monthStr: "2036", badge: "Phase 6 🌟", color: "#0a3d8f", title: "Established", desc: [
      "2036: 🌟 10 YEARS. GOAL ACHIEVED. Full-stack career, creative hobbies, and a content channel — all built right here in the USA!"
  ]}
];

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];

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
        <h2 className="text-2xl font-black text-white font-mono tracking-tight">📅 Timeline</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#11182c]/80 backdrop-blur-sm border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:border-[#0a3d8f] focus:ring-1 focus:ring-[#0a3d8f]/50 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setFilterYear(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-sm ${filterYear === null ? "bg-white text-black scale-105" : "bg-[#11182c]/80 backdrop-blur-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/30"}`}
        >
          All
        </button>
        {YEARS.map(y => (
          <button 
            key={y}
            onClick={() => setFilterYear(y)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-sm ${filterYear === y ? "bg-[#ce1126] text-white scale-105 shadow-[0_0_10px_rgba(206,17,38,0.5)] border-transparent" : "bg-[#11182c]/80 backdrop-blur-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/30"}`}
          >
            {y === 2032 ? "2032+" : y}
          </button>
        ))}
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#ce1126] before:via-[#0a3d8f] before:to-[#f5a623] before:opacity-40">
        {filteredEvents.map(event => {
          const isExp = expanded[event.id] ? true : false;
          return (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] bg-[#050811] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ borderColor: event.color }}>
                <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: event.color }} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#11182c]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl hover:border-white/20 hover:bg-[#1a233a] transition-all duration-300">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExpand(event.id)}>
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase shadow-sm border border-white/5" style={{ backgroundColor: `${event.color}30`, color: event.color }}>
                      {event.badge}
                    </span>
                    <h3 className="text-white font-bold mt-2">{event.monthStr}</h3>
                    <p className="text-sm text-[#f5a623] font-mono">{event.title}</p>
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
                          <span className="text-[#ce1126] mt-0.5">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <textarea 
                      placeholder="Add personal notes for this milestone..."
                      value={data.timelineNotes[event.id] ? data.timelineNotes[event.id] : ""}
                      onChange={(e) => handleNoteChange(event.id, e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-[#0a3d8f] resize-none h-24"
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