import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { dashboardPathForRole, ROLE_META, type Role } from "@/lib/roles";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";
import AvatarUploader from "./AvatarUploader";

export const dynamic = "force-dynamic";

function initialsOf(name: string | null, email: string | null): string {
  return (name ?? email ?? "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] bg-faint px-3.5 py-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="mt-0.5 text-[14px] font-semibold text-ink">{value}</div>
    </div>
  );
}

export default async function ProfilePage() {
  const profile = await requireProfile();
  const meta = ROLE_META[profile.role as Role];

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="My Account"
        title="Profile"
        sub="Update your profile picture and review your account details."
      />

      <Widget label="Profile Picture" className="mb-4">
        <AvatarUploader
          avatarUrl={profile.avatar_url}
          initials={initialsOf(profile.full_name, profile.email)}
        />
      </Widget>

      <Widget label="Account Details">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Field label="Full name" value={profile.full_name ?? "—"} />
          <Field label="Email" value={profile.email ?? "—"} />
          <Field label="Role" value={`${meta.icon} ${meta.label}`} />
          {profile.role === "student" && (
            <>
              <Field
                label="Class"
                value={profile.shs_class?.replace("SHS", "SHS ") ?? "—"}
              />
              <Field label="Programme" value={profile.programme ?? "—"} />
            </>
          )}
        </div>
      </Widget>

      <div className="mt-6">
        <Link
          href={dashboardPathForRole(profile.role)}
          className="text-sm font-bold text-muted transition hover:text-brand"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </DashboardShell>
  );
}
