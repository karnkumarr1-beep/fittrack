import { useState, useEffect, useRef } from "react";

const DEMO_WORKOUTS = {
  Chest: {
    Beginner: [
      { name: "Push Ups", sets: 3, reps: "10-12", rest: 60, youtube: "push ups for beginners", tip: "Haath shoulder-width par rakho, body straight rehni chahiye" },
      { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell chest press beginner", tip: "Elbows 45 degree angle pe rakho" },
      { name: "Incline Push Ups", sets: 3, reps: "12-15", rest: 45, youtube: "incline push ups tutorial", tip: "Bench ya wall ka use karo" },
      { name: "Dumbbell Flyes", sets: 3, reps: "12", rest: 60, youtube: "dumbbell flyes beginner", tip: "Arms slightly bent rakho" },
      { name: "Cable Crossover", sets: 3, reps: "12-15", rest: 60, youtube: "cable crossover chest exercise", tip: "Chest squeeze karo end mein" },
    ],
    Intermediate: [
      { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bench press form", tip: "Feet flat on floor" },
      { name: "Incline Dumbbell Press", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell press", tip: "30-45 degree incline best hai" },
      { name: "Chest Dips", sets: 3, reps: "10-12", rest: 75, youtube: "chest dips tutorial", tip: "Thoda aage jhuko" },
      { name: "Pec Deck Machine", sets: 3, reps: "12-15", rest: 60, youtube: "pec deck machine workout", tip: "Full range of motion" },
      { name: "Push Up Variations", sets: 3, reps: "15", rest: 60, youtube: "push up variations chest", tip: "Wide grip, diamond mix karo" },
    ],
    Advanced: [
      { name: "Heavy Barbell Bench", sets: 5, reps: "5-6", rest: 120, youtube: "heavy bench press technique", tip: "Spotter rakho" },
      { name: "Weighted Dips", sets: 4, reps: "8-10", rest: 90, youtube: "weighted dips chest", tip: "Belt se weight attach karo" },
      { name: "Decline Bench Press", sets: 4, reps: "8", rest: 90, youtube: "decline bench press", tip: "Lower chest focus" },
      { name: "Cable Flyes", sets: 4, reps: "12-15", rest: 60, youtube: "cable flyes chest workout", tip: "Slow eccentric" },
      { name: "Plyometric Push Ups", sets: 3, reps: "10", rest: 90, youtube: "plyometric push ups", tip: "Explosive power" },
    ],
  },
  Back: {
    Beginner: [
      { name: "Lat Pulldown", sets: 3, reps: "12", rest: 60, youtube: "lat pulldown beginner form", tip: "Chest up, shoulder blades squeeze" },
      { name: "Seated Cable Row", sets: 3, reps: "12", rest: 60, youtube: "seated cable row tutorial", tip: "Back straight rakho" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row beginner", tip: "Elbow ceiling ki taraf" },
      { name: "Superman Exercise", sets: 3, reps: "15", rest: 45, youtube: "superman back exercise", tip: "Lower back strengthen" },
      { name: "Resistance Band Row", sets: 3, reps: "15", rest: 45, youtube: "resistance band row back", tip: "Full stretch important" },
    ],
    Intermediate: [
      { name: "Pull Ups", sets: 4, reps: "8-10", rest: 90, youtube: "pull ups back workout", tip: "Dead hang se shuru karo" },
      { name: "Barbell Row", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bent over row", tip: "45 degree angle" },
      { name: "T-Bar Row", sets: 3, reps: "10", rest: 75, youtube: "t bar row back exercise", tip: "Chest pad pe lean karo" },
      { name: "Wide Grip Pulldown", sets: 3, reps: "12", rest: 60, youtube: "wide grip lat pulldown", tip: "V-taper banata hai" },
      { name: "Face Pulls", sets: 3, reps: "15", rest: 60, youtube: "face pulls rear delt", tip: "Rear delts target" },
    ],
    Advanced: [
      { name: "Weighted Pull Ups", sets: 5, reps: "6-8", rest: 120, youtube: "weighted pull ups back", tip: "Belt se weight lagao" },
      { name: "Deadlift", sets: 4, reps: "5", rest: 180, youtube: "deadlift proper form", tip: "King of exercises" },
      { name: "Meadows Row", sets: 4, reps: "8-10", rest: 90, youtube: "meadows row back exercise", tip: "Unilateral movement" },
      { name: "Straight Arm Pulldown", sets: 3, reps: "15", rest: 60, youtube: "straight arm pulldown lats", tip: "Lats isolate" },
      { name: "Rack Pulls", sets: 4, reps: "6", rest: 120, youtube: "rack pulls upper back", tip: "Upper back thickness" },
    ],
  },
  Shoulders: {
    Beginner: [
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell shoulder press beginner", tip: "Elbows 90 degree" },
      { name: "Lateral Raises", sets: 3, reps: "15", rest: 45, youtube: "lateral raises form tutorial", tip: "Pour the jug motion" },
      { name: "Front Raises", sets: 3, reps: "12", rest: 45, youtube: "front raises shoulders", tip: "Shoulder height tak" },
      { name: "Arnold Press", sets: 3, reps: "12", rest: 60, youtube: "arnold press dumbbell", tip: "Full shoulder coverage" },
      { name: "Rear Delt Flyes", sets: 3, reps: "15", rest: 45, youtube: "rear delt flyes bent over", tip: "Elbows wide rakho" },
    ],
    Intermediate: [
      { name: "Barbell Overhead Press", sets: 4, reps: "8-10", rest: 90, youtube: "barbell overhead press form", tip: "Core tight" },
      { name: "Cable Lateral Raises", sets: 4, reps: "15", rest: 60, youtube: "cable lateral raises", tip: "Constant tension" },
      { name: "Upright Row", sets: 3, reps: "12", rest: 60, youtube: "upright row shoulders", tip: "Wide grip" },
      { name: "Machine Shoulder Press", sets: 3, reps: "12", rest: 75, youtube: "machine shoulder press", tip: "Controlled movement" },
      { name: "Band Pull Aparts", sets: 3, reps: "20", rest: 45, youtube: "band pull aparts shoulders", tip: "Posture ke liye great" },
    ],
    Advanced: [
      { name: "Push Press", sets: 5, reps: "5", rest: 120, youtube: "push press barbell", tip: "Leg drive use karo" },
      { name: "Seated DB Press", sets: 4, reps: "10", rest: 90, youtube: "seated dumbbell press shoulders", tip: "No cheating" },
      { name: "Cable Y Raises", sets: 4, reps: "15", rest: 60, youtube: "cable y raise shoulders", tip: "All 3 heads" },
      { name: "Single Arm Cable Press", sets: 3, reps: "12 each", rest: 75, youtube: "single arm cable shoulder press", tip: "Core stability" },
      { name: "Face Pulls Heavy", sets: 4, reps: "12", rest: 60, youtube: "heavy face pulls shoulders", tip: "External rotation" },
    ],
  },
  Arms: {
    Beginner: [
      { name: "Dumbbell Bicep Curl", sets: 3, reps: "12", rest: 60, youtube: "dumbbell bicep curl beginner", tip: "Swing mat karo" },
      { name: "Tricep Pushdown", sets: 3, reps: "12", rest: 60, youtube: "tricep pushdown cable", tip: "Full extension karo" },
      { name: "Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "hammer curl biceps", tip: "Forearms bhi work karte" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: 60, youtube: "overhead tricep extension dumbbell", tip: "Long head target" },
      { name: "Concentration Curl", sets: 3, reps: "12 each", rest: 45, youtube: "concentration curl bicep", tip: "Slow controlled" },
    ],
    Intermediate: [
      { name: "Barbell Curl", sets: 4, reps: "10", rest: 75, youtube: "barbell curl biceps form", tip: "Full range" },
      { name: "Skull Crushers", sets: 4, reps: "10", rest: 75, youtube: "skull crushers triceps", tip: "Not on forehead!" },
      { name: "Preacher Curl", sets: 3, reps: "12", rest: 60, youtube: "preacher curl machine", tip: "Pure isolation" },
      { name: "Close Grip Bench", sets: 3, reps: "10", rest: 90, youtube: "close grip bench press triceps", tip: "Triceps feel karo" },
      { name: "Cable Curl", sets: 3, reps: "15", rest: 60, youtube: "cable curl biceps", tip: "Constant tension" },
    ],
    Advanced: [
      { name: "21s Bicep Curl", sets: 4, reps: "21", rest: 90, youtube: "21s bicep curl technique", tip: "7+7+7 brutal pump" },
      { name: "Weighted Dips Tricep", sets: 4, reps: "8", rest: 90, youtube: "tricep dips weighted", tip: "Upright posture" },
      { name: "Incline DB Curl", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell curl", tip: "Full stretch" },
      { name: "French Press", sets: 4, reps: "10", rest: 75, youtube: "french press triceps EZ bar", tip: "EZ bar better" },
      { name: "Cable Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "cable hammer curl rope", tip: "Rope attachment" },
    ],
  },
  Legs: {
    Beginner: [
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: 60, youtube: "bodyweight squat form beginner", tip: "Chest up rakho" },
      { name: "Leg Press", sets: 3, reps: "12", rest: 75, youtube: "leg press machine beginner", tip: "Knees cave in mat karo" },
      { name: "Lunges", sets: 3, reps: "10 each", rest: 60, youtube: "walking lunges form", tip: "90 degree angle" },
      { name: "Leg Extension", sets: 3, reps: "15", rest: 45, youtube: "leg extension machine quads", tip: "Quad isolation" },
      { name: "Calf Raises", sets: 3, reps: "20", rest: 45, youtube: "calf raises standing", tip: "Top pe pause karo" },
    ],
    Intermediate: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", rest: 120, youtube: "barbell squat proper form", tip: "Below parallel" },
      { name: "Romanian Deadlift", sets: 4, reps: "10", rest: 90, youtube: "romanian deadlift hamstrings", tip: "Hamstring stretch" },
      { name: "Hack Squat", sets: 3, reps: "10", rest: 90, youtube: "hack squat machine", tip: "Quad dominant" },
      { name: "Leg Curl", sets: 3, reps: "12", rest: 60, youtube: "leg curl hamstrings machine", tip: "Controlled negative" },
      { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: 75, youtube: "bulgarian split squat", tip: "Rear foot elevated" },
    ],
    Advanced: [
      { name: "Heavy Barbell Squat", sets: 5, reps: "5", rest: 180, youtube: "heavy squat powerlifting", tip: "Belt use karo" },
      { name: "Stiff Leg Deadlift", sets: 4, reps: "8", rest: 120, youtube: "stiff leg deadlift hamstrings", tip: "Max stretch" },
      { name: "Leg Press 1.5 Rep", sets: 4, reps: "10", rest: 90, youtube: "leg press 1.5 rep technique", tip: "TUT increase" },
      { name: "Walking Lunges Weighted", sets: 4, reps: "12 each", rest: 90, youtube: "weighted walking lunges", tip: "Dumbbells ya barbell" },
      { name: "Seated Calf Raises Heavy", sets: 5, reps: "12", rest: 60, youtube: "seated calf raise soleus", tip: "Soleus target" },
    ],
  },
  Core: {
    Beginner: [
      { name: "Plank", sets: 3, reps: "30 sec", rest: 45, youtube: "plank proper form beginner", tip: "Body straight line" },
      { name: "Crunches", sets: 3, reps: "15", rest: 45, youtube: "crunches abs beginner", tip: "Abs se uthao" },
      { name: "Leg Raises", sets: 3, reps: "12", rest: 45, youtube: "leg raises lower abs", tip: "Lower back press" },
      { name: "Mountain Climbers", sets: 3, reps: "20 each", rest: 45, youtube: "mountain climbers core exercise", tip: "Cardio + core" },
      { name: "Dead Bug", sets: 3, reps: "10 each", rest: 45, youtube: "dead bug core exercise", tip: "Neutral spine" },
    ],
    Intermediate: [
      { name: "Hanging Knee Raises", sets: 4, reps: "15", rest: 60, youtube: "hanging knee raises abs", tip: "Swing control karo" },
      { name: "Cable Crunches", sets: 4, reps: "15", rest: 60, youtube: "cable crunches abs", tip: "Abs se crunch" },
      { name: "Ab Wheel Rollout", sets: 3, reps: "10", rest: 60, youtube: "ab wheel rollout core", tip: "Knees se shuru" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: 45, youtube: "russian twists obliques", tip: "Rotation important" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", rest: 45, youtube: "hollow body hold gymnastics", tip: "Gymnastics move" },
    ],
    Advanced: [
      { name: "Dragon Flag", sets: 4, reps: "8", rest: 90, youtube: "dragon flag bruce lee exercise", tip: "Bruce Lee fav" },
      { name: "Toes to Bar", sets: 4, reps: "10", rest: 75, youtube: "toes to bar hanging abs", tip: "Full hip flexion" },
      { name: "Pallof Press", sets: 3, reps: "12 each", rest: 60, youtube: "pallof press anti rotation", tip: "Anti-rotation" },
      { name: "L-Sit Hold", sets: 3, reps: "20 sec", rest: 60, youtube: "l sit core exercise", tip: "Straight legs" },
      { name: "Weighted Plank", sets: 3, reps: "45 sec", rest: 60, youtube: "weighted plank advanced core", tip: "Plate on back" },
    ],
  },
  "Full Body": {
    Beginner: [
      { name: "Goblet Squat", sets: 3, reps: "12", rest: 60, youtube: "goblet squat form beginner", tip: "Heels flat" },
      { name: "Push Ups", sets: 3, reps: "10", rest: 60, youtube: "push ups proper form", tip: "Full body tension" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row back", tip: "Elbow up karo" },
      { name: "Hip Thrust", sets: 3, reps: "15", rest: 60, youtube: "hip thrust glutes beginner", tip: "Glutes squeeze" },
      { name: "Farmer Walk", sets: 3, reps: "30 sec", rest: 60, youtube: "farmer walk exercise", tip: "Grip strength" },
    ],
    Intermediate: [
      { name: "Deadlift", sets: 4, reps: "6-8", rest: 120, youtube: "deadlift form intermediate", tip: "Most complete exercise" },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "bench press form", tip: "Leg drive use karo" },
      { name: "Pull Ups", sets: 4, reps: "8", rest: 90, youtube: "pull ups back biceps", tip: "Dead hang start" },
      { name: "Overhead Press", sets: 3, reps: "10", rest: 90, youtube: "overhead press barbell", tip: "Core brace" },
      { name: "Dumbbell Lunges", sets: 3, reps: "10 each", rest: 75, youtube: "dumbbell walking lunges", tip: "Controlled descent" },
    ],
    Advanced: [
      { name: "Power Clean", sets: 5, reps: "3", rest: 180, youtube: "power clean olympic lifting", tip: "Triple extension" },
      { name: "Squat", sets: 4, reps: "5", rest: 180, youtube: "squat heavy advanced", tip: "360 brace" },
      { name: "Weighted Pull Ups", sets: 4, reps: "6", rest: 120, youtube: "weighted pull ups", tip: "Progressive overload" },
      { name: "Push Press", sets: 4, reps: "6", rest: 120, youtube: "push press barbell", tip: "Explosive hip drive" },
      { name: "KB Swing", sets: 4, reps: "15", rest: 90, youtube: "kettlebell swing hiit", tip: "Hip hinge not squat" },
    ],
  },
};

const storage = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

const MUSCLES = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Full Body"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const PLAN_OPTIONS = ["Rest Day", ...MUSCLES];
const BODY_PARTS = [
  { key: "weight", label: "Weight", unit: "kg", icon: "⚖️" },
  { key: "chest", label: "Chest", unit: "cm", icon: "💪" },
  { key: "waist", label: "Waist", unit: "cm", icon: "📏" },
  { key: "hips", label: "Hips", unit: "cm", icon: "📐" },
  { key: "arms", label: "Arms", unit: "cm", icon: "💪" },
  { key: "thighs", label: "Thighs", unit: "cm", icon: "🦵" },
];

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00ff88", accentDim: "#00ff8830", text: "#e8e8f0",
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff",
};

const DEFAULT_PLAN = {
  Mon: "Chest", Tue: "Back", Wed: "Shoulders", Thu: "Arms",
  Fri: "Legs", Sat: "Core", Sun: "Rest Day"
};

const MUSCLE_COLORS = {
  "Chest": "#ff6644", "Back": "#4488ff", "Shoulders": "#aa44ff",
  "Arms": "#ff44aa", "Legs": "#ffaa00", "Core": "#00ccff",
  "Full Body": "#00ff88", "Rest Day": "#333355"
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
        {timeLeft === 0 && <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.accent, marginBottom: 12, letterSpacing: 2 }}>🔥 REST COMPLETE!</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setTimeLeft(seconds); setRunning(true); }} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>🔄 Reset</button>
          <button onClick={onClose} style={{ flex: 1, background: C.accent, border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 15, letterSpacing: 1 }}>NEXT SET</button>
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

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); };

  // Get today's day key
  const getTodayKey = () => DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayKey = getTodayKey();
  const todayMuscle = weekPlan[todayKey];

  const handleGenerate = (muscle) => {
    const m = muscle || selectedMuscle;
    setLoading(true); setSets({}); setCompleted(false);
    setTimeout(() => {
      setSelectedMuscle(m);
      setWorkout(DEMO_WORKOUTS[m]?.[selectedLevel] || DEMO_WORKOUTS["Chest"][selectedLevel]);
      setScreen("workout"); setLoading(false);
    }, 800);
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
    setCompleted(true); showToast("Workout complete! 🔥 Keep crushing it!");
  };

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
        select { appearance: none; }
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
                <input type="number" value={prWeight} onChange={e => setPrWeight(e.target.value)} placeholder="e.g. 40" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 16, outline: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 6 }}>REPS DONE</div>
                <input type="number" value={prReps} onChange={e => setPrReps(e.target.value)} placeholder="e.g. 10" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 16, outline: "none" }} />
              </div>
            </div>
            {prs[prModal.exName] && <div style={{ background: C.surface, borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontFamily: "'Outfit'", fontSize: 12, color: C.muted, borderLeft: `3px solid ${C.yellow}` }}>🏆 Current PR: <span style={{ color: C.yellow }}>{prs[prModal.exName].weight}kg × {prs[prModal.exName].reps} reps</span></div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handlePrSkip} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>Skip</button>
              <button onClick={handlePrSave} style={{ flex: 2, background: C.accent, border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 1 }}>SAVE & REST ▶</button>
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
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideo)}`} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#ff0000", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 1 }}>▶ YOUTUBE PE DEKHO</a>
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
          {[["home","🏠","HOME"],["plan","📅","PLAN"],["body","📈","BODY"],["prs","🏆","PRs"],["settings","⚙️","ME"]].map(([s, icon, label]) => (
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
              {/* Today's Plan Banner */}
              {todayMuscle && todayMuscle !== "Rest Day" && (
                <div style={{ background: `${MUSCLE_COLORS[todayMuscle]}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle]}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 3 }}>📅 TODAY'S PLAN</div>
                    <div style={{ fontSize: 20, color: MUSCLE_COLORS[todayMuscle] }}>{todayMuscle} Day</div>
                  </div>
                  <button onClick={() => handleGenerate(todayMuscle)}
                    style={{ background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: 1 }}>
                    START ⚡
                  </button>
                </div>
              )}
              {todayMuscle === "Rest Day" && (
                <div style={{ background: "#33335522", border: `1px solid #33335566`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 24 }}>😴</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.muted, marginTop: 4 }}>Aaj Rest Day hai — recovery important hai!</div>
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

              {/* Week Grid */}
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 12, fontFamily: "'Outfit'" }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map((d, i) => {
                    const isToday = d === todayKey;
                    const hasLog = history.some(h => new Date(h.ts).getDay() === (i + 1) % 7);
                    const planned = weekPlan[d];
                    const color = MUSCLE_COLORS[planned] || C.muted;
                    return (
                      <div key={d} style={{ flex: 1, background: hasLog ? C.accentDim : `${color}11`, border: `1px solid ${isToday ? C.accent : hasLog ? C.accent + "44" : color + "44"}`, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: isToday ? C.accent : C.muted }}>{d}</div>
                        <div style={{ marginTop: 3, fontSize: 12 }}>{hasLog ? "✅" : isToday ? "🎯" : planned === "Rest Day" ? "😴" : "○"}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 8, color: color, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{planned === "Rest Day" ? "REST" : planned?.substring(0, 3).toUpperCase()}</div>
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
                  <div key={i} className="card-hover" style={{ background: C.card, border: `1px solid ${allDone ? C.accent + "44" : C.border}`, borderRadius: 12, padding: 16, marginBottom: 14, opacity: allDone ? 0.85 : 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17, color: allDone ? C.accent : C.text }}>{allDone && "✅ "}{ex.name}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 3 }}>{ex.sets} sets · {ex.reps} reps · Rest {ex.rest}s</div>
                      </div>
                      <button onClick={() => setActiveVideo(ex.youtube)} style={{ background: "#ff000022", border: "1px solid #ff000066", borderRadius: 8, padding: "5px 9px", cursor: "pointer", color: "#ff4444", fontSize: 12, fontFamily: "'Outfit'" }}>▶ Demo</button>
                    </div>
                    {pr && <div style={{ background: C.accentDim, borderRadius: 6, padding: "4px 10px", marginBottom: 8, fontFamily: "'Outfit'", fontSize: 12, color: C.accent, display: "inline-block" }}>🏆 PR: {pr.weight}kg × {pr.reps} reps</div>}
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

          {/* ── WEEKLY PLAN SCREEN ── */}
          {screen === "plan" && (
            <div className="animate-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 22 }}>WEEKLY PLAN</div>
                <button onClick={() => { setTempPlan({ ...weekPlan }); setEditingPlan(!editingPlan); }}
                  style={{ background: editingPlan ? C.red + "22" : C.accentDim, border: `1px solid ${editingPlan ? C.red + "44" : C.accent + "44"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: editingPlan ? C.red : C.accent, fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: 1 }}>
                  {editingPlan ? "CANCEL" : "✏️ EDIT"}
                </button>
              </div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>Apna weekly schedule set karo</div>

              {/* Today highlight */}
              <div style={{ background: `${MUSCLE_COLORS[todayMuscle] || C.muted}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle] || C.muted}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 3 }}>🎯 TODAY — {DAY_FULL[DAYS.indexOf(todayKey)]}</div>
                <div style={{ fontSize: 22, color: MUSCLE_COLORS[todayMuscle] || C.muted }}>{todayMuscle}</div>
                {todayMuscle !== "Rest Day" && (
                  <button onClick={() => handleGenerate(todayMuscle)} style={{ marginTop: 10, background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: 1 }}>⚡ START TODAY'S WORKOUT</button>
                )}
              </div>

              {/* Plan Days */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {DAYS.map((d, i) => {
                  const isToday = d === todayKey;
                  const muscle = editingPlan ? (tempPlan[d] || "Rest Day") : weekPlan[d];
                  const color = MUSCLE_COLORS[muscle] || C.muted;
                  const hasLog = history.some(h => new Date(h.ts).getDay() === (i + 1) % 7);
                  return (
                    <div key={d} style={{ background: C.card, border: `1px solid ${isToday ? C.accent : color + "33"}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: isToday ? C.accent : color }}>{d}</div>
                          {hasLog && <div style={{ fontSize: 10 }}>✅</div>}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{DAY_FULL[i]}</div>
                          {editingPlan ? (
                            <select value={tempPlan[d] || "Rest Day"} onChange={e => setTempPlan(p => ({ ...p, [d]: e.target.value }))}
                              style={{ background: C.surface, border: `1px solid ${color}55`, borderRadius: 6, padding: "4px 8px", color: color, fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: 1, outline: "none", cursor: "pointer", marginTop: 2 }}>
                              {PLAN_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background: C.surface, color: C.text }}>{opt}</option>)}
                            </select>
                          ) : (
                            <div style={{ fontSize: 16, color }}>{muscle}</div>
                          )}
                        </div>
                      </div>
                      {!editingPlan && muscle !== "Rest Day" && (
                        <button onClick={() => handleGenerate(muscle)} style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color, fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: 1 }}>GO ▶</button>
                      )}
                      {!editingPlan && muscle === "Rest Day" && <div style={{ fontSize: 20 }}>😴</div>}
                    </div>
                  );
                })}
              </div>

              {editingPlan && (
                <button onClick={savePlan} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 12, padding: "16px", cursor: "pointer", color: "#000", fontSize: 20, fontFamily: "'Bebas Neue'", letterSpacing: 2 }}>
                  💾 SAVE WEEKLY PLAN
                </button>
              )}
            </div>
          )}

          {/* BODY */}
          {screen === "body" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>BODY PROGRESS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{bodyLogs.length} entries logged</div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>📝 ADD TODAY'S MEASUREMENTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {BODY_PARTS.map(({ key, label, unit, icon }) => (
                    <div key={key}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 5 }}>{icon} {label} ({unit})</div>
                      <input type="number" step="0.1" value={bodyForm[key]} onChange={e => setBodyForm(p => ({ ...p, [key]: e.target.value }))} placeholder={`e.g. ${key === "weight" ? "70" : "85"}`} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
                    </div>
                  ))}
                </div>
                <button onClick={saveBodyLog} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 2 }}>📊 SAVE MEASUREMENTS</button>
              </div>
              {bodyLogs.length > 0 && (
                <>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {BODY_PARTS.map(({ key, label, icon }) => getChartData(key).length > 0 && (
                      <button key={key} onClick={() => setActiveChart(key)} style={{ background: activeChart === key ? C.accent : C.card, border: `1px solid ${activeChart === key ? C.accent : C.border}`, borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: activeChart === key ? "#000" : C.muted, fontSize: 12, fontFamily: "'Bebas Neue'", letterSpacing: 1 }}>{icon} {label}</button>
                    ))}
                  </div>
                  {(() => {
                    const bp = BODY_PARTS.find(b => b.key === activeChart);
                    const chartData = getChartData(activeChart);
                    const change = getChange(activeChart);
                    const latest = chartData[chartData.length - 1];
                    const first = chartData[0];
                    if (!chartData.length) return null;
                    return (
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 18, color: C.text }}>{bp.icon} {bp.label}</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 22, color: C.accent }}>{latest?.value} <span style={{ fontSize: 13, color: C.muted }}>{bp.unit}</span></div>
                          </div>
                          {change !== null && <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: change < 0 ? C.accent : change > 0 ? C.red : C.muted }}>{change > 0 ? "▲" : change < 0 ? "▼" : "—"} {Math.abs(change).toFixed(1)} {bp.unit}</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>from start</div>
                          </div>}
                        </div>
                        <MiniChart data={chartData} color={C.accent} height={70} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Start: {first?.date}</div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Latest: {latest?.date}</div>
                        </div>
                      </div>
                    );
                  })()}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    {BODY_PARTS.map(({ key, label, unit, icon }) => {
                      const chartData = getChartData(key); if (!chartData.length) return null;
                      const latest = chartData[chartData.length - 1]; const change = getChange(key);
                      return (
                        <div key={key} onClick={() => setActiveChart(key)} style={{ background: C.card, border: `1px solid ${activeChart === key ? C.accent + "66" : C.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{icon} {label}</div>
                          <div style={{ fontSize: 20, color: C.accent, marginTop: 2 }}>{latest.value}<span style={{ fontSize: 11, color: C.muted }}>{unit}</span></div>
                          {change !== null && <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: change < 0 ? C.accent : change > 0 ? C.red : C.muted, marginTop: 2 }}>{change > 0 ? "▲" : change < 0 ? "▼" : "—"}{Math.abs(change).toFixed(1)}</div>}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {bodyLogs.length === 0 && <div style={{ textAlign: "center", padding: "30px 20px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 48 }}>📈</div><div style={{ marginTop: 12 }}>Upar form fill karo!</div></div>}
            </div>
          )}

          {/* PRs */}
          {screen === "prs" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>PERSONAL RECORDS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{Object.keys(prs).length} exercises logged</div>
              {Object.keys(prs).length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 48 }}>🏆</div><div style={{ marginTop: 12 }}>Workout karo aur weight log karo!</div></div>
              ) : Object.entries(prs).map(([name, pr]) => (
                <div key={name} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div><div style={{ fontSize: 16, color: C.text }}>{name}</div><div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 2 }}>{pr.date}</div></div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, color: C.accent }}>{pr.weight}<span style={{ fontSize: 13, color: C.muted }}>kg</span></div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>× {pr.reps} reps</div>
                    </div>
                  </div>
                </div>
              ))}
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
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 12 }}>FEATURES</div>
                {[["📅","Weekly Planner","Mon-Sun ka workout schedule set karo"],["💪","7 Muscle Groups","Chest, Back, Shoulders, Arms, Legs, Core, Full Body"],["⏱️","Rest Timer","Har set ke baad automatic countdown + beep"],["🏆","PR Tracker","Har exercise ka personal record track karo"],["📈","Body Progress","Weight & measurements ke charts dekho"],["💾","Auto Save","Sab kuch automatically save hota hai"]].map(([icon,title,desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div><div style={{ fontSize: 14, color: C.text }}>{title}</div><div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { if (window.confirm("Saara data delete hoga. Sure?")) { localStorage.clear(); setHistory([]); setStreak(0); setMemberName(""); setNameInput(""); setPrs({}); setBodyLogs([]); setWeekPlan(DEFAULT_PLAN); showToast("Data cleared!", "error"); } }} style={{ width: "100%", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.red, fontFamily: "'Outfit'", fontSize: 14 }}>🗑️ Reset All Data</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
