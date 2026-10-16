import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSyncStore } from '../../store/useSyncStore';
import { useNutritionStore, getTodayDateString } from '../../store/useNutritionStore';
import { Cloud, CloudOff, RefreshCw, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenSettings }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { status, lastSyncedAt, syncNow } = useSyncStore();
  const { selectedDate, setSelectedDate } = useNutritionStore();

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const isToday = selectedDate === getTodayDateString();

  return (
    <header className="sticky top-0 z-30 bg-dark-900/90 backdrop-blur-md border-b border-dark-750/70 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-dark-950 font-black text-sm shadow-md shadow-amber-500/10">
            BL
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-dark-50">Better Leveling</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dark-800 text-dark-400 border border-dark-750">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-dark-400 hidden sm:block">MacroFactor Minimalist & Calisthenics</p>
          </div>
        </div>

        {/* Date Selector Navigation */}
        <div className="flex items-center bg-dark-850 border border-dark-750 rounded-lg p-0.5 shadow-inner">
          <button
            onClick={handlePrevDay}
            className="p-1 rounded text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
            title="Previous Day"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setSelectedDate(getTodayDateString())}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-dark-200 hover:text-dark-50 transition"
          >
            <Calendar size={13} className="text-amber-400" />
            <span className="font-mono">
              {isToday ? 'Today' : selectedDate}
            </span>
          </button>
          <button
            onClick={handleNextDay}
            className="p-1 rounded text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
            title="Next Day"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Actions: Sync Pill & Profile */}
        <div className="flex items-center gap-2">
          {/* Cloud Sync Status Pill */}
          <button
            onClick={() => syncNow()}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border transition ${
              status === 'synced'
                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40 hover:bg-emerald-950/50'
                : status === 'syncing'
                ? 'bg-amber-950/30 text-amber-300 border-amber-800/40 animate-pulse'
                : status === 'error'
                ? 'bg-rose-950/30 text-rose-400 border-rose-800/40'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:bg-dark-800'
            }`}
            title={
              status === 'synced'
                ? `Database synchronized (${lastSyncedAt})`
                : status === 'syncing'
                ? 'Syncing to Supabase...'
                : 'Offline / Click to Sync'
            }
          >
            {status === 'synced' ? (
              <Cloud size={13} className="text-emerald-400" />
            ) : status === 'syncing' ? (
              <RefreshCw size={13} className="animate-spin text-amber-400" />
            ) : (
              <CloudOff size={13} className="text-dark-400" />
            )}
            <span className="capitalize hidden md:inline">{status}</span>
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={isAuthenticated ? onOpenSettings : onOpenAuth}
            className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-dark-850 hover:bg-dark-800 border border-dark-750 text-dark-200 transition"
            title={isAuthenticated ? `Signed in as ${user.displayName}` : 'Log in / Register'}
          >
            <div className="w-5 h-5 rounded-full bg-dark-750 border border-dark-600 flex items-center justify-center text-[10px] font-bold text-amber-400">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium hidden sm:inline truncate max-w-[90px]">
              {isAuthenticated ? user.displayName : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
