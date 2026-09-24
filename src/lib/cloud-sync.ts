"use client";

import { db, auth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { loadHunterState, saveHunterState, HunterState } from "./hunter-system";

export interface CloudHunterProfile {
  email: string;
  displayName: string;
  tier: "Classless" | "Level 100 VIP Guild";
  HunterState: HunterState;
  lastSynced: number;
}

/**
 * Pushes the Adventurer's VIP membership status and leveling state to Firebase Firestore cloud storage.
 * Enables multi-device account synchronization and persistent membership retention.
 */
export async function syncHunterToCloud(
  email: string,
  displayName: string,
  tier: "Classless" | "Level 100 VIP Guild"
): Promise<boolean | string> {
  if (!email || !db || typeof (db as any).type === "undefined" || typeof window === "undefined") {
    console.warn("[CloudSync] Aborted: Firestore DB not fully initialized.");
    return false;
  }
  try {
    const cleanEmail = email.trim().toLowerCase();
    const HunterState = loadHunterState();
    
    const docRef = doc(db, "Adventurers", cleanEmail);
    const payload: CloudHunterProfile = {
      email: cleanEmail,
      displayName: displayName || cleanEmail.split("@")[0] || "Adventurer",
      tier: tier || "Classless",
      HunterState,
      lastSynced: Date.now(),
    };

    // Race against an 8-second timeout so we never hang indefinitely
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Cloud sync timed out after 8s")), 8000)
    );

    await Promise.race([setDoc(docRef, payload, { merge: true }), timeout]);
    console.log(`[CloudSync] Successfully backed up Adventurer profile to Firebase for ${cleanEmail}`);
    return true;
  } catch (err: any) {
    console.warn("[CloudSync] Background sync offline or unconfigured (falling back to local storage):", err);
    return err.message || "Unknown error";
  }
}

/**
 * Restores the Adventurer's VIP membership status and leveling state from Firebase Firestore cloud storage.
 * Called automatically upon Sign In or device switch.
 */
export async function restoreHunterFromCloud(email: string): Promise<CloudHunterProfile | null> {
  if (!email || !db || typeof (db as any).type === "undefined" || typeof window === "undefined") {
    console.warn("[CloudSync] Aborted: Firestore DB not fully initialized.");
    return null;
  }
  try {
    const cleanEmail = email.trim().toLowerCase();
    const docRef = doc(db, "Adventurers", cleanEmail);

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

      // Restore Adventurer leveling state if valid, then re-run daily reset logic
      if (data.HunterState && data.HunterState.level) {
        saveHunterState(data.HunterState);
        loadHunterState();
      }

      return data;
    }
  } catch (err) {
    console.warn("[CloudSync] Could not restore from cloud (using offline state):", err);
  }
  return null;
}
