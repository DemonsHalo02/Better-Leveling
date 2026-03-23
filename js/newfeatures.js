// ============================================
// SYSTEM — NEW FEATURES v4
// Quotes · Timer · Custom Quests · XP Graph
// Fasting · Macro Goals · Workout Plan
// Photos · Achievements · Seasonal Events
// ============================================

// ============================================
// 📜 DAILY SYSTEM QUOTE
// Solo Leveling style — shown on quest page
// ============================================
const SYSTEM_QUOTES = [
  { text: "I alone level up.", author: "The System" },
  { text: "Arise from the ashes of who you were yesterday.", author: "The System" },
  { text: "The weak fear difficulty. The strong seek it.", author: "The System" },
  { text: "Pain is temporary. Your level is permanent.", author: "The System" },
  { text: "Every rep is a point of XP. Every day is a dungeon.", author: "The System" },
  { text: "Hunters do not rest. They prepare for the next battle.", author: "The System" },
  { text: "Your only competition is who you were yesterday.", author: "The System" },
  { text: "The gate will not wait. Neither will your potential.", author: "The System" },
  { text: "Comfort is the dungeon that keeps you E-Rank forever.", author: "The System" },
  { text: "Shadow Monarch status is earned, not given.", author: "The System" },
  { text: "You think this is hard? Try staying weak forever.", author: "The System" },
  { text: "Discipline is the highest-level skill. Unlock it.", author: "The System" },
  { text: "A hunter who skips training is a hunter who dies first.", author: "The System" },
  { text: "The penalty for inaction is stagnation.", author: "The System" },
  { text: "S-Rank hunters were once E-Rank. Remember that.", author: "The System" },
  { text: "Rest when you are done. Push until you are.", author: "The System" },
  { text: "Fear is a quest. Complete it.", author: "The System" },
  { text: "Your body is the weapon. Train it accordingly.", author: "The System" },
  { text: "Monsters do not care how tired you are.", author: "The System" },
  { text: "The gap between who you are and who you can be is called effort.", author: "The System" },
  { text: "One more rep. One more page. One more step. That is how ranks change.", author: "The System" },
  { text: "Today's suffering is tomorrow's power.", author: "The System" },
  { text: "Arise. The dungeon does not clear itself.", author: "The System" },
  { text: "Shadow soldiers are built from consistent days, not perfect ones.", author: "The System" },
  { text: "You survived yesterday. Now conquer today.", author: "The System" },
];

function getDailyQuote() {
  const day = Math.floor(Date.now() / 86400000);
  return SYSTEM_QUOTES[day % SYSTEM_QUOTES.length];
}

function renderDailyQuote() {
  const q = getDailyQuote();
  return `
    <div style="
      background:rgba(0,180,255,0.04);
      border:1px solid rgba(0,180,255,0.15);
      border-left:3px solid var(--accent);
      border-radius:6px;padding:12px 14px;
      margin-bottom:14px;position:relative;
    ">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:3px;margin-bottom:6px">[ SYSTEM MESSAGE ]</div>
      <div style="font-size:14px;font-weight:600;color:var(--text);line-height:1.5;font-style:italic">"${q.text}"</div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">— ${q.author}</div>
    </div>
  `;
}

// ============================================
// ⏱️ WORKOUT TIMER / REST TIMER
// ============================================
let _timerInterval = null;
let _timerSeconds  = 0;
let _timerRunning  = false;
let _timerMode     = 'stopwatch'; // 'stopwatch' or 'countdown'
let _countdownFrom = 90;

