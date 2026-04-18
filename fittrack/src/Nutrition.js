// Nutrition.js — FitTrack Enhanced Nutrition Module
import { useState } from "react";

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00ff88", accentDim: "#00ff8830", text: "#e8e8f0",
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff", orange: "#ff8844",
  purple: "#aa44ff", green: "#44cc88",
};

// ── FOOD DATABASE ─────────────────────────────────────────────────────────────
export const FOODS = [
  { name: "Dal (1 bowl)", cal: 150, protein: 9, carbs: 24, fat: 3, type: "veg", category: "Main", icon: "🍲", price: "low" },
  { name: "Roti (1 piece)", cal: 80, protein: 3, carbs: 15, fat: 1, type: "veg", category: "Carbs", icon: "🫓", price: "low" },
  { name: "Rice (1 bowl)", cal: 200, protein: 4, carbs: 44, fat: 0, type: "veg", category: "Carbs", icon: "🍚", price: "low" },
  { name: "Paneer (100g)", cal: 265, protein: 18, carbs: 3, fat: 20, type: "veg", category: "Protein", icon: "🧀", price: "medium" },
  { name: "Rajma (1 bowl)", cal: 180, protein: 13, carbs: 30, fat: 1, type: "veg", category: "Protein", icon: "🫘", price: "low" },
  { name: "Chhole (1 bowl)", cal: 170, protein: 10, carbs: 28, fat: 3, type: "veg", category: "Protein", icon: "🫘", price: "low" },
  { name: "Soya Chunks (50g)", cal: 180, protein: 26, carbs: 13, fat: 1, type: "veg", category: "Protein", icon: "🌿", price: "low" },
  { name: "Sprouts (1 bowl)", cal: 80, protein: 7, carbs: 12, fat: 1, type: "veg", category: "Protein", icon: "🌱", price: "low" },
  { name: "Milk (1 glass)", cal: 120, protein: 6, carbs: 12, fat: 5, type: "veg", category: "Dairy", icon: "🥛", price: "low" },
  { name: "Curd (1 bowl)", cal: 100, protein: 5, carbs: 8, fat: 4, type: "veg", category: "Dairy", icon: "🥛", price: "low" },
  { name: "Greek Yogurt (1 bowl)", cal: 100, protein: 10, carbs: 6, fat: 3, type: "veg", category: "Dairy", icon: "🥛", price: "medium" },
  { name: "Banana (1)", cal: 90, protein: 1, carbs: 23, fat: 0, type: "veg", category: "Fruits", icon: "🍌", price: "low" },
  { name: "Apple (1)", cal: 80, protein: 0, carbs: 21, fat: 0, type: "veg", category: "Fruits", icon: "🍎", price: "low" },
  { name: "Oats (1 bowl)", cal: 150, protein: 5, carbs: 27, fat: 3, type: "veg", category: "Breakfast", icon: "🥣", price: "low" },
  { name: "Poha (1 bowl)", cal: 180, protein: 3, carbs: 36, fat: 3, type: "veg", category: "Breakfast", icon: "🍽️", price: "low" },
  { name: "Idli (2 pieces)", cal: 140, protein: 4, carbs: 28, fat: 1, type: "veg", category: "Breakfast", icon: "🍽️", price: "low" },
  { name: "Paratha (1)", cal: 200, protein: 4, carbs: 30, fat: 7, type: "veg", category: "Breakfast", icon: "🫓", price: "low" },
  { name: "Bread (2 slices)", cal: 160, protein: 5, carbs: 30, fat: 2, type: "veg", category: "Carbs", icon: "🍞", price: "low" },
  { name: "Sweet Potato (1)", cal: 130, protein: 2, carbs: 30, fat: 0, type: "veg", category: "Carbs", icon: "🥔", price: "low" },
  { name: "Peanut Butter (2 tbsp)", cal: 190, protein: 8, carbs: 7, fat: 16, type: "veg", category: "Fats", icon: "🥜", price: "medium" },
  { name: "Almonds (10 pieces)", cal: 70, protein: 3, carbs: 2, fat: 6, type: "veg", category: "Fats", icon: "🌰", price: "medium" },
  { name: "Chana (1 bowl)", cal: 160, protein: 9, carbs: 28, fat: 2, type: "veg", category: "Protein", icon: "🫘", price: "low" },
  { name: "Moong Dal (1 bowl)", cal: 140, protein: 8, carbs: 24, fat: 1, type: "veg", category: "Protein", icon: "🍲", price: "low" },
  { name: "Tofu (100g)", cal: 76, protein: 8, carbs: 2, fat: 4, type: "veg", category: "Protein", icon: "🌿", price: "medium" },
  { name: "Whey Protein (1 scoop)", cal: 120, protein: 24, carbs: 3, fat: 1, type: "veg", category: "Supplements", icon: "💪", price: "high" },
  // EGG
  { name: "Egg (1 whole)", cal: 70, protein: 6, carbs: 0, fat: 5, type: "egg", category: "Protein", icon: "🥚", price: "low" },
  { name: "Egg White (1)", cal: 17, protein: 4, carbs: 0, fat: 0, type: "egg", category: "Protein", icon: "🥚", price: "low" },
  { name: "Boiled Eggs (2)", cal: 140, protein: 12, carbs: 0, fat: 10, type: "egg", category: "Protein", icon: "🥚", price: "low" },
  { name: "Omelette (2 eggs)", cal: 180, protein: 13, carbs: 2, fat: 13, type: "egg", category: "Breakfast", icon: "🍳", price: "low" },
  // NON-VEG
  { name: "Chicken Breast (100g)", cal: 165, protein: 31, carbs: 0, fat: 4, type: "nonveg", category: "Protein", icon: "🍗", price: "medium" },
  { name: "Chicken Curry (1 bowl)", cal: 280, protein: 28, carbs: 8, fat: 15, type: "nonveg", category: "Main", icon: "🍲", price: "medium" },
  { name: "Chicken Legs (2 pieces)", cal: 220, protein: 24, carbs: 0, fat: 13, type: "nonveg", category: "Protein", icon: "🍗", price: "low" },
  { name: "Tuna (100g)", cal: 130, protein: 28, carbs: 0, fat: 1, type: "nonveg", category: "Protein", icon: "🐟", price: "medium" },
  { name: "Egg + Dal combo", cal: 220, protein: 15, carbs: 24, fat: 6, type: "nonveg", category: "Main", icon: "🍳", price: "low" },
  { name: "Fish Curry (1 bowl)", cal: 220, protein: 22, carbs: 6, fat: 12, type: "nonveg", category: "Main", icon: "🍲", price: "medium" },
  { name: "Mutton (100g)", cal: 258, protein: 26, carbs: 0, fat: 17, type: "nonveg", category: "Protein", icon: "🥩", price: "high" },
];

