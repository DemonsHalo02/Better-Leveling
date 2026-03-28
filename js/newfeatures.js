// ============================================
// SYSTEM — MIND PAGE v2
// Tabbed layout · Collapsible cards · Bottom sheets
// ============================================

let _mindTab = 'today';

function showBottomSheet(title, contentHTML, onClose) {
  document.getElementById('mind-sheet')?.remove();
  const sheet = document.createElement('div');
  sheet.id = 'mind-sheet';
  sheet.style.cssText = 'position:fixed;inset:0;z-index:700;background:rgba(0,0,0,0.7);display:flex;align-items:flex-end;backdrop-filter:blur(4px)';
  sheet.innerHTML = `<div id="mind-sheet-inner" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:20px 20px 0 0;padding:0 0 max(24px,env(safe-area-inset-bottom)) 0;max-height:85vh;display:flex;flex-direction:column;animation:sheetUp 0.28s cubic-bezier(0.32,0.72,0,1)"><div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--border);flex-shrink:0"><div style="font-family:var(--font-hud);font-size:13px;color:var(--text);letter-spacing:1px">${title}</div><button onclick="closeBottomSheet()" style="background:transparent;border:none;color:var(--text3);font-size:22px;cursor:pointer;line-height:1">×</button></div><div style="overflow-y:auto;padding:16px 18px;-webkit-overflow-scrolling:touch">${contentHTML}</div></div><style>@keyframes sheetUp{from{transform:translateY(100%)}to{transform:none}}</style>`;
  sheet.addEventListener('click', e => { if (e.target === sheet) closeBottomSheet(); });
  document.body.appendChild(sheet);
  window._sheetOnClose = onClose;
}

function closeBottomSheet() {
  const sheet = document.getElementById('mind-sheet');
  if (!sheet) return;
  sheet.style.opacity = '0';
  sheet.style.transition = 'opacity 0.2s';
  setTimeout(() => {
    sheet.remove();
    if (typeof window._sheetOnClose === 'function') { window._sheetOnClose(); window._sheetOnClose = null; }
  }, 200);
}

let _collapsed = {};
try { _collapsed = JSON.parse(localStorage.getItem('sys_collapsed') || '{}'); } catch { }

function collapsible(id, title, icon, contentHTML, defaultOpen = true) {
  const isOpen = _collapsed[id] === undefined ? defaultOpen : !_collapsed[id];
  return `<div class="sys-card" style="margin-bottom:10px;padding:0;overflow:hidden"><div onclick="toggleCollapse('${id}')" style="display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer"><span style="font-size:20px">${icon}</span><div style="flex:1;font-family:var(--font-ui);font-size:14px;font-weight:600;color:var(--text)">${title}</div><div id="chev-${id}" style="font-size:18px;color:var(--text3);transform:rotate(${isOpen ? '0' : '180deg'});transition:transform 0.2s">˅</div></div><div id="collapse-${id}" style="display:${isOpen ? 'block' : 'none'};padding:0 16px 14px">${contentHTML}</div></div>`;
}

function toggleCollapse(id) {
  const el = document.getElementById('collapse-' + id);
  const ch = document.getElementById('chev-' + id);
  if (!el) return;
  const open = el.style.display !== 'none';
  el.style.display = open ? 'none' : 'block';
  if (ch) ch.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  _collapsed[id] = open;
  localStorage.setItem('sys_collapsed', JSON.stringify(_collapsed));
}

// ── MASTER RENDER ─────────────────────────────────────
function renderSelfImprovePage() {
  const el = document.getElementById('page-improve');
  const seasonal = getActiveSeasonalEvent();
  el.innerHTML = `
    ${seasonal ? renderSeasonalBanner(seasonal) : ''}
    <div style="display:flex;gap:4px;margin-bottom:14px;background:rgba(0,0,0,0.25);padding:3px;border-radius:10px;border:1px solid var(--border);position:sticky;top:0;z-index:10;">
      ${[['today', '📅', 'TODAY'], ['body', '💪', 'BODY'], ['mind', '🧘', 'MIND'], ['track', '📊', 'TRACK']].map(([tab, icon, label]) => `
        <button onclick="switchMindTab('${tab}')" id="mtab-${tab}" style="flex:1;padding:8px 4px;border:none;border-radius:7px;cursor:pointer;background:${_mindTab === tab ? 'rgba(0,180,255,0.18)' : 'transparent'};color:${_mindTab === tab ? 'var(--accent)' : 'var(--text3)'};font-family:var(--font-ui);font-size:10px;font-weight:600;letter-spacing:1px;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all 0.15s"><span style="font-size:16px">${icon}</span>${label}</button>
      `).join('')}
    </div>
    <div id="mind-tab-content"></div>
  `;
  renderMindTabContent();
}

function switchMindTab(tab) {
  _mindTab = tab;
  document.querySelectorAll('[id^="mtab-"]').forEach(b => {
    const t = b.id.replace('mtab-', '');
    b.style.background = t === tab ? 'rgba(0,180,255,0.18)' : 'transparent';
    b.style.color = t === tab ? 'var(--accent)' : 'var(--text3)';
  });
  renderMindTabContent();
}

function renderMindTabContent() {
  const el = document.getElementById('mind-tab-content');
  if (!el) return;
  el.innerHTML = '';
  if (_mindTab === 'today') renderTabToday(el);
  if (_mindTab === 'body') renderTabBody(el);
  if (_mindTab === 'mind') renderTabMind(el);
  if (_mindTab === 'track') renderTabTrack(el);
}

// ── TAB RENDERERS ─────────────────────────────────────
function renderTabToday(el) {
  el.innerHTML += renderDailyChallengeCard();
  el.innerHTML += collapsible('notes', 'Quick Notes', '📝', renderNotesContent(), true);
  el.innerHTML += collapsible('habits', 'Habit Tracker', '✅', renderHabitsContent(), true);
  el.innerHTML += collapsible('supps', 'Supplements', '💊', renderSuppsContent(), false);
}

function renderTabBody(el) {
  el.innerHTML += collapsible('fasting', 'Fasting Tracker', '⏱️', renderFastingContent(), true);
  el.innerHTML += collapsible('measurements', 'Body Measurements', '📏', renderMeasurementsContent(), true);
  el.innerHTML += collapsible('photos', 'Progress Photos', '📸', renderPhotosContent(), false);
  el.innerHTML += collapsible('calccalc', 'Calorie Calculator', '⚖️', renderCalcContent(), false);
  el.innerHTML += collapsible('macrogoals', 'Macro Goals', '🎯', renderMacroGoalContent(), false);
}

function renderTabMind(el) {
  el.innerHTML += collapsible('breathing', 'Breathing Exercise', '💨', renderBreathingContent(), true);
  el.innerHTML += collapsible('mood', 'Mental State', '🧠', renderMoodContent(), true);
  el.innerHTML += collapsible('sleep', 'Sleep Tracker', '😴', renderSleepContent(), true);
  el.innerHTML += collapsible('study', 'Study / Focus', '📚', renderStudyContent(), false);
  el.innerHTML += collapsible('review', 'Weekly Review', '📓', renderReviewContent(), false);
}

function renderTabTrack(el) {
  el.innerHTML += collapsible('streak-cal', 'Streak Calendar', '🗓️', renderStreakCalContent(), true);
  el.innerHTML += collapsible('xpgraph', 'XP History', '📈', renderXPGraphContent(), true);
  el.innerHTML += collapsible('prs', 'Personal Records', '🏆', renderPRContent(), true);
  el.innerHTML += collapsible('achiev', 'Achievements', '🏅', renderAchievementsContent(), false);
  el.innerHTML += collapsible('wkplan', 'Workout Plan', '📅', renderWorkoutPlanContent(), false);
}

// ── DAILY CHALLENGE ───────────────────────────────────
const DAILY_CHALLENGES = [
  { text: 'Complete 500 total reps (any exercise mix)', xp: 120, stat: 'str', icon: '⚔️' },
  { text: 'Run 8km without stopping', xp: 140, stat: 'agi', icon: '🏃' },
  { text: 'Fast for 18 hours', xp: 130, stat: 'vit', icon: '⏱️' },
  { text: 'No screens after 8PM', xp: 100, stat: 'sense', icon: '📵' },
  { text: 'Read for 2 hours straight', xp: 110, stat: 'int', icon: '📖' },
  { text: 'Do 200 push-ups throughout the day', xp: 125, stat: 'str', icon: '💪' },
  { text: 'Drink 4L of water today', xp: 100, stat: 'vit', icon: '💧' },
  { text: 'Meditate for 30 minutes', xp: 110, stat: 'int', icon: '🧘' },
  { text: 'Walk 15,000 steps', xp: 130, stat: 'agi', icon: '👟' },
  { text: 'Eat zero processed food today', xp: 120, stat: 'vit', icon: '🌿' },
  { text: 'Wake up at 5AM and work out immediately', xp: 150, stat: 'sense', icon: '🌅' },
  { text: 'Cold shower for 5 minutes', xp: 100, stat: 'vit', icon: '🧊' },
  { text: 'Complete a full body workout + 5km run', xp: 160, stat: 'str', icon: '🔥' },
  { text: 'Study or learn for 3 solid hours', xp: 130, stat: 'int', icon: '🎯' },
  { text: 'Journal 3 pages and plan your week', xp: 110, stat: 'int', icon: '📓' },
];

