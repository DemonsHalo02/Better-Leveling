import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { BottomNav, ActiveTab } from './components/common/BottomNav';
import { NutritionView } from './components/nutrition/NutritionView';
import { WorkoutView } from './components/workout/WorkoutView';
import { WeightView } from './components/weight/WeightView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthStore } from './store/useAuthStore';
import { useSyncStore } from './store/useSyncStore';
import { useWorkoutStore } from './store/useWorkoutStore';
import { getSupabase } from './lib/supabase';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('nutrition');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { checkSession, isAuthenticated, user } = useAuthStore();
  const { syncNow, isAutoSyncEnabled } = useSyncStore();
  const { activeSession } = useWorkoutStore();

  // 1. Initial session verification & initial cloud sync
  useEffect(() => {
    const init = async () => {
      await checkSession();
      if (useAuthStore.getState().isAuthenticated && useSyncStore.getState().isAutoSyncEnabled) {
        await syncNow();
      }
    };
    init();
  }, [checkSession, syncNow]);

  // 2. Auto-sync on window focus & mobile tab visibility change
  useEffect(() => {
    const handleResume = () => {
      if (
        document.visibilityState === 'visible' &&
        useAuthStore.getState().isAuthenticated &&
        useSyncStore.getState().isAutoSyncEnabled
      ) {
        syncNow();
      }
    };

    window.addEventListener('focus', handleResume);
    document.addEventListener('visibilitychange', handleResume);
    return () => {
      window.removeEventListener('focus', handleResume);
      document.removeEventListener('visibilitychange', handleResume);
    };
  }, [syncNow]);

  // 3. Periodic background auto-sync every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (
        document.visibilityState === 'visible' &&
        useAuthStore.getState().isAuthenticated &&
        useSyncStore.getState().isAutoSyncEnabled
      ) {
        syncNow();
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [syncNow]);

  // 4. Supabase Realtime multi-device synchronization
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !isAuthenticated || user.id === 'local-athlete') {
      return;
    }

    const channel = supabase
      .channel(`cloud-sync-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          if (useSyncStore.getState().isAutoSyncEnabled) {
            syncNow();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user.id, syncNow]);

  const handleOpenSettings = () => {
    setActiveTab('settings');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6">
        {activeTab === 'nutrition' && <NutritionView />}
        {activeTab === 'workout' && <WorkoutView />}
        {activeTab === 'weight' && <WeightView />}
        {activeTab === 'settings' && (
          <SettingsView onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        )}
      </main>

      {/* Mobile-first Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isWorkoutActive={Boolean(activeSession)}
      />

      {/* Auth Modal for Login / Signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenSettings={handleOpenSettings}
      />
    </div>
  );
};

export default App;
