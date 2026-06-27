// Health & Wellness learning content for SHS students.
// Modern, concise and accurate (aligned with WHO / NHS / AASM guidance),
// written to be skimmable and visual rather than long-form reading.

export interface BodySystem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  tagline: string;
  /** One-line "what it does". */
  job: string;
  /** Key organs / parts. */
  parts: string[];
  /** A surprising, memorable fact to hook attention. */
  wow: string;
  /** Practical "keep it healthy" habits. */
  care: string[];
}

export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: "circulatory",
    name: "Circulatory System",
    emoji: "🫀",
    color: "#DC2626",
    tagline: "Your delivery network",
    job: "Pumps blood to carry oxygen, nutrients and warmth to every cell, and takes waste away.",
    parts: ["Heart", "Arteries", "Veins", "Capillaries", "Blood"],
    wow: "Your heart beats about 100,000 times a day and your blood vessels, laid end to end, would wrap around the Earth twice.",
    care: [
      "Do cardio (run, dance, skip) — it strengthens the heart muscle.",
      "Eat less salt and fried food to protect your blood vessels.",
      "Don't smoke; it stiffens arteries early.",
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    emoji: "🫁",
    color: "#0EA5E9",
    tagline: "Your air exchange",
    job: "Takes in oxygen and removes carbon dioxide every time you breathe.",
    parts: ["Nose", "Trachea (windpipe)", "Bronchi", "Lungs", "Diaphragm"],
    wow: "You breathe around 22,000 times a day, and your lungs hold about 6 litres of air — yet you only use a fraction at rest.",
    care: [
      "Exercise to boost lung capacity.",
      "Avoid smoke, dust and fumes; wear a mask when needed.",
      "Practise deep breathing to calm down and oxygenate the brain.",
    ],
  },
  {
    id: "digestive",
    name: "Digestive System",
    emoji: "🍽️",
    color: "#D97706",
    tagline: "Your food processor",
    job: "Breaks food down into nutrients your body can absorb for energy and growth.",
    parts: ["Mouth", "Stomach", "Small intestine", "Large intestine", "Liver"],
    wow: "Your small intestine is about 6 metres long, and your gut is home to trillions of helpful bacteria that aid digestion.",
    care: [
      "Eat fibre (fruit, vegetables, beans) for healthy digestion.",
      "Drink water and chew slowly.",
      "Limit very sugary or greasy foods.",
    ],
  },
  {
    id: "nervous",
    name: "Nervous System",
    emoji: "🧠",
    color: "#7C3AED",
    tagline: "Your control centre",
    job: "Sends electrical signals so you can think, feel, move and react instantly.",
    parts: ["Brain", "Spinal cord", "Nerves", "Neurons"],
    wow: "Nerve signals can travel up to 120 m/s — faster than a Formula 1 car — and your brain has ~86 billion neurons.",
    care: [
      "Sleep 8–10 hours so the brain can reset and store memories.",
      "Learn new skills — it builds stronger neural connections.",
      "Protect your head; avoid drugs and excess alcohol.",
    ],
  },
  {
    id: "skeletal",
    name: "Skeletal System",
    emoji: "🦴",
    color: "#64748B",
    tagline: "Your frame & armour",
    job: "Supports your body, protects organs and stores minerals like calcium.",
    parts: ["Bones (206)", "Joints", "Cartilage", "Bone marrow"],
    wow: "Babies are born with about 300 bones; many fuse into the 206 adults have. Your thigh bone is stronger than concrete.",
    care: [
      "Eat calcium (milk, kontomire, small fish) and get sunlight for vitamin D.",
      "Do weight-bearing exercise to keep bones dense.",
      "Maintain good posture, especially when using phones.",
    ],
  },
  {
    id: "muscular",
    name: "Muscular System",
    emoji: "💪",
    color: "#EA580C",
    tagline: "Your movement engine",
    job: "Allows movement, posture and even pumps your heart and pushes food along.",
    parts: ["Skeletal muscles", "Smooth muscle", "Cardiac muscle", "Tendons"],
    wow: "You have over 600 muscles, and it takes about 17 muscles to smile but 43 to frown.",
    care: [
      "Do strength exercises 2–3 times a week.",
      "Stretch and warm up to avoid injury.",
      "Eat protein (beans, eggs, fish, groundnuts) to repair muscle.",
    ],
  },
  {
    id: "immune",
    name: "Immune System",
    emoji: "🛡️",
    color: "#16A34A",
    tagline: "Your defence army",
    job: "Detects and destroys germs, and remembers them to fight back faster next time.",
    parts: ["White blood cells", "Lymph nodes", "Spleen", "Antibodies"],
    wow: "Your body makes billions of white blood cells daily, and vaccines 'train' this system without you getting sick.",
    care: [
      "Sleep well and manage stress — both strengthen immunity.",
      "Eat fruits and vegetables rich in vitamin C.",
      "Wash hands and keep vaccinations up to date.",
    ],
  },
  {
    id: "urinary",
    name: "Urinary System",
    emoji: "💧",
    color: "#0891B2",
    tagline: "Your filter & cleaner",
    job: "Filters waste and excess water from the blood to make urine.",
    parts: ["Kidneys", "Ureters", "Bladder", "Urethra"],
    wow: "Your kidneys filter about 180 litres of blood every day, recycling almost all of it and keeping only the waste.",
    care: [
      "Drink enough water (urine should be pale yellow).",
      "Don't hold urine for too long.",
      "Limit very salty foods to protect the kidneys.",
    ],
  },
  {
    id: "endocrine",
    name: "Endocrine System",
    emoji: "⚗️",
    color: "#DB2777",
    tagline: "Your chemical messengers",
    job: "Uses hormones to control growth, mood, energy and the changes of puberty.",
    parts: ["Brain (pituitary)", "Thyroid", "Pancreas", "Adrenal glands"],
    wow: "Tiny amounts of hormones run huge processes — this is why teenage years bring fast growth and big mood shifts.",
    care: [
      "Keep regular sleep — it balances growth and stress hormones.",
      "Eat balanced meals to steady blood sugar.",
      "Exercise to lift mood-boosting hormones naturally.",
    ],
  },
];