function getDailyChallenge() {
  return DAILY_CHALLENGES[Math.floor(Date.now() / 86400000) % DAILY_CHALLENGES.length];
}

function renderDailyChallengeCard() {
  const c = getDailyChallenge();
  const today = new Date().toLocaleDateString();
  const done = localStorage.getItem('sys_challenge_' + today) === 'done';
  return `<div style="background:${done ? 'rgba(0,229,160,0.06)' : 'rgba(255,51,85,0.06)'};border:1px solid ${done ? 'rgba(0,229,160,0.3)' : 'rgba(255,51,85,0.35)'};border-radius:12px;padding:16px;margin-bottom:14px;position:relative;overflow:hidden"><div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${done ? 'var(--green)' : 'var(--red)'},transparent)"></div><div style="font-family:var(--font-mono);font-size:9px;color:${done ? 'var(--green)' : 'var(--red)'};letter-spacing:3px;margin-bottom:8px">${done ? '✓ CHALLENGE COMPLETE' : '⚡ DAILY CHALLENGE'}</div><div style="font-size:22px;margin-bottom:6px">${c.icon}</div><div style="font-size:15px;font-weight:600;color:${done ? 'var(--text3)' : 'var(--text)'};text-decoration:${done ? 'line-through' : 'none'};line-height:1.4;margin-bottom:12px">${c.text}</div><div style="display:flex;align-items:center;justify-content:space-between"><span class="stat-pill pill-gold">+${c.xp} XP</span>${done ? `<span style="font-family:var(--font-mono);font-size:10px;color:var(--green)">Done today</span>` : `<button onclick="openChallengeSheet()" style="padding:8px 16px;background:rgba(255,51,85,0.15);border:1px solid var(--red);border-radius:6px;color:var(--red);font-family:var(--font-hud);font-size:11px;cursor:pointer">COMPLETE</button>`}</div></div>`;
}

function openChallengeSheet() {
  const c = getDailyChallenge();
  const today = new Date().toLocaleDateString();
  showBottomSheet('Complete Daily Challenge?', `<div style="text-align:center;padding:8px 0"><div style="font-size:40px;margin-bottom:12px">${c.icon}</div><div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px">${c.text}</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-bottom:20px">Only mark done if you actually completed it.</div><div style="display:flex;gap:10px"><button onclick="closeBottomSheet()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button><button onclick="closeBottomSheet();_doChallenge()" style="flex:2;padding:13px;background:rgba(255,51,85,0.15);border:1px solid var(--red);border-radius:8px;color:var(--red);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">✓ DONE</button></div></div>`);
  window._doChallenge = () => { localStorage.setItem('sys_challenge_' + today, 'done'); addXP(c.xp, c.stat); showNotif(`[ CHALLENGE ] +${c.xp} XP`, 'gold'); renderSelfImprovePage(); };
}

// ── NOTES ─────────────────────────────────────────────
function renderNotesContent() {
  const notes = getNotes();
  return `<div style="margin-bottom:10px"><textarea id="note-input" style="width:100%;min-height:72px;background:rgba(7,20,38,0.8);border:1px solid var(--border);border-radius:6px;padding:10px;color:var(--text);font-family:var(--font-ui);font-size:13px;resize:none;outline:none;line-height:1.5;box-sizing:border-box" placeholder="Quick thought, goal, or reflection..."></textarea><button class="btn-primary" onclick="saveNote()" style="margin-top:8px"><span>SAVE</span><div class="btn-arrow">▶</div></button></div>${notes.length === 0 ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center">No notes yet</div>` : notes.slice(-4).reverse().map((n, i) => `<div style="padding:10px;background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:6px;margin-bottom:6px;position:relative"><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);margin-bottom:3px">${n.date} ${n.time}</div><div style="font-size:13px;color:var(--text);line-height:1.5;white-space:pre-wrap">${n.text}</div><button onclick="deleteNote(${notes.length - 1 - i})" style="position:absolute;top:6px;right:6px;background:transparent;border:none;color:var(--text3);font-size:13px;cursor:pointer">×</button></div>`).join('')}`;
}
function saveNote() { const t = document.getElementById('note-input')?.value.trim(); if (!t) return; const n = getNotes(); n.push({ text: t, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }); if (n.length > 50) n.shift(); localStorage.setItem('sys_notes', JSON.stringify(n)); showNotif('[ NOTE ] Saved'); renderSelfImprovePage(); }
function deleteNote(i) { const n = getNotes(); n.splice(i, 1); localStorage.setItem('sys_notes', JSON.stringify(n)); renderSelfImprovePage(); }
function getNotes() { try { return JSON.parse(localStorage.getItem('sys_notes') || '[]'); } catch { return []; } }

// ── HABITS ────────────────────────────────────────────
function renderHabitsContent() {
  const habits = getHabits(), today = new Date().toLocaleDateString();
  return `${habits.length === 0 ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px 0 12px">No habits yet</div>` : habits.map((h, i) => { const done = h.log?.includes(today), streak = calcHabitStreak(h.log || []); return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)"><div onclick="toggleHabit(${i})" style="width:24px;height:24px;border-radius:5px;flex-shrink:0;cursor:pointer;background:${done ? 'rgba(0,229,160,0.2)' : 'transparent'};border:2px solid ${done ? 'var(--green)' : 'var(--border2)'};display:flex;align-items:center;justify-content:center;font-size:12px">${done ? '✓' : ''}</div><span style="font-size:16px">${h.icon}</span><div style="flex:1"><div style="font-size:13px;font-weight:600;color:${done ? 'var(--text3)' : 'var(--text)'};text-decoration:${done ? 'line-through' : 'none'}">${h.name}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">🔥 ${streak} day streak</div></div><button onclick="deleteHabit(${i})" style="background:transparent;border:none;color:var(--text3);font-size:15px;cursor:pointer">×</button></div>`; }).join('')}<button onclick="openAddHabitSheet()" style="width:100%;margin-top:10px;padding:9px;background:transparent;border:1px dashed var(--border2);border-radius:6px;color:var(--text3);font-family:var(--font-ui);font-size:12px;cursor:pointer">+ Add Habit</button>`;
}
function openAddHabitSheet() {
  const icons = ['💪', '🏃', '📖', '🧘', '💧', '🌅', '🥗', '✍️', '🎯', '🚿', '😴', '🧹'];
  window._selHabitIcon = '💪';
  showBottomSheet('New Habit', `<div style="margin-bottom:12px"><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:6px">HABIT NAME</label><input type="text" id="sheet-habit-name" class="sys-input" placeholder="e.g. Morning stretch..."/></div><div style="margin-bottom:14px"><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:6px">ICON</label><div style="display:flex;flex-wrap:wrap;gap:6px">${icons.map(e => `<div onclick="document.querySelectorAll('.hic').forEach(x=>x.style.border='1px solid var(--border)');this.style.border='2px solid var(--accent)';window._selHabitIcon='${e}'" class="hic" style="width:38px;height:38px;border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;background:var(--bg3)">${e}</div>`).join('')}</div></div><button class="btn-primary" onclick="const n=document.getElementById('sheet-habit-name')?.value.trim();if(!n)return;const h=getHabits();h.push({name:n,icon:window._selHabitIcon||'✅',log:[],created:new Date().toLocaleDateString()});saveHabits(h);closeBottomSheet();showNotif('[ HABIT ] Added');"><span>ADD</span><div class='btn-arrow'>▶</div></button>`, () => renderSelfImprovePage());
}
function toggleHabit(i) { const h = getHabits(), t = new Date().toLocaleDateString(); if (!h[i].log) h[i].log = []; if (h[i].log.includes(t)) { h[i].log = h[i].log.filter(d => d !== t); } else { h[i].log.push(t); addXP(10, 'sense'); showNotif(`[ HABIT ] ${h[i].name} done! +10 XP`); } saveHabits(h); renderSelfImprovePage(); }
function deleteHabit(i) { const h = getHabits(); h.splice(i, 1); saveHabits(h); renderSelfImprovePage(); }
function calcHabitStreak(log) { let s = 0, d = new Date(); while (log.includes(d.toLocaleDateString())) { s++; d.setDate(d.getDate() - 1); } return s; }
function getHabits() { try { return JSON.parse(localStorage.getItem('sys_habits_hunter') || '[]'); } catch { return []; } }
function saveHabits(h) { localStorage.setItem('sys_habits_hunter', JSON.stringify(h)); }

