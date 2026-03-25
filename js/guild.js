// ============================================
// BETTER LEVELING — GUILD & NOTIFICATIONS
// ============================================

// ── CINEMATIC SYSTEM MESSAGE ──────────────────────────
function showSystemMessage(lines, onDone) {
  const ov = document.createElement('div');
  ov.style.cssText='position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;pointer-events:none;backdrop-filter:blur(4px)';
  lines.forEach(({text,color,size,delay})=>{
    const el=document.createElement('div');
    el.style.cssText=`font-family:var(--font-hud);font-size:${size||13}px;color:${color||'var(--accent)'};letter-spacing:${size>20?4:2}px;opacity:0;transition:opacity 0.5s;text-align:center;text-shadow:0 0 20px ${color||'rgba(0,180,255,0.5)'}88`;
    el.textContent=text; ov.appendChild(el);
    setTimeout(()=>el.style.opacity='1',delay||0);
  });
  document.body.appendChild(ov);
  const t=(lines[lines.length-1]?.delay||0)+2000;
  setTimeout(()=>{ov.style.opacity='0';ov.style.transition='opacity 0.6s';setTimeout(()=>{ov.remove();if(onDone)onDone();},600);},t);
}

// ── XP POP ────────────────────────────────────────────
function showXPPop(amount,x,y){
  const el=document.createElement('div');
  el.style.cssText=`position:fixed;left:${x}px;top:${y}px;font-family:var(--font-hud);font-size:16px;font-weight:700;color:var(--gold);pointer-events:none;z-index:1000;text-shadow:0 0 10px rgba(240,192,64,0.6);animation:xp-pop 1.2s ease forwards`;
  el.textContent=`+${amount} XP`;
  if(!document.getElementById('xp-pop-style')){const s=document.createElement('style');s.id='xp-pop-style';s.textContent='@keyframes xp-pop{0%{opacity:1;transform:translateY(0) scale(1)}60%{opacity:1;transform:translateY(-40px) scale(1.2)}100%{opacity:0;transform:translateY(-70px) scale(0.8)}}';document.head.appendChild(s);}
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1200);
}

document.addEventListener('click',e=>{
  const card=e.target.closest('.quest-card:not(.quest-done)');
  if(card) showXPPop(Math.round(20+Math.random()*30),e.clientX-20,e.clientY-30);
});

