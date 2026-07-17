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

export const ADMIN_EMAIL = "ncrossonofficial06@gmail.com";

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
  return (email || "").trim().toLowerCase() === ADMIN_EMAIL;
}

export function isGalleryVip(): boolean {
  if (typeof window === "undefined") return false;
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

export async function fetchArtworks(): Promise<Artwork[]> {
  if (!db || typeof window === "undefined") return [];
  try {
    const q = query(collection(db, "artworks"), orderBy("uploadedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
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
  } catch (err) {
    console.warn("[ArtGallery] Could not fetch artworks:", err);
    return [];
  }
}

export async function uploadArtwork(
  file: File,
  title: string,
  description: string,
  type: ArtworkType,
  uploaderEmail: string
): Promise<Artwork | null> {
  if (!db || !storage || typeof window === "undefined") return null;
  if (!isGalleryAdmin(uploaderEmail)) return null;

  try {
    const artworkId = `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const storagePath = `artworks/${artworkId}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    const artwork: Artwork = {
      id: artworkId,
      title: title.trim() || "Untitled",
      description: description.trim(),
      imageUrl,
      storagePath,
      uploadedBy: uploaderEmail.trim().toLowerCase(),
      uploadedAt: Date.now(),
      type,
      likes: [],
      dislikes: [],
    };

    await setDoc(doc(db, "artworks", artworkId), {
      ...artwork,
      uploadedAt: Timestamp.fromMillis(artwork.uploadedAt),
    });

    return artwork;
  } catch (err) {
    console.error("[ArtGallery] Upload failed:", err);
    throw err;
  }
}

export async function deleteArtwork(artwork: Artwork, requesterEmail: string): Promise<boolean> {
  if (!db || typeof window === "undefined") return false;
  if (!isGalleryAdmin(requesterEmail)) return false;

  try {
    if (storage && artwork.storagePath) {
      try {
        await deleteObject(ref(storage, artwork.storagePath));
      } catch {
        // file may already be gone
      }
    }
    await deleteDoc(doc(db, "artworks", artwork.id));

    const commentsSnap = await getDocs(collection(db, "artworks", artwork.id, "comments"));
    await Promise.all(commentsSnap.docs.map((c) => deleteDoc(c.ref)));
    return true;
  } catch (err) {
    console.error("[ArtGallery] Delete failed:", err);
    return false;
  }
}

export async function toggleArtworkReaction(
  artworkId: string,
  userEmail: string,
  reaction: "like" | "dislike"
): Promise<boolean> {
  if (!db || !userEmail) return false;

  try {
    const docRef = doc(db, "artworks", artworkId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return false;

    const data = snap.data();
    let likes: string[] = Array.isArray(data.likes) ? [...data.likes] : [];
    let dislikes: string[] = Array.isArray(data.dislikes) ? [...data.dislikes] : [];
    const email = userEmail.trim().toLowerCase();

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
    return true;
  } catch (err) {
    console.error("[ArtGallery] Reaction failed:", err);
    return false;
  }
}

export async function fetchComments(artworkId: string): Promise<ArtComment[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, "artworks", artworkId, "comments"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        authorEmail: data.authorEmail || "",
        authorName: data.authorName || "Hunter",
        text: data.text || "",
        createdAt: data.createdAt?.toMillis?.() ?? data.createdAt ?? Date.now(),
      };
    });
  } catch (err) {
    console.warn("[ArtGallery] Could not fetch comments:", err);
    return [];
  }
}

export async function addComment(
  artworkId: string,
  authorEmail: string,
  authorName: string,
  text: string
): Promise<boolean> {
  if (!db || !text.trim() || !authorEmail) return false;

  try {
    await addDoc(collection(db, "artworks", artworkId, "comments"), {
      authorEmail: authorEmail.trim().toLowerCase(),
      authorName: authorName.trim() || "Hunter",
      text: text.trim(),
      createdAt: Timestamp.fromMillis(Date.now()),
    });
    return true;
  } catch (err) {
    console.error("[ArtGallery] Comment failed:", err);
    return false;
  }
}
