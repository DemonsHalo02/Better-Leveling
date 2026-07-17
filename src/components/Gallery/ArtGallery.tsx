"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Palette,
  Crown,
  Lock,
  Upload,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Trash2,
  Image as ImageIcon,
  BookOpen,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import {
  Artwork,
  ArtComment,
  ArtworkType,
  fetchArtworks,
  uploadArtwork,
  deleteArtwork,
  toggleArtworkReaction,
  fetchComments,
  addComment,
  isGalleryVip,
  isGalleryAdmin,
  getCurrentUserEmail,
  getCurrentUserDisplayName,
} from "@/lib/art-gallery";

export default function ArtGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadType, setUploadType] = useState<ArtworkType>("art");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [comments, setComments] = useState<ArtComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    const items = await fetchArtworks();
    setArtworks(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    const email = getCurrentUserEmail();
    setUserEmail(email);
    setIsVip(isGalleryVip());
    setIsAdmin(isGalleryAdmin(email));
    loadGallery();
  }, [loadGallery]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) {
      setUploadError("Title and image file are required.");
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const result = await uploadArtwork(uploadFile, uploadTitle, uploadDesc, uploadType, userEmail);
      if (result) {
        setUploadTitle("");
        setUploadDesc("");
        setUploadFile(null);
        await loadGallery();
      } else {
        setUploadError("Upload failed. Check Firebase Storage configuration.");
      }
    } catch {
      setUploadError("Upload failed. Ensure Firebase Storage is enabled and rules allow uploads.");
    }
    setUploading(false);
  };

  const handleReaction = async (artwork: Artwork, reaction: "like" | "dislike") => {
    if (!userEmail) return;
    await toggleArtworkReaction(artwork.id, userEmail, reaction);
    await loadGallery();
    if (selectedArt?.id === artwork.id) {
      const updated = await fetchArtworks();
      const refreshed = updated.find((a) => a.id === artwork.id);
      if (refreshed) setSelectedArt(refreshed);
    }
  };

  const openArtDetail = async (art: Artwork) => {
    setSelectedArt(art);
    setCommentText("");
    const fetched = await fetchComments(art.id);
    setComments(fetched);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArt || !commentText.trim() || !userEmail) return;
    setCommentLoading(true);
    const ok = await addComment(selectedArt.id, userEmail, getCurrentUserDisplayName(), commentText);
    if (ok) {
      setCommentText("");
      const fetched = await fetchComments(selectedArt.id);
      setComments(fetched);
    }
    setCommentLoading(false);
  };

  const handleDelete = async (art: Artwork) => {
    if (!confirm(`Delete "${art.title}"? This cannot be undone.`)) return;
    const ok = await deleteArtwork(art, userEmail);
    if (ok) {
      if (selectedArt?.id === art.id) setSelectedArt(null);
      await loadGallery();
    }
  };

  if (!isVip) {
    return (
      <div className="space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-gold/40 shadow-glow-gold">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-system-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="relative z-10 flex flex-col items-center text-center gap-4 py-8">
            <div className="w-16 h-16 rounded-2xl bg-system-gold/20 border border-system-gold flex items-center justify-center">
              <Lock className="w-8 h-8 text-system-gold" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-gold/10 border border-system-gold text-system-gold text-xs font-mono uppercase tracking-widest font-bold">
              <Crown className="w-3.5 h-3.5" />
              S-Rank VIP Guild Exclusive
            </div>
            <h2 className="text-2xl font-black tracking-wider text-white uppercase">Shadow Monarch Art Vault</h2>
            <p className="text-zinc-300 text-sm max-w-lg leading-relaxed">
              Premium guild members get exclusive access to original art and manhua chapters. Like, dislike, and comment on each piece. Upgrade to S-Rank VIP Guild to unlock the vault.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-purple/40 shadow-glow-purple">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-system-purple/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-purple/10 border border-system-purple text-system-cyan text-xs font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-system-purple animate-spin" />
              VIP Guild Art Vault
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase flex items-center gap-2">
              <Palette className="w-7 h-7 text-system-purple" />
              Shadow Monarch Gallery
            </h2>
            <p className="text-zinc-300 text-sm max-w-2xl">
              Browse exclusive original art and manhua chapters. React and comment on each piece.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-system-gold/20 border border-system-gold text-system-gold text-xs font-black uppercase tracking-wider">
            <Crown className="w-4 h-4" />
            {isAdmin ? "Creator Access" : "VIP Access Active"}
          </div>
        </div>
      </div>

      {/* Admin Upload Panel */}
      {isAdmin && (
        <div className="bg-system-panel rounded-2xl p-6 border border-system-gold/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Upload className="w-5 h-5 text-system-gold" />
            <h3 className="text-base font-black tracking-widest uppercase text-white">Upload Art / Manhua</h3>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Title (e.g. Chapter 1 - The Awakening)"
                className="bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-system-gold transition-all"
                required
              />
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value as ArtworkType)}
                className="bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-system-gold transition-all"
              >
                <option value="art">Original Art</option>
                <option value="manhua">Manhua Chapter</option>
              </select>
            </div>
            <textarea
              value={uploadDesc}
              onChange={(e) => setUploadDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-system-gold transition-all resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-system-card hover:bg-system-gold/20 border border-system-gold/40 text-system-gold text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
                <ImageIcon className="w-4 h-4" />
                {uploadFile ? uploadFile.name : "Choose Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </label>
              <button
                type="submit"
                disabled={uploading || !uploadFile}
                className="px-6 py-2.5 rounded-xl bg-system-gold text-system-dark hover:bg-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 disabled:opacity-50 shadow-glow-gold"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploading..." : "Upload to Cloud Vault"}
              </button>
            </div>
            {uploadError && (
              <p className="text-red-400 text-xs font-mono">{uploadError}</p>
            )}
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-system-cyan animate-spin" />
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-12 bg-system-panel rounded-2xl border border-dashed border-white/10">
          <Palette className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm font-mono">No art uploaded yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-system-panel rounded-2xl border border-system-blue/20 overflow-hidden shadow-lg hover:border-system-purple/50 transition-all cursor-pointer group"
              onClick={() => openArtDetail(art)}
            >
              <div className="relative aspect-[3/4] bg-system-dark overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-2 left-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  art.type === "manhua" ? "bg-system-purple text-white" : "bg-system-blue text-black"
                }`}>
                  {art.type === "manhua" ? (
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Manhua</span>
                  ) : (
                    <span className="flex items-center gap-1"><Palette className="w-3 h-3" /> Art</span>
                  )}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-black text-white uppercase truncate">{art.title}</h4>
                {art.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2">{art.description}</p>
                )}
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1 text-green-400">
                    <ThumbsUp className="w-3 h-3" /> {art.likes.length}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <ThumbsDown className="w-3 h-3" /> {art.dislikes.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Art Detail Modal */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-system-panel border border-system-purple rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-glow-purple animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-system-panel border-b border-white/10">
              <div>
                <h3 className="text-lg font-black text-white uppercase">{selectedArt.title}</h3>
                <span className="text-xs font-mono text-zinc-400 uppercase">{selectedArt.type}</span>
              </div>
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(selectedArt)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete artwork"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedArt(null)}
                  className="text-zinc-400 hover:text-white text-sm font-bold px-3 py-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedArt.imageUrl}
                alt={selectedArt.title}
                className="w-full rounded-xl border border-white/10"
              />

              {selectedArt.description && (
                <p className="text-sm text-zinc-300 leading-relaxed">{selectedArt.description}</p>
              )}

              {/* Reactions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleReaction(selectedArt, "like")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedArt.likes.includes(userEmail)
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-system-card border-white/10 text-zinc-400 hover:border-green-500/50 hover:text-green-400"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Like ({selectedArt.likes.length})
                </button>
                <button
                  onClick={() => handleReaction(selectedArt, "dislike")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedArt.dislikes.includes(userEmail)
                      ? "bg-red-500/20 border-red-500 text-red-400"
                      : "bg-system-card border-white/10 text-zinc-400 hover:border-red-500/50 hover:text-red-400"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Dislike ({selectedArt.dislikes.length})
                </button>
              </div>

              {/* Comments */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-system-cyan" />
                  <h4 className="text-sm font-black text-white uppercase">Guild Comments</h4>
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Leave a comment..."
                    className="flex-1 bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-system-blue transition-all"
                  />
                  <button
                    type="submit"
                    disabled={commentLoading || !commentText.trim()}
                    className="px-4 py-2 rounded-xl bg-system-blue text-system-dark font-black text-xs uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50 flex items-center gap-1"
                  >
                    {commentLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>

                {comments.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-mono text-center py-4">No comments yet. Be the first!</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {comments.map((c) => (
                      <div key={c.id} className="bg-system-dark/80 p-3 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-system-cyan">{c.authorName}</span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
