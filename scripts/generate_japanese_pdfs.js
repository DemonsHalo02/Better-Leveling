const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const cuttingSrc = path.join(publicDir, 'Korean_Meal_Plan_Under_50.html');
const bulkingSrc = path.join(publicDir, 'Korean_Bulking_Meal_Plan_Under_50.html');

// Helper to get Japanese Samurai Workout HTML
function getSamuraiWorkoutHtml() {
  return `<h2>💪 Japanese Samurai Home Bodyweight Dojo Workout Plan (No Equipment • Silent • Apartment-Friendly)</h2>
    <p style="font-size: 13px; color: var(--muted); margin-top: -10px; margin-bottom: 20px;">
      Zero impact, zero floor noise, apartment-friendly bodyweight routines designed for lean muscle definition, tight waist carving, and high calorie burn without disturbing neighbors. Pair every session with your mandatory 45-minute dual cardio protocol (30-minute brisk walk + 15-minute conditioning run).
    </p>

    <!-- Sunday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Sunday: System Restoration / Japanese Samurai Yoga & Active Recovery Flow (Rest Day)</div>
        <div class="workout-day-badge">300 XP • Active Recovery</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">Sunday is your official System Restoration & Active Recovery Day! Focus on gentle Japanese mobility flows, deep stretching, and mindful breathing inside your quiet apartment to prepare your body for Monday's grocery run, Japanese Teriyaki meal prep, and Upper Body training.</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Japanese Samurai Mobility Flow: Cat-Cow to Downward Dog & Child's Pose</span>
            <span class="exercise-reps">15 mins (slow flow)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Alternate between Cat and Cow for 10 slow breaths, then push hips up into Downward Dog holding 30 seconds. Transition gently into Child's Pose to decompress the lumbar spine.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Deep Hip Flexor, Hamstring & Shoulder Opener Sequence</span>
            <span class="exercise-reps">15 mins (hold 30-60 sec each)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Hold each stretch for 30-60 seconds: pigeon pose for hips, seated forward fold for hamstrings, doorway chest stretches for anterior shoulder flexibility.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Mindful Zen Breathing & Meditation</span>
            <span class="exercise-reps">10 mins (4-4-6 pacing)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Inhale deeply through nose for 4 counts, hold for 4 counts, exhale slowly for 6 counts. Promotes cortisol reduction and mental clarity.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Complete your daily 7-day cardio protocol: start with a steady 30-minute brisk fat-burning walk, followed immediately by a focused 15-minute conditioning run!</div>
        </li>
      </ul>
    </div>

    <!-- Monday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Monday: Push A (Japanese Samurai Upper Body Sculpt: Chest, Shoulders, Triceps) + Monday Grocery & Teriyaki Prep</div>
        <div class="workout-day-badge">500 XP • Upper Body & Prep</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">Fuel up at 8:00 AM with Jade Leaf Matcha Latte (whisked with Soy Milk) & Banana right before your morning bodyweight workout & cardio! Carve out chest thickness, broad shoulders, and defined triceps using 100% silent, equipment-free bodyweight exercises. After training, hit Auburn ME Walmart for your weekly Japanese Teriyaki groceries ($50 budget limit) and complete your batch prep!</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Standard Bodyweight Push-Ups [Chest & Tricep Compound]</span>
            <span class="exercise-reps">4 sets × 12-15 reps (2s negative)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Hands shoulder-width apart, body in straight line. Lower chest to floor with a controlled 2-second negative, pause slightly, then press up explosively.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Wide-Grip Push-Ups [Outer Chest & Broad Shoulder Frame]</span>
            <span class="exercise-reps">3 sets × 10-12 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Place hands wider than shoulder-width. Shifts tension directly to outer pectoral fibers and anterior deltoids for that broad warrior V-taper.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Pike Push-Ups [Overhead Shoulder Press Alternative]</span>
            <span class="exercise-reps">4 sets × 8-10 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Start in downward dog position with hips high in air. Bend elbows to lower top of head toward floor between hands, then press back up.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Chair/Couch Tricep Dips [Tricep Horseshoe Definition]</span>
            <span class="exercise-reps">4 sets × 12-15 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Place palms firmly on edge of sturdy chair/couch behind you. Extend legs forward, lower hips vertically to 90 degrees, and press to lockout.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Diamond Push-Ups [Inner Chest & Tricep Burnout]</span>
            <span class="exercise-reps">3 sets × 8-10 reps (to failure)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Place index fingers and thumbs together under center chest forming a diamond. Lower chest to hands and press up. Ultimate finishing movement.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">6. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lock in your Monday cardio volume immediately after upper body training: 30 minutes brisk walking plus 15 minutes running!</div>
        </li>
      </ul>
    </div>

    <!-- Tuesday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Tuesday: Pull A (Japanese Samurai Back, Biceps & Forearms) - Start Eating Prepped Teriyaki Meals!</div>
        <div class="workout-day-badge">500 XP • Back, Biceps & Grip</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">First day of eating your prepped Pan or Oven Crispy Fried Japanese Teriyaki Chicken meals! Build back thickness, bicep peaks, and iron forearm grip strength using isometric towel rows, doorframe pulls, and scapular retractions.</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Isometric Doorframe / Towel Rows [Upper Back & Lats]</span>
            <span class="exercise-reps">4 sets × 12-15 reps / 30s hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Stand facing doorframe or wrap towel around door handle. Lean back, then pull chest to hands while driving elbows back and squeezing shoulder blades.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Prone Cobra Holds [Lower Back & Spinal Posture]</span>
            <span class="exercise-reps">4 sets × 45-60 sec hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lie face down on mat. Lift chest, head, and arms off floor while externally rotating hands (palms out/up) and squeezing glutes and lower back.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Doorframe / Towel Bicep Isometric Curls [Bicep Peak Volume]</span>
            <span class="exercise-reps">4 sets × 12 reps / 20s hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Grip doorframe/towel at waist height with underhand grip. Lean back slightly and curl body upward using solely bicep contraction. Hold 2s peak squeeze.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Scapular Retraction Squeezes [Rhomboids & Mid-Traps]</span>
            <span class="exercise-reps">3 sets × 15 reps (3s hold)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Stand tall with arms bent at 90 degrees out to sides. Drive elbows backward, pinching imaginary pencil between shoulder blades for 3 full seconds per rep.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Forearm Wall Press & Wrist Isometric Holds [Iron Grip]</span>
            <span class="exercise-reps">3 sets × 45 sec hold per side</span>
          </div>
          <div class="exercise-tip">Coach Tip: Place palms flat against wall at shoulder height applying firm pressure through fingertips and wrists to build dense, vascular forearm extensors.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">6. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Complete your Tuesday cardio session: 30 minutes of brisk walking followed by a 15-minute run to keep daily metabolism soaring!</div>
        </li>
      </ul>
    </div>

    <!-- Wednesday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Wednesday: Legs & Glutes (Japanese Samurai Lower Body Power & Tone)</div>
        <div class="workout-day-badge">550 XP • Lower Body Sculpt</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">Carve out powerful, toned quad sweeps, hamstrings, and glutes with 100% silent, apartment-friendly lower body resistance training. Zero impact, zero noise for neighbors underneath.</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Controlled Slow-Tempo Bodyweight Squats [Quad & Glute Compound]</span>
            <span class="exercise-reps">4 sets × 15-20 reps (3s down)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Stand with feet shoulder-width apart. Lower hips back and down over 3 slow seconds until thighs parallel floor. Pause at bottom, then drive through heels.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Alternating Reverse Lunges [Quad & Glute Isolation]</span>
            <span class="exercise-reps">4 sets × 12 reps per leg</span>
          </div>
          <div class="exercise-tip">Coach Tip: Step one foot backward softly, lowering back knee until hovering one inch above floor. Drive through front heel to step back up. Silent & gentle on knees.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Wall Sit Isometric Hold [Quad Endurance & Separation]</span>
            <span class="exercise-reps">3 sets × 60 sec hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Press back flat against wall and slide down until thighs parallel floor and knees at 90 degrees. Hold position with core braced for intense burn.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Glute Bridges [Glute Lift & Hamstrings]</span>
            <span class="exercise-reps">4 sets × 15 reps (squeeze 2s)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lie flat on back with knees bent. Drive hips vertically until body forms straight line from shoulders to knees. Squeeze glutes intensely for 2 seconds at peak.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Clamshells & Single-Leg Calf Raises [Hip Stabilizers & Calves]</span>
            <span class="exercise-reps">3 sets × 15 reps per side</span>
          </div>
          <div class="exercise-tip">Coach Tip: Alternate 15 clamshell repetitions lying on side with 15 controlled single-leg standing calf raises using wall for balance.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">6. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Post-leg day cardio: 30 minutes brisk walking promotes lower body circulation, followed by your 15-minute conditioning run!</div>
        </li>
      </ul>
    </div>

    <!-- Thursday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Thursday: Core & Oblique Carve (Japanese Samurai Midsection Armor)</div>
        <div class="workout-day-badge">500 XP • Core & Waist Carve</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">High-intensity core, waist carving, and deep abdominal stabilization session. Build a tight, defined midsection with bicycle crunches, Russian twists, side planks, and leg raises.</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Bicycle Crunches [Upper & Lower Ab Carve]</span>
            <span class="exercise-reps">4 sets × 20 total reps (10/side)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lie flat on back. Bring right elbow to meet left knee while extending right leg straight above floor. Rotate with control—focus on contraction over speed.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Russian Twists (Seated Torso Rotation) [Oblique Definition]</span>
            <span class="exercise-reps">3 sets × 20 twists (10/side)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Sit on mat with knees bent, lean torso back 45 degrees, lift feet slightly off floor. Rotate torso side to side touching fingertips beside hips.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Side Plank Hold [Lateral Core Armor & Waist Tightening]</span>
            <span class="exercise-reps">3 sets × 45 sec hold per side</span>
          </div>
          <div class="exercise-tip">Coach Tip: Support body on forearm and side of foot, keeping hips lifted high so body forms perfectly straight diagonal line to tighten waistline.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Lying Straight Leg Raises [Lower Abdominal Isolation]</span>
            <span class="exercise-reps">4 sets × 15 controlled reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lie flat on back with hands slightly under hips. Raise straight legs to 90-degree vertical position, then slowly lower until hovering 2 inches above floor.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Forearm Plank Hold [Deep Core Stability & Transverse Abdominis]</span>
            <span class="exercise-reps">3 sets × 60 sec hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Hold forearm plank position with elbows directly beneath shoulders. Squeeze glutes, draw belly button inward toward spine, and breathe steadily.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">6. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Finish your core training with 30 minutes of steady brisk walking plus your 15-minute run to keep overall weekly fat oxidation right on target!</div>
        </li>
      </ul>
    </div>

    <!-- Friday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Friday: Push B & Pull B Full Upper Body Hypertrophy + Weekly Nissin Raoh Ramen Reward!</div>
        <div class="workout-day-badge">600 XP • Upper Hypertrophy</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">Hit total upper body hypertrophy targeting chest, upper back, shoulders, and arms right before enjoying your weekly Friday or Saturday Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen reward treat meal!</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Decline Push-Ups (Feet on Couch/Chair) [Upper Chest Focus]</span>
            <span class="exercise-reps">4 sets × 12-15 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Elevate feet securely on couch edge/chair while hands flat on floor. Lower upper chest to floor and press up. Builds full clavicular chest shelf.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Prone Y-T-W Raises [Rear Delts & Upper Back Posture]</span>
            <span class="exercise-reps">3 sets × 12 reps each position</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lie face down. Raise arms in Y position (overhead diagonal), T position (out to sides), and W position (elbows bent pulling back). Squeeze rear deltoids/traps.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Close-Grip Push-Ups [Tricep Definition & Inner Pectorals]</span>
            <span class="exercise-reps">3 sets × 12 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Hands placed slightly narrower than shoulder-width with elbows tracking tightly against ribcage during descent. Maximizes tricep lockout power.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Doorframe Row to Bicep Hold Combo [Back & Arm Finisher]</span>
            <span class="exercise-reps">3 sets × 12 reps + 15s hold</span>
          </div>
          <div class="exercise-tip">Coach Tip: Perform 12 crisp doorframe rows immediately followed by holding top contracted position for 15 solid seconds to pump lats and biceps full of blood.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lock in your Friday cardio right before your evening Nissin Raoh Umami Japanese Ramen reward treat meal! You earned it through 100% adherence!</div>
        </li>
      </ul>
    </div>

    <!-- Saturday -->
    <div class="workout-day-card">
      <div class="workout-day-header">
        <div class="workout-day-title">Saturday: Athletic Conditioning & Total Body Samurai Challenge</div>
        <div class="workout-day-badge">600 XP • Conditioning & Tension</div>
      </div>
      <p style="font-size: 13px; color: #cbd5e1; margin-top: 0; margin-bottom: 12px;">Final active training day of the week! Combine full-body isometric tension, silent athletic conditioning movements, and core endurance to finish out the 7-day cycle with peak caloric burn and mental toughness.</p>
      <ul class="exercise-list">
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">1. Silent Fast Marching / High Knees [Conditioning & Hip Activation]</span>
            <span class="exercise-reps">3 sets × 60 seconds fast pace</span>
          </div>
          <div class="exercise-tip">Coach Tip: Drive knees up toward chest alternating quickly while placing balls of feet down with feather-light silence. Accelerates heart rate without floor impact.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">2. Bodyweight Squat to Calf Raise Combo [Lower Body Explosiveness]</span>
            <span class="exercise-reps">4 sets × 15 reps</span>
          </div>
          <div class="exercise-tip">Coach Tip: Perform deep controlled squat, and as you stand up, drive immediately up onto balls of feet into peak calf raise contraction. Smooth athletic flow.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">3. Plank Shoulder Taps [Core Anti-Rotation & Shoulder Endurance]</span>
            <span class="exercise-reps">3 sets × 20 total taps (10/side)</span>
          </div>
          <div class="exercise-tip">Coach Tip: Hold high push-up position. Lift right hand to tap left shoulder, then left hand to tap right shoulder. Keep hips completely locked and level.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">4. Isometric Push-Up Hold (Mid-Way Pause) [Total Body Tension]</span>
            <span class="exercise-reps">3 sets × 30-45 sec hold midway</span>
          </div>
          <div class="exercise-tip">Coach Tip: Lower halfway down into push-up until elbows at 90 degrees and hold position frozen. Squeeze chest, triceps, core, and glutes simultaneously.</div>
        </li>
        <li class="exercise-item">
          <div class="exercise-header">
            <span class="exercise-name">5. Daily Dual Cardio: 30-Minute Brisk Walk + 15-Minute Run [Cardio]</span>
            <span class="exercise-reps">45 mins total</span>
          </div>
          <div class="exercise-tip">Coach Tip: Finish out your Saturday with your 30-minute brisk walk and 15-minute conditioning run! Ready to reset and conquer Sunday active recovery tomorrow!</div>
        </li>
      </ul>
    </div>`;
}