// ── SUPPLEMENTS ───────────────────────────────────────
const DEFAULT_SUPPS = [{ name: 'Creatine', dose: '5g', time: 'Any time', icon: '⚡', log: [] }, { name: 'Protein Powder', dose: '1 scoop', time: 'Post-workout', icon: '💪', log: [] }, { name: 'Vitamin D3', dose: '2000 IU', time: 'Morning', icon: '☀️', log: [] }, { name: 'Omega-3', dose: '2 caps', time: 'With meal', icon: '🐟', log: [] }, { name: 'Magnesium', dose: '400mg', time: 'Night', icon: '🌙', log: [] }];
function renderSuppsContent() {
  const s = getSupplements(), t = new Date().toLocaleDateString();
  return `${s.map((x, i) => { const tk = x.log?.includes(t); return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div onclick="toggleSupplement(${i})" style="width:22px;height:22px;border-radius:5px;flex-shrink:0;cursor:pointer;background:${tk ? 'rgba(168,85,247,0.2)' : 'transparent'};border:2px solid ${tk ? 'var(--purple)' : 'var(--border2)'};display:flex;align-items:center;justify-content:center;font-size:10px">${tk ? '✓' : ''}</div><span style="font-size:16px">${x.icon}</span><div style="flex:1"><div style="font-size:13px;font-weight:600;color:${tk ? 'var(--text3)' : 'var(--text)'}">${x.name}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${x.dose} · ${x.time}</div></div><button onclick="deleteSupplement(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer">×</button></div>`; }).join('')}<button onclick="openAddSuppSheet()" style="width:100%;margin-top:10px;padding:9px;background:transparent;border:1px dashed var(--border2);border-radius:6px;color:var(--text3);font-family:var(--font-ui);font-size:12px;cursor:pointer">+ Add Supplement</button>`;
}
function openAddSuppSheet() { showBottomSheet('Add Supplement', `<div style="display:flex;flex-direction:column;gap:10px"><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">NAME</label><input type="text" id="supp-name-s" class="sys-input" placeholder="e.g. Zinc"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">DOSE</label><input type="text" id="supp-dose-s" class="sys-input" placeholder="e.g. 25mg"/></div><button class="btn-primary" onclick="const n=document.getElementById('supp-name-s')?.value.trim();const d=document.getElementById('supp-dose-s')?.value.trim()||'1 serving';if(!n)return;const s=getSupplements();s.push({name:n,dose:d,time:'Any time',icon:'💊',log:[]});saveSupplements(s);closeBottomSheet();"><span>ADD</span><div class='btn-arrow'>▶</div></button></div>`, () => renderSelfImprovePage()); }
function toggleSupplement(i) { const s = getSupplements(), t = new Date().toLocaleDateString(); if (!s[i].log) s[i].log = []; if (s[i].log.includes(t)) s[i].log = s[i].log.filter(d => d !== t); else { s[i].log.push(t); addXP(5, 'vit'); showNotif(`[ SUPP ] ${s[i].name} ✓ +5 XP`); } saveSupplements(s); renderSelfImprovePage(); }
function deleteSupplement(i) { const s = getSupplements(); s.splice(i, 1); saveSupplements(s); renderSelfImprovePage(); }
function getSupplements() { try { const s = JSON.parse(localStorage.getItem('sys_supps_hunter') || 'null'); return s || DEFAULT_SUPPS.map(x => ({ ...x, log: [] })); } catch { return DEFAULT_SUPPS.map(x => ({ ...x, log: [] })); } }
function saveSupplements(s) { localStorage.setItem('sys_supps_hunter', JSON.stringify(s)); }

// ── FASTING ───────────────────────────────────────────
function renderFastingContent() {
  const fast = getFastData();
  const now = Date.now();

  if (fast.active) {
    const elapsed = Math.floor((now - fast.startTime) / 1000);
    const goal = (fast.goalHours || 16) * 3600;
    const pct = Math.min(100, Math.round((elapsed / goal) * 100));
    const hours = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const done = elapsed >= goal;

    // Start a live update timer
    clearInterval(window._fastInterval);
    window._fastInterval = setInterval(() => {
      const e2 = Math.floor((Date.now() - fast.startTime) / 1000);
      const h2 = Math.floor(e2 / 3600);
      const m2 = Math.floor((e2 % 3600) / 60);
      const p2 = Math.min(100, Math.round((e2 / goal) * 100));
      const d2 = e2 >= goal;
      const tEl = document.getElementById('fast-timer-disp');
      const bEl = document.getElementById('fast-bar-fill');
      const pEl = document.getElementById('fast-pct-disp');
      if (!tEl) { clearInterval(window._fastInterval); return; }
      tEl.textContent = `${String(h2).padStart(2, '0')}:${String(m2).padStart(2, '0')}`;
      tEl.style.color = d2 ? 'var(--green)' : 'var(--accent)';
      if (bEl) { bEl.style.width = p2 + '%'; bEl.style.background = d2 ? 'var(--green)' : 'linear-gradient(90deg,var(--accent2),var(--accent))'; }
      if (pEl) pEl.textContent = p2 + '%';
    }, 1000);

    return `
      <div style="text-align:center;margin-bottom:14px">
        <div style="font-family:var(--font-mono);font-size:9px;color:${done ? 'var(--green)' : 'var(--gold)'};letter-spacing:2px;margin-bottom:6px">
          ${done ? '✓ FAST COMPLETE — TAP BELOW' : 'FAST IN PROGRESS'}
        </div>
        <div id="fast-timer-disp" style="font-family:var(--font-hud);font-size:48px;color:${done ? 'var(--green)' : 'var(--accent)'};letter-spacing:4px;line-height:1">
          ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-top:4px">
          / ${fast.goalHours}:00 goal · <span id="fast-pct-disp">${pct}%</span>
        </div>
      </div>
      <div style="height:8px;background:rgba(0,180,255,0.08);border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:16px">
        <div id="fast-bar-fill" style="height:100%;width:${pct}%;background:${done ? 'var(--green)' : 'linear-gradient(90deg,var(--accent2),var(--accent))'};border-radius:4px;transition:width 1s"></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center;margin-bottom:10px">
        Started: ${new Date(fast.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${new Date(fast.startTime).toLocaleDateString()}
      </div>
      ${done
        ? `<button class="btn-primary" onclick="endFast(true)"><span>✓ COMPLETE FAST</span><div class="btn-arrow">▶</div></button>`
        : `<button class="btn-danger" style="width:100%" onclick="endFast(false)">BREAK FAST EARLY</button>`
      }
    `;
  }

  // Clear any stale interval
  clearInterval(window._fastInterval);

  return `
    <div style="margin-bottom:12px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:8px;letter-spacing:1px">SELECT FASTING GOAL</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${[12, 14, 16, 18, 20, 24].map(h => `
          <button onclick="selectFastGoal(${h})" style="
            padding:8px 14px;border-radius:20px;cursor:pointer;
            font-family:var(--font-mono);font-size:11px;
            background:${(fast.selectedGoal || 16) === h ? 'rgba(0,180,255,0.2)' : 'var(--bg3)'};
            border:1px solid ${(fast.selectedGoal || 16) === h ? 'var(--accent)' : 'var(--border)'};
            color:${(fast.selectedGoal || 16) === h ? 'var(--accent)' : 'var(--text3)'}
          ">${h}h</button>
        `).join('')}
      </div>
    </div>
    <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:12px;line-height:1.6">
      A ${fast.selectedGoal || 16}-hour fast earns <strong style="color:var(--gold)">+${Math.round((fast.selectedGoal || 16) * 4)} XP</strong> on completion.
    </div>
    <button class="btn-primary" onclick="startFast()"><span>▶ BEGIN FAST</span><div class="btn-arrow">▶</div></button>
    ${fast.lastCompleted ? `
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--green);text-align:center;margin-top:10px">
        ✓ Last completed: ${fast.lastCompleted}
      </div>
    ` : ''}
  `;
}
function selectFastGoal(h) { const d = getFastData(); d.selectedGoal = h; saveFastData(d); renderSelfImprovePage(); }
function startFast() { const d = getFastData(); d.active = true; d.startTime = Date.now(); d.goalHours = d.selectedGoal || 16; saveFastData(d); showNotif(`[ FASTING ] ${d.goalHours}h fast started`); renderSelfImprovePage(); }
function endFast(ok) { const d = getFastData(); if (ok) { const xp = Math.round(d.goalHours * 4); d.lastCompleted = `${d.goalHours}h on ${new Date().toLocaleDateString()}`; addXP(xp, 'vit'); showNotif(`[ FAST COMPLETE ] +${xp} XP`, 'gold'); } else showNotif('[ FAST BROKEN ] Try again tomorrow'); d.active = false; saveFastData(d); renderSelfImprovePage(); }
function getFastData() { try { return JSON.parse(localStorage.getItem('sys_fast') || '{"selectedGoal":16}'); } catch { return { selectedGoal: 16 }; } }
function saveFastData(d) { localStorage.setItem('sys_fast', JSON.stringify(d)); }

// ── MEASUREMENTS + WEIGHT CHART ───────────────────────
function renderMeasurementsContent() {
  const logs = getBodyLogs(), latest = logs[logs.length - 1] || null, prev = logs[logs.length - 2] || null;
  const wData = logs.filter(l => l.weight).slice(-10);
  let chart = '';
  if (wData.length >= 2) {
    const vals = wData.map(l => l.weight), mn = Math.min(...vals) - 1, mx = Math.max(...vals) + 1, W = 280, H = 80, pad = 8;
    const pts = wData.map((d, i) => ({ x: pad + (i / (wData.length - 1)) * (W - pad * 2), y: H - pad - ((d.weight - mn) / (mx - mn)) * (H - pad * 2), ...d }));
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const areaD = pathD + ` L${pts[pts.length - 1].x},${H - pad} L${pts[0].x},${H - pad} Z`;
    const trend = (vals[vals.length - 1] - vals[0]).toFixed(1);
    chart = `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">WEIGHT TREND</div><div style="font-family:var(--font-mono);font-size:10px;color:${parseFloat(trend) <= 0 ? 'var(--green)' : 'var(--red)'}">${parseFloat(trend) > 0 ? '+' : ''}${trend}kg</div></div><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00b4ff" stop-opacity="0.25"/><stop offset="100%" stop-color="#00b4ff" stop-opacity="0.02"/></linearGradient></defs><path d="${areaD}" fill="url(#wg)"/><path d="${pathD}" fill="none" stroke="#00b4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${pts.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="#00b4ff"/>`).join('')}</svg></div>`;
  }
  return `${chart}${latest ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">${[['weight', 'kg'], ['chest', 'cm'], ['waist', 'cm'], ['arms', 'cm']].filter(([k]) => latest[k]).map(([k, u]) => { const diff = prev?.[k] ? (latest[k] - prev[k]).toFixed(1) : null, good = k === 'waist' ? parseFloat(diff) <= 0 : parseFloat(diff) >= 0; return `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:8px;text-align:center"><div style="font-family:var(--font-hud);font-size:18px;color:var(--accent)">${latest[k]}<span style="font-size:10px;color:var(--text3)">${u}</span></div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${k.toUpperCase()}</div>${diff !== null ? `<div style="font-family:var(--font-mono);font-size:9px;color:${good ? 'var(--green)' : 'var(--red)'}">${parseFloat(diff) > 0 ? '+' : ''}${diff}</div>` : ''}</div>`; }).join('')}</div>` : ''}<button onclick="openMeasurementsSheet()" style="width:100%;padding:10px;background:transparent;border:1px dashed var(--border2);border-radius:6px;color:var(--text3);font-family:var(--font-ui);font-size:12px;cursor:pointer">+ Log Measurements</button>`;
}
function openMeasurementsSheet() { showBottomSheet('Log Measurements', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px"><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">WEIGHT (kg)</label><input type="number" class="sys-input" id="bm-weight" placeholder="85.0" inputmode="decimal" step="0.1"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">CHEST (cm)</label><input type="number" class="sys-input" id="bm-chest" placeholder="100" inputmode="numeric"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">WAIST (cm)</label><input type="number" class="sys-input" id="bm-waist" placeholder="85" inputmode="numeric"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">ARMS (cm)</label><input type="number" class="sys-input" id="bm-arms" placeholder="38" inputmode="numeric"/></div></div><button class="btn-primary" onclick="const w=parseFloat(document.getElementById('bm-weight')?.value)||null,c=parseFloat(document.getElementById('bm-chest')?.value)||null,wa=parseFloat(document.getElementById('bm-waist')?.value)||null,a=parseFloat(document.getElementById('bm-arms')?.value)||null;if(!w&&!c&&!wa&&!a){showNotif('Enter at least one value');return;}const logs=getBodyLogs();logs.push({date:new Date().toLocaleDateString(),weight:w,chest:c,waist:wa,arms:a});localStorage.setItem('sys_body_hunter',JSON.stringify(logs));addXP(15,'sense');closeBottomSheet();showNotif('[ SAVED ] +15 XP');"><span>SAVE</span><div class='btn-arrow'>▶</div></button>`, () => renderSelfImprovePage()); }
function getBodyLogs() { try { return JSON.parse(localStorage.getItem('sys_body_hunter') || '[]'); } catch { return []; } }

// ── PHOTOS ────────────────────────────────────────────
function renderPhotosContent() { const photos = getProgressPhotos(); return `<input type="file" id="photo-input" accept="image/*" style="display:none" onchange="handleProgressPhoto(this)"/><button class="btn-secondary" style="width:100%;margin-bottom:10px" onclick="document.getElementById('photo-input').click()">📷 ADD PHOTO</button>${photos.length === 0 ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px">No photos yet</div>` : `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${photos.slice(-6).map((p, i) => `<div style="position:relative;border-radius:6px;overflow:hidden;border:1px solid var(--border)"><img src="${p.src}" style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block"/><div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);padding:3px 6px;font-family:var(--font-mono);font-size:8px;color:var(--text2)">${p.date}</div><button onclick="deletePhoto(${photos.length - 6 + i})" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.6);border:none;border-radius:4px;color:#fff;font-size:12px;padding:2px 6px;cursor:pointer">×</button></div>`).join('')}</div>`}`; }
function handleProgressPhoto(input) { const file = input.files[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { showNotif('Max 5MB'); return; } const r = new FileReader(); r.onload = e => { const p = getProgressPhotos(); p.push({ src: e.target.result, date: new Date().toLocaleDateString() }); if (p.length > 20) p.shift(); localStorage.setItem('sys_photos', JSON.stringify(p)); showNotif('[ PHOTO ] Saved'); renderSelfImprovePage(); }; r.readAsDataURL(file); input.value = ''; }
function deletePhoto(i) { const p = getProgressPhotos(); p.splice(i, 1); localStorage.setItem('sys_photos', JSON.stringify(p)); renderSelfImprovePage(); }
function getProgressPhotos() { try { return JSON.parse(localStorage.getItem('sys_photos') || '[]'); } catch { return []; } }

// ── CALORIE CALC ──────────────────────────────────────
function renderCalcContent() { const s = getCalGoals(); return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px"><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">AGE</label><input type="number" class="sys-input" id="calc-age" placeholder="25" inputmode="numeric" value="${s.age || ''}"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">WEIGHT (kg)</label><input type="number" class="sys-input" id="calc-weight" placeholder="80" inputmode="decimal" step="0.1" value="${s.weight || ''}"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">HEIGHT (cm)</label><input type="number" class="sys-input" id="calc-height" placeholder="178" inputmode="numeric" value="${s.height || ''}"/></div><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">SEX</label><select class="sys-input" id="calc-sex"><option value="m" ${s.sex === 'm' ? 'selected' : ''}>Male</option><option value="f" ${s.sex === 'f' ? 'selected' : ''}>Female</option></select></div></div><select class="sys-input" id="calc-activity" style="margin-bottom:8px"><option value="1.2" ${s.activity === '1.2' ? 'selected' : ''}>Sedentary</option><option value="1.375" ${s.activity === '1.375' ? 'selected' : ''}>Light (1-3x/week)</option><option value="1.55" ${s.activity === '1.55' ? 'selected' : ''}>Moderate (4-5x/week)</option><option value="1.725" ${s.activity === '1.725' ? 'selected' : ''}>Active (daily)</option><option value="1.9" ${s.activity === '1.9' ? 'selected' : ''}>Very Active</option></select><select class="sys-input" id="calc-goal" style="margin-bottom:12px"><option value="cut" ${s.goal === 'cut' ? 'selected' : ''}>Lose weight (−500 kcal)</option><option value="maint" ${s.goal === 'maint' ? 'selected' : ''}>Maintain</option><option value="bulk" ${s.goal === 'bulk' ? 'selected' : ''}>Build muscle (+250 kcal)</option></select><button class="btn-primary" onclick="calculateCalories()"><span>CALCULATE</span><div class='btn-arrow'>▶</div></button><div id="calc-result" style="margin-top:12px"></div>`; }
function calculateCalories() { const age = parseInt(document.getElementById('calc-age')?.value), wt = parseFloat(document.getElementById('calc-weight')?.value), ht = parseInt(document.getElementById('calc-height')?.value), sex = document.getElementById('calc-sex')?.value, act = parseFloat(document.getElementById('calc-activity')?.value), goal = document.getElementById('calc-goal')?.value; if (!age || !wt || !ht) { showNotif('Fill in all fields'); return; } const bmr = sex === 'm' ? 10 * wt + 6.25 * ht - 5 * age + 5 : 10 * wt + 6.25 * ht - 5 * age - 161, tdee = Math.round(bmr * act), adj = goal === 'cut' ? -500 : goal === 'bulk' ? 250 : 0, target = tdee + adj, protein = Math.round(wt * 2.2), fat = Math.round(target * 0.25 / 9), carbs = Math.round((target - protein * 4 - fat * 9) / 4); localStorage.setItem('sys_calgoals_hunter', JSON.stringify({ age, weight: wt, height: ht, sex, activity: String(act), goal })); const r = document.getElementById('calc-result'); if (r) r.innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px"><div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:8px;text-align:center"><div style="font-family:var(--font-hud);font-size:18px;color:var(--text3)">${tdee}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">MAINTENANCE</div></div><div style="background:var(--bg3);border:1px solid ${goal === 'cut' ? 'var(--green)' : goal === 'bulk' ? 'var(--gold)' : 'var(--accent)'};border-radius:6px;padding:8px;text-align:center"><div style="font-family:var(--font-hud);font-size:18px;color:${goal === 'cut' ? 'var(--green)' : goal === 'bulk' ? 'var(--gold)' : 'var(--accent)'}">${target}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">TARGET</div></div></div><div style="display:flex;gap:6px"><span class="stat-pill pill-green" style="flex:1;justify-content:center">P:${protein}g</span><span class="stat-pill pill-gold" style="flex:1;justify-content:center">C:${carbs}g</span><span class="stat-pill pill-red" style="flex:1;justify-content:center">F:${fat}g</span></div>`; }
function getCalGoals() { try { return JSON.parse(localStorage.getItem('sys_calgoals_hunter') || '{}'); } catch { return {}; } }

// ── MACRO GOALS ───────────────────────────────────────
function renderMacroGoalContent() { const g = getMacroGoals(); return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">${[['cal', 'CALORIES', 'kcal'], ['protein', 'PROTEIN', 'g'], ['carbs', 'CARBS', 'g'], ['fat', 'FAT', 'g']].map(([k, l, u]) => `<div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">${l} (${u})</label><input type="number" class="sys-input" id="mg-${k}" value="${g[k]}" inputmode="numeric"/></div>`).join('')}</div><button class="btn-primary" onclick="saveMacroGoals()"><span>SAVE</span><div class='btn-arrow'>▶</div></button>`; }
function getMacroGoals() { try { return JSON.parse(localStorage.getItem('sys_macro_goals') || '{"cal":2000,"protein":150,"carbs":250,"fat":65}'); } catch { return { cal: 2000, protein: 150, carbs: 250, fat: 65 }; } }
function saveMacroGoals() { const g = { cal: parseInt(document.getElementById('mg-cal')?.value) || 2000, protein: parseInt(document.getElementById('mg-protein')?.value) || 150, carbs: parseInt(document.getElementById('mg-carbs')?.value) || 250, fat: parseInt(document.getElementById('mg-fat')?.value) || 65 }; localStorage.setItem('sys_macro_goals', JSON.stringify(g)); showNotif('[ GOALS SAVED ] Nutrition targets updated'); }

// ── BREATHING ─────────────────────────────────────────
const BREATH_TECHS = [{ name: 'Box Breathing', pattern: [4, 4, 4, 4], labels: ['INHALE', 'HOLD', 'EXHALE', 'HOLD'], desc: 'Stress relief & focus' }, { name: '4-7-8 Breathing', pattern: [4, 7, 8, 0], labels: ['INHALE', 'HOLD', 'EXHALE', ''], desc: 'Sleep & relaxation' }, { name: 'Power Breathing', pattern: [2, 0, 2, 0], labels: ['INHALE', '', 'EXHALE', ''], desc: 'Energy & alertness' }];
function renderBreathingContent() { return `<div id="breath-area"><div style="display:flex;flex-direction:column;gap:8px">${BREATH_TECHS.map((t, i) => `<div onclick="startBreathing(${i})" style="padding:12px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;cursor:pointer"><div style="font-size:14px;font-weight:600;color:var(--text)">${t.name}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${t.desc}</div></div>`).join('')}</div></div>`; }
function startBreathing(ti) {
  const t = BREATH_TECHS[ti]; const area = document.getElementById('breath-area'); if (!area) return; let cyc = 0, ph = 0; area.innerHTML = `<div style="text-align:center;padding:8px 0"><div style="font-family:var(--font-hud);font-size:11px;color:var(--accent);letter-spacing:2px;margin-bottom:16px">${t.name.toUpperCase()}</div><div id="bc" style="width:120px;height:120px;border-radius:50%;margin:0 auto 16px;border:3px solid var(--accent);display:flex;align-items:center;justify-content:center;flex-direction:column;transition:transform 0.5s,border-color 0.5s;background:rgba(0,180,255,0.05)"><div id="bl" style="font-family:var(--font-hud);font-size:11px;color:var(--accent);letter-spacing:2px">READY</div><div id="bn" style="font-family:var(--font-hud);font-size:28px;color:var(--accent);font-weight:700">-</div></div><div id="bcy" style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">Cycle 0</div><button onclick="stopBreathing()" class="btn-secondary" style="margin-top:16px">STOP</button></div>`;
  function run() { const dur = t.pattern[ph], lbl = t.labels[ph]; if (dur === 0) { ph = (ph + 1) % t.pattern.length; if (ph === 0) cyc++; run(); return; } const bc = document.getElementById('bc'), bl = document.getElementById('bl'), bn = document.getElementById('bn'), bcy = document.getElementById('bcy'); if (!bc) { clearInterval(window._bint); return; } const isIn = lbl === 'INHALE'; bl.textContent = lbl; bc.style.transform = isIn ? 'scale(1.2)' : 'scale(0.95)'; bc.style.borderColor = isIn ? 'var(--green)' : lbl === 'HOLD' ? 'var(--gold)' : 'var(--accent)'; bl.style.color = bc.style.borderColor; bn.style.color = bc.style.borderColor; bcy.textContent = `Cycle ${cyc + 1}`; let s = dur; bn.textContent = s; clearInterval(window._bint); window._bint = setInterval(() => { s--; const b2 = document.getElementById('bn'); if (!b2) { clearInterval(window._bint); return; } b2.textContent = s; if (s <= 0) { clearInterval(window._bint); ph = (ph + 1) % t.pattern.length; if (ph === 0) { cyc++; if (cyc >= 4) { stopBreathing(); addXP(20, 'int'); showNotif('[ BREATHWORK ] 4 cycles! +20 XP'); return; } } run(); } }, 1000); }
  setTimeout(run, 500);
}
function stopBreathing() { clearInterval(window._bint); const a = document.getElementById('breath-area'); if (a) a.innerHTML = renderBreathingContent(); }

// ── MOOD ──────────────────────────────────────────────
const MOODS = [{ val: 5, label: 'POWERFUL', icon: '⚡', color: '#f0c040' }, { val: 4, label: 'FOCUSED', icon: '🎯', color: '#00b4ff' }, { val: 3, label: 'NEUTRAL', icon: '😐', color: '#7aa0cc' }, { val: 2, label: 'TIRED', icon: '😓', color: '#a855f7' }, { val: 1, label: 'DRAINED', icon: '💀', color: '#ff3355' }];
function renderMoodContent() { const logs = getMoodLogs(), today = new Date().toLocaleDateString(), lt = logs.find(l => l.date === today); let h = ''; if (lt) { const m = MOODS.find(x => x.val === lt.val); h += `<div style="text-align:center;padding:10px 0"><div style="font-size:36px;margin-bottom:6px">${m?.icon}</div><div style="font-family:var(--font-hud);font-size:14px;color:${m?.color}">${m?.label}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px">Logged today</div></div>`; } else { h += `<div style="display:flex;gap:8px;justify-content:space-between">${MOODS.map(m => `<div onclick="logMood(${m.val})" style="flex:1;text-align:center;padding:10px 4px;background:${m.color}12;border:1px solid ${m.color}44;border-radius:8px;cursor:pointer"><div style="font-size:20px;margin-bottom:3px">${m.icon}</div><div style="font-family:var(--font-mono);font-size:7px;color:${m.color}">${m.label}</div></div>`).join('')}</div>`; } const rc = logs.slice(-7); if (rc.length > 0) h += `<div style="display:flex;gap:4px;align-items:flex-end;height:30px;margin-top:10px">${rc.map(l => { const m = MOODS.find(x => x.val === l.val); return `<div style="flex:1;height:${(l.val / 5) * 100}%;background:${m?.color || '#7aa0cc'};border-radius:2px 2px 0 0;min-height:4px"></div>`; }).join('')}</div>`; return h; }
function logMood(val) { const logs = getMoodLogs(), today = new Date().toLocaleDateString(), ex = logs.findIndex(l => l.date === today), entry = { date: today, val }; if (ex >= 0) logs[ex] = entry; else logs.push(entry); if (logs.length > 30) logs.shift(); localStorage.setItem('sys_mood_hunter', JSON.stringify(logs)); addXP(10, 'int'); showNotif('[ MOOD ] Logged · +10 XP'); renderSelfImprovePage(); }
function getMoodLogs() { try { return JSON.parse(localStorage.getItem('sys_mood_hunter') || '[]'); } catch { return []; } }

// ── SLEEP ─────────────────────────────────────────────
function renderSleepContent() { const logs = getSleepLogs(), today = new Date().toLocaleDateString(), lt = logs.find(l => l.date === today), l7 = logs.slice(-7), avg = l7.length ? (l7.reduce((a, b) => a + b.hours, 0) / l7.length).toFixed(1) : 0; return `<div style="display:flex;justify-content:space-around;text-align:center;margin-bottom:12px"><div><div style="font-family:var(--font-hud);font-size:20px;color:var(--accent)">${avg}h</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">7-DAY AVG</div></div><div><div style="font-family:var(--font-hud);font-size:20px;color:${parseFloat(avg) >= 7 ? 'var(--green)' : 'var(--red)'}">${parseFloat(avg) >= 7 ? 'GOOD' : 'LOW'}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">STATUS</div></div></div><div style="display:flex;gap:3px;align-items:flex-end;height:40px;margin-bottom:12px">${l7.map(l => `<div style="flex:1;height:${Math.min(100, (l.hours / 10) * 100)}%;background:${l.hours >= 7 ? 'var(--green)' : l.hours >= 6 ? 'var(--gold)' : 'var(--red)'};border-radius:2px 2px 0 0;min-height:4px" title="${l.hours}h"></div>`).join('')}${Array(7 - l7.length).fill(0).map(() => `<div style="flex:1;height:3px;background:var(--border);border-radius:2px"></div>`).join('')}</div>${lt ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--green);text-align:center">✓ ${lt.hours}h logged today</div>` : `<div style="display:flex;gap:8px"><input type="number" class="sys-input" id="sleep-hrs" min="1" max="12" step="0.5" placeholder="Hours slept..." inputmode="decimal" style="flex:1"/><button class="btn-secondary" onclick="logSleep()">LOG</button></div>`}`; }
function logSleep() { const val = parseFloat(document.getElementById('sleep-hrs')?.value); if (isNaN(val) || val < 1 || val > 12) { showNotif('Enter valid hours'); return; } const logs = getSleepLogs(), today = new Date().toLocaleDateString(), ex = logs.findIndex(l => l.date === today), entry = { date: today, hours: val }; if (ex >= 0) logs[ex] = entry; else logs.push(entry); if (logs.length > 30) logs.shift(); localStorage.setItem('sys_sleep_hunter', JSON.stringify(logs)); const xp = val >= 8 ? 25 : val >= 7 ? 20 : val >= 6 ? 10 : 5; addXP(xp, 'vit'); showNotif(`[ SLEEP ] ${val}h · +${xp} XP`); renderSelfImprovePage(); }
function getSleepLogs() { try { return JSON.parse(localStorage.getItem('sys_sleep_hunter') || '[]'); } catch { return []; } }

// ── STUDY ─────────────────────────────────────────────
function renderStudyContent() { const logs = getStudyLogs(), today = new Date().toLocaleDateString(), tm = logs.filter(l => l.date === today).reduce((a, b) => a + b.minutes, 0); return `<div style="text-align:center;margin-bottom:12px"><div style="font-family:var(--font-hud);font-size:24px;color:var(--purple)">${tm}m</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">STUDIED TODAY</div></div><input type="text" class="sys-input" id="study-subj" placeholder="Subject..." style="margin-bottom:8px"/><div style="display:flex;gap:8px"><input type="number" class="sys-input" id="study-mins" placeholder="Minutes" inputmode="numeric" style="flex:1"/><button class="btn-secondary" onclick="logStudy()">LOG</button></div>${logs.slice(-3).reverse().map(l => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);margin-top:6px"><div style="font-size:12px;color:var(--text2)">${l.subject}</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--purple)">${l.minutes}min</div></div>`).join('')}`; }
function logStudy() { const s = document.getElementById('study-subj')?.value.trim() || 'Study', m = parseInt(document.getElementById('study-mins')?.value); if (isNaN(m) || m < 1) { showNotif('Enter duration'); return; } const logs = getStudyLogs(); logs.push({ date: new Date().toLocaleDateString(), subject: s, minutes: m }); if (logs.length > 100) logs.shift(); localStorage.setItem('sys_study_hunter', JSON.stringify(logs)); const xp = Math.round(m * 0.5); addXP(xp, 'int'); showNotif(`[ STUDY ] ${s} · ${m}min · +${xp} XP`); document.getElementById('study-subj').value = ''; document.getElementById('study-mins').value = ''; renderSelfImprovePage(); }
function getStudyLogs() { try { return JSON.parse(localStorage.getItem('sys_study_hunter') || '[]'); } catch { return []; } }

// ── WEEKLY REVIEW ─────────────────────────────────────
function renderReviewContent() { const reviews = getWeeklyReviews(), tw = getWeekKey(), ex = reviews.find(r => r.week === tw); if (ex) return `<div style="font-family:var(--font-mono);font-size:9px;color:var(--green);margin-bottom:8px">✓ SUBMITTED THIS WEEK</div><div style="background:var(--bg3);border-radius:6px;padding:10px;font-size:12px;color:var(--text2);line-height:1.7;white-space:pre-wrap">${ex.text}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">${'⭐'.repeat(ex.rating)}</div>`; return `<div style="display:flex;gap:6px;margin-bottom:10px">${[1, 2, 3, 4, 5].map(n => `<button id="star-${n}" onclick="setWeekRating(${n})" style="flex:1;padding:8px;background:transparent;border:1px solid var(--border);border-radius:6px;font-size:18px;cursor:pointer">⭐</button>`).join('')}</div><textarea id="weekly-review-text" style="width:100%;min-height:100px;background:rgba(7,20,38,0.8);border:1px solid var(--border);border-radius:6px;padding:10px;color:var(--text);font-family:var(--font-ui);font-size:13px;resize:none;outline:none;line-height:1.6;box-sizing:border-box" placeholder="What went well? What will you do differently?"></textarea><button class="btn-primary" style="margin-top:10px" onclick="submitWeeklyReview()"><span>SUBMIT</span><div class='btn-arrow'>▶</div></button>`; }
function setWeekRating(n) { window._weekRating = n;[1, 2, 3, 4, 5].forEach(i => { const b = document.getElementById('star-' + i); if (b) b.style.background = i <= n ? 'rgba(240,192,64,0.2)' : 'transparent'; }); }
function submitWeeklyReview() { const t = document.getElementById('weekly-review-text')?.value.trim(); if (!t) { showNotif('Write something first'); return; } const r = getWeeklyReviews(); r.unshift({ week: getWeekKey(), text: t, rating: window._weekRating || 3, date: new Date().toLocaleDateString() }); if (r.length > 52) r.length = 52; localStorage.setItem('sys_reviews_hunter', JSON.stringify(r)); addXP(40, 'int'); showNotif('[ REVIEW ] +40 XP', 'gold'); renderSelfImprovePage(); }
function getWeeklyReviews() { try { return JSON.parse(localStorage.getItem('sys_reviews_hunter') || '[]'); } catch { return []; } }
function getWeekKey() { const d = new Date(), s = new Date(d.getFullYear(), 0, 1), w = Math.ceil(((d - s) / 86400000 + s.getDay() + 1) / 7); return `${d.getFullYear()}-W${String(w).padStart(2, '0')}`; }

// ── STREAK CALENDAR ───────────────────────────────────
function renderStreakCalContent() { const history = getXPHistory(), today = new Date(), days = 35, cells = []; for (let i = days - 1; i >= 0; i--) { const d = new Date(today); d.setDate(today.getDate() - i); const key = d.toLocaleDateString(), entry = history.find(h => h.date === key), xp = entry?.xp || 0; cells.push({ date: key, xp, label: d.getDate(), isToday: i === 0 }); } const maxXP = Math.max(...cells.map(c => c.xp), 1); return `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:6px;display:flex;justify-content:space-between"><span>5 WEEKS</span><span>TODAY →</span></div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:8px">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => `<div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);text-align:center">${d}</div>`).join('')}${cells.map(c => { const o = c.xp > 0 ? Math.max(0.15, c.xp / maxXP) : 0; return `<div style="aspect-ratio:1;background:${c.xp > 0 ? `rgba(0,180,255,${o})` : 'rgba(255,255,255,0.03)'};border:${c.isToday ? '1px solid var(--accent)' : '1px solid transparent'};border-radius:3px" title="${c.date}: ${c.xp} XP"></div>`; }).join('')}</div><div style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:var(--text3)">Less ${[0.05, 0.2, 0.4, 0.7, 1].map(o => `<div style="width:12px;height:12px;border-radius:2px;background:rgba(0,180,255,${o})"></div>`).join('')} More</div>`; }

// ── XP GRAPH ──────────────────────────────────────────
function renderXPGraphContent() { const history = getXPHistory(), last14 = history.slice(-14); if (last14.length < 2) return `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:16px">Keep earning XP to see your graph.</div>`; const maxXP = Math.max(...last14.map(d => d.xp), 1), W = 300, H = 100, pad = 16, pts = last14.map((d, i) => ({ x: pad + (i / (last14.length - 1)) * (W - pad * 2), y: H - pad - ((d.xp / maxXP) * (H - pad * 2)), ...d })), pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '), areaD = pathD + ` L${pts[pts.length - 1].x},${H - pad} L${pts[0].x},${H - pad} Z`, total = history.reduce((a, b) => a + b.xp, 0), avg = last14.length ? Math.round(last14.reduce((a, b) => a + b.xp, 0) / last14.length) : 0, best = [...last14].sort((a, b) => b.xp - a.xp)[0]; return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px"><div style="text-align:center"><div style="font-family:var(--font-hud);font-size:16px;color:var(--gold)">${total.toLocaleString()}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">TOTAL</div></div><div style="text-align:center"><div style="font-family:var(--font-hud);font-size:16px;color:var(--accent)">${avg}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">AVG/DAY</div></div><div style="text-align:center"><div style="font-family:var(--font-hud);font-size:16px;color:var(--green)">${best?.xp || 0}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">BEST DAY</div></div></div><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><defs><linearGradient id="xpg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00b4ff" stop-opacity="0.3"/><stop offset="100%" stop-color="#00b4ff" stop-opacity="0.02"/></linearGradient></defs><path d="${areaD}" fill="url(#xpg2)"/><path d="${pathD}" fill="none" stroke="#00b4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${pts.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="#00b4ff"/>`).join('')}</svg>`; }
function getXPHistory() { try { return JSON.parse(localStorage.getItem('sys_xp_history') || '[]'); } catch { return []; } }
function recordDailyXP(xp) { const h = getXPHistory(), today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), todayFull = new Date().toLocaleDateString(), last = h[h.length - 1]; if (last && last.date === todayFull) { last.xp += xp; last.label = today; } else h.push({ label: today, date: todayFull, xp }); if (h.length > 60) h.shift(); localStorage.setItem('sys_xp_history', JSON.stringify(h)); }

// ── PERSONAL RECORDS ──────────────────────────────────
function renderPRContent() { const prs = getPRs(); return `${prs.length === 0 ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px 0 10px">No PRs yet</div>` : prs.slice(0, 5).map((pr, i) => `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div style="font-size:18px">🏆</div><div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text)">${pr.exercise}</div><div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${pr.date}</div></div><div style="font-family:var(--font-hud);font-size:15px;color:var(--gold)">${pr.value}<span style="font-size:9px;color:var(--text3)">${pr.unit}</span></div><button onclick="deletePR(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer">×</button></div>`).join('')}<button onclick="openPRSheet()" style="width:100%;margin-top:10px;padding:9px;background:transparent;border:1px dashed var(--border2);border-radius:6px;color:var(--text3);font-family:var(--font-ui);font-size:12px;cursor:pointer">+ Log New PR</button>`; }
function openPRSheet() { showBottomSheet('Log Personal Record', `<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px"><div><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">EXERCISE</label><input type="text" id="pr-ex-s" class="sys-input" placeholder="e.g. Bench Press"/></div><div style="display:flex;gap:8px"><div style="flex:2"><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">VALUE</label><input type="number" id="pr-val-s" class="sys-input" placeholder="100" inputmode="decimal"/></div><div style="flex:1"><label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">UNIT</label><input type="text" id="pr-unit-s" class="sys-input" placeholder="kg"/></div></div></div><button class="btn-primary" onclick="const ex=document.getElementById('pr-ex-s')?.value.trim(),val=document.getElementById('pr-val-s')?.value.trim(),unit=document.getElementById('pr-unit-s')?.value.trim()||'reps';if(!ex||!val){showNotif('Fill in exercise and value');return;}const prs=getPRs();prs.unshift({exercise:ex,value:val,unit,date:new Date().toLocaleDateString()});savePRs(prs);addXP(25,'str');closeBottomSheet();showNotif('[ NEW PR ] +25 XP','gold');"><span>SAVE PR</span><div class='btn-arrow'>▶</div></button>`, () => renderSelfImprovePage()); }
function deletePR(i) { const p = getPRs(); p.splice(i, 1); savePRs(p); renderSelfImprovePage(); }
function getPRs() { try { return JSON.parse(localStorage.getItem('sys_prs_hunter') || '[]'); } catch { return []; } }
function savePRs(p) { localStorage.setItem('sys_prs_hunter', JSON.stringify(p)); }

// ── ACHIEVEMENTS ──────────────────────────────────────
const ACHIEVEMENTS = [{ id: 'first_quest', name: 'First Blood', icon: '⚔️', desc: 'Complete your first quest', check: h => (h.questsCompleted || 0) >= 1 }, { id: 'quests_10', name: 'Quest Runner', icon: '🏃', desc: 'Complete 10 quests', check: h => (h.questsCompleted || 0) >= 10 }, { id: 'quests_50', name: 'Dungeon Diver', icon: '🗡️', desc: 'Complete 50 quests', check: h => (h.questsCompleted || 0) >= 50 }, { id: 'quests_100', name: 'Quest Master', icon: '👑', desc: 'Complete 100 quests', check: h => (h.questsCompleted || 0) >= 100 }, { id: 'streak_7', name: 'Week Warrior', icon: '🔥', desc: '7-day streak', check: h => (h.streakDays || 0) >= 7 }, { id: 'streak_30', name: 'Unstoppable', icon: '⚡', desc: '30-day streak', check: h => (h.streakDays || 0) >= 30 }, { id: 'level_10', name: 'C-Rank Ascension', icon: '🌟', desc: 'Reach Level 10', check: h => h.level >= 10 }, { id: 'level_30', name: 'A-Rank Ascension', icon: '💫', desc: 'Reach Level 30', check: h => h.level >= 30 }, { id: 'level_50', name: 'S-Rank Hunter', icon: '🏆', desc: 'Reach Level 50', check: h => h.level >= 50 }, { id: 'workout_10', name: 'Iron Will', icon: '💪', desc: 'Log 10 workouts', check: h => (h.workouts || []).length >= 10 }, { id: 'workout_50', name: 'Training Maniac', icon: '🏋️', desc: 'Log 50 workouts', check: h => (h.workouts || []).length >= 50 }, { id: 'xp_1000', name: 'Power Rising', icon: '⚡', desc: 'Earn 1,000 XP', check: h => (h.totalXPEarned || 0) >= 1000 }, { id: 'xp_10000', name: 'Shadow Monarch', icon: '🦋', desc: 'Earn 10,000 XP', check: h => (h.totalXPEarned || 0) >= 10000 }];
function renderAchievementsContent() { const unlocked = getUnlockedAchievements(), earned = ACHIEVEMENTS.filter(a => unlocked.includes(a.id)), locked = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id)); return `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px">${earned.length}/${ACHIEVEMENTS.length} UNLOCKED</div>${earned.length > 0 ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">${earned.map(a => `<div style="background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.25);border-radius:8px;padding:10px;text-align:center"><div style="font-size:22px;margin-bottom:3px">${a.icon}</div><div style="font-size:11px;font-weight:600;color:var(--gold)">${a.name}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);margin-top:1px">${a.desc}</div></div>`).join('')}</div>` : ''}<div style="display:flex;flex-direction:column;gap:5px">${locked.map(a => `<div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(0,0,0,0.15);border:1px solid var(--border);border-radius:6px;opacity:0.5"><span style="font-size:16px;filter:grayscale(1)">${a.icon}</span><div style="flex:1"><div style="font-size:12px;color:var(--text3)">${a.name}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">${a.desc}</div></div><span>🔒</span></div>`).join('')}</div>`; }
function getUnlockedAchievements() { try { return JSON.parse(localStorage.getItem('sys_achievements') || '[]'); } catch { return []; } }
function saveUnlockedAchievements(a) { localStorage.setItem('sys_achievements', JSON.stringify(a)); }
function checkAllAchievements() { if (!HUNTER) return; const u = getUnlockedAchievements(); let ch = false; ACHIEVEMENTS.forEach(a => { if (!u.includes(a.id) && a.check(HUNTER)) { u.push(a.id); ch = true; setTimeout(() => showAchievementToast(a), 600); } }); if (ch) saveUnlockedAchievements(u); }
function showAchievementToast(a) { const t = document.createElement('div'); t.style.cssText = 'position:fixed;bottom:max(90px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%) translateY(20px);background:var(--bg2);border:1px solid var(--gold);border-radius:10px;padding:12px 18px;z-index:900;display:flex;align-items:center;gap:12px;box-shadow:0 0 20px rgba(240,192,64,0.3);opacity:0;transition:all 0.3s;white-space:nowrap'; t.innerHTML = `<div style="font-size:24px">${a.icon}</div><div><div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);letter-spacing:2px">ACHIEVEMENT UNLOCKED</div><div style="font-size:13px;font-weight:600;color:var(--text)">${a.name}</div></div>`; document.body.appendChild(t); setTimeout(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)' }, 50); setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400) }, 3500); }

// ── WORKOUT PLAN ──────────────────────────────────────
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function renderWorkoutPlanContent() { const plan = getWorkoutPlan(), today = new Date().toLocaleDateString('en-US', { weekday: 'long' }); return `${DAYS_OF_WEEK.map(day => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div style="font-family:var(--font-mono);font-size:10px;color:${day === today ? 'var(--accent)' : 'var(--text3)'};width:30px;flex-shrink:0">${day.slice(0, 3).toUpperCase()}</div><input type="text" class="sys-input" id="plan-${day}" value="${plan[day] || ''}" placeholder="Rest / Chest / Cardio..." style="flex:1;font-size:12px;${day === today ? 'border-color:rgba(0,180,255,0.4)' : ''}"/></div>`).join('')}<button class="btn-primary" onclick="saveWorkoutPlan()" style="margin-top:4px"><span>SAVE PLAN</span><div class='btn-arrow'>▶</div></button>`; }
function saveWorkoutPlan() { const plan = {}; DAYS_OF_WEEK.forEach(d => { const v = document.getElementById('plan-' + d)?.value.trim(); if (v) plan[d] = v; }); localStorage.setItem('sys_workout_plan', JSON.stringify(plan)); showNotif('[ PLAN SAVED ] Weekly split updated'); }
function getWorkoutPlan() { try { return JSON.parse(localStorage.getItem('sys_workout_plan') || '{}'); } catch { return {}; } }
function getTodaysWorkout() { return getWorkoutPlan()[new Date().toLocaleDateString('en-US', { weekday: 'long' })] || null; }

// ── SEASONAL ──────────────────────────────────────────
const SEASONAL_EVENTS = [{ id: 'new_year', name: "New Year's Challenge", months: [1], days: [1, 2, 3, 4, 5, 6, 7], color: '#f0c040', icon: '🎆', description: 'New year. New rank.', quests: [{ name: 'Set 3 goals for the year', xp: 50, stat: 'int', icon: '🎯' }, { name: 'Complete a workout on Jan 1st', xp: 60, stat: 'str', icon: '💪' }, { name: 'Write your yearly vision', xp: 40, stat: 'int', icon: '📓' }] }, { id: 'summer', name: 'Summer Shred Season', months: [6, 7, 8], days: null, color: '#ff6b35', icon: '☀️', description: 'The heat forges stronger hunters.', quests: [{ name: 'Outdoor workout (30+ min)', xp: 45, stat: 'str', icon: '🌅' }, { name: 'Swim for 30 minutes', xp: 50, stat: 'agi', icon: '🏊' }, { name: 'Stay under calorie goal', xp: 35, stat: 'vit', icon: '⚖️' }] }, { id: 'halloween', name: 'Shadow Hunt Event', months: [10], days: null, color: '#a855f7', icon: '🌑', description: 'The shadows grow longer. So must you.', quests: [{ name: '5AM workout in darkness', xp: 55, stat: 'sense', icon: '🌑' }, { name: 'No sugar for 7 days', xp: 70, stat: 'vit', icon: '🚫' }, { name: 'Raise a new shadow soldier', xp: 60, stat: 'sense', icon: '👻' }] }, { id: 'xmas', name: 'Year-End Final Boss', months: [12], days: [24, 25, 26, 27, 28, 29, 30, 31], color: '#00e5a0', icon: '🏆', description: 'One final raid before the year closes.', quests: [{ name: 'Reflect on the full year in journal', xp: 50, stat: 'int', icon: '📓' }, { name: 'Hardest workout of the year', xp: 80, stat: 'str', icon: '💪' }, { name: 'Plan January training schedule', xp: 40, stat: 'int', icon: '📅' }] }];
function getActiveSeasonalEvent() { const m = new Date().getMonth() + 1, d = new Date().getDate(); return SEASONAL_EVENTS.find(e => e.months.includes(m) && (!e.days || e.days.includes(d))) || null; }
function renderSeasonalBanner(event) { const key = `sys_seasonal_${event.id}_${new Date().getFullYear()}`, done = JSON.parse(localStorage.getItem(key) || '[]'); return `<div style="background:${event.color}0e;border:1px solid ${event.color}44;border-radius:10px;padding:14px;margin-bottom:14px;position:relative;overflow:hidden"><div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${event.color},transparent)"></div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div><div style="font-family:var(--font-mono);font-size:9px;color:${event.color};letter-spacing:2px">${event.icon} SEASONAL EVENT</div><div style="font-family:var(--font-hud);font-size:14px;color:var(--text);margin-top:2px">${event.name}</div></div><div style="font-family:var(--font-mono);font-size:10px;color:${event.color}">${done.length}/${event.quests.length}</div></div>${event.quests.map((q, i) => { const isDone = done.includes(i); return `<div onclick="${isDone ? '' : ` completeSeasonalQuest('${event.id}',${i},${q.xp},'${q.stat}')`}" style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid ${event.color}22;cursor:${isDone ? 'default' : 'pointer'}"><div style="width:18px;height:18px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;background:${isDone ? 'rgba(0,229,160,0.2)' : 'transparent'};border:1.5px solid ${isDone ? 'var(--green)' : 'var(--border2)'}">${isDone ? '✓' : q.icon}</div><div style="flex:1;font-size:12px;color:${isDone ? 'var(--text3)' : 'var(--text)'};text-decoration:${isDone ? 'line-through' : 'none'}">${q.name}</div><span class="stat-pill pill-gold">+${q.xp}</span></div>`; }).join('')}</div>`; }
function completeSeasonalQuest(id, i, xp, stat) { const key = `sys_seasonal_${id}_${new Date().getFullYear()}`, done = JSON.parse(localStorage.getItem(key) || '[]'); if (done.includes(i)) return; done.push(i); localStorage.setItem(key, JSON.stringify(done)); addXP(xp, stat); showNotif(`[ SEASONAL ] +${xp} XP`, 'gold'); renderSelfImprovePage(); }
