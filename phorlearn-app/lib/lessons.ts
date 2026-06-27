// Lesson content for the SHS General Science programme.
// Subjects are grouped into Core and Elective. Each topic carries notes and
// (where relevant) a worked example. Slugs align with lib/pastQuestions.ts so
// the "Practice Quiz" resource can deep-link into the matching past paper.

export interface WorkedExample {
  prompt: string;
  solution: string[];
}

export interface Topic {
  id: string;
  title: string;
  notes: string[];
  example?: WorkedExample;
}

export interface LessonSubject {
  slug: string;
  name: string;
  icon: string;
  color: string;
  category: "core" | "elective";
  blurb: string;
  topics: Topic[];
}

export const LESSON_SUBJECTS: LessonSubject[] = [
  // ─────────────── CORE SUBJECTS ───────────────
  {
    slug: "english",
    name: "English Language",
    icon: "📖",
    color: "#B45309",
    category: "core",
    blurb: "Comprehension, lexis & structure, and essay writing.",
    topics: [
      {
        id: "comprehension",
        title: "Comprehension Skills",
        notes: [
          "Comprehension tests your ability to read a passage and answer questions accurately. Always read the passage twice: first for general meaning, then closely for detail.",
          "Answer in your own words where instructed, and never lift whole sentences from the passage unless asked to quote. Watch for questions on the meaning of words 'as used in the passage' — context decides the meaning.",
        ],
      },
      {
        id: "lexis-structure",
        title: "Lexis & Structure",
        notes: [
          "This section tests vocabulary (lexis) and grammar (structure): synonyms, antonyms, concord (subject–verb agreement), tenses and correct word choice.",
          "Build a habit of learning words in pairs (synonym/antonym) and practising sentence completion. Concord rule: a singular subject takes a singular verb — 'The list of names is long', not 'are long'.",
        ],
      },
      {
        id: "essay-writing",
        title: "Essay Writing",
        notes: [
          "WASSCE essays are marked on Content, Organisation, Expression and Mechanical Accuracy. Plan before you write: jot an introduction, 3–4 body points, and a conclusion.",
          "Match register to the essay type — formal for articles and speeches, friendly for informal letters. Keep paragraphs focused on one idea each, and proofread for spelling and punctuation.",
        ],
      },
    ],
  },
  {
    slug: "core-maths",
    name: "Core Mathematics",
    icon: "📐",
    color: "#1B4FD8",
    category: "core",
    blurb: "Indices, algebra and statistics for every SHS programme.",
    topics: [
      {
        id: "indices-surds",
        title: "Indices & Surds",
        notes: [
          "Indices (powers) follow laws: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, and (aᵐ)ⁿ = aᵐⁿ. Any non-zero number to the power 0 equals 1.",
          "A surd is an irrational root such as √2. Simplify by removing perfect-square factors, e.g. √12 = √(4×3) = 2√3.",
        ],
        example: {
          prompt: "Simplify 2³ × 2⁴ ÷ 2².",
          solution: [
            "Add the indices of the multiplied terms: 2³ × 2⁴ = 2⁷.",
            "Subtract the index of the divisor: 2⁷ ÷ 2² = 2⁵.",
            "2⁵ = 32.",
          ],
        },
      },
      {
        id: "algebra",
        title: "Algebraic Equations",
        notes: [
          "To solve a linear equation, do the same operation to both sides until the unknown stands alone.",
          "For simultaneous equations use elimination or substitution; for quadratics use factorisation, completing the square, or the quadratic formula.",
        ],
        example: {
          prompt: "Solve 3x − 7 = 11.",
          solution: [
            "Add 7 to both sides: 3x = 18.",
            "Divide both sides by 3: x = 6.",
          ],
        },
      },
      {
        id: "statistics",
        title: "Statistics — Mean, Median, Mode",
        notes: [
          "Mean = sum of values ÷ number of values. Median = the middle value when data are arranged in order. Mode = the value that occurs most often.",
          "For grouped data, use class midpoints to estimate the mean and the modal class for the mode.",
        ],
        example: {
          prompt: "Find the mean and median of 4, 7, 2, 9, 5.",
          solution: [
            "Mean = (4+7+2+9+5) ÷ 5 = 27 ÷ 5 = 5.4.",
            "Arranged: 2, 4, 5, 7, 9 → median (middle value) = 5.",
          ],
        },
      },
    ],
  },
  {
    slug: "integrated-science",
    name: "Integrated Science",
    icon: "🔭",
    color: "#0369A1",
    category: "core",
    blurb: "Core science concepts across biology, chemistry and physics.",
    topics: [
      {
        id: "photosynthesis",
        title: "Photosynthesis",
        notes: [
          "Photosynthesis is how green plants make food using sunlight, carbon dioxide and water, producing glucose and oxygen.",
          "Word equation: carbon dioxide + water → (light, chlorophyll) → glucose + oxygen. It occurs mainly in the leaves, in the chloroplasts.",
        ],
      },
      {
        id: "states-of-matter",
        title: "States of Matter",
        notes: [
          "Matter exists as solid, liquid or gas, differing in how tightly their particles are packed and how freely they move.",
          "Changes of state: melting (solid→liquid), evaporation/boiling (liquid→gas), condensation (gas→liquid), freezing (liquid→solid) and sublimation (solid→gas).",
        ],
      },
      {
        id: "electricity",
        title: "Electricity Basics",
        notes: [
          "Electric current is the flow of charge, measured in amperes (A) with an ammeter connected in series. Voltage (potential difference) is measured in volts with a voltmeter in parallel.",
          "Ohm's law: V = IR, where R is resistance in ohms (Ω). Good conductors (e.g. copper) let current flow easily; insulators (e.g. rubber) resist it.",
        ],
        example: {
          prompt: "A 12 V supply drives a current of 3 A through a resistor. Find its resistance.",
          solution: [
            "Use Ohm's law: V = IR → R = V ÷ I.",
            "R = 12 ÷ 3 = 4 Ω.",
          ],
        },
      },
    ],
  },
  {
    slug: "social-studies",
    name: "Social Studies",
    icon: "🌍",
    color: "#C2410C",
    category: "core",
    blurb: "Citizenship, governance and the environment in Ghana.",
    topics: [
      {
        id: "environment",
        title: "Environment & Resources",
        notes: [
          "Ghana's natural resources include gold, cocoa, timber, oil and water bodies. Sustainable use means meeting today's needs without harming future generations.",
          "Environmental problems such as galamsey (illegal mining), deforestation and pollution threaten resources. Conservation, afforestation and laws help protect them.",
        ],
      },
      {
        id: "governance",
        title: "Governance & Democracy",
        notes: [
          "Ghana operates a democratic system with three arms of government: the Executive (President), the Legislature (Parliament) and the Judiciary (the courts).",
          "Democracy rests on the rule of law, periodic free elections, respect for human rights and active citizen participation.",
        ],
      },
    ],
  },
  {
    slug: "ict",
    name: "ICT",
    icon: "💻",
    color: "#0EA5E9",
    category: "core",
    blurb: "Computer fundamentals and productivity tools.",
    topics: [
      {
        id: "hardware",
        title: "Computer Hardware Basics",
        notes: [
          "Hardware is the physical part of a computer. Input devices (keyboard, mouse) send data in; output devices (monitor, printer) send results out.",
          "The CPU processes data, RAM holds data temporarily while working, and storage devices (hard disk, flash drive) keep data permanently.",
        ],
      },
      {
        id: "spreadsheets",
        title: "Spreadsheets",
        notes: [
          "A spreadsheet (e.g. Microsoft Excel) organises data in rows and columns of cells. Formulas always begin with '=' , e.g. =A1+B1.",
          "Common functions include SUM, AVERAGE, MAX and MIN. Cell references can be relative (A1) or absolute ($A$1).",
        ],
      },
    ],
  },

  // ─────────────── ELECTIVE SUBJECTS (General Science) ───────────────
  {
    slug: "elective-maths",
    name: "Elective Mathematics",
    icon: "📐",
    color: "#1B4FD8",
    category: "elective",
    blurb: "Calculus, sequences and advanced algebra.",
    topics: [
      {
        id: "differentiation",
        title: "Differentiation",
        notes: [
          "Differentiation finds the gradient (rate of change) of a function. For y = xⁿ, the derivative dy/dx = n·xⁿ⁻¹.",
          "The derivative of a constant is 0, and constants multiply through: d/dx(axⁿ) = an·xⁿ⁻¹.",
        ],
        example: {
          prompt: "Differentiate y = 3x² + 5x − 4.",
          solution: [
            "Differentiate term by term using n·xⁿ⁻¹.",
            "d/dx(3x²) = 6x;  d/dx(5x) = 5;  d/dx(−4) = 0.",
            "dy/dx = 6x + 5.",
          ],
        },
      },
      {
        id: "definite-integral",
        title: "Integration — The Definite Integral",
        notes: [
          "The definite integral ∫ₐᵇ f(x) dx gives the net area between the curve f(x) and the x-axis, from x = a to x = b.",
          "Power rule for integration: ∫ xⁿ dx = xⁿ⁺¹ ⁄ (n+1) + C, where n ≠ −1. For a definite integral, evaluate the result at the upper limit and subtract its value at the lower limit.",
        ],
        example: {
          prompt: "Evaluate ∫₁³ (2x + 1) dx.",
          solution: [
            "Integrate: ∫(2x + 1) dx = x² + x.",
            "Evaluate at the limits: [x² + x]₁³ = (9 + 3) − (1 + 1).",
            "= 12 − 2 = 10.",
          ],
        },
      },
      {
        id: "binomial",
        title: "Binomial Theorem",
        notes: [
          "The binomial theorem expands (a + b)ⁿ without long multiplication, using binomial coefficients ⁿCᵣ.",
          "(a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ for r = 0 to n. The coefficients follow Pascal's triangle.",
        ],
        example: {
          prompt: "Expand (x + 2)³.",
          solution: [
            "Coefficients from Pascal's triangle for n = 3: 1, 3, 3, 1.",
            "(x+2)³ = x³ + 3x²(2) + 3x(2²) + 2³.",
            "= x³ + 6x² + 12x + 8.",
          ],
        },
      },
    ],
  },
  {
    slug: "physics",
    name: "Physics",
    icon: "⚡",
    color: "#7C3AED",
    category: "elective",
    blurb: "Mechanics, energy and electricity.",
    topics: [
      {
        id: "newtons-laws",
        title: "Newton's Laws of Motion",
        notes: [
          "1st law (inertia): a body stays at rest or in uniform motion unless acted on by a resultant force. 2nd law: F = ma. 3rd law: every action has an equal and opposite reaction.",
          "Force is measured in newtons (N). One newton accelerates a 1 kg mass at 1 m/s².",
        ],
        example: {
          prompt: "A 5 kg object is pushed with a force of 20 N. Find its acceleration.",
          solution: [
            "Use Newton's 2nd law: F = ma → a = F ÷ m.",
            "a = 20 ÷ 5 = 4 m/s².",
          ],
        },
      },
      {
        id: "work-energy-power",
        title: "Work, Energy & Power",
        notes: [
          "Work = force × distance moved in the direction of the force (joules). Energy is the capacity to do work; it is conserved (cannot be created or destroyed).",
          "Power = work done ÷ time taken (watts). 1 watt = 1 joule per second.",
        ],
        example: {
          prompt: "A machine does 600 J of work in 20 s. Find its power.",
          solution: [
            "Power = work ÷ time.",
            "P = 600 ÷ 20 = 30 W.",
          ],
        },
      },
      {
        id: "circuits",
        title: "Electric Circuits",
        notes: [
          "In a series circuit the same current flows through all components and resistances add: R = R₁ + R₂ + … In parallel, the voltage is the same across branches.",
          "Electrical power P = VI, and energy = power × time. Ohm's law (V = IR) links voltage, current and resistance.",
        ],
        example: {
          prompt: "An appliance rated 240 V draws a current of 2 A. Find its power.",
          solution: [
            "Use P = VI.",
            "P = 240 × 2 = 480 W.",
          ],
        },
      },
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    icon: "⚗️",
    color: "#BE123C",
    category: "elective",
    blurb: "Atomic structure, the mole and reactions.",
    topics: [
      {
        id: "atomic-structure",
        title: "Atomic Structure",
        notes: [
          "An atom has a central nucleus of protons (positive) and neutrons (neutral), surrounded by electrons (negative) in shells.",
          "Atomic number = number of protons. Mass number = protons + neutrons. Atoms of the same element with different neutron numbers are isotopes.",
        ],
      },
      {
        id: "mole-concept",
        title: "The Mole Concept",
        notes: [
          "A mole is the amount of substance containing 6.02 × 10²³ particles (Avogadro's number). The mass of one mole equals the molar mass in grams.",
          "Number of moles = mass ÷ molar mass. At s.t.p., one mole of any gas occupies 22.4 dm³.",
        ],
        example: {
          prompt: "How many moles are in 36 g of water (H₂O, molar mass 18 g/mol)?",
          solution: [
            "moles = mass ÷ molar mass.",
            "= 36 ÷ 18 = 2 moles.",
          ],
        },
      },
      {
        id: "acids-bases",
        title: "Acids, Bases & Salts",
        notes: [
          "Acids release H⁺ ions and turn blue litmus red; bases release OH⁻ ions and turn red litmus blue. The pH scale runs 0–14, with 7 being neutral.",
          "Acid + base → salt + water (neutralisation). Acid + metal → salt + hydrogen; acid + carbonate → salt + water + carbon dioxide.",
        ],
      },
    ],
  },
  {
    slug: "biology",
    name: "Biology",
    icon: "🔬",
    color: "#16A34A",
    category: "elective",
    blurb: "Cells, life processes and genetics.",
    topics: [
      {
        id: "cell-structure",
        title: "Cell Structure",
        notes: [
          "The cell is the basic unit of life. All cells have a cell membrane, cytoplasm and (in most) a nucleus that controls activities.",
          "Plant cells additionally have a cell wall, chloroplasts and a large vacuole. The mitochondrion is the site of respiration (the 'powerhouse').",
        ],
      },
      {
        id: "photosynthesis",
        title: "Photosynthesis",
        notes: [
          "Photosynthesis converts light energy into chemical energy stored in glucose, using carbon dioxide and water, releasing oxygen.",
          "It occurs in chloroplasts (containing chlorophyll). Factors affecting its rate include light intensity, CO₂ concentration and temperature.",
        ],
      },
      {
        id: "genetics",
        title: "Genetics & Inheritance",
        notes: [
          "Characteristics are passed from parents to offspring through genes carried on chromosomes. Humans have 46 chromosomes (23 pairs) in body cells.",
          "Dominant alleles mask recessive ones. A monohybrid cross of two heterozygotes (Tt × Tt) gives a 3:1 ratio of dominant to recessive traits.",
        ],
      },
    ],
  },
];

export function getLessonSubject(slug: string): LessonSubject | undefined {
  return LESSON_SUBJECTS.find((s) => s.slug === slug);
}
