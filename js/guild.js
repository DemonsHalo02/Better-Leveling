// ============================================
// BETTER LEVELING — GUILD & NOTIFICATIONS v2
// Friend stats via share codes (localStorage
// is device-only, so we use copyable stat codes)
// ============================================

// ── CINEMATIC SYSTEM MESSAGE ──────────────────────────
function showSystemMessage(lines, onDone) {
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;pointer-events:none;backdrop-filter:blur(4px)';
  lines.forEach(({text,color,size,delay}) => {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-hud);font-size:${size||13}px;color:${color||'var(--accent)'};letter-spacing:${size>20?4:2}px;opacity:0;transition:opacity 0.5s;text-align:center;text-shadow:0 0 20px ${color||'rgba(0,180,255,0.5)'}88`;
    el.textContent = text;
    ov.appendChild(el);
    setTimeout(() => el.style.opacity = '1', delay||0);
  });
  document.body.appendChild(ov);
  const t = (lines[lines.length-1]?.delay||0) + 2000;
  setTimeout(() => {
    ov.style.opacity = '0'; ov.style.transition = 'opacity 0.6s';
    setTimeout(() => { ov.remove(); if (onDone) onDone(); }, 600);
  }, t);
}

// ── XP POP ────────────────────────────────────────────
function showXPPop(amount, x, y) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-family:var(--font-hud);font-size:16px;font-weight:700;color:var(--gold);pointer-events:none;z-index:1000;text-shadow:0 0 10px rgba(240,192,64,0.6);animation:xp-pop 1.2s ease forwards`;
  el.textContent = `+${amount} XP`;
  if (!document.getElementById('xp-pop-style')) {
    const s = document.createElement('style');
    s.id = 'xp-pop-style';
    s.textContent = '@keyframes xp-pop{0%{opacity:1;transform:translateY(0) scale(1)}60%{opacity:1;transform:translateY(-40px) scale(1.2)}100%{opacity:0;transform:translateY(-70px) scale(0.8)}}';
    document.head.appendChild(s);
  }
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

document.addEventListener('click', e => {
  const card = e.target.closest('.quest-card:not(.quest-done)');
  if (card) showXPPop(Math.round(20 + Math.random()*30), e.clientX-20, e.clientY-30);
});

// ── STAT CODE HELPERS ─────────────────────────────────
// A "stat code" is a base64-encoded JSON blob the user
// copies from their device and pastes on a friend's device.
// Format: BL1:base64(JSON)
function generateStatCode() {
  if (!HUNTER) return '';
  const s = typeof getSettings === 'function' ? getSettings() : {};
  const payload = {
    n: (s.hunterName || HUNTER.name || 'HUNTER').toUpperCase(),
    l: HUNTER.level || 1,
    x: HUNTER.totalXPEarned || 0,
    r: getRank(HUNTER.level||1).name,
    c: HUNTER.class || 'fighter',
    q: HUNTER.questsCompleted || 0,
    s: HUNTER.streakDays || 0,
    t: Date.now(),
  };
  return 'BL1:' + btoa(JSON.stringify(payload));
}

function parseStatCode(code) {
  try {
    if (!code.startsWith('BL1:')) return null;
    return JSON.parse(atob(code.slice(4)));
  } catch { return null; }
}

// ── GUILD PAGE ────────────────────────────────────────
function renderGuildPage() {
  const el = document.getElementById('page-guild');
  if (!el) return;

  updateGuildScore();

  const s       = typeof getSettings === 'function' ? getSettings() : {};
  const myName  = (s.hunterName || HUNTER?.name || 'HUNTER').toUpperCase();
  const friends = (s.friends || []).map(f => f.toUpperCase());
  const scores  = getGuildScores();

  const sorted = Object.values(scores)
    .sort((a, b) => (b.totalXP||0) - (a.totalXP||0));

  const myPos  = sorted.findIndex(h => (h.hunterName||'').toUpperCase() === myName) + 1;
  const medals = ['#f0c040','#c0c0c0','#cd7f32'];
  const icons  = ['👑','🥈','🥉'];

  // My stat code for sharing
  const myCode = generateStatCode();

  el.innerHTML = `
    <!-- MY RANK CARD -->
    <div class="section-head">HUNTER GUILD</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="font-family:var(--font-hud);font-size:40px;color:${myPos>0&&myPos<=3?medals[myPos-1]:'var(--accent)'};line-height:1">
          #${myPos||'—'}
        </div>
        <div style="flex:1">
          <div style="font-family:var(--font-hud);font-size:16px;color:var(--text);letter-spacing:1px">${myName}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:3px">LV ${HUNTER?.level||1} · ${getRank(HUNTER?.level||1).name}</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--gold);margin-top:2px">${(HUNTER?.totalXPEarned||0).toLocaleString()} XP</div>
        </div>
        <div style="text-align:right;font-family:var(--font-mono);font-size:9px;color:var(--text3)">
          <div>${sorted.length} hunter${sorted.length!==1?'s':''}</div>
          <div style="margin-top:2px">${friends.length} partner${friends.length!==1?'s':''}</div>
        </div>
      </div>
    </div>

    <!-- SHARE YOUR STATS -->
    <div style="background:rgba(0,180,255,0.05);border:1px solid rgba(0,180,255,0.2);border-radius:8px;padding:12px;margin-bottom:10px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:2px;margin-bottom:6px">📤 SHARE YOUR STATS</div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:8px;line-height:1.5">
        Copy your stat code and send it to a friend. They paste it below to add your real XP and level to their leaderboard.
      </div>
      <div style="display:flex;gap:8px">
        <div style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-family:var(--font-mono);font-size:10px;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${myCode.slice(0,32)}...
        </div>
        <button class="btn-secondary" onclick="copyStatCode()" style="flex-shrink:0">COPY</button>
      </div>
    </div>

    <!-- ADD FRIEND'S CODE -->
    <div style="background:rgba(240,192,64,0.05);border:1px solid rgba(240,192,64,0.2);border-radius:8px;padding:12px;margin-bottom:14px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);letter-spacing:2px;margin-bottom:6px">📥 ADD FRIEND'S STATS</div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:8px;line-height:1.5">
        Paste a friend's stat code to see their XP and level on the leaderboard.
      </div>
      <div style="display:flex;gap:8px">
        <input type="text" class="sys-input" id="friend-code-input"
          placeholder="Paste BL1:... code here" style="flex:1;font-family:var(--font-mono);font-size:11px"/>
        <button class="btn-secondary" onclick="addFriendStatCode()" style="flex-shrink:0">ADD</button>
      </div>
      <div id="friend-code-status" style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px;min-height:14px"></div>
    </div>

    <!-- LEADERBOARD -->
    <div class="section-head">LEADERBOARD</div>

    ${sorted.length === 0 ? `
      <div style="text-align:center;padding:30px;color:var(--text3);font-family:var(--font-mono);font-size:11px;line-height:2">
        NO HUNTERS YET<br>Earn XP to appear here.
      </div>
    ` : sorted.slice(0, 25).map((h, i) => {
      const pos      = i + 1;
      const isMe     = (h.hunterName||'').toUpperCase() === myName;
      const isFriend = friends.includes((h.hunterName||'').toUpperCase());
      const rColor   = pos<=3 ? medals[pos-1] : 'var(--text3)';
      const hRank    = getRank(h.level||1);
      const initials = (h.hunterName||'??').slice(0,2).toUpperCase();
      const ago      = h.updatedAt ? _timeAgo(h.updatedAt) : null;

      return `
        <div style="
          display:flex;align-items:center;gap:10px;
          padding:10px 12px;margin-bottom:6px;
          background:${isMe?'rgba(0,180,255,0.08)':isFriend?'rgba(240,192,64,0.05)':'var(--panel)'};
          border:1px solid ${isMe?'var(--accent)':isFriend?'rgba(240,192,64,0.3)':'var(--border)'};
          border-radius:6px;
        ">
          <div style="font-family:var(--font-hud);font-size:15px;color:${rColor};width:28px;text-align:center;flex-shrink:0">
            ${pos<=3?icons[pos-1]:'#'+pos}
          </div>
          <div style="
            width:32px;height:32px;border-radius:6px;flex-shrink:0;
            background:linear-gradient(135deg,var(--accent2),var(--accent));
            display:flex;align-items:center;justify-content:center;
            font-family:var(--font-hud);font-size:11px;color:#fff;
          ">${initials}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:${isMe?'var(--accent)':'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${(h.hunterName||'HUNTER').toUpperCase()}${isMe?' (YOU)':''}${isFriend&&!isMe?' 🤝':''}
            </div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">
              ${hRank.name} · LV ${h.level||1}${h.class?' · '+h.class.toUpperCase():''}
            </div>
            ${ago ? `<div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);opacity:0.6">Updated ${ago}</div>` : ''}
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold)">${(h.totalXP||0).toLocaleString()}</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">XP</div>
            ${h.streak ? `<div style="font-family:var(--font-mono);font-size:8px;color:var(--red)">🔥${h.streak}</div>` : ''}
          </div>
        </div>
      `;
    }).join('')}

    <!-- REMOVE FRIENDS -->
    ${friends.length > 0 ? `
      <div style="margin-top:8px;padding:10px;background:var(--panel);border:1px solid var(--border);border-radius:6px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:6px">MANAGE PARTNERS</div>
        ${friends.map((f,i) => `
          <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">
            <div style="flex:1;font-size:12px;color:var(--text2)">${f}</div>
            <button onclick="removeFriendFromGuild(${i})"
              style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer;padding:2px 6px">×</button>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// ── STAT CODE ACTIONS ─────────────────────────────────
function copyStatCode() {
  const code = generateStatCode();
  navigator.clipboard?.writeText(code).then(() => {
    showNotif('[ GUILD ] Stat code copied — send it to your friend!', 'gold');
  }).catch(() => {
    // Fallback for browsers without clipboard API
    prompt('Copy your stat code:', code);
  });
}

function addFriendStatCode() {
  const input    = document.getElementById('friend-code-input');
  const statusEl = document.getElementById('friend-code-status');
  const raw      = input?.value.trim();
  if (!raw) return;

  const payload = parseStatCode(raw);
  if (!payload) {
    if (statusEl) { statusEl.textContent = '[ ERROR ] Invalid code — must start with BL1:'; statusEl.style.color = 'var(--red)'; }
    return;
  }

  // Check code is not too old (7 days)
  const ageMs = Date.now() - (payload.t || 0);
  const ageDays = ageMs / 86400000;
  if (ageDays > 7) {
    if (statusEl) { statusEl.textContent = `[ WARNING ] Code is ${Math.floor(ageDays)} days old — ask for a fresh one`; statusEl.style.color = 'var(--gold)'; }
  }

  // Add to guild scores
  const scores = getGuildScores();
  const name   = (payload.n || 'FRIEND').toUpperCase();
  scores[name.toLowerCase()] = {
    hunterName:  name,
    level:       payload.l || 1,
    totalXP:     payload.x || 0,
    hunterRankName: payload.r || 'E-RANK HUNTER',
    class:       payload.c || 'fighter',
    questsDone:  payload.q || 0,
    streak:      payload.s || 0,
    updatedAt:   payload.t || Date.now(),
    isFriendEntry: true,
  };
  localStorage.setItem('bl_guild', JSON.stringify(scores));

  // Also add to friends list in settings
  const s = typeof getSettings === 'function' ? getSettings() : {};
  const friends = s.friends || [];
  if (!friends.map(f=>f.toLowerCase()).includes(name.toLowerCase())) {
    friends.push(name);
    if (typeof saveSettings === 'function') saveSettings({ friends });
  }

  if (statusEl) { statusEl.textContent = `✓ ${name} added with LV ${payload.l} · ${(payload.x||0).toLocaleString()} XP`; statusEl.style.color = 'var(--green)'; }
  if (input) input.value = '';
  showNotif(`[ GUILD ] ${name} added to leaderboard!`, 'gold');
  setTimeout(() => renderGuildPage(), 300);
}

function removeFriendFromGuild(i) {
  const s = typeof getSettings === 'function' ? getSettings() : {};
  const friends = [...(s.friends||[])];
  const removed = friends.splice(i, 1)[0];
  if (typeof saveSettings === 'function') saveSettings({ friends });
  // Also remove from guild scores
  if (removed) {
    const scores = getGuildScores();
    delete scores[removed.toLowerCase()];
    localStorage.setItem('bl_guild', JSON.stringify(scores));
  }
  renderGuildPage();
}

// ── GUILD SCORE UPDATE ────────────────────────────────
function updateGuildScore() {
  if (!HUNTER) return;
  const s    = typeof getSettings === 'function' ? getSettings() : {};
  const name = (s.hunterName || HUNTER.name || 'HUNTER').toUpperCase();
  const scores = getGuildScores();
  scores[name.toLowerCase()] = {
    hunterName:     name,
    level:          HUNTER.level || 1,
    totalXP:        HUNTER.totalXPEarned || 0,
    hunterRankName: getRank(HUNTER.level||1).name,
    class:          HUNTER.class || 'fighter',
    questsDone:     HUNTER.questsCompleted || 0,
    streak:         HUNTER.streakDays || 0,
    updatedAt:      Date.now(),
  };
  localStorage.setItem('bl_guild', JSON.stringify(scores));
}

function getGuildScores() {
  try {
    return JSON.parse(localStorage.getItem('bl_guild') || localStorage.getItem('sys_guild') || '{}');
  } catch { return {}; }
}

// ── TIME AGO HELPER ───────────────────────────────────
function _timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
