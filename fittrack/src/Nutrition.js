// Nutrition.js — FitTrack Nutrition & Calorie Calculator
import { useState } from "react";

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00ff88", accentDim: "#00ff8830", text: "#e8e8f0",
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff", orange: "#ff8844",
};

// ── FOOD DATABASE ─────────────────────────────────────────────────────────────
export const FOODS = [
  // VEG
  { name: "Dal (1 bowl)", cal: 150, protein: 9, carbs: 24, fat: 3, type: "veg", category: "Main", icon: "🍲" },
  { name: "Roti (1 piece)", cal: 80, protein: 3, carbs: 15, fat: 1, type: "veg", category: "Carbs", icon: "🫓" },
  { name: "Rice (1 bowl)", cal: 200, protein: 4, carbs: 44, fat: 0, type: "veg", category: "Carbs", icon: "🍚" },
  { name: "Paneer (100g)", cal: 265, protein: 18, carbs: 3, fat: 20, type: "veg", category: "Protein", icon: "🧀" },
  { name: "Rajma (1 bowl)", cal: 180, protein: 13, carbs: 30, fat: 1, type: "veg", category: "Protein", icon: "🫘" },
  { name: "Chhole (1 bowl)", cal: 170, protein: 10, carbs: 28, fat: 3, type: "veg", category: "Protein", icon: "🫘" },
  { name: "Soya Chunks (50g)", cal: 180, protein: 26, carbs: 13, fat: 1, type: "veg", category: "Protein", icon: "🌿" },
  { name: "Sprouts (1 bowl)", cal: 80, protein: 7, carbs: 12, fat: 1, type: "veg", category: "Protein", icon: "🌱" },
  { name: "Milk (1 glass)", cal: 120, protein: 6, carbs: 12, fat: 5, type: "veg", category: "Dairy", icon: "🥛" },
  { name: "Curd (1 bowl)", cal: 100, protein: 5, carbs: 8, fat: 4, type: "veg", category: "Dairy", icon: "🥛" },
  { name: "Greek Yogurt (1 bowl)", cal: 100, protein: 10, carbs: 6, fat: 3, type: "veg", category: "Dairy", icon: "🥛" },
  { name: "Paneer Shake (1 glass)", cal: 320, protein: 22, carbs: 28, fat: 12, type: "veg", category: "Drinks", icon: "🥤" },
  { name: "Banana (1)", cal: 90, protein: 1, carbs: 23, fat: 0, type: "veg", category: "Fruits", icon: "🍌" },
  { name: "Apple (1)", cal: 80, protein: 0, carbs: 21, fat: 0, type: "veg", category: "Fruits", icon: "🍎" },
  { name: "Mango (1 slice)", cal: 60, protein: 1, carbs: 15, fat: 0, type: "veg", category: "Fruits", icon: "🥭" },
  { name: "Banana Shake (1 glass)", cal: 280, protein: 8, carbs: 48, fat: 6, type: "veg", category: "Drinks", icon: "🥤" },
  { name: "Oats (1 bowl)", cal: 150, protein: 5, carbs: 27, fat: 3, type: "veg", category: "Breakfast", icon: "🥣" },
  { name: "Poha (1 bowl)", cal: 180, protein: 3, carbs: 36, fat: 3, type: "veg", category: "Breakfast", icon: "🍽️" },
  { name: "Idli (2 pieces)", cal: 140, protein: 4, carbs: 28, fat: 1, type: "veg", category: "Breakfast", icon: "🍽️" },
  { name: "Dosa (1)", cal: 170, protein: 4, carbs: 30, fat: 4, type: "veg", category: "Breakfast", icon: "🍽️" },
  { name: "Paratha (1)", cal: 200, protein: 4, carbs: 30, fat: 7, type: "veg", category: "Breakfast", icon: "🫓" },
  { name: "Bread (2 slices)", cal: 160, protein: 5, carbs: 30, fat: 2, type: "veg", category: "Carbs", icon: "🍞" },
  { name: "Sweet Potato (1)", cal: 130, protein: 2, carbs: 30, fat: 0, type: "veg", category: "Carbs", icon: "🥔" },
  { name: "Peanut Butter (2 tbsp)", cal: 190, protein: 8, carbs: 7, fat: 16, type: "veg", category: "Fats", icon: "🥜" },
  { name: "Almonds (10 pieces)", cal: 70, protein: 3, carbs: 2, fat: 6, type: "veg", category: "Fats", icon: "🌰" },
  { name: "Walnuts (5 pieces)", cal: 130, protein: 3, carbs: 3, fat: 13, type: "veg", category: "Fats", icon: "🌰" },
  { name: "Whey Protein (1 scoop)", cal: 120, protein: 24, carbs: 3, fat: 1, type: "veg", category: "Supplements", icon: "💪" },
  // EGG
  { name: "Egg (1 whole)", cal: 70, protein: 6, carbs: 0, fat: 5, type: "egg", category: "Protein", icon: "🥚" },
  { name: "Egg White (1)", cal: 17, protein: 4, carbs: 0, fat: 0, type: "egg", category: "Protein", icon: "🥚" },
  { name: "Boiled Eggs (2)", cal: 140, protein: 12, carbs: 0, fat: 10, type: "egg", category: "Protein", icon: "🥚" },
  { name: "Omelette (2 eggs)", cal: 180, protein: 13, carbs: 2, fat: 13, type: "egg", category: "Breakfast", icon: "🍳" },
  { name: "Egg Bhurji (2 eggs)", cal: 200, protein: 14, carbs: 5, fat: 14, type: "egg", category: "Breakfast", icon: "🍳" },
  // NON-VEG
  { name: "Chicken Breast (100g)", cal: 165, protein: 31, carbs: 0, fat: 4, type: "nonveg", category: "Protein", icon: "🍗" },
  { name: "Chicken Curry (1 bowl)", cal: 280, protein: 28, carbs: 8, fat: 15, type: "nonveg", category: "Main", icon: "🍲" },
  { name: "Grilled Chicken (150g)", cal: 248, protein: 46, carbs: 0, fat: 5, type: "nonveg", category: "Protein", icon: "🍗" },
  { name: "Tuna (100g)", cal: 130, protein: 28, carbs: 0, fat: 1, type: "nonveg", category: "Protein", icon: "🐟" },
  { name: "Salmon (100g)", cal: 208, protein: 20, carbs: 0, fat: 13, type: "nonveg", category: "Protein", icon: "🐟" },
  { name: "Fish Curry (1 bowl)", cal: 220, protein: 22, carbs: 6, fat: 12, type: "nonveg", category: "Main", icon: "🍲" },
  { name: "Mutton (100g)", cal: 258, protein: 26, carbs: 0, fat: 17, type: "nonveg", category: "Protein", icon: "🥩" },
  { name: "Keema (1 bowl)", cal: 300, protein: 24, carbs: 10, fat: 18, type: "nonveg", category: "Main", icon: "🍲" },
];

