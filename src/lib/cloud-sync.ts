"use client";

import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { loadHunterState, saveHunterState, HunterState } from "./hunter-system";

export interface CloudHunterProfile {
  email: string;
  displayName: string;
  tier: string;
  hunterState: HunterState;
  lastSynced: number;
  appData?: Record<string, string>;
}

/**
 * Pushes the current local state to Firestore.
 * Returns true on success, or an error message string on failure.
 */
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
      if (key && (key.startsWith("pf_") || key.startsWith("hunter_") || key === "better_leveling_v2_state")) {
        appData[key] = localStorage.getItem(key) || "";
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
      setTimeout(() => reject(new Error("Cloud sync timed out after 10s")), 10000)
    );

    await Promise.race([setDoc(docRef, payload, { merge: true }), timeout]);
    console.log(`[CloudSync] ✅ Backed up profile for ${cleanEmail}`);
    return true;
  } catch (err: any) {
    const msg = err?.message || err?.code || "Unknown error";
    console.error("[CloudSync] ❌ Sync FAILED:", msg, err);
    return msg;
  }
}

/**
 * One-shot pull of cloud data into localStorage.
 */
export async function restoreHunterFromCloud(
  email: string
): Promise<CloudHunterProfile | null> {
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
      console.log(`[CloudSync] ✅ Found cloud profile for ${cleanEmail}`);

      applyCloudDataLocally(data);
      return data;
    } else {
      console.log(`[CloudSync] No cloud profile found for ${cleanEmail}`);
    }
  } catch (err) {
    console.warn("[CloudSync] ❌ Could not restore from cloud:", err);
  }
  return null;
}

/**
 * Real-time Firestore listener. Whenever the cloud document changes
 * (e.g. from another device pushing), this automatically pulls
 * the new data into localStorage and re-renders all components.
 */
export function subscribeToCloudProfile(email: string): Unsubscribe {
  if (!email || !db || typeof window === "undefined") return () => {};

  const cleanEmail = email.trim().toLowerCase();
  const docRef = doc(db, "hunters", cleanEmail);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CloudHunterProfile;
        console.log("[CloudSync] 🔄 Real-time update received from cloud");
        applyCloudDataLocally(data);
      }
    },
    (error) => {
      console.warn("[CloudSync] Real-time listener error:", error);
    }
  );
}

/**
 * Applies a CloudHunterProfile's data into localStorage and
 * dispatches events so React components re-render.
 */
function applyCloudDataLocally(data: CloudHunterProfile) {
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
    Object.keys(data.appData).forEach((key) => {
      if (data.appData![key]) {
        localStorage.setItem(key, data.appData![key]);
      }
    });
  }

  // Notify all React components to re-read localStorage
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("hunterStateChanged"));
}