// ─────────────────────── EXERCISE & FITNESS ───────────────────────

export interface Exercise {
  name: string;
  emoji: string;
  targets: string;
  dose: string;
}

export interface ExerciseGroup {
  id: string;
  title: string;
  emoji: string;
  color: string;
  why: string;
  moves: Exercise[];
}

export const EXERCISE_GROUPS: ExerciseGroup[] = [
  {
    id: "cardio",
    title: "Cardio (Heart & Lungs)",
    emoji: "🏃",
    color: "#DC2626",
    why: "Strengthens the heart and lungs, burns energy and lifts your mood.",
    moves: [
      { name: "Jogging / brisk walk", emoji: "👟", targets: "Whole body", dose: "20–30 min" },
      { name: "Jumping jacks", emoji: "🤸", targets: "Heart, legs", dose: "3 × 30 sec" },
      { name: "Skipping rope", emoji: "🪢", targets: "Heart, calves", dose: "3 × 1 min" },
      { name: "Dancing / football", emoji: "⚽", targets: "Whole body", dose: "20+ min" },
    ],
  },
  {
    id: "strength",
    title: "Strength (Muscles & Bones)",
    emoji: "💪",
    color: "#EA580C",
    why: "Builds strong muscles and bones — no gym needed, your body weight is enough.",
    moves: [
      { name: "Squats", emoji: "🦵", targets: "Thighs, glutes", dose: "3 × 12" },
      { name: "Push-ups", emoji: "🙇", targets: "Chest, arms", dose: "3 × 8–12" },
      { name: "Plank", emoji: "🧱", targets: "Core", dose: "3 × 30 sec" },
      { name: "Lunges", emoji: "🚶", targets: "Legs, balance", dose: "3 × 10 each" },
    ],
  },
  {
    id: "flexibility",
    title: "Flexibility & Recovery",
    emoji: "🧘",
    color: "#16A34A",
    why: "Keeps joints mobile, prevents injury and helps you relax and focus.",
    moves: [
      { name: "Hamstring stretch", emoji: "🦵", targets: "Back of legs", dose: "Hold 20 sec" },
      { name: "Shoulder rolls", emoji: "🙆", targets: "Shoulders, neck", dose: "10 each way" },
      { name: "Cat–cow stretch", emoji: "🐈", targets: "Spine", dose: "8 slow reps" },
      { name: "Deep breathing", emoji: "🌬️", targets: "Mind, lungs", dose: "5 min" },
    ],
  },
];

export interface WeekDay {
  day: string;
  focus: string;
  emoji: string;
}

// Based on WHO: 5–17 yr olds need 60+ minutes of activity daily.
export const WEEKLY_PLAN: WeekDay[] = [
  { day: "Mon", focus: "Cardio — 30 min jog/dance", emoji: "🏃" },
  { day: "Tue", focus: "Strength — squats, push-ups, plank", emoji: "💪" },
  { day: "Wed", focus: "Sport / play — football, games", emoji: "⚽" },
  { day: "Thu", focus: "Strength + core", emoji: "🧱" },
  { day: "Fri", focus: "Cardio — skipping + jacks", emoji: "🪢" },
  { day: "Sat", focus: "Active fun — hike, swim, dance", emoji: "🏞️" },
  { day: "Sun", focus: "Rest + light stretching", emoji: "🧘" },
];

