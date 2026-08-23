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
import ArtGallery from "@/components/Gallery/ArtGallery";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { Shield } from "lucide-react";

import PRSidebar from "@/components/Navigation/PRSidebar";
import Inicio from "@/components/PuertoRico/Inicio";
import Timeline from "@/components/PuertoRico/Timeline";
import Diario from "@/components/PuertoRico/Diario";
import Cursos from "@/components/PuertoRico/Cursos";
import PuertoRicoInfo from "@/components/PuertoRico/PuertoRicoInfo";
import Ahorros from "@/components/PuertoRico/Ahorros";
import Habitos from "@/components/PuertoRico/Habitos";
import TechSetup from "@/components/PuertoRico/TechSetup";
import PomodoroModal from "@/components/PuertoRico/PomodoroModal";
import Confetti from "@/components/PuertoRico/Confetti";
import { getPRData } from "@/lib/pr-storage";
import { syncHunterToCloud } from "@/lib/cloud-sync";
import { isSystemAdmin } from "@/lib/hunter-system";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [showConfetti, setShowConfetti] = useState(false);
  const [prData, setPrData] = useState(() => getPRData());
  const daysSince = Math.floor((new Date().getTime() - new Date("2026-08-03").getTime()) / (1000 * 3600 * 24));

  // Reactive sync: re-read PR data whenever any component updates it
  useEffect(() => {
    let syncTimeout: NodeJS.Timeout;

    const triggerCloudSync = () => {
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
        } catch (e) {
          // Ignore parse errors or offline sync issues
        }
      }, 2000); // Debounce sync by 2 seconds
    };

    const handlePRUpdate = () => {
      setPrData(getPRData());
      triggerCloudSync();
    };
    const handleHunterUpdate = () => {
      setPrData(getPRData());
      triggerCloudSync();
    };
    const handleConfetti = () => setShowConfetti(true);

    window.addEventListener("prDataUpdated", handlePRUpdate);
    window.addEventListener("hunterStateChanged", handleHunterUpdate);
    window.addEventListener("triggerConfetti", handleConfetti);

    return () => {
      window.removeEventListener("prDataUpdated", handlePRUpdate);
      window.removeEventListener("hunterStateChanged", handleHunterUpdate);
      window.removeEventListener("triggerConfetti", handleConfetti);
    };
  }, []);


  return (
    <div className="min-h-screen bg-[#050811] text-zinc-100 flex flex-col font-sans selection:bg-system-blue selection:text-black">
      {/* Top Hunter Status Bar */}
      <HunterStatusBar onNavigate={(tab) => setActiveTab(tab as TabType)} />

      {/* Navigation Tab Bar (Top on Desktop, Fixed Bottom on Mobile) */}
      <SystemSidebar activeTab={activeTab as TabType} setActiveTab={setActiveTab} />
      <PRSidebar activeTab={activeTab} setActiveTab={setActiveTab} />



      {/* Main Content Area - pb-28 on mobile prevents bottom nav overlap */}
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
          {activeTab === "weight" && <WeightAndPrTracker />}
          {activeTab === "trophies" && <TrophyHall />}
          {activeTab === "gallery" && <ArtGallery />}
          {activeTab === "settings" && (
            <SystemSettings onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "membership" && <MembershipPortal />}
          {activeTab === "admin" && isSystemAdmin() && <AdminDashboard />}
          {activeTab === "admin" && !isSystemAdmin() && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
              <Shield className="w-16 h-16 text-red-500 animate-pulse" />
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">Access Denied</h2>
              <p className="text-zinc-400 text-sm max-w-sm">This area is restricted to the Creator Admin. You must sign in with the authorized account to access this panel.</p>
            </div>
          )}

          {/* PR Tabs */}
          {activeTab === "inicio" && <Inicio />}
          {activeTab === "timeline" && <Timeline />}
          {activeTab === "diario" && <Diario />}
          {activeTab === "cursos" && <Cursos />}
          {activeTab === "puertorico" && <PuertoRicoInfo />}
          {activeTab === "ahorros" && <Ahorros />}
          {activeTab === "habitos" && <Habitos />}
          {activeTab === "tech" && <TechSetup />}
        </div>
      </main>

      <PomodoroModal />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* System Footer - hidden on small mobile screens to keep app feeling clean */}
      <footer className="hidden sm:block w-full bg-system-panel/50 border-t border-white/5 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-system-blue" />
            <span className="font-bold text-zinc-400">BETTER LEVELING v2</span>
            <span>|</span>
            <span>Shadow Monarch Fitness & Health System</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-system-cyan">
              <span className="w-2 h-2 rounded-full bg-system-cyan animate-ping" />
              Calisthenics Apartment Dojo Sync Active
            </span>
            <span>|</span>
            <span>Offline-First Local Storage Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
