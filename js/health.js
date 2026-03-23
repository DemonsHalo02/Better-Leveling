// ============================================
// SYSTEM — HEALTH TRACKING (Rebuilt)
//
// WHAT THIS FILE DOES:
// 1. Real step counting via iPhone motion sensor
// 2. Manual health data entry that saves + awards XP
// 3. Full Capacitor setup guide for true HealthKit
//
// WHY NOT DIRECT APPLE HEALTH:
// Safari cannot read HealthKit. Apple only allows
// native iOS apps to access it. This file gives you
// everything possible in a web app, plus a clear
// path to go fully native when you're ready.
// ============================================

let motionActive   = false;
let stepCount      = 0;
let lastAccel      = { x: 0, y: 0, z: 0 };
let lastStepTime   = 0;
const STEP_THRESHOLD = 1.15;
const STEP_COOLDOWN  = 280;

// ============================================
// WORKOUT PAGE RENDERER
// ============================================
function renderWorkoutPage() {
  const el       = document.getElementById('page-workout');
  const workouts = HUNTER.workouts || [];
  const totalMin = HUNTER.totalWorkoutMin || 0;
  const healthData = getStoredHealthData();

  const typeOptions = WORKOUT_TYPES.map(w =>
    `<option value="${w.id}">${w.icon} ${w.name} (${w.xpPerMin} XP/min)</option>`
  ).join('');

  let html = `

    <!-- STEP COUNTER -->
    <div class="section-head">STEP TRACKER</div>
    <div class="sys-card" id="step-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="font-size:32px">👟</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:var(--text)">Motion Step Counter</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:2px" id="step-status-text">
            ${motionActive ? 'TRACKING ACTIVE' : 'Uses your iPhone motion sensor — tap to start'}
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--green)" id="live-steps">${stepCount.toLocaleString()}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">STEPS</div>
        </div>
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)" id="live-dist">${(stepCount * 0.0008).toFixed(2)}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">KM EST.</div>
        </div>
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--gold)" id="live-cal-steps">${Math.round(stepCount * 0.04)}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">KCAL EST.</div>
        </div>
      </div>
      ${motionActive
        ? `<button class="btn-danger" style="width:100%" onclick="stopMotionTracking()">⏹ STOP TRACKING</button>`
        : `<button class="btn-primary" onclick="requestMotionPermission()"><span>▶ START STEP TRACKING</span></button>`
      }
      <div style="margin-top:10px;padding:8px;background:rgba(0,180,255,0.05);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);line-height:1.7">
          Every 1,000 steps = +15 XP &nbsp;·&nbsp; 10,000 steps = +50 BONUS XP<br>
          Keep this page open while walking for best accuracy.
        </div>
      </div>
    </div>

    <!-- MANUAL HEALTH ENTRY -->
    <div class="section-head">LOG TODAY'S HEALTH DATA</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Open your Apple Health app → Summary tab → check today's numbers → enter them here to earn XP.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">STEPS TODAY</label>
          <input type="number" class="sys-input" id="h-steps" placeholder="e.g. 8432" inputmode="numeric" value="${healthData.steps || ''}" oninput="previewHealthXP()" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">RESTING HR (BPM)</label>
          <input type="number" class="sys-input" id="h-hr" placeholder="e.g. 68" inputmode="numeric" value="${healthData.hr || ''}" oninput="previewHealthXP()" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">CALORIES BURNED</label>
          <input type="number" class="sys-input" id="h-cal" placeholder="e.g. 2150" inputmode="numeric" value="${healthData.calories || ''}" oninput="previewHealthXP()" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">ACTIVE MINUTES</label>
          <input type="number" class="sys-input" id="h-active" placeholder="e.g. 45" inputmode="numeric" value="${healthData.activeMin || ''}" oninput="previewHealthXP()" />
        </div>
      </div>
      <div id="health-xp-preview" style="font-family:var(--font-mono);font-size:10px;color:var(--gold);margin-bottom:10px;min-height:16px"></div>
      <button class="btn-primary" onclick="saveManualHealthData()">
        <span>SAVE HEALTH DATA</span><div class="btn-arrow">▶</div>
      </button>
      ${healthData.date === new Date().toLocaleDateString() ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--green);letter-spacing:2px;margin-bottom:8px">✓ LOGGED TODAY</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${healthData.steps    ? `<span class="stat-pill pill-green">👟 ${Number(healthData.steps).toLocaleString()}</span>` : ''}
            ${healthData.hr       ? `<span class="stat-pill pill-accent">❤️ ${healthData.hr} BPM</span>` : ''}
            ${healthData.calories ? `<span class="stat-pill pill-gold">🔥 ${Number(healthData.calories).toLocaleString()} kcal</span>` : ''}
            ${healthData.activeMin? `<span class="stat-pill pill-purple">⚡ ${healthData.activeMin} min</span>` : ''}
          </div>
        </div>
      ` : ''}
    </div>

    <!-- LOG WORKOUT -->
    <div class="section-head">LOG WORKOUT</div>
    <div class="sys-card">
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">WORKOUT TYPE</label>
        <select class="sys-input" id="wk-type" onchange="updateXPPreview()">${typeOptions}</select>
      </div>
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">DURATION (MINUTES)</label>
        <input type="number" class="sys-input" id="wk-dur" min="1" max="300" placeholder="e.g. 45" inputmode="numeric" oninput="updateXPPreview()" />
      </div>
      <div style="margin-bottom:12px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">NOTES (OPTIONAL)</label>
        <input type="text" class="sys-input" id="wk-notes" placeholder="e.g. New PR on bench press" />
      </div>
      <div id="xp-preview" style="font-family:var(--font-mono);font-size:11px;color:var(--gold);margin-bottom:10px;min-height:16px"></div>
      <button class="btn-primary" onclick="submitWorkout()">
        <span>SUBMIT WORKOUT</span><div class="btn-arrow">▶</div>
      </button>
    </div>

    <!-- NATIVE HEALTHKIT UPGRADE -->
    <div class="section-head">WANT REAL APPLE HEALTH SYNC?</div>
    <div class="sys-card" style="border-color:rgba(240,192,64,0.3)">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
        <div style="font-size:24px">🍎</div>
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px">Native HealthKit</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.6">
            Safari can't read Apple Health — that's Apple's limitation, not a bug in this app.
            To get automatic live sync of all your Health data, the app needs to be wrapped as a native iPhone app using <strong style="color:var(--accent)">Capacitor</strong> (free tool).
          </div>
        </div>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);letter-spacing:2px;margin-bottom:8px">SETUP STEPS (needs a Mac)</div>
      ${[
        ['1', 'Install Node.js',          'Download from nodejs.org'],
        ['2', 'Install Capacitor',        'Terminal: npm install -g @capacitor/cli'],
        ['3', 'Init your app',            'npx cap init "SYSTEM" com.yourname.system'],
        ['4', 'Add iOS',                  'npx cap add ios'],
        ['5', 'Install HealthKit plugin', 'npm install @perfood/capacitor-healthkit'],
        ['6', 'Sync & open Xcode',        'npx cap sync ios && npx cap open ios'],
        ['7', 'Add HealthKit capability', 'Xcode → Signing & Capabilities → + → HealthKit'],
        ['8', 'Add permission text',      'Info.plist → NSHealthShareUsageDescription'],
        ['9', 'Build to iPhone',          'Connect iPhone → Xcode → ▶ Run'],
      ].map(([num, step, detail]) => `
        <div style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
          <div style="font-family:var(--font-hud);font-size:11px;color:var(--accent);width:16px;flex-shrink:0">${num}</div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--text)">${step}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">${detail}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- HISTORY -->
    <div class="section-head">TRAINING STATS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${Math.floor(totalMin/60)}h ${totalMin%60}m</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL TRAINED</div>
      </div>
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--gold)">${workouts.length}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">SESSIONS</div>
      </div>
    </div>

    <div class="section-head">WORKOUT HISTORY</div>
  `;

  if (workouts.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">NO WORKOUTS LOGGED YET</div>`;
  } else {
    workouts.slice(0, 15).forEach(w => {
      const wt = WORKOUT_TYPES.find(t => t.id === w.type);
      html += `
        <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px">
          <div style="font-size:22px">${wt?.icon || '💪'}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:var(--text)">${wt?.name || w.type}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${w.date} · ${w.durationMin} min${w.notes ? ' · ' + w.notes : ''}</div>
          </div>
          <span class="stat-pill pill-gold">+${w.xpEarned} XP</span>
        </div>
      `;
    });
  }

  el.innerHTML = html;

  // Inject workout timer at top of page
  if (typeof renderWorkoutTimer === 'function') {
    const timerWrap = document.createElement('div');
    renderWorkoutTimer(timerWrap);
    el.insertBefore(timerWrap.firstElementChild?.parentElement || timerWrap, el.firstChild);
  }
}

// ============================================
// MOTION TRACKING
// ============================================
async function requestMotionPermission() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS && typeof DeviceMotionEvent?.requestPermission === 'function') {
    try {
      const perm = await DeviceMotionEvent.requestPermission();
      if (perm === 'granted') { startMotionTracking(); }
      else { showNotif('[ DENIED ] Motion permission needed for step tracking'); }
    } catch { showNotif('[ ERROR ] Could not request motion permission'); }
  } else {
    startMotionTracking();
  }
}

