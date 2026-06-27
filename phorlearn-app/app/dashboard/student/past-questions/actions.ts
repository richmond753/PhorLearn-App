"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Maps a past-questions subject slug to the matching row in subject_progress
// (which is seeded with these display names). Slugs without a match simply
// skip the progress-bar update.
const SUBJECT_PROGRESS_NAME: Record<string, string> = {
  "core-maths": "Core Maths",
  "integrated-science": "Integrated Science",
  biology: "Biology",
  chemistry: "Chemistry",
  physics: "Physics",
  english: "English",
};

export interface SaveAttemptInput {
  subjectSlug: string;
  subjectName: string;
  year: number;
  score: number;
  total: number;
  durationSeconds: number;
}

export interface SaveAttemptResult {
  ok: boolean;
  error?: string;
}

export async function saveAttempt(
  input: SaveAttemptInput
): Promise<SaveAttemptResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Not authenticated." };
  }

  const percentage =
    input.total > 0 ? Math.round((input.score / input.total) * 100) : 0;

  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    subject_slug: input.subjectSlug,
    subject_name: input.subjectName,
    year: input.year,
    score: input.score,
    total: input.total,
    percentage,
    duration_seconds: input.durationSeconds,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  // ── Close the data loop: reflect this attempt in the student's progress ──
  // All steps are best-effort; a failure here must not fail the saved attempt.
  try {
    // 1) Recompute the running quiz average across all attempts.
    const { data: all } = await supabase
      .from("quiz_attempts")
      .select("percentage")
      .eq("user_id", user.id);

    const rows = (all ?? []) as { percentage: number }[];
    const avg = rows.length
      ? Math.round(
          rows.reduce((a, r) => a + r.percentage, 0) / rows.length
        )
      : percentage;

    await supabase
      .from("weekly_stats")
      .upsert({ user_id: user.id, quiz_average: avg }, { onConflict: "user_id" });

    // 2) Nudge the matching subject's progress bar toward the latest score.
    const progressName = SUBJECT_PROGRESS_NAME[input.subjectSlug];
    if (progressName) {
      const { data: row } = await supabase
        .from("subject_progress")
        .select("progress")
        .eq("user_id", user.id)
        .eq("subject", progressName)
        .maybeSingle();
      if (row) {
        const updated = Math.round((row.progress as number) * 0.5 + percentage * 0.5);
        await supabase
          .from("subject_progress")
          .update({ progress: updated })
          .eq("user_id", user.id)
          .eq("subject", progressName);
      }
    }

    // 3) Unlock the "Top 10%" achievement once the average hits 90%+.
    if (avg >= 90 || percentage >= 90) {
      await supabase
        .from("achievements")
        .update({ unlocked: true })
        .eq("user_id", user.id)
        .eq("name", "Top 10%");
    }
  } catch {
    // ignore — the attempt itself is already saved
  }

  revalidatePath("/dashboard/student/past-questions");
  revalidatePath("/dashboard/student/progress");
  revalidatePath("/dashboard/student");
  return { ok: true };
}
