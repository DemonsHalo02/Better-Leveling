// ============================================
// SYSTEM — SETTINGS MODULE (Manual Only Version)
// ============================================

const Settings = (() => {
  const defaults = {
    darkMode: false,
    notifications: true,
    macroSpeed: 50,
  };

  let settings = { ...defaults };

  const settingsContainer = document.getElementById("page-settings");

  // =============================
  // Load Settings from localStorage
  // =============================
  function load() {
    const saved = localStorage.getItem("hunterSettings");
    if (saved) {
      try {
        settings = { ...defaults, ...JSON.parse(saved) };
      } catch {
        settings = { ...defaults };
      }
    }
    updateUI();
  }

  // =============================
  // Save Settings to localStorage
  // =============================
  function save() {
    localStorage.setItem("hunterSettings", JSON.stringify(settings));
  }

  // =============================
  // Update UI Inputs
  // =============================
  function updateUI() {
    document.getElementById("setting-darkMode").checked = settings.darkMode;
    document.getElementById("setting-notifications").checked = settings.notifications;
    document.getElementById("setting-macroSpeed").value = settings.macroSpeed;
    document.getElementById("macroSpeedValue").textContent = settings.macroSpeed;

    applyDarkMode(settings.darkMode);
  }

  // =============================
  // Apply Dark Mode
  // =============================
  function applyDarkMode(enabled) {
    document.body.style.background = enabled ? "#0a1e38" : "var(--bg)";
  }

  // =============================
  // Event Listeners
  // =============================
  function setupEventListeners() {
    document.getElementById("setting-darkMode").addEventListener("change", e => {
      settings.darkMode = e.target.checked;
      applyDarkMode(settings.darkMode);
      save();
    });

    document.getElementById("setting-notifications").addEventListener("change", e => {
      settings.notifications = e.target.checked;
      save();
    });

    document.getElementById("setting-macroSpeed").addEventListener("input", e => {
      settings.macroSpeed = parseInt(e.target.value, 10);
      document.getElementById("macroSpeedValue").textContent = settings.macroSpeed;
      save();
    });
  }

  // =============================
  // Initialize Settings Page
  // =============================
  function init() {
    if (!settingsContainer) return;

    // Inject styled HUD HTML WITHOUT Auto-Sync Health
    settingsContainer.innerHTML = `
      <div class="sys-card">
        <div class="section-head">App Settings</div>

        <div class="field-group">
          <label class="setting-label">Dark Mode</label>
          <label class="pill-accent">
            <input type="checkbox" id="setting-darkMode" style="margin-right:6px;">
            Toggle
          </label>
        </div>

        <div class="field-group">
          <label class="setting-label">Enable Notifications</label>
          <label class="pill-green">
            <input type="checkbox" id="setting-notifications" style="margin-right:6px;">
            Toggle
          </label>
        </div>

        <div class="field-group">
          <label class="setting-label">Macro Speed: <span id="macroSpeedValue">${settings.macroSpeed}</span></label>
          <input class="sys-input" type="range" min="1" max="100" id="setting-macroSpeed" value="${settings.macroSpeed}">
        </div>

        <div class="field-group">
          <button class="btn-primary" onclick="Settings.load()">Reset to Saved</button>
        </div>
      </div>
    `;

    setupEventListeners();
    load();
  }

  return { init, load, save, settings };
})();

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  Settings.init();
});
