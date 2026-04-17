import { useState, useEffect, useRef } from "react";

const DEMO_WORKOUTS = {
  Chest: {
    Beginner: [
      { name: "Push Ups", sets: 3, reps: "10-12", rest: 60, youtube: "push ups for beginners", tip: "Haath shoulder-width par rakho, body straight rehni chahiye" },
      { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell chest press beginner", tip: "Elbows 45 degree angle pe rakho" },
      { name: "Incline Push Ups", sets: 3, reps: "12-15", rest: 45, youtube: "incline push ups tutorial", tip: "Bench ya wall ka use karo" },
      { name: "Dumbbell Flyes", sets: 3, reps: "12", rest: 60, youtube: "dumbbell flyes beginner", tip: "Arms slightly bent rakho, chest stretch feel karo" },
      { name: "Cable Crossover", sets: 3, reps: "12-15", rest: 60, youtube: "cable crossover chest exercise", tip: "Chest squeeze karo movement ke end mein" },
    ],
    Intermediate: [
      { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bench press form", tip: "Feet flat on floor, arch natural rakho" },
      { name: "Incline Dumbbell Press", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell press", tip: "30-45 degree incline best hai upper chest ke liye" },
      { name: "Chest Dips", sets: 3, reps: "10-12", rest: 75, youtube: "chest dips tutorial", tip: "Thoda aage jhuko chest ko target karne ke liye" },
      { name: "Pec Deck Machine", sets: 3, reps: "12-15", rest: 60, youtube: "pec deck machine workout", tip: "Full range of motion use karo" },
      { name: "Push Up Variations", sets: 3, reps: "15", rest: 60, youtube: "push up variations chest", tip: "Wide grip, diamond, decline mix karo" },
    ],
    Advanced: [
      { name: "Heavy Barbell Bench", sets: 5, reps: "5-6", rest: 120, youtube: "heavy bench press technique", tip: "Spotter rakho heavy sets ke liye" },
      { name: "Weighted Dips", sets: 4, reps: "8-10", rest: 90, youtube: "weighted dips chest", tip: "Belt se weight attach karo" },
      { name: "Decline Bench Press", sets: 4, reps: "8", rest: 90, youtube: "decline bench press", tip: "Lower chest pe focus karo" },
      { name: "Cable Flyes", sets: 4, reps: "12-15", rest: 60, youtube: "cable flyes chest workout", tip: "Slow eccentric, explosive concentric" },
      { name: "Plyometric Push Ups", sets: 3, reps: "10", rest: 90, youtube: "plyometric push ups", tip: "Explosive power develop karta hai" },
    ],
  },
  Back: {
    Beginner: [
      { name: "Lat Pulldown", sets: 3, reps: "12", rest: 60, youtube: "lat pulldown beginner form", tip: "Chest up, shoulder blades squeeze karo" },
      { name: "Seated Cable Row", sets: 3, reps: "12", rest: 60, youtube: "seated cable row tutorial", tip: "Back straight rakho, elbows body ke paas" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row beginner", tip: "Elbow ceiling ki taraf pull karo" },
      { name: "Superman Exercise", sets: 3, reps: "15", rest: 45, youtube: "superman back exercise", tip: "Lower back strengthen karta hai" },
      { name: "Resistance Band Row", sets: 3, reps: "15", rest: 45, youtube: "resistance band row back", tip: "Full stretch aur squeeze dono important hain" },
    ],
    Intermediate: [
      { name: "Pull Ups", sets: 4, reps: "8-10", rest: 90, youtube: "pull ups back workout", tip: "Dead hang se shuru karo, chest bar tak lao" },
      { name: "Barbell Row", sets: 4, reps: "8-10", rest: 90, youtube: "barbell bent over row", tip: "45 degree angle, lower back neutral" },
      { name: "T-Bar Row", sets: 3, reps: "10", rest: 75, youtube: "t bar row back exercise", tip: "Chest pad pe lean karo proper form ke liye" },
      { name: "Wide Grip Pulldown", sets: 3, reps: "12", rest: 60, youtube: "wide grip lat pulldown", tip: "Wide grip V-taper banata hai" },
      { name: "Face Pulls", sets: 3, reps: "15", rest: 60, youtube: "face pulls rear delt", tip: "Rear delts aur rhomboids target hote hain" },
    ],
    Advanced: [
      { name: "Weighted Pull Ups", sets: 5, reps: "6-8", rest: 120, youtube: "weighted pull ups back", tip: "Belt se weight lagao progressive overload ke liye" },
      { name: "Deadlift", sets: 4, reps: "5", rest: 180, youtube: "deadlift proper form", tip: "King of all exercises — form pe dhyan do" },
      { name: "Meadows Row", sets: 4, reps: "8-10", rest: 90, youtube: "meadows row back exercise", tip: "Unilateral movement, imbalance fix karta hai" },
      { name: "Straight Arm Pulldown", sets: 3, reps: "15", rest: 60, youtube: "straight arm pulldown lats", tip: "Lats ko isolate karta hai perfectly" },
      { name: "Rack Pulls", sets: 4, reps: "6", rest: 120, youtube: "rack pulls upper back", tip: "Upper back thickness ke liye best" },
    ],
  },
  Shoulders: {
    Beginner: [
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "12", rest: 60, youtube: "dumbbell shoulder press beginner", tip: "Elbows 90 degree pe, don't flare out" },
      { name: "Lateral Raises", sets: 3, reps: "15", rest: 45, youtube: "lateral raises form tutorial", tip: "Slightly bent elbows, pour the jug motion" },
      { name: "Front Raises", sets: 3, reps: "12", rest: 45, youtube: "front raises shoulders", tip: "Shoulder height tak hi uthao" },
      { name: "Arnold Press", sets: 3, reps: "12", rest: 60, youtube: "arnold press dumbbell", tip: "Rotation se full shoulder coverage milti hai" },
      { name: "Rear Delt Flyes", sets: 3, reps: "15", rest: 45, youtube: "rear delt flyes bent over", tip: "Hinge forward, elbows wide rakho" },
    ],
    Intermediate: [
      { name: "Barbell Overhead Press", sets: 4, reps: "8-10", rest: 90, youtube: "barbell overhead press form", tip: "Core tight, bar chin ke saath move karo" },
      { name: "Cable Lateral Raises", sets: 4, reps: "15", rest: 60, youtube: "cable lateral raises", tip: "Constant tension cable deta hai" },
      { name: "Upright Row", sets: 3, reps: "12", rest: 60, youtube: "upright row shoulders", tip: "Wide grip use karo shoulder safety ke liye" },
      { name: "Machine Shoulder Press", sets: 3, reps: "12", rest: 75, youtube: "machine shoulder press", tip: "Controlled movement, no jerking" },
      { name: "Band Pull Aparts", sets: 3, reps: "20", rest: 45, youtube: "band pull aparts shoulders", tip: "Posture aur rear delt ke liye great" },
    ],
    Advanced: [
      { name: "Push Press", sets: 5, reps: "5", rest: 120, youtube: "push press barbell", tip: "Leg drive se help lo heavy weight ke liye" },
      { name: "Seated DB Press", sets: 4, reps: "10", rest: 90, youtube: "seated dumbbell press shoulders", tip: "Seated position cheating rokta hai" },
      { name: "Cable Y Raises", sets: 4, reps: "15", rest: 60, youtube: "cable y raise shoulders", tip: "All 3 heads target hote hain" },
      { name: "Single Arm Cable Press", sets: 3, reps: "12 each", rest: 75, youtube: "single arm cable shoulder press", tip: "Core stability challenge hota hai" },
      { name: "Face Pulls Heavy", sets: 4, reps: "12", rest: 60, youtube: "heavy face pulls shoulders", tip: "External rotation important hai" },
    ],
  },
  Arms: {
    Beginner: [
      { name: "Dumbbell Bicep Curl", sets: 3, reps: "12", rest: 60, youtube: "dumbbell bicep curl beginner", tip: "Elbows body ke saath rakho, swing mat karo" },
      { name: "Tricep Pushdown", sets: 3, reps: "12", rest: 60, youtube: "tricep pushdown cable", tip: "Elbows fixed, full extension karo" },
      { name: "Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "hammer curl biceps", tip: "Brachialis aur forearms bhi kaam karte hain" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: 60, youtube: "overhead tricep extension dumbbell", tip: "Long head of tricep target hota hai" },
      { name: "Concentration Curl", sets: 3, reps: "12 each", rest: 45, youtube: "concentration curl bicep", tip: "Slow aur controlled movement karo" },
    ],
    Intermediate: [
      { name: "Barbell Curl", sets: 4, reps: "10", rest: 75, youtube: "barbell curl biceps form", tip: "Supinated grip, full range of motion" },
      { name: "Skull Crushers", sets: 4, reps: "10", rest: 75, youtube: "skull crushers triceps", tip: "Bar forehead ke paas lao, not on it!" },
      { name: "Preacher Curl", sets: 3, reps: "12", rest: 60, youtube: "preacher curl machine", tip: "Cheating nahi ho sakti — pure isolation" },
      { name: "Close Grip Bench", sets: 3, reps: "10", rest: 90, youtube: "close grip bench press triceps", tip: "Hands shoulder-width, triceps ko feel karo" },
      { name: "Cable Curl", sets: 3, reps: "15", rest: 60, youtube: "cable curl biceps", tip: "Constant tension great pump deta hai" },
    ],
    Advanced: [
      { name: "21s Bicep Curl", sets: 4, reps: "21", rest: 90, youtube: "21s bicep curl technique", tip: "7 bottom, 7 top, 7 full — brutal pump" },
      { name: "Weighted Dips Tricep", sets: 4, reps: "8", rest: 90, youtube: "tricep dips weighted", tip: "Upright posture, triceps focus" },
      { name: "Incline DB Curl", sets: 4, reps: "10", rest: 75, youtube: "incline dumbbell curl", tip: "Full stretch position se curl" },
      { name: "French Press", sets: 4, reps: "10", rest: 75, youtube: "french press triceps EZ bar", tip: "EZ bar se wrist strain kam hota hai" },
      { name: "Cable Hammer Curl", sets: 3, reps: "12", rest: 60, youtube: "cable hammer curl rope", tip: "Rope attachment se brachialis hit hota hai" },
    ],
  },
  Legs: {
    Beginner: [
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: 60, youtube: "bodyweight squat form beginner", tip: "Knees toes ke upar, chest up rakho" },
      { name: "Leg Press", sets: 3, reps: "12", rest: 75, youtube: "leg press machine beginner", tip: "Feet shoulder-width, knees cave in mat karo" },
      { name: "Lunges", sets: 3, reps: "10 each", rest: 60, youtube: "walking lunges form", tip: "90 degree angle dono knees pe" },
      { name: "Leg Extension", sets: 3, reps: "15", rest: 45, youtube: "leg extension machine quads", tip: "Quad isolation ke liye best" },
      { name: "Calf Raises", sets: 3, reps: "20", rest: 45, youtube: "calf raises standing", tip: "Top pe pause karo, full stretch neeche" },
    ],
    Intermediate: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", rest: 120, youtube: "barbell squat proper form", tip: "Depth parallel ya below parallel" },
      { name: "Romanian Deadlift", sets: 4, reps: "10", rest: 90, youtube: "romanian deadlift hamstrings", tip: "Hip hinge karo, hamstring stretch feel karo" },
      { name: "Hack Squat", sets: 3, reps: "10", rest: 90, youtube: "hack squat machine", tip: "Quad dominant movement" },
      { name: "Leg Curl", sets: 3, reps: "12", rest: 60, youtube: "leg curl hamstrings machine", tip: "Hamstring focus, controlled negative" },
      { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: 75, youtube: "bulgarian split squat", tip: "Rear foot elevated, front foot forward" },
    ],
    Advanced: [
      { name: "Heavy Barbell Squat", sets: 5, reps: "5", rest: 180, youtube: "heavy squat powerlifting", tip: "Belt aur wraps use karo heavy sets mein" },
      { name: "Stiff Leg Deadlift", sets: 4, reps: "8", rest: 120, youtube: "stiff leg deadlift hamstrings", tip: "Maximum hamstring stretch ke liye" },
      { name: "Leg Press 1.5 Rep", sets: 4, reps: "10", rest: 90, youtube: "leg press 1.5 rep technique", tip: "TUT increase karta hai" },
      { name: "Walking Lunges Weighted", sets: 4, reps: "12 each", rest: 90, youtube: "weighted walking lunges", tip: "Dumbbells ya barbell dono kaam karte hain" },
      { name: "Seated Calf Raises Heavy", sets: 5, reps: "12", rest: 60, youtube: "seated calf raise soleus", tip: "Soleus target hota hai bent knee se" },
    ],
  },
  Core: {
    Beginner: [
      { name: "Plank", sets: 3, reps: "30 sec", rest: 45, youtube: "plank proper form beginner", tip: "Body straight line, hips up ya down mat karo" },
      { name: "Crunches", sets: 3, reps: "15", rest: 45, youtube: "crunches abs beginner", tip: "Neck pull mat karo, abs se uthao" },
      { name: "Leg Raises", sets: 3, reps: "12", rest: 45, youtube: "leg raises lower abs", tip: "Lower back floor pe press karo" },
      { name: "Mountain Climbers", sets: 3, reps: "20 each", rest: 45, youtube: "mountain climbers core exercise", tip: "Cardio aur core dono ek saath" },
      { name: "Dead Bug", sets: 3, reps: "10 each", rest: 45, youtube: "dead bug core exercise", tip: "Lower back neutral spine maintain karo" },
    ],
    Intermediate: [
      { name: "Hanging Knee Raises", sets: 4, reps: "15", rest: 60, youtube: "hanging knee raises abs", tip: "Swing control karo, slow aur controlled" },
      { name: "Cable Crunches", sets: 4, reps: "15", rest: 60, youtube: "cable crunches abs", tip: "Hips fixed, abs se crunch karo" },
      { name: "Ab Wheel Rollout", sets: 3, reps: "10", rest: 60, youtube: "ab wheel rollout core", tip: "Knees se shuru karo, phir standing" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: 45, youtube: "russian twists obliques", tip: "Obliques ke liye rotation important hai" },
      { name: "Hollow Body Hold", sets: 3, reps: "30 sec", rest: 45, youtube: "hollow body hold gymnastics", tip: "Gymnastics movement — core strength" },
    ],
    Advanced: [
      { name: "Dragon Flag", sets: 4, reps: "8", rest: 90, youtube: "dragon flag bruce lee exercise", tip: "Bruce Lee ka favourite — extreme core" },
      { name: "Toes to Bar", sets: 4, reps: "10", rest: 75, youtube: "toes to bar hanging abs", tip: "Full hip flexion, controlled swing" },
      { name: "Pallof Press", sets: 3, reps: "12 each", rest: 60, youtube: "pallof press anti rotation", tip: "Anti-rotation movement — functional strength" },
      { name: "L-Sit Hold", sets: 3, reps: "20 sec", rest: 60, youtube: "l sit core exercise", tip: "Compressed hip flexors, straight legs" },
      { name: "Weighted Plank", sets: 3, reps: "45 sec", rest: 60, youtube: "weighted plank advanced core", tip: "Weight plate back pe rakho" },
    ],
  },
  "Full Body": {
    Beginner: [
      { name: "Goblet Squat", sets: 3, reps: "12", rest: 60, youtube: "goblet squat form beginner", tip: "Chest up, heels flat, depth achieve karo" },
      { name: "Push Ups", sets: 3, reps: "10", rest: 60, youtube: "push ups proper form", tip: "Full body tension maintain karo" },
      { name: "Dumbbell Row", sets: 3, reps: "10 each", rest: 60, youtube: "dumbbell row back", tip: "Flat back, elbow up karo" },
      { name: "Hip Thrust", sets: 3, reps: "15", rest: 60, youtube: "hip thrust glutes beginner", tip: "Glutes squeeze at top, chin tuck" },
      { name: "Farmer Walk", sets: 3, reps: "30 sec", rest: 60, youtube: "farmer walk exercise", tip: "Grip strength aur full body conditioning" },
    ],
    Intermediate: [
      { name: "Deadlift", sets: 4, reps: "6-8", rest: 120, youtube: "deadlift form intermediate", tip: "Hinge pattern — most complete exercise" },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: 90, youtube: "bench press form", tip: "Leg drive use karo, arch natural" },
      { name: "Pull Ups", sets: 4, reps: "8", rest: 90, youtube: "pull ups back biceps", tip: "Dead hang start, chin over bar" },
      { name: "Overhead Press", sets: 3, reps: "10", rest: 90, youtube: "overhead press barbell", tip: "Core brace karo, no lower back arch" },
      { name: "Dumbbell Lunges", sets: 3, reps: "10 each", rest: 75, youtube: "dumbbell walking lunges", tip: "Controlled descent, knee tracking" },
    ],
    Advanced: [
      { name: "Power Clean", sets: 5, reps: "3", rest: 180, youtube: "power clean olympic lifting", tip: "Triple extension — ankles, knees, hips" },
      { name: "Squat", sets: 4, reps: "5", rest: 180, youtube: "squat heavy advanced", tip: "Brace 360 degrees, push floor away" },
      { name: "Weighted Pull Ups", sets: 4, reps: "6", rest: 120, youtube: "weighted pull ups", tip: "Progressive overload key hai" },
      { name: "Push Press", sets: 4, reps: "6", rest: 120, youtube: "push press barbell", tip: "Explosive hip drive, lock out overhead" },
      { name: "KB Swing", sets: 4, reps: "15", rest: 90, youtube: "kettlebell swing hiit", tip: "Hip hinge not squat — power from hips" },
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
  purple: "#aa44ff",
};

// ── MINI LINE CHART ───────────────────────────────────────────────────────────
function MiniChart({ data, color = C.accent, height = 60 }) {
  if (!data || data.length < 2) return (
    <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: "'Outfit'", fontSize: 12 }}>
      Add more entries to see chart
    </div>
  );
  const vals = data.map(d => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const w = 280; const h = height;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {vals.map((v, i) => {
        const x = (i / (vals.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 10) - 5;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
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

  const pct = (timeLeft / seconds) * 100;
  const r = 54; const circ = 2 * Math.PI * r;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 32, textAlign: "center", width: 280, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 2, color: C.muted, marginBottom: 20 }}>REST TIMER</div>
        <div style={{ position: "relative", width: 130, height: 130, margin: "0 auto 20px" }}>
          <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="65" cy="65" r={r} fill="none" stroke={C.border} strokeWidth="8" />
            <circle cx="65" cy="65" r={r} fill="none" stroke={timeLeft <= 5 ? C.red : C.accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(pct / 100) * circ} ${circ}`} style={{ transition: "stroke-dasharray 1s linear" }} />
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

  // Body Progress State
  const [bodyLogs, setBodyLogs] = useState(() => storage.get("ft_body") || []);
  const [bodyForm, setBodyForm] = useState({ weight: "", chest: "", waist: "", hips: "", arms: "", thighs: "" });
  const [activeChart, setActiveChart] = useState("weight");

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); };

  const handleGenerate = () => {
    setLoading(true); setSets({}); setCompleted(false);
    setTimeout(() => { setWorkout(DEMO_WORKOUTS[selectedMuscle][selectedLevel]); setScreen("workout"); setLoading(false); }, 1000);
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
      const isNew = !existing || newEntry.weight > existing.weight || (newEntry.weight === existing.weight && newEntry.reps > existing.reps);
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

  const getChange = (key) => {
    const data = getChartData(key);
    if (data.length < 2) return null;
    const diff = data[data.length - 1].value - data[0].value;
    return diff;
  };

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
        input:focus { border-color: ${C.accent} !important; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(${C.border}22 1px, transparent 1px), linear-gradient(90deg, ${C.border}22 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -200, right: -200, width: 500, height: 500, background: `radial-gradient(circle, ${C.accent}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? C.red : C.accent, color: toast.type === "error" ? "#fff" : "#000", padding: "10px 20px", borderRadius: 8, fontFamily: "'Outfit'", fontWeight: 600, fontSize: 14, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>{toast.msg}</div>}
      {timer && <RestTimer seconds={timer.seconds} onClose={() => setTimer(null)} />}

      {/* PR Modal */}
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
          {[["home","🏠","HOME"],["body","📈","BODY"],["prs","🏆","PRs"],["history","📊","LOG"],["settings","⚙️","ME"]].map(([s, icon, label]) => (
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
              <button onClick={handleGenerate} disabled={loading} style={{ width: "100%", background: loading ? C.border : C.accent, border: "none", borderRadius: 12, padding: "18px", cursor: loading ? "not-allowed" : "pointer", color: "#000", fontSize: 22, fontFamily: "'Bebas Neue'", letterSpacing: 3, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {loading ? (<><div style={{ width: 20, height: 20, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />LOADING...</>) : "⚡ GENERATE TODAY'S WORKOUT"}
              </button>
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 12, fontFamily: "'Outfit'" }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map((d, i) => {
                    const today = new Date().getDay(); const dayMap = [6, 0, 1, 2, 3, 4, 5];
                    const isToday = dayMap[i] === (today === 0 ? 6 : today - 1);
                    const hasLog = history.some(h => new Date(h.ts).getDay() === (i + 1) % 7);
                    return (
                      <div key={d} style={{ flex: 1, background: hasLog ? C.accentDim : C.card, border: `1px solid ${isToday ? C.accent : hasLog ? C.accent + "44" : C.border}`, borderRadius: 8, padding: "10px 4px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: isToday ? C.accent : C.muted }}>{d}</div>
                        <div style={{ marginTop: 4, fontSize: 14 }}>{hasLog ? "✅" : isToday ? "🎯" : "○"}</div>
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

          {/* ── BODY PROGRESS SCREEN ── */}
          {screen === "body" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>BODY PROGRESS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{bodyLogs.length} entries logged</div>

              {/* Input Form */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14, letterSpacing: 1 }}>📝 ADD TODAY'S MEASUREMENTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {BODY_PARTS.map(({ key, label, unit, icon }) => (
                    <div key={key}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 5 }}>{icon} {label} ({unit})</div>
                      <input type="number" step="0.1" value={bodyForm[key]} onChange={e => setBodyForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={`e.g. ${key === "weight" ? "70" : "85"}`}
                        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
                    </div>
                  ))}
                </div>
                <button onClick={saveBodyLog} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 2 }}>
                  📊 SAVE MEASUREMENTS
                </button>
              </div>

              {/* Charts */}
              {bodyLogs.length > 0 && (
                <>
                  {/* Metric Selector */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {BODY_PARTS.map(({ key, label, icon }) => {
                      const chartData = getChartData(key);
                      if (chartData.length === 0) return null;
                      return (
                        <button key={key} onClick={() => setActiveChart(key)}
                          style={{ background: activeChart === key ? C.accent : C.card, border: `1px solid ${activeChart === key ? C.accent : C.border}`, borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: activeChart === key ? "#000" : C.muted, fontSize: 12, fontFamily: "'Bebas Neue'", letterSpacing: 1 }}>
                          {icon} {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Chart Card */}
                  {(() => {
                    const bp = BODY_PARTS.find(b => b.key === activeChart);
                    const chartData = getChartData(activeChart);
                    const change = getChange(activeChart);
                    const latest = chartData[chartData.length - 1];
                    const first = chartData[0];
                    if (chartData.length === 0) return null;
                    return (
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 18, color: C.text }}>{bp.icon} {bp.label}</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 22, color: C.accent, lineHeight: 1.2 }}>{latest?.value} <span style={{ fontSize: 13, color: C.muted }}>{bp.unit}</span></div>
                          </div>
                          {change !== null && (
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: change < 0 ? C.accent : change > 0 ? C.red : C.muted }}>
                                {change > 0 ? "▲" : change < 0 ? "▼" : "—"} {Math.abs(change).toFixed(1)} {bp.unit}
                              </div>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>from start</div>
                            </div>
                          )}
                        </div>
                        <MiniChart data={chartData} color={C.accent} height={70} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Start: {first?.date}</div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Latest: {latest?.date}</div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Stats Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    {BODY_PARTS.map(({ key, label, unit, icon }) => {
                      const chartData = getChartData(key);
                      if (chartData.length === 0) return null;
                      const latest = chartData[chartData.length - 1];
                      const change = getChange(key);
                      return (
                        <div key={key} onClick={() => setActiveChart(key)} style={{ background: C.card, border: `1px solid ${activeChart === key ? C.accent + "66" : C.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{icon} {label}</div>
                          <div style={{ fontSize: 20, color: C.accent, marginTop: 2 }}>{latest.value}<span style={{ fontSize: 11, color: C.muted }}>{unit}</span></div>
                          {change !== null && <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: change < 0 ? C.accent : change > 0 ? C.red : C.muted, marginTop: 2 }}>{change > 0 ? "▲" : change < 0 ? "▼" : "—"}{Math.abs(change).toFixed(1)}</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Logs */}
                  <div style={{ fontSize: 14, color: C.muted, letterSpacing: 2, marginBottom: 10, fontFamily: "'Outfit'" }}>RECENT ENTRIES</div>
                  {bodyLogs.slice(0, 5).map((log, i) => (
                    <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 8 }}>{log.date}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {BODY_PARTS.map(({ key, label, unit, icon }) => log[key] != null && (
                          <div key={key} style={{ background: C.surface, borderRadius: 6, padding: "4px 10px", fontFamily: "'Outfit'", fontSize: 12 }}>
                            <span style={{ color: C.muted }}>{icon} </span>
                            <span style={{ color: C.text }}>{log[key]}{unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {bodyLogs.length === 0 && (
                <div style={{ textAlign: "center", padding: "30px 20px", color: C.muted, fontFamily: "'Outfit'" }}>
                  <div style={{ fontSize: 48 }}>📈</div>
                  <div style={{ marginTop: 12, fontSize: 15 }}>Koi entry nahi hai abhi!</div>
                  <div style={{ marginTop: 8, fontSize: 13 }}>Upar form fill karo apna pehla measurement add karne ke liye</div>
                </div>
              )}
            </div>
          )}

          {/* PRs */}
          {screen === "prs" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>PERSONAL RECORDS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{Object.keys(prs).length} exercises logged</div>
              {Object.keys(prs).length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted, fontFamily: "'Outfit'" }}>
                  <div style={{ fontSize: 48 }}>🏆</div>
                  <div style={{ marginTop: 12 }}>Workout karo aur sets complete karte waqt weight log karo</div>
                </div>
              ) : Object.entries(prs).map(([name, pr]) => (
                <div key={name} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 16, color: C.text }}>{name}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 2 }}>{pr.date}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, color: C.accent }}>{pr.weight}<span style={{ fontSize: 13, color: C.muted }}>kg</span></div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>× {pr.reps} reps</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HISTORY */}
          {screen === "history" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>WORKOUT LOG</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{history.length} workouts · 🔥 {streak} streak</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[["💪","TOTAL",history.length],["🔥","STREAK",streak],["📅","THIS WEEK",history.filter(h=>Date.now()-h.ts<7*86400000).length]].map(([icon,label,val]) => (
                  <div key={label} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 22 }}>{icon}</div>
                    <div style={{ fontSize: 24, color: C.accent }}>{val}</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>{label}</div>
                  </div>
                ))}
              </div>
              {history.length === 0 ? <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 40 }}>📋</div><div style={{ marginTop: 12 }}>No workouts yet!</div></div>
                : history.map((h, i) => (
                  <div key={i} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 16, color: C.accent }}>{h.muscle} DAY</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{h.level} · {h.exercises} exercises</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{h.date}</div>
                      <div style={{ fontSize: 18 }}>✅</div>
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
                {[["💪","7 Muscle Groups","Chest, Back, Shoulders, Arms, Legs, Core, Full Body"],["⏱️","Rest Timer","Har set ke baad automatic countdown + beep"],["🏆","PR Tracker","Har exercise ka personal record track karo"],["📈","Body Progress","Weight & measurements ke charts dekho"],["💾","Auto Save","Sab kuch automatically save hota hai"]].map(([icon,title,desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div><div style={{ fontSize: 14, color: C.text }}>{title}</div><div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { if (window.confirm("Saara data delete hoga. Sure?")) { localStorage.clear(); setHistory([]); setStreak(0); setMemberName(""); setNameInput(""); setPrs({}); setBodyLogs([]); showToast("Data cleared!", "error"); } }} style={{ width: "100%", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.red, fontFamily: "'Outfit'", fontSize: 14 }}>🗑️ Reset All Data</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
