// ============================================
// SYSTEM — SELF-IMPROVEMENT TRACKER
// Sleep, Mood, Study, Body Measurements
// ============================================

// ===== SLEEP TRACKER =====
function renderSleepTracker(container) {
  const logs = getSleepLogs();
  const lastWeek = logs.slice(-7);
  const avgSleep = lastWeek.length
    ? (lastWeek.reduce((a, b) => a + b.hours, 0) / lastWeek.length).toFixed(1)
    : 0;

  const today = new Date().toLocaleDateString();
  const loggedToday = logs.find(l => l.date === today);

  let html = `
    <div class="section-head">SLEEP TRACKER</div>
    <div class="sys-card">
      <div style="display:flex;justify-content:space-around;text-align:center;margin-bottom:14px">
        <div>
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${avgSleep}h</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">AVG (7 DAYS)</div>
        </div>
        <div style="width:1px;background:var(--border)"></div>
        <div>
          <div style="font-family:var(--font-hud);font-size:22px;color:${avgSleep >= 7 ? 'var(--green)' : 'var(--red)'}">${avgSleep >= 7 ? 'GOOD' : 'LOW'}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">STATUS</div>
        </div>
      </div>

      <!-- 7-day bars -->
      <div style="display:flex;gap:4px;align-items:flex-end;height:50px;margin-bottom:12px">
        ${lastWeek.map(l => {
          const pct = Math.min(100, (l.hours / 10) * 100);
          const color = l.hours >= 7 ? 'var(--green)' : l.hours >= 6 ? 'var(--gold)' : 'var(--red)';
          return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:100%;height:${pct}%;background:${color};border-radius:2px 2px 0 0;min-height:3px"></div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">${l.hours}h</div>
          </div>`;
        }).join('')}
        ${Array(7 - lastWeek.length).fill(0).map(() =>
          `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:100%;height:3px;background:var(--border);border-radius:2px"></div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--border)">—</div>
          </div>`
        ).join('')}
      </div>

      ${loggedToday ? `
        <div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:var(--green);letter-spacing:2px">✓ SLEEP LOGGED TODAY (${loggedToday.hours}h)</div>
      ` : `
        <div style="margin-bottom:8px">
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">HOURS SLEPT LAST NIGHT</label>
          <div style="display:flex;gap:8px">
            <input type="number" class="sys-input" id="sleep-hours" min="1" max="12" step="0.5" placeholder="e.g. 7.5" inputmode="decimal" style="flex:1" />
            <button class="btn-secondary" onclick="logSleep()">LOG</button>
          </div>
        </div>
      `}
    </div>
  `;

  container.innerHTML += html;
}

function logSleep() {
  const val = parseFloat(document.getElementById('sleep-hours')?.value);
  if (isNaN(val) || val < 1 || val > 12) { showNotif('[ ERROR ] Enter valid sleep hours (1–12)'); return; }
  const logs = getSleepLogs();
  const today = new Date().toLocaleDateString();
  const existing = logs.findIndex(l => l.date === today);
  const entry = { date: today, hours: val };
  if (existing >= 0) logs[existing] = entry;
  else logs.push(entry);
  if (logs.length > 30) logs.shift();
  localStorage.setItem('sys_sleep_' + getCurrentUser(), JSON.stringify(logs));
  const xp = val >= 8 ? 25 : val >= 7 ? 20 : val >= 6 ? 10 : 5;
  addXP(xp, 'vit');
  showNotif(`[ SLEEP LOGGED ] ${val}h · +${xp} XP`);
  renderSelfImprovePage();
}

function getSleepLogs() {
  try { return JSON.parse(localStorage.getItem('sys_sleep_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

// ===== MOOD LOG =====
const MOODS = [
  { val: 5, label: 'POWERFUL', icon: '⚡', color: '#f0c040' },
  { val: 4, label: 'FOCUSED',  icon: '🎯', color: '#00b4ff' },
  { val: 3, label: 'NEUTRAL',  icon: '😐', color: '#7aa0cc' },
  { val: 2, label: 'TIRED',    icon: '😓', color: '#a855f7' },
  { val: 1, label: 'DRAINED',  icon: '💀', color: '#ff3355' },
];

function renderMoodTracker(container) {
  const logs = getMoodLogs();
  const today = new Date().toLocaleDateString();
  const loggedToday = logs.find(l => l.date === today);

  let html = `
    <div class="section-head">MENTAL STATE</div>
    <div class="sys-card">
  `;

  if (loggedToday) {
    const mood = MOODS.find(m => m.val === loggedToday.val);
    html += `
      <div style="text-align:center;padding:10px 0">
        <div style="font-size:36px;margin-bottom:6px">${mood.icon}</div>
        <div style="font-family:var(--font-hud);font-size:16px;color:${mood.color}">${mood.label}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px">TODAY'S MENTAL STATE LOGGED</div>
      </div>
    `;
  } else {
    html += `
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">HOW ARE YOU TODAY, HUNTER?</div>
      <div style="display:flex;gap:6px;justify-content:space-between">
        ${MOODS.map(m => `
          <div onclick="logMood(${m.val})" style="
            flex:1;text-align:center;padding:10px 4px;
            background:${m.color}12;border:1px solid ${m.color}44;
            border-radius:8px;cursor:pointer;transition:all 0.15s
          ">
            <div style="font-size:20px;margin-bottom:4px">${m.icon}</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:${m.color};letter-spacing:1px">${m.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Last 7 days mood chart
  const recent = logs.slice(-7);
  if (recent.length > 0) {
    html += `
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">MENTAL TREND</div>
        <div style="display:flex;gap:4px;align-items:flex-end;height:40px">
          ${recent.map(l => {
            const mood = MOODS.find(m => m.val === l.val);
            const pct = (l.val / 5) * 100;
            return `<div style="flex:1;height:${pct}%;background:${mood?.color || '#7aa0cc'};border-radius:2px 2px 0 0;min-height:4px" title="${mood?.label}"></div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML += html;
}

function logMood(val) {
  const logs = getMoodLogs();
  const today = new Date().toLocaleDateString();
  const existing = logs.findIndex(l => l.date === today);
  const entry = { date: today, val, time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) };
  if (existing >= 0) logs[existing] = entry;
  else logs.push(entry);
  if (logs.length > 30) logs.shift();
  localStorage.setItem('sys_mood_' + getCurrentUser(), JSON.stringify(logs));
  addXP(10, 'int');
  const mood = MOODS.find(m => m.val === val);
  showNotif(`[ MOOD LOGGED ] ${mood.icon} ${mood.label} · +10 XP`);
  renderSelfImprovePage();
}

function getMoodLogs() {
  try { return JSON.parse(localStorage.getItem('sys_mood_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

// ===== STUDY TRACKER =====
function renderStudyTracker(container) {
  const logs = getStudyLogs();
  const today = new Date().toLocaleDateString();
  const todayLogs = logs.filter(l => l.date === today);
  const totalToday = todayLogs.reduce((a, b) => a + b.minutes, 0);
  const weekLogs = logs.slice(-14);
  const totalWeek = weekLogs.reduce((a, b) => a + b.minutes, 0);

  let html = `
    <div class="section-head">STUDY / FOCUS TRACKER</div>
    <div class="sys-card">
      <div style="display:flex;justify-content:space-around;text-align:center;margin-bottom:14px">
        <div>
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--purple)">${totalToday}m</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TODAY</div>
        </div>
        <div style="width:1px;background:var(--border)"></div>
        <div>
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${Math.round(totalWeek/60)}h ${totalWeek%60}m</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">THIS WEEK</div>
        </div>
      </div>

      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">LOG A STUDY SESSION</label>
        <input type="text" class="sys-input" id="study-subject" placeholder="Subject (e.g. Math, Coding...)" style="margin-bottom:8px" />
        <div style="display:flex;gap:8px">
          <input type="number" class="sys-input" id="study-min" placeholder="Minutes" inputmode="numeric" style="flex:1" />
          <button class="btn-secondary" onclick="logStudy()">LOG</button>
        </div>
      </div>

      ${todayLogs.slice(-3).reverse().map(l => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
          <div style="font-size:12px;color:var(--text2)">${l.subject}</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--purple)">${l.minutes}min</div>
        </div>
      `).join('')}
    </div>
  `;

  container.innerHTML += html;
}

function logStudy() {
  const subject = document.getElementById('study-subject')?.value.trim() || 'Study';
  const minutes = parseInt(document.getElementById('study-min')?.value);
  if (isNaN(minutes) || minutes < 1) { showNotif('[ ERROR ] Enter study duration'); return; }
  const logs = getStudyLogs();
  logs.push({ date: new Date().toLocaleDateString(), subject, minutes, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) });
  if (logs.length > 100) logs.shift();
  localStorage.setItem('sys_study_' + getCurrentUser(), JSON.stringify(logs));
  const xp = Math.round(minutes * 0.5);
  addXP(xp, 'int');
  showNotif(`[ STUDY LOGGED ] ${subject} · ${minutes}min · +${xp} XP`);
  document.getElementById('study-subject').value = '';
  document.getElementById('study-min').value = '';
  renderSelfImprovePage();
}

function getStudyLogs() {
  try { return JSON.parse(localStorage.getItem('sys_study_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

// ===== BODY MEASUREMENTS =====
function renderBodyMeasurements(container) {
  const logs = getBodyLogs();
  const latest = logs[logs.length - 1] || null;
  const prev    = logs[logs.length - 2] || null;

  let html = `
    <div class="section-head">BODY MEASUREMENTS</div>
    <div class="sys-card">
  `;

  if (latest) {
    const fields = [
      { key: 'weight', label: 'Weight', unit: 'kg' },
      { key: 'chest',  label: 'Chest',  unit: 'cm' },
      { key: 'waist',  label: 'Waist',  unit: 'cm' },
      { key: 'arms',   label: 'Arms',   unit: 'cm' },
    ];
    html += `
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">LATEST — ${latest.date}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
        ${fields.map(f => {
          const val = latest[f.key];
          const pval = prev?.[f.key];
          const diff = val && pval ? (val - pval).toFixed(1) : null;
          const isGood = f.key === 'weight' ? diff <= 0 : diff >= 0;
          return val ? `
            <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
              <div style="font-family:var(--font-hud);font-size:20px;color:var(--accent)">${val}<span style="font-size:11px;color:var(--text3)">${f.unit}</span></div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${f.label.toUpperCase()}</div>
              ${diff !== null ? `<div style="font-family:var(--font-mono);font-size:9px;color:${isGood ? 'var(--green)' : 'var(--red)'};">${diff > 0 ? '+' : ''}${diff}</div>` : ''}
            </div>
          ` : '';
        }).join('')}
      </div>
    `;
  }

  html += `
    <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">LOG MEASUREMENTS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <input type="number" class="sys-input" id="body-weight" placeholder="Weight (kg)" inputmode="decimal" step="0.1" />
      <input type="number" class="sys-input" id="body-chest"  placeholder="Chest (cm)"  inputmode="decimal" />
      <input type="number" class="sys-input" id="body-waist"  placeholder="Waist (cm)"  inputmode="decimal" />
      <input type="number" class="sys-input" id="body-arms"   placeholder="Arms (cm)"   inputmode="decimal" />
    </div>
    <button class="btn-primary" onclick="logBodyMeasurements()"><span>SAVE MEASUREMENTS</span><div class="btn-arrow">▶</div></button>
  `;

  if (logs.length > 1) {
    html += `
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">WEIGHT TREND</div>
        <div style="display:flex;gap:3px;align-items:flex-end;height:40px">
          ${logs.slice(-8).map(l => {
            if (!l.weight) return '';
            const vals = logs.filter(x=>x.weight).map(x=>x.weight);
            const min = Math.min(...vals), max = Math.max(...vals);
            const range = max - min || 1;
            const pct = Math.max(10, ((l.weight - min) / range) * 100);
            return `<div style="flex:1;height:${pct}%;background:var(--accent);border-radius:2px 2px 0 0;opacity:0.8"></div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML += html;
}

function logBodyMeasurements() {
  const weight = parseFloat(document.getElementById('body-weight')?.value);
  const chest  = parseFloat(document.getElementById('body-chest')?.value);
  const waist  = parseFloat(document.getElementById('body-waist')?.value);
  const arms   = parseFloat(document.getElementById('body-arms')?.value);
  if (!weight && !chest && !waist && !arms) { showNotif('[ ERROR ] Enter at least one measurement'); return; }
  const logs = getBodyLogs();
  logs.push({ date: new Date().toLocaleDateString(), weight: weight||null, chest: chest||null, waist: waist||null, arms: arms||null });
  localStorage.setItem('sys_body_' + getCurrentUser(), JSON.stringify(logs));
  addXP(15, 'sense');
  showNotif('[ MEASUREMENTS SAVED ] +15 XP');
  ['body-weight','body-chest','body-waist','body-arms'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  renderSelfImprovePage();
}

function getBodyLogs() {
  try { return JSON.parse(localStorage.getItem('sys_body_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

// ===== MAIN RENDER =====
function renderSelfImprovePage() {
  const el = document.getElementById('page-improve');
  el.innerHTML = '';
  renderMoodTracker(el);
  renderSleepTracker(el);
  renderStudyTracker(el);
  renderBodyMeasurements(el);
}
