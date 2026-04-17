import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification
} from "firebase/auth";

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

const WORKOUT_BURN = {
  Chest: { Beginner: 200, Intermediate: 280, Advanced: 360 },
  Back: { Beginner: 220, Intermediate: 300, Advanced: 390 },
  Shoulders: { Beginner: 180, Intermediate: 250, Advanced: 320 },
  Arms: { Beginner: 150, Intermediate: 200, Advanced: 260 },
  Legs: { Beginner: 280, Intermediate: 380, Advanced: 480 },
  Core: { Beginner: 160, Intermediate: 220, Advanced: 290 },
  "Full Body": { Beginner: 300, Intermediate: 420, Advanced: 550 },
};

const MUSCLES = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Full Body"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_PLAN = { Mon: "Chest", Tue: "Back", Wed: "Shoulders", Thu: "Arms", Fri: "Legs", Sat: "Core", Sun: "Rest Day" };
const MUSCLE_COLORS = { "Chest": "#ff6644", "Back": "#4488ff", "Shoulders": "#aa44ff", "Arms": "#ff44aa", "Legs": "#ffaa00", "Core": "#00ccff", "Full Body": "#00ff88", "Rest Day": "#333355" };

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00ff88", accentDim: "#00ff8830", text: "#e8e8f0",
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff", orange: "#ff8844",
};

const userStorage = {
  get: (uid, k) => { try { return JSON.parse(localStorage.getItem(`ft_${uid}_${k}`)) } catch { return null } },
  set: (uid, k, v) => localStorage.setItem(`ft_${uid}_${k}`, JSON.stringify(v)),
};

const FIREBASE_ERRORS = {
  "auth/email-already-in-use": "Yeh email pehle se registered hai!",
  "auth/invalid-email": "Valid email daalo",
  "auth/weak-password": "Password kam se kam 6 characters ka ho",
  "auth/user-not-found": "Account nahi mila",
  "auth/wrong-password": "Galat password!",
  "auth/invalid-credential": "Email ya password galat hai",
  "auth/requires-recent-login": "Security ke liye pehle logout karke dobara login karo",
  "auth/too-many-requests": "Bahut zyada attempts — thodi der baad try karo",
  "auth/email-already-exists": "Yeh email pehle se use ho rahi hai",
};

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

