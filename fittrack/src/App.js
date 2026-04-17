import { useState, useEffect } from "react";

const DEMO_WORKOUTS = {
  Chest: {
    Beginner: [
      { name: "Push Ups", sets: 3, reps: "10-12", rest: 60, youtube: "push ups for beginners", tip: "Haath shoulder-width par rakho" },
      { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell chest press beginner", tip: "Elbows 45 degree angle" },
      { name: "Incline Push Ups", sets: 3, reps: "12-15", rest: 45, youtube: "incline push ups tutorial", tip: "Bench ya wall ka use karo" },
      { name: "Dumbbell Flyes", sets: 3, reps: "12", rest: 60, youtube: "dumbbell flyes beginner", tip: "Arms slightly bent" },
      { name: "Cable Crossover", sets: 3, reps: "12-15", rest: 60, youtube: "cable crossover chest", tip: "Chest squeeze end mein" },
    ],
    Intermediate: [
      { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bench press form", tip: "Feet flat on floor" },
      { name: "Incline Dumbbell Press", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell press", tip: "30-45 degree incline" },
      { name: "Chest Dips", sets: 3, reps: "10-12", rest: 75, youtube: "chest dips tutorial", tip: "Thoda aage jhuko" },
      { name: "Pec Deck Machine", sets: 3, reps: "12-15", rest: 60, youtube: "pec deck machine", tip: "Full range of motion" },
      { name: "Push Up Variations", sets: 3, reps: "15", rest: 60, youtube: "push up variations", tip: "Wide grip mix karo" },
    ],
    Advanced: [
      { name: "Heavy Barbell Bench", sets: 5, reps: "5-6", rest: 120, youtube: "heavy bench press", tip: "Spotter rakho" },
      { name: "Weighted Dips", sets: 4, reps: "8-10", rest: 90, youtube: "weighted dips chest", tip: "Belt se weight" },
      { name: "Decline Bench Press", sets: 4, reps: "8", rest: 90, youtube: "decline bench press", tip: "Lower chest focus" },
      { name: "Cable Flyes", sets: 4, reps: "12-15", rest: 60, youtube: "cable flyes chest", tip: "Slow eccentric" },
      { name: "Plyometric Push Ups", sets: 3, reps: "10", rest: 90, youtube: "plyometric push ups", tip: "Explosive power" },
    ],
  },
  Back: {
    Beginner: [
      { name: "Lat Pulldown", sets: 3, reps: "12", rest: 60, youtube: "lat pulldown beginner", tip: "Shoulder blades squeeze" },
      { name: "Seated Cable Row", sets: 3, reps: "12", rest: 60, youtube: "seated cable row", tip: "Back straight rakho" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row beginner", tip: "Elbow ceiling ki taraf" },
      { name: "Superman Exercise", sets: 3, reps: "15", rest: 45, youtube: "superman back exercise", tip: "Lower back strengthen" },
      { name: "Resistance Band Row", sets: 3, reps: "15", rest: 45, youtube: "resistance band row", tip: "Full stretch important" },
    ],
    Intermediate: [
      { name: "Pull Ups", sets: 4, reps: "8-10", rest: 90, youtube: "pull ups back", tip: "Dead hang se shuru" },
      { name: "Barbell Row", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bent over row", tip: "45 degree angle" },
      { name: "T-Bar Row", sets: 3, reps: "10", rest: 75, youtube: "t bar row", tip: "Chest pad lean karo" },
      { name: "Wide Grip Pulldown", sets: 3, reps: "12", rest: 60, youtube: "wide grip pulldown", tip: "V-taper banata hai" },
      { name: "Face Pulls", sets: 3, reps: "15", rest: 60, youtube: "face pulls", tip: "Rear delts target" },
    ],
    Advanced: [
      { name: "Weighted Pull Ups", sets: 5, reps: "6-8", rest: 120, youtube: "weighted pull ups", tip: "Progressive overload" },
      { name: "Deadlift", sets: 4, reps: "5", rest: 180, youtube: "deadlift form", tip: "King of exercises" },
      { name: "Meadows Row", sets: 4, reps: "8-10", rest: 90, youtube: "meadows row", tip: "Unilateral movement" },
      { name: "Straight Arm Pulldown", sets: 3, reps: "15", rest: 60, youtube: "straight arm pulldown", tip: "Lats isolate" },
      { name: "Rack Pulls", sets: 4, reps: "6", rest: 120, youtube: "rack pulls", tip: "Upper back thickness" },
    ],
  },
  Shoulders: {
    Beginner: [
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell shoulder press", tip: "Elbows 90 degree" },
      { name: "Lateral Raises", sets: 3, reps: "15", rest: 45, youtube: "lateral raises", tip: "Pour the jug motion" },
      { name: "Front Raises", sets: 3, reps: "12", rest: 45, youtube: "front raises", tip: "Shoulder height tak" },
      { name: "Arnold Press", sets: 3, reps: "12", rest: 60, youtube: "arnold press", tip: "Full shoulder coverage" },
      { name: "Rear Delt Flyes", sets: 3, reps: "15", rest: 45, youtube: "rear delt flyes", tip: "Elbows wide" },
    ],
    Intermediate: [
      { name: "Barbell Overhead Press", sets: 4, reps: "8-10", rest: 90, youtube: "overhead press", tip: "Core tight" },
      { name: "Cable Lateral Raises", sets: 4, reps: "15", rest: 60, youtube: "cable lateral raises", tip: "Constant tension" },
      { name: "Upright Row", sets: 3, reps: "12", rest: 60, youtube: "upright row", tip: "Wide grip" },
      { name: "Machine Shoulder Press", sets: 3, reps: "12", rest: 75, youtube: "machine shoulder press", tip: "Controlled movement" },
      { name: "Band Pull Aparts", sets: 3, reps: "20", rest: 45, youtube: "band pull aparts", tip: "Posture ke liye" },
    ],
    Advanced: [
      { name: "Push Press", sets: 5, reps: "5", rest: 120, youtube: "push press", tip: "Leg drive use karo" },
      { name: "Seated DB Press", sets: 4, reps: "10", rest: 90, youtube: "seated dumbbell press", tip: "No cheating" },
      { name: "Cable Y Raises", sets: 4, reps: "15", rest: 60, youtube: "cable y raise", tip: "All 3 heads" },
      { name: "Single Arm Cable Press", sets: 3, reps: "12 each", rest: 75, youtube: "single arm cable press", tip: "Core stability" },
      { name: "Face Pulls Heavy", sets: 4, reps: "12", rest: 60, youtube: "heavy face pulls", tip: "External rotation" },
    ],
  },
  Arms: {
    Beginner: [
      { name: "Dumbbell Bicep Curl", sets: 3, reps: "12", rest: 60, youtube: "bicep curl beginner", tip: "Swing mat karo" },
      { name: "Tricep Pushdown", sets: 3, reps: "12", rest: 60, youtube: "tricep pushdown", tip: "Full extension" },
      { name: "Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "hammer curl", tip: "Forearms bhi work" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: 60, youtube: "overhead tricep extension", tip: "Long head target" },
      { name: "Concentration Curl", sets: 3, reps: "12 each", rest: 45, youtube: "concentration curl", tip: "Slow controlled" },
    ],
    Intermediate: [
      { name: "Barbell Curl", sets: 4, reps: "10", rest: 75, youtube: "barbell curl", tip: "Full range" },
      { name: "Skull Crushers", sets: 4, reps: "10", rest: 75, youtube: "skull crushers", tip: "Not on forehead!" },
      { name: "Preacher Curl", sets: 3, reps: "12", rest: 60, youtube: "preacher curl", tip: "Pure isolation" },
      { name: "Close Grip Bench", sets: 3, reps: "10", rest: 90, youtube: "close grip bench", tip: "Triceps feel karo" },
      { name: "Cable Curl", sets: 3, reps: "15", rest: 60, youtube: "cable curl", tip: "Constant tension" },
    ],
    Advanced: [
      { name: "21s Bicep Curl", sets: 4, reps: "21", rest: 90, youtube: "21s bicep curl", tip: "7+7+7 pump" },
      { name: "Weighted Dips Tricep", sets: 4, reps: "8", rest: 90, youtube: "tricep dips weighted", tip: "Upright posture" },
      { name: "Incline DB Curl", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell curl", tip: "Full stretch" },
      { name: "French Press", sets: 4, reps: "10", rest: 75, youtube: "french press", tip: "EZ bar better" },
      { name: "Cable Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "cable hammer curl", tip: "Rope attachment" },
    ],
  },
  Legs: {
    Beginner: [
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: 60, youtube: "bodyweight squat", tip: "Chest up" },
      { name: "Leg Press", sets: 3, reps: "12", rest: 75, youtube: "leg press", tip: "Knees cave mat karo" },
      { name: "Lunges", sets: 3, reps: "10 each", rest: 60, youtube: "walking lunges", tip: "90 degree angle" },
      { name: "Leg Extension", sets: 3, reps: "15", rest: 45, youtube: "leg extension", tip: "Quad isolation" },
      { name: "Calf Raises", sets: 3, reps: "20", rest: 45, youtube: "calf raises", tip: "Top pe pause" },
    ],
    Intermediate: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", rest: 120, youtube: "barbell squat", tip: "Below parallel" },
      { name: "Romanian Deadlift", sets: 4, reps: "10", rest: 90, youtube: "romanian deadlift", tip: "Hamstring stretch" },
      { name: "Hack Squat", sets: 3, reps: "10", rest: 90, youtube: "hack squat", tip: "Quad dominant" },
      { name: "Leg Curl", sets: 3, reps: "12", rest: 60, youtube: "leg curl", tip: "Controlled negative" },
      { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: 75, youtube: "bulgarian split squat", tip: "Rear foot elevated" },
    ],
    Advanced: [
      { name: "Heavy Barbell Squat", sets: 5, reps: "5", rest: 180, youtube: "heavy squat", tip: "Belt use karo" },
      { name: "Stiff Leg Deadlift", sets: 4, reps: "8", rest: 120, youtube: "stiff leg deadlift", tip: "Max stretch" },
      { name: "Leg Press 1.5 Rep", sets: 4, reps: "10", rest: 90, youtube: "leg press 1.5 rep", tip: "TUT increase" },
      { name: "Walking Lunges Weighted", sets: 4, reps: "12 each", rest: 90, youtube: "weighted lunges", tip: "Dumbbells ya barbell" },
      { name: "Seated Calf Raises", sets: 5, reps: "12", rest: 60, youtube: "seated calf raise", tip: "Soleus target" },
    ],
  },
  Core: {
    Beginner: [
      { name: "Plank", sets: 3, reps: "30 sec", rest: 45, youtube: "plank form", tip: "Body straight" },
      { name: "Crunches", sets: 3, reps: "15", rest: 45, youtube: "crunches abs", tip: "Abs se uthao" },
      { name: "Leg Raises", sets: 3, reps: "12", rest: 45, youtube: "leg raises", tip: "Lower back press" },
      { name: "Mountain Climbers", sets: 3, reps: "20 each", rest: 45, youtube: "mountain climbers", tip: "Cardio + core" },
      { name: "Dead Bug", sets: 3, reps: "10 each", rest: 45, youtube: "dead bug core", tip: "Neutral spine" },
    ],
    Intermediate: [
      { name: "Hanging Knee Raises", sets: 4, reps: "15", rest: 60, youtube: "hanging knee raises", tip: "Swing control" },
      { name: "Cable Crunches", sets: 4, reps: "15", rest: 60, youtube: "cable crunches", tip: "Abs se crunch" },
      { name: "Ab Wheel Rollout", sets: 3, reps: "10", rest: 60, youtube: "ab wheel rollout", tip: "Knees se shuru" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: 45, youtube: "russian twists", tip: "Rotation important" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", rest: 45, youtube: "hollow body hold", tip: "Gymnastics move" },
    ],
    Advanced: [
      { name: "Dragon Flag", sets: 4, reps: "8", rest: 90, youtube: "dragon flag", tip: "Bruce Lee fav" },
      { name: "Toes to Bar", sets: 4, reps: "10", rest: 75, youtube: "toes to bar", tip: "Full hip flexion" },
      { name: "Pallof Press", sets: 3, reps: "12 each", rest: 60, youtube: "pallof press", tip: "Anti-rotation" },
      { name: "L-Sit Hold", sets: 3, reps: "20 sec", rest: 60, youtube: "l sit core", tip: "Straight legs" },
      { name: "Weighted Plank", sets: 3, reps: "45 sec", rest: 60, youtube: "weighted plank", tip: "Plate on back" },
    ],
  },
  "Full Body": {
    Beginner: [
      { name: "Goblet Squat", sets: 3, reps: "12", rest: 60, youtube: "goblet squat", tip: "Heels flat" },
      { name: "Push Ups", sets: 3, reps: "10", rest: 60, youtube: "push ups", tip: "Full body tension" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row", tip: "Elbow up" },
      { name: "Hip Thrust", sets: 3, reps: "15", rest: 60, youtube: "hip thrust", tip: "Glutes squeeze" },
      { name: "Farmer Walk", sets: 3, reps: "30 sec", rest: 60, youtube: "farmer walk", tip: "Grip strength" },
    ],
    Intermediate: [
      { name: "Deadlift", sets: 4, reps: "6-8", rest: 120, youtube: "deadlift", tip: "Most complete" },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "bench press", tip: "Leg drive" },
      { name: "Pull Ups", sets: 4, reps: "8", rest: 90, youtube: "pull ups", tip: "Dead hang start" },
      { name: "Overhead Press", sets: 3, reps: "10", rest: 90, youtube: "overhead press", tip: "Core brace" },
      { name: "Dumbbell Lunges", sets: 3, reps: "10 each", rest: 75, youtube: "dumbbell lunges", tip: "Controlled descent" },
    ],
    Advanced: [
      { name: "Power Clean", sets: 5, reps: "3", rest: 180, youtube: "power clean", tip: "Triple extension" },
      { name: "Squat", sets: 4, reps: "5", rest: 180, youtube: "squat heavy", tip: "360 brace" },
      { name: "Weighted Pull Ups", sets: 4, reps: "6", rest: 120, youtube: "weighted pull ups", tip: "Progressive overload" },
      { name: "Push Press", sets: 4, reps: "6", rest: 120, youtube: "push press", tip: "Hip drive" },
      { name: "KB Swing", sets: 4, reps: "15", rest: 90, youtube: "kettlebell swing", tip: "Hip hinge" },
    ],
  },
};

// ── INDIAN FOOD DATABASE ──────────────────────────────────────────────────────
const FOODS = [
  { name: "Dal (1 bowl)", cal: 150, protein: 9, carbs: 24, fat: 3 },
  { name: "Roti (1 piece)", cal: 80, protein: 3, carbs: 15, fat: 1 },
  { name: "Rice (1 bowl)", cal: 200, protein: 4, carbs: 44, fat: 0 },
  { name: "Paneer (100g)", cal: 265, protein: 18, carbs: 3, fat: 20 },
  { name: "Chicken (100g)", cal: 165, protein: 31, carbs: 0, fat: 4 },
  { name: "Egg (1 whole)", cal: 70, protein: 6, carbs: 0, fat: 5 },
  { name: "Egg White (1)", cal: 17, protein: 4, carbs: 0, fat: 0 },
  { name: "Milk (1 glass)", cal: 120, protein: 6, carbs: 12, fat: 5 },
  { name: "Curd (1 bowl)", cal: 100, protein: 5, carbs: 8, fat: 4 },
  { name: "Banana (1)", cal: 90, protein: 1, carbs: 23, fat: 0 },
  { name: "Apple (1)", cal: 80, protein: 0, carbs: 21, fat: 0 },
  { name: "Oats (1 bowl)", cal: 150, protein: 5, carbs: 27, fat: 3 },
  { name: "Whey Protein (1 scoop)", cal: 120, protein: 24, carbs: 3, fat: 1 },
  { name: "Peanut Butter (2 tbsp)", cal: 190, protein: 8, carbs: 7, fat: 16 },
  { name: "Almonds (10 pieces)", cal: 70, protein: 3, carbs: 2, fat: 6 },
  { name: "Sweet Potato (1)", cal: 130, protein: 2, carbs: 30, fat: 0 },
  { name: "Rajma (1 bowl)", cal: 180, protein: 13, carbs: 30, fat: 1 },
  { name: "Chhole (1 bowl)", cal: 170, protein: 10, carbs: 28, fat: 3 },
  { name: "Bread (2 slices)", cal: 160, protein: 5, carbs: 30, fat: 2 },
  { name: "Samosa (1)", cal: 260, protein: 4, carbs: 32, fat: 13 },
  { name: "Poha (1 bowl)", cal: 180, protein: 3, carbs: 36, fat: 3 },
  { name: "Paratha (1)", cal: 200, protein: 4, carbs: 30, fat: 7 },
  { name: "Sprouts (1 bowl)", cal: 80, protein: 7, carbs: 12, fat: 1 },
  { name: "Soya Chunks (50g)", cal: 180, protein: 26, carbs: 13, fat: 1 },
  { name: "Tuna (100g)", cal: 130, protein: 28, carbs: 0, fat: 1 },
  { name: "Greek Yogurt (1 bowl)", cal: 100, protein: 10, carbs: 6, fat: 3 },
  { name: "Banana Shake (1 glass)", cal: 280, protein: 8, carbs: 48, fat: 6 },
  { name: "Idli (2 pieces)", cal: 140, protein: 4, carbs: 28, fat: 1 },
  { name: "Dosa (1)", cal: 170, protein: 4, carbs: 30, fat: 4 },
  { name: "Mango (1 slice)", cal: 60, protein: 1, carbs: 15, fat: 0 },
];

const storage = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

const MUSCLES = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Full Body"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BODY_PARTS = [
  { key: "weight", label: "Weight", unit: "kg", icon: "⚖️" },
  { key: "chest", label: "Chest", unit: "cm", icon: "💪" },
  { key: "waist", label: "Waist", unit: "cm", icon: "📏" },
  { key: "hips", label: "Hips", unit: "cm", icon: "📐" },
  { key: "arms", label: "Arms", unit: "cm", icon: "💪" },
  { key: "thighs", label: "Thighs", unit: "cm", icon: "🦵" },
];
const DEFAULT_PLAN = { Mon: "Chest", Tue: "Back", Wed: "Shoulders", Thu: "Arms", Fri: "Legs", Sat: "Core", Sun: "Rest Day" };
const MUSCLE_COLORS = { "Chest": "#ff6644", "Back": "#4488ff", "Shoulders": "#aa44ff", "Arms": "#ff44aa", "Legs": "#ffaa00", "Core": "#00ccff", "Full Body": "#00ff88", "Rest Day": "#333355" };

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00ff88", accentDim: "#00ff8830", text: "#e8e8f0",
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff",
  orange: "#ff8844",
};

// ── MINI CHART ────────────────────────────────────────────────────────────────
function MiniChart({ data, color = C.accent, height = 60 }) {
  if (!data || data.length < 2) return <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: "'Outfit'", fontSize: 12 }}>Add more entries to see chart</div>;
  const vals = data.map(d => d.value);
  const min = Math.min(...vals); const max = Math.max(...vals); const range = max - min || 1;
  const w = 280; const h = height;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {vals.map((v, i) => <circle key={i} cx={(i / (vals.length - 1)) * w} cy={h - ((v - min) / range) * (h - 10) - 5} r="3" fill={color} />)}
    </svg>
  );
}

// ── MACRO BAR ─────────────────────────────────────────────────────────────────
function MacroBar({ label, current, target, color }) {
  const pct = Math.min((current / target) * 100, 100);
  const over = current > target;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{label}</span>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: over ? C.red : color }}>{current}g / {target}g</span>
      </div>
      <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: over ? C.red : color, borderRadius: 4, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

// ── REST TIMER ────────────────────────────────────────────────────────────────
function RestTimer({ seconds, onClose }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (timeLeft === 0) {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          [0, 0.15, 0.3].forEach(delay => {
            const osc = ctx.createOscillator(); const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = 880;
            gain.gain.setValueAtTime(0.3, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.1);
            osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.1);
          });
        } catch (e) {}
      }
      return;
    }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [running, timeLeft]);
  const r = 54; const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 32, textAlign: "center", width: 280, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 2, color: C.muted, marginBottom: 20 }}>REST TIMER</div>
        <div style={{ position: "relative", width: 130, height: 130, margin: "0 auto 20px" }}>
          <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="65" cy="65" r={r} fill="none" stroke={C.border} strokeWidth="8" />
            <circle cx="65" cy="65" r={r} fill="none" stroke={timeLeft <= 5 ? C.red : C.accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${((timeLeft / seconds) * circ)} ${circ}`} style={{ transition: "stroke-dasharray 1s linear" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 42, color: timeLeft <= 5 ? C.red : C.text, lineHeight: 1 }}>{timeLeft}</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>seconds</div>
          </div>
        </div>
        {timeLeft === 0 && <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.accent, marginBottom: 12 }}>🔥 REST COMPLETE!</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setTimeLeft(seconds); setRunning(true); }} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>🔄 Reset</button>
          <button onClick={onClose} style={{ flex: 1, background: C.accent, border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 15 }}>NEXT SET</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function FitTrack() {
  const [screen, setScreen] = useState("home");
  const [selectedMuscle, setSelectedMuscle] = useState("Chest");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState({});
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState(() => storage.get("ft_history") || []);
  const [streak, setStreak] = useState(() => storage.get("ft_streak") || 0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [toast, setToast] = useState(null);
  const [memberName, setMemberName] = useState(() => storage.get("ft_name") || "");
  const [nameInput, setNameInput] = useState("");
  const [timer, setTimer] = useState(null);
  const [prs, setPrs] = useState(() => storage.get("ft_prs") || {});
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [bodyLogs, setBodyLogs] = useState(() => storage.get("ft_body") || []);
  const [bodyForm, setBodyForm] = useState({ weight: "", chest: "", waist: "", hips: "", arms: "", thighs: "" });
  const [activeChart, setActiveChart] = useState("weight");
  const [weekPlan, setWeekPlan] = useState(() => storage.get("ft_plan") || DEFAULT_PLAN);
  const [editingPlan, setEditingPlan] = useState(false);
  const [tempPlan, setTempPlan] = useState({});

  // Nutrition State
  const [nutProfile, setNutProfile] = useState(() => storage.get("ft_nut_profile") || { age: "", weight: "", height: "", gender: "male", activity: "moderate", goal: "maintain" });
  const [nutTargets, setNutTargets] = useState(() => storage.get("ft_nut_targets") || null);
  const [foodLog, setFoodLog] = useState(() => {
    const saved = storage.get("ft_food_log");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved : { date: today, items: [] };
  });
  const [foodSearch, setFoodSearch] = useState("");
  const [nutTab, setNutTab] = useState("today"); // today | calculator | foods

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); };

  const getTodayKey = () => DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayKey = getTodayKey();
  const todayMuscle = weekPlan[todayKey];

  const handleGenerate = (muscle) => {
    const m = muscle || selectedMuscle;
    setLoading(true); setSets({}); setCompleted(false);
    setTimeout(() => { setSelectedMuscle(m); setWorkout(DEMO_WORKOUTS[m]?.[selectedLevel] || DEMO_WORKOUTS["Chest"][selectedLevel]); setScreen("workout"); setLoading(false); }, 800);
  };

  const toggleSet = (exIdx, setIdx, restSecs, exName) => {
    const wasOff = !sets[exIdx]?.[setIdx];
    setSets(prev => { const ex = prev[exIdx] || {}; return { ...prev, [exIdx]: { ...ex, [setIdx]: !ex[setIdx] } }; });
    if (wasOff) setPrModal({ exName, restSecs });
  };

  const handlePrSave = () => {
    if (prWeight && prReps) {
      const existing = prs[prModal.exName];
      const newEntry = { weight: parseFloat(prWeight), reps: parseInt(prReps), date: new Date().toLocaleDateString("en-IN") };
      const isNew = !existing || newEntry.weight > existing.weight;
      const updated = { ...prs, [prModal.exName]: newEntry };
      setPrs(updated); storage.set("ft_prs", updated);
      if (isNew) showToast(`🏆 NEW PR! ${prModal.exName}: ${prWeight}kg x ${prReps}`);
      else showToast(`Logged: ${prWeight}kg x ${prReps}`);
    }
    setPrWeight(""); setPrReps(""); setTimer({ seconds: prModal.restSecs }); setPrModal(null);
  };

  const handlePrSkip = () => { setTimer({ seconds: prModal.restSecs }); setPrModal(null); setPrWeight(""); setPrReps(""); };
  const setsDone = (exIdx) => Object.values(sets[exIdx] || {}).filter(Boolean).length;
  const totalProgress = () => {
    if (!workout) return 0;
    let done = 0, total = 0;
    workout.forEach((ex, i) => { total += ex.sets; done += setsDone(i); });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const markComplete = () => {
    const entry = { date: new Date().toLocaleDateString("en-IN"), muscle: selectedMuscle, level: selectedLevel, exercises: workout.length, ts: Date.now() };
    const newHistory = [entry, ...history].slice(0, 30);
    setHistory(newHistory); storage.set("ft_history", newHistory);
    const newStreak = streak + 1; setStreak(newStreak); storage.set("ft_streak", newStreak);
    setCompleted(true); showToast("Workout complete! 🔥");
  };

  // ── NUTRITION FUNCTIONS ───────────────────────────────────────────────────
  const calculateTargets = () => {
    const { age, weight, height, gender, activity, goal } = nutProfile;
    if (!age || !weight || !height) { showToast("Saari info fill karo!", "error"); return; }
    const w = parseFloat(weight); const h = parseFloat(height); const a = parseInt(age);
    // BMR (Mifflin-St Jeor)
    let bmr = gender === "male" ? (10 * w) + (6.25 * h) - (5 * a) + 5 : (10 * w) + (6.25 * h) - (5 * a) - 161;
    const activityMultiplier = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    let tdee = bmr * activityMultiplier[activity];
    let calories = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 300 : tdee;
    calories = Math.round(calories);
    const protein = Math.round(w * 2.2); // 2.2g per kg
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    const targets = { calories, protein, fat, carbs, bmr: Math.round(bmr), tdee: Math.round(tdee) };
    setNutTargets(targets); storage.set("ft_nut_targets", targets);
    storage.set("ft_nut_profile", nutProfile);
    showToast("Targets calculate ho gaye! 🎯");
    setNutTab("today");
  };

  const addFood = (food) => {
    const today = new Date().toLocaleDateString("en-IN");
    const newLog = foodLog.date === today ? { ...foodLog, items: [...foodLog.items, { ...food, id: Date.now() }] } : { date: today, items: [{ ...food, id: Date.now() }] };
    setFoodLog(newLog); storage.set("ft_food_log", newLog);
    showToast(`+${food.cal} cal added! 🍽️`);
  };

  const removeFood = (id) => {
    const newLog = { ...foodLog, items: foodLog.items.filter(f => f.id !== id) };
    setFoodLog(newLog); storage.set("ft_food_log", newLog);
  };

  const totalEaten = foodLog.items.reduce((acc, f) => ({ cal: acc.cal + f.cal, protein: acc.protein + f.protein, carbs: acc.carbs + f.carbs, fat: acc.fat + f.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
  const filteredFoods = FOODS.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));

  const saveBodyLog = () => {
    const hasData = Object.values(bodyForm).some(v => v !== "");
    if (!hasData) { showToast("Kuch toh fill karo!", "error"); return; }
    const entry = { date: new Date().toLocaleDateString("en-IN"), ts: Date.now(), ...Object.fromEntries(Object.entries(bodyForm).map(([k, v]) => [k, v ? parseFloat(v) : null])) };
    const newLogs = [entry, ...bodyLogs].slice(0, 50);
    setBodyLogs(newLogs); storage.set("ft_body", newLogs);
    setBodyForm({ weight: "", chest: "", waist: "", hips: "", arms: "", thighs: "" });
    showToast("Progress saved! 📊");
  };

  const getChartData = (key) => bodyLogs.filter(l => l[key] != null).map(l => ({ value: l[key], date: l.date })).reverse();
  const getChange = (key) => { const data = getChartData(key); if (data.length < 2) return null; return data[data.length - 1].value - data[0].value; };
  const savePlan = () => { setWeekPlan(tempPlan); storage.set("ft_plan", tempPlan); setEditingPlan(false); showToast("Weekly plan saved! 📅"); };
  const saveName = () => { storage.set("ft_name", nameInput); setMemberName(nameInput); showToast("Name saved!"); };
  const prog = totalProgress();

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Bebas Neue', Impact, sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .animate-in { animation: slideUp 0.4s ease forwards; }
        .card-hover:hover { border-color: ${C.accent}44 !important; transform: translateY(-1px); transition: all 0.2s; }
        select, input { -webkit-appearance: none; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(${C.border}22 1px, transparent 1px), linear-gradient(90deg, ${C.border}22 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -200, right: -200, width: 500, height: 500, background: `radial-gradient(circle, ${C.accent}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? C.red : C.accent, color: toast.type === "error" ? "#fff" : "#000", padding: "10px 20px", borderRadius: 8, fontFamily: "'Outfit'", fontWeight: 600, fontSize: 14, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>{toast.msg}</div>}
      {timer && <RestTimer seconds={timer.seconds} onClose={() => setTimer(null)} />}

      {prModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 1500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, width: "min(320px, 90vw)", border: `1px solid ${C.accent}44` }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.accent, letterSpacing: 2, marginBottom: 4 }}>LOG THIS SET</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>{prModal.exName}</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 6 }}>WEIGHT (kg)</div>
                <input type="number" value={prWeight} onChange={e => setPrWeight(e.target.value)} placeholder="40" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 16, outline: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 6 }}>REPS</div>
                <input type="number" value={prReps} onChange={e => setPrReps(e.target.value)} placeholder="10" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 16, outline: "none" }} />
              </div>
            </div>
            {prs[prModal.exName] && <div style={{ background: C.surface, borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontFamily: "'Outfit'", fontSize: 12, color: C.muted, borderLeft: `3px solid ${C.yellow}` }}>🏆 PR: <span style={{ color: C.yellow }}>{prs[prModal.exName].weight}kg × {prs[prModal.exName].reps}</span></div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handlePrSkip} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>Skip</button>
              <button onClick={handlePrSave} style={{ flex: 2, background: C.accent, border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16 }}>SAVE & REST ▶</button>
            </div>
          </div>
        </div>
      )}

      {activeVideo && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setActiveVideo(null)}>
          <div style={{ background: C.card, borderRadius: 12, width: "min(500px, 94vw)", padding: 24, textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>▶️</div>
            <div style={{ fontFamily: "'Outfit'", color: C.muted, marginBottom: 8 }}>YouTube pe search karo:</div>
            <div style={{ fontSize: 16, color: C.accent, marginBottom: 16, fontFamily: "'Outfit'" }}>{activeVideo}</div>
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideo)}`} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#ff0000", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontFamily: "'Bebas Neue'", fontSize: 18 }}>▶ YOUTUBE PE DEKHO</a>
            <div style={{ marginTop: 16 }}><button onClick={() => setActiveVideo(null)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", color: C.muted, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13 }}>Close</button></div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        <header style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 28, letterSpacing: 3, color: C.accent, lineHeight: 1 }}>FITTRACK</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 2 }}>{memberName ? `Welcome, ${memberName}` : "Your Daily Gym Companion"}</div>
          </div>
          <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 18, color: C.accent, lineHeight: 1 }}>🔥{streak}</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>STREAK</div>
          </div>
        </header>

        <nav style={{ display: "flex", padding: "16px 20px 0", gap: 3 }}>
          {[["home","🏠","HOME"],["plan","📅","PLAN"],["nutrition","🥗","DIET"],["body","📈","BODY"],["settings","⚙️","ME"]].map(([s, icon, label]) => (
            <button key={s} onClick={() => setScreen(s === "home" && screen === "workout" ? "workout" : s)}
              style={{ flex: 1, background: (screen === s || (s === "home" && screen === "workout")) ? C.accentDim : "transparent", border: `1px solid ${(screen === s || (s === "home" && screen === "workout")) ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "7px 2px", cursor: "pointer", color: (screen === s || (s === "home" && screen === "workout")) ? C.accent : C.muted, fontSize: 9, letterSpacing: 1, fontFamily: "'Bebas Neue'", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 13 }}>{icon}</span>{label}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>

          {/* HOME */}
          {screen === "home" && (
            <div className="animate-in">
              {todayMuscle && todayMuscle !== "Rest Day" && (
                <div style={{ background: `${MUSCLE_COLORS[todayMuscle]}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle]}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 3 }}>📅 TODAY'S PLAN</div>
                    <div style={{ fontSize: 20, color: MUSCLE_COLORS[todayMuscle] }}>{todayMuscle} Day</div>
                  </div>
                  <button onClick={() => handleGenerate(todayMuscle)} style={{ background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14 }}>START ⚡</button>
                </div>
              )}
              {todayMuscle === "Rest Day" && (
                <div style={{ background: "#33335522", border: `1px solid #33335566`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 24 }}>😴</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.muted, marginTop: 4 }}>Aaj Rest Day hai!</div>
                </div>
              )}

              {/* Calorie Summary on Home */}
              {nutTargets && (
                <div style={{ background: `${C.orange}11`, border: `1px solid ${C.orange}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🥗 TODAY'S CALORIES</div>
                      <div style={{ fontSize: 22, color: totalEaten.cal > nutTargets.calories ? C.red : C.orange }}>{totalEaten.cal} <span style={{ fontSize: 13, color: C.muted }}>/ {nutTargets.calories} kcal</span></div>
                    </div>
                    <button onClick={() => setScreen("nutrition")} style={{ background: `${C.orange}22`, border: `1px solid ${C.orange}44`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: C.orange, fontFamily: "'Bebas Neue'", fontSize: 13 }}>LOG FOOD</button>
                  </div>
                  <div style={{ height: 6, background: C.border, borderRadius: 3, marginTop: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: totalEaten.cal > nutTargets.calories ? C.red : C.orange, borderRadius: 3, transition: "width 0.3s" }} />
                  </div>
                </div>
              )}

              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 10, fontFamily: "'Outfit'" }}>SELECT MUSCLE GROUP</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {MUSCLES.map(m => <button key={m} onClick={() => setSelectedMuscle(m)} style={{ background: selectedMuscle === m ? C.accent : C.card, border: `1px solid ${selectedMuscle === m ? C.accent : C.border}`, borderRadius: 6, padding: "8px 14px", cursor: "pointer", color: selectedMuscle === m ? "#000" : C.text, fontSize: 13, fontFamily: "'Bebas Neue'", letterSpacing: 1, transition: "all 0.2s" }}>{m}</button>)}
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 10, fontFamily: "'Outfit'" }}>FITNESS LEVEL</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {LEVELS.map(l => <button key={l} onClick={() => setSelectedLevel(l)} style={{ flex: 1, background: selectedLevel === l ? C.accentDim : C.card, border: `1px solid ${selectedLevel === l ? C.accent : C.border}`, borderRadius: 8, padding: "12px 8px", cursor: "pointer", color: selectedLevel === l ? C.accent : C.muted, fontSize: 14, fontFamily: "'Bebas Neue'", letterSpacing: 1, transition: "all 0.2s" }}>{l}</button>)}
                </div>
              </div>
              <button onClick={() => handleGenerate()} disabled={loading} style={{ width: "100%", background: loading ? C.border : C.accent, border: "none", borderRadius: 12, padding: "18px", cursor: loading ? "not-allowed" : "pointer", color: "#000", fontSize: 22, fontFamily: "'Bebas Neue'", letterSpacing: 3, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {loading ? (<><div style={{ width: 20, height: 20, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />LOADING...</>) : "⚡ GENERATE TODAY'S WORKOUT"}
              </button>
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 12, fontFamily: "'Outfit'" }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map((d, i) => {
                    const isToday = d === todayKey;
                    const hasLog = history.some(h => new Date(h.ts).getDay() === (i + 1) % 7);
                    const planned = weekPlan[d]; const color = MUSCLE_COLORS[planned] || C.muted;
                    return (
                      <div key={d} style={{ flex: 1, background: hasLog ? C.accentDim : `${color}11`, border: `1px solid ${isToday ? C.accent : color + "44"}`, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: isToday ? C.accent : C.muted }}>{d}</div>
                        <div style={{ marginTop: 3, fontSize: 12 }}>{hasLog ? "✅" : isToday ? "🎯" : planned === "Rest Day" ? "😴" : "○"}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 8, color, marginTop: 2 }}>{planned === "Rest Day" ? "REST" : planned?.substring(0, 3).toUpperCase()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* WORKOUT */}
          {screen === "workout" && workout && (
            <div className="animate-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 24, color: C.accent }}>{selectedMuscle.toUpperCase()} DAY</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>{selectedLevel} · {workout.length} exercises</div>
                </div>
                <button onClick={() => setScreen("home")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.muted, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 12 }}>← Back</button>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>PROGRESS</span>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.accent }}>{prog}%</span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${prog}%`, background: C.accent, borderRadius: 3, transition: "width 0.4s ease" }} />
                </div>
              </div>
              {workout.map((ex, i) => {
                const done = setsDone(i); const allDone = done === ex.sets; const pr = prs[ex.name];
                return (
                  <div key={i} className="card-hover" style={{ background: C.card, border: `1px solid ${allDone ? C.accent + "44" : C.border}`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17, color: allDone ? C.accent : C.text }}>{allDone && "✅ "}{ex.name}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 3 }}>{ex.sets} sets · {ex.reps} reps · Rest {ex.rest}s</div>
                      </div>
                      <button onClick={() => setActiveVideo(ex.youtube)} style={{ background: "#ff000022", border: "1px solid #ff000066", borderRadius: 8, padding: "5px 9px", cursor: "pointer", color: "#ff4444", fontSize: 12, fontFamily: "'Outfit'" }}>▶ Demo</button>
                    </div>
                    {pr && <div style={{ background: C.accentDim, borderRadius: 6, padding: "4px 10px", marginBottom: 8, fontFamily: "'Outfit'", fontSize: 12, color: C.accent, display: "inline-block" }}>🏆 PR: {pr.weight}kg × {pr.reps}</div>}
                    {ex.tip && <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, background: C.surface, borderRadius: 6, padding: "5px 10px", marginBottom: 10, borderLeft: `3px solid ${C.yellow}` }}>💡 {ex.tip}</div>}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      {Array.from({ length: ex.sets }).map((_, s) => {
                        const isDone = sets[i]?.[s];
                        return <button key={s} onClick={() => toggleSet(i, s, ex.rest, ex.name)} style={{ width: 44, height: 44, borderRadius: 8, cursor: "pointer", background: isDone ? C.accent : C.surface, border: `1px solid ${isDone ? C.accent : C.border}`, color: isDone ? "#000" : C.muted, fontSize: 12, fontFamily: "'Outfit'", fontWeight: 600, transition: "all 0.2s" }}>{isDone ? "✓" : `S${s + 1}`}</button>;
                      })}
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: allDone ? C.accent : C.muted, marginLeft: 4 }}>{done}/{ex.sets}</div>
                    </div>
                  </div>
                );
              })}
              {!completed ? (
                <button onClick={markComplete} style={{ width: "100%", background: prog >= 80 ? C.accent : C.border, border: "none", borderRadius: 12, padding: 16, cursor: "pointer", color: prog >= 80 ? "#000" : C.muted, fontSize: 20, fontFamily: "'Bebas Neue'", letterSpacing: 2, marginTop: 8, transition: "all 0.3s" }}>
                  {prog >= 80 ? "🏆 MARK WORKOUT COMPLETE" : `COMPLETE MORE SETS (${prog}%)`}
                </button>
              ) : (
                <div style={{ background: C.accentDim, border: `1px solid ${C.accent}`, borderRadius: 12, padding: 20, textAlign: "center", marginTop: 8 }}>
                  <div style={{ fontSize: 28 }}>🔥</div>
                  <div style={{ fontSize: 22, color: C.accent }}>WORKOUT COMPLETE!</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.muted, marginTop: 4 }}>Streak: {streak} days 🔥</div>
                </div>
              )}
            </div>
          )}

          {/* PLAN */}
          {screen === "plan" && (
            <div className="animate-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 22 }}>WEEKLY PLAN</div>
                <button onClick={() => { setTempPlan({ ...weekPlan }); setEditingPlan(!editingPlan); }} style={{ background: editingPlan ? C.red + "22" : C.accentDim, border: `1px solid ${editingPlan ? C.red + "44" : C.accent + "44"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: editingPlan ? C.red : C.accent, fontFamily: "'Bebas Neue'", fontSize: 14 }}>
                  {editingPlan ? "CANCEL" : "✏️ EDIT"}
                </button>
              </div>
              <div style={{ background: `${MUSCLE_COLORS[todayMuscle] || C.muted}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle] || C.muted}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 3 }}>🎯 TODAY</div>
                <div style={{ fontSize: 22, color: MUSCLE_COLORS[todayMuscle] || C.muted }}>{todayMuscle}</div>
                {todayMuscle !== "Rest Day" && <button onClick={() => handleGenerate(todayMuscle)} style={{ marginTop: 10, background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14 }}>⚡ START</button>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {DAYS.map((d, i) => {
                  const isToday = d === todayKey;
                  const muscle = editingPlan ? (tempPlan[d] || "Rest Day") : weekPlan[d];
                  const color = MUSCLE_COLORS[muscle] || C.muted;
                  return (
                    <div key={d} style={{ background: C.card, border: `1px solid ${isToday ? C.accent : color + "33"}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 13, color: isToday ? C.accent : color }}>{d}</div>
                        </div>
                        <div>
                          {editingPlan ? (
                            <select value={tempPlan[d] || "Rest Day"} onChange={e => setTempPlan(p => ({ ...p, [d]: e.target.value }))} style={{ background: C.surface, border: `1px solid ${color}55`, borderRadius: 6, padding: "6px 10px", color: color, fontFamily: "'Bebas Neue'", fontSize: 14, outline: "none", cursor: "pointer" }}>
                              {["Rest Day", ...MUSCLES].map(opt => <option key={opt} value={opt} style={{ background: C.surface, color: C.text }}>{opt}</option>)}
                            </select>
                          ) : (
                            <div style={{ fontSize: 16, color }}>{muscle}</div>
                          )}
                        </div>
                      </div>
                      {!editingPlan && muscle !== "Rest Day" && <button onClick={() => handleGenerate(muscle)} style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color, fontFamily: "'Bebas Neue'", fontSize: 13 }}>GO ▶</button>}
                      {!editingPlan && muscle === "Rest Day" && <div style={{ fontSize: 20 }}>😴</div>}
                    </div>
                  );
                })}
              </div>
              {editingPlan && <button onClick={savePlan} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 12, padding: "16px", cursor: "pointer", color: "#000", fontSize: 20, fontFamily: "'Bebas Neue'", letterSpacing: 2 }}>💾 SAVE PLAN</button>}
            </div>
          )}

          {/* ── NUTRITION SCREEN ── */}
          {screen === "nutrition" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>NUTRITION</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>Calories aur macros track karo</div>

              {/* Sub Tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                {[["today","📊","Today"],["foods","🍽️","Add Food"],["calculator","🧮","Calculator"]].map(([t, icon, label]) => (
                  <button key={t} onClick={() => setNutTab(t)} style={{ flex: 1, background: nutTab === t ? C.accentDim : C.card, border: `1px solid ${nutTab === t ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", color: nutTab === t ? C.accent : C.muted, fontFamily: "'Bebas Neue'", fontSize: 11, letterSpacing: 1 }}>{icon} {label}</button>
                ))}
              </div>

              {/* TODAY TAB */}
              {nutTab === "today" && (
                <>
                  {!nutTargets ? (
                    <div style={{ textAlign: "center", padding: "30px 20px", color: C.muted, fontFamily: "'Outfit'" }}>
                      <div style={{ fontSize: 48 }}>🧮</div>
                      <div style={{ marginTop: 12, fontSize: 15 }}>Pehle Calculator mein apni info daalo!</div>
                      <button onClick={() => setNutTab("calculator")} style={{ marginTop: 16, background: C.accent, border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16 }}>CALCULATOR OPEN KARO</button>
                    </div>
                  ) : (
                    <>
                      {/* Calorie Ring */}
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 8 }}>{new Date().toLocaleDateString("en-IN")}</div>
                        <div style={{ fontSize: 42, color: totalEaten.cal > nutTargets.calories ? C.red : C.orange, lineHeight: 1 }}>{totalEaten.cal}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.muted }}>/ {nutTargets.calories} kcal</div>
                        <div style={{ height: 10, background: C.border, borderRadius: 5, margin: "12px 0", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: totalEaten.cal > nutTargets.calories ? C.red : C.orange, borderRadius: 5, transition: "width 0.3s" }} />
                        </div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>
                          {nutTargets.calories - totalEaten.cal > 0 ? `${nutTargets.calories - totalEaten.cal} kcal remaining` : `${totalEaten.cal - nutTargets.calories} kcal over`}
                        </div>
                      </div>

                      {/* Macros */}
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>MACROS</div>
                        <MacroBar label="🥩 Protein" current={totalEaten.protein} target={nutTargets.protein} color={C.accent} />
                        <MacroBar label="🍞 Carbs" current={totalEaten.carbs} target={nutTargets.carbs} color={C.blue} />
                        <MacroBar label="🥑 Fat" current={totalEaten.fat} target={nutTargets.fat} color={C.yellow} />
                      </div>

                      {/* Food Log */}
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>TODAY'S FOOD</div>
                          <button onClick={() => setNutTab("foods")} style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: C.accent, fontFamily: "'Bebas Neue'", fontSize: 12 }}>+ ADD</button>
                        </div>
                        {foodLog.items.length === 0 ? (
                          <div style={{ textAlign: "center", padding: "20px", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>Kuch log nahi kiya abhi</div>
                        ) : foodLog.items.map(item => (
                          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                            <div>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text }}>{item.name}</div>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>P:{item.protein}g C:{item.carbs}g F:{item.fat}g</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange }}>{item.cal} kcal</div>
                              <button onClick={() => removeFood(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, fontSize: 16 }}>×</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* FOODS TAB */}
              {nutTab === "foods" && (
                <>
                  <input value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder="🔍 Food search karo... (dal, roti, egg...)" style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none", marginBottom: 14 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filteredFoods.map((food, i) => (
                      <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text }}>{food.name}</div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 2 }}>P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange }}>{food.cal}</div>
                          <button onClick={() => { addFood(food); }} style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: C.accent, fontFamily: "'Bebas Neue'", fontSize: 13 }}>+ADD</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CALCULATOR TAB */}
              {nutTab === "calculator" && (
                <div>
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>APNI INFO DAALO</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                      {[["age","Age (years)","22"],["weight","Weight (kg)","70"],["height","Height (cm)","175"]].map(([key, label, ph]) => (
                        <div key={key} style={key === "age" ? { gridColumn: "1 / -1" } : {}}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 5 }}>{label}</div>
                          <input type="number" value={nutProfile[key]} onChange={e => setNutProfile(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 8 }}>GENDER</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[["male","👨 Male"],["female","👩 Female"]].map(([v, l]) => (
                          <button key={v} onClick={() => setNutProfile(p => ({ ...p, gender: v }))} style={{ flex: 1, background: nutProfile.gender === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.gender === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: nutProfile.gender === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>{l}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 8 }}>ACTIVITY LEVEL</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {[["sedentary","🪑 Sedentary (no exercise)"],["light","🚶 Light (1-3 days/week)"],["moderate","🏃 Moderate (3-5 days/week)"],["active","💪 Active (6-7 days/week)"],["very_active","🔥 Very Active (2x/day)"]].map(([v, l]) => (
                          <button key={v} onClick={() => setNutProfile(p => ({ ...p, activity: v }))} style={{ background: nutProfile.activity === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.activity === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", color: nutProfile.activity === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 12, textAlign: "left" }}>{l}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 8 }}>GOAL</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[["lose","⬇️ Lose"],["maintain","⚖️ Maintain"],["gain","⬆️ Gain"]].map(([v, l]) => (
                          <button key={v} onClick={() => setNutProfile(p => ({ ...p, goal: v }))} style={{ flex: 1, background: nutProfile.goal === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.goal === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px 6px", cursor: "pointer", color: nutProfile.goal === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 12 }}>{l}</button>
                        ))}
                      </div>
                    </div>

                    <button onClick={calculateTargets} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "14px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}>🧮 CALCULATE MY TARGETS</button>
                  </div>

                  {nutTargets && (
                    <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 12, padding: 20 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>YOUR DAILY TARGETS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[["🔥 Calories", nutTargets.calories, "kcal", C.orange],["🥩 Protein", nutTargets.protein, "g", C.accent],["🍞 Carbs", nutTargets.carbs, "g", C.blue],["🥑 Fat", nutTargets.fat, "g", C.yellow],["💤 BMR", nutTargets.bmr, "kcal", C.muted],["⚡ TDEE", nutTargets.tdee, "kcal", C.muted]].map(([label, val, unit, color]) => (
                          <div key={label} style={{ background: C.surface, borderRadius: 10, padding: "12px 14px" }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{label}</div>
                            <div style={{ fontSize: 22, color, marginTop: 2 }}>{val}<span style={{ fontSize: 11, color: C.muted }}>{unit}</span></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* BODY */}
          {screen === "body" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>BODY PROGRESS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{bodyLogs.length} entries</div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>📝 ADD MEASUREMENTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {BODY_PARTS.map(({ key, label, unit, icon }) => (
                    <div key={key}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 5 }}>{icon} {label} ({unit})</div>
                      <input type="number" step="0.1" value={bodyForm[key]} onChange={e => setBodyForm(p => ({ ...p, [key]: e.target.value }))} placeholder={key === "weight" ? "70" : "85"} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
                    </div>
                  ))}
                </div>
                <button onClick={saveBodyLog} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 2 }}>📊 SAVE</button>
              </div>
              {bodyLogs.length > 0 && (
                <>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {BODY_PARTS.map(({ key, label, icon }) => getChartData(key).length > 0 && (
                      <button key={key} onClick={() => setActiveChart(key)} style={{ background: activeChart === key ? C.accent : C.card, border: `1px solid ${activeChart === key ? C.accent : C.border}`, borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: activeChart === key ? "#000" : C.muted, fontSize: 12, fontFamily: "'Bebas Neue'" }}>{icon} {label}</button>
                    ))}
                  </div>
                  {(() => {
                    const bp = BODY_PARTS.find(b => b.key === activeChart);
                    const chartData = getChartData(activeChart); if (!chartData.length) return null;
                    const change = getChange(activeChart); const latest = chartData[chartData.length - 1]; const first = chartData[0];
                    return (
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                          <div><div style={{ fontSize: 18 }}>{bp.icon} {bp.label}</div><div style={{ fontFamily: "'Outfit'", fontSize: 22, color: C.accent }}>{latest.value}<span style={{ fontSize: 13, color: C.muted }}>{bp.unit}</span></div></div>
                          {change !== null && <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Outfit'", fontSize: 13, color: change < 0 ? C.accent : C.red }}>{change > 0 ? "▲" : "▼"}{Math.abs(change).toFixed(1)}{bp.unit}</div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>from start</div></div>}
                        </div>
                        <MiniChart data={chartData} height={70} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{first?.date}</div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{latest?.date}</div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
              {bodyLogs.length === 0 && <div style={{ textAlign: "center", padding: "30px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 48 }}>📈</div><div style={{ marginTop: 12 }}>Upar form fill karo!</div></div>}
            </div>
          )}

          {/* SETTINGS */}
          {screen === "settings" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 20 }}>PROFILE</div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 10 }}>YOUR NAME</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={nameInput || memberName} onChange={e => setNameInput(e.target.value)} placeholder="Enter your name..." style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
                  <button onClick={saveName} style={{ background: C.accent, border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16 }}>SAVE</button>
                </div>
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 12 }}>ALL FEATURES</div>
                {[["📅","Weekly Planner","Mon-Sun ka schedule"],["💪","7 Muscle Groups","105 exercises"],["⏱️","Rest Timer","Countdown + beep"],["🏆","PR Tracker","Personal records"],["🥗","Nutrition","Calorie + macro calculator"],["📈","Body Progress","Measurements & charts"],["💾","Auto Save","Sab kuch save hota hai"]].map(([icon,title,desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div><div style={{ fontSize: 13, color: C.text }}>{title}</div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { if (window.confirm("Saara data delete hoga?")) { localStorage.clear(); setHistory([]); setStreak(0); setMemberName(""); setNameInput(""); setPrs({}); setBodyLogs([]); setWeekPlan(DEFAULT_PLAN); setNutTargets(null); setFoodLog({ date: new Date().toLocaleDateString("en-IN"), items: [] }); showToast("Reset ho gaya!", "error"); } }} style={{ width: "100%", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.red, fontFamily: "'Outfit'", fontSize: 14 }}>🗑️ Reset All Data</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
