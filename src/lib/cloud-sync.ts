"use client";

import { db, auth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { loadHunterState, saveHunterState, HunterState } from "./hunter-system";

export interface CloudHunterProfile {
  email: string;
  displayName: string;
  tier: string;
  hunterState: HunterState;
  lastSynced: number;
  appData?: Record<string, string>;
}

export async function syncHunterToCloud(
  email: string,
  displayName: string,
  tier: string
): Promise<boolean | string> {
  if (!email || !db || typeof window === "undefined") {
    console.warn("[CloudSync] Aborted: missing email or DB.");
    return false;
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const hunterState = loadHunterState();
    
    // Gather all app-specific keys from localStorage
    const appData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('pf_') || key.startsWith('hunter_'))) {
        appData[key] = localStorage.getItem(key) || '';
      }
    }
    
    const docRef = doc(db, "hunters", cleanEmail);
    const payload: CloudHunterProfile = {
      email: cleanEmail,
      displayName: displayName || cleanEmail.split("@")[0] || "Adventurer",
      tier: tier || "Classless",
      hunterState,
      appData,
      lastSynced: Date.now(),
    };

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Cloud sync timed out after 8s")), 8000)
    );

    await Promise.race([setDoc(docRef, payload, { merge: true }), timeout]);
    console.log(`[CloudSync] Backed up profile for ${cleanEmail}`);
    return true;
  } catch (err: any) {
    console.warn("[CloudSync] Sync failed:", err);
    return err.message || "Unknown error";
  }
}

export async function restoreHunterFromCloud(email: string): Promise<CloudHunterProfile | null> {
  if (!email || !db || typeof window === "undefined") {
    return null;
  }
  try {
    const cleanEmail = email.trim().toLowerCase();
    const docRef = doc(db, "hunters", cleanEmail);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Cloud restore timed out after 6s")), 6000)
    );
    const docSnap = await Promise.race([getDoc(docRef), timeout]);

    if (docSnap.exists()) {
      const data = docSnap.data() as CloudHunterProfile;
      console.log(`[CloudSync] Found cloud profile for ${cleanEmail}:`, data);

      // Restore VIP tier
      if (data.tier) {
        localStorage.setItem("hunter_vip_tier", data.tier);
      }

      // Restore hunter leveling state
      if (data.hunterState && data.hunterState.level) {
        saveHunterState(data.hunterState);
        loadHunterState();
      }

      // Restore all app data keys
      if (data.appData) {
        Object.keys(data.appData).forEach(key => {
          if (data.appData![key]) {
            localStorage.setItem(key, data.appData![key]);
          }
        });
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('hunterStateChanged'));
      }

      return data;
    }
  } catch (err) {
    console.warn("[CloudSync] Could not restore from cloud:", err);
  }
  return null;
}