const MACRO_GUIDE = [
  {
    name: "Protein", icon: "🥩", color: "#00ff88", hindi: "Muscles banata hai",
    what: "Body ke building blocks — muscles, skin, hormones sab protein se bante hain",
    why: "Gym mein muscles toot ti hain. Protein unhe repair aur grow karta hai",
    how: "Body weight × 1.5–2.2g per kg (70kg → 105–154g/day)",
    sources_veg: ["Paneer", "Dal", "Rajma", "Soya chunks", "Curd", "Whey protein"],
    sources_nonveg: ["Chicken breast", "Eggs", "Fish", "Tuna", "Mutton"],
  },
  {
    name: "Carbs", icon: "🍞", color: "#4488ff", hindi: "Energy deta hai",
    what: "Body ka primary fuel — brain aur muscles dono ko chahiye",
    why: "Gym mein energy ke liye carbs zaroori hain. Kam karo toh weak feel hoga",
    how: "Total calories ka 40–50% (generally 200–300g/day)",
    sources_veg: ["Rice", "Roti", "Oats", "Sweet potato", "Banana", "Bread"],
    sources_nonveg: ["Rice", "Roti", "Oats", "Sweet potato", "Banana"],
  },
  {
    name: "Fat", icon: "🥑", color: "#ffcc00", hindi: "Hormones ke liye",
    what: "Healthy fats hormones banate hain, vitamins absorb karte hain",
    why: "Fat se daro mat — fat nahi khaoge toh testosterone kam hoga",
    how: "Total calories ka 25% (generally 50–70g/day)",
    sources_veg: ["Almonds", "Walnuts", "Peanut butter", "Ghee (thoda)"],
    sources_nonveg: ["Salmon", "Eggs (yolk)", "Almonds", "Peanut butter"],
  },
];

