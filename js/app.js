// ============================================
// SYSTEM — APP BOOTSTRAP v3
// ============================================

(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function createParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.2+0.3,
        vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
        alpha: Math.random()*0.4+0.1, blue: Math.random()>0.7 });
    }
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(15,48,96,0.25)'; ctx.lineWidth=0.5;
    const sp=60;
    for(let x=0;x<W;x+=sp){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=sp){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.blue?`rgba(0,180,255,${p.alpha})`:`rgba(100,160,220,${p.alpha*0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize',()=>{resize();createParticles();});
  resize(); createParticles(); draw();
})();

// Extended showPage to handle all pages
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  const pageEl = document.getElementById('page-' + name);
  if (pageEl) pageEl.classList.add('active');
  if (btn) btn.classList.add('active');

  // Pages in MORE menu — keep MORE button highlighted when on them
  const morePages = ['boss','skills','army','inventory','guild','status','shop','converter','settings'];
  if (morePages.includes(name)) {
    const moreBtn = document.getElementById('nav-more-btn');
    if (moreBtn) moreBtn.classList.add('active');
  }

  if (name === 'quests')    renderQuestsPage();
  if (name === 'nutrition') renderNutritionPage();
  if (name === 'workout')   renderWorkoutPage();
  if (name === 'status')    { renderStatusPage(); if (typeof renderAdminPanel === 'function') renderAdminPanel(); }
  if (name === 'boss')      renderBossPage();
  if (name === 'skills')    renderSkillTree();
  if (name === 'army')      renderShadowArmy();
  if (name === 'inventory') renderInventory();
  if (name === 'guild')     renderGuildPage();
  if (name === 'improve')   renderSelfImprovePage();
  if (name === 'settings')  renderSettingsPage();
  if (name === 'shop')      renderShopPage();
  if (name === 'converter') renderConverterPage();
}

// ── MORE MENU ─────────────────────────────────────────
const MORE_MENU_ITEMS = [
  { page:'boss',      icon:'⚔️',  label:'Raids',     desc:'Boss raids & dungeons',      color:'#ff3355' },
  { page:'skills',    icon:'🌟',  label:'Skills',    desc:'Skill tree & abilities',     color:'#f0c040' },
  { page:'army',      icon:'🌑',  label:'Army',      desc:'Shadow soldiers & missions', color:'#a855f7' },
  { page:'inventory', icon:'🎒',  label:'Inventory', desc:'Items & equipment',          color:'#60a5fa' },
  { page:'guild',     icon:'🏆',  label:'Guild',     desc:'Leaderboard & friends',      color:'#f0c040' },
  { page:'status',    icon:'👤',  label:'Status',    desc:'Stats & profile',            color:'#00e5a0' },
  { page:'shop',      icon:'🪙',  label:'Shop',      desc:'Spend gold, buy items',      color:'#f0c040' },
  { page:'converter', icon:'🔄',  label:'Units',     desc:'Metric/imperial converter',  color:'#00b4ff' },
  { page:'settings',  icon:'⚙️',  label:'Settings',  desc:'Preferences & data',         color:'#7aa0cc' },
];

function openMoreMenu() {
  document.getElementById('more-menu-overlay')?.remove();

  const ov = document.createElement('div');
  ov.id = 'more-menu-overlay';
  ov.style.cssText = [
    'position:fixed;inset:0;z-index:500',
    'background:rgba(4,12,24,0.96)',
    'display:flex;flex-direction:column',
    'padding:0 0 max(16px,env(safe-area-inset-bottom))',
    'animation:mmSlideUp 0.22s cubic-bezier(0.32,0.72,0,1)',
  ].join(';');

  const gold = typeof getGold === 'function' ? getGold() : 0;

  ov.innerHTML = `
    <style>@keyframes mmSlideUp{from{transform:translateY(100%)}to{transform:none}}</style>

    <!-- Header -->
    <div style="
      display:flex;align-items:center;justify-content:space-between;
      padding:16px 20px 12px;
      border-bottom:1px solid rgba(0,180,255,0.15);
      flex-shrink:0;
    ">
      <div>
        <div style="font-family:var(--font-hud);font-size:16px;color:var(--accent);letter-spacing:2px">HUNTER MENU</div>
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:2px">🪙 ${gold.toLocaleString()} gold</div>
      </div>
      <button onclick="closeMoreMenu()" style="
        width:36px;height:36px;border-radius:50%;
        background:rgba(255,255,255,0.06);border:1px solid var(--border);
        color:var(--text);font-size:18px;cursor:pointer;
        display:flex;align-items:center;justify-content:center;
      ">✕</button>
    </div>

    <!-- Grid -->
    <div style="
      flex:1;overflow-y:auto;
      display:grid;grid-template-columns:1fr 1fr 1fr;
      gap:10px;padding:14px 16px;
      -webkit-overflow-scrolling:touch;
    ">
      ${MORE_MENU_ITEMS.map(item => `
        <button onclick="closeMoreMenu();showPage('${item.page}',document.getElementById('nav-more-btn'))" style="
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:6px;padding:14px 8px;
          background:${item.color}0e;
          border:1px solid ${item.color}33;
          border-radius:12px;cursor:pointer;
          transition:border-color 0.15s,background 0.15s;
        "
        onmouseover="this.style.background='${item.color}22';this.style.borderColor='${item.color}77'"
        onmouseout="this.style.background='${item.color}0e';this.style.borderColor='${item.color}33'"
        >
          <div style="font-size:26px;line-height:1">${item.icon}</div>
          <div style="font-family:var(--font-hud);font-size:11px;color:var(--text);letter-spacing:1px">${item.label.toUpperCase()}</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3);text-align:center;line-height:1.4">${item.desc}</div>
        </button>
      `).join('')}
    </div>
  `;

  // Tap backdrop to close
  ov.addEventListener('click', e => { if (e.target === ov) closeMoreMenu(); });
  document.body.appendChild(ov);
}

function closeMoreMenu() {
  const ov = document.getElementById('more-menu-overlay');
  if (!ov) return;
  ov.style.animation = 'mmSlideDown 0.2s ease forwards';
  const s = document.createElement('style');
  s.textContent = '@keyframes mmSlideDown{to{transform:translateY(100%)}}';
  document.head.appendChild(s);
  setTimeout(() => ov.remove(), 200);
}

function launchApp(hunterData) {
  const hunter = loadHunter(hunterData);
  HUNTER = hunter;

  // Password gate already handled access — skip paywall check
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-screen').classList.remove('hidden');

  refreshHUD();
  initSettings();
  renderQuestsPage();
  checkShadowUnlocks();
  checkLoginStreakBonus();
  if (typeof checkAllAchievements === 'function') setTimeout(() => checkAllAchievements(), 2000);

  if (localStorage.getItem('sys_health_source')) {
    setTimeout(() => {
      setHealthConnected(localStorage.getItem('sys_health_source'));
      loadSimulatedHealthData();
    }, 1000);
  }

  // Awakening intro for new hunters
  const isNew = !localStorage.getItem('sys_awakened_' + hunter.name.toLowerCase());
  if (isNew) {
    setTimeout(() => playAwakeningIntro(hunter.name, () => {
      showSystemMessage([
        { text: 'WELCOME TO THE SYSTEM', color: 'var(--accent)', size: 13, delay: 0 },
        { text: hunter.name.toUpperCase(), color: 'var(--gold)', size: 28, delay: 600 },
        { text: 'YOUR JOURNEY BEGINS NOW', color: 'var(--text2)', size: 11, delay: 1400 },
      ]);
    }), 300);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  // Wire Enter key on password gate
  const gateInput = document.getElementById('gate-pass');
  if (gateInput) {
    gateInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleGateLogin();
    });
    // Auto-focus the password field
    setTimeout(() => gateInput.focus(), 400);
  }

  // Restore session if still valid (skip login screen)
  if (hasValidSession()) {
    launchApp(getHunterProfile());
    return;
  }

  // Check payment return from Stripe
  if (window._checkPaymentOnLoad) {
    window._checkPaymentOnLoad = false;
    setTimeout(() => checkPaymentStatus(), 1000);
  }
});
