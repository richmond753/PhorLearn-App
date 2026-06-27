import { randomUUID } from "crypto";
import { query } from "@/lib/db/pool";
import type { Role } from "@/lib/roles";

function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 86_400_000);
}

/**
 * Seeds demo dashboard data for a freshly-created user, mirroring what the old
 * Supabase signup trigger used to do. Called from the signup action.
 */
export async function seedDemoData(userId: string, role: Role): Promise<void> {
  if (role === "student") {
    await query(
      `insert into subject_progress (user_id, subject, progress, color, sort_order) values
        (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?)`,
      [
        userId, "Core Maths", 70, "#0EA5E9", 1,
        userId, "Elective Maths", 68, "#1B4FD8", 2,
        userId, "Integrated Science", 60, "#0891B2", 3,
        userId, "Biology", 82, "#16A34A", 4,
        userId, "Chemistry", 45, "#D4A017", 5,
        userId, "Physics", 55, "#7C3AED", 6,
        userId, "English", 88, "#16A34A", 7,
      ]
    );

    await query(
      `insert into weekly_stats (user_id, lessons_done, study_minutes, quiz_average, streak_days)
       values (?,?,?,?,?)`,
      [userId, 18, 380, 76, 5]
    );

    await query(
      `insert into homework (user_id, title, subject, due_at) values (?,?,?,?),(?,?,?,?),(?,?,?,?)`,
      [
        userId, "Elective Maths Practice Test", "Elective Maths", daysFromNow(1),
        userId, "Chemistry Assignment", "Chemistry", daysFromNow(2),
        userId, "Biology Past Questions (2022)", "Biology", daysFromNow(4),
      ]
    );

    await query(
      `insert into achievements (user_id, name, description, icon, unlocked, sort_order) values
        (?,?,?,?,?,?),(?,?,?,?,?,?),(?,?,?,?,?,?),(?,?,?,?,?,?),(?,?,?,?,?,?),(?,?,?,?,?,?)`,
      [
        userId, "Consistent Learner", "5-day study streak", "🏅", 1, 1,
        userId, "Biology Star", "85%+ in Biology", "⭐", 1, 2,
        userId, "Past Q Champion", "All 2022 papers done", "📋", 1, 3,
        userId, "Top 10%", "Average 90%+ needed", "🥇", 0, 4,
        userId, "WASSCE Ready", "All papers complete", "🎓", 0, 5,
        userId, "30-Day Streak", "25 more days to go", "🔥", 0, 6,
      ]
    );
  }

  if (role === "teacher") {
    const classId = randomUUID();
    await query(
      `insert into classes (id, teacher_id, name, subject) values (?,?,?,?)`,
      [classId, userId, "SHS 3 · Elective Mathematics", "Elective Mathematics"]
    );
    await query(
      `insert into class_students (class_id, full_name, score) values
        (?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?)`,
      [
        classId, "Akosua Owusu", 88,
        classId, "Kofi Mensah", 72,
        classId, "Yaw Darko", 79,
        classId, "Esi Bonsu", 63,
        classId, "Ama Asante", 55,
        classId, "Joseph Boateng", 45,
      ]
    );
    await query(
      `insert into assignments (class_id, title, subject, due_at) values (?,?,?,?),(?,?,?,?),(?,?,?,?)`,
      [
        classId, "Integration Problem Set", "Elective Mathematics", daysFromNow(2),
        classId, "Differentiation Quiz", "Elective Mathematics", daysFromNow(5),
        classId, "Binomial Theorem Worksheet", "Elective Mathematics", daysFromNow(8),
      ]
    );
  }

  if (role === "parent") {
    const wardId = randomUUID();
    await query(
      `insert into wards (id, parent_id, full_name, shs_class, programme, study_minutes, lessons_done, streak_days)
       values (?,?,?,?,?,?,?,?)`,
      [wardId, userId, "Sandra Owusu", "SHS3", "General Science", 380, 18, 5]
    );
    await query(
      `insert into ward_subjects (ward_id, subject, score, color, sort_order) values
        (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?)`,
      [
        wardId, "Biology", 85, "#16A34A", 1,
        wardId, "English", 88, "#16A34A", 2,
        wardId, "Elective Maths", 72, "#1B4FD8", 3,
        wardId, "Chemistry", 62, "#D4A017", 4,
        wardId, "Physics", 58, "#7C3AED", 5,
      ]
    );
  }
}