// ── BUDGET DIET PLANS ─────────────────────────────────────────────────────────
const BUDGET_PLANS = {
  veg: {
    low: {
      label: "Budget Diet 💰",
      subtitle: "₹100-150/day mein complete nutrition",
      color: C.green,
      note: "Yeh sab cheezein market mein bahut sasti milti hain",
      meals: [
        {
          time: "🌅 Subah (7-8 AM)", budget: "~₹15",
          options: [
            { name: "Option A", items: ["1 glass milk (₹8)", "2 roti with jaggery (₹5)", "Banana (₹5)"], protein: "9g", cal: 350 },
            { name: "Option B", items: ["Poha with peanuts (₹10)", "1 glass water with lemon (₹2)"], protein: "5g", cal: 200 },
            { name: "Option C", items: ["Oats with water + salt (₹8)", "1 banana (₹5)"], protein: "6g", cal: 240 },
          ]
        },
        {
          time: "⚡ Pre-Workout (1 hr pehle)", budget: "~₹10",
          options: [
            { name: "Option A", items: ["2 banana (₹10)"], protein: "2g", cal: 180 },
            { name: "Option B", items: ["2 roti with peanut paste (₹8)"], protein: "7g", cal: 200 },
            { name: "Option C", items: ["Sweet potato boiled (₹8)", "1 glass milk (₹8)"], protein: "8g", cal: 250 },
          ]
        },
        {
          time: "💪 Post-Workout (30-45 min baad)", budget: "~₹20",
          options: [
            { name: "Option A", items: ["Soya chunks 50g boiled (₹5)", "1 glass milk (₹8)", "Rice 1 bowl (₹5)"], protein: "32g", cal: 420 },
            { name: "Option B", items: ["Moong dal 1 bowl (₹8)", "2 roti (₹5)", "Curd (₹8)"], protein: "18g", cal: 380 },
            { name: "Option C", items: ["Chana boiled 1 bowl (₹10)", "Rice (₹5)"], protein: "18g", cal: 360 },
          ]
        },
        {
          time: "☀️ Lunch (1-2 PM)", budget: "~₹30",
          options: [
            { name: "Option A", items: ["Dal 1 bowl (₹8)", "Rice 1 bowl (₹5)", "Sabzi (₹8)", "Curd (₹8)"], protein: "16g", cal: 550 },
            { name: "Option B", items: ["Rajma 1 bowl (₹12)", "Rice 1 bowl (₹5)", "Salad (₹5)"], protein: "17g", cal: 480 },
            { name: "Option C", items: ["Chhole 1 bowl (₹10)", "2 roti (₹5)", "Curd (₹8)"], protein: "15g", cal: 450 },
          ]
        },
        {
          time: "🌙 Dinner (7-8 PM)", budget: "~₹25",
          options: [
            { name: "Option A", items: ["Dal + roti (₹15)", "Salad (₹5)", "1 glass milk (₹8)"], protein: "18g", cal: 430 },
            { name: "Option B", items: ["Khichdi (dal + rice) (₹12)", "Curd (₹8)"], protein: "14g", cal: 400 },
            { name: "Option C", items: ["Moong dal cheela 2 (₹10)", "Curd (₹8)"], protein: "16g", cal: 350 },
          ]
        },
      ],
      total: { cal: "1800-2000", protein: "70-80g", cost: "₹100-150" }
    },
    medium: {
      label: "Standard Diet 💪",
      subtitle: "₹200-300/day — balanced nutrition",
      color: C.blue,
      note: "Gym members ke liye ideal — affordable aur effective",
      meals: [
        {
          time: "🌅 Subah (7-8 AM)", budget: "~₹30",
          options: [
            { name: "Option A", items: ["Oats 1 bowl with milk (₹15)", "Boiled egg 2 (₹12)", "Banana (₹5)"], protein: "20g", cal: 400 },
            { name: "Option B", items: ["Paneer bhurji 50g (₹20)", "2 roti (₹5)", "1 glass milk (₹8)"], protein: "22g", cal: 450 },
            { name: "Option C", items: ["Idli 3 (₹10)", "Sambar (₹8)", "Curd (₹8)"], protein: "12g", cal: 380 },
          ]
        },
        {
          time: "⚡ Pre-Workout", budget: "~₹20",
          options: [
            { name: "Option A", items: ["Banana 2 + peanut butter 1 tbsp (₹18)"], protein: "5g", cal: 280 },
            { name: "Option B", items: ["Bread 2 slices + peanut butter (₹18)"], protein: "9g", cal: 350 },
            { name: "Option C", items: ["Sweet potato + curd (₹18)"], protein: "7g", cal: 230 },
          ]
        },
        {
          time: "💪 Post-Workout", budget: "~₹40",
          options: [
            { name: "Option A", items: ["Soya chunks 50g (₹5)", "Rice 1 bowl (₹5)", "Dal (₹8)", "Milk (₹8)"], protein: "34g", cal: 500 },
            { name: "Option B", items: ["Paneer 100g (₹25)", "Roti 2 (₹5)", "Curd (₹8)"], protein: "24g", cal: 530 },
            { name: "Option C", items: ["Greek Yogurt (₹25)", "Banana 2 (₹10)", "Sprouts (₹8)"], protein: "18g", cal: 370 },
          ]
        },
        {
          time: "☀️ Lunch", budget: "~₹60",
          options: [
            { name: "Option A", items: ["Dal + rice + sabzi + curd + salad (₹45)"], protein: "20g", cal: 650 },
            { name: "Option B", items: ["Rajma + rice + raita (₹50)"], protein: "22g", cal: 600 },
            { name: "Option C", items: ["Paneer sabzi + 3 roti + curd (₹55)"], protein: "26g", cal: 680 },
          ]
        },
        {
          time: "🌙 Dinner", budget: "~₹50",
          options: [
            { name: "Option A", items: ["Dal + 2 roti + sabzi + milk (₹40)"], protein: "20g", cal: 500 },
            { name: "Option B", items: ["Paneer + roti + salad (₹45)"], protein: "22g", cal: 520 },
            { name: "Option C", items: ["Chhole + rice + curd (₹40)"], protein: "18g", cal: 480 },
          ]
        },
      ],
      total: { cal: "2200-2500", protein: "100-120g", cost: "₹200-300" }
    }
  },
  nonveg: {
    low: {
      label: "Budget Diet 💰",
      subtitle: "₹100-180/day mein complete nutrition",
      color: C.green,
      note: "Eggs + dal + chicken legs — sabse sasta non-veg protein source",
      meals: [
        {
          time: "🌅 Subah (7-8 AM)", budget: "~₹20",
          options: [
            { name: "Option A", items: ["3 boiled eggs (₹15)", "2 roti (₹5)"], protein: "21g", cal: 350 },
            { name: "Option B", items: ["2 egg omelette (₹12)", "Bread 2 slices (₹8)"], protein: "18g", cal: 320 },
            { name: "Option C", items: ["Egg bhurji 2 eggs (₹12)", "1 glass milk (₹8)"], protein: "20g", cal: 330 },
          ]
        },
        {
          time: "⚡ Pre-Workout", budget: "~₹10",
          options: [
            { name: "Option A", items: ["2 banana (₹10)"], protein: "2g", cal: 180 },
            { name: "Option B", items: ["Bread + jaggery (₹8)", "1 boiled egg (₹5)"], protein: "8g", cal: 230 },
            { name: "Option C", items: ["Sweet potato boiled (₹8)"], protein: "2g", cal: 130 },
          ]
        },
        {
          time: "💪 Post-Workout", budget: "~₹30",
          options: [
            { name: "Option A", items: ["3 boiled eggs (₹15)", "Rice 1 bowl (₹5)", "Dal (₹8)"], protein: "33g", cal: 480 },
            { name: "Option B", items: ["Egg + dal combo (₹20)", "Rice (₹5)"], protein: "22g", cal: 420 },
            { name: "Option C", items: ["4 egg whites (₹14)", "Milk 1 glass (₹8)", "Banana (₹5)"], protein: "22g", cal: 350 },
          ]
        },
        {
          time: "☀️ Lunch", budget: "~₹50",
          options: [
            { name: "Option A", items: ["Chicken legs 2 (₹30)", "Rice (₹5)", "Dal (₹8)", "Salad (₹5)"], protein: "30g", cal: 550 },
            { name: "Option B", items: ["Egg curry 2 eggs (₹20)", "Rice (₹5)", "Roti 2 (₹5)"], protein: "20g", cal: 500 },
            { name: "Option C", items: ["Dal + rice + eggs 2 (₹30)"], protein: "26g", cal: 520 },
          ]
        },
        {
          time: "🌙 Dinner", budget: "~₹40",
          options: [
            { name: "Option A", items: ["Dal + roti 2 (₹15)", "2 eggs any style (₹12)"], protein: "24g", cal: 430 },
            { name: "Option B", items: ["Chicken legs (₹30)", "Roti 2 (₹5)"], protein: "26g", cal: 420 },
            { name: "Option C", items: ["Egg bhurji + roti + milk (₹28)"], protein: "22g", cal: 400 },
          ]
        },
      ],
      total: { cal: "1900-2100", protein: "90-100g", cost: "₹150-180" }
    },
    medium: {
      label: "Standard Diet 💪",
      subtitle: "₹250-400/day — performance nutrition",
      color: C.blue,
      note: "Chicken breast + eggs + proper carbs — gym ke liye best",
      meals: [
        {
          time: "🌅 Subah (7-8 AM)", budget: "~₹35",
          options: [
            { name: "Option A", items: ["3 boiled eggs (₹15)", "Oats + milk (₹15)", "Banana (₹5)"], protein: "27g", cal: 500 },
            { name: "Option B", items: ["Omelette 3 eggs (₹20)", "Bread 2 (₹8)", "Milk (₹8)"], protein: "28g", cal: 480 },
            { name: "Option C", items: ["Egg bhurji (₹20)", "Paratha (₹10)", "Curd (₹8)"], protein: "22g", cal: 520 },
          ]
        },
        {
          time: "⚡ Pre-Workout", budget: "~₹20",
          options: [
            { name: "Option A", items: ["Banana 2 + peanut butter (₹18)"], protein: "5g", cal: 280 },
            { name: "Option B", items: ["Bread + peanut butter + 1 egg (₹20)"], protein: "12g", cal: 350 },
            { name: "Option C", items: ["Sweet potato + boiled egg 1 (₹15)"], protein: "8g", cal: 200 },
          ]
        },
        {
          time: "💪 Post-Workout", budget: "~₹60",
          options: [
            { name: "Option A", items: ["Chicken breast 100g (₹35)", "Rice (₹5)", "Dal (₹8)"], protein: "40g", cal: 520 },
            { name: "Option B", items: ["3 eggs (₹15)", "Tuna 50g (₹30)", "Rice (₹5)"], protein: "38g", cal: 480 },
            { name: "Option C", items: ["Chicken curry (₹45)", "Rice (₹5)", "Curd (₹8)"], protein: "32g", cal: 580 },
          ]
        },
        {
          time: "☀️ Lunch", budget: "~₹80",
          options: [
            { name: "Option A", items: ["Chicken breast 150g (₹50)", "Rice (₹5)", "Sabzi (₹10)", "Salad (₹8)"], protein: "48g", cal: 620 },
            { name: "Option B", items: ["Fish curry (₹50)", "Rice (₹5)", "Dal (₹8)", "Roti (₹5)"], protein: "28g", cal: 600 },
            { name: "Option C", items: ["Egg curry 3 eggs (₹25)", "Rice (₹5)", "Sabzi (₹10)", "Curd (₹8)"], protein: "28g", cal: 580 },
          ]
        },
        {
          time: "🌙 Dinner", budget: "~₹60",
          options: [
            { name: "Option A", items: ["Chicken 100g (₹35)", "Roti 2 (₹5)", "Sabzi (₹8)", "Salad (₹5)"], protein: "38g", cal: 520 },
            { name: "Option B", items: ["Egg curry 2 (₹20)", "Dal (₹8)", "Roti 2 (₹5)"], protein: "26g", cal: 480 },
            { name: "Option C", items: ["Fish (₹45)", "Rice (₹5)", "Salad (₹5)"], protein: "28g", cal: 500 },
          ]
        },
      ],
      total: { cal: "2400-2800", protein: "140-180g", cost: "₹250-400" }
    }
  }
};