// ── GUILD LEADERBOARD ─────────────────────────────────
function renderGuildPage() {
  const el = document.getElementById('page-guild');
  if (!el) return;

  // Always update own score first
  updateGuildScore();

  const s       = typeof getSettings === 'function' ? getSettings() : {};
  const myName  = (s.hunterName || 'HUNTER').toUpperCase();
  const friends = (s.friends || []).map(f => f.toUpperCase());
  const scores  = getGuildScores();

  // Merge in friend placeholder entries if not present
  friends.forEach(f => {
    if (!scores[f.toLowerCase()]) {
      scores[f.toLowerCase()] = { hunterName: f, level: 1, totalXP: 0, hunterRankName: 'E-RANK HUNTER', class: 'fighter', isFriend: true };
    }
  });

  const sorted = Object.entries(scores)
    .map(([key, d]) => ({ key, ...d }))
    .sort((a,b) => (b.totalXP||0) - (a.totalXP||0));

  const myPos = sorted.findIndex(h => (h.hunterName||'').toUpperCase() === myName) + 1;
  const medalColor = ['#f0c040','#c0c0c0','#cd7f32'];
  const medalIcon  = ['👑','🥈','🥉'];

  el.innerHTML = `
    <div class="section-head">BETTER LEVELING GUILD</div>

    <!-- My rank card -->
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="font-family:var(--font-hud);font-size:40px;color:${myPos<=3?medalColor[myPos-1]:'var(--accent)'};line-height:1">#${myPos||'—'}</div>
        <div>
          <div style="font-family:var(--font-hud);font-size:16px;color:var(--text);letter-spacing:1px">${myName}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:3px">LV ${HUNTER?.level||1} · ${getRank(HUNTER?.level||1).name}</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--gold);margin-top:2px">${(HUNTER?.totalXPEarned||0).toLocaleString()} XP</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${sorted.length} HUNTERS</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${friends.length} PARTNERS</div>
        </div>
      </div>
    </div>

    <div class="section-head">LEADERBOARD</div>

    ${sorted.length === 0 ? `
      <div style="text-align:center;padding:30px;color:var(--text3);font-family:var(--font-mono);font-size:11px;line-height:2">
        NO HUNTERS YET<br>
        Start earning XP to appear here.<br>
        Add friends in Settings to compare progress.
      </div>
    ` : sorted.slice(0,25).map((h,i) => {
      const pos    = i + 1;
      const isMe   = (h.hunterName||'').toUpperCase() === myName;
      const isFriend = friends.includes((h.hunterName||'').toUpperCase());
      const rColor = pos<=3 ? medalColor[pos-1] : 'var(--text3)';
      const hRank  = getRank(h.level||1);
      const initials = (h.hunterName||'??').slice(0,2).toUpperCase();

      return `
        <div style="
          display:flex;align-items:center;gap:10px;
          padding:10px 12px;margin-bottom:6px;
          background:${isMe?'rgba(0,180,255,0.08)':isFriend?'rgba(240,192,64,0.05)':'var(--panel)'};
          border:1px solid ${isMe?'var(--accent)':isFriend?'rgba(240,192,64,0.3)':'var(--border)'};
          border-radius:6px;
        ">
          <div style="font-family:var(--font-hud);font-size:15px;color:${rColor};width:28px;text-align:center;flex-shrink:0">
            ${pos<=3?medalIcon[pos-1]:'#'+pos}
          </div>
          <div style="
            width:30px;height:30px;border-radius:6px;flex-shrink:0;
            background:linear-gradient(135deg,var(--accent2),var(--accent));
            display:flex;align-items:center;justify-content:center;
            font-family:var(--font-hud);font-size:10px;color:#fff;
          ">${initials}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:${isMe?'var(--accent)':'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${(h.hunterName||'HUNTER').toUpperCase()}
              ${isMe?' (YOU)':''}
              ${isFriend&&!isMe?' 🤝':''}
            </div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">
              ${hRank.name} · LV ${h.level||1}${h.class?' · '+h.class.toUpperCase():''}
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-family:var(--font-hud);font-size:13px;color:var(--gold)">${(h.totalXP||0).toLocaleString()}</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">XP</div>
          </div>
        </div>
      `;
    }).join('')}

    <div style="margin-top:10px;padding:10px;background:rgba(0,180,255,0.04);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:4px">ℹ LEADERBOARD</div>
      <div style="font-size:11px;color:var(--text3);line-height:1.6">
        Add friends in <strong style="color:var(--accent)">Settings → Accountability Partners</strong>.
        Leaderboard updates every time you earn XP.
      </div>
    </div>
  `;
}

function updateGuildScore() {
  if (!HUNTER) return;
  const s = typeof getSettings === 'function' ? getSettings() : {};
  const name = (s.hunterName || HUNTER.name || 'HUNTER').toUpperCase();
  const scores = getGuildScores();
  scores[name.toLowerCase()] = {
    hunterName:     name,
    level:          HUNTER.level,
    totalXP:        HUNTER.totalXPEarned || 0,
    hunterRankName: getRank(HUNTER.level).name,
    class:          HUNTER.class || 'fighter',
    questsDone:     HUNTER.questsCompleted || 0,
    streak:         HUNTER.streakDays || 0,
  };
  localStorage.setItem('bl_guild', JSON.stringify(scores));
}

function getGuildScores() {
  try {
    // Try new key first, fall back to old
    return JSON.parse(localStorage.getItem('bl_guild') || localStorage.getItem('sys_guild') || '{}');
  } catch { return {}; }
}
