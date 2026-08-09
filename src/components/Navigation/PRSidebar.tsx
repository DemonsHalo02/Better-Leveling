"use client";

import React from 'react';
import { Home, CalendarClock, BookOpen, Map, PiggyBank, Target, Smartphone, CalendarDays } from 'lucide-react';

export type PRTabType = 'inicio' | 'timeline' | 'diario' | 'cursos' | 'puertorico' | 'ahorros' | 'habitos' | 'tech';

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
    { id: "inicio", label: "Home", mobileLabel: "Home", icon: Home, badge: undefined },
    { id: "timeline", label: "Timeline", mobileLabel: "Timeline", icon: CalendarClock, badge: undefined },
    { id: "diario", label: "Daily", mobileLabel: "Daily", icon: CalendarDays, badge: 'Today' },
    { id: "cursos", label: "Courses", mobileLabel: "Courses", icon: BookOpen, badge: undefined },
    { id: "puertorico", label: "Future Plan", mobileLabel: "Plan", icon: Map, badge: '10yr' },
    { id: "ahorros", label: "Savings", mobileLabel: "Savings", icon: PiggyBank, badge: undefined },
    { id: "habitos", label: "Habits", mobileLabel: "Habits", icon: Target, badge: undefined },
    { id: "tech", label: "Tech Setup", mobileLabel: "Tech", icon: Smartphone, badge: undefined }
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation (Secondary Top Bar) */}
      <nav className="hidden md:block w-full bg-[#ce1126]/10 backdrop-blur-xl border-b border-[#ce1126]/30 sticky top-[125px] z-30 px-4 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {prNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ce1126] to-[#f5a623] text-white shadow-[0_0_15px_rgba(206,17,38,0.4)] font-black scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-[#ce1126]/20 border border-transparent hover:border-[#ce1126]/30'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                      isActive
                        ? 'bg-black text-[#f5a623] font-black shadow-sm'
                        : 'bg-[#0a3d8f]/30 text-[#0a3d8f] border border-[#0a3d8f]/50'
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
      <nav className="md:hidden fixed bottom-[64px] left-0 right-0 z-40 bg-[#ce1126]/10 backdrop-blur-2xl border-t border-[#ce1126]/30 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
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
                    ? 'text-white bg-[#ce1126]/30 font-black shadow-[0_0_12px_rgba(206,17,38,0.4)]'
                    : 'text-zinc-500 hover:text-zinc-300 active:bg-white/5 font-medium'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full animate-pulse bg-[#ce1126] shadow-[0_0_8px_rgba(206,17,38,0.8)]" />
                )}
                
                <div className={`relative transition-transform duration-200 mb-0.5 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(206,17,38,0.8)]' : ''}`}>
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-3 text-[7px] font-mono px-1 rounded-full border border-black font-bold leading-tight bg-[#f5a623] text-black">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[8px] font-mono tracking-tight leading-none truncate w-full text-center ${isActive ? 'font-black text-white' : ''}`}>
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
