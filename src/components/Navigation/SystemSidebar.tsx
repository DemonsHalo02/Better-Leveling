"use client";

import React from 'react';
import { ShieldAlert, Dumbbell, ScanLine, TrendingDown, Crown, Trophy, Settings, BookOpen } from 'lucide-react';
import { isSystemAdmin } from '@/lib/hunter-system';

export type TabType = 'quests' | 'workouts' | 'scanner' | 'courses' | 'weight' | 'account' | 'trophies' | 'settings' | 'admin';

interface SystemSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function SystemSidebar({ activeTab, setActiveTab }: SystemSidebarProps) {
  const [isAdmin, setIsAdmin] = React.useState(() => isSystemAdmin());

  React.useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(isSystemAdmin());
    };
    checkAdmin();
    window.addEventListener('hunterStateChanged', checkAdmin);
    window.addEventListener('storage', checkAdmin);
    return () => {
      window.removeEventListener('hunterStateChanged', checkAdmin);
      window.removeEventListener('storage', checkAdmin);
    };
  }, []);

  const navItems: { id: TabType; label: string; mobileLabel: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'quests',
      label: 'Daily Quests',
      mobileLabel: 'Quests',
      icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Live'
    },
    {
      id: 'workouts',
      label: 'Daily Workout',
      mobileLabel: 'Workout',
      icon: <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 'scanner',
      label: 'Macro Tracker',
      mobileLabel: 'Macros',
      icon: <ScanLine className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Cam'
    },
    {
      id: 'courses',
      label: 'My Courses',
      mobileLabel: 'Courses',
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Study'
    },
    {
      id: 'weight',
      label: 'Weight & PRs',
      mobileLabel: 'Stats',
      icon: <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      id: 'trophies',
      label: 'Trophy Hall',
      mobileLabel: 'Trophies',
      icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-system-gold animate-pulse" />,
      badge: 'XP'
    },
    {
      id: 'settings',
      label: 'System Settings',
      mobileLabel: 'Settings',
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-system-blue" />,
      badge: 'NEW'
    },
    {
      id: 'account',
      label: 'Account',
      mobileLabel: 'Account',
      icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-system-gold" />,
      badge: 'PRO'
    },
    ...(isAdmin
      ? [
          {
            id: 'admin' as TabType,
            label: 'System Overseer',
            mobileLabel: 'Admin',
            icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 animate-pulse" />,
            badge: 'GOD'
          }
        ]
      : [])
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation (Top Bar FF7 Style) */}
      <nav className="hidden md:block w-full bg-[#02060d]/80 backdrop-blur-md border-b border-system-blue/20 sticky top-[76px] z-40 shadow-xl tech-border overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto no-scrollbar pt-2 pl-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2 px-6 py-3 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-system-cyan bg-system-panel border-t-2 border-l-2 border-r border-system-blue shadow-glow-blue z-10'
                    : 'text-zinc-500 hover:text-white border-b border-transparent hover:border-system-blue/50'
                }`}
                style={isActive ? { clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' } : {}}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-sm font-mono uppercase font-black tracking-tighter ${
                      isActive
                        ? 'bg-system-cyan text-black'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Active scanline indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-system-cyan shadow-glow-blue animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar (Tactical UI) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#02060d]/95 backdrop-blur-2xl border-t-2 border-system-blue/50 py-1.5 shadow-[0_-10px_30px_rgba(0,240,255,0.15)] tech-border">
        {/* Subtle scroll indicator fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#02060d] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#02060d] via-[#02060d]/80 to-transparent pointer-events-none z-10" />
        
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1 max-w-2xl mx-auto px-2 scroll-smooth pb-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-none transition-all duration-200 select-none flex-shrink-0 min-w-[64px] ${
                  isActive
                    ? 'text-system-cyan bg-system-panel border border-system-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-zinc-500 hover:text-white bg-transparent'
                }`}
                style={isActive ? { clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' } : {}}
              >
                <div className={`relative transition-transform duration-200 mb-1 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(0,240,255,1)] text-system-cyan' : ''}`}>
                  {item.icon}
                  {item.badge && (
                    <span className={`absolute -top-1 -right-4 text-[8px] font-mono px-1 rounded-sm border border-black font-black leading-tight ${
                      isActive ? 'bg-system-cyan text-black' : 'bg-zinc-700 text-zinc-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-mono tracking-widest leading-none truncate w-full text-center uppercase ${isActive ? 'font-black text-white' : ''}`}>
                  {item.mobileLabel}
                </span>
                {isActive && (
                  <div className="absolute -bottom-px left-2 right-2 h-0.5 bg-system-cyan shadow-glow-blue" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
