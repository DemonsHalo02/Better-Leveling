// ============================================
// SYSTEM — AWAKENING INTRO (Story Mode)
// Plays on first login for new hunters
// ============================================

const AWAKENING_LINES = [
  { delay: 0,    text: "...",                                        color: "var(--text3)" },
  { delay: 1200, text: "CONNECTION ESTABLISHED",                    color: "var(--accent)" },
  { delay: 2600, text: "SCANNING BIOLOGICAL ENTITY...",             color: "var(--text2)" },
  { delay: 4000, text: "ANOMALY DETECTED",                          color: "var(--red)" },
  { delay: 5200, text: "INITIATING AWAKENING PROTOCOL",             color: "var(--gold)" },
  { delay: 6600, text: "YOU HAVE BEEN CHOSEN.",                     color: "var(--accent)" },
  { delay: 8000, text: "FROM THIS MOMENT FORWARD —",                color: "var(--text)" },
  { delay: 9200, text: "YOUR EVERY ACTION WILL BE MEASURED.",       color: "var(--text)" },
  { delay: 10400,text: "YOUR EVERY VICTORY WILL BE RECORDED.",      color: "var(--text)" },
  { delay: 11600,text: "YOUR WEAKNESS WILL NO LONGER BE TOLERATED.",color: "var(--red)" },
  { delay: 13000,text: "ARISE.",                                     color: "var(--gold)" },
  { delay: 14200,text: "HUNTER.",                                    color: "var(--gold)" },
];

function playAwakeningIntro(hunterName, onComplete) {
  // Only play once per hunter
  const key = 'sys_awakened_' + hunterName.toLowerCase();
  if (localStorage.getItem(key)) { onComplete(); return; }
  localStorage.setItem(key, '1');

  const overlay = document.createElement('div');
  overlay.id = 'awakening-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:#000;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:40px 24px;gap:0;
  `;

  // Glitch scanline
  const scan = document.createElement('div');
  scan.style.cssText = `
    position:absolute;inset:0;pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,180,255,0.03) 2px,rgba(0,180,255,0.03) 4px);
  `;
  overlay.appendChild(scan);

  // Text container
  const textBox = document.createElement('div');
  textBox.style.cssText = `
    width:100%;max-width:400px;display:flex;flex-direction:column;gap:18px;
    position:relative;z-index:2;
  `;
  overlay.appendChild(textBox);

  // Skip button
  const skipBtn = document.createElement('button');
  skipBtn.textContent = '[ SKIP ]';
  skipBtn.style.cssText = `
    position:absolute;bottom:40px;right:24px;
    background:transparent;border:1px solid var(--border);border-radius:4px;
    color:var(--text3);font-family:var(--font-mono);font-size:10px;
    letter-spacing:2px;padding:6px 12px;cursor:pointer;z-index:3;
  `;
  skipBtn.onclick = () => finishAwakening(overlay, hunterName, onComplete);
  overlay.appendChild(skipBtn);

  document.body.appendChild(overlay);

  // Animate lines
  AWAKENING_LINES.forEach(({ delay, text, color }) => {
    setTimeout(() => {
      if (!document.getElementById('awakening-overlay')) return;
      const line = document.createElement('div');
      line.style.cssText = `
        font-family:var(--font-mono);font-size:13px;letter-spacing:2px;
        color:${color};opacity:0;
        transition:opacity 0.6s;
        text-align:center;line-height:1.6;
      `;
      line.textContent = text;
      textBox.appendChild(line);
      setTimeout(() => line.style.opacity = '1', 50);

      // Scroll into view
      line.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, delay);
  });

  // Final flash + hunter name
  const totalDuration = AWAKENING_LINES[AWAKENING_LINES.length - 1].delay + 1800;
  setTimeout(() => {
    if (!document.getElementById('awakening-overlay')) return;

    // Flash white
    overlay.style.background = '#fff';
    setTimeout(() => {
      overlay.style.background = '#000';
      overlay.style.transition = 'background 0.3s';

      // Show hunter name big
      textBox.innerHTML = '';
      const nameEl = document.createElement('div');
      nameEl.style.cssText = `
        font-family:var(--font-hud);font-size:36px;font-weight:900;
        color:var(--accent);letter-spacing:6px;text-align:center;
        text-shadow:0 0 40px rgba(0,180,255,0.8);
        animation:pulse-name 1s ease infinite;
      `;
      nameEl.textContent = hunterName.toUpperCase();

      const style = document.createElement('style');
      style.textContent = `@keyframes pulse-name{0%,100%{opacity:1}50%{opacity:0.6}}`;
      document.head.appendChild(style);

      const subEl = document.createElement('div');
      subEl.style.cssText = `font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:4px;text-align:center;margin-top:8px`;
      subEl.textContent = 'HAS AWAKENED';

      textBox.appendChild(nameEl);
      textBox.appendChild(subEl);

      setTimeout(() => finishAwakening(overlay, hunterName, onComplete), 2400);
    }, 200);
  }, totalDuration);
}

function finishAwakening(overlay, hunterName, onComplete) {
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.8s';
  setTimeout(() => {
    overlay.remove();
    onComplete();
  }, 800);
}
