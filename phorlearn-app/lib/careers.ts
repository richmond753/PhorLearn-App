// Career guidance content for SHS General Science students.
// University names and grade guidance reflect common Ghanaian tertiary
// admission patterns (WAEC grades A1–C6 are typically the credit range).

export interface Career {
  icon: string;
  title: string;
  requiredSubjects: string[];
  universities: string[];
  grades: string;
  blurb: string;
}

export const CAREERS: Career[] = [
  {
    icon: "⚕️",
    title: "Medicine & Surgery",
    requiredSubjects: ["Biology", "Chemistry", "Physics"],
    universities: ["University of Ghana", "KNUST", "UDS", "UCC"],
    grades: "A1–B3 in core & electives; very competitive",
    blurb:
      "Train to become a medical doctor. Strong grades in the three science electives plus Core Maths and English are essential.",
  },
  {
    icon: "⚙️",
    title: "Engineering",
    requiredSubjects: ["Elective Maths", "Physics", "Chemistry"],
    universities: ["KNUST", "UMaT", "University of Ghana", "Ho Technical Univ."],
    grades: "A1–C6, with strong Maths & Physics",
    blurb:
      "Civil, electrical, mechanical, computer and more. Mathematics and Physics are the backbone of every specialisation.",
  },
  {
    icon: "💊",
    title: "Pharmacy",
    requiredSubjects: ["Chemistry", "Biology", "Physics"],
    universities: ["KNUST", "University of Ghana", "Central University"],
    grades: "A1–B3, strong Chemistry & Biology",
    blurb:
      "Study the science of medicines and patient care. Chemistry and Biology grades carry the most weight.",
  },
  {
    icon: "💻",
    title: "Computer Science",
    requiredSubjects: ["Elective Maths", "Physics", "ICT"],
    universities: ["KNUST", "University of Ghana", "Ashesi", "GIMPA"],
    grades: "A1–C6, strong Maths",
    blurb:
      "Software, data, AI and networks. Elective Maths is key; ICT and Physics strengthen your application.",
  },
  {
    icon: "🧬",
    title: "Biochemistry",
    requiredSubjects: ["Chemistry", "Biology", "Elective Maths"],
    universities: ["University of Ghana", "KNUST", "UCC", "UENR"],
    grades: "A1–C6 in science electives",
    blurb:
      "Research-focused and lab-intensive — the chemistry of living systems, useful for pharma and biotech careers.",
  },
  {
    icon: "🌿",
    title: "Agriculture & Agric. Science",
    requiredSubjects: ["Biology", "Chemistry", "Elective Maths"],
    universities: ["University of Ghana", "KNUST", "UDS", "UENR"],
    grades: "A1–C6; broad entry options",
    blurb:
      "A strong, future-facing sector in Ghana's economy — agronomy, agribusiness, animal science and food technology.",
  },
  {
    icon: "🦷",
    title: "Dentistry & Dental Surgery",
    requiredSubjects: ["Biology", "Chemistry", "Physics"],
    universities: ["University of Ghana", "KNUST"],
    grades: "A1–B3; highly competitive",
    blurb:
      "Diagnose and treat oral health. Like Medicine, it demands excellent grades across the science electives.",
  },
  {
    icon: "🔬",
    title: "Laboratory / Medical Science",
    requiredSubjects: ["Biology", "Chemistry", "Physics"],
    universities: ["University of Ghana", "KNUST", "UCC", "UHAS"],
    grades: "A1–C6 in science electives",
    blurb:
      "Run the diagnostic tests that guide treatment. A great science career with strong employment prospects.",
  },
  {
    icon: "🏗️",
    title: "Architecture",
    requiredSubjects: ["Elective Maths", "Physics", "Technical Drawing"],
    universities: ["KNUST", "Central University"],
    grades: "A1–C6, plus a design aptitude",
    blurb:
      "Blend creativity with science to design buildings and spaces. Maths, Physics and drawing skills matter most.",
  },
];

export interface ResourceLink {
  icon: string;
  label: string;
  description: string;
  url: string;
}

function googleSearch(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export const RESOURCE_LIBRARY: ResourceLink[] = [
  {
    icon: "📁",
    label: "University Brochures",
    description: "Programme guides and prospectuses from Ghanaian universities.",
    url: googleSearch("Ghana university undergraduate admissions prospectus brochure 2026"),
  },
  {
    icon: "📋",
    label: "Cut-off Points",
    description: "Recent admission aggregate cut-off points by programme.",
    url: googleSearch("WASSCE university cut off points Ghana 2026 by programme"),
  },
  {
    icon: "🎥",
    label: "Career Videos",
    description: "Hear from professionals about their day-to-day work.",
    url: youtubeSearch("career guidance Ghana professionals day in the life"),
  },
  {
    icon: "🎓",
    label: "Scholarship Info",
    description: "Local & international scholarships — Ghana Scholarships Authority.",
    url: "https://scholarships.gov.gh/",
  },
  {
    icon: "💸",
    label: "MTN Bright Scholarship",
    description: "Scholarship for students at public tertiary institutions.",
    url: "https://scholarship.mtn.com.gh/",
  },
  {
    icon: "📊",
    label: "Programme & Course Finder",
    description: "Explore tertiary programmes and the subjects they require.",
    url: googleSearch("Ghana tertiary programmes requirements WASSCE subjects university"),
  },
];