// ─────────────────────── NUTRITION ───────────────────────

export interface FoodGroup {
  id: string;
  name: string;
  emoji: string;
  color: string;
  role: string;
  examples: string[];
}

export const FOOD_GROUPS: FoodGroup[] = [
  {
    id: "carbs",
    name: "Carbohydrates",
    emoji: "🍚",
    color: "#D97706",
    role: "Main energy source for the brain and body.",
    examples: ["Banku", "Kenkey", "Rice", "Yam", "Plantain"],
  },
  {
    id: "protein",
    name: "Proteins",
    emoji: "🍗",
    color: "#DC2626",
    role: "Builds and repairs muscles, organs and cells.",
    examples: ["Beans", "Eggs", "Fish", "Chicken", "Groundnuts"],
  },
  {
    id: "fats",
    name: "Healthy Fats",
    emoji: "🥑",
    color: "#CA8A04",
    role: "Stores energy and protects organs — choose good fats.",
    examples: ["Avocado", "Nuts", "Palm/olive oil (small)", "Fish oil"],
  },
  {
    id: "vitamins",
    name: "Vitamins & Minerals",
    emoji: "🥬",
    color: "#16A34A",
    role: "Keeps the immune system, bones and eyes healthy.",
    examples: ["Kontomire", "Garden eggs", "Oranges", "Mango", "Tomatoes"],
  },
  {
    id: "water",
    name: "Water",
    emoji: "💧",
    color: "#0EA5E9",
    role: "Every cell needs it — aim for 6–8 glasses a day.",
    examples: ["Clean water", "Coconut water", "Unsweetened drinks"],
  },
];

export const NUTRITION_TIPS: string[] = [
  "Fill half your plate with vegetables and fruit.",
  "Swap sugary soft drinks for water — sugar drains energy and harms teeth.",
  "Eat breakfast: it fuels your brain for studying.",
  "Limit fried street food and 'pure water + biscuit' as a meal.",
];

// ─────────────────────── MIND & SLEEP ───────────────────────

export interface WellbeingCard {
  id: string;
  title: string;
  emoji: string;
  color: string;
  points: string[];
}

export const WELLBEING: WellbeingCard[] = [
  {
    id: "sleep",
    title: "Sleep",
    emoji: "😴",
    color: "#4F46E5",
    points: [
      "Teens need 8–10 hours of sleep each night.",
      "Sleep stores memories — it literally helps you pass exams.",
      "Stop screens 30–60 min before bed for better rest.",
    ],
  },
  {
    id: "stress",
    title: "Managing Stress",
    emoji: "🧠",
    color: "#7C3AED",
    points: [
      "Break big tasks into small steps to avoid overwhelm.",
      "Talk to someone you trust when you feel low.",
      "Try 5 minutes of deep breathing before a test.",
    ],
  },
  {
    id: "screens",
    title: "Screen Balance",
    emoji: "📱",
    color: "#0891B2",
    points: [
      "Take a 5-min break every 30 minutes of screen time.",
      "Follow the 20-20-20 rule: every 20 min, look 20 ft away for 20 sec.",
      "Keep phones out of the bedroom at night.",
    ],
  },
  {
    id: "habits",
    title: "Healthy Habits",
    emoji: "🚭",
    color: "#16A34A",
    points: [
      "Avoid smoking, alcohol and drugs — they harm the growing brain.",
      "Wash hands and brush teeth twice daily.",
      "Surround yourself with supportive, positive friends.",
    ],
  },
];

// ─────────────────────── MYTH BUSTER QUIZ ───────────────────────

export interface MythItem {
  statement: string;
  isMyth: boolean;
  truth: string;
}

export const MYTH_BUSTERS: MythItem[] = [
  {
    statement: "You only need to exercise if you want to lose weight.",
    isMyth: true,
    truth: "Exercise helps everyone — it boosts mood, sleep, brain power and heart health, whatever your size.",
  },
  {
    statement: "Skipping breakfast helps you focus in class.",
    isMyth: true,
    truth: "Breakfast fuels your brain. Without it, concentration and memory drop during morning lessons.",
  },
  {
    statement: "Teenagers need more sleep than adults.",
    isMyth: false,
    truth: "True — teens need 8–10 hours because the brain and body are still developing fast.",
  },
  {
    statement: "Drinking water improves concentration.",
    isMyth: false,
    truth: "True — even mild dehydration reduces focus, mood and energy. Keep a bottle nearby.",
  },
  {
    statement: "Cracking your knuckles gives you arthritis.",
    isMyth: true,
    truth: "It's a myth. The popping is just gas bubbles; studies show it doesn't cause arthritis.",
  },
];