function startMotionTracking() {
  if (motionActive) return;
  motionActive = true;
  const saved = getStepData();
  const today = new Date().toLocaleDateString();
  stepCount = saved.date === today ? (saved.steps || 0) : 0;
  window.addEventListener('devicemotion', onMotion);
  showNotif('[ TRACKING ] Step counter active — keep app open');
  window._stepInterval = setInterval(() => { updateLiveStepDisplay(); saveStepData(); }, 3000);
  renderWorkoutPage();
}

function stopMotionTracking() {
  motionActive = false;
  window.removeEventListener('devicemotion', onMotion);
  clearInterval(window._stepInterval);
  saveStepData();
  showNotif(`[ STOPPED ] ${stepCount.toLocaleString()} steps recorded`);
  renderWorkoutPage();
}

function onMotion(e) {
  const accel = e.accelerationIncludingGravity;
  if (!accel) return;
  const mag  = Math.sqrt((accel.x||0)**2 + (accel.y||0)**2 + (accel.z||0)**2);
  const prev = Math.sqrt(lastAccel.x**2 + lastAccel.y**2 + lastAccel.z**2);
  const delta = Math.abs(mag - prev);
  const now = Date.now();
  if (delta > STEP_THRESHOLD && now - lastStepTime > STEP_COOLDOWN) {
    stepCount++;
    lastStepTime = now;
    if (stepCount % 1000 === 0) { addXP(15,'agi'); showNotif(`[ STEPS ] ${stepCount.toLocaleString()} steps! +15 XP`); }
    if (stepCount === 10000)    { addXP(50,'agi'); showNotif('[ MILESTONE ] 10,000 steps! +50 BONUS XP','gold'); }
  }
  lastAccel = { x: accel.x||0, y: accel.y||0, z: accel.z||0 };
}

