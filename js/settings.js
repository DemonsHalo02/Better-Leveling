// ============================================
// BETTER LEVELING — SETTINGS v2
// All settings save/load correctly
// Units propagate across the whole app
// ============================================

const DEFAULT_SETTINGS = {
  units: 'metric',
  dailyQuestGoal: 3,
  accentColor: 'blue',
  hunterName: 'HUNTER',
  showQuote: true,
  compactMode: false,
  vibration: true,
  streakReminder: true,
  calorieGoal: 2000,
  waterGoal: 2000,
  friends: [],
};

// ── STORAGE ───────────────────────────────────────────
function getSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('bl_settings') || 'null');
    // also try old key
    const old = !saved && JSON.parse(localStorage.getItem('sys_settings') || 'null');
    return { ...DEFAULT_SETTINGS, ...(saved || old || {}) };
  } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(partial) {
  const s = { ...getSettings(), ...partial };
  if (partial.units === 'metric') { s.weightUnit = 'kg'; s.distanceUnit = 'km'; }
  if (partial.units === 'imperial') { s.weightUnit = 'lbs'; s.distanceUnit = 'mi'; }
  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s);
  // Update guild with new name if changed
  if (partial.hunterName) updateGuildScore();
  return s;
}

function applySetting(key, value) {
  saveSettings({ [key]: value });
  renderSettingsPage();
  if (key === 'dailyQuestGoal') renderQuestsPage();
  if (key === 'accentColor' || key === 'compactMode') { }
  if (key === 'hunterName') {
    const el = document.getElementById('top-name');
    if (el) el.textContent = String(value).toUpperCase();
    if (HUNTER) HUNTER.name = String(value);
    persist();
  }
}

// ── APPLY TO DOM ──────────────────────────────────────
function applySettings(s) {
  s = s || getSettings();
  const colors = {
    blue: ['#00b4ff', '#005fff'],
    green: ['#00e5a0', '#00a870'],
    gold: ['#f0c040', '#c09000'],
    purple: ['#a855f7', '#7c3aed'],
    red: ['#ff4455', '#cc2233'],
  };
  const [a, a2] = colors[s.accentColor] || colors.blue;
  document.documentElement.style.setProperty('--accent', a);
  document.documentElement.style.setProperty('--accent2', a2);
  document.documentElement.style.setProperty('--card-padding', s.compactMode ? '10px' : '14px');
  // Update name in HUD
  if (s.hunterName) {
    const el = document.getElementById('top-name');
    if (el) el.textContent = s.hunterName.toUpperCase();
    if (HUNTER) HUNTER.name = s.hunterName;
  }
}

function initSettings() { applySettings(getSettings()); }

// ── UNIT HELPERS ──────────────────────────────────────
function weightLabel() { return getSettings().units === 'imperial' ? 'lbs' : 'kg'; }
function distLabel() { return getSettings().units === 'imperial' ? 'mi' : 'km'; }
function heightLabel() { return getSettings().units === 'imperial' ? 'ft/in' : 'cm'; }

