"use server";

import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth/session";
import { query } from "@/lib/db/pool";

export interface ProfileState {
  error?: string;
  success?: string;
}

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Images are stored under public/uploads/avatars so Next.js serves them
// statically at /uploads/avatars/<file>.
const AVATAR_DIR = path.join(process.cwd(), "public", "uploads", "avatars");

export async function uploadAvatarAction(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const user = await getSessionUser();
  if (!user) return { error: "Not authenticated." };

  const file = formData.get("avatar");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image is too large (max 4 MB)." };
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return { error: "Unsupported format. Use JPG, PNG, WEBP or GIF." };
  }

  try {
    await mkdir(AVATAR_DIR, { recursive: true });

    // Remove any previous avatar for this user (any extension).
    try {
      const existing = await readdir(AVATAR_DIR);
      await Promise.all(
        existing
          .filter((f) => f.startsWith(`${user.id}.`))
          .map((f) => unlink(path.join(AVATAR_DIR, f)))
      );
    } catch {
      // directory may be empty / first upload — ignore
    }

    const fileName = `${user.id}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(AVATAR_DIR, fileName), bytes);

    // Cache-bust so the browser shows the new image immediately.
    const publicUrl = `/uploads/avatars/${fileName}?v=${Date.now()}`;
    await query("update profiles set avatar_url = ? where id = ?", [
      publicUrl,
      user.id,
    ]);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not save the image.",
    };
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/", "layout");
  return { success: "Profile picture updated." };
}

export async function removeAvatarAction(): Promise<void> {
  const user = await getSessionUser();
  if (!user) return;

  try {
    const existing = await readdir(AVATAR_DIR).catch(() => [] as string[]);
    await Promise.all(
      existing
        .filter((f) => f.startsWith(`${user.id}.`))
        .map((f) => unlink(path.join(AVATAR_DIR, f)))
    );
    await query("update profiles set avatar_url = null where id = ?", [user.id]);
  } catch {
    // best-effort — leave the record as-is on failure
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/", "layout");
}
