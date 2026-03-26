// ============================================
// SYSTEM — HEALTH TRACKING (Rebuilt)
// Manual + step tracker UI (no auto iPhone/Google tracking)
// ============================================

// Step counter variables (manual only)
let stepCount = 0;

// ============================================
// WORKOUT PAGE RENDERER
// ============================================
function renderWorkoutPage() {
  const el = document.getElementById('page-workout');
  const workouts = HUNTER.workouts || [];
  const totalMin = HUNTER.totalWorkoutMin || 0;
  const healthData = getStoredHealthData();

  const typeOptions = WORKOUT_TYPES.map(w =>
    `<option value="${w.id}">${w.icon} ${w.name} (${w.xpPerMin} XP/min)</option>`
  ).join('');

  let html = `

    <!-- STEP COUNTER (MANUAL) -->
    <div class="section-head">STEP TRACKER</div>
    <div class="sys-card" id="step-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="font-size:32px">👟</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:var(--text)">Step Tracker</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:2px" id="step-status-text">
            Enter your steps manually below
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
      <div style="margin-top:10px;padding:8px;background:rgba(0,180,255,0.05);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);line-height:1.7">
          Every 1,000 steps = +15 XP &nbsp;·&nbsp; 10,000 steps = +50 BONUS XP<br>
          Enter steps manually for tracking.
        </div>
      </div>
    </div>

    <!-- MANUAL HEALTH ENTRY -->
    <div class="section-head">LOG TODAY'S HEALTH DATA</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Enter today's numbers manually to earn XP.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">STEPS TODAY</label>
          <input type="number" class="sys-input" id="h-steps" placeholder="e.g. 8432" inputmode="numeric" value="${healthData.steps || ''}" oninput="previewHealthXP(); updateStepDisplay();" />
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
  `;

  el.innerHTML = html;
}

// ============================================
// HELPER TO UPDATE STEP DISPLAY
// ============================================
function updateStepDisplay() {
  const val = parseInt(document.getElementById('h-steps')?.value) || 0;
  stepCount = val;
  document.getElementById('live-steps').textContent = stepCount.toLocaleString();
  document.getElementById('live-dist').textContent = (stepCount * 0.0008).toFixed(2);
  document.getElementById('live-cal-steps').textContent = Math.round(stepCount * 0.04);
}

// ============================================
// MANUAL HEALTH DATA + XP
// ============================================
function previewHealthXP() {
  const steps = parseInt(document.getElementById('h-steps')?.value) || 0;
  const hr = parseInt(document.getElementById('h-hr')?.value) || 0;
  const calories = parseInt(document.getElementById('h-cal')?.value) || 0;
  const activeMin = parseInt(document.getElementById('h-active')?.value) || 0;
  let xp = 0;
  if (steps >= 10000) xp += 50; else if (steps >= 7500) xp += 35; else if (steps >= 5000) xp += 20; else if (steps >= 2500) xp += 10;
  if (hr > 0 && hr < 70) xp += 15;
  if (calories >= 2000) xp += 20;
  if (activeMin >= 60) xp += 25; else if (activeMin >= 30) xp += 15;
  const prev = document.getElementById('health-xp-preview');
  if (prev) prev.textContent = xp > 0 ? `[ ESTIMATED REWARD: +${xp} XP ]` : '';
}

function saveManualHealthData() {
  const steps = parseInt(document.getElementById('h-steps')?.value) || 0;
  const hr = parseInt(document.getElementById('h-hr')?.value) || 0;
  const calories = parseInt(document.getElementById('h-cal')?.value) || 0;
  const activeMin = parseInt(document.getElementById('h-active')?.value) || 0;
  if (!steps && !hr && !calories && !activeMin) { showNotif('[ ERROR ] Enter at least one value'); return; }
  localStorage.setItem('sys_health_manual_' + getCurrentUser(), JSON.stringify({ date: new Date().toLocaleDateString(), steps, hr, calories, activeMin }));
  updateStepDisplay(); // update UI
  let xp = 0, statKey = 'vit';
  if (steps >= 10000) { xp += 50; statKey = 'agi'; } else if (steps >= 7500) { xp += 35; statKey = 'agi'; } else if (steps >= 5000) { xp += 20; statKey = 'agi'; } else if (steps >= 2500) { xp += 10; statKey = 'agi'; }
  if (hr > 0 && hr < 70) xp += 15;
  if (calories >= 2000) xp += 20;
  if (activeMin >= 60) { xp += 25; statKey = 'str'; } else if (activeMin >= 30) xp += 15;
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
  const dur = parseInt(document.getElementById('wk-dur')?.value);
  const prev = document.getElementById('xp-preview');
  if (!prev) return;
  if (type && dur > 0) {
    const wt = WORKOUT_TYPES.find(w => w.id === type);
    prev.textContent = `[ ESTIMATED REWARD: +${Math.round((wt?.xpPerMin || 1) * dur)} XP ]`;
  } else { prev.textContent = ''; }
}

function submitWorkout() {
  const type = document.getElementById('wk-type')?.value;
  const dur = parseInt(document.getElementById('wk-dur')?.value);
  const notes = document.getElementById('wk-notes')?.value.trim() || '';
  if (!type || isNaN(dur) || dur < 1) { showNotif('[ ERROR ] Enter a valid duration'); return; }
  logWorkout(type, dur, notes);
  document.getElementById('wk-dur').value = '';
  document.getElementById('wk-notes').value = '';
  document.getElementById('xp-preview').textContent = '';
}
