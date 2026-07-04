"use client";

import React from 'react';
import { ShieldAlert, Dumbbell, ScanLine, TrendingDown, ShoppingBag } from 'lucide-react';

export type TabType = 'quests' | 'workouts' | 'scanner' | 'weight' | 'grocery';

interface SystemSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function SystemSidebar({ activeTab, setActiveTab }: SystemSidebarProps) {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'quests',
      label: 'Daily Quests',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: 'Active'
    },
    {
      id: 'workouts',
      label: '6-Day PPL (PF)',
      icon: <Dumbbell className="w-5 h-5" />
    },
    {
      id: 'scanner',
      label: 'Barcode Scanner',
      icon: <ScanLine className="w-5 h-5" />,
      badge: 'Live'
    },
    {
      id: 'weight',
      label: 'Weight & PRs',
      icon: <TrendingDown className="w-5 h-5" />
    },
    {
      id: 'grocery',
      label: 'ME Grocery Guide',
      icon: <ShoppingBag className="w-5 h-5" />
    }
  ];

  return (
    <nav className="w-full bg-system-panel/80 backdrop-blur-md border-b border-system-blue/20 sticky top-[65px] z-40 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center gap-2 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-system-blue text-system-dark shadow-glow-blue font-black scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-system-card border border-transparent hover:border-system-blue/30'
              }`}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase ${
                    isActive
                      ? 'bg-system-dark text-system-blue font-black'
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
  );
}