function cleanAndTransform(html, isBulking) {
  // 1. Replace Workout Section First
  const workoutStartRegex = /<h2>💪 K-Pop Idol Home Bodyweight Dojo Workout Plan[^<]*<\/h2>[\s\S]*?(?=<h2>🛒 Section 1: Weekly Consumables)/;
  html = html.replace(workoutStartRegex, getSamuraiWorkoutHtml() + "\n\n    ");

  // 2. Add Soy Milk to Consumables Table right before Bananas if not already there
  const bananaItemRegex = /<div class="grocery-item">\s*<div class="checkbox"><\/div>\s*<div>\s*<div class="item-name">Fresh Bananas/;
  const soyMilkHtml = `<div class="grocery-item">
        <div class="checkbox"></div>
        <div>
          <div class="item-name">Great Value Original Soy Milk (64 fl oz carton)</div>
          <div class="item-price">$2.48 (64 fl oz carton ~8 servings)</div>
          <div class="item-note">Creamy plant milk for whisking your morning Jade Leaf Matcha Latte at 8:00 AM!</div>
        </div>
      </div>
      <div class="grocery-item">
        <div class="checkbox"></div>
        <div>
          <div class="item-name">Fresh Bananas`;
  if (!html.includes("Great Value Original Soy Milk")) {
    html = html.replace(bananaItemRegex, soyMilkHtml);
  }

  // 3. Restock Table specific item replacements
  html = html.replace(/Dunkin' Original Blend Medium Roast Ground Coffee \(12 oz bag\)/gi, "Jade Leaf Organic Matcha Green Tea Powder (1 oz pouch)");
  html = html.replace(/\$8\.98 \(12 oz bag ~25 servings\)/gi, "$8.98 (1 oz pouch ~28 servings)");
  html = html.replace(/Bibigo Korean BBQ Sauce & Marinade \/ Gochujang Glaze \(16\.9 oz bottle\)/gi, "Kikkoman Teriyaki Marinade & Sauce (10 fl oz bottle)");
  html = html.replace(/\$3\.48 \(16\.9 fl oz bottle\)/gi, "$2.98 (10 fl oz bottle)");
  html = html.replace(/Nasoya Authentic Korean Spicy Kimchi \(14 oz jar\)/gi, "Great Value Soy Sauce (15 fl oz bottle)");
  html = html.replace(/\$4\.48 \(14 oz jar ~14 servings\)/gi, "$1.48 (15 fl oz bottle)");
  html = html.replace(/Samyang Buldak Spicy Carbonara Chicken Ramen Noodles \(Single Pack\)/gi, "Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen (Single Pack)");

  // 4. Global replacements for meal notes, titles, and instructions
  html = html.replace(/Korea: Korean Gochujang Chicken & Regular Dunkin' Black Coffee/gi, isBulking ? "Japan Bulking: Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Jade Leaf Matcha Latte" : "Japan: Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Jade Leaf Matcha Latte");
  html = html.replace(/Korea: Gochujang Chicken & Regular Dunkin' Coffee/gi, isBulking ? "Japan Bulking: Japanese Teriyaki Chicken & Jade Leaf Matcha Latte" : "Japan: Japanese Teriyaki Chicken & Jade Leaf Matcha Latte");
  html = html.replace(/Korea: Gochujang/gi, "Japan: Teriyaki");
  html = html.replace(/Regular Dunkin' Iced Black Coffee & Banana/gi, "Jade Leaf Matcha Latte with Soy Milk & Banana");
  html = html.replace(/Regular Dunkin' Original Blend Iced Black Coffee \+ Banana/gi, "Jade Leaf Organic Matcha Latte with Soy Milk + Banana");
  html = html.replace(/Regular Dunkin' Black Coffee/gi, "Jade Leaf Matcha Latte with Soy Milk");
  html = html.replace(/Dunkin' Original Blend Medium Roast/gi, "Jade Leaf Organic Matcha Powder in Soy Milk");
  html = html.replace(/Dunkin' Coffee/gi, "Matcha Latte");
  html = html.replace(/1 Pre-Workout Regular Dunkin' Iced Black Coffee/gi, "1 Pre-Workout Jade Leaf Matcha Latte");
  html = html.replace(/Pre-Workout Fuel: Regular Dunkin' Black Coffee & Banana/gi, "Pre-Workout Fuel: Jade Leaf Matcha Latte with Soy Milk & Banana");

  html = html.replace(/Brew 2 tbsp Dunkin' Original Blend Medium Roast ground coffee with hot water, pour over ice \(optional: add 1 zero-cal sweetener packet for zero-calorie sweetness, or keep pure black\)\. Clean caffeine and focus! \(5 kcal, 0g p\)/gi, "Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk (optional: add 1 zero-cal sweetener packet for clean, zero-calorie sweetness). Clean, sustained L-theanine & caffeine energy for focus right before your morning resistance training & cardio run/walk! (90 kcal, 7g p, 10g c, 3.5g f)");
  html = html.replace(/Brew 2 tbsp Dunkin' Original Blend Medium Roast ground coffee with hot water, pour over ice \(optional: add 1 zero-cal sweetener packet or keep pure black\)\. Clean caffeine and focus!/gi, "Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk (optional: add 1 zero-cal sweetener packet). Clean sustained energy for focus right before training!");
  html = html.replace(/Brew 2 tbsp Dunkin' Original Blend Medium Roast ground coffee with hot water, pour over ice \(optional: add 1 zero-cal sweetener packet or keep pure black\)\. Clean caffeine and focus for bodyweight training!/gi, "Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk (optional: add 1 zero-cal sweetener packet). Clean sustained energy for focus right before training!");
  html = html.replace(/Brew 2 tbsp of Dunkin' Original Blend Medium Roast with 8 oz of hot water directly into a cup with ice, or batch cold-brew a pitcher overnight in your fridge\. Eat your banana alongside your coffee exactly at 8:00 AM before stepping onto your mat for your K-Pop bodyweight session!/gi, "Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk. Eat your banana alongside your matcha latte exactly at 8:00 AM before stepping onto your mat for your Japanese Samurai bodyweight session!");
  html = html.replace(/Brew 2 tbsp of Dunkin' Original Blend Medium Roast with 8 oz of hot water directly into a cup with ice, or batch cold-brew a pitcher overnight in your fridge\. Eat your banana alongside your coffee exactly at 8:00 AM before stepping onto your mat!/gi, "Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk. Eat your banana alongside your matcha latte exactly at 8:00 AM before stepping onto your mat for your Japanese Samurai bodyweight session!");

  html = html.replace(/5-Egg Korean Scallion Scramble \+ Rolled Oats \+ Kimchi \+ Tea/gi, "5-Egg Japanese Scallion Scramble + Rolled Oats + Tea");
  html = html.replace(/Korean Scallion & Egg White Scramble \+ Kimchi & Rice \+ Tea/gi, "Japanese Scallion & Egg White Scramble + Rice + Tea");
  html = html.replace(/1\/3 Cup Authentic Spicy Korean Kimchi/gi, "1 Cup Warmed Green Tea / Extra Scallion Garnish");
  html = html.replace(/Probiotic-rich fermented cabbage that aids digestion and adds zesty Korean flavor\./gi, "Clean, traditional Japanese green tea paired with fluffy white rice and scallion egg scramble.");
  html = html.replace(/Serve alongside 1 cup of warmed white rice and 1\/3 cup kimchi\./gi, "Serve alongside 1 cup of warmed white rice and fresh scallion garnish.");

  html = html.replace(/Healthy Crispy Fried Korean Gochujang \/ BBQ Chicken/gi, "Pan or Oven Crispy Fried Japanese Teriyaki Chicken");
  html = html.replace(/Healthy Crispy Fried Gochujang Chicken/gi, "Pan or Oven Crispy Fried Japanese Teriyaki Chicken");
  html = html.replace(/Korean Gochujang \/ BBQ Chicken/gi, "Japanese Teriyaki Chicken");
  html = html.replace(/Korean Gochujang \/ Bibigo Glaze/gi, "Japanese Kikkoman Teriyaki Glaze");
  html = html.replace(/Korean Gochujang glaze/gi, "Japanese Teriyaki glaze");
  html = html.replace(/Korean Glaze/gi, "Japanese Teriyaki Glaze");
  html = html.replace(/Gochujang glaze/gi, "Teriyaki glaze");
  html = html.replace(/Gochujang chicken/gi, "Teriyaki chicken");
  html = html.replace(/Gochujang bowls/gi, "Teriyaki bowls");
  html = html.replace(/Whisk low-cal Korean Glaze \(1\.5 tbsp Bibigo Korean BBQ sauce \/ soy sauce, 1 tsp sriracha, 1 zero-cal sweetener packet, 1\/4 tsp ginger, 1\/4 tsp garlic powder, and 1 tbsp water\)\./gi, "Whisk low-cal Japanese Glaze (1.5 tbsp Kikkoman Teriyaki Marinade & Sauce, 1 zero-cal sweetener packet, 1/4 tsp ginger, 1/4 tsp garlic powder, and 1 tbsp water).");

  html = html.replace(/Korean Casein Greek Yogurt Bowl/gi, "Japanese Casein Greek Yogurt Bowl");

  html = html.replace(/Samyang Buldak Spicy Carbonara Noodles/gi, "Nissin Raoh Umami Japanese Ramen Noodles");
  html = html.replace(/Samyang Buldak Spicy Carbonara Chicken Ramen Noodles/gi, "Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen Noodles");
  html = html.replace(/Samyang Buldak Carbonara Ramen/gi, "Nissin Raoh Umami Japanese Ramen");
  html = html.replace(/S-Rank Weekly Reward Treat: Samyang Buldak Spicy Carbonara Noodles/gi, "S-Rank Weekly Reward Treat: Nissin Raoh Umami Japanese Ramen");
  html = html.replace(/Boil noodles for 5 minutes in 600ml of water\. Drain all but 8 tablespoons of water\. Add the spicy liquid sauce packet and creamy carbonara powder packet\. Stir well over low heat for 30 seconds until rich and glossy\./gi, "Boil noodles for 4 minutes in 500ml of water. Add the savory umami soup base packet and stir until rich and aromatic!");
  html = html.replace(/Creamy, spicy carbonara ramen\./gi, "Rich, aromatic umami broth ramen with non-fried noodles.");

  html = html.replace(/K-Pop Idol Home Bodyweight Dojo Protocol/gi, "Japanese Samurai Home Bodyweight Dojo Protocol");
  html = html.replace(/K-Pop Idol Home Bodyweight Dojo/gi, "Japanese Samurai Home Bodyweight Dojo");
  html = html.replace(/K-Pop/gi, "Japanese Samurai");
  html = html.replace(/🇰🇷/g, "🇯🇵");
  html = html.replace(/Korean/gi, "Japanese");
  html = html.replace(/Korea/gi, "Japan");
  html = html.replace(/Gochujang/gi, "Teriyaki");
  html = html.replace(/Bibigo/gi, "Kikkoman");
  html = html.replace(/Dunkin/gi, "Matcha");
  html = html.replace(/Kimchi/gi, "Scallion Garnish");
  html = html.replace(/Samyang/gi, "Nissin Raoh");
  html = html.replace(/Buldak/gi, "Umami");
  html = html.replace(/Carbonara/gi, "Tonkotsu");

  // Fix up prices
  if (isBulking) {
    html = html.replace(/\$43\.76/g, "$49.34");
  } else {
    html = html.replace(/\$45\.38/g, "$50.96");
  }
  html = html.replace(/\$34\.76/g, "$26.80");

  return html;
}

function generateCuttingPdf() {
  let html = fs.readFileSync(cuttingSrc, 'utf8');
  html = cleanAndTransform(html, false);
  const destPath = path.join(publicDir, 'Japanese_Meal_Plan_Under_50.html');
  fs.writeFileSync(destPath, html, 'utf8');
  console.log("Successfully generated:", destPath);
}

function generateBulkingPdf() {
  let html = fs.readFileSync(bulkingSrc, 'utf8');
  html = cleanAndTransform(html, true);
  const destPath = path.join(publicDir, 'Japanese_Bulking_Meal_Plan_Under_50.html');
  fs.writeFileSync(destPath, html, 'utf8');
  console.log("Successfully generated:", destPath);
}

generateCuttingPdf();
generateBulkingPdf();
