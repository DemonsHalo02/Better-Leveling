// ============================================
// SYSTEM — ANIMATED NOTIFICATIONS & GUILD
// ============================================

// ===== CINEMATIC SYSTEM MESSAGE =====
// Used for dramatic moments (boss appearance, level up, etc.)
function showSystemMessage(lines, onDone) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:800;
    background:rgba(0,0,0,0.88);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:14px;padding:30px;pointer-events:none;
    backdrop-filter:blur(4px);
  `;

  lines.forEach(({ text, color, size, delay }) => {
    const el = document.createElement('div');
    el.style.cssText = `
      font-family:var(--font-hud);
      font-size:${size || 13}px;
      color:${color || 'var(--accent)'};
      letter-spacing:${size > 20 ? 4 : 2}px;
      opacity:0;
      transition:opacity 0.5s;
      text-align:center;
      text-shadow:${color ? `0 0 20px ${color}88` : '0 0 20px rgba(0,180,255,0.5)'};
    `;
    el.textContent = text;
    overlay.appendChild(el);
    setTimeout(() => el.style.opacity = '1', delay || 0);
  });

  document.body.appendChild(overlay);
  const totalTime = (lines[lines.length - 1]?.delay || 0) + 2000;
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.6s';
    setTimeout(() => { overlay.remove(); if (onDone) onDone(); }, 600);
  }, totalTime);
}

// ===== FLOATING XP POP =====
function showXPPop(amount, x, y) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;
    font-family:var(--font-hud);font-size:16px;font-weight:700;
    color:var(--gold);pointer-events:none;z-index:1000;
    text-shadow:0 0 10px rgba(240,192,64,0.6);
    animation:xp-pop 1.2s ease forwards;
  `;
  el.textContent = `+${amount} XP`;

  if (!document.getElementById('xp-pop-style')) {
    const style = document.createElement('style');
    style.id = 'xp-pop-style';
    style.textContent = `@keyframes xp-pop{0%{opacity:1;transform:translateY(0) scale(1)}60%{opacity:1;transform:translateY(-40px) scale(1.2)}100%{opacity:0;transform:translateY(-70px) scale(0.8)}}`;
    document.head.appendChild(style);
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// Intercept clicks to show XP pops on quest complete buttons
document.addEventListener('click', (e) => {
  const card = e.target.closest('.quest-card:not(.quest-done)');
  if (card) {
    showXPPop(Math.round(20 + Math.random() * 30), e.clientX - 20, e.clientY - 30);
  }
});

// ===== GUILD / LEADERBOARD =====
// Uses shared localStorage key so multiple accounts on the same device can compete
// In production: replace with a real backend (Firebase, Supabase, etc.)

function renderGuildPage() {
  const el = document.getElementById('page-guild');
  updateGuildScore();
  const allScores = getGuildScores();

  // Sort by score
  const sorted = Object.entries(allScores)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0));

  const myName = getCurrentUser();
  const myRank = sorted.findIndex(s => s.name === myName) + 1;

  const rankColors = ['#f0c040', '#c0c0c0', '#cd7f32'];
  const rankIcons  = ['👑', '🥈', '🥉'];

  let html = `
    <div class="section-head">HUNTER GUILD</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:14px;text-align:center">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:4px">YOUR GUILD RANK</div>
      <div style="font-family:var(--font-hud);font-size:36px;color:${myRank <= 3 ? rankColors[myRank-1] : 'var(--accent)'}">#${myRank}</div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">${sorted.length} HUNTERS REGISTERED</div>
    </div>

    <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:3px;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      LEADERBOARD <div style="flex:1;height:1px;background:var(--border)"></div>
    </div>
  `;

  if (sorted.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">NO HUNTERS REGISTERED<br><br>Create an account and earn XP<br>to appear on the leaderboard.</div>`;
  } else {
    sorted.slice(0, 20).forEach((hunter, i) => {
      const rank = i + 1;
      const isMe = hunter.name === myName;
      const rankColor = rank <= 3 ? rankColors[rank-1] : 'var(--text3)';
      const hunterRank = getRank(hunter.level || 1);

      html += `
        <div style="
          display:flex;align-items:center;gap:10px;
          padding:10px 12px;margin-bottom:6px;
          background:${isMe ? 'rgba(0,180,255,0.08)' : 'var(--panel)'};
          border:1px solid ${isMe ? 'var(--accent)' : 'var(--border)'};
          border-radius:6px;
        ">
          <div style="font-family:var(--font-hud);font-size:16px;color:${rankColor};width:28px;text-align:center;flex-shrink:0">
            ${rank <= 3 ? rankIcons[rank-1] : '#' + rank}
          </div>
          <div style="
            width:32px;height:32px;border-radius:6px;flex-shrink:0;
            background:linear-gradient(135deg,var(--accent2),var(--accent));
            display:flex;align-items:center;justify-content:center;
            font-family:var(--font-hud);font-size:11px;color:#fff;
            border:1px solid var(--accent);
          ">${hunter.name.slice(0,2).toUpperCase()}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:${isMe ? 'var(--accent)' : 'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${hunter.name.toUpperCase()}${isMe ? ' (YOU)' : ''}
            </div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">${hunterRank.name} · LV ${hunter.level || 1}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold)">${(hunter.totalXP || 0).toLocaleString()}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">XP</div>
          </div>
        </div>
      `;
    });
  }

  html += `
    <div style="margin-top:12px;padding:10px;background:rgba(0,180,255,0.05);border:1px solid rgba(0,180,255,0.2);border-radius:6px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:4px">MULTIPLAYER NOTE</div>
      <div style="font-size:11px;color:var(--text3);line-height:1.6">
        Currently shows hunters on this device. To compete with friends globally, deploy your app online (Netlify) and all accounts will share the same leaderboard automatically.
      </div>
    </div>
  `;

  el.innerHTML = html;
}

function updateGuildScore() {
  if (!HUNTER) return;
  const scores = getGuildScores();
  scores[getCurrentUser()] = {
    name: HUNTER.name,
    level: HUNTER.level,
    totalXP: HUNTER.totalXPEarned || 0,
    rank: getRank(HUNTER.level).name,
    class: HUNTER.class,
  };
  localStorage.setItem('sys_guild', JSON.stringify(scores));
}

function getGuildScores() {
  try { return JSON.parse(localStorage.getItem('sys_guild') || '{}'); }
  catch { return {}; }
}