function updateLiveStepDisplay() {
  const s = document.getElementById('live-steps');
  const d = document.getElementById('live-dist');
  const c = document.getElementById('live-cal-steps');
  if (s) s.textContent = stepCount.toLocaleString();
  if (d) d.textContent = (stepCount * 0.0008).toFixed(2);
  if (c) c.textContent = Math.round(stepCount * 0.04);
}

function saveStepData() {
  localStorage.setItem('sys_steps_' + getCurrentUser(), JSON.stringify({ date: new Date().toLocaleDateString(), steps: stepCount }));
}

function getStepData() {
  try { return JSON.parse(localStorage.getItem('sys_steps_' + getCurrentUser()) || '{}'); }
  catch { return {}; }
}

// ============================================
// MANUAL HEALTH DATA
// ============================================
function previewHealthXP() {
  const steps     = parseInt(document.getElementById('h-steps')?.value)  || 0;
  const hr        = parseInt(document.getElementById('h-hr')?.value)     || 0;
  const calories  = parseInt(document.getElementById('h-cal')?.value)    || 0;
  const activeMin = parseInt(document.getElementById('h-active')?.value) || 0;
  let xp = 0;
  if (steps >= 10000) xp += 50; else if (steps >= 7500) xp += 35; else if (steps >= 5000) xp += 20; else if (steps >= 2500) xp += 10;
  if (hr > 0 && hr < 70) xp += 15;
  if (calories >= 2000)  xp += 20;
  if (activeMin >= 60)   xp += 25; else if (activeMin >= 30) xp += 15;
  const prev = document.getElementById('health-xp-preview');
  if (prev) prev.textContent = xp > 0 ? `[ ESTIMATED REWARD: +${xp} XP ]` : '';
}