function toDisplayWeight(kg) {
  if (kg == null) return '—';
  return getSettings().units === 'imperial'
    ? `${(kg * 2.20462).toFixed(1)} lbs`
    : `${kg} kg`;
}
function toDisplayDistance(km) {
  if (km == null) return '—';
  return getSettings().units === 'imperial'
    ? `${(km * 0.621371).toFixed(2)} mi`
    : `${km} km`;
}
function weightInputLabel() { return getSettings().units === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'; }
function distanceInputLabel() { return getSettings().units === 'imperial' ? 'Distance (mi)' : 'Distance (km)'; }
function heightInputLabel() { return getSettings().units === 'imperial' ? 'Height (ft — e.g. 5.9)' : 'Height (cm)'; }

// convert user input back to kg for storage
function inputToKg(val) {
  const n = parseFloat(val);
  return getSettings().units === 'imperial' ? parseFloat((n / 2.20462).toFixed(2)) : n;
}

// ── SETTINGS PAGE ─────────────────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;
  const s = getSettings();

  const accentOpts = [
    { id: 'blue', label: 'Blue', color: '#00b4ff' },
    { id: 'green', label: 'Green', color: '#00e5a0' },
    { id: 'gold', label: 'Gold', color: '#f0c040' },
    { id: 'purple', label: 'Purple', color: '#a855f7' },
    { id: 'red', label: 'Red', color: '#ff4455' },
  ];

  const friends = s.friends || [];

  el.innerHTML = `

    <!-- HUNTER IDENTITY -->
    <div class="section-head">HUNTER IDENTITY</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">HUNTER NAME</label>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input type="text" class="sys-input" id="set-name"
          value="${s.hunterName || 'HUNTER'}" maxlength="20"
          placeholder="Your hunter name..."
          style="flex:1"/>
        <button class="btn-secondary" onclick="applySetting('hunterName', document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        This name appears in the top bar and on the leaderboard.
      </div>
    </div>

    <!-- FRIENDS -->
    <div class="section-head">ACCOUNTABILITY PARTNERS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
        Add a friend's hunter name to follow them on the leaderboard.
        Share your name <span style="color:var(--accent);font-weight:600">${s.hunterName || 'HUNTER'}</span> so they can add you.
      </div>
      ${friends.length === 0
      ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px 0 10px">No partners added yet</div>`
      : friends.map((f, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="width:30px;height:30px;border-radius:6px;background:linear-gradient(135deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;font-family:var(--font-hud);font-size:11px;color:#fff">${f.slice(0, 2).toUpperCase()}</div>
            <div style="flex:1;font-size:13px;font-weight:600;color:var(--text)">${f.toUpperCase()}</div>
            <button onclick="removeFriend(${i})" style="background:transparent;border:none;color:var(--text3);font-size:16px;cursor:pointer">×</button>
          </div>
        `).join('')
    }
      <div style="display:flex;gap:8px;margin-top:10px">
        <input type="text" class="sys-input" id="friend-input-set"
          placeholder="Enter hunter name..." style="flex:1"/>
        <button class="btn-secondary" onclick="addFriendFromSettings()">ADD</button>
      </div>
    </div>

    <!-- UNITS -->
    <div class="section-head">MEASUREMENT UNITS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <button onclick="applySetting('units','metric')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units === 'metric' ? 'rgba(0,180,255,0.18)' : 'var(--bg3)'};
          border:1px solid ${s.units === 'metric' ? 'var(--accent)' : 'var(--border)'};
          color:${s.units === 'metric' ? 'var(--accent)' : 'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        "><div style="font-size:18px;margin-bottom:4px">🌍</div>METRIC<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">kg · km · cm</div></button>
        <button onclick="applySetting('units','imperial')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units === 'imperial' ? 'rgba(0,180,255,0.18)' : 'var(--bg3)'};
          border:1px solid ${s.units === 'imperial' ? 'var(--accent)' : 'var(--border)'};
          color:${s.units === 'imperial' ? 'var(--accent)' : 'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        "><div style="font-size:18px;margin-bottom:4px">🇺🇸</div>IMPERIAL<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">lbs · mi · ft</div></button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        Active: <strong style="color:var(--accent)">${weightLabel()}</strong> · <strong style="color:var(--accent)">${distLabel()}</strong> · <strong style="color:var(--accent)">${heightLabel()}</strong>
      </div>
    </div>

    <!-- DAILY QUEST GOAL -->
    <div class="section-head">DAILY QUEST GOAL</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">QUESTS NEEDED FOR DAILY STREAK</label>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        ${[1, 2, 3, 4, 5].map(n => `
          <button onclick="applySetting('dailyQuestGoal',${n})" style="
            flex:1;padding:10px 4px;border-radius:6px;cursor:pointer;
            background:${s.dailyQuestGoal === n ? 'rgba(0,180,255,0.18)' : 'var(--bg3)'};
            border:1px solid ${s.dailyQuestGoal === n ? 'var(--accent)' : 'var(--border)'};
            color:${s.dailyQuestGoal === n ? 'var(--accent)' : 'var(--text3)'};
            font-family:var(--font-hud);font-size:16px;
          ">${n}</button>
        `).join('')}
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        Complete <strong style="color:var(--accent)">${s.dailyQuestGoal}</strong> quest${s.dailyQuestGoal !== 1 ? 's' : ''} to lock in your streak. Extra quests give bonus XP.
      </div>
    </div>

    <!-- ACCENT COLOR -->
    <div class="section-head">INTERFACE COLOR</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
        ${accentOpts.map(opt => `
          <button onclick="applySetting('accentColor','${opt.id}')" style="
            padding:10px 4px;border-radius:8px;cursor:pointer;
            background:${s.accentColor === opt.id ? opt.color + '28' : 'var(--bg3)'};
            border:2px solid ${s.accentColor === opt.id ? opt.color : 'var(--border)'};
            display:flex;flex-direction:column;align-items:center;gap:4px;
          ">
            <div style="width:20px;height:20px;border-radius:50%;background:${opt.color}"></div>
            <div style="font-family:var(--font-mono);font-size:8px;color:${s.accentColor === opt.id ? opt.color : 'var(--text3)'}">${opt.label.toUpperCase()}</div>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- DISPLAY -->
    <div class="section-head">DISPLAY & EXPERIENCE</div>
    <div class="sys-card" style="margin-bottom:10px">
      ${toggle('showQuote', 'Daily System Quote', 'Show motivational quote on quest page', s.showQuote)}
      ${toggle('compactMode', 'Compact Mode', 'Tighter spacing, smaller cards', s.compactMode)}
      ${toggle('vibration', 'Vibration', 'Vibrate on level-ups and milestones', s.vibration)}
      ${toggle('streakReminder', 'Streak Warning', 'Alert when daily goal not met by evening', s.streakReminder)}
    </div>

    <!-- NUTRITION -->
    <div class="section-head">NUTRITION</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">DAILY CALORIE GOAL</label>
      <div style="display:flex;gap:8px">
        <input type="number" class="sys-input" id="set-cal"
          value="${s.calorieGoal || 2000}" inputmode="numeric" style="flex:1"/>
        <button class="btn-secondary" onclick="applySetting('calorieGoal',parseInt(document.getElementById('set-cal').value)||2000)">SAVE</button>
      </div>
    </div>

    <!-- HYDRATION -->
    <div class="section-head">HYDRATION</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">DAILY WATER GOAL (ML)</label>
      <div style="display:flex;gap:8px">
        <input type="number" class="sys-input" id="set-water"
          value="${s.waterGoal || 2000}" inputmode="numeric" style="flex:1"/>
        <button class="btn-secondary" onclick="applySetting('waterGoal',parseInt(document.getElementById('set-water').value)||2000)">SAVE</button>
      </div>
    </div>

    <!-- DATA -->
    <div class="section-head">DATA MANAGEMENT</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="btn-secondary" style="width:100%;text-align:left;padding:12px 14px" onclick="exportData()">
          <span style="font-size:16px">📤</span>  Export Backup (JSON)
        </button>
        <button class="btn-secondary" style="width:100%;text-align:left;padding:12px 14px" onclick="document.getElementById('import-file').click()">
          <span style="font-size:16px">📥</span>  Import Backup
        </button>
        <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(this)"/>
        <button class="btn-danger" style="width:100%;text-align:left;padding:12px 14px" onclick="confirmResetData()">
          <span style="font-size:16px">🗑️</span>  Reset All Progress
        </button>
      </div>
    </div>

    <!-- SUPPORT -->
    <div class="section-head">SUPPORT THE APP</div>
    <div class="sys-card" style="margin-bottom:10px;text-align:center;padding:20px">
      <div style="font-size:32px;margin-bottom:8px">☕</div>
      <div style="font-family:var(--font-hud);font-size:14px;color:var(--text);letter-spacing:1px;margin-bottom:6px">SUPPORT BETTER LEVELING</div>
      <div style="font-size:13px;color:var(--text3);line-height:1.7;margin-bottom:16px">
        If this app is helping you level up your life, consider supporting its development. Every contribution keeps new features coming.
      </div>
      <button onclick="openPayPal()" style="
        width:100%;padding:14px;
        background:linear-gradient(135deg,rgba(0,48,135,0.4),rgba(0,112,240,0.3));
        border:1px solid #0070f0;border-radius:8px;
        color:#60a5fa;font-family:var(--font-hud);
        font-size:14px;font-weight:700;letter-spacing:2px;
        cursor:pointer;
      ">
        💙 DONATE VIA PAYPAL
      </button>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:8px">
        nickcrosson021@gmail.com · Any amount appreciated
      </div>
    </div>

    <!-- ABOUT -->
    <div class="section-head">ABOUT</div>
    <div class="sys-card" style="text-align:center;padding:18px">
      <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent);letter-spacing:3px;margin-bottom:4px">BETTER LEVELING</div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">HUNTER INTERFACE v3.0</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.7">
        Solo Leveling–style self-improvement tracker.<br>
        Built to help you become the best version of yourself.
      </div>
    </div>
  `;
}

function toggle(key, label, desc, value) {
  return `
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--text)">${label}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${desc}</div>
      </div>
      <div onclick="applySetting('${key}',${!value})" style="
        width:46px;height:26px;border-radius:13px;cursor:pointer;flex-shrink:0;
        background:${value ? 'var(--accent)' : 'var(--border2)'};
        position:relative;transition:background 0.2s;
      ">
        <div style="
          position:absolute;top:3px;
          left:${value ? '23px' : '3px'};
          width:20px;height:20px;border-radius:50%;
          background:#fff;transition:left 0.2s;
          box-shadow:0 1px 3px rgba(0,0,0,0.3);
        "></div>
      </div>
    </div>
  `;
}

// ── FRIENDS ───────────────────────────────────────────
function addFriendFromSettings() {
  const input = document.getElementById('friend-input-set');
  const name = input?.value.trim();
  if (!name) return;
  const s = getSettings();
  const friends = s.friends || [];
  if (friends.map(f => f.toLowerCase()).includes(name.toLowerCase())) {
    showNotif('[ ERROR ] Already added'); return;
  }
  friends.push(name);
  saveSettings({ friends });
  if (input) input.value = '';
  showNotif(`[ FRIENDS ] ${name.toUpperCase()} added`);
  renderSettingsPage();
}

function removeFriend(i) {
  const s = getSettings();
  const friends = s.friends || [];
  friends.splice(i, 1);
  saveSettings({ friends });
  renderSettingsPage();
}

// ── PAYPAL ────────────────────────────────────────────
function openPayPal() {
  const url = 'https://www.paypal.com/paypalme/nickcrosson021';
  window.open(url, '_blank');
}

// ── DATA EXPORT / IMPORT / RESET ──────────────────────
function exportData() {
  const keys = ['bl_settings', 'sys_hunter_profile', 'sys_habits_hunter',
    'sys_workout_plan', 'sys_prs_hunter', 'sys_notes', 'sys_sleep_hunter',
    'sys_mood_hunter', 'sys_xp_history', 'sys_fast', 'sys_photos',
    'sys_achievements', 'sys_shadows_hunter', 'sys_inv_hunter'];
  const data = { exportedAt: new Date().toISOString() };
  keys.forEach(k => { try { data[k] = JSON.parse(localStorage.getItem(k) || 'null'); } catch { } });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `better-leveling-backup-${Date.now()}.json`; a.click();
  URL.revokeObjectURL(url);
  showNotif('[ DATA ] Backup downloaded');
}

function importData(input) {
  const file = input.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      Object.entries(data).forEach(([k, v]) => {
        if (k !== 'exportedAt' && v !== null) localStorage.setItem(k, JSON.stringify(v));
      });
      showNotif('[ DATA ] Import successful — reloading...', 'gold');
      setTimeout(() => location.reload(), 1500);
    } catch { showNotif('[ ERROR ] Invalid backup file'); }
  };
  r.readAsText(file); input.value = '';
}

function confirmResetData() {
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(4px)';
  ov.innerHTML = `<div style="background:var(--bg2);border:1px solid var(--red);border-radius:12px;padding:24px;width:100%;max-width:340px;text-align:center"><div style="font-size:36px;margin-bottom:12px">⚠️</div><div style="font-family:var(--font-hud);font-size:16px;color:var(--red);letter-spacing:1px;margin-bottom:8px">RESET ALL DATA?</div><div style="font-size:13px;color:var(--text3);margin-bottom:20px;line-height:1.6">This deletes all progress, XP, quests, logs and notes. Cannot be undone.</div><div style="display:flex;gap:10px"><button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button><button onclick="resetAllData()" style="flex:1;padding:13px;background:rgba(255,51,85,0.15);border:1px solid var(--red);border-radius:8px;color:var(--red);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">RESET</button></div></div>`;
  document.body.appendChild(ov);
}

function resetAllData() {
  const keep = ['bl_settings', 'sys_gate_session'];
  Object.keys(localStorage).forEach(k => { if (!keep.includes(k)) localStorage.removeItem(k); });
  showNotif('[ RESET ] Cleared — reloading...');
  setTimeout(() => location.reload(), 1200);
}
