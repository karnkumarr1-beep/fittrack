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

// ── FOOD DATABASE — VEG + NON-VEG ────────────────────────────────────────────
const FOODS = [
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
  { name: "Paneer Shake (1 glass)", cal: 320, protein: 22, carbs: 28, fat: 12, type: "veg", category: "Dairy", icon: "🥤" },
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
  { name: "Samosa (1)", cal: 260, protein: 4, carbs: 32, fat: 13, type: "veg", category: "Snacks", icon: "🔺" },
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

// ── WORKOUT CALORIE BURN ──────────────────────────────────────────────────────
const WORKOUT_BURN = {
  Chest: { Beginner: 200, Intermediate: 280, Advanced: 360 },
  Back: { Beginner: 220, Intermediate: 300, Advanced: 390 },
  Shoulders: { Beginner: 180, Intermediate: 250, Advanced: 320 },
  Arms: { Beginner: 150, Intermediate: 200, Advanced: 260 },
  Legs: { Beginner: 280, Intermediate: 380, Advanced: 480 },
  Core: { Beginner: 160, Intermediate: 220, Advanced: 290 },
  "Full Body": { Beginner: 300, Intermediate: 420, Advanced: 550 },
};

// ── MEAL TIMING GUIDE ─────────────────────────────────────────────────────────
const MEAL_TIMING = [
  {
    time: "Subah uthne ke baad", icon: "🌅", label: "Wake Up",
    veg: ["1 glass warm water with lemon", "5-6 almonds ya walnuts"],
    nonveg: ["1 glass warm water with lemon", "5-6 almonds ya walnuts"],
    tip: "Metabolism kick-start hota hai"
  },
  {
    time: "Workout se 1-2 ghante pehle", icon: "⚡", label: "Pre-Workout",
    veg: ["Banana + peanut butter", "Oats with milk", "Roti + dal"],
    nonveg: ["Banana + boiled eggs", "Oats with milk", "Bread + egg omelette"],
    tip: "Carbs + protein = energy aur performance"
  },
  {
    time: "Workout ke 30-45 min baad", icon: "💪", label: "Post-Workout",
    veg: ["Whey protein shake", "Paneer + roti", "Curd + banana"],
    nonveg: ["Whey protein + banana", "Chicken breast + rice", "Boiled eggs + rice"],
    tip: "Ye window muscle recovery ke liye best hai"
  },
  {
    time: "Dopahar ka khana", icon: "☀️", label: "Lunch",
    veg: ["Dal + rice + curd + sabzi", "Rajma chawal", "Paneer curry + roti"],
    nonveg: ["Chicken curry + rice", "Fish + roti + salad", "Mutton + dal + rice"],
    tip: "Din ka sabse bada meal — balanced plate"
  },
  {
    time: "Shaam ka snack", icon: "🌤️", label: "Evening Snack",
    veg: ["Sprouts chaat", "Fruits + curd", "Chana chaat"],
    nonveg: ["Boiled eggs", "Chicken tikka", "Tuna salad"],
    tip: "Light rakho — heavy nahi"
  },
  {
    time: "Raat ka khana", icon: "🌙", label: "Dinner",
    veg: ["Dal + roti + salad", "Paneer + sabzi + roti", "Khichdi + curd"],
    nonveg: ["Grilled chicken + sabzi", "Fish + roti + salad", "Egg curry + roti"],
    tip: "Raat ko carbs kam karo, protein zyada"
  },
  {
    time: "Sone se 30 min pehle", icon: "😴", label: "Before Bed",
    veg: ["1 glass warm milk", "Curd ya paneer"],
    nonveg: ["1 glass warm milk", "Boiled egg white (2)"],
    tip: "Casein protein raat bhar muscles repair karta hai"
  },
];

// ── MACRO GUIDE FOR BEGINNERS ─────────────────────────────────────────────────
const MACRO_GUIDE = [
  {
    name: "Protein", icon: "🥩", color: "#00ff88", hindi: "Muscles banata hai",
    what: "Body ke building blocks hain — har cell protein se bani hai",
    why: "Gym karte ho toh muscles toot ti hain. Protein unhe repair aur grow karta hai",
    how: "Apne weight ka 1.5-2.2 gram per kg (70kg = 105-154g/day)",
    sources_veg: ["Paneer", "Dal", "Rajma", "Soya chunks", "Curd", "Whey protein"],
    sources_nonveg: ["Chicken breast", "Eggs", "Fish", "Tuna", "Mutton"],
  },
  {
    name: "Carbs", icon: "🍞", color: "#4488ff", hindi: "Energy deta hai",
    what: "Body ka primary fuel source — brain aur muscles dono ko chahiye",
    why: "Gym mein energy ke liye carbs zaroor chahiye. Kam karo toh weak feel hoga",
    how: "Total calories ka 40-50% (generally 200-300g/day)",
    sources_veg: ["Rice", "Roti", "Oats", "Sweet potato", "Banana", "Bread"],
    sources_nonveg: ["Rice", "Roti", "Oats", "Sweet potato", "Banana"],
  },
  {
    name: "Fat", icon: "🥑", color: "#ffcc00", hindi: "Hormones ke liye",
    what: "Healthy fats hormones banate hain, vitamins absorb karte hain",
    why: "Fat se daro mat — fat nahi khaoge toh testosterone kam hoga, muscles nahi banenge",
    how: "Total calories ka 25% (generally 50-70g/day)",
    sources_veg: ["Almonds", "Walnuts", "Peanut butter", "Ghee (thoda)", "Coconut"],
    sources_nonveg: ["Salmon", "Eggs (yolk)", "Almonds", "Peanut butter", "Fish"],
  },
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
  muted: "#5a5a78", red: "#ff4466", yellow: "#ffcc00", blue: "#4488ff", orange: "#ff8844",
};

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
  const [nutProfile, setNutProfile] = useState(() => storage.get("ft_nut_profile") || { age: "", weight: "", height: "", gender: "male", activity: "moderate", goal: "maintain" });
  const [nutTargets, setNutTargets] = useState(() => storage.get("ft_nut_targets") || null);
  const [foodLog, setFoodLog] = useState(() => {
    const saved = storage.get("ft_food_log");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved : { date: today, items: [] };
  });
  const [foodSearch, setFoodSearch] = useState("");
  const [nutTab, setNutTab] = useState("today");
  const [dietType, setDietType] = useState(() => storage.get("ft_diet") || "veg"); // veg | egg | nonveg
  const [waterCount, setWaterCount] = useState(() => {
    const saved = storage.get("ft_water");
    const today = new Date().toLocaleDateString("en-IN");
    return (saved && saved.date === today) ? saved.count : 0;
  });
  const [waterGoal] = useState(8);
  const [caloriesBurned, setCaloriesBurned] = useState(() => storage.get("ft_burned") || 0);
  const [expandedMacro, setExpandedMacro] = useState(null);
  const [mealTimingDiet, setMealTimingDiet] = useState("veg");

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
    const burned = WORKOUT_BURN[selectedMuscle]?.[selectedLevel] || 250;
    const newBurned = caloriesBurned + burned;
    setCaloriesBurned(newBurned); storage.set("ft_burned", newBurned);
    setCompleted(true);
    showToast(`Workout complete! 🔥 ~${burned} kcal burned!`);
  };

  const addWater = () => {
    if (waterCount >= waterGoal) { showToast("Daily goal complete! 💧"); return; }
    const newCount = waterCount + 1;
    setWaterCount(newCount);
    storage.set("ft_water", { date: new Date().toLocaleDateString("en-IN"), count: newCount });
    if (newCount === waterGoal) showToast("💧 Water goal complete! Great job!");
  };

  const calculateTargets = () => {
    const { age, weight, height, gender, activity, goal } = nutProfile;
    if (!age || !weight || !height) { showToast("Saari info fill karo!", "error"); return; }
    const w = parseFloat(weight); const h = parseFloat(height); const a = parseInt(age);
    let bmr = gender === "male" ? (10 * w) + (6.25 * h) - (5 * a) + 5 : (10 * w) + (6.25 * h) - (5 * a) - 161;
    const activityMultiplier = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    let tdee = bmr * activityMultiplier[activity];
    let calories = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 300 : tdee;
    calories = Math.round(calories);
    const protein = Math.round(w * 2.2);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    const targets = { calories, protein, fat, carbs, bmr: Math.round(bmr), tdee: Math.round(tdee) };
    setNutTargets(targets); storage.set("ft_nut_targets", targets);
    storage.set("ft_nut_profile", nutProfile);
    storage.set("ft_diet", dietType);
    showToast("Targets set ho gaye! 🎯"); setNutTab("today");
  };

  const addFood = (food) => {
    const today = new Date().toLocaleDateString("en-IN");
    const newLog = foodLog.date === today ? { ...foodLog, items: [...foodLog.items, { ...food, id: Date.now() }] } : { date: today, items: [{ ...food, id: Date.now() }] };
    setFoodLog(newLog); storage.set("ft_food_log", newLog);
    showToast(`+${food.cal} kcal added! 🍽️`);
  };

  const removeFood = (id) => {
    const newLog = { ...foodLog, items: foodLog.items.filter(f => f.id !== id) };
    setFoodLog(newLog); storage.set("ft_food_log", newLog);
  };

  const getFilteredFoods = () => {
    let foods = FOODS;
    if (dietType === "veg") foods = foods.filter(f => f.type === "veg");
    else if (dietType === "egg") foods = foods.filter(f => f.type === "veg" || f.type === "egg");
    if (foodSearch) foods = foods.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));
    return foods;
  };

  const totalEaten = foodLog.items.reduce((acc, f) => ({ cal: acc.cal + f.cal, protein: acc.protein + f.protein, carbs: acc.carbs + f.carbs, fat: acc.fat + f.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
  const netCalories = totalEaten.cal - caloriesBurned;

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
  const savePlan = () => { setWeekPlan(tempPlan); storage.set("ft_plan", tempPlan); setEditingPlan(false); showToast("Weekly plan saved!"); };
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
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(${C.border}22 1px, transparent 1px), linear-gradient(90deg, ${C.border}22 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />

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
                <div style={{ background: `${MUSCLE_COLORS[todayMuscle]}22`, border: `1px solid ${MUSCLE_COLORS[todayMuscle]}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>📅 TODAY'S PLAN</div>
                    <div style={{ fontSize: 20, color: MUSCLE_COLORS[todayMuscle] }}>{todayMuscle} Day</div>
                  </div>
                  <button onClick={() => handleGenerate(todayMuscle)} style={{ background: MUSCLE_COLORS[todayMuscle], border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14 }}>START ⚡</button>
                </div>
              )}

              {/* Water + Calorie on Home */}
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                {nutTargets && (
                  <div style={{ flex: 1, background: `${C.orange}11`, border: `1px solid ${C.orange}33`, borderRadius: 10, padding: "12px" }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>🥗 CALORIES</div>
                    <div style={{ fontSize: 18, color: C.orange }}>{totalEaten.cal}<span style={{ fontSize: 11, color: C.muted }}>/{nutTargets.calories}</span></div>
                    <div style={{ height: 4, background: C.border, borderRadius: 2, marginTop: 6 }}>
                      <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: C.orange, borderRadius: 2 }} />
                    </div>
                  </div>
                )}
                <div style={{ flex: 1, background: "#4488ff11", border: "1px solid #4488ff33", borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: C.muted }}>💧 WATER</div>
                  <div style={{ fontSize: 18, color: C.blue }}>{waterCount}<span style={{ fontSize: 11, color: C.muted }}>/{waterGoal} glasses</span></div>
                  <button onClick={addWater} style={{ marginTop: 6, background: `${C.blue}22`, border: `1px solid ${C.blue}44`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: C.blue, fontFamily: "'Outfit'", fontSize: 11, width: "100%" }}>+ Add Glass</button>
                </div>
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
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange, marginTop: 4 }}>~{WORKOUT_BURN[selectedMuscle]?.[selectedLevel]} kcal burned 🔥</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginTop: 2 }}>Streak: {streak} days</div>
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
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>🎯 TODAY</div>
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

          {/* ── NUTRITION SCREEN ── */}
          {screen === "nutrition" && (
            <div className="animate-in">
              <div style={{ fontSize: 22, marginBottom: 4 }}>NUTRITION</div>

              {/* Diet Type Selector */}
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {[["veg","🥦 Veg"],["egg","🥚 Eggetarian"],["nonveg","🍗 Non-Veg"]].map(([v, l]) => (
                  <button key={v} onClick={() => { setDietType(v); storage.set("ft_diet", v); }} style={{ flex: 1, background: dietType === v ? C.accentDim : C.card, border: `1px solid ${dietType === v ? C.accent : C.border}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", color: dietType === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 11, fontWeight: 500 }}>{l}</button>
                ))}
              </div>

              {/* Sub Tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {[["today","📊 Today"],["foods","🍽️ Foods"],["guide","📚 Guide"],["timing","⏰ Meal Time"],["calculator","🧮 Calc"]].map(([t, label]) => (
                  <button key={t} onClick={() => setNutTab(t)} style={{ flex: 1, background: nutTab === t ? C.accentDim : C.card, border: `1px solid ${nutTab === t ? C.accent + "66" : C.border}`, borderRadius: 8, padding: "7px 2px", cursor: "pointer", color: nutTab === t ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 9, fontWeight: 500 }}>{label}</button>
                ))}
              </div>

              {/* TODAY TAB */}
              {nutTab === "today" && (
                <>
                  {!nutTargets ? (
                    <div style={{ textAlign: "center", padding: "30px", color: C.muted, fontFamily: "'Outfit'" }}>
                      <div style={{ fontSize: 48 }}>🧮</div>
                      <div style={{ marginTop: 12 }}>Pehle Calculator mein info daalo!</div>
                      <button onClick={() => setNutTab("calculator")} style={{ marginTop: 16, background: C.accent, border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "'Bebas Neue'", fontSize: 16 }}>CALCULATOR OPEN KARO</button>
                    </div>
                  ) : (
                    <>
                      {/* Calorie Card */}
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 14, textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 16 }}>
                          <div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Eaten</div>
                            <div style={{ fontSize: 28, color: C.orange }}>{totalEaten.cal}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Burned 🔥</div>
                            <div style={{ fontSize: 28, color: C.red }}>{caloriesBurned}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>Net</div>
                            <div style={{ fontSize: 28, color: C.accent }}>{netCalories}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 8 }}>Goal: {nutTargets.calories} kcal</div>
                        <div style={{ height: 10, background: C.border, borderRadius: 5, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((totalEaten.cal / nutTargets.calories) * 100, 100)}%`, background: totalEaten.cal > nutTargets.calories ? C.red : C.orange, borderRadius: 5 }} />
                        </div>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginTop: 6 }}>
                          {nutTargets.calories - totalEaten.cal > 0 ? `${nutTargets.calories - totalEaten.cal} kcal remaining` : `${totalEaten.cal - nutTargets.calories} kcal over!`}
                        </div>
                      </div>

                      {/* Water Tracker */}
                      <div style={{ background: "#4488ff11", border: "1px solid #4488ff33", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.blue }}>💧 Water Intake</div>
                          <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.blue }}>{waterCount}/{waterGoal} glasses</div>
                        </div>
                        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                          {Array.from({ length: waterGoal }).map((_, i) => (
                            <div key={i} style={{ flex: 1, height: 32, borderRadius: 6, background: i < waterCount ? C.blue : C.border, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                              {i < waterCount ? "💧" : ""}
                            </div>
                          ))}
                        </div>
                        <button onClick={addWater} style={{ width: "100%", background: `${C.blue}22`, border: `1px solid ${C.blue}44`, borderRadius: 8, padding: "8px", cursor: "pointer", color: C.blue, fontFamily: "'Bebas Neue'", fontSize: 15 }}>
                          {waterCount >= waterGoal ? "✅ GOAL COMPLETE!" : "+ ADD GLASS OF WATER"}
                        </button>
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
                              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>P:{item.protein}g C:{item.carbs}g F:{item.fat}g</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: C.orange }}>{item.cal}</div>
                              <button onClick={() => removeFood(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, fontSize: 18 }}>×</button>
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
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 10 }}>
                    {dietType === "veg" ? "🥦 Sirf Vegetarian foods dikh rahe hain" : dietType === "egg" ? "🥚 Veg + Egg foods dikh rahe hain" : "🍗 Saare foods dikh rahe hain"}
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
                          <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginTop: 2 }}>P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g · {food.category}</div>
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

              {/* GUIDE TAB — BEGINNER MACRO GUIDE */}
              {nutTab === "guide" && (
                <>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.muted, marginBottom: 16 }}>Beginners ke liye simple guide — Protein, Carbs, Fat kya hota hai</div>
                  {MACRO_GUIDE.map((macro, idx) => (
                    <div key={idx} style={{ background: C.card, border: `1px solid ${macro.color}33`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
                      <button onClick={() => setExpandedMacro(expandedMacro === idx ? null : idx)}
                        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
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
                          <div style={{ background: `${macro.color}11`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: macro.color, marginBottom: 4, fontWeight: 600 }}>Kya hai?</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{macro.what}</div>
                          </div>
                          <div style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.yellow, marginBottom: 4, fontWeight: 600 }}>Gym ke liye kyun zaroori?</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{macro.why}</div>
                          </div>
                          <div style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.muted, marginBottom: 4, fontWeight: 600 }}>Kitna khana chahiye?</div>
                            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: C.text }}>{macro.how}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ flex: 1, background: C.surface, borderRadius: 8, padding: 10 }}>
                              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.accent, marginBottom: 6 }}>🥦 Veg Sources</div>
                              {macro.sources_veg.map(s => <div key={s} style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.text, padding: "2px 0" }}>• {s}</div>)}
                            </div>
                            {dietType !== "veg" && (
                              <div style={{ flex: 1, background: C.surface, borderRadius: 8, padding: 10 }}>
                                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.red, marginBottom: 6 }}>🍗 Non-Veg Sources</div>
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

              {/* MEAL TIMING TAB */}
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
                      <div style={{ background: `${C.yellow}11`, borderRadius: 6, padding: "6px 10px", fontFamily: "'Outfit'", fontSize: 12, color: C.yellow, borderLeft: `3px solid ${C.yellow}` }}>
                        💡 {meal.tip}
                      </div>
                    </div>
                  ))}
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
                        {[["sedentary","🪑 Sedentary — koi exercise nahi"],["light","🚶 Light — hafte 1-3 din"],["moderate","🏃 Moderate — hafte 3-5 din"],["active","💪 Active — hafte 6-7 din"],["very_active","🔥 Very Active — din mein 2 baar"]].map(([v, l]) => (
                          <button key={v} onClick={() => setNutProfile(p => ({ ...p, activity: v }))} style={{ background: nutProfile.activity === v ? C.accentDim : C.surface, border: `1px solid ${nutProfile.activity === v ? C.accent : C.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", color: nutProfile.activity === v ? C.accent : C.muted, fontFamily: "'Outfit'", fontSize: 12, textAlign: "left" }}>{l}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted, marginBottom: 8 }}>GOAL</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[["lose","⬇️ Weight Lose"],["maintain","⚖️ Maintain"],["gain","⬆️ Muscle Gain"]].map(([v, l]) => (
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
                {[["📅","Weekly Planner","Mon-Sun ka schedule"],["💪","7 Muscle Groups","105 exercises"],["⏱️","Rest Timer","Countdown + beep"],["🏆","PR Tracker","Personal records"],["🥗","Nutrition","Calorie + macro + meal timing"],["💧","Water Tracker","Daily 8 glass goal"],["🔥","Calorie Burn","Workout se kitna burn hua"],["📚","Beginner Guide","Macros simply samjhao"],["📈","Body Progress","Measurements & charts"],["💾","Auto Save","Sab kuch save"]].map(([icon,title,desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <div><div style={{ fontSize: 13, color: C.text }}>{title}</div><div style={{ fontFamily: "'Outfit'", fontSize: 11, color: C.muted }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { if (window.confirm("Saara data delete hoga?")) { localStorage.clear(); setHistory([]); setStreak(0); setMemberName(""); setNameInput(""); setPrs({}); setBodyLogs([]); setWeekPlan(DEFAULT_PLAN); setNutTargets(null); setFoodLog({ date: new Date().toLocaleDateString("en-IN"), items: [] }); setWaterCount(0); setCaloriesBurned(0); showToast("Reset!", "error"); } }} style={{ width: "100%", background: "transparent", border: `1px solid ${C.red}44`, borderRadius: 10, padding: 14, cursor: "pointer", color: C.red, fontFamily: "'Outfit'", fontSize: 14 }}>🗑️ Reset All Data</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
