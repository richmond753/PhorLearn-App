export const ROLES = ["student", "teacher", "parent", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const SHS_CLASSES = ["SHS1", "SHS2", "SHS3"] as const;
export type ShsClass = (typeof SHS_CLASSES)[number];

export const PROGRAMMES = [
  "General Science",
  "General Arts",
  "Business",
  "Visual Arts",
  "Home Economics",
  "Technical",
] as const;
export type Programme = (typeof PROGRAMMES)[number];

export interface RoleMeta {
  id: Role;
  label: string;
  icon: string;
  blurb: string;
}

export const ROLE_META: Record<Role, RoleMeta> = {
  student: {
    id: "student",
    label: "SHS Student",
    icon: "🎒",
    blurb:
      "Access lessons, past questions, live quizzes, AI tutoring, and your personal progress dashboard.",
  },
  parent: {
    id: "parent",
    label: "Parent / Guardian",
    icon: "👨‍👩‍👦",
    blurb:
      "Monitor your ward's performance, time spent studying, and receive weekly progress reports.",
  },
  teacher: {
    id: "teacher",
    label: "Teacher",
    icon: "🖊️",
    blurb:
      "Upload notes, set assignments, track class performance and view per-student analytics.",
  },
  admin: {
    id: "admin",
    label: "Admin",
    icon: "🛡️",
    blurb: "Manage users, content, platform statistics and school-level data.",
  },
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** Maps a user's role to their dashboard route. */
export function dashboardPathForRole(role: Role): string {
  return `/dashboard/${role}`;
}