function renderWorkoutTimer(container) {
  container.innerHTML += `
    <div class="section-head">WORKOUT TIMER</div>
    <div class="sys-card" style="text-align:center">
      <!-- Mode toggle -->
      <div style="display:flex;gap:4px;margin-bottom:16px;background:rgba(0,0,0,0.2);padding:3px;border-radius:6px;border:1px solid var(--border)">
        <button id="timer-mode-sw" onclick="setTimerMode('stopwatch')"
          style="flex:1;padding:6px;background:rgba(0,180,255,0.15);border:none;border-radius:4px;color:var(--accent);font-family:var(--font-hud);font-size:10px;letter-spacing:1px;cursor:pointer">STOPWATCH</button>
        <button id="timer-mode-cd" onclick="setTimerMode('countdown')"
          style="flex:1;padding:6px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;letter-spacing:1px;cursor:pointer">REST TIMER</button>
      </div>

      <!-- Countdown presets (shown in countdown mode) -->
      <div id="timer-presets" style="display:none;gap:6px;margin-bottom:12px;flex-wrap:wrap;justify-content:center">
        ${[30,60,90,120,180,300].map(s => `
          <button onclick="setCountdown(${s})" style="
            padding:5px 12px;background:var(--bg3);border:1px solid var(--border);
            border-radius:20px;color:var(--text2);font-family:var(--font-mono);
            font-size:10px;cursor:pointer
          ">${s >= 60 ? Math.floor(s/60)+'m'+(s%60?s%60+'s':'') : s+'s'}</button>
        `).join('')}
      </div>

      <!-- Timer display -->
      <div id="timer-display" style="
        font-family:var(--font-hud);font-size:56px;font-weight:700;
        color:var(--accent);letter-spacing:4px;margin:8px 0;
        text-shadow:0 0 20px rgba(0,180,255,0.4);
        transition:color 0.3s;
      ">0:00</div>

      <div id="timer-label" style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:16px">READY</div>

      <!-- Controls -->
      <div style="display:flex;gap:8px;justify-content:center">
        <button id="timer-start-btn" onclick="toggleTimer()" style="
          flex:2;padding:14px;
          background:linear-gradient(135deg,rgba(0,95,255,0.3),rgba(0,180,255,0.2));
          border:1px solid var(--accent);border-radius:8px;
          color:var(--accent);font-family:var(--font-hud);
          font-size:14px;font-weight:700;letter-spacing:2px;cursor:pointer
        ">▶ START</button>
        <button onclick="resetTimer()" style="
          padding:14px 18px;background:transparent;
          border:1px solid var(--border);border-radius:8px;
          color:var(--text3);font-family:var(--font-hud);
          font-size:12px;cursor:pointer
        ">RESET</button>
      </div>

      <div style="margin-top:12px;font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        Completing a timed set logs it to your workout history
      </div>
    </div>
  `;
}

function setTimerMode(mode) {
  _timerMode = mode;
  resetTimer();
  const sw = document.getElementById('timer-mode-sw');
  const cd = document.getElementById('timer-mode-cd');
  const presets = document.getElementById('timer-presets');
  if (sw) { sw.style.background = mode === 'stopwatch' ? 'rgba(0,180,255,0.15)' : 'transparent'; sw.style.color = mode === 'stopwatch' ? 'var(--accent)' : 'var(--text3)'; }
  if (cd) { cd.style.background = mode === 'countdown'  ? 'rgba(0,180,255,0.15)' : 'transparent'; cd.style.color = mode === 'countdown'  ? 'var(--accent)' : 'var(--text3)'; }
  if (presets) presets.style.display = mode === 'countdown' ? 'flex' : 'none';
}

function setCountdown(secs) {
  _countdownFrom = secs;
  _timerSeconds  = secs;
  resetTimer();
  updateTimerDisplay();
}

