// ============================================
// SYSTEM — CLOUD SAVE (Supabase)
// Saves login, progress, stats, quests,
// food logs, workouts, goals — everything.
//
// SETUP INSTRUCTIONS (do this once):
// 1. Go to supabase.com → sign up free
// 2. Click "New Project" → name it "hunter-system"
// 3. Wait ~2 min for it to set up
// 4. Go to SQL Editor → paste and run the SQL
//    from the bottom of this file
// 5. Go to Settings → API
// 6. Copy your "Project URL" and "anon public" key
// 7. Paste them into the two variables below
// ============================================

const SUPABASE_URL = 'https://dmbyzywnlmsecodbbili.supabase.co'; // enter your project url here
const SUPABASE_KEY = 'sb_publishable_JM3L7LRsP4ixPY5pWpkM1Q_X-Trks6i'; // enter your key here

// ============================================
// DO NOT EDIT BELOW THIS LINE
// ============================================

// Lightweight Supabase REST client (no npm needed)
const db = {
  async query(method, table, body = null, match = null) {
    let url = `${SUPABASE_URL}/rest/v1/${table}`;
    if (match) {
      const params = Object.entries(match).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join('&');
      url += '?' + params;
    }
    const res = await fetch(url, {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': method === 'POST' ? 'return=representation' : 'return=representation',
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`DB error ${res.status}: ${err}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },

  async upsert(table, data) {
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
    return this.query('GET', table, null, match);
  },
};

// ============================================
// AUTH — REGISTER & LOGIN (cloud version)
// Replaces the localStorage-only versions
// ============================================

async function handleLogin() {
  const nameEl  = document.getElementById('login-user');
  const passEl  = document.getElementById('login-pass');
  const errEl   = document.getElementById('login-error');
  const name    = nameEl.value.trim().toLowerCase();
  const pass    = passEl.value;

  if (!name || !pass) { errEl.textContent = '[ ERROR ] All fields required'; return; }

  errEl.textContent = '[ SYSTEM ] Connecting...';

  try {
    const rows = await db.select('hunters', { username: name });
    if (rows.length === 0) { errEl.textContent = '[ ERROR ] Hunter not found'; return; }

    const hunter = rows[0];
    if (hunter.password_hash !== btoa(pass)) {
      errEl.textContent = '[ ERROR ] Invalid passkey';
      return;
    }

    // Save session locally for fast reload
    localStorage.setItem('sys_current', JSON.stringify(name));
    localStorage.setItem('sys_session_id', hunter.id);

    // Parse stored data
    const data = hunter.data ? JSON.parse(hunter.data) : {};
    errEl.textContent = '';
    launchApp({ ...data, name: hunter.display_name, class: hunter.class });

  } catch (e) {
    console.error(e);
    // Fallback to local if offline
    errEl.textContent = '[ OFFLINE ] Using local save...';
    handleLoginLocal(name, pass);
  }
}

async function handleRegister() {
  const nameEl  = document.getElementById('reg-name');
  const passEl  = document.getElementById('reg-pass');
  const clsEl   = document.getElementById('reg-class');
  const errEl   = document.getElementById('reg-error');
  const name    = nameEl.value.trim();
  const pass    = passEl.value;
  const cls     = clsEl.value;

  if (!name || !pass) { errEl.textContent = '[ ERROR ] All fields required'; return; }
  if (name.length < 2) { errEl.textContent = '[ ERROR ] Name too short'; return; }
  if (pass.length < 4) { errEl.textContent = '[ ERROR ] Passkey too short (min 4)'; return; }

  errEl.textContent = '[ SYSTEM ] Creating hunter...';

  try {
    // Check if name taken
    const existing = await db.select('hunters', { username: name.toLowerCase() });
    if (existing.length > 0) { errEl.textContent = '[ ERROR ] Hunter name already taken'; return; }

    const bonus = CLASS_BONUSES[cls] || {};
    const newData = {
      level: 1, xp: 0,
      stats: {
        str:   10 + (bonus.str   || 0),
        vit:   10 + (bonus.vit   || 0),
        agi:   10 + (bonus.agi   || 0),
        int:   10 + (bonus.int   || 0),
        sense: 10 + (bonus.sense || 0),
      },
      quests: [], questDate: '',
      foodLog: [], foodDate: '',
      workouts: [], totalWorkoutMin: 0,
      streakDays: 0, lastActive: '',
      questsCompleted: 0, totalXPEarned: 0,
    };

    const rows = await db.upsert('hunters', {
      username:      name.toLowerCase(),
      display_name:  name,
      password_hash: btoa(pass),
      class:         cls,
      data:          JSON.stringify(newData),
      created_at:    new Date().toISOString(),
      updated_at:    new Date().toISOString(),
    });

    const hunter = rows[0];
    localStorage.setItem('sys_current', JSON.stringify(name.toLowerCase()));
    localStorage.setItem('sys_session_id', hunter.id);
    errEl.textContent = '';
    launchApp({ ...newData, name, class: cls });

  } catch (e) {
    console.error(e);
    errEl.textContent = '[ ERROR ] Could not connect to cloud. Check your Supabase URL and key.';
  }
}

// ============================================
// SAVE HUNTER DATA TO CLOUD
// Called automatically whenever progress changes
// ============================================

let _saveTimer = null;

async function saveCurrentHunter(data) {
  // Always save locally first (instant, works offline)
  const key = getCurrentUser();
  if (!key) return;
  const users = getUsers();
  users[key] = { ...users[key], ...data };
  saveUsers(users);

  // Debounce cloud save (wait 2s after last change to batch updates)
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => pushToCloud(data), 2000);
}

async function pushToCloud(data) {
  const key = getCurrentUser();
  if (!key || SUPABASE_URL === 'PASTE_YOUR_PROJECT_URL_HERE') return;

  try {
    await db.upsert('hunters', {
      username:   key,
      data:       JSON.stringify(data),
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    // Silent fail — local save already happened
    console.warn('Cloud sync failed, using local save:', e.message);
  }
}

// ============================================
// AUTO-RESTORE SESSION ON PAGE LOAD
// Checks cloud first, falls back to local
// ============================================

async function restoreSession() {
  const currentKey = getCurrentUser();
  if (!currentKey) return false;

  // Try cloud first
  if (SUPABASE_URL !== 'PASTE_YOUR_PROJECT_URL_HERE') {
    try {
      const rows = await db.select('hunters', { username: currentKey });
      if (rows.length > 0) {
        const hunter = rows[0];
        const data = hunter.data ? JSON.parse(hunter.data) : {};
        launchApp({ ...data, name: hunter.display_name, class: hunter.class });
        return true;
      }
    } catch (e) {
      console.warn('Cloud restore failed, using local:', e.message);
    }
  }

  // Fallback to local
  const users = getUsers();
  if (users[currentKey]) {
    launchApp(users[currentKey]);
    return true;
  }

  return false;
}

// ============================================
// OFFLINE FALLBACK LOGIN
// Used when cloud is unreachable
// ============================================

function handleLoginLocal(name, pass) {
  const users = getUsers();
  const errEl = document.getElementById('login-error');
  if (!users[name]) { errEl.textContent = '[ ERROR ] Hunter not found'; return; }
  if (users[name].password !== btoa(pass)) { errEl.textContent = '[ ERROR ] Invalid passkey'; return; }
  localStorage.setItem('sys_current', JSON.stringify(name));
  launchApp(users[name]);
}

// ============================================
// DEMO LOGIN (no cloud needed)
// ============================================

function demoLogin() {
  const demo = {
    name: 'DEMO HUNTER', class: 'fighter',
    level: 7, xp: 250,
    stats: { str: 28, vit: 22, agi: 18, int: 15, sense: 14 },
    quests: [], questDate: '', foodLog: [], foodDate: '',
    workouts: [], totalWorkoutMin: 120,
    streakDays: 3, lastActive: '',
    questsCompleted: 18, totalXPEarned: 940,
  };
  localStorage.setItem('sys_current', JSON.stringify('__demo__'));
  const users = getUsers();
  users['__demo__'] = demo;
  saveUsers(users);
  launchApp(demo);
}

// ============================================
// SQL — RUN THIS ONCE IN SUPABASE SQL EDITOR
// Go to: supabase.com → your project →
//        SQL Editor → New Query → paste → Run
// ============================================
/*

CREATE TABLE IF NOT EXISTS hunters (
  id            BIGSERIAL PRIMARY KEY,
  username      TEXT UNIQUE NOT NULL,
  display_name  TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  class         TEXT DEFAULT 'fighter',
  data          JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read/write (the app handles its own auth)
ALTER TABLE hunters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON hunters
  FOR ALL USING (true) WITH CHECK (true);

-- Index for fast username lookups
CREATE INDEX IF NOT EXISTS hunters_username_idx ON hunters (username);

*/
