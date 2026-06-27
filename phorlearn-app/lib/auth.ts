import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { query } from "@/lib/db/pool";
import { dashboardPathForRole, isRole, type Role } from "@/lib/roles";

export interface Profile {
  id: string;
  full_name: string | null;
  role: Role;
  shs_class: string | null;
  programme: string | null;
  avatar_url: string | null;
  email: string | null;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  role: string;
  shs_class: string | null;
  programme: string | null;
  avatar_url: string | null;
}

/**
 * Loads the signed-in user's profile. Redirects to /login when not
 * authenticated. When `expectedRole` is provided and does not match,
 * the user is bounced to their own role dashboard.
 */
export async function requireProfile(expectedRole?: Role): Promise<Profile> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const rows = await query<ProfileRow>(
    "select id, full_name, role, shs_class, programme, avatar_url from profiles where id = ? limit 1",
    [user.id]
  );
  const data = rows[0];

  const role: Role = data && isRole(data.role) ? data.role : "student";

  if (expectedRole && role !== expectedRole) {
    redirect(dashboardPathForRole(role));
  }

  return {
    id: user.id,
    full_name: data?.full_name ?? null,
    role,
    shs_class: data?.shs_class ?? null,
    programme: data?.programme ?? null,
    avatar_url: data?.avatar_url ?? null,
    email: user.email ?? null,
  };
}
