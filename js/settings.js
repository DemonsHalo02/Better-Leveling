// ============================================
// SYSTEM — SETTINGS
// Metric/Imperial · Theme · Notifications
// Quest goal · Display prefs · Data management
// ============================================

// ── DEFAULT SETTINGS ─────────────────────────────────
const DEFAULT_SETTINGS = {
  units:          'metric',    // 'metric' | 'imperial'
  dailyQuestGoal: 3,           // how many quests = daily complete
  accentColor:    'blue',      // 'blue' | 'green' | 'gold' | 'purple' | 'red'
  hunterName:     'HUNTER',    // display name
  showQuote:      true,        // daily system quote on quest page
  compactMode:    false,       // smaller cards / tighter spacing
  vibration:      true,        // phone vibration on level up etc
  streakReminder: true,        // reminder note if streak at risk
  weightUnit:     'kg',        // derived from units but can be overridden
  distanceUnit:   'km',        // derived from units
  calorieGoal:    2000,
};

// ── STORAGE ───────────────────────────────────────────
function getSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('sys_settings') || 'null');
    return { ...DEFAULT_SETTINGS, ...(saved || {}) };
  } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(partial) {
  const current = getSettings();
  const updated  = { ...current, ...partial };
  // Sync derived units
  if (partial.units === 'metric') {
    updated.weightUnit   = 'kg';
    updated.distanceUnit = 'km';
  } else if (partial.units === 'imperial') {
    updated.weightUnit   = 'lbs';
    updated.distanceUnit = 'mi';
  }
  localStorage.setItem('sys_settings', JSON.stringify(updated));
  applySettings(updated);
  return updated;
}

// ── APPLY SETTINGS TO APP ─────────────────────────────
function applySettings(s) {
  s = s || getSettings();

  // Accent color
  const colors = {
    blue:   { accent: '#00b4ff', accent2: '#005fff' },
    green:  { accent: '#00e5a0', accent2: '#00a870' },
    gold:   { accent: '#f0c040', accent2: '#c09000' },
    purple: { accent: '#a855f7', accent2: '#7c3aed' },
    red:    { accent: '#ff4455', accent2: '#cc2233' },
  };
  const c = colors[s.accentColor] || colors.blue;
  document.documentElement.style.setProperty('--accent',  c.accent);
  document.documentElement.style.setProperty('--accent2', c.accent2);

  // Compact mode
  document.documentElement.style.setProperty(
    '--card-padding', s.compactMode ? '10px' : '14px'
  );

  // Hunter name in HUD
  if (HUNTER) {
    const nameEl = document.getElementById('top-name');
    if (nameEl && s.hunterName) nameEl.textContent = s.hunterName.toUpperCase();
  }
}

// ── UNIT CONVERSION HELPERS ───────────────────────────
function toDisplayWeight(kg) {
  if (!kg && kg !== 0) return '—';
  const s = getSettings();
  if (s.units === 'imperial') return `${(kg * 2.20462).toFixed(1)} lbs`;
  return `${kg} kg`;
}

function toDisplayDistance(km) {
  if (!km && km !== 0) return '—';
  const s = getSettings();
  if (s.units === 'imperial') return `${(km * 0.621371).toFixed(2)} mi`;
  return `${km} km`;
}

function toDisplayHeight(cm) {
  if (!cm && cm !== 0) return '—';
  const s = getSettings();
  if (s.units === 'imperial') {
    const totalIn = Math.round(cm / 2.54);
    return `${Math.floor(totalIn / 12)}' ${totalIn % 12}"`;
  }
  return `${cm} cm`;
}

function weightLabel() { return getSettings().units === 'imperial' ? 'lbs' : 'kg'; }
function distLabel()   { return getSettings().units === 'imperial' ? 'mi'  : 'km'; }

