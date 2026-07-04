"use client";

import React from 'react';
import { ShieldAlert, Dumbbell, ScanLine, TrendingDown, ShoppingBag, Crown } from 'lucide-react';

export type TabType = 'quests' | 'workouts' | 'scanner' | 'weight' | 'grocery' | 'membership';

interface SystemSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function SystemSidebar({ activeTab, setActiveTab }: SystemSidebarProps) {
  const navItems: { id: TabType; label: string; mobileLabel: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'quests',
      label: 'Daily Quests',
      mobileLabel: 'Quests',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: 'Live'
    },
    {
      id: 'workouts',
      label: '6-Day PPL (PF)',
      mobileLabel: 'Workout',
      icon: <Dumbbell className="w-5 h-5" />
    },
    {
      id: 'scanner',
      label: 'Barcode Scanner',
      mobileLabel: 'Scanner',
      icon: <ScanLine className="w-5 h-5" />,
      badge: 'Cam'
    },
    {
      id: 'weight',
      label: 'Weight & PRs',
      mobileLabel: 'Weight',
      icon: <TrendingDown className="w-5 h-5" />
    },
    {
      id: 'grocery',
      label: 'ME Grocery Guide',
      mobileLabel: 'Grocery',
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      id: 'membership',
      label: 'VIP Guild Account',
      mobileLabel: 'VIP Guild',
      icon: <Crown className="w-5 h-5 text-system-gold" />,
      badge: 'PRO'
    }
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation (Top Bar) */}
      <nav className="hidden md:block w-full bg-[#050811]/80 backdrop-blur-xl border-b border-system-blue/20 sticky top-[68px] z-40 px-4 py-2.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-system-blue to-system-cyan text-black shadow-glow-blue font-black scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-system-card border border-transparent hover:border-system-blue/30'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                      isActive
                        ? 'bg-black text-system-blue font-black shadow-sm'
                        : item.id === 'membership'
                        ? 'bg-system-gold/20 text-system-gold border border-system-gold/50 font-black'
                        : 'bg-system-blue/20 text-system-cyan border border-system-blue/30'
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

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050811]/95 backdrop-blur-2xl border-t border-system-blue/30 px-1 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
        <div className="grid grid-cols-6 gap-0.5 max-w-xl mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all duration-200 select-none ${
                  isActive
                    ? item.id === 'membership'
                      ? 'text-system-gold bg-system-gold/15 font-black shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                      : 'text-system-cyan bg-system-blue/15 font-black shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-zinc-500 hover:text-zinc-300 active:bg-white/5 font-medium'
                }`}
              >
                {/* Active top neon indicator */}
                {isActive && (
                  <span className={`absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full animate-pulse ${item.id === 'membership' ? 'bg-system-gold shadow-glow-gold' : 'bg-system-cyan shadow-glow-blue'}`} />
                )}
                
                <div className={`relative transition-transform duration-200 mb-1 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : ''}`}>
                  {item.icon}
                  {item.badge && (
                    <span className={`absolute -top-1 -right-3 text-[7px] font-mono px-1 rounded-full border border-black font-bold leading-tight ${
                      item.id === 'membership' ? 'bg-system-gold text-black font-black' : 'bg-system-purple text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-mono tracking-tight leading-none truncate w-full text-center ${isActive ? 'font-black text-white' : ''}`}>
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
