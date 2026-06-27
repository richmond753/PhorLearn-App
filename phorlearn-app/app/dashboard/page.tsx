import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { dashboardPathForRole } from "@/lib/roles";

export default async function DashboardIndex() {
  const profile = await requireProfile();
  redirect(dashboardPathForRole(profile.role));
}