// ── INPUT FIELD COMPONENT ─────────────────────────────────────────────────────
function InputField({ label, type = "text", value, onChange, placeholder, note }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none" }} />
      {note && <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 4 }}>{note}</div>}
    </div>
  );
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "signup") {
        if (!name.trim()) { setError("Naam daalo!"); setLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        await sendEmailVerification(cred.user);
        onLogin(cred.user);
      } else if (mode === "login") {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        onLogin(cred.user);
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setSuccess(`Password reset email bhej diya! ${email} check karo 📧`);
        setLoading(false); return;
      }
    } catch (e) {
      setError(FIREBASE_ERRORS[e.code] || "Kuch gadbad hui — try again");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Bebas Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        input:focus { border-color: ${C.accent} !important; outline: none; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(${C.border}22 1px, transparent 1px), linear-gradient(90deg, ${C.border}22 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -100, left: "50%", transform: "translateX(-50%)", width: 500, height: 300, background: `radial-gradient(circle, ${C.accent}07 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400, animation: "slideUp 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, letterSpacing: 4, color: C.accent, lineHeight: 1 }}>FITTRACK</div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.muted, marginTop: 6 }}>
            {mode === "forgot" ? "🔑 Password Reset" : "Your Personal Gym Companion 💪"}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>

          {mode !== "forgot" && (
            <div style={{ display: "flex", gap: 6, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4 }}>
              {[["login","🔐 LOGIN"],["signup","🚀 SIGN UP"]].map(([m, l]) => (
                <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }} style={{ flex: 1, background: mode === m ? C.accent : "transparent", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", color: mode === m ? "#000" : C.muted, fontFamily: "'Bebas Neue'", fontSize: 15, letterSpacing: 1, transition: "all 0.2s" }}>{l}</button>
              ))}
            </div>
          )}

          {mode === "forgot" && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 20, color: C.accent, marginBottom: 8 }}>PASSWORD RESET</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>Apna registered email daalo — reset link bhej denge</div>
            </div>
          )}

          {mode === "signup" && <InputField label="FULL NAME" value={name} onChange={setName} placeholder="Apna naam daalo" />}
          <InputField label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="email@example.com" />
          {mode !== "forgot" && <InputField label="PASSWORD" type="password" value={password} onChange={setPassword} placeholder="Min 6 characters" note={mode === "signup" ? "Kam se kam 6 characters" : ""} />}

          {error && <div style={{ background: `${C.red}22`, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Outfit'", fontSize: 13, color: C.red }}>⚠️ {error}</div>}
          {success && <div style={{ background: `${C.accent}22`, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Outfit'", fontSize: 13, color: C.accent }}>✅ {success}</div>}

          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: loading ? C.border : C.accent, border: "none", borderRadius: 10, padding: "14px", cursor: loading ? "not-allowed" : "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><div style={{ width: 18, height: 18, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />LOADING...</> :
              mode === "login" ? "LOGIN →" : mode === "signup" ? "CREATE ACCOUNT →" : "SEND RESET EMAIL 📧"}
          </button>

          <div style={{ textAlign: "center", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {mode === "login" && (
              <>
                <button onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13, textDecoration: "underline" }}>
                  🔑 Password bhool gaye?
                </button>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>
                  Account nahi hai? <button onClick={() => { setMode("signup"); setError(""); }} style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13, textDecoration: "underline" }}>Sign Up karo</button>
                </div>
              </>
            )}
            {mode === "signup" && (
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>
                Pehle se account hai? <button onClick={() => { setMode("login"); setError(""); }} style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13, textDecoration: "underline" }}>Login karo</button>
              </div>
            )}
            {mode === "forgot" && (
              <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13, textDecoration: "underline" }}>
                ← Wapas Login pe jao
              </button>
            )}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>🔒 Firebase Authentication se secure</div>
      </div>
    </div>
  );
}

// ── PROFILE EDIT SCREEN ───────────────────────────────────────────────────────
function ProfileEditScreen({ user, onBack, onUpdate, showToast }) {
  const [tab, setTab] = useState("info"); // info | password | email
  const [newName, setNewName] = useState(user.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.email || "");
  const [emailPassword, setEmailPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reauth = async (password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  };

  const saveName = async () => {
    if (!newName.trim()) { setError("Naam khali nahi ho sakta!"); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      await updateProfile(user, { displayName: newName.trim() });
      onUpdate();
      setSuccess("Naam update ho gaya! ✅");
      showToast("Naam save ho gaya! ✅");
    } catch (e) { setError(FIREBASE_ERRORS[e.code] || e.message); }
    setLoading(false);
  };

  const savePassword = async () => {
    setError(""); setSuccess("");
    if (!currentPassword) { setError("Purana password daalo!"); return; }
    if (newPassword.length < 6) { setError("Naya password kam se kam 6 characters ka ho!"); return; }
    if (newPassword !== confirmPassword) { setError("Dono passwords match nahi kar rahe!"); return; }
    setLoading(true);
    try {
      await reauth(currentPassword);
      await updatePassword(user, newPassword);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setSuccess("Password change ho gaya! ✅");
      showToast("Password update ho gaya! 🔒");
    } catch (e) { setError(FIREBASE_ERRORS[e.code] || e.message); }
    setLoading(false);
  };

  const saveEmail = async () => {
    setError(""); setSuccess("");
    if (!emailPassword) { setError("Confirm karne ke liye password daalo!"); return; }
    if (!newEmail.includes("@")) { setError("Valid email daalo!"); return; }
    setLoading(true);
    try {
      await reauth(emailPassword);
      await updateEmail(user, newEmail);
      await sendEmailVerification(user);
      setSuccess("Email update ho gaya! Verify karo inbox mein ✅");
      showToast("Email update ho gaya! 📧");
    } catch (e) { setError(FIREBASE_ERRORS[e.code] || e.message); }
    setLoading(false);
  };

  const sendForgotEmail = async () => {
    setLoading(true); setError(""); setSuccess("");
    try {
      await sendPasswordResetEmail(auth, user.email);
      setSuccess(`Reset email bheja ${user.email} pe! 📧`);
      showToast("Reset email bheja! 📧");
    } catch (e) { setError(FIREBASE_ERRORS[e.code] || e.message); }
    setLoading(false);
  };

  return (
    <div style={{ padding: "0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.muted, cursor: "pointer", fontFamily: "'Outfit'", fontSize: 13 }}>← Back</button>
        <div style={{ fontSize: 22 }}>EDIT PROFILE</div>
      </div>

      {/* Tab Selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[["info","👤 Info"],["password","🔒 Password"],["email","📧 Email"]].map(([t, l]) => (
          <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }} style={{ flex: 1, background: tab === t ? C.accentDim : C.card, border: `1px solid ${tab === t ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", color: tab === t ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500 }}>{l}</button>
        ))}
      </div>

      {error && <div style={{ background: `${C.red}22`, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Outfit'", fontSize: 13, color: C.red }}>⚠️ {error}</div>}
      {success && <div style={{ background: `${C.accent}22`, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Outfit'", fontSize: 13, color: C.accent }}>✅ {success}</div>}

      {/* INFO TAB */}
      {tab === "info" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>BASIC INFORMATION</div>
          <InputField label="DISPLAY NAME" value={newName} onChange={setNewName} placeholder="Apna naam daalo" />
          <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 6 }}>EMAIL</div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", fontFamily: "'Outfit'", fontSize: 14, color: C.muted, marginBottom: 16 }}>{user.email}</div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Email change karne ke liye "Email" tab use karo
          </div>
          <button onClick={saveName} disabled={loading} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 1 }}>
            {loading ? "SAVING..." : "💾 SAVE NAME"}
          </button>
        </div>
      )}

      {/* PASSWORD TAB */}
      {tab === "password" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>PASSWORD CHANGE KARO</div>
          <InputField label="CURRENT PASSWORD" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="Purana password" />
          <InputField label="NEW PASSWORD" type="password" value={newPassword} onChange={setNewPassword} placeholder="Naya password (min 6 chars)" note="Kam se kam 6 characters" />
          <InputField label="CONFIRM NEW PASSWORD" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Dobara naya password" />
          <button onClick={savePassword} disabled={loading} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 1, marginBottom: 12 }}>
            {loading ? "SAVING..." : "🔒 CHANGE PASSWORD"}
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 8 }}>Purana password yaad nahi?</div>
            <button onClick={sendForgotEmail} disabled={loading} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>
              📧 Reset Email Bhejo ({user.email})
            </button>
          </div>
        </div>
      )}

      {/* EMAIL TAB */}
      {tab === "email" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>EMAIL CHANGE KARO</div>
          <div style={{ background: `${C.yellow}11`, border: `1px solid ${C.yellow}33`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: "'Outfit'", fontSize: 12, color: C.yellow }}>
            ⚠️ Email change karne ke baad verification email aayega — verify karna padega
          </div>
          <InputField label="CURRENT EMAIL" value={user.email} onChange={() => {}} placeholder="" />
          <InputField label="NEW EMAIL" type="email" value={newEmail} onChange={setNewEmail} placeholder="naya@email.com" />
          <InputField label="CURRENT PASSWORD (confirm ke liye)" type="password" value={emailPassword} onChange={setEmailPassword} placeholder="Apna password" note="Security ke liye password confirm karna padega" />
          <button onClick={saveEmail} disabled={loading} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 1 }}>
            {loading ? "SAVING..." : "📧 UPDATE EMAIL"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function FitTrack() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthLoading(false); });
    return unsub;
  }, []);

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes spin { to{transform:rotate(360deg)} } * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 36, letterSpacing: 4, color: C.accent, fontFamily: "Impact" }}>FITTRACK</div>
        <div style={{ width: 32, height: 32, border: `3px solid ${C.accent}`, borderTopColor: "transparent", borderRadius: "50%", margin: "20px auto", animation: "spin 0.8s linear infinite" }} />
      </div>
    </div>
  );

  if (!user) return <AuthScreen onLogin={setUser} />;
  return <AppMain user={user} onLogout={() => { signOut(auth); setUser(null); }} onUserUpdate={() => setUser({ ...auth.currentUser })} />;
}

