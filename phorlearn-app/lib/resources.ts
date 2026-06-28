// Curated, real study resources for the Ghanaian SHS / WASSCE curriculum.
//
// Links were researched and verified to resolve (June 2026). They lean on
// official sources first — the NaCCA "standards-based" SHS curriculum
// (curriculumresources.edu.gh, released Sept 2023), WAEC, and T-TEL teacher
// manuals — then reputable past-question libraries. Video links use YouTube
// search queries so they always resolve to current, relevant tutorials.

export type ResourceType =
  | "curriculum"
  | "pastq"
  | "textbook"
  | "video"
  | "platform";

export interface StudyResource {
  type: ResourceType;
  title: string;
  provider: string;
  url: string;
  description: string;
}

export interface ResourceTypeMeta {
  label: string;
  icon: string;
  color: string;
}

export const RESOURCE_TYPE_META: Record<ResourceType, ResourceTypeMeta> = {
  curriculum: { label: "Curriculum / Syllabus", icon: "📘", color: "#1B4FD8" },
  pastq: { label: "Past Questions", icon: "📝", color: "#D4A017" },
  textbook: { label: "Textbook / Manual", icon: "📚", color: "#16A34A" },
  video: { label: "Video Lessons", icon: "📹", color: "#DC2626" },
  platform: { label: "Learning Platform", icon: "🧭", color: "#0EA5E9" },
};

