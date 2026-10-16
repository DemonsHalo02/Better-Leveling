import React from 'react';
import { Utensils, Flame, TrendingUp, Settings } from 'lucide-react';

export type ActiveTab = 'nutrition' | 'workout' | 'weight' | 'settings';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isWorkoutActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  isWorkoutActive,
}) => {
  const tabs = [
    {
      id: 'nutrition' as ActiveTab,
      label: 'Nutrition',
      icon: Utensils,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'workout' as ActiveTab,
      label: 'Calisthenics',
      icon: Flame,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/10 border-emerald-500/30',
      badge: isWorkoutActive ? 'Active' : undefined,
    },
    {
      id: 'weight' as ActiveTab,
      label: 'Weight & TDEE',
      icon: TrendingUp,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Settings',
      icon: Settings,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/10 border-purple-500/30',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-dark-950/95 backdrop-blur-md border-t border-dark-800/80 px-2 py-1.5 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl border transition-all ${
                isActive
                  ? `${tab.activeBg} ${tab.color} font-medium`
                  : 'border-transparent text-dark-400 hover:text-dark-200'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-emerald-500 text-[8px] font-bold text-dark-950 animate-pulse">
                    ●
                  </span>
                )}
              </div>
              <span className="text-[10.5px] mt-1 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
