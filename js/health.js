// ============================================
// SYSTEM — HEALTH TRACKING (Rebuilt)
// Manual health data entry + workout logging
// ============================================

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
            ${healthData.steps ? `<span class="stat-pill pill-green">👟 ${Number(healthData.steps).toLocaleString()}</span>` : ''}
            ${healthData.hr ? `<span class="stat-pill pill-accent">❤️ ${healthData.hr} BPM</span>` : ''}
            ${healthData.calories ? `<span class="stat-pill pill-gold">🔥 ${Number(healthData.calories).toLocaleString()} kcal</span>` : ''}
            ${healthData.activeMin ? `<span class="stat-pill pill-purple">⚡ ${healthData.activeMin} min</span>` : ''}
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

    <!-- HISTORY -->
    <div class="section-head">TRAINING STATS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${Math.floor(totalMin / 60)}h ${totalMin % 60}m</div>
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
}

// ============================================
// MANUAL HEALTH DATA
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