// ── PANEER ALTERNATIVES ───────────────────────────────────────────────────────
const PANEER_ALTERNATIVES = [
  { name: "Soya Chunks", protein: "26g/50g", price: "₹5", icon: "🌿", tip: "Boil karke paneer ki jagah use karo — same texture" },
  { name: "Tofu", protein: "8g/100g", price: "₹15-20", icon: "🧊", tip: "Market mein milta hai — paneer jaisa hi taste" },
  { name: "Chana (Chickpeas)", protein: "9g/bowl", price: "₹8", icon: "🫘", tip: "Sabse sasta protein — boiled ya curry mein" },
  { name: "Moong Dal", protein: "8g/bowl", price: "₹8", icon: "🍲", tip: "High protein, easy to digest" },
  { name: "Rajma", protein: "13g/bowl", price: "₹10", icon: "🫘", tip: "Complete protein — rice ke saath best" },
  { name: "Toasted Chana (Sattu)", protein: "10g/50g", price: "₹5", icon: "💪", tip: "Desi protein shake — water mein mix karo" },
  { name: "Sprouted Moong", protein: "7g/bowl", price: "₹5", icon: "🌱", tip: "Ghar mein sprout karo — free mein" },
  { name: "Milk + Curd combo", protein: "11g", price: "₹15", icon: "🥛", tip: "Dono milake piyo — complete amino acids" },
];