// ── SETTINGS PAGE RENDERER ────────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;
  const s = getSettings();

  const accentOptions = [
    { id: 'blue',   label: 'System Blue',  color: '#00b4ff' },
    { id: 'green',  label: 'Hunter Green', color: '#00e5a0' },
    { id: 'gold',   label: 'S-Rank Gold',  color: '#f0c040' },
    { id: 'purple', label: 'Shadow Purple',color: '#a855f7' },
    { id: 'red',    label: 'Danger Red',   color: '#ff4455' },
  ];

  el.innerHTML = `

    <!-- HUNTER IDENTITY -->
    <div class="section-head">HUNTER IDENTITY</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="margin-bottom:12px">
        <label class="setting-label">HUNTER NAME (display)</label>
        <div style="display:flex;gap:8px">
          <input type="text" class="sys-input" id="set-name"
            value="${s.hunterName || 'HUNTER'}"
            placeholder="Your name..."
            maxlength="20"
            style="flex:1;text-transform:uppercase"/>
          <button class="btn-secondary" onclick="applySetting('hunterName', document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>
        </div>
      </div>
    </div>

    <!-- UNITS -->
    <div class="section-head">UNITS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">MEASUREMENT SYSTEM</label>
      <div style="display:flex;gap:8px;margin-bottom:4px">
        <button onclick="applySetting('units','metric')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units==='metric'?'rgba(0,180,255,0.18)':'var(--bg3)'};
          border:1px solid ${s.units==='metric'?'var(--accent)':'var(--border)'};
          color:${s.units==='metric'?'var(--accent)':'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        ">
          <div style="font-size:20px;margin-bottom:4px">🌍</div>
          METRIC<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">kg · km · cm</div>
        </button>
        <button onclick="applySetting('units','imperial')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units==='imperial'?'rgba(0,180,255,0.18)':'var(--bg3)'};
          border:1px solid ${s.units==='imperial'?'var(--accent)':'var(--border)'};
          color:${s.units==='imperial'?'var(--accent)':'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        ">
          <div style="font-size:20px;margin-bottom:4px">🇺🇸</div>
          IMPERIAL<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">lbs · mi · ft/in</div>
        </button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">
        Currently: weight in <strong style="color:var(--accent)">${weightLabel()}</strong>, distance in <strong style="color:var(--accent)">${distLabel()}</strong>
      </div>
    </div>

    <!-- QUEST SETTINGS -->
    <div class="section-head">DAILY QUESTS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">DAILY GOAL (quests needed for streak)</label>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        ${[1,2,3,4,5].map(n => `
          <button onclick="applySetting('dailyQuestGoal',${n})" style="
            flex:1;padding:10px 4px;border-radius:6px;cursor:pointer;
            background:${s.dailyQuestGoal===n?'rgba(0,180,255,0.18)':'var(--bg3)'};
            border:1px solid ${s.dailyQuestGoal===n?'var(--accent)':'var(--border)'};
            color:${s.dailyQuestGoal===n?'var(--accent)':'var(--text3)'};
            font-family:var(--font-hud);font-size:16px;
          ">${n}</button>
        `).join('')}
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        Complete <strong style="color:var(--accent)">${s.dailyQuestGoal}</strong> quest${s.dailyQuestGoal!==1?'s':''} to earn your daily streak bonus. All quests still appear — extras give bonus XP.
      </div>
    </div>

    <!-- ACCENT COLOR -->
    <div class="section-head">ACCENT COLOR</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">INTERFACE COLOR</label>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
        ${accentOptions.map(opt => `
          <button onclick="applySetting('accentColor','${opt.id}')" style="
            padding:10px 4px;border-radius:8px;cursor:pointer;
            background:${s.accentColor===opt.id?opt.color+'28':'var(--bg3)'};
            border:2px solid ${s.accentColor===opt.id?opt.color:'var(--border)'};
            display:flex;flex-direction:column;align-items:center;gap:4px;
          ">
            <div style="width:20px;height:20px;border-radius:50%;background:${opt.color}"></div>
            <div style="font-family:var(--font-mono);font-size:8px;color:${s.accentColor===opt.id?opt.color:'var(--text3)'}">
              ${opt.label.split(' ')[1].toUpperCase()}
            </div>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- DISPLAY -->
    <div class="section-head">DISPLAY</div>
    <div class="sys-card" style="margin-bottom:10px">
      ${settingToggle('showQuote',   'Daily System Quote',    'Show motivational quote on quest page', s.showQuote)}
      ${settingToggle('compactMode', 'Compact Mode',          'Smaller cards, tighter spacing',        s.compactMode)}
      ${settingToggle('vibration',   'Vibration',             'Vibrate on level-up and milestones',    s.vibration)}
      ${settingToggle('streakReminder','Streak Warning',      'Alert when daily goal not yet met',     s.streakReminder)}
    </div>

    <!-- CALORIE GOAL -->
    <div class="section-head">NUTRITION</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">DAILY CALORIE GOAL</label>
      <div style="display:flex;gap:8px">
        <input type="number" class="sys-input" id="set-cal"
          value="${s.calorieGoal}" inputmode="numeric"
          placeholder="e.g. 2000" style="flex:1"/>
        <button class="btn-secondary" onclick="applySetting('calorieGoal', parseInt(document.getElementById('set-cal').value)||2000)">SAVE</button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">
        Also update macros in MIND → BODY → Macro Goals for full accuracy.
      </div>
    </div>

    <!-- DATA MANAGEMENT -->
    <div class="section-head">DATA</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="btn-secondary" style="width:100%;text-align:left;padding:12px 14px" onclick="exportData()">
          <span style="font-size:16px">📤</span> Export All Data (JSON)
        </button>
        <button class="btn-secondary" style="width:100%;text-align:left;padding:12px 14px" onclick="document.getElementById('import-file').click()">
          <span style="font-size:16px">📥</span> Import Data
        </button>
        <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(this)"/>
        <button class="btn-danger" style="width:100%;text-align:left;padding:12px 14px" onclick="confirmResetData()">
          <span style="font-size:16px">🗑️</span> Reset All Progress
        </button>
      </div>
    </div>

    <!-- APP INFO -->
    <div class="section-head">ABOUT</div>
    <div class="sys-card" style="text-align:center;padding:18px">
      <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent);letter-spacing:4px;margin-bottom:4px">SYSTEM</div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">HUNTER INTERFACE v3.0</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.7">
        Solo Leveling–style self-improvement tracker.<br>
        Built with HTML, CSS &amp; JavaScript.
      </div>
    </div>
  `;
}

// ── SETTING TOGGLE HELPER ─────────────────────────────
function settingToggle(key, label, desc, value) {
  return `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--text)">${label}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${desc}</div>
      </div>
      <div onclick="applySetting('${key}', ${!value})" style="
        width:44px;height:24px;border-radius:12px;cursor:pointer;
        background:${value ? 'var(--accent)' : 'var(--border2)'};
        position:relative;transition:background 0.2s;flex-shrink:0;
      ">
        <div style="
          position:absolute;top:2px;
          left:${value ? '22px' : '2px'};
          width:20px;height:20px;border-radius:50%;
          background:#fff;transition:left 0.2s;
          box-shadow:0 1px 3px rgba(0,0,0,0.3);
        "></div>
      </div>
    </div>
  `;
}

// ── APPLY A SINGLE SETTING ────────────────────────────
function applySetting(key, value) {
  const updated = saveSettings({ [key]: value });
  showNotif(`[ SETTINGS ] ${key.replace(/([A-Z])/g,' $1').toUpperCase()} updated`);
  renderSettingsPage();
  // Re-render quest page if quest goal changed
  if (key === 'dailyQuestGoal') renderQuestsPage();
}

// ── DATA EXPORT ───────────────────────────────────────
function exportData() {
  const data = {
    hunter:      JSON.parse(localStorage.getItem('sys_hunter_profile') || '{}'),
    settings:    getSettings(),
    habits:      JSON.parse(localStorage.getItem('sys_habits_hunter')  || '[]'),
    workoutPlan: JSON.parse(localStorage.getItem('sys_workout_plan')   || '{}'),
    prs:         JSON.parse(localStorage.getItem('sys_prs_hunter')     || '[]'),
    notes:       JSON.parse(localStorage.getItem('sys_notes')          || '[]'),
    sleep:       JSON.parse(localStorage.getItem('sys_sleep_hunter')   || '[]'),
    mood:        JSON.parse(localStorage.getItem('sys_mood_hunter')    || '[]'),
    xpHistory:   JSON.parse(localStorage.getItem('sys_xp_history')     || '[]'),
    exportedAt:  new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `hunter-system-backup-${new Date().toLocaleDateString().replace(/\//g,'-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showNotif('[ DATA ] Backup downloaded');
}

// ── DATA IMPORT ───────────────────────────────────────
function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.hunter)      localStorage.setItem('sys_hunter_profile',  JSON.stringify(data.hunter));
      if (data.settings)    localStorage.setItem('sys_settings',         JSON.stringify(data.settings));
      if (data.habits)      localStorage.setItem('sys_habits_hunter',    JSON.stringify(data.habits));
      if (data.workoutPlan) localStorage.setItem('sys_workout_plan',     JSON.stringify(data.workoutPlan));
      if (data.prs)         localStorage.setItem('sys_prs_hunter',       JSON.stringify(data.prs));
      if (data.notes)       localStorage.setItem('sys_notes',            JSON.stringify(data.notes));
      if (data.sleep)       localStorage.setItem('sys_sleep_hunter',     JSON.stringify(data.sleep));
      if (data.mood)        localStorage.setItem('sys_mood_hunter',      JSON.stringify(data.mood));
      if (data.xpHistory)   localStorage.setItem('sys_xp_history',       JSON.stringify(data.xpHistory));
      showNotif('[ DATA ] Import successful — reloading...', 'gold');
      setTimeout(() => location.reload(), 1500);
    } catch {
      showNotif('[ ERROR ] Invalid backup file');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

// ── RESET DATA ────────────────────────────────────────
function confirmResetData() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(4px)';
  overlay.innerHTML = `
    <div style="background:var(--bg2);border:1px solid var(--red);border-radius:12px;padding:24px;width:100%;max-width:340px;text-align:center">
      <div style="font-size:36px;margin-bottom:12px">⚠️</div>
      <div style="font-family:var(--font-hud);font-size:16px;color:var(--red);letter-spacing:1px;margin-bottom:8px">RESET ALL DATA?</div>
      <div style="font-size:13px;color:var(--text3);margin-bottom:20px;line-height:1.6">
        This will delete all your progress, quests, stats, XP, food logs, workouts, and notes. This cannot be undone.
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button>
        <button onclick="resetAllData()" style="flex:1;padding:13px;background:rgba(255,51,85,0.15);border:1px solid var(--red);border-radius:8px;color:var(--red);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">RESET</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function resetAllData() {
  const keysToKeep = ['sys_gate_session', 'sys_settings'];
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(k => { if (!keysToKeep.includes(k)) localStorage.removeItem(k); });
  showNotif('[ RESET ] All data cleared — reloading...');
  setTimeout(() => location.reload(), 1200);
}

// ── INIT ON APP LOAD ──────────────────────────────────
function initSettings() {
  applySettings(getSettings());
}
