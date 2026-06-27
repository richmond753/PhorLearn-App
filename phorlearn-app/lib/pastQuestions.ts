// WASSCE past-questions dataset.
//
// • Biology 2020 is the verbatim WAEC WASSCE May/June 2020 Biology Paper 1
//   (objective). Answers were cross-checked against the published answer key.
//   Diagram-dependent items are intentionally omitted (text-only practice).
// • Other papers are curated WASSCE-style objective questions covering the
//   GES/WAEC syllabus, with verified answers and explanations.
//
// `answer` is the 0-based index (0 = A, 1 = B, 2 = C, 3 = D).

export interface Question {
  stem: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface Paper {
  year: number;
  /** True when the questions are the verbatim WAEC paper. */
  official?: boolean;
  source?: string;
  questions: Question[];
}

export interface Subject {
  slug: string;
  name: string;
  icon: string;
  color: string;
  papers: Paper[];
}

export const SUBJECTS: Subject[] = [
  {
    slug: "core-maths",
    name: "Core Mathematics",
    icon: "📐",
    color: "#1B4FD8",
    papers: [
      {
        year: 2023,
        questions: [
          {
            stem: "Solve for x: 3x − 7 = 11",
            options: ["x = 4", "x = 6", "x = 18", "x = −6"],
            answer: 1,
            explanation: "Add 7 to both sides: 3x = 18, then divide by 3 → x = 6.",
          },
          {
            stem: "Simplify 2/3 + 1/4",
            options: ["3/4", "5/12", "11/12", "3/7"],
            answer: 2,
            explanation: "LCM of 3 and 4 is 12: 8/12 + 3/12 = 11/12.",
          },
          {
            stem: "Find the simple interest on GH₵500.00 for 2 years at 5% per annum.",
            options: ["GH₵100.00", "GH₵50.00", "GH₵25.00", "GH₵250.00"],
            answer: 1,
            explanation: "I = PRT/100 = (500 × 5 × 2) / 100 = GH₵50.00.",
          },
          {
            stem: "A fair die is thrown once. What is the probability of obtaining an even number?",
            options: ["1/3", "1/6", "1/2", "2/3"],
            answer: 2,
            explanation: "Even outcomes are {2, 4, 6} = 3 of 6 → 3/6 = 1/2.",
          },
          {
            stem: "Find the median of: 4, 7, 2, 9, 5",
            options: ["7", "5", "4", "2"],
            answer: 1,
            explanation: "Arranged: 2, 4, 5, 7, 9. The middle value is 5.",
          },
          {
            stem: "Express 0.045 as a percentage.",
            options: ["45%", "0.45%", "4.5%", "450%"],
            answer: 2,
            explanation: "Multiply by 100: 0.045 × 100 = 4.5%.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "Evaluate 2³ × 2²",
            options: ["16", "32", "64", "10"],
            answer: 1,
            explanation: "Add the indices: 2^(3+2) = 2⁵ = 32.",
          },
          {
            stem: "If y = 2x + 3 and x = 4, find y.",
            options: ["11", "14", "8", "5"],
            answer: 0,
            explanation: "y = 2(4) + 3 = 8 + 3 = 11.",
          },
          {
            stem: "Two angles of a triangle are 50° and 60°. Find the third angle.",
            options: ["60°", "70°", "80°", "90°"],
            answer: 1,
            explanation: "Angles in a triangle sum to 180°: 180 − (50 + 60) = 70°.",
          },
          {
            stem: "Convert 25% to a fraction in its lowest term.",
            options: ["1/2", "1/5", "1/4", "3/4"],
            answer: 2,
            explanation: "25/100 = 1/4 after dividing by 25.",
          },
          {
            stem: "Find the next term: 2, 6, 18, 54, …",
            options: ["108", "162", "216", "150"],
            answer: 1,
            explanation: "Each term is multiplied by 3: 54 × 3 = 162.",
          },
          {
            stem: "A trader bought an item for GH₵80 and sold it for GH₵100. Find the percentage profit.",
            options: ["20%", "25%", "15%", "30%"],
            answer: 1,
            explanation: "Profit = 20; % profit = 20/80 × 100 = 25%.",
          },
        ],
      },
      {
        year: 2021,
        questions: [
          {
            stem: "Simplify: 5a − 3a + 2a",
            options: ["4a", "6a", "10a", "0"],
            answer: 0,
            explanation: "Combine like terms: (5 − 3 + 2)a = 4a.",
          },
          {
            stem: "Find the value of 7! ÷ 5!",
            options: ["42", "35", "2", "12"],
            answer: 0,
            explanation: "7!/5! = 7 × 6 = 42.",
          },
          {
            stem: "The perimeter of a square is 36 cm. Find the length of one side.",
            options: ["6 cm", "9 cm", "12 cm", "18 cm"],
            answer: 1,
            explanation: "A square has 4 equal sides: 36 ÷ 4 = 9 cm.",
          },
          {
            stem: "Round 3.14159 to two decimal places.",
            options: ["3.15", "3.14", "3.142", "3.1"],
            answer: 1,
            explanation: "The third decimal (1) is less than 5, so 3.14159 → 3.14.",
          },
          {
            stem: "If 2ˣ = 32, find x.",
            options: ["4", "5", "16", "6"],
            answer: 1,
            explanation: "32 = 2⁵, so x = 5.",
          },
          {
            stem: "Find the mean of 10, 20 and 30.",
            options: ["20", "15", "25", "30"],
            answer: 0,
            explanation: "Mean = (10 + 20 + 30) / 3 = 60/3 = 20.",
          },
        ],
      },
      {
        year: 2020,
        questions: [
          {
            stem: "Simplify 3/5 of 25.",
            options: ["10", "15", "20", "5"],
            answer: 1,
            explanation: "3/5 × 25 = 15.",
          },
          {
            stem: "Solve: x/2 = 8",
            options: ["4", "16", "10", "6"],
            answer: 1,
            explanation: "Multiply both sides by 2: x = 16.",
          },
          {
            stem: "Find 15% of 200.",
            options: ["15", "20", "30", "45"],
            answer: 2,
            explanation: "15/100 × 200 = 30.",
          },
          {
            stem: "Find the area of a rectangle with length 8 cm and width 5 cm.",
            options: ["13 cm²", "40 cm²", "26 cm²", "45 cm²"],
            answer: 1,
            explanation: "Area = length × width = 8 × 5 = 40 cm².",
          },
          {
            stem: "Express 144 as a product of prime factors.",
            options: ["2⁴ × 3²", "2³ × 3³", "2² × 3⁴", "2⁵ × 3"],
            answer: 0,
            explanation: "144 = 16 × 9 = 2⁴ × 3².",
          },
          {
            stem: "What is the value of √196?",
            options: ["12", "14", "16", "13"],
            answer: 1,
            explanation: "14 × 14 = 196, so √196 = 14.",
          },
        ],
      },
    ],
  },

  {
    slug: "integrated-science",
    name: "Integrated Science",
    icon: "🔭",
    color: "#0369A1",
    papers: [
      {
        year: 2023,
        questions: [
          {
            stem: "Which of the following is NOT a state of matter?",
            options: ["Solid", "Liquid", "Gas", "Energy"],
            answer: 3,
            explanation: "The three common states of matter are solid, liquid and gas. Energy is not a state of matter.",
          },
          {
            stem: "The major component of natural gas is",
            options: ["ethane", "methane", "propane", "butane"],
            answer: 1,
            explanation: "Natural gas is composed mainly of methane (CH₄).",
          },
          {
            stem: "The force that opposes motion between two surfaces in contact is",
            options: ["gravity", "friction", "tension", "upthrust"],
            answer: 1,
            explanation: "Friction acts between surfaces in contact and opposes relative motion.",
          },
          {
            stem: "Which blood group is the universal donor?",
            options: ["AB", "A", "B", "O"],
            answer: 3,
            explanation: "Group O has no A or B antigens, so it can be donated to all groups.",
          },
          {
            stem: "The chemical formula for water is",
            options: ["H₂O₂", "HO", "H₂O", "OH"],
            answer: 2,
            explanation: "Water is made of two hydrogen atoms and one oxygen atom: H₂O.",
          },
          {
            stem: "Plants make their own food through the process of",
            options: ["respiration", "digestion", "photosynthesis", "excretion"],
            answer: 2,
            explanation: "Green plants use sunlight, CO₂ and water to make food by photosynthesis.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "Which gas is most abundant in the Earth's atmosphere?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
            answer: 2,
            explanation: "Nitrogen makes up about 78% of the atmosphere.",
          },
          {
            stem: "Rusting of iron requires the presence of oxygen and",
            options: ["nitrogen", "water", "carbon dioxide", "hydrogen"],
            answer: 1,
            explanation: "Rusting needs both oxygen and water (moisture).",
          },
          {
            stem: "The pH of a neutral solution is",
            options: ["0", "7", "14", "1"],
            answer: 1,
            explanation: "A neutral solution such as pure water has a pH of 7.",
          },
          {
            stem: "Energy from the Sun reaches the Earth mainly by",
            options: ["conduction", "convection", "radiation", "induction"],
            answer: 2,
            explanation: "Heat travels through the vacuum of space by radiation.",
          },
          {
            stem: "The component of blood that helps in clotting is the",
            options: ["red blood cell", "white blood cell", "platelet", "plasma"],
            answer: 2,
            explanation: "Platelets (thrombocytes) are responsible for blood clotting.",
          },
          {
            stem: "An example of a renewable source of energy is",
            options: ["coal", "petroleum", "solar", "natural gas"],
            answer: 2,
            explanation: "Solar energy is renewable; coal, petroleum and natural gas are fossil fuels.",
          },
        ],
      },
      {
        year: 2021,
        source: "Based on WASSCE June 2021 Integrated Science Paper 1 topics.",
        questions: [
          {
            stem: "The SI unit of electric charge is the",
            options: ["ampere", "coulomb", "volt", "ohm"],
            answer: 1,
            explanation: "Electric charge is measured in coulombs (C).",
          },
          {
            stem: "Which of the following gases is a greenhouse gas?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 2,
            explanation: "Carbon dioxide traps heat in the atmosphere, contributing to global warming.",
          },
          {
            stem: "Natural fats and oils are composed of",
            options: ["amino acids", "fatty acids and glycerol", "simple sugars", "nucleotides"],
            answer: 1,
            explanation: "Fats and oils are esters of fatty acids and glycerol.",
          },
          {
            stem: "Which of the following pollutants causes acid rain?",
            options: ["Carbon dioxide", "Sulphur dioxide", "Methane", "Oxygen"],
            answer: 1,
            explanation: "Sulphur dioxide dissolves in rain to form sulphuric/sulphurous acid.",
          },
          {
            stem: "The volume occupied by 0.02 moles of a gas at s.t.p. (molar volume = 22.4 dm³) is",
            options: ["0.448 dm³", "2.24 dm³", "4.48 dm³", "0.224 dm³"],
            answer: 0,
            explanation: "V = moles × molar volume = 0.02 × 22.4 = 0.448 dm³.",
          },
          {
            stem: "Which of the following materials is non-magnetic?",
            options: ["Iron", "Cobalt", "Copper", "Nickel"],
            answer: 2,
            explanation: "Iron, cobalt and nickel are magnetic; copper is non-magnetic.",
          },
        ],
      },
      {
        year: 2020,
        questions: [
          {
            stem: "The process by which plants lose water vapour through their leaves is",
            options: ["respiration", "transpiration", "condensation", "translocation"],
            answer: 1,
            explanation: "Loss of water vapour through stomata in leaves is transpiration.",
          },
          {
            stem: "The chemical symbol for sodium is",
            options: ["S", "So", "Na", "Sn"],
            answer: 2,
            explanation: "Sodium's symbol is Na (from the Latin 'natrium').",
          },
          {
            stem: "Which of the following is a good conductor of electricity?",
            options: ["Rubber", "Copper", "Wood", "Plastic"],
            answer: 1,
            explanation: "Copper is a metal and an excellent conductor of electricity.",
          },
          {
            stem: "The instrument used to measure atmospheric pressure is the",
            options: ["thermometer", "barometer", "hygrometer", "ammeter"],
            answer: 1,
            explanation: "A barometer measures atmospheric pressure.",
          },
          {
            stem: "Photosynthesis takes place mainly in the",
            options: ["roots", "stem", "leaves", "flowers"],
            answer: 2,
            explanation: "Leaves contain most of the chlorophyll where photosynthesis occurs.",
          },
          {
            stem: "The basic unit of living organisms is the",
            options: ["tissue", "organ", "cell", "organ system"],
            answer: 2,
            explanation: "The cell is the basic structural and functional unit of life.",
          },
        ],
      },
    ],
  },

  {
    slug: "biology",
    name: "Biology",
    icon: "🔬",
    color: "#16A34A",
    papers: [
      {
        year: 2020,
        official: true,
        source: "WAEC WASSCE May/June 2020 Biology Paper 1 (objective).",
        questions: [
          {
            stem: "The cell as the basic unit of life consists of",
            options: [
              "cell wall and vacuole",
              "nucleus and cell wall",
              "cytoplasm and nucleus",
              "cytoplasm and vacuole",
            ],
            answer: 2,
            explanation: "Every living cell minimally contains cytoplasm and a nucleus (the control centre).",
          },
          {
            stem: "The organism with spiral chloroplasts and a nucleus suspended by cytoplasmic strands is",
            options: ["volvox", "spirogyra", "paramecium", "euglena"],
            answer: 1,
            explanation: "Spirogyra is identified by its characteristic spiral (helical) chloroplasts.",
          },
          {
            stem: "The network of double membranes that conveys materials through the cytoplasm is the",
            options: [
              "plasma membrane",
              "nuclear membrane",
              "mitochondrion",
              "endoplasmic reticulum",
            ],
            answer: 3,
            explanation: "The endoplasmic reticulum is a membranous network that transports materials within the cell.",
          },
          {
            stem: "Which of the following materials is NOT a living semi-permeable membrane?",
            options: [
              "Pig's bladder",
              "Unripe pawpaw fruit",
              "Yam tuber",
              "Sheet of cellophane",
            ],
            answer: 3,
            explanation: "Cellophane is an artificial (non-living) semi-permeable membrane.",
          },
          {
            stem: "Mould and yeast were placed in a low-oxygen environment; the mould died while the yeast survived. This is because",
            options: [
              "the yeast cells carried out photosynthesis while the mould did not",
              "photosynthesis does not take place in the absence of oxygen",
              "respiration can take place in yeast cells in the absence of oxygen",
              "respiration does not occur in the mould",
            ],
            answer: 2,
            explanation: "Yeast can respire anaerobically (without oxygen), so it survived; the mould could not.",
          },
          {
            stem: "The respiratory organ of a cockroach is the",
            options: ["air sac", "trachea", "lung book", "lung"],
            answer: 1,
            explanation: "Insects such as cockroaches breathe through a system of tracheae.",
          },
          {
            stem: "The excretory product of some reptiles, birds and insects is",
            options: ["urea", "urine", "ammonia", "uric acid"],
            answer: 3,
            explanation: "These animals excrete uric acid, which conserves water.",
          },
          {
            stem: "The reagent used in testing for carbon(IV) oxide is",
            options: [
              "copper sulphate solution",
              "lime water",
              "hydrochloric acid",
              "sodium hydroxide solution",
            ],
            answer: 1,
            explanation: "Carbon(IV) oxide turns lime water milky.",
          },
          {
            stem: "The first stable product of photosynthesis is",
            options: ["starch", "fructose", "glucose", "sucrose"],
            answer: 2,
            explanation: "Glucose is the first stable sugar produced during photosynthesis.",
          },
          {
            stem: "An example of a trace element is",
            options: ["potassium", "calcium", "magnesium", "copper"],
            answer: 3,
            explanation: "Copper is required in only tiny (trace) amounts by organisms.",
          },
          {
            stem: "Soil with the finest texture is",
            options: ["silt", "clay", "sand", "gravel"],
            answer: 1,
            explanation: "Clay particles are the smallest, giving it the finest texture.",
          },
          {
            stem: "The position occupied by an organism in a food chain is the",
            options: ["energy level", "niche", "trophic level", "biomass"],
            answer: 2,
            explanation: "The feeding position in a food chain is called the trophic level.",
          },
          {
            stem: "The depletion of the ozone layer results in the earth's surface receiving more",
            options: ["gamma rays", "infra-red rays", "ultraviolet rays", "X-rays"],
            answer: 2,
            explanation: "The ozone layer absorbs ultraviolet radiation; its depletion lets more UV through.",
          },
          {
            stem: "A child that can receive blood from anybody belongs to the blood group",
            options: ["O", "A", "B", "AB"],
            answer: 3,
            explanation: "Group AB has no anti-A or anti-B antibodies, making it the universal recipient.",
          },
          {
            stem: "Which of the following diseases can be inherited?",
            options: ["Pneumonia", "Whooping cough", "Sickle cell anaemia", "Malaria"],
            answer: 2,
            explanation: "Sickle cell anaemia is a genetic (inherited) disorder.",
          },
          {
            stem: "Replication of DNA molecules is catalyzed by an enzyme called",
            options: ["polymerase", "ptyalin", "pepsin", "amylase"],
            answer: 0,
            explanation: "DNA polymerase catalyses the replication of DNA.",
          },
          {
            stem: "Who proposed the theory of evolution by natural selection?",
            options: ["Darwin", "Lamarck", "Aristotle", "Linnaeus"],
            answer: 0,
            explanation: "Charles Darwin proposed evolution by natural selection.",
          },
        ],
      },
      {
        year: 2023,
        questions: [
          {
            stem: "The process by which green plants manufacture food is called",
            options: ["respiration", "photosynthesis", "transpiration", "digestion"],
            answer: 1,
            explanation: "Photosynthesis converts CO₂ and water into glucose using light energy.",
          },
          {
            stem: "Red blood cells are produced in the",
            options: ["liver", "bone marrow", "heart", "kidney"],
            answer: 1,
            explanation: "Red blood cells are produced in the red bone marrow.",
          },
          {
            stem: "Which of the following is NOT a function of the root?",
            options: [
              "Absorption of water",
              "Anchorage",
              "Photosynthesis",
              "Storage of food",
            ],
            answer: 2,
            explanation: "Photosynthesis occurs in leaves, not roots (roots usually lack chlorophyll).",
          },
          {
            stem: "The gas released by living cells during respiration is",
            options: ["oxygen", "nitrogen", "carbon dioxide", "hydrogen"],
            answer: 2,
            explanation: "Aerobic respiration releases carbon dioxide as a waste product.",
          },
          {
            stem: "DNA is found mainly in the",
            options: ["cytoplasm", "cell wall", "nucleus", "vacuole"],
            answer: 2,
            explanation: "Most of a cell's DNA is contained in the nucleus.",
          },
          {
            stem: "A group of similar cells performing a common function is called a",
            options: ["tissue", "organ", "organism", "system"],
            answer: 0,
            explanation: "Similar cells working together form a tissue.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "The structural and functional unit of the kidney is the",
            options: ["neuron", "nephron", "alveolus", "villus"],
            answer: 1,
            explanation: "The nephron is the basic functional unit of the kidney.",
          },
          {
            stem: "Which part of the plant is mainly responsible for water absorption?",
            options: ["leaves", "flowers", "root hairs", "stem"],
            answer: 2,
            explanation: "Root hairs greatly increase surface area for absorbing water and minerals.",
          },
          {
            stem: "The number of chromosomes in a normal human body cell is",
            options: ["23", "46", "48", "44"],
            answer: 1,
            explanation: "Human somatic cells contain 46 chromosomes (23 pairs).",
          },
          {
            stem: "A deficiency of vitamin C causes",
            options: ["rickets", "scurvy", "night blindness", "beri-beri"],
            answer: 1,
            explanation: "Lack of vitamin C causes scurvy (bleeding gums, poor wound healing).",
          },
          {
            stem: "Which of the following organisms is a mammal?",
            options: ["Shark", "Whale", "Crocodile", "Tilapia"],
            answer: 1,
            explanation: "The whale is a mammal — it is warm-blooded and feeds its young with milk.",
          },
          {
            stem: "Enzymes are biological",
            options: ["sugars", "catalysts", "lipids", "minerals"],
            answer: 1,
            explanation: "Enzymes are proteins that act as biological catalysts.",
          },
        ],
      },
      {
        year: 2021,
        questions: [
          {
            stem: "The powerhouse of the cell is the",
            options: ["nucleus", "mitochondrion", "ribosome", "vacuole"],
            answer: 1,
            explanation: "Mitochondria release energy through respiration, powering the cell.",
          },
          {
            stem: "In a food chain, green plants are referred to as",
            options: ["consumers", "decomposers", "producers", "predators"],
            answer: 2,
            explanation: "Green plants make their own food, so they are producers.",
          },
          {
            stem: "The exchange of gases in the lungs occurs in the",
            options: ["bronchi", "trachea", "alveoli", "larynx"],
            answer: 2,
            explanation: "The thin-walled alveoli are the site of gaseous exchange.",
          },
          {
            stem: "Which of the following is a vector of malaria?",
            options: ["Tsetse fly", "Anopheles mosquito", "Housefly", "Cockroach"],
            answer: 1,
            explanation: "The female Anopheles mosquito transmits the malaria parasite.",
          },
          {
            stem: "The pigment responsible for photosynthesis is",
            options: ["haemoglobin", "melanin", "chlorophyll", "keratin"],
            answer: 2,
            explanation: "Chlorophyll traps light energy for photosynthesis.",
          },
          {
            stem: "Insulin is produced by the",
            options: ["liver", "pancreas", "kidney", "spleen"],
            answer: 1,
            explanation: "The pancreas secretes insulin, which lowers blood sugar.",
          },
        ],
      },
    ],
  },

  {
    slug: "chemistry",
    name: "Chemistry",
    icon: "⚗️",
    color: "#BE123C",
    papers: [
      {
        year: 2023,
        questions: [
          {
            stem: "Which gas turns lime water milky?",
            options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
            answer: 2,
            explanation: "Carbon dioxide reacts with lime water to form a milky calcium carbonate suspension.",
          },
          {
            stem: "The valency of oxygen in water (H₂O) is",
            options: ["1", "2", "3", "4"],
            answer: 1,
            explanation: "Oxygen forms two bonds (to two hydrogen atoms), so its valency is 2.",
          },
          {
            stem: "Which of the following is a noble gas?",
            options: ["Chlorine", "Argon", "Oxygen", "Nitrogen"],
            answer: 1,
            explanation: "Argon is in Group 0 (8) — the noble (inert) gases.",
          },
          {
            stem: "The number of moles in 36 g of water (molar mass = 18 g/mol) is",
            options: ["1 mol", "2 mol", "18 mol", "36 mol"],
            answer: 1,
            explanation: "moles = mass ÷ molar mass = 36 ÷ 18 = 2 mol.",
          },
          {
            stem: "Acids turn blue litmus paper",
            options: ["blue", "red", "green", "colourless"],
            answer: 1,
            explanation: "Acids turn blue litmus red.",
          },
          {
            stem: "The most electronegative element is",
            options: ["oxygen", "chlorine", "fluorine", "nitrogen"],
            answer: 2,
            explanation: "Fluorine is the most electronegative element on the periodic table.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "The atomic number of an element is the number of",
            options: [
              "neutrons",
              "protons",
              "electrons and neutrons",
              "protons and neutrons",
            ],
            answer: 1,
            explanation: "Atomic number equals the number of protons in the nucleus.",
          },
          {
            stem: "Which of the following is an alkaline earth metal?",
            options: ["Sodium", "Calcium", "Iron", "Aluminium"],
            answer: 1,
            explanation: "Calcium is in Group 2 — the alkaline earth metals.",
          },
          {
            stem: "The pH of a strong acid is",
            options: ["exactly 7", "close to 14", "close to 0", "between 8 and 10"],
            answer: 2,
            explanation: "Strong acids have very low pH, close to 0.",
          },
          {
            stem: "Common salt has the chemical formula",
            options: ["KCl", "NaCl", "CaCl₂", "NaOH"],
            answer: 1,
            explanation: "Common (table) salt is sodium chloride, NaCl.",
          },
          {
            stem: "The change of a substance directly from gas to solid is called",
            options: ["condensation", "sublimation", "deposition", "evaporation"],
            answer: 2,
            explanation: "Gas-to-solid without a liquid stage is deposition.",
          },
          {
            stem: "An element with 11 protons is",
            options: ["neon", "sodium", "magnesium", "lithium"],
            answer: 1,
            explanation: "Atomic number 11 corresponds to sodium (Na).",
          },
        ],
      },
    ],
  },

  {
    slug: "physics",
    name: "Physics",
    icon: "⚡",
    color: "#7C3AED",
    papers: [
      {
        year: 2023,
        questions: [
          {
            stem: "The unit of electrical resistance is the",
            options: ["volt", "ampere", "ohm", "watt"],
            answer: 2,
            explanation: "Resistance is measured in ohms (Ω).",
          },
          {
            stem: "Light travels fastest in a",
            options: ["solid", "liquid", "gas", "vacuum"],
            answer: 3,
            explanation: "Light reaches its maximum speed (≈3 × 10⁸ m/s) in a vacuum.",
          },
          {
            stem: "Find the power of an appliance rated 240 V and 2 A.",
            options: ["120 W", "480 W", "242 W", "238 W"],
            answer: 1,
            explanation: "P = V × I = 240 × 2 = 480 W.",
          },
          {
            stem: "A force of 10 N moves a body through 5 m in its direction. The work done is",
            options: ["2 J", "15 J", "50 J", "0.5 J"],
            answer: 2,
            explanation: "Work = force × distance = 10 × 5 = 50 J.",
          },
          {
            stem: "The bending of light as it passes from one medium to another is called",
            options: ["reflection", "refraction", "diffraction", "dispersion"],
            answer: 1,
            explanation: "The change in direction of light between media is refraction.",
          },
          {
            stem: "Sound cannot travel through a",
            options: ["solid", "liquid", "gas", "vacuum"],
            answer: 3,
            explanation: "Sound needs a material medium; it cannot travel through a vacuum.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "The SI unit of force is the",
            options: ["joule", "newton", "watt", "pascal"],
            answer: 1,
            explanation: "Force is measured in newtons (N).",
          },
          {
            stem: "A body moving with constant velocity has zero",
            options: ["displacement", "acceleration", "speed", "distance"],
            answer: 1,
            explanation: "Constant velocity means no change in velocity, so acceleration is zero.",
          },
          {
            stem: "The acceleration due to gravity on Earth is approximately",
            options: ["9.8 m/s²", "98 m/s²", "0.98 m/s²", "8.9 m/s²"],
            answer: 0,
            explanation: "g ≈ 9.8 m/s² near the Earth's surface.",
          },
          {
            stem: "Work done is calculated as",
            options: [
              "force ÷ distance",
              "force × distance",
              "mass × velocity",
              "force × time",
            ],
            answer: 1,
            explanation: "Work = force × distance moved in the direction of the force.",
          },
          {
            stem: "Which of the following is a vector quantity?",
            options: ["mass", "speed", "velocity", "time"],
            answer: 2,
            explanation: "Velocity has both magnitude and direction, so it is a vector.",
          },
          {
            stem: "The device used to measure electric current is the",
            options: ["voltmeter", "ammeter", "barometer", "thermometer"],
            answer: 1,
            explanation: "An ammeter, connected in series, measures electric current.",
          },
        ],
      },
    ],
  },

  {
    slug: "english",
    name: "English Language",
    icon: "📖",
    color: "#B45309",
    papers: [
      {
        year: 2023,
        questions: [
          {
            stem: "Choose the word that is opposite in meaning to 'generous'.",
            options: ["kind", "stingy", "wealthy", "friendly"],
            answer: 1,
            explanation: "'Stingy' (mean with money) is the antonym of 'generous'.",
          },
          {
            stem: "Select the correctly spelt word.",
            options: ["recieve", "receive", "receeve", "receve"],
            answer: 1,
            explanation: "The rule 'i before e except after c' gives 'receive'.",
          },
          {
            stem: "Choose the correct question tag: 'You are coming, ____?'",
            options: ["isn't it", "aren't you", "don't you", "are you"],
            answer: 1,
            explanation: "A positive statement with 'you are' takes the negative tag 'aren't you'.",
          },
          {
            stem: "The past tense of 'go' is",
            options: ["goed", "gone", "went", "going"],
            answer: 2,
            explanation: "'Go' is irregular: its simple past tense is 'went'.",
          },
          {
            stem: "Choose the word nearest in meaning to 'commence'.",
            options: ["end", "begin", "pause", "delay"],
            answer: 1,
            explanation: "'Commence' means to begin or start.",
          },
          {
            stem: "Identify the verb in: 'They sang beautifully.'",
            options: ["They", "sang", "beautifully", "none"],
            answer: 1,
            explanation: "'Sang' is the action word (verb) in the sentence.",
          },
        ],
      },
      {
        year: 2022,
        questions: [
          {
            stem: "Choose the word nearest in meaning to 'enormous'.",
            options: ["tiny", "huge", "quick", "bright"],
            answer: 1,
            explanation: "'Enormous' means very large or huge.",
          },
          {
            stem: "Choose the correct option: 'She ____ to school every day.'",
            options: ["go", "goes", "going", "gone"],
            answer: 1,
            explanation: "With the third-person singular 'she', the verb takes -s: 'goes'.",
          },
          {
            stem: "The plural of 'child' is",
            options: ["childs", "children", "childes", "child"],
            answer: 1,
            explanation: "'Child' has the irregular plural 'children'.",
          },
          {
            stem: "Choose the antonym of 'ancient'.",
            options: ["old", "modern", "historic", "aged"],
            answer: 1,
            explanation: "'Modern' (recent/new) is opposite to 'ancient' (very old).",
          },
          {
            stem: "Identify the noun in: 'The boy ran quickly.'",
            options: ["ran", "quickly", "boy", "the"],
            answer: 2,
            explanation: "'Boy' names a person, so it is the noun.",
          },
          {
            stem: "Fill in the blank: 'He is the tallest ____ the three boys.'",
            options: ["of", "in", "among", "between"],
            answer: 0,
            explanation: "A superlative comparing within a group uses 'of': 'the tallest of the three'.",
          },
        ],
      },
    ],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getPaper(slug: string, year: number): Paper | undefined {
  return getSubject(slug)?.papers.find((p) => p.year === year);
}
