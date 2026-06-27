"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SetAssignmentState {
  error?: string;
  success?: string;
}

export async function setAssignmentAction(
  _prev: SetAssignmentState,
  formData: FormData
): Promise<SetAssignmentState> {
  const title = String(formData.get("title") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "").trim();

  if (!title) return { error: "Enter an assignment title." };
  if (!dueDate) return { error: "Choose a due date." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  // Find this teacher's class (RLS ensures it belongs to them).
  const { data: classes } = await supabase
    .from("classes")
    .select("id, subject")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1);

  const klass = classes?.[0];
  if (!klass) return { error: "You don't have a class to assign to yet." };

  const { error } = await supabase.from("assignments").insert({
    class_id: klass.id,
    title,
    subject: subject || klass.subject,
    due_at: new Date(dueDate).toISOString(),
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/teacher");
  return { success: `Assignment "${title}" added.` };
}

export interface UploadLessonState {
  error?: string;
  success?: string;
}

export async function uploadLessonAction(
  _prev: UploadLessonState,
  formData: FormData
): Promise<UploadLessonState> {
  const title = String(formData.get("title") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title) return { error: "Enter a lesson title." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { data: classes } = await supabase
    .from("classes")
    .select("id, subject")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1);

  const klass = classes?.[0];
  if (!klass) return { error: "You don't have a class to upload to yet." };

  const { error } = await supabase.from("teacher_lessons").insert({
    class_id: klass.id,
    title,
    subject: subject || klass.subject,
    content: content || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/teacher");
  return { success: `Lesson "${title}" uploaded.` };
}