const MEAL_TIMING = [
  { time: "Subah uthne ke baad", icon: "🌅", label: "Wake Up", veg: ["1 glass warm water + lemon", "5-6 almonds ya walnuts"], nonveg: ["1 glass warm water + lemon", "5-6 almonds ya walnuts"], tip: "Metabolism kick-start hota hai" },
  { time: "Workout se 1-2 ghante pehle", icon: "⚡", label: "Pre-Workout", veg: ["Banana + peanut butter", "Oats with milk"], nonveg: ["Banana + boiled eggs", "Bread + egg omelette"], tip: "Carbs + protein = energy aur performance" },
  { time: "Workout ke 30-45 min baad", icon: "💪", label: "Post-Workout", veg: ["Whey protein shake", "Paneer + roti"], nonveg: ["Whey protein + banana", "Chicken + rice"], tip: "Yeh window muscle recovery ke liye best hai" },
  { time: "Dopahar ka khana", icon: "☀️", label: "Lunch", veg: ["Dal + rice + curd + sabzi", "Rajma chawal"], nonveg: ["Chicken curry + rice", "Fish + roti + salad"], tip: "Din ka sabse bada meal — balanced plate" },
  { time: "Shaam ka snack", icon: "🌤️", label: "Evening Snack", veg: ["Sprouts chaat", "Fruits + curd"], nonveg: ["Boiled eggs", "Chicken tikka"], tip: "Light rakho — heavy nahi" },
  { time: "Raat ka khana", icon: "🌙", label: "Dinner", veg: ["Dal + roti + salad", "Paneer + sabzi"], nonveg: ["Grilled chicken + sabzi", "Fish + roti"], tip: "Raat ko carbs kam karo, protein zyada" },
  { time: "Sone se 30 min pehle", icon: "😴", label: "Before Bed", veg: ["1 glass warm milk", "Curd ya paneer"], nonveg: ["1 glass warm milk", "2 egg whites"], tip: "Casein protein raat bhar muscles repair karta hai" },
];

function MacroBar({ label, current, target, color }) {
  const pct = Math.min((current / target) * 100, 100);
  const over = current > target;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{label}</span>
        <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: over ? C.red : color }}>{current}g / {target}g {over ? "⚠️" : ""}</span>
      </div>
      <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: over ? C.red : color, borderRadius: 4, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

