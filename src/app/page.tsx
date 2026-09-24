"use client";

import React, { useState, useEffect, useCallback } from "react";
import HunterStatusBar from "@/components/Navigation/HunterStatusBar";
import SystemSidebar, { TabType } from "@/components/Navigation/SystemSidebar";
import DailyQuestDashboard from "@/components/Dashboard/DailyQuestDashboard";
import WorkoutQuestView from "@/components/Workouts/WorkoutQuestView";
import BarcodeScanner from "@/components/Scanner/BarcodeScanner";
import NutritionTracker from "@/components/Nutrition/NutritionTracker";
import WeightAndPrTracker from "@/components/Tracking/WeightAndPrTracker";
import MembershipPortal from "@/components/Membership/MembershipPortal";
import TrophyHall from "@/components/Dashboard/TrophyHall";
import SystemSettings from "@/components/Dashboard/SystemSettings";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import CourseTracker from "@/components/Courses/CourseTracker";
import { Shield } from "lucide-react";

import { syncHunterToCloud, restoreHunterFromCloud, subscribeToCloudProfile, markLocalChange } from "@/lib/cloud-sync";
import { isSystemAdmin } from "@/lib/hunter-system";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("quests");

  // Cloud sync: push local changes up, and subscribe to real-time updates from cloud
  useEffect(() => {
    let syncTimeout: NodeJS.Timeout;
    let unsubscribeSnapshot: (() => void) | null = null;

    // On app boot: set up real-time listener for cross-device sync
    try {
      const userStr = localStorage.getItem("hunter_current_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.email) {
          // Real-time listener for live cross-device sync
          unsubscribeSnapshot = subscribeToCloudProfile(user.email);
        }
      }
    } catch (e) {}

    // Debounced push: whenever local state changes, push to cloud after 2s
    const triggerCloudSync = () => {
      // Mark that a local change just happened so the listener doesn't overwrite it
      markLocalChange();
      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => {
        try {
          const userStr = localStorage.getItem("hunter_current_user");
          if (userStr) {
            const user = JSON.parse(userStr);
            if (user && user.email) {
              syncHunterToCloud(user.email, user.displayName, user.tier);
            }
          }
        } catch (e) {}
      }, 2000);
    };

    window.addEventListener("hunterStateChanged", triggerCloudSync);

    return () => {
      window.removeEventListener("hunterStateChanged", triggerCloudSync);
      clearTimeout(syncTimeout);
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100 flex flex-col font-sans selection:bg-system-blue selection:text-black">
      {/* Top Status Bar */}
      <HunterStatusBar onNavigate={(tab) => setActiveTab(tab as TabType)} />

      {/* Navigation Tab Bar (Top on Desktop, Fixed Bottom on Mobile) */}
      <SystemSidebar activeTab={activeTab as TabType} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-28 md:pb-12">
        <div className="animate-in fade-in duration-300">
          {activeTab === "quests" && (
            <DailyQuestDashboard onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "workouts" && <WorkoutQuestView />}
          {activeTab === "scanner" && (
            <div className="space-y-8">
              <BarcodeScanner onFoodLogged={() => {}} />
              <div className="border-t border-white/10 pt-8">
                <NutritionTracker onNavigate={(tab) => setActiveTab(tab)} />
              </div>
            </div>
          )}
          {activeTab === "courses" && <CourseTracker />}
          {activeTab === "weight" && <WeightAndPrTracker />}
          {activeTab === "trophies" && <TrophyHall />}

          {activeTab === "settings" && (
            <SystemSettings onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "account" && <MembershipPortal />}
          {activeTab === "admin" && isSystemAdmin() && <AdminDashboard />}
          {activeTab === "admin" && !isSystemAdmin() && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
              <Shield className="w-16 h-16 text-red-500 animate-pulse" />
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">Access Denied</h2>
              <p className="text-zinc-400 text-sm max-w-sm">This area is restricted to the Creator Admin. You must sign in with the authorized account to access this panel.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="hidden sm:block w-full bg-system-panel/50 border-t border-white/5 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-system-blue" />
            <span className="font-bold text-zinc-400">BETTER LEVELING: REBIRTH</span>
            <span>|</span>
            <span>Warrior of Light — Fitness & Health System</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-system-cyan">
              <span className="w-2 h-2 rounded-full bg-system-cyan animate-ping" />
              Aetheryte Link Active
            </span>
            <span>|</span>
            <span>Offline-First Materia Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
