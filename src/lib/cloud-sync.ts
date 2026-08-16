"use client";

import { db, auth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { loadHunterState, saveHunterState, HunterState } from "./hunter-system";
import { getPRData, savePRData, PRStorageData } from "./pr-storage";

export interface CloudHunterProfile {
  email: string;
  displayName: string;
  tier: "E-Rank Free" | "S-Rank VIP Guild";
  hunterState: HunterState;
  prData?: PRStorageData;
  lastSynced: number;
}

/**
 * Pushes the hunter's VIP membership status and leveling state to Firebase Firestore cloud storage.
 * Enables multi-device account synchronization and persistent membership retention.
 */
export async function syncHunterToCloud(
  email: string,
  displayName: string,
  tier: "E-Rank Free" | "S-Rank VIP Guild"
): Promise<boolean> {
  if (!email || !db || typeof window === "undefined") return false;
  // Check if Firebase Auth has an active session — Firestore rules require this
  const firebaseUser = auth?.currentUser;
  if (!firebaseUser) {
    console.warn("[CloudSync] No active Firebase Auth session — skipping cloud sync.");
    return false;
  }
  try {
    const cleanEmail = email.trim().toLowerCase();
    const hunterState = loadHunterState();
    const prData = getPRData();
    
    const docRef = doc(db, "hunters", cleanEmail);
    const payload: CloudHunterProfile = {
      email: cleanEmail,
      displayName: displayName || cleanEmail.split("@")[0] || "Hunter",
      tier: tier || "E-Rank Free",
      hunterState,
      prData,
      lastSynced: Date.now(),
    };

    // Race against an 8-second timeout so we never hang indefinitely
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Cloud sync timed out after 8s")), 8000)
    );

    await Promise.race([setDoc(docRef, payload, { merge: true }), timeout]);
    console.log(`[CloudSync] Successfully backed up Hunter profile to Firebase for ${cleanEmail}`);
    return true;
  } catch (err) {
    console.warn("[CloudSync] Background sync offline or unconfigured (falling back to local storage):", err);
    return false;
  }
}

/**
 * Restores the hunter's VIP membership status and leveling state from Firebase Firestore cloud storage.
 * Called automatically upon Sign In or device switch.
 */
export async function restoreHunterFromCloud(email: string): Promise<CloudHunterProfile | null> {
  if (!email || !db || typeof window === "undefined") return null;
  try {
    const cleanEmail = email.trim().toLowerCase();
    const docRef = doc(db, "hunters", cleanEmail);

    // Race against a 6-second timeout so restore never hangs
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Cloud restore timed out after 6s")), 6000)
    );
    const docSnap = await Promise.race([getDoc(docRef), timeout]);

    if (docSnap.exists()) {
      const data = docSnap.data() as CloudHunterProfile;
      console.log(`[CloudSync] Found cloud profile for ${cleanEmail}:`, data);

      // Restore VIP tier globally
      if (data.tier) {
        localStorage.setItem("hunter_vip_tier", data.tier);
      }

      // Restore hunter leveling state if valid, then re-run daily reset logic
      if (data.hunterState && data.hunterState.level) {
        saveHunterState(data.hunterState);
        loadHunterState();
      }

      // Restore PR data if present
      if (data.prData) {
        savePRData(data.prData);
      }

      return data;
    }
  } catch (err) {
    console.warn("[CloudSync] Could not restore from cloud (using offline state):", err);
  }
  return null;
}
