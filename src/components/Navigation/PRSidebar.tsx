"use client";

import React from 'react';
import { Home, CalendarClock, BookOpen, Map, PiggyBank, Target, Smartphone, CalendarDays, GraduationCap } from 'lucide-react';

export type PRTabType = 'inicio' | 'timeline' | 'diario' | 'cursos' | 'koreainfo' | 'ahorros' | 'habitos' | 'tech';

interface PRSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SafeIcon = ({ icon: Icon, className }: { icon: any, className: string }) => {
  if (typeof Icon === 'undefined') return null;
  return <Icon className={className} />;
};

export default function PRSidebar({ activeTab, setActiveTab }: PRSidebarProps) {
  const prNavItems = [
    { id: "inicio", label: "Dashboard", mobileLabel: "Home", icon: Home, badge: undefined },
    { id: "timeline", label: "Master Plan", mobileLabel: "Plan", icon: CalendarClock, badge: undefined },
    { id: "diario", label: "Daily Ops", mobileLabel: "Daily", icon: CalendarDays, badge: 'Today' },
    { id: "cursos", label: "Skill Tree", mobileLabel: "Skills", icon: BookOpen, badge: undefined },
    { id: "koreainfo", label: "Korea Relocation", mobileLabel: "Korea", icon: Map, badge: 'Post-Grad' },
    { id: "ahorros", label: "Funding", mobileLabel: "Funds", icon: PiggyBank, badge: undefined },
    { id: "habitos", label: "Consistency", mobileLabel: "Habits", icon: Target, badge: undefined },
    { id: "tech", label: "Tech Stack", mobileLabel: "Tech", icon: Smartphone, badge: undefined }
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation (Secondary Top Bar) */}
      <nav className="hidden md:block w-full bg-[#0a0a0a]/40 backdrop-blur-xl border-b border-white/5 sticky top-[125px] z-30 px-4 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {prNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl font-sans font-bold text-[11px] sm:text-xs tracking-wide transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] font-black scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                      isActive
                        ? 'bg-black/40 text-purple-200 font-bold backdrop-blur-md border border-purple-400/30'
                        : 'bg-indigo-900/30 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Secondary Fixed Bottom Navigation Bar (Sits above the primary one) */}
      <nav className="md:hidden fixed bottom-[64px] left-0 right-0 z-40 bg-[#0a0a0a]/60 backdrop-blur-2xl border-t border-white/10 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#050811] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#050811] via-[#050811]/80 to-transparent pointer-events-none z-10" />
        
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1 max-w-2xl mx-auto px-2 scroll-smooth">
          {prNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 select-none flex-shrink-0 min-w-[54px] ${
                  isActive
                    ? 'text-white bg-indigo-500/20 font-black shadow-[0_0_12px_rgba(99,102,241,0.2)] border border-indigo-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 active:bg-white/5 font-medium'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full animate-pulse bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
                
                <div className={`relative transition-transform duration-200 mb-0.5 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''}`}>
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-3 text-[7px] font-mono px-1 rounded-full border border-black/50 font-bold leading-tight bg-purple-500 text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[8px] font-sans tracking-tight leading-none truncate w-full text-center ${isActive ? 'font-bold text-white' : ''}`}>
                  {item.mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