function saveManualHealthData() {
  const steps     = parseInt(document.getElementById('h-steps')?.value)  || 0;
  const hr        = parseInt(document.getElementById('h-hr')?.value)     || 0;
  const calories  = parseInt(document.getElementById('h-cal')?.value)    || 0;
  const activeMin = parseInt(document.getElementById('h-active')?.value) || 0;
  if (!steps && !hr && !calories && !activeMin) { showNotif('[ ERROR ] Enter at least one value'); return; }
  localStorage.setItem('sys_health_manual_' + getCurrentUser(), JSON.stringify({ date: new Date().toLocaleDateString(), steps, hr, calories, activeMin }));
  let xp = 0, statKey = 'vit';
  if (steps >= 10000) { xp += 50; statKey = 'agi'; } else if (steps >= 7500) { xp += 35; statKey = 'agi'; } else if (steps >= 5000) { xp += 20; statKey = 'agi'; } else if (steps >= 2500) { xp += 10; statKey = 'agi'; }
  if (hr > 0 && hr < 70) xp += 15;
  if (calories >= 2000)  xp += 20;
  if (activeMin >= 60)   { xp += 25; statKey = 'str'; } else if (activeMin >= 30) xp += 15;
  if (xp > 0) { addXP(xp, statKey); showNotif(`[ HEALTH LOGGED ] +${xp} XP`, 'gold'); }
  else showNotif('[ HEALTH SAVED ] Keep pushing hunter!');
  setHealthConnected('Manual');
  renderWorkoutPage();
}

function getStoredHealthData() {
  try { return JSON.parse(localStorage.getItem('sys_health_manual_' + getCurrentUser()) || '{}'); }
  catch { return {}; }
}

// ============================================
// WORKOUT SUBMIT
// ============================================
function updateXPPreview() {
  const type = document.getElementById('wk-type')?.value;
  const dur  = parseInt(document.getElementById('wk-dur')?.value);
  const prev = document.getElementById('xp-preview');
  if (!prev) return;
  if (type && dur > 0) {
    const wt = WORKOUT_TYPES.find(w => w.id === type);
    prev.textContent = `[ ESTIMATED REWARD: +${Math.round((wt?.xpPerMin || 1) * dur)} XP ]`;
  } else { prev.textContent = ''; }
}

function submitWorkout() {
  const type  = document.getElementById('wk-type')?.value;
  const dur   = parseInt(document.getElementById('wk-dur')?.value);
  const notes = document.getElementById('wk-notes')?.value.trim() || '';
  if (!type || isNaN(dur) || dur < 1) { showNotif('[ ERROR ] Enter a valid duration'); return; }
  logWorkout(type, dur, notes);
  document.getElementById('wk-dur').value   = '';
  document.getElementById('wk-notes').value = '';
  document.getElementById('xp-preview').textContent = '';
}

// ============================================
// WATCH DOT
// ============================================
function setHealthConnected(source) {
  const dot   = document.getElementById('watch-dot');
  const label = document.getElementById('watch-label');
  if (dot)   dot.classList.add('connected');
  if (label) label.textContent = 'ACTIVE';
}

function connectAppleHealth() {
  const btn = document.querySelector('.nav-tab[onclick*="workout"]');
  showPage('workout', btn);
  showNotif('[ SYSTEM ] Health tracking opened');
}
