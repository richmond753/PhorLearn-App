"use server";

import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db/pool";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/session";
import { seedDemoData } from "@/lib/seed";
import { dashboardPathForRole, isRole, type Role } from "@/lib/roles";

export interface AuthState {
  error?: string;
  notice?: string;
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");
  const roleInput = String(formData.get("role") ?? "");
  const shsClass = String(formData.get("shs_class") ?? "").trim();
  const programme = String(formData.get("programme") ?? "").trim();

  if (!fullName || !email || !password) {
    return { error: "Please fill in your name, email and password." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  if (confirmPassword && password !== confirmPassword) {
    return { error: "The two passwords do not match." };
  }
  if (!isRole(roleInput)) {
    return { error: "Please choose a role to continue." };
  }
  const role: Role = roleInput;
  const wantsClass = role === "student";

  try {
    const existing = await query<{ id: string }>(
      "select id from users where email = ? limit 1",
      [email]
    );
    if (existing.length) {
      return { error: "An account with this email already exists." };
    }

    const id = randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    await query(
      "insert into users (id, email, password_hash) values (?,?,?)",
      [id, email, passwordHash]
    );
    await query(
      "insert into profiles (id, full_name, role, shs_class, programme) values (?,?,?,?,?)",
      [
        id,
        fullName,
        role,
        wantsClass && shsClass ? shsClass : null,
        wantsClass && programme ? programme : null,
      ]
    );

    await seedDemoData(id, role);
    await setSessionCookie({ id, email });
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not create your account.",
    };
  }

  revalidatePath("/", "layout");
  redirect(dashboardPathForRole(role));
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  let role: Role = "student";

  try {
    const users = await query<{ id: string; password_hash: string }>(
      "select id, password_hash from users where email = ? limit 1",
      [email]
    );
    const user = users[0];
    if (!user) {
      return { error: "Invalid email or password." };
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return { error: "Invalid email or password." };
    }

    const profiles = await query<{ role: string }>(
      "select role from profiles where id = ? limit 1",
      [user.id]
    );
    if (profiles[0] && isRole(profiles[0].role)) {
      role = profiles[0].role;
    }

    await setSessionCookie({ id: user.id, email });
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not sign you in.",
    };
  }

  revalidatePath("/", "layout");
  redirect(dashboardPathForRole(role));
}

export async function signOutAction() {
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/login");
}
