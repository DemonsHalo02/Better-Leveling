"use client";

import { db, storage } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { isSystemAdmin } from "./hunter-system";

export const ADMIN_EMAIL = "nickcrossonofficial@outlook.com";

export type ArtworkType = "art" | "manhua";

export interface ArtComment {
  id: string;
  authorEmail: string;
  authorName: string;
  text: string;
  createdAt: number;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  storagePath: string;
  uploadedBy: string;
  uploadedAt: number;
  type: ArtworkType;
  likes: string[];
  dislikes: string[];
}

export function isGalleryAdmin(email: string | null | undefined): boolean {
  if (typeof window !== "undefined" && isSystemAdmin()) return true;
  const clean = (email || "").trim().toLowerCase();
  return clean === ADMIN_EMAIL || clean === "ncrossonofficial06@gmail.com";
}

export function isGalleryVip(): boolean {
  if (typeof window === "undefined") return false;
  if (isSystemAdmin()) return true;
  const tier = localStorage.getItem("hunter_vip_tier");
  if (tier === "S-Rank VIP Guild") return true;
  try {
    const savedUser = localStorage.getItem("hunter_current_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return isGalleryAdmin(parsed.email) || parsed.tier === "S-Rank VIP Guild";
    }
  } catch {
    // ignore
  }
  return false;
}


export function getCurrentUserEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    const savedUser = localStorage.getItem("hunter_current_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return (parsed.email || "").trim().toLowerCase();
    }
  } catch {
    // ignore
  }
  return "";
}

export function getCurrentUserDisplayName(): string {
  if (typeof window === "undefined") return "Hunter";
  try {
    const savedUser = localStorage.getItem("hunter_current_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return parsed.displayName || parsed.email?.split("@")[0] || "Hunter";
    }
  } catch {
    // ignore
  }
  return "Hunter";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function getLocalArtworks(): Artwork[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("hunter_artworks_vault");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveLocalArtworks(items: Artwork[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("hunter_artworks_vault", JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("storage"));
    window.dispatchEvent(new CustomEvent("hunterStateChanged"));
  } catch (err) {
    console.warn("[ArtGallery] Local storage full or error:", err);
  }
}

export async function fetchArtworks(): Promise<Artwork[]> {
  const localItems = getLocalArtworks();
  if (!db || typeof window === "undefined") return localItems;

  try {
    const q = query(collection(db, "artworks"), orderBy("uploadedAt", "desc"));
    const snapshot = await getDocs(q);
    const cloudItems: Artwork[] = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "Untitled",
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        storagePath: data.storagePath || "",
        uploadedBy: data.uploadedBy || "",
        uploadedAt: data.uploadedAt?.toMillis?.() ?? data.uploadedAt ?? Date.now(),
        type: data.type || "art",
        likes: Array.isArray(data.likes) ? data.likes : [],
        dislikes: Array.isArray(data.dislikes) ? data.dislikes : [],
      } as Artwork;
    });

    // Merge local and cloud items by ID, prioritizing cloud imageUrl if not base64/offline
    const map = new Map<string, Artwork>();
    localItems.forEach((item) => map.set(item.id, item));
    cloudItems.forEach((item) => {
      const existing = map.get(item.id);
      if (existing) {
        map.set(item.id, {
          ...existing,
          ...item,
          imageUrl: item.imageUrl || existing.imageUrl,
          likes: item.likes || existing.likes,
          dislikes: item.dislikes || existing.dislikes,
        });
      } else {
        map.set(item.id, item);
      }
    });

    const merged = Array.from(map.values()).sort((a, b) => b.uploadedAt - a.uploadedAt);
    saveLocalArtworks(merged);
    return merged;
  } catch (err) {
    console.warn("[ArtGallery] Could not fetch cloud artworks (using local vault):", err);
    return localItems;
  }
}