function youtube(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// Sources available across every subject.
export const GENERAL_RESOURCES: StudyResource[] = [
  {
    type: "curriculum",
    title: "NaCCA SHS Curriculum Portal",
    provider: "Ministry of Education · NaCCA",
    url: "https://curriculumresources.edu.gh/",
    description:
      "Official standards-based SHS 1–3 curriculum, approved textbooks and teaching resources.",
  },
  {
    type: "curriculum",
    title: "WAEC Ghana — Official Site",
    provider: "West African Examinations Council",
    url: "https://www.waecgh.org/",
    description:
      "Exam syllabuses, timetables, regulations and the official WASSCE grading information.",
  },
  {
    type: "pastq",
    title: "WASSCE Past Papers — All Subjects",
    provider: "GH Results",
    url: "https://ghresults.com/wassce-past-papers/",
    description:
      "Downloadable past papers and marking schemes across core and elective subjects.",
  },
  {
    type: "pastq",
    title: "WASSCE Pasco Library (1993–present)",
    provider: "SolvedPasco",
    url: "https://solvedpasco.com/wassce-past-questions/",
    description: "Objective and essay past questions organised by subject and year.",
  },
  {
    type: "pastq",
    title: "Free Past Questions & Mocks",
    provider: "Passco Ghana",
    url: "https://passco.com.gh/past-questions",
    description:
      "Free BECE & WASSCE past questions and school mock papers (2010–2025), all subjects.",
  },
  {
    type: "pastq",
    title: "Largest WASSCE/WAEC Past Questions Archive",
    provider: "LarnEdu",
    url: "https://www.larnedu.com/wassce-waec-past-practice-questions/",
    description:
      "Independent archive of WASSCE past papers (PDF) plus online practice quizzes by subject.",
  },
  {
    type: "platform",
    title: "Olearna — Exam Readiness Platform",
    provider: "Olearna",
    url: "https://olearna.com/",
    description:
      "GES-aligned diagnostics, adaptive practice across 21+ subjects and a free readiness tier.",
  },
  {
    type: "platform",
    title: "GhLearner — Practice Anywhere",
    provider: "GhLearner",
    url: "https://ghlearner.com/",
    description:
      "Free past questions and mocks across WhatsApp bot, web and mobile, with offline support.",
  },
  {
    type: "platform",
    title: "SyllabusGH — AI Tutor & Pasco",
    provider: "SyllabusGH",
    url: "https://syllabusgh.com/",
    description:
      "Curriculum-aligned notes, quizzes, an offline past-questions library and a 24/7 AI tutor.",
  },
  {
    type: "platform",
    title: "Klingbo — AI WASSCE Prep",
    provider: "Klingbo Intelligence",
    url: "https://www.klingbo.com/wassce",
    description:
      "Free AI tutoring, 15+ years of past questions, timed mocks and a smart study timetable.",
  },
  {
    type: "platform",
    title: "Studyxo SHS — Smart Study App",
    provider: "Studyxo",
    url: "https://studyxo.com/",
    description:
      "Offline mock tests, study planner and A1–F9 grade tracking for SHS 1–3 students.",
  },
  {
    type: "platform",
    title: "Khan Academy — Free Lessons",
    provider: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description:
      "Free world-class video lessons and practice in maths, science and more — works on low data.",
  },
];

// Per-subject resources, keyed by the lesson subject slug (see lib/lessons.ts).
export const SUBJECT_RESOURCES: Record<string, StudyResource[]> = {
  "core-maths": [
    {
      type: "curriculum",
      title: "SHS Mathematics Curriculum (NaCCA, 2023)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/11/Mathematics-Curriculum.pdf",
      description: "Official Core Mathematics curriculum, SHS 1–3 (PDF).",
    },
    {
      type: "pastq",
      title: "Core Mathematics Past Questions (Pasco)",
      provider: "SolvedPasco",
      url: "https://solvedpasco.com/wassce-core-maths-past-questions-pasco/",
      description: "Paper 1 (objectives) and Paper 2 (essay) past questions by year.",
    },
    {
      type: "pastq",
      title: "Core Maths Past Questions & Solutions",
      provider: "Cheetah WAEC",
      url: "https://cheetahwaec.com/past-papers",
      description: "Step-by-step solved papers (2019–2024) with interactive practice.",
    },
    {
      type: "video",
      title: "WASSCE Core Mathematics tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Core Mathematics past questions solved Ghana"),
      description: "Worked-solution videos for common WASSCE maths topics.",
    },
    {
      type: "platform",
      title: "Khan Academy — Mathematics",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/math",
      description: "Free practice and videos on arithmetic, algebra, geometry and statistics.",
    },
  ],
  english: [
    {
      type: "curriculum",
      title: "SHS English Language Curriculum (NaCCA, 2023)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/11/English-Language-Curriculum.pdf",
      description: "Official English Language curriculum for secondary education (PDF).",
    },
    {
      type: "pastq",
      title: "WASSCE English Past Papers",
      provider: "GH Results",
      url: "https://ghresults.com/wassce-past-papers/",
      description: "English Language past papers and marking schemes.",
    },
    {
      type: "video",
      title: "WASSCE English Language lessons",
      provider: "YouTube",
      url: youtube("WASSCE English Language comprehension summary essay Ghana"),
      description: "Comprehension, summary, lexis and structure walkthroughs.",
    },
    {
      type: "platform",
      title: "Khan Academy — Grammar",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/humanities/grammar",
      description: "Free grammar, parts of speech and punctuation practice to sharpen structure.",
    },
  ],
  "integrated-science": [
    {
      type: "curriculum",
      title: "SHS General Science Teacher Manual (NaCCA)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/09/general-science-teacher-manual.pdf",
      description: "Content, pedagogy and assessment for the integrated science course.",
    },
    {
      type: "pastq",
      title: "Integrated Science Past Questions (2024)",
      provider: "WASSCE Exams Center",
      url: "https://wassceexams.com/ghana/wassce-2024-integrated-science-past-questions-pdf-download/",
      description: "Paper 1–3 breakdown with a free past-questions PDF.",
    },
    {
      type: "video",
      title: "WASSCE Integrated Science tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Integrated Science revision Ghana past questions"),
      description: "Topic revision and practical-work explanations.",
    },
    {
      type: "platform",
      title: "Khan Academy — Science",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/science",
      description: "Free biology, chemistry and physics lessons covering integrated-science topics.",
    },
  ],
  "social-studies": [
    {
      type: "textbook",
      title: "SHS Social Studies Teacher Manual (NaCCA / T-TEL)",
      provider: "Ministry of Education · NaCCA",
      url: "https://t-tel.org/wp-content/uploads/2024/07/SOCIAL-STUDIES-BOOK-2.pdf",
      description: "Year-One teacher manual covering content and pedagogy (PDF).",
    },
    {
      type: "curriculum",
      title: "SHS Government Curriculum (NaCCA, 2023)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/11/Government-Curriculum.pdf",
      description: "Related governance and civic-studies curriculum (PDF).",
    },
    {
      type: "video",
      title: "WASSCE Social Studies lessons",
      provider: "YouTube",
      url: youtube("WASSCE Social Studies Ghana revision past questions"),
      description: "Governance, nationalism and development topic revision.",
    },
    {
      type: "curriculum",
      title: "SHS Economics Teacher Manual (NaCCA)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/09/Economicspdf.pdf",
      description: "Related social-science elective — Year One economics content (PDF).",
    },
    {
      type: "curriculum",
      title: "SHS Geography Teacher Manual (NaCCA)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/10/Geography.pdf",
      description: "Related elective — physical and human geography of Ghana (PDF).",
    },
  ],
  ict: [
    {
      type: "curriculum",
      title: "NaCCA SHS Curriculum Portal (ICT)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/",
      description: "Official ICT/Computing curriculum and teaching resources.",
    },
    {
      type: "video",
      title: "WASSCE ICT tutorials",
      provider: "YouTube",
      url: youtube("WASSCE ICT Ghana past questions revision"),
      description: "Hardware, software and applications topic walkthroughs.",
    },
    {
      type: "platform",
      title: "Khan Academy — Computers & Internet",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/computing/computers-and-internet",
      description: "Free lessons on how computers, networks and the internet work.",
    },
  ],
  "elective-maths": [
    {
      type: "pastq",
      title: "Elective Mathematics Past Questions (Pasco)",
      provider: "SolvedPasco",
      url: "https://solvedpasco.com/wassce-elective-maths-past-questions-pasco/",
      description: "Pure maths, statistics and mechanics past questions by year.",
    },
    {
      type: "pastq",
      title: "Elective (Additional) Maths Past Questions",
      provider: "WASSCE Exams Center",
      url: "https://wassceexams.com/ghana/wassce-2025-past-questions-for-elective-additional-mathematics-pdf-download/",
      description: "Paper structure plus downloadable PDFs (2010–2025).",
    },
    {
      type: "video",
      title: "WASSCE Elective Maths tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Elective Mathematics Ghana solved past questions"),
      description: "Calculus, vectors and probability worked solutions.",
    },
    {
      type: "platform",
      title: "Khan Academy — Calculus & Algebra",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/math/calculus-1",
      description: "Free differentiation, integration and advanced algebra practice.",
    },
  ],
  physics: [
    {
      type: "pastq",
      title: "Physics Past Questions (Pasco)",
      provider: "SolvedPasco",
      url: "https://solvedpasco.com/wassce-physics-past-questions-pasco/",
      description: "Objective and essay physics past questions by year.",
    },
    {
      type: "pastq",
      title: "WASSCE Elective Subject Questions (2024)",
      provider: "Ghana Education",
      url: "https://ghanaeducation.org/download-2024-wassce-elective-subject-questions-for-sc-and-pc/",
      description: "Physics essay, objective and practical papers (SC & PC).",
    },
    {
      type: "video",
      title: "WASSCE Physics tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Physics Ghana past questions solved"),
      description: "Mechanics, electricity and waves explanations.",
    },
    {
      type: "platform",
      title: "Khan Academy — Physics",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/science/physics",
      description: "Free lessons on motion, forces, energy, electricity and waves.",
    },
  ],
  chemistry: [
    {
      type: "textbook",
      title: "SHS Chemistry Teacher Manual (NaCCA)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/09/Chemistry.pdf",
      description: "Year-One chemistry content, pedagogy and assessment (PDF).",
    },
    {
      type: "pastq",
      title: "Chemistry Past Questions (Pasco)",
      provider: "SolvedPasco",
      url: "https://solvedpasco.com/wassce-chemistry-past-questions-pasco/",
      description: "Objective and essay chemistry past questions by year.",
    },
    {
      type: "video",
      title: "WASSCE Chemistry tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Chemistry Ghana past questions solved"),
      description: "Bonding, reactions and organic chemistry walkthroughs.",
    },
    {
      type: "platform",
      title: "Khan Academy — Chemistry",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/science/chemistry",
      description: "Free lessons on atomic structure, the mole, bonding and reactions.",
    },
  ],
  biology: [
    {
      type: "curriculum",
      title: "SHS Biology Curriculum (NaCCA, 2023)",
      provider: "Ministry of Education · NaCCA",
      url: "https://curriculumresources.edu.gh/wp-content/uploads/2024/11/Biology-Curriculum.pdf",
      description: "Official Biology curriculum for secondary education (PDF).",
    },
    {
      type: "pastq",
      title: "Biology Past Questions (Pasco)",
      provider: "SolvedPasco",
      url: "https://solvedpasco.com/wassce-biology-past-questions-pasco/",
      description: "Objective and essay biology past questions by year.",
    },
    {
      type: "video",
      title: "WASSCE Biology tutorials",
      provider: "YouTube",
      url: youtube("WASSCE Biology Ghana past questions solved"),
      description: "Cell biology, ecology and physiology topic revision.",
    },
    {
      type: "platform",
      title: "Khan Academy — Biology",
      provider: "Khan Academy",
      url: "https://www.khanacademy.org/science/biology",
      description: "Free lessons on cells, genetics, ecology and human physiology.",
    },
  ],
};

export function getSubjectResources(slug: string): StudyResource[] {
  return SUBJECT_RESOURCES[slug] ?? [];
}