// ── APP MAIN ──────────────────────────────────────────────────────────────────
function AppMain({ user, onLogout, onUserUpdate }) {
  const uid = user.uid;
  const memberName = user.displayName || user.email?.split("@")[0] || "Member";

  const [screen, setScreen] = useState("home");
  const [editingProfile, setEditingProfile] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("Chest");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState({});
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState(() => userStorage.get(uid, "history") || []);
  const [streak, setStreak] = useState(() => userStorage.get(uid, "streak") || 0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [toast, setToast] = useState(null);
  const [timer, setTimer] = useState(null);
  const [prs, setPrs] = useState(() => userStorage.get(uid, "prs") || {});
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [weekPlan, setWeekPlan] = useState(() => userStorage.get(uid, "plan") || DEFAULT_PLAN);
  const [editingPlan, setEditingPlan] = useState(false);
  const [tempPlan, setTempPlan] = useState({});
  const [waterCount, setWaterCount] = useState(() => {
    const saved = userStorage.get(uid, "water");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved.count : 0;
  });
  const [caloriesBurned, setCaloriesBurned] = useState(() => userStorage.get(uid, "burned") || 0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
      setPrs(updated); userStorage.set(uid, "prs", updated);
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
    setHistory(newHistory); userStorage.set(uid, "history", newHistory);
    const newStreak = streak + 1; setStreak(newStreak); userStorage.set(uid, "streak", newStreak);
    const burned = WORKOUT_BURN[selectedMuscle]?.[selectedLevel] || 250;
    const newBurned = caloriesBurned + burned;
    setCaloriesBurned(newBurned); userStorage.set(uid, "burned", newBurned);
    setCompleted(true); showToast(`Workout complete! 🔥 ~${burned} kcal burned!`);
  };

  const addWater = () => {
    if (waterCount >= 8) { showToast("Daily goal complete! 💧"); return; }
    const newCount = waterCount + 1;
    setWaterCount(newCount);
    userStorage.set(uid, "water", { date: new Date().toLocaleDateString("en-IN"), count: newCount });
    if (newCount === 8) showToast("💧 Water goal complete!");
  };

  const savePlan = () => { setWeekPlan(tempPlan); userStorage.set(uid, "plan", tempPlan); setEditingPlan(false); showToast("Plan saved!"); };
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

      {/* Video Modal */}
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

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowLogoutConfirm(false)}>
          <div style={{ background: C.card, borderRadius: 16, padding: 28, width: "min(300px, 90vw)", border: `1px solid ${C.border}`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
            <div style={{ fontSize: 20, color: C.text, marginBottom: 6 }}>LOGOUT KARNA HAI?</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{memberName} · {user.email}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px", cursor: "pointer", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>Cancel</button>
              <button onClick={onLogout} style={{ flex: 1, background: C.red, border: "none", borderRadius: 8, padding: "12px", cursor: "pointer", color: "#fff", fontFamily: "'Bebas Neue'", fontSize: 16 }}>LOGOUT</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        <header style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 28, letterSpacing: 3, color: C.accent, lineHeight: 1 }}>FITTRACK</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 2 }}>Welcome, {memberName} 👋</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, color: C.accent, lineHeight: 1 }}>🔥{streak}</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>STREAK</div>
            </div>
          </div>
        </header>

        <nav style={{ display: "flex", padding: "16px 20px 0", gap: 3 }}>
          {[["home","🏠","HOME"],["plan","📅","PLAN"],["history","📊","LOG"],["prs","🏆","PRs"],["profile","👤","PROFILE"]].map(([s, icon, label]) => (
            <button key={s} onClick={() => { setScreen(s === "home" && screen === "workout" ? "workout" : s); setEditingProfile(false); }}
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
                <div style={{ background: `${MUSCLE_COLORS[todayMuscle]}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle]}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>📅 TODAY'S PLAN</div>
                    <div style={{ fontSize: 20, color: MUSCLE_COLORS[todayMuscle] }}>{todayMuscle} Day</div>
                  </div>
                  <button onClick={() => handleGenerate(todayMuscle)} style={{ background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14 }}>START ⚡</button>
                </div>
              )}
              <div style={{ background: "#4488ff11", border: "1px solid #4488ff33", borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>💧 WATER</div>
                  <div style={{ fontSize: 18, color: C.blue }}>{waterCount}/8 glasses</div>
                </div>
                <button onClick={addWater} style={{ background: `${C.blue}22`, border: `1px solid ${C.blue}44`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: C.blue, fontFamily: "'Bebas Neue'", fontSize: 14 }}>+ ADD</button>
              </div>
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
              <button onClick={() => handleGenerate()} disabled={loading} style={{ width: "100%", background: loading ? C.border : C.accent, border: "none", borderRadius: 12, padding: "18px", cursor: loading ? "not-allowed" : "pointer", color: "#000", fontSize: 22, fontFamily: "'Bebas Neue'", letterSpacing: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {loading ? (<><div style={{ width: 20, height: 20, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />LOADING...</>) : "⚡ GENERATE TODAY'S WORKOUT"}
              </button>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 13, color: C.muted, letterSpacing: 2, marginBottom: 10, fontFamily: "'Outfit'" }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map((d, i) => {
                    const isToday = d === todayKey; const hasLog = history.some(h => new Date(h.ts).getDay() === (i + 1) % 7);
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
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>{selectedLevel} · {workout.length} exercises · ~{WORKOUT_BURN[selectedMuscle]?.[selectedLevel]} kcal</div>
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
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange, marginTop: 4 }}>~{WORKOUT_BURN[selectedMuscle]?.[selectedLevel]} kcal burned!</div>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {DAYS.map((d) => {
                  const isToday = d === todayKey; const muscle = editingPlan ? (tempPlan[d] || "Rest Day") : weekPlan[d]; const color = MUSCLE_COLORS[muscle] || C.muted;
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
                          ) : <div style={{ fontSize: 16, color }}>{muscle}</div>}
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
              {history.length === 0 ? <div style={{ textAlign: "center", padding: "40px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 40 }}>📋</div><div style={{ marginTop: 12 }}>No workouts yet!</div></div>
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

          {/* PRs */}
          {screen === "prs" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>PERSONAL RECORDS</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 20 }}>{Object.keys(prs).length} exercises logged</div>
              {Object.keys(prs).length === 0 ? <div style={{ textAlign: "center", padding: "40px", color: C.muted, fontFamily: "'Outfit'" }}><div style={{ fontSize: 48 }}>🏆</div><div style={{ marginTop: 12 }}>Workout karo aur weight log karo!</div></div>
                : Object.entries(prs).map(([name, pr]) => (
                  <div key={name} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div><div style={{ fontSize: 16, color: C.text }}>{name}</div><div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{pr.date}</div></div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, color: C.accent }}>{pr.weight}<span style={{ fontSize: 13, color: C.muted }}>kg</span></div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>× {pr.reps} reps</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* PROFILE */}
          {screen === "profile" && (
            <div className="animate-in">
              {editingProfile ? (
                <ProfileEditScreen user={user} onBack={() => setEditingProfile(false)} onUpdate={onUserUpdate} showToast={showToast} />
              ) : (
                <>
                  <div style={{ fontSize: 22, marginBottom: 20 }}>MY PROFILE</div>

                  {/* Avatar & Info */}
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 16, textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, background: C.accentDim, border: `2px solid ${C.accent}`, borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontFamily: "'Bebas Neue'" }}>
                      {memberName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 24, color: C.accent }}>{memberName}</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginTop: 4 }}>{user.email}</div>
                    {user.emailVerified ? (
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.accent, marginTop: 6 }}>✅ Email verified</div>
                    ) : (
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.yellow, marginTop: 6 }}>⚠️ Email verify nahi hua</div>
                    )}
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 4 }}>
                      Member since {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN") : "N/A"}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    {[["🔥","Streak",streak],["💪","Workouts",history.length],["🏆","PRs",Object.keys(prs).length]].map(([icon,label,val]) => (
                      <div key={label} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 20 }}>{icon}</div>
                        <div style={{ fontSize: 22, color: C.accent }}>{val}</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button onClick={() => setEditingProfile(true)} style={{ width: "100%", background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.accent, fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>✏️</span>
                      <div>
                        <div>EDIT PROFILE</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, letterSpacing: 0 }}>Naam, email, password change karo</div>
                      </div>
                    </button>

                    <button onClick={async () => {
                      try { await sendPasswordResetEmail(auth, user.email); showToast("Reset email bheja! 📧"); } catch (e) { showToast("Error aa gayi!", "error"); }
                    }} style={{ width: "100%", background: `${C.blue}11`, border: `1px solid ${C.blue}33`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.blue, fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>🔑</span>
                      <div>
                        <div>FORGOT PASSWORD</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, letterSpacing: 0 }}>Reset email bhejenge {user.email} pe</div>
                      </div>
                    </button>

                    <button onClick={() => setShowLogoutConfirm(true)} style={{ width: "100%", background: `${C.red}11`, border: `1px solid ${C.red}33`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.red, fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>🚪</span>
                      <div>
                        <div>LOGOUT</div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, letterSpacing: 0 }}>Account se bahar jao</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