export async function uploadArtwork(
  file: File,
  title: string,
  description: string,
  type: ArtworkType,
  uploaderEmail: string
): Promise<Artwork | null> {
  if (typeof window === "undefined") return null;
  if (!isGalleryAdmin(uploaderEmail) && !isGalleryAdmin(null)) return null;

  try {
    const base64Url = await fileToBase64(file);
    const artworkId = `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const storagePath = `artworks/${artworkId}/${file.name}`;

    const artwork: Artwork = {
      id: artworkId,
      title: title.trim() || "Untitled",
      description: description.trim(),
      imageUrl: base64Url,
      storagePath,
      uploadedBy: (uploaderEmail || ADMIN_EMAIL).trim().toLowerCase(),
      uploadedAt: Date.now(),
      type,
      likes: [],
      dislikes: [],
    };

    // Save locally right away and update UI immediately
    const local = getLocalArtworks();
    saveLocalArtworks([artwork, ...local]);

    // Attempt cloud backup non-blocking in the background
    if (db && storage) {
      setTimeout(async () => {
        try {
          const storageRef = ref(storage, storagePath);
          await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(storageRef);
          artwork.imageUrl = imageUrl;

          await setDoc(doc(db, "artworks", artworkId), {
            ...artwork,
            uploadedAt: Timestamp.fromMillis(artwork.uploadedAt),
          });

          // Update local item with cloud URL when ready
          const updatedLocal = getLocalArtworks().map((item) =>
            item.id === artworkId ? { ...item, imageUrl } : item
          );
          saveLocalArtworks(updatedLocal);
        } catch (cloudErr) {
          console.warn("[ArtGallery] Cloud upload offline or rules blocked, saved to local vault:", cloudErr);
        }
      }, 50);
    }

    return artwork;
  } catch (err) {
    console.error("[ArtGallery] Upload failed:", err);
    throw err;
  }
}

export async function deleteArtwork(artwork: Artwork, requesterEmail: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!isGalleryAdmin(requesterEmail)) return false;

  // Remove locally
  const local = getLocalArtworks().filter((item) => item.id !== artwork.id);
  saveLocalArtworks(local);
  localStorage.removeItem(`hunter_artworks_comments_${artwork.id}`);

  // Attempt cloud delete
  if (db) {
    try {
      if (storage && artwork.storagePath) {
        try {
          await deleteObject(ref(storage, artwork.storagePath));
        } catch {}
      }
      await deleteDoc(doc(db, "artworks", artwork.id));
      const commentsSnap = await getDocs(collection(db, "artworks", artwork.id, "comments"));
      await Promise.all(commentsSnap.docs.map((c) => deleteDoc(c.ref)));
    } catch (err) {
      console.warn("[ArtGallery] Cloud delete failed (removed locally):", err);
    }
  }
  return true;
}

export async function toggleArtworkReaction(
  artworkId: string,
  userEmail: string,
  reaction: "like" | "dislike"
): Promise<boolean> {
  if (!userEmail || typeof window === "undefined") return false;
  const email = userEmail.trim().toLowerCase();

  // Update locally
  const local = getLocalArtworks().map((item) => {
    if (item.id !== artworkId) return item;
    let likes = [...(item.likes || [])];
    let dislikes = [...(item.dislikes || [])];
    const hadLike = likes.includes(email);
    const hadDislike = dislikes.includes(email);

    likes = likes.filter((e) => e !== email);
    dislikes = dislikes.filter((e) => e !== email);

    if (reaction === "like") {
      if (!hadLike) likes.push(email);
    } else if (!hadDislike) {
      dislikes.push(email);
    }
    return { ...item, likes, dislikes };
  });
  saveLocalArtworks(local);

  // Attempt cloud update
  if (db) {
    try {
      const docRef = doc(db, "artworks", artworkId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        let likes: string[] = Array.isArray(data.likes) ? [...data.likes] : [];
        let dislikes: string[] = Array.isArray(data.dislikes) ? [...data.dislikes] : [];
        const hadLike = likes.includes(email);
        const hadDislike = dislikes.includes(email);

        likes = likes.filter((e) => e !== email);
        dislikes = dislikes.filter((e) => e !== email);

        if (reaction === "like") {
          if (!hadLike) likes.push(email);
        } else if (!hadDislike) {
          dislikes.push(email);
        }
        await updateDoc(docRef, { likes, dislikes });
      }
    } catch (err) {
      console.warn("[ArtGallery] Cloud reaction sync failed:", err);
    }
  }
  return true;
}

export async function fetchComments(artworkId: string): Promise<ArtComment[]> {
  if (typeof window === "undefined") return [];
  const localKey = `hunter_artworks_comments_${artworkId}`;
  let localComments: ArtComment[] = [];
  try {
    const raw = localStorage.getItem(localKey);
    if (raw) localComments = JSON.parse(raw);
  } catch {}

  if (!db) return localComments;
  try {
    const q = query(collection(db, "artworks", artworkId, "comments"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const cloudComments: ArtComment[] = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        authorEmail: data.authorEmail || "",
        authorName: data.authorName || "Hunter",
        text: data.text || "",
        createdAt: data.createdAt?.toMillis?.() ?? data.createdAt ?? Date.now(),
      };
    });

    const map = new Map<string, ArtComment>();
    localComments.forEach((c) => map.set(c.id, c));
    cloudComments.forEach((c) => map.set(c.id, c));
    const merged = Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
    try {
      localStorage.setItem(localKey, JSON.stringify(merged));
    } catch {}
    return merged;
  } catch (err) {
    console.warn("[ArtGallery] Cloud comments fetch failed (using local):", err);
    return localComments;
  }
}

export async function addComment(
  artworkId: string,
  authorEmail: string,
  authorName: string,
  text: string
): Promise<boolean> {
  if (!text.trim() || !authorEmail || typeof window === "undefined") return false;
  const localKey = `hunter_artworks_comments_${artworkId}`;

  const comment: ArtComment = {
    id: `cmt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    authorEmail: authorEmail.trim().toLowerCase(),
    authorName: authorName.trim() || "Hunter",
    text: text.trim(),
    createdAt: Date.now(),
  };

  let localComments: ArtComment[] = [];
  try {
    const raw = localStorage.getItem(localKey);
    if (raw) localComments = JSON.parse(raw);
    localStorage.setItem(localKey, JSON.stringify([comment, ...localComments]));
  } catch {}

  if (db) {
    try {
      await addDoc(collection(db, "artworks", artworkId, "comments"), {
        authorEmail: comment.authorEmail,
        authorName: comment.authorName,
        text: comment.text,
        createdAt: Timestamp.fromMillis(comment.createdAt),
      });
    } catch (err) {
      console.warn("[ArtGallery] Cloud comment save failed (saved locally):", err);
    }
  }
  return true;
}