// ── NON-VEG SUBSTITUTIONS ─────────────────────────────────────────────────────
const NONVEG_SUBSTITUTIONS = [
  {
    expensive: "Chicken Breast (100g) — ₹35",
    alternatives: [
      { name: "Chicken Legs/Thighs (100g)", price: "₹20", protein: "24g", tip: "Same protein, aadha price" },
      { name: "Eggs 3 whole", price: "₹15", protein: "18g", tip: "Cheap aur easy to cook" },
      { name: "Egg whites 5", price: "₹18", protein: "20g", tip: "Low fat, high protein" },
    ]
  },
  {
    expensive: "Whey Protein (1 scoop) — ₹80-150",
    alternatives: [
      { name: "Sattu (50g) + Milk", price: "₹12", protein: "16g", tip: "Desi protein — same effect" },
      { name: "4 Boiled Eggs", price: "₹20", protein: "24g", tip: "Natural protein source" },
      { name: "Soya chunks + Milk", price: "₹15", protein: "32g", tip: "High protein combo" },
    ]
  },
  {
    expensive: "Tuna/Salmon (100g) — ₹60-100",
    alternatives: [
      { name: "Local Fish (rohu/catla)", price: "₹25-30", protein: "18g", tip: "Same omega-3, cheaper" },
      { name: "Egg + Dal combo", price: "₹15", protein: "15g", tip: "Acha protein source" },
      { name: "Chicken curry (bowl)", price: "₹40", protein: "28g", tip: "More protein, less cost" },
    ]
  },
  {
    expensive: "Mutton (100g) — ₹80-120",
    alternatives: [
      { name: "Chicken legs 2", price: "₹30", protein: "24g", tip: "Best substitute" },
      { name: "Fish curry", price: "₹40", protein: "22g", tip: "Lighter, more protein" },
      { name: "Eggs 4", price: "₹20", protein: "24g", tip: "Cheapest option" },
    ]
  },
];

