// ============================================
// SYSTEM — CLOUD SAVE (Supabase)
//
// Handles syncing hunter progress to the cloud.
// Auth is handled entirely by auth.js (password gate).
// This file only does data persistence.
//
// TO ENABLE CLOUD SYNC:
// 1. Go to supabase.com → create free project
// 2. Paste your URL and anon key below
// 3. Run the SQL at the bottom in Supabase SQL Editor
// ============================================

const SUPABASE_URL = 'https://dmbyzywnlmsecodbbili.supabase.co'; // enter your project url here
const SUPABASE_KEY = 'sb_publishable_JM3L7LRsP4ixPY5pWpkM1Q_X-Trks6i'; // enter your key here

// ── SUPABASE CLIENT ───────────────────────────────────
const db = {
  async upsert(table, data) {
    if (SUPABASE_URL === 'PASTE_YOUR_PROJECT_URL_HERE') return null;
    const url = `${SUPABASE_URL}/rest/v1/${table}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Upsert error ${res.status}`);
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },

  async select(table, match = null) {
    if (SUPABASE_URL === 'PASTE_YOUR_PROJECT_URL_HERE') return [];
    let url = `${SUPABASE_URL}/rest/v1/${table}`;
    if (match) {
      const params = Object.entries(match)
        .map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join('&');
      url += '?' + params;
    }
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) return [];
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },
};

// ── AUTO CLOUD SYNC ───────────────────────────────────
// Called by saveCurrentHunter in auth.js — debounced 2s
let _saveTimer = null;

// Override saveCurrentHunter to also push to cloud
const _localSaveCurrentHunter = saveCurrentHunter;
function saveCurrentHunter(data) {
  // Always save locally first (instant)
  _localSaveCurrentHunter(data);
  // Debounce cloud push
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => pushToCloud(data), 2000);
}

async function pushToCloud(data) {
  if (SUPABASE_URL === 'PASTE_YOUR_PROJECT_URL_HERE') return;
  try {
    await db.upsert('hunter_profiles', {
      id: 'main',
      data: JSON.stringify(data),
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('Cloud sync failed, using local save:', e.message);
  }
}

// ── CLOUD RESTORE ─────────────────────────────────────
// Called on startup if Supabase is configured
async function tryCloudRestore() {
  if (SUPABASE_URL === 'PASTE_YOUR_PROJECT_URL_HERE') return null;
  try {
    const rows = await db.select('hunter_profiles', { id: 'main' });
    if (rows.length > 0 && rows[0].data) {
      return JSON.parse(rows[0].data);
    }
  } catch (e) {
    console.warn('Cloud restore failed:', e.message);
  }
  return null;
}

// ── SQL FOR SUPABASE ──────────────────────────────────
// Run this once in Supabase → SQL Editor → New Query:
/*

CREATE TABLE IF NOT EXISTS hunter_profiles (
  id         TEXT PRIMARY KEY DEFAULT 'main',
  data       JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hunter_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON hunter_profiles
  FOR ALL USING (true) WITH CHECK (true);

*/
