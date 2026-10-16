# Better Leveling ⚡

A minimalist, adherence-neutral nutrition and calisthenics application inspired by the design and algorithmic rigor of **MacroFactor**.

Better Leveling combines **precision metabolic tracking** (dynamic energy expenditure calculation, exponential smoothed weight trending, barcode scanning via OpenFoodFacts, and macro dials) with a **structured 6-day silent, mat-only calisthenics program** across **4 progressive intensities** (Beginner, Intermediate, Advanced, Expert). It features **cross-device synchronization** powered by **Supabase PostgreSQL & Auth** and is optimized for **100% free hosting on Cloudflare Pages**.

---

## 🌟 Key Features

### 1. MacroFactor-Inspired Nutrition Engine
- **Adherence-Neutral Philosophy**: Pure data-driven metabolic tracking without judgmental red alerts.
- **Dynamic Energy Expenditure (TDEE)**: Automatically computes your true metabolic burn rate based on caloric intake vs. physiological body mass delta.
- **Exponential Moving Average (EMA) Weight Smoothing**: Eliminates deceptive daily water, sodium, and digestion swings with a dual-line visualizer (Raw vs. Smoothed Trend).
- **Barcode Scanner**: Built-in camera barcode scanner integrated with the **OpenFoodFacts REST API** (3,000,000+ products).
- **Fast Food Logging**: 3-second **Quick Add** for macros + verified offline staple food library + custom food creator.
- **Signature Macro Dials**: Real-time targets and remaining grams for **Calories (Amber)**, **Protein (Cyan)**, **Carbs (Mint)**, and **Fat (Purple)**.

### 2. 6-Day Apartment-Safe Mat Calisthenics (Mon – Sat + Sun Recovery)
- **Zero Equipment**: Strictly bodyweight and an exercise mat (no pull-up bars, no dip stations, no bands, no dumbbells needed).
- **100% Apartment-Safe & Silent**: **Strictly NO jumping, no stomping, and zero impact on downstairs neighbors**.
- **4 Progressive Intensity Tiers**:
  1. **Tier 1 (Beginner)**: Joint prep, knee pushup eccentrics, prone cobra holds, tempo squats, deadbugs.
  2. **Tier 2 (Intermediate)**: Full floor pushups, diamond pushups, prone Y-T-W raises, towel lat pulls, Bulgarian split squats, hollow body holds.
  3. **Tier 3 (Advanced)**: Archer pushups, pseudo-planche pushups, elevated pike presses, cossack squats, skater squats, floor L-sit tucks, Dragon flags.
  4. **Tier 4 (Expert)**: Freestanding handstand pushup negatives, strict floor L-sits, full pistol squats, shrimp/dragon squats, sissy squats, strict Dragon flag negatives.
- **Interactive Workout Logger**: Set-by-set tracker with target/actual reps, weight/resistance inputs, and an **automated rest timer with synthesized Web Audio chimes**.

### 3. Multi-Device Cloud Syncing (Supabase)
- **Hybrid Local-First Architecture**: Logs to local storage instantly (0ms latency, works 100% offline).
- **Background Synchronization**: Pushes local updates and pulls remote changes across your phone, tablet, and computer.
- **Row-Level Security (RLS)**: PostgreSQL policies guarantee complete data privacy.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 🗄️ Setting Up Free Cross-Device Database (Supabase)

1. Create a free account at [Supabase.com](https://supabase.com).
2. Create a new project (e.g. `better-leveling`).
3. Open the **SQL Editor** tab in your Supabase dashboard.
4. Copy and paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
5. Go to **Project Settings** $\rightarrow$ **API**:
   - Copy **Project URL**
   - Copy **Project API Key (`anon` / `public`)**
6. In the **Better Leveling** app, go to **Settings** $\rightarrow$ **Supabase Cloud Database**, paste both values, and click **Save & Synchronize**.

*Note: The app functions 100% offline out-of-the-box even before connecting Supabase.*

---

## ☁️ Deploying to Cloudflare Pages for Free

Better Leveling is pre-configured with Cloudflare SPA client-side routing (`_redirects`) and camera security headers (`_headers`).

### Option A: Via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Better Leveling v1.0"
   git remote add origin https://github.com/<your-username>/better-leveling.git
   git branch -M main
   git push -u origin main
   ```
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Select your repository `better-leveling`.
4. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Your app will be live globally on a free `*.pages.dev` domain with free SSL!

### Option B: Direct Deploy via Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name=better-leveling
```

---

## 🧪 Automated Test Suite

Run the comprehensive test suite verifying algorithms, calisthenics routines, apartment safety, and food data:

```bash
npx tsx tests/verify-app.ts
```
*(All 599 automated assertions pass with 100% success).*

---

## 📐 Technology Stack
- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS
- **State & Local Persistence**: Zustand with persist middleware
- **Database & Auth**: Supabase (PostgreSQL with Row-Level Security)
- **Scanning**: HTML5 QR Code & Barcode Detector + OpenFoodFacts REST API
- **Audio**: Web Audio API (zero external audio file dependencies)
- **Hosting**: Cloudflare Pages Edge CDN