// ── MEAL TIMING ───────────────────────────────────────────────────────────────
const MEAL_TIMING = [
  { time: "Subah uthne ke baad", icon: "🌅", label: "Wake Up", veg: ["1 glass warm water + lemon", "5-6 almonds ya walnuts"], nonveg: ["1 glass warm water + lemon", "5-6 almonds ya walnuts"], tip: "Metabolism kick-start hota hai" },
  { time: "Workout se 1-2 ghante pehle", icon: "⚡", label: "Pre-Workout", veg: ["Banana + peanut butter", "Oats with milk", "Sweet potato + curd"], nonveg: ["Banana + boiled eggs", "Bread + egg omelette", "Sweet potato + eggs"], tip: "Carbs + protein = energy aur performance" },
  { time: "Workout ke 30-45 min baad", icon: "💪", label: "Post-Workout", veg: ["Soya chunks + rice + milk", "Paneer + roti", "Chana + curd"], nonveg: ["Chicken + rice", "3 boiled eggs + rice", "Tuna + rice"], tip: "Yeh window muscle recovery ke liye best hai" },
  { time: "Dopahar ka khana", icon: "☀️", label: "Lunch", veg: ["Dal + rice + curd + sabzi", "Rajma chawal", "Chhole + roti + curd"], nonveg: ["Chicken curry + rice", "Fish + roti + salad", "Egg curry + rice"], tip: "Din ka sabse bada meal — balanced plate" },
  { time: "Shaam ka snack", icon: "🌤️", label: "Evening Snack", veg: ["Sprouts chaat", "Chana chaat", "Banana + milk"], nonveg: ["Boiled eggs 2", "Egg chaat", "Chicken tikka"], tip: "Light rakho — heavy nahi" },
  { time: "Raat ka khana", icon: "🌙", label: "Dinner", veg: ["Dal + roti + sabzi", "Soya chunks + roti", "Moong dal + roti"], nonveg: ["Grilled chicken + sabzi", "Fish + roti", "Egg curry + roti"], tip: "Raat ko carbs kam karo, protein zyada" },
  { time: "Sone se 30 min pehle", icon: "😴", label: "Before Bed", veg: ["1 glass warm milk", "Curd ya paneer"], nonveg: ["1 glass warm milk", "2 egg whites"], tip: "Casein protein raat bhar muscles repair karta hai" },
];