function toggleTimer() {
  if (_timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (_timerMode === 'countdown' && _timerSeconds === 0) _timerSeconds = _countdownFrom;
  _timerRunning = true;
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.textContent = '⏸ PAUSE';
  const label = document.getElementById('timer-label');
  if (label) label.textContent = _timerMode === 'stopwatch' ? 'RUNNING' : 'RESTING...';

  _timerInterval = setInterval(() => {
    if (_timerMode === 'stopwatch') {
      _timerSeconds++;
    } else {
      _timerSeconds--;
      if (_timerSeconds <= 0) {
        _timerSeconds = 0;
        timerComplete();
        return;
      }
      // Turn red in last 10 seconds
      const display = document.getElementById('timer-display');
      if (display) display.style.color = _timerSeconds <= 10 ? 'var(--red)' : 'var(--accent)';
    }
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  _timerRunning = false;
  clearInterval(_timerInterval);
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.textContent = '▶ RESUME';
  const label = document.getElementById('timer-label');
  if (label) label.textContent = 'PAUSED';
}

function resetTimer() {
  _timerRunning = false;
  clearInterval(_timerInterval);
  _timerSeconds = _timerMode === 'countdown' ? _countdownFrom : 0;
  updateTimerDisplay();
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.textContent = '▶ START';
  const label = document.getElementById('timer-label');
  if (label) label.textContent = 'READY';
  const display = document.getElementById('timer-display');
  if (display) display.style.color = 'var(--accent)';
}

function timerComplete() {
  clearInterval(_timerInterval);
  _timerRunning = false;
  const label = document.getElementById('timer-label');
  const btn   = document.getElementById('timer-start-btn');
  if (label) label.textContent = 'REST COMPLETE!';
  if (btn)   btn.textContent   = '▶ START';
  // Vibrate phone
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
  showNotif('[ TIMER ] Rest complete — back to work, Hunter!');
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  if (!el) return;
  const m = Math.floor(_timerSeconds / 60);
  const s = _timerSeconds % 60;
  el.textContent = `${m}:${String(s).padStart(2,'0')}`;
}

// ============================================
// ✏️ CUSTOM QUEST CREATOR
// ============================================
function renderCustomQuestCreator(container) {
  const custom = getCustomQuests();

  container.innerHTML += `
    <div class="section-head">CUSTOM QUESTS</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Write your own quests. They appear alongside daily quests every day.
      </div>

      ${custom.length === 0
        ? `<div style="text-align:center;padding:12px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">NO CUSTOM QUESTS YET</div>`
        : custom.map((q, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="font-size:18px">${q.icon}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:var(--text)">${q.name}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">+${q.xp} XP · ${q.stat.toUpperCase()} · ${q.category}</div>
            </div>
            <button onclick="deleteCustomQuest(${i})" style="background:transparent;border:none;color:var(--text3);font-size:16px;cursor:pointer">×</button>
          </div>
        `).join('')
      }

      <div style="margin-top:12px;font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">CREATE NEW QUEST</div>
      <input type="text" id="cq-name" class="sys-input" placeholder="Quest name..." style="margin-bottom:8px"/>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">XP REWARD</label>
          <input type="number" id="cq-xp" class="sys-input" placeholder="20" value="20" inputmode="numeric"/>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">STAT</label>
          <select id="cq-stat" class="sys-input">
            <option value="str">STR</option>
            <option value="vit">VIT</option>
            <option value="agi">AGI</option>
            <option value="int">INT</option>
            <option value="sense">SENSE</option>
          </select>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">ICON</label>
          <select id="cq-icon" class="sys-input">
            ${['💪','🏃','🧘','📖','💧','🎯','🌅','🔥','⚡','🥗','🧹','🎨','🏋️','🚴','🤸'].map(e=>`<option>${e}</option>`).join('')}
          </select>
        </div>
      </div>
      <button class="btn-primary" onclick="addCustomQuest()"><span>ADD QUEST</span><div class="btn-arrow">▶</div></button>
    </div>
  `;
}

function addCustomQuest() {
  const name = document.getElementById('cq-name')?.value.trim();
  const xp   = parseInt(document.getElementById('cq-xp')?.value)  || 20;
  const stat = document.getElementById('cq-stat')?.value  || 'str';
  const icon = document.getElementById('cq-icon')?.value  || '💪';
  if (!name) { showNotif('[ ERROR ] Enter a quest name'); return; }
  const custom = getCustomQuests();
  custom.push({ id: 'custom_' + Date.now(), name, xp, stat, icon, category: 'custom' });
  saveCustomQuests(custom);
  showNotif(`[ QUEST CREATED ] "${name}" added to your daily rotation`);
  document.getElementById('cq-name').value = '';
  renderSelfImprovePage();
}

function deleteCustomQuest(i) {
  const custom = getCustomQuests();
  custom.splice(i, 1);
  saveCustomQuests(custom);
  renderSelfImprovePage();
}

function getCustomQuests() {
  try { return JSON.parse(localStorage.getItem('sys_custom_quests') || '[]'); }
  catch { return []; }
}

function saveCustomQuests(q) { localStorage.setItem('sys_custom_quests', JSON.stringify(q)); }

// Hook into getDailyQuests to append custom quests
const _origGetDailyQuests = getDailyQuests;
// Override is done in engine — custom quests appended in loadHunter

// ============================================
// 📈 XP HISTORY GRAPH
// ============================================
function renderXPGraph(container) {
  const history = getXPHistory();
  const last14  = history.slice(-14);

  if (last14.length < 2) {
    container.innerHTML += `
      <div class="section-head">XP HISTORY</div>
      <div class="sys-card" style="text-align:center;padding:20px">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">Keep earning XP to see your progress graph here.</div>
      </div>
    `;
    return;
  }

  const maxXP = Math.max(...last14.map(d => d.xp), 1);
  const W = 320, H = 120, pad = 20;
  const pts = last14.map((d, i) => {
    const x = pad + (i / (last14.length - 1)) * (W - pad * 2);
    const y = H - pad - ((d.xp / maxXP) * (H - pad * 2));
    return { x, y, ...d };
  });

  const pathD   = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaD   = pathD + ` L${pts[pts.length-1].x},${H-pad} L${pts[0].x},${H-pad} Z`;
  const totalXP = history.reduce((a, b) => a + b.xp, 0);
  const avgXP   = last14.length ? Math.round(last14.reduce((a,b)=>a+b.xp,0)/last14.length) : 0;
  const bestDay = [...last14].sort((a,b)=>b.xp-a.xp)[0];

  container.innerHTML += `
    <div class="section-head">XP HISTORY</div>
    <div class="sys-card">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
        <div style="text-align:center">
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--gold)">${totalXP.toLocaleString()}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL XP</div>
        </div>
        <div style="text-align:center">
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--accent)">${avgXP}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">AVG/DAY</div>
        </div>
        <div style="text-align:center">
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--green)">${bestDay?.xp || 0}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">BEST DAY</div>
        </div>
      </div>

      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
        <defs>
          <linearGradient id="xp-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00b4ff" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#00b4ff" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <!-- Grid lines -->
        ${[0.25,0.5,0.75,1].map(p => {
          const y = pad + (1-p) * (H - pad*2);
          return `<line x1="${pad}" y1="${y.toFixed(1)}" x2="${W-pad}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
        }).join('')}
        <!-- Area fill -->
        <path d="${areaD}" fill="url(#xp-area-grad)"/>
        <!-- Line -->
        <path d="${pathD}" fill="none" stroke="#00b4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Data points -->
        ${pts.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="#00b4ff"/>`).join('')}
        <!-- X labels (every 3rd day) -->
        ${pts.filter((_,i) => i % 3 === 0 || i === pts.length-1).map(p => `
          <text x="${p.x.toFixed(1)}" y="${H-4}" text-anchor="middle"
            font-family="Share Tech Mono" font-size="8" fill="rgba(122,160,204,0.7)">${p.label}</text>
        `).join('')}
      </svg>
    </div>
  `;
}

function recordDailyXP(xpEarned) {
  const history = getXPHistory();
  const today   = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric' });
  const last    = history[history.length - 1];
  if (last && last.label === today) {
    last.xp += xpEarned;
  } else {
    history.push({ label: today, xp: xpEarned, date: new Date().toLocaleDateString() });
  }
  if (history.length > 60) history.shift();
  localStorage.setItem('sys_xp_history', JSON.stringify(history));
}

function getXPHistory() {
  try { return JSON.parse(localStorage.getItem('sys_xp_history') || '[]'); }
  catch { return []; }
}

// ============================================
// ⏱️ FASTING TRACKER
// ============================================
function renderFastingTracker(container) {
  const fast = getFastData();
  const now  = Date.now();

  let html = `<div class="section-head">FASTING TRACKER</div><div class="sys-card">`;

  if (fast.active) {
    const elapsed  = Math.floor((now - fast.startTime) / 1000);
    const goal     = fast.goalHours * 3600;
    const pct      = Math.min(100, Math.round((elapsed / goal) * 100));
    const hours    = Math.floor(elapsed / 3600);
    const mins     = Math.floor((elapsed % 3600) / 60);
    const done     = elapsed >= goal;

    html += `
      <div style="text-align:center;margin-bottom:14px">
        <div style="font-family:var(--font-mono);font-size:9px;color:${done?'var(--green)':'var(--gold)'};letter-spacing:2px;margin-bottom:8px">
          ${done ? '✓ FAST COMPLETE' : 'FAST IN PROGRESS'}
        </div>
        <div style="font-family:var(--font-hud);font-size:42px;color:${done?'var(--green)':'var(--accent)'}">
          ${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}
        </div>
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:4px">
          / ${fast.goalHours}:00 goal
        </div>
      </div>
      <div style="height:8px;background:rgba(0,180,255,0.08);border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:14px">
        <div style="height:100%;width:${pct}%;background:${done?'var(--green)':'linear-gradient(90deg,var(--accent2),var(--accent))'};border-radius:4px;transition:width 1s"></div>
      </div>
      <div style="display:flex;gap:8px">
        ${done
          ? `<button class="btn-primary" style="flex:1" onclick="endFast(true)"><span>✓ COMPLETE FAST</span></button>`
          : `<button class="btn-danger" style="flex:1" onclick="endFast(false)">BREAK FAST</button>`
        }
      </div>
      <div id="fast-refresh-note" style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center;margin-top:8px">Timer updates when you revisit this page</div>
    `;
  } else {
    html += `
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Start a fast to track your progress. Complete it to earn XP.
      </div>
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:6px">FASTING GOAL</label>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${[12,14,16,18,20,24].map(h => `
            <button id="fast-goal-${h}" onclick="selectFastGoal(${h})" style="
              padding:7px 14px;border-radius:20px;cursor:pointer;font-family:var(--font-mono);font-size:11px;
              background:${fast.selectedGoal===h?'rgba(0,180,255,0.2)':'var(--bg3)'};
              border:1px solid ${fast.selectedGoal===h?'var(--accent)':'var(--border)'};
              color:${fast.selectedGoal===h?'var(--accent)':'var(--text3)'}
            ">${h}:00</button>
          `).join('')}
        </div>
      </div>
      <button class="btn-primary" onclick="startFast()"><span>BEGIN FAST</span><div class="btn-arrow">▶</div></button>
      ${fast.lastCompleted ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--green);text-align:center;margin-top:10px">Last fast: ${fast.lastCompleted}</div>` : ''}
    `;
  }

  html += `</div>`;
  container.innerHTML += html;
}

function selectFastGoal(h) {
  const data = getFastData();
  data.selectedGoal = h;
  saveFastData(data);
  renderSelfImprovePage();
}

function startFast() {
  const data = getFastData();
  const goal = data.selectedGoal || 16;
  data.active    = true;
  data.startTime = Date.now();
  data.goalHours = goal;
  saveFastData(data);
  showNotif(`[ FASTING ] ${goal}-hour fast started. Stay strong, Hunter!`);
  renderSelfImprovePage();
}

function endFast(completed) {
  const data    = getFastData();
  const elapsed = Math.floor((Date.now() - data.startTime) / 3600000);
  data.active   = false;
  if (completed) {
    data.lastCompleted = `${data.goalHours}h fast on ${new Date().toLocaleDateString()}`;
    const xp = Math.round(data.goalHours * 4);
    addXP(xp, 'vit');
    showNotif(`[ FAST COMPLETE ] ${data.goalHours} hours! +${xp} XP`, 'gold');
    recordAchievement('fast_complete');
  } else {
    showNotif(`[ FAST BROKEN ] ${elapsed}h completed. Try again tomorrow.`);
  }
  saveFastData(data);
  renderSelfImprovePage();
}

function getFastData() {
  try { return JSON.parse(localStorage.getItem('sys_fast') || '{"selectedGoal":16}'); }
  catch { return { selectedGoal: 16 }; }
}
function saveFastData(d) { localStorage.setItem('sys_fast', JSON.stringify(d)); }

// ============================================
// ⚖️ MACRO GOAL CUSTOMIZER
// ============================================
function getMacroGoals() {
  try { return JSON.parse(localStorage.getItem('sys_macro_goals') || '{"cal":2000,"protein":150,"carbs":250,"fat":65}'); }
  catch { return { cal: 2000, protein: 150, carbs: 250, fat: 65 }; }
}

function renderMacroGoalCustomizer(container) {
  const goals = getMacroGoals();
  container.innerHTML += `
    <div class="section-head">MACRO GOALS</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px">
        Customize your daily nutrition targets. These update your food tracker bars.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">CALORIES</label>
          <input type="number" class="sys-input" id="mg-cal" value="${goals.cal}" inputmode="numeric"/>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">PROTEIN (g)</label>
          <input type="number" class="sys-input" id="mg-protein" value="${goals.protein}" inputmode="numeric"/>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">CARBS (g)</label>
          <input type="number" class="sys-input" id="mg-carbs" value="${goals.carbs}" inputmode="numeric"/>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">FAT (g)</label>
          <input type="number" class="sys-input" id="mg-fat" value="${goals.fat}" inputmode="numeric"/>
        </div>
      </div>
      <button class="btn-primary" onclick="saveMacroGoals()"><span>SAVE GOALS</span><div class="btn-arrow">▶</div></button>
    </div>
  `;
}

function saveMacroGoals() {
  const goals = {
    cal:     parseInt(document.getElementById('mg-cal')?.value)     || 2000,
    protein: parseInt(document.getElementById('mg-protein')?.value) || 150,
    carbs:   parseInt(document.getElementById('mg-carbs')?.value)   || 250,
    fat:     parseInt(document.getElementById('mg-fat')?.value)     || 65,
  };
  localStorage.setItem('sys_macro_goals', JSON.stringify(goals));
  showNotif('[ GOALS SAVED ] Nutrition targets updated');
}

// ============================================
// 📅 WORKOUT PLAN BUILDER
// ============================================
const DAYS_OF_WEEK = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function renderWorkoutPlanBuilder(container) {
  const plan = getWorkoutPlan();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  container.innerHTML += `
    <div class="section-head">WEEKLY WORKOUT PLAN</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
        Set your training split for the week. Today is highlighted.
      </div>
      ${DAYS_OF_WEEK.map(day => {
        const isToday = day === today;
        const val     = plan[day] || '';
        return `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <div style="
              font-family:var(--font-mono);font-size:10px;
              color:${isToday ? 'var(--accent)' : 'var(--text3)'};
              width:80px;flex-shrink:0;letter-spacing:1px;
              font-weight:${isToday ? '700' : '400'}
            ">${day.slice(0,3).toUpperCase()}${isToday ? ' ◈' : ''}</div>
            <input type="text" class="sys-input" id="plan-${day}"
              value="${val}"
              placeholder="e.g. Chest & Triceps, Rest, Cardio..."
              style="flex:1;font-size:12px;${isToday ? 'border-color:rgba(0,180,255,0.4)' : ''}"
            />
          </div>
        `;
      }).join('')}
      <button class="btn-primary" onclick="saveWorkoutPlan()" style="margin-top:4px">
        <span>SAVE PLAN</span><div class="btn-arrow">▶</div>
      </button>
    </div>
  `;
}

function saveWorkoutPlan() {
  const plan = {};
  DAYS_OF_WEEK.forEach(day => {
    const val = document.getElementById('plan-' + day)?.value.trim();
    if (val) plan[day] = val;
  });
  localStorage.setItem('sys_workout_plan', JSON.stringify(plan));
  showNotif('[ PLAN SAVED ] Weekly split updated');
}

function getWorkoutPlan() {
  try { return JSON.parse(localStorage.getItem('sys_workout_plan') || '{}'); }
  catch { return {}; }
}

function getTodaysWorkout() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return getWorkoutPlan()[today] || null;
}

// ============================================
// 📸 BEFORE/AFTER PHOTO VIEWER
// ============================================
function renderPhotoComparison(container) {
  const photos = getProgressPhotos();

  container.innerHTML += `
    <div class="section-head">PROGRESS PHOTOS</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Photos are stored only on this device and never uploaded anywhere.
      </div>

      <!-- Add photo -->
      <div style="margin-bottom:12px">
        <input type="file" id="photo-input" accept="image/*" style="display:none" onchange="handleProgressPhoto(this)"/>
        <button class="btn-secondary" style="width:100%" onclick="document.getElementById('photo-input').click()">
          📷 ADD PROGRESS PHOTO
        </button>
      </div>

      <!-- Photo grid -->
      ${photos.length === 0
        ? `<div style="text-align:center;padding:16px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">NO PHOTOS YET — ADD YOUR FIRST</div>`
        : `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${photos.slice(-6).map((p, i) => `
              <div style="position:relative;border-radius:6px;overflow:hidden;border:1px solid var(--border)">
                <img src="${p.src}" style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block"/>
                <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);padding:4px 6px">
                  <div style="font-family:var(--font-mono);font-size:8px;color:var(--text2)">${p.date}</div>
                </div>
                <button onclick="deletePhoto(${photos.length - 6 + i})" style="
                  position:absolute;top:4px;right:4px;
                  background:rgba(0,0,0,0.6);border:none;border-radius:4px;
                  color:#fff;font-size:12px;padding:2px 6px;cursor:pointer
                ">×</button>
              </div>
            `).join('')}
          </div>
          ${photos.length >= 2 ? `
            <div style="margin-top:12px;font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center">
              ${photos.length} photos · Scroll to see oldest → newest
            </div>
          ` : ''}
        `
      }
    </div>
  `;
}

function handleProgressPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showNotif('[ ERROR ] Photo too large — max 5MB'); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    const photos = getProgressPhotos();
    photos.push({ src: e.target.result, date: new Date().toLocaleDateString() });
    if (photos.length > 20) photos.shift(); // keep last 20
    localStorage.setItem('sys_photos', JSON.stringify(photos));
    showNotif('[ PHOTO ] Progress photo saved');
    renderSelfImprovePage();
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function deletePhoto(i) {
  const photos = getProgressPhotos();
  photos.splice(i, 1);
  localStorage.setItem('sys_photos', JSON.stringify(photos));
  renderSelfImprovePage();
}

function getProgressPhotos() {
  try { return JSON.parse(localStorage.getItem('sys_photos') || '[]'); }
  catch { return []; }
}

// ============================================
// 🏅 ACHIEVEMENT BADGES
// ============================================
const ACHIEVEMENTS = [
  { id: 'first_quest',    name: 'First Blood',       icon: '⚔️',  desc: 'Complete your first quest',           check: h => (h.questsCompleted||0) >= 1 },
  { id: 'quests_10',      name: 'Quest Runner',       icon: '🏃',  desc: 'Complete 10 quests',                  check: h => (h.questsCompleted||0) >= 10 },
  { id: 'quests_50',      name: 'Dungeon Diver',      icon: '🗡️', desc: 'Complete 50 quests',                  check: h => (h.questsCompleted||0) >= 50 },
  { id: 'quests_100',     name: 'Quest Master',       icon: '👑',  desc: 'Complete 100 quests',                 check: h => (h.questsCompleted||0) >= 100 },
  { id: 'streak_7',       name: 'Week Warrior',       icon: '🔥',  desc: '7-day quest streak',                  check: h => (h.streakDays||0) >= 7 },
  { id: 'streak_30',      name: 'Unstoppable',        icon: '⚡',  desc: '30-day quest streak',                 check: h => (h.streakDays||0) >= 30 },
  { id: 'level_10',       name: 'C-Rank Ascension',   icon: '🌟',  desc: 'Reach Level 10',                      check: h => h.level >= 10 },
  { id: 'level_30',       name: 'A-Rank Ascension',   icon: '💫',  desc: 'Reach Level 30',                      check: h => h.level >= 30 },
  { id: 'level_50',       name: 'S-Rank Hunter',      icon: '🏆',  desc: 'Reach Level 50',                      check: h => h.level >= 50 },
  { id: 'workout_10',     name: 'Iron Will',          icon: '💪',  desc: 'Log 10 workouts',                     check: h => (h.workouts||[]).length >= 10 },
  { id: 'workout_50',     name: 'Training Maniac',    icon: '🏋️', desc: 'Log 50 workouts',                     check: h => (h.workouts||[]).length >= 50 },
  { id: 'fast_complete',  name: 'Iron Stomach',       icon: '⏱️',  desc: 'Complete a fasting goal',             check: () => localStorage.getItem('sys_fast')?.includes('lastCompleted') },
  { id: 'shadow_5',       name: 'Army Begins',        icon: '🌑',  desc: 'Raise 5 shadow soldiers',             check: () => (JSON.parse(localStorage.getItem('sys_shadows_hunter')||'[]')).length >= 5 },
  { id: 'all_quests',     name: 'Perfect Day',        icon: '◈',   desc: 'Complete all daily quests in one day', check: h => (h.questsCompleted||0) >= 5 },
  { id: 'xp_1000',        name: 'Power Rising',       icon: '⚡',  desc: 'Earn 1,000 total XP',                 check: h => (h.totalXPEarned||0) >= 1000 },
  { id: 'xp_10000',       name: 'Shadow Monarch',     icon: '🦋',  desc: 'Earn 10,000 total XP',                check: h => (h.totalXPEarned||0) >= 10000 },
];

function renderAchievements(container) {
  const unlocked = getUnlockedAchievements();
  const earned   = ACHIEVEMENTS.filter(a => unlocked.includes(a.id));
  const locked   = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id));

  container.innerHTML += `
    <div class="section-head">ACHIEVEMENTS (${earned.length}/${ACHIEVEMENTS.length})</div>
    <div class="sys-card">
      ${earned.length === 0
        ? `<div style="text-align:center;padding:12px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">No achievements yet — keep hunting!</div>`
        : `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
          ${earned.map(a => `
            <div style="background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.3);border-radius:8px;padding:10px;text-align:center">
              <div style="font-size:24px;margin-bottom:4px">${a.icon}</div>
              <div style="font-size:11px;font-weight:600;color:var(--gold)">${a.name}</div>
              <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);margin-top:2px">${a.desc}</div>
            </div>
          `).join('')}
        </div>`
      }
      ${locked.length > 0 ? `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">LOCKED</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${locked.map(a => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:6px;opacity:0.5">
              <div style="font-size:20px;filter:grayscale(1)">${a.icon}</div>
              <div>
                <div style="font-size:12px;font-weight:600;color:var(--text3)">${a.name}</div>
                <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${a.desc}</div>
              </div>
              <div style="margin-left:auto;font-size:14px">🔒</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function checkAllAchievements() {
  if (!HUNTER) return;
  const unlocked = getUnlockedAchievements();
  let newOnes = false;
  ACHIEVEMENTS.forEach(a => {
    if (!unlocked.includes(a.id) && a.check(HUNTER)) {
      unlocked.push(a.id);
      newOnes = true;
      setTimeout(() => showAchievementUnlock(a), 500);
    }
  });
  if (newOnes) saveUnlockedAchievements(unlocked);
}

function recordAchievement(id) {
  const unlocked = getUnlockedAchievements();
  if (!unlocked.includes(id)) {
    const a = ACHIEVEMENTS.find(a => a.id === id);
    unlocked.push(id);
    saveUnlockedAchievements(unlocked);
    if (a) showAchievementUnlock(a);
  }
}

function showAchievementUnlock(a) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:max(90px,env(safe-area-inset-bottom));
    left:50%;transform:translateX(-50%) translateY(20px);
    background:var(--bg2);border:1px solid var(--gold);
    border-radius:10px;padding:12px 18px;z-index:900;
    display:flex;align-items:center;gap:12px;
    box-shadow:0 0 20px rgba(240,192,64,0.3);
    opacity:0;transition:all 0.35s;white-space:nowrap;
  `;
  toast.innerHTML = `
    <div style="font-size:24px">${a.icon}</div>
    <div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);letter-spacing:2px">ACHIEVEMENT UNLOCKED</div>
      <div style="font-size:13px;font-weight:600;color:var(--text)">${a.name}</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='1'; toast.style.transform='translateX(-50%) translateY(0)'; }, 50);
  setTimeout(() => { toast.style.opacity='0'; setTimeout(() => toast.remove(), 400); }, 3500);
}

function getUnlockedAchievements() {
  try { return JSON.parse(localStorage.getItem('sys_achievements') || '[]'); }
  catch { return []; }
}
function saveUnlockedAchievements(a) { localStorage.setItem('sys_achievements', JSON.stringify(a)); }

// ============================================
// 🎄 SEASONAL EVENTS
// ============================================
const SEASONAL_EVENTS = [
  {
    id: 'new_year', name: "New Year's Challenge",
    months: [1], days: [1,2,3,4,5,6,7],
    color: '#f0c040', icon: '🎆',
    description: 'The System resets. New year, new rank.',
    quests: [
      { name: 'Set 3 goals for the year', xp: 50, stat: 'int', icon: '🎯' },
      { name: 'Complete a full workout on Jan 1st', xp: 60, stat: 'str', icon: '💪' },
      { name: 'Write your yearly vision', xp: 40, stat: 'int', icon: '📓' },
    ],
  },
  {
    id: 'summer', name: 'Summer Shred Season',
    months: [6,7,8], days: null,
    color: '#ff6b35', icon: '☀️',
    description: 'The heat forges stronger hunters.',
    quests: [
      { name: 'Outdoor workout (30+ min)', xp: 45, stat: 'str', icon: '🌅' },
      { name: 'Swim for 30 minutes', xp: 50, stat: 'agi', icon: '🏊' },
      { name: 'Stay under calorie goal', xp: 35, stat: 'vit', icon: '⚖️' },
    ],
  },
  {
    id: 'halloween', name: 'Shadow Hunt Event',
    months: [10], days: null,
    color: '#a855f7', icon: '🌑',
    description: 'The shadows grow longer. So must you.',
    quests: [
      { name: 'Complete workout in darkness (early AM)', xp: 55, stat: 'sense', icon: '🌑' },
      { name: 'No sugar for 7 days straight', xp: 70, stat: 'vit', icon: '🚫' },
      { name: 'Raise a new shadow soldier', xp: 60, stat: 'sense', icon: '👻' },
    ],
  },
  {
    id: 'new_year_eve', name: 'Year-End Final Boss',
    months: [12], days: [24,25,26,27,28,29,30,31],
    color: '#00e5a0', icon: '🏆',
    description: 'One final raid before the year closes.',
    quests: [
      { name: 'Reflect on the full year in journal', xp: 50, stat: 'int', icon: '📓' },
      { name: 'Complete your hardest workout of the year', xp: 80, stat: 'str', icon: '💪' },
      { name: 'Plan January training schedule', xp: 40, stat: 'int', icon: '📅' },
    ],
  },
];

function getActiveSeasonalEvent() {
  const now   = new Date();
  const month = now.getMonth() + 1;
  const day   = now.getDate();
  return SEASONAL_EVENTS.find(e =>
    e.months.includes(month) && (!e.days || e.days.includes(day))
  ) || null;
}

function renderSeasonalEvent(container) {
  const event = getActiveSeasonalEvent();
  if (!event) return;

  const completedKey = `sys_seasonal_${event.id}_${new Date().getFullYear()}`;
  const completed    = JSON.parse(localStorage.getItem(completedKey) || '[]');

  container.innerHTML += `
    <div class="section-head" style="color:${event.color}">${event.icon} SEASONAL EVENT</div>
    <div class="sys-card" style="border-color:${event.color}44">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${event.color},transparent)"></div>
      <div style="font-family:var(--font-hud);font-size:16px;color:${event.color};letter-spacing:1px;margin-bottom:4px">${event.name}</div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:12px;font-style:italic">"${event.description}"</div>
      ${event.quests.map((q, i) => {
        const done = completed.includes(i);
        return `
          <div onclick="${done ? '' : `completeSeasonalQuest('${event.id}',${i},${q.xp},'${q.stat}')`}"
            style="display:flex;align-items:center;gap:10px;padding:10px;margin-bottom:6px;
            background:${done?'rgba(0,229,160,0.05)':'rgba(0,0,0,0.2)'};
            border:1px solid ${done?'rgba(0,229,160,0.3)':'var(--border)'};
            border-radius:6px;cursor:${done?'default':'pointer'};opacity:${done?'0.6':'1'}">
            <div style="width:22px;height:22px;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;
              background:${done?'rgba(0,229,160,0.2)':'transparent'};
              border:1.5px solid ${done?'var(--green)':'var(--border2)'}">
              ${done ? '✓' : q.icon}
            </div>
            <div style="flex:1;font-size:13px;font-weight:600;color:${done?'var(--text3)':'var(--text)'};text-decoration:${done?'line-through':'none'}">${q.name}</div>
            <span class="stat-pill pill-gold">+${q.xp} XP</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function completeSeasonalQuest(eventId, index, xp, stat) {
  const year = new Date().getFullYear();
  const key  = `sys_seasonal_${eventId}_${year}`;
  const done = JSON.parse(localStorage.getItem(key) || '[]');
  if (done.includes(index)) return;
  done.push(index);
  localStorage.setItem(key, JSON.stringify(done));
  addXP(xp, stat);
  showNotif(`[ SEASONAL ] Quest complete! +${xp} XP`, 'gold');
  renderSelfImprovePage();
}

// ============================================
// UPDATED SELF-IMPROVE PAGE RENDERER
// ============================================
function renderSelfImprovePage() {
  const el = document.getElementById('page-improve');
  el.innerHTML = '';

  // Seasonal event (if active)
  renderSeasonalEvent(el);
  // Core trackers
  renderHydrationTracker(el);
  renderFastingTracker(el);
  renderHabitTracker(el);
  renderCustomQuestCreator(el);
  renderMacroGoalCustomizer(el);
  renderWorkoutPlanBuilder(el);
  renderSupplementTracker(el);
  renderCalorieCalculator(el);
  renderXPGraph(el);
  renderAchievements(el);
  renderPRBoard(el);
  renderPhotoComparison(el);
  renderWeeklyReview(el);
  renderFriendsSection(el);
  renderMoodTracker(el);
  renderSleepTracker(el);
  renderStudyTracker(el);
  renderBodyMeasurements(el);
}
