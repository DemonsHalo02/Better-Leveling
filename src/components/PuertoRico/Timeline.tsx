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
  { id: "sep-2026", year: 2026, monthStr: "September 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "DAY 1 — Web Engineering Journey", desc: [
      "Sep 3: DAY 1! Full-Stack Bootcamp, Java Masterclass, React, Node, SQL, and AWS all begin.",
      "Sep 3: Japanese Bootcamp begins. Kaishi 1.5k and All In One Kanji Anki decks start daily.",
      "Sep 3: HiSET Math prep begins."
  ]},
  { id: "oct-2026", year: 2026, monthStr: "October 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "Building Foundations", desc: [
      "Oct: Deep into Java object-oriented programming, React basics, and SQL.",
      "Oct: Japanese Anki habits solidified."
  ]},
  { id: "dec-2026", year: 2026, monthStr: "December 2026", badge: "Phase 1 🚀", color: "#ce1126", title: "Spring Boot & Cloud", desc: [
      "Dec: Starting Spring Boot & Spring Framework. Getting comfortable with AWS Cloud Practitioner material.",
      "Dec: First 500+ Japanese Kanji learned."
  ]},
  { id: "apr-2027", year: 2027, monthStr: "April 2027", badge: "Phase 2 🎓", color: "#0a3d8f", title: "All Courses Complete!", desc: [
      "Apr 2: ✅ ALL COURSES COMPLETE! Web Dev skills acquired.",
      "Apr 2027: Start building advanced portfolio projects (Full-Stack React + Spring Boot)."
  ]},
  { id: "aug-2027", year: 2027, monthStr: "August 2027", badge: "Phase 3 💼", color: "#f5a623", title: "Job Hunt Begins", desc: [
      "Aug 2027: 🎉 Portfolio polished! Applying to Web Dev jobs and freelance gigs.",
      "Aug 2027: HiSET Math passed! High School equivalency secured."
  ]},
  { id: "dec-2027", year: 2027, monthStr: "December 2027", badge: "Phase 3 💼", color: "#f5a623", title: "First Dev Job", desc: [
      "Dec 2027: 💼 First Web Dev job secured. Gaining professional experience."
  ]},
  { id: "dec-2029", year: 2029, monthStr: "December 2029", badge: "Phase 4 🎥", color: "#4ade80", title: "JLPT N3 & Mid-Level Engineer", desc: [
      "Dec 2029: Passed JLPT N3! Conversational Japanese is smooth.",
      "Dec 2029: 2 years of professional Web Dev experience."
  ]},
  { id: "dec-2031", year: 2031, monthStr: "December 2031", badge: "Phase 4 🎥", color: "#4ade80", title: "JLPT N2 (Vocational Requirement)", desc: [
      "Dec 2031: 🗣️ JLPT N2 passed! Officially eligible for Japanese IT Vocational Schools."
  ]},
  { id: "dec-2034", year: 2034, monthStr: "Phase 5 💰", badge: "Phase 5 💰", color: "#ce1126", title: "Savings Secured", desc: [
      "Dec 2034: Saved over $20,000 for the Japan student visa proof of funds."
  ]},
  { id: "year-2036", year: 2036, monthStr: "2036", badge: "Phase 6 🌟", color: "#0a3d8f", title: "Relocate to Japan! 🇯🇵", desc: [
      "2036: 🌟 10 YEARS. GOAL ACHIEVED. Move to Japan, enroll in an IT Vocational School (Senmon Gakko), and transition into a Japanese Web Engineer career!"
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