// ── MACRO GUIDE ───────────────────────────────────────────────────────────────
const MACRO_GUIDE = [
  {
    name: "Protein", icon: "🥩", color: "#00ff88", hindi: "Muscles banata hai",
    what: "Body ke building blocks — muscles, skin, hormones sab protein se bante hain",
    why: "Gym mein muscles toot ti hain. Protein unhe repair aur grow karta hai",
    how: "Body weight × 1.5–2.2g per kg (70kg → 105–154g/day)",
    sources_veg: ["Soya chunks (sabse sasta)", "Dal + rajma + chhole", "Curd + milk", "Chana + moong", "Paneer (affordable substitute se bhi kaam chalega)"],
    sources_nonveg: ["Eggs (sabse sasta)", "Chicken legs (cheap)", "Local fish", "Chicken breast"],
  },
  {
    name: "Carbs", icon: "🍞", color: "#4488ff", hindi: "Energy deta hai",
    what: "Body ka primary fuel — brain aur muscles dono ko chahiye",
    why: "Gym mein energy ke liye carbs zaroori hain",
    how: "Total calories ka 40–50% (generally 200–300g/day)",
    sources_veg: ["Rice (₹5/bowl)", "Roti (₹3/piece)", "Oats (₹8/bowl)", "Sweet potato (₹8)", "Banana (₹5)"],
    sources_nonveg: ["Rice", "Roti", "Oats", "Bread", "Sweet potato"],
  },
  {
    name: "Fat", icon: "🥑", color: "#ffcc00", hindi: "Hormones ke liye",
    what: "Healthy fats hormones banate hain, vitamins absorb karte hain",
    why: "Fat se daro mat — testosterone ke liye zaroori hai",
    how: "Total calories ka 25% (generally 50–70g/day)",
    sources_veg: ["Peanuts (₹10/handful)", "Peanut butter", "Til (sesame)", "Coconut", "Ghee thoda"],
    sources_nonveg: ["Eggs (yolk)", "Fish (omega-3)", "Peanuts", "Peanut butter"],
  },
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
  const [budgetLevel, setBudgetLevel] = useState("low");
  const [nutProfile, setNutProfile] = useState(() => userStorage.get(uid, "nut_profile") || { age: "", weight: "", height: "", gender: "male", activity: "moderate", goal: "maintain" });
  const [nutTargets, setNutTargets] = useState(() => userStorage.get(uid, "nut_targets") || null);
  const [foodLog, setFoodLog] = useState(() => {
    const saved = userStorage.get(uid, "food_log");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved : { date: today, items: [] };
  });
  const [foodSearch, setFoodSearch] = useState("");
  const [expandedMacro, setExpandedMacro] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [expandedSub, setExpandedSub] = useState(null);
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
    setNutTargets(targets); userStorage.set(uid, "nut_targets", targets); userStorage.set(uid, "nut_profile", nutProfile);
    showToast("Targets calculate ho gaye! 🎯"); setNutTab("today");
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
  };

  const getFilteredFoods = () => {
    let foods = FOODS;
    if (dietType === "veg") foods = foods.filter(f => f.type === "veg");
    else if (dietType === "egg") foods = foods.filter(f => f.type === "veg" || f.type === "egg");
    if (foodSearch) foods = foods.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));
    return foods;
  };

  const totalEaten = foodLog.items.reduce((acc, f) => ({ cal: acc.cal + f.cal, protein: acc.protein + f.protein, carbs: acc.carbs + f.carbs, fat: acc.fat + f.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });

  const currentBudgetPlan = BUDGET_PLANS[dietType === "nonveg" ? "nonveg" : "veg"]?.[budgetLevel];

  const TABS = [
    ["today", "📊", "Today"],
    ["budget", "💰", "Budget"],
    ["alternative", "🔄", "Altern."],
    ["foods", "🍽️", "Foods"],
    ["timing", "⏰", "Timing"],
    ["guide", "📚", "Guide"],
    ["calculator", "🧮", "Calc"],
  ];

  return (
    <div>
      <div style={{ fontSize: 22, marginBottom: 4 }}>NUTRITION</div>

      {/* Diet Type */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[["veg","🥦 Veg"],["egg","🥚 Egg"],["nonveg","🍗 Non-Veg"]].map(([v, l]) => (
          <button key={v} onClick={() => setDiet(v)} style={{ flex: 1, background: dietType === v ? C.accentDim : C.card, border: `1px solid ${dietType === v ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", color: dietType === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500 }}>{l}</button>
        ))}
      </div>

      {/* Sub Tabs — scrollable */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {TABS.map(([t, icon, label]) => (
          <button key={t} onClick={() => setNutTab(t)} style={{ flex: "0 0 auto", background: nutTab === t ? C.accentDim : C.card, border: `1px solid ${nutTab === t ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: nutTab === t ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>{icon} {label}</button>
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
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 14, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14 }}>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🍽️ Eaten</div><div style={{ fontSize: 26, color: C.orange }}>{totalEaten.cal}</div></div>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🔥 Burned</div><div style={{ fontSize: 26, color: C.red }}>{caloriesBurned || 0}</div></div>
              <div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>⚡ Net</div><div style={{ fontSize: 26, color: C.accent }}>{totalEaten.cal - (caloriesBurned || 0)}</div></div>
            </div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 6 }}>Goal: {nutTargets.calories} kcal/day</div>
            <div style={{ height: 10, background: C.border, borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: totalEaten.cal > nutTargets.calories ? C.red : C.orange, borderRadius: 5, transition: "width 0.3s" }} />
            </div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 6 }}>
              {nutTargets.calories - totalEaten.cal > 0 ? `${nutTargets.calories - totalEaten.cal} kcal remaining` : `${totalEaten.cal - nutTargets.calories} kcal over!`}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>MACROS</div>
            <MacroBar label="🥩 Protein" current={totalEaten.protein} target={nutTargets.protein} color={C.accent} />
            <MacroBar label="🍞 Carbs" current={totalEaten.carbs} target={nutTargets.carbs} color={C.blue} />
            <MacroBar label="🥑 Fat" current={totalEaten.fat} target={nutTargets.fat} color={C.yellow} />
          </div>
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

      {/* BUDGET DIET PLAN */}
      {nutTab === "budget" && (
        <div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 14 }}>
            Apne budget ke hisaab se diet plan choose karo 💰
          </div>

          {/* Budget selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[["low","💰 Budget\n₹100-180/day"],["medium","💪 Standard\n₹200-400/day"]].map(([v, l]) => (
              <button key={v} onClick={() => setBudgetLevel(v)} style={{ flex: 1, background: budgetLevel === v ? (v === "low" ? C.green + "22" : C.blue + "22") : C.card, border: `1px solid ${budgetLevel === v ? (v === "low" ? C.green : C.blue) : C.border}`, borderRadius: 10, padding: "12px 8px", cursor: "pointer", color: budgetLevel === v ? (v === "low" ? C.green : C.blue) : C.muted, fontFamily: "'Outfit'", fontSize: 12, fontWeight: 500, whiteSpace: "pre-line", textAlign: "center" }}>{l}</button>
            ))}
          </div>

          {currentBudgetPlan && (
            <>
              {/* Plan header */}
              <div style={{ background: `${currentBudgetPlan.color}11`, border: `1px solid ${currentBudgetPlan.color}44`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 18, color: currentBudgetPlan.color, marginBottom: 4 }}>{currentBudgetPlan.label}</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, marginBottom: 6 }}>{currentBudgetPlan.subtitle}</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, borderLeft: `3px solid ${currentBudgetPlan.color}`, paddingLeft: 8 }}>💡 {currentBudgetPlan.note}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  {[["🔥", currentBudgetPlan.total.cal, "Calories"], ["🥩", currentBudgetPlan.total.protein, "Protein"], ["💰", currentBudgetPlan.total.cost, "Cost/Day"]].map(([icon, val, label]) => (
                    <div key={label} style={{ flex: 1, background: C.surface, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                      <div style={{ fontSize: 16 }}>{icon}</div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: C.text }}>{val}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              {currentBudgetPlan.meals.map((meal, mIdx) => (
                <div key={mIdx} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                  <button onClick={() => setExpandedMeal(expandedMeal === mIdx ? null : mIdx)} style={{ width: "100%", background: "none", border: "none", padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                    <div>
                      <div style={{ fontSize: 15, color: C.accent }}>{meal.time}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 2 }}>Budget: {meal.budget} · {meal.options.length} options</div>
                    </div>
                    <div style={{ color: C.muted, fontSize: 18 }}>{expandedMeal === mIdx ? "▲" : "▼"}</div>
                  </button>

                  {expandedMeal === mIdx && (
                    <div style={{ padding: "0 16px 16px" }}>
                      {meal.options.map((opt, oIdx) => (
                        <div key={oIdx} style={{ background: C.surface, borderRadius: 10, padding: 12, marginBottom: 10, border: `1px solid ${C.border}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: C.blue }}>🔵 {opt.name}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <span style={{ fontFamily: "'Outfit'", fontSize: 11, background: C.accentDim, color: C.accent, borderRadius: 4, padding: "2px 6px" }}>P: {opt.protein}</span>
                              <span style={{ fontFamily: "'Outfit'", fontSize: 11, background: `${C.orange}22`, color: C.orange, borderRadius: 4, padding: "2px 6px" }}>{opt.cal} kcal</span>
                            </div>
                          </div>
                          {opt.items.map((item, iIdx) => (
                            <div key={iIdx} style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.text, padding: "2px 0", display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ color: C.green, fontSize: 10 }}>●</span> {item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ALTERNATIVES */}
      {nutTab === "alternative" && (
        <div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>
            Koi item afford nahi? Yeh alternatives try karo! 🔄
          </div>

          {/* Paneer Alternatives */}
          {(dietType === "veg" || dietType === "egg") && (
            <>
              <div style={{ background: `${C.orange}11`, border: `1px solid ${C.orange}33`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 18, color: C.orange, marginBottom: 4 }}>🧀 Paneer ke Alternatives</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>Har din paneer afford nahi hota — yeh options try karo</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {PANEER_ALTERNATIVES.map((alt, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, color: C.text }}>{alt.icon} {alt.name}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 3 }}>💡 {alt.tip}</div>
                    </div>
                    <div style={{ textAlign: "right", marginLeft: 10 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.accent }}>P: {alt.protein}</div>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.green }}>{alt.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Non-Veg Substitutions */}
          {dietType === "nonveg" && (
            <>
              <div style={{ background: `${C.red}11`, border: `1px solid ${C.red}33`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 18, color: C.red, marginBottom: 4 }}>🍗 Mehenga item afford nahi?</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>Yeh substitutions same protein denge, kam price mein</div>
              </div>
              {NONVEG_SUBSTITUTIONS.map((sub, sIdx) => (
                <div key={sIdx} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                  <button onClick={() => setExpandedSub(expandedSub === sIdx ? null : sIdx)} style={{ width: "100%", background: "none", border: "none", padding: "14px 16px", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 4 }}>Agar yeh mehenga hai:</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.red }}>❌ {sub.expensive}</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.accent, marginTop: 4 }}>✅ {sub.alternatives.length} saste options available — tap karo</div>
                  </button>
                  {expandedSub === sIdx && (
                    <div style={{ padding: "0 16px 16px" }}>
                      {sub.alternatives.map((alt, aIdx) => (
                        <div key={aIdx} style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 8, borderLeft: `3px solid ${C.green}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, fontWeight: 500 }}>✅ {alt.name}</div>
                            <div style={{ display: "flex", gap: 6 }}>
                              <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.accent }}>P: {alt.protein}</span>
                              <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.green }}>{alt.price}</span>
                            </div>
                          </div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted }}>💡 {alt.tip}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Mixed diet tip */}
          <div style={{ background: `${C.blue}11`, border: `1px solid ${C.blue}33`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 16, color: C.blue, marginBottom: 8 }}>💡 Pro Tips — Budget Diet</div>
            {[
              "Soya chunks sabse sasta protein source hai — 50g mein 26g protein, sirf ₹5",
              "Eggs bulk mein kharido — 30 eggs ek saath lo, sasta padega",
              "Dal + rice together complete protein dete hain (complementary proteins)",
              "Sprouts ghar pe banao — moong dal ek raat pani mein bhi raho, free protein",
              "Milk subah uthke piyo — cheap + casein protein raat bhar kaam karta hai",
              "Seasonal fruits lo — mango, banana, guava saste aur nutritious hain",
            ].map((tip, i) => (
              <div key={i} style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.text, padding: "4px 0", display: "flex", gap: 8 }}>
                <span style={{ color: C.blue, flexShrink: 0 }}>→</span> {tip}
              </div>
            ))}
          </div>
        </div>
      )}

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
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    {food.icon} {food.name}
                    <span style={{ fontSize: 10, background: food.type === "nonveg" ? C.red + "22" : food.type === "egg" ? C.yellow + "22" : C.accent + "22", color: food.type === "nonveg" ? C.red : food.type === "egg" ? C.yellow : C.accent, borderRadius: 4, padding: "1px 6px" }}>
                      {food.type === "nonveg" ? "Non-Veg" : food.type === "egg" ? "Egg" : "Veg"}
                    </span>
                    {food.price === "low" && <span style={{ fontSize: 9, background: C.green + "22", color: C.green, borderRadius: 4, padding: "1px 5px" }}>💰 Budget</span>}
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
              {(mealTimingDiet === "veg" ? meal.veg : meal.nonveg).map((item, j) => (
                <div key={j} style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.accent, fontSize: 10 }}>●</span> {item}
                </div>
              ))}
              <div style={{ background: `${C.yellow}11`, borderRadius: 6, padding: "6px 10px", marginTop: 8, fontFamily: "'Outfit'", fontSize: 12, color: C.yellow, borderLeft: `3px solid ${C.yellow}` }}>💡 {meal.tip}</div>
            </div>
          ))}
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