export default function NutritionScreen({ uid, userStorage, caloriesBurned, showToast }) {
  const [nutTab, setNutTab] = useState("today");
  const [dietType, setDietType] = useState(() => { try { return localStorage.getItem(`ft_${uid}_diet`) || "veg" } catch { return "veg" } });
  const [nutProfile, setNutProfile] = useState(() => userStorage.get(uid, "nut_profile") || { age: "", weight: "", height: "", gender: "male", activity: "moderate", goal: "maintain" });
  const [nutTargets, setNutTargets] = useState(() => userStorage.get(uid, "nut_targets") || null);
  const [foodLog, setFoodLog] = useState(() => {
    const saved = userStorage.get(uid, "food_log");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved : { date: today, items: [] };
  });
  const [foodSearch, setFoodSearch] = useState("");
  const [expandedMacro, setExpandedMacro] = useState(null);
  const [mealTimingDiet, setMealTimingDiet] = useState("veg");

  const setDiet = (v) => { setDietType(v); localStorage.setItem(`ft_${uid}_diet`, v); };

  const calculateTargets = () => {
    const { age, weight, height, gender, activity, goal } = nutProfile;
    if (!age || !weight || !height) { showToast("Saari info fill karo!", "error"); return; }
    const w = parseFloat(weight); const h = parseFloat(height); const a = parseInt(age);
    let bmr = gender === "male" ? (10 * w) + (6.25 * h) - (5 * a) + 5 : (10 * w) + (6.25 * h) - (5 * a) - 161;
    const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    let tdee = bmr * mult[activity];
    let calories = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 300 : tdee;
    calories = Math.round(calories);
    const protein = Math.round(w * 2.2);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    const targets = { calories, protein, fat, carbs, bmr: Math.round(bmr), tdee: Math.round(tdee) };
    setNutTargets(targets);
    userStorage.set(uid, "nut_targets", targets);
    userStorage.set(uid, "nut_profile", nutProfile);
    showToast("Targets calculate ho gaye! 🎯");
    setNutTab("today");
  };

  const addFood = (food) => {
    const today = new Date().toLocaleDateString("en-IN");
    const newLog = foodLog.date === today ? { ...foodLog, items: [...foodLog.items, { ...food, id: Date.now() }] } : { date: today, items: [{ ...food, id: Date.now() }] };
    setFoodLog(newLog); userStorage.set(uid, "food_log", newLog);
    showToast(`+${food.cal} kcal added! 🍽️`);
  };

  const removeFood = (id) => {
    const newLog = { ...foodLog, items: foodLog.items.filter(f => f.id !== id) };
    setFoodLog(newLog); userStorage.set(uid, "food_log", newLog);
    showToast("Food removed!", "error");
  };

  const getFilteredFoods = () => {
    let foods = FOODS;
    if (dietType === "veg") foods = foods.filter(f => f.type === "veg");
    else if (dietType === "egg") foods = foods.filter(f => f.type === "veg" || f.type === "egg");
    if (foodSearch) foods = foods.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));
    return foods;
  };

  const totalEaten = foodLog.items.reduce((acc, f) => ({ cal: acc.cal + f.cal, protein: acc.protein + f.protein, carbs: acc.carbs + f.carbs, fat: acc.fat + f.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
  const netCal = totalEaten.cal - (caloriesBurned || 0);

  return (
    <div>
      <div style={{ fontSize: 22, marginBottom: 4 }}>NUTRITION</div>

      {/* Diet Type */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["veg","🥦 Veg"],["egg","🥚 Eggetarian"],["nonveg","🍗 Non-Veg"]].map(([v, l]) => (
          <button key={v} onClick={() => setDiet(v)} style={{ flex: 1, background: dietType === v ? C.accentDim : C.card, border: `1px solid ${dietType === v ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", color: dietType === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500 }}>{l}</button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
        {[["today","📊 Today"],["foods","🍽️ Foods"],["guide","📚 Guide"],["timing","⏰ Timing"],["calculator","🧮 Calc"]].map(([t, label]) => (
          <button key={t} onClick={() => setNutTab(t)} style={{ flex: "0 0 auto", background: nutTab === t ? C.accentDim : C.card, border: `1px solid ${nutTab === t ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: nutTab === t ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</button>
        ))}
      </div>

      {/* TODAY */}
      {nutTab === "today" && (!nutTargets ? (
        <div style={{ textAlign: "center", padding: "30px", color: C.muted, fontFamily: "'Outfit'" }}>
          <div style={{ fontSize: 48 }}>🧮</div>
          <div style={{ marginTop: 12 }}>Pehle Calculator mein info daalo!</div>
          <button onClick={() => setNutTab("calculator")} style={{ marginTop: 16, background: C.accent, border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16 }}>CALCULATOR OPEN KARO</button>
        </div>
      ) : (
        <>
          {/* Calorie Card */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 14, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14 }}>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🍽️ Eaten</div><div style={{ fontSize: 26, color: C.orange }}>{totalEaten.cal}</div></div>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🔥 Burned</div><div style={{ fontSize: 26, color: C.red }}>{caloriesBurned || 0}</div></div>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>⚡ Net</div><div style={{ fontSize: 26, color: C.accent }}>{netCal}</div></div>
            </div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 6 }}>Goal: {nutTargets.calories} kcal/day</div>
            <div style={{ height: 10, background: C.border, borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: totalEaten.cal > nutTargets.calories ? C.red : C.orange, borderRadius: 5, transition: "width 0.3s" }} />
            </div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 6 }}>
              {nutTargets.calories - totalEaten.cal > 0 ? `${nutTargets.calories - totalEaten.cal} kcal remaining` : `${totalEaten.cal - nutTargets.calories} kcal over!`}
            </div>
          </div>

          {/* Macros */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>MACROS</div>
            <MacroBar label="🥩 Protein" current={totalEaten.protein} target={nutTargets.protein} color={C.accent} />
            <MacroBar label="🍞 Carbs" current={totalEaten.carbs} target={nutTargets.carbs} color={C.blue} />
            <MacroBar label="🥑 Fat" current={totalEaten.fat} target={nutTargets.fat} color={C.yellow} />
          </div>

          {/* Food Log */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>TODAY'S FOOD LOG</div>
              <button onClick={() => setNutTab("foods")} style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: C.accent, fontFamily: "'Bebas Neue'", fontSize: 12 }}>+ ADD</button>
            </div>
            {foodLog.items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "16px", color: C.muted, fontFamily: "'Outfit'", fontSize: 13 }}>Kuch log nahi kiya abhi</div>
            ) : foodLog.items.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13 }}>{item.icon} {item.name}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>P:{item.protein}g · C:{item.carbs}g · F:{item.fat}g</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange }}>{item.cal}</div>
                  <button onClick={() => removeFood(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, fontSize: 18 }}>×</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* FOODS */}
      {nutTab === "foods" && (
        <>
          <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 10 }}>
            {dietType === "veg" ? "🥦 Sirf Veg foods" : dietType === "egg" ? "🥚 Veg + Egg foods" : "🍗 Saare foods"}
          </div>
          <input value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder="🔍 Search... dal, roti, chicken, egg..." style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.text, fontFamily: "'Outfit'", fontSize: 14, outline: "none", marginBottom: 14 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {getFilteredFoods().map((food, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${food.type === "nonveg" ? C.red + "33" : food.type === "egg" ? C.yellow + "33" : C.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text }}>{food.icon} {food.name}
                    <span style={{ fontSize: 10, marginLeft: 6, background: food.type === "nonveg" ? C.red + "22" : food.type === "egg" ? C.yellow + "22" : C.accent + "22", color: food.type === "nonveg" ? C.red : food.type === "egg" ? C.yellow : C.accent, borderRadius: 4, padding: "1px 6px" }}>
                      {food.type === "nonveg" ? "Non-Veg" : food.type === "egg" ? "Egg" : "Veg"}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 2 }}>P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange, minWidth: 30 }}>{food.cal}</div>
                  <button onClick={() => addFood(food)} style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: C.accent, fontFamily: "'Bebas Neue'", fontSize: 12 }}>+ADD</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* GUIDE */}
      {nutTab === "guide" && (
        <>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>Beginners ke liye simple guide 📚</div>
          {MACRO_GUIDE.map((macro, idx) => (
            <div key={idx} style={{ background: C.card, border: `1px solid ${macro.color}33`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
              <button onClick={() => setExpandedMacro(expandedMacro === idx ? null : idx)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 44, height: 44, background: `${macro.color}22`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{macro.icon}</div>
                    <div>
                      <div style={{ fontSize: 18, color: macro.color }}>{macro.name}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted }}>{macro.hindi}</div>
                    </div>
                  </div>
                  <div style={{ color: C.muted, fontSize: 18 }}>{expandedMacro === idx ? "▲" : "▼"}</div>
                </div>
              </button>
              {expandedMacro === idx && (
                <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  <div style={{ background: `${macro.color}11`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: macro.color, marginBottom: 4, fontWeight: 600 }}>Kya hai?</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{macro.what}</div>
                  </div>
                  <div style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.yellow, marginBottom: 4, fontWeight: 600 }}>Gym ke liye kyun?</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{macro.why}</div>
                  </div>
                  <div style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 4, fontWeight: 600 }}>Kitna?</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text }}>{macro.how}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, background: C.surface, borderRadius: 8, padding: 10 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.accent, marginBottom: 6 }}>🥦 Veg Sources</div>
                      {macro.sources_veg.map(s => <div key={s} style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.text, padding: "2px 0" }}>• {s}</div>)}
                    </div>
                    {dietType !== "veg" && (
                      <div style={{ flex: 1, background: C.surface, borderRadius: 8, padding: 10 }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.red, marginBottom: 6 }}>🍗 Non-Veg</div>
                        {macro.sources_nonveg.map(s => <div key={s} style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.text, padding: "2px 0" }}>• {s}</div>)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* MEAL TIMING */}
      {nutTab === "timing" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[["veg","🥦 Veg"],["nonveg","🍗 Non-Veg"]].map(([v, l]) => (
              <button key={v} onClick={() => setMealTimingDiet(v)} style={{ flex: 1, background: mealTimingDiet === v ? C.accentDim : C.card, border: `1px solid ${mealTimingDiet === v ? C.accent : C.border}`, borderRadius: 8, padding: "8px", cursor: "pointer", color: mealTimingDiet === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 12 }}>{l}</button>
            ))}
          </div>
          {MEAL_TIMING.map((meal, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 24 }}>{meal.icon}</div>
                <div>
                  <div style={{ fontSize: 16, color: C.accent }}>{meal.label}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>{meal.time}</div>
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                {(mealTimingDiet === "veg" ? meal.veg : meal.nonveg).map((item, j) => (
                  <div key={j} style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: C.accent, fontSize: 10 }}>●</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ background: `${C.yellow}11`, borderRadius: 6, padding: "6px 10px", fontFamily: "'Outfit'", fontSize: 12, color: C.yellow, borderLeft: `3px solid ${C.yellow}` }}>💡 {meal.tip}</div>
            </div>
          ))}
        </>
      )}

      {/* CALCULATOR */}
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
                {[["sedentary","🪑 Sedentary — koi exercise nahi"],["light","🚶 Light — hafte 1-3 din"],["moderate","🏃 Moderate — hafte 3-5 din"],["active","💪 Active — hafte 6-7 din"],["very_active","🔥 Very Active — din mein 2 baar"]].map(([v, l]) => (
                  <button key={v} onClick={() => setNutProfile(p => ({ ...p, activity: v }))} style={{ background: nutProfile.activity === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.activity === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", color: nutProfile.activity === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 12, textAlign: "left" }}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 8 }}>GOAL</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[["lose","⬇️ Lose"],["maintain","⚖️ Maintain"],["gain","⬆️ Gain"]].map(([v, l]) => (
                  <button key={v} onClick={() => setNutProfile(p => ({ ...p, goal: v }))} style={{ flex: 1, background: nutProfile.goal === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.goal === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px 4px", cursor: "pointer", color: nutProfile.goal === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11 }}>{l}</button>
                ))}
              </div>
            </div>
            <button onClick={calculateTargets} style={{ width: "100%", background: C.accent, border: "none", borderRadius: 10, padding: "14px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}>🧮 CALCULATE TARGETS</button>
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
  );
}
