import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { query } from "@/lib/db/pool";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  shs_class: string | null;
  programme: string | null;
  created_at: string;
}

const ROLE_BADGE: Record<string, string> = {
  student: "bg-brand-lt text-brand",
  teacher: "bg-gold-lt text-gold",
  parent: "bg-success-lt text-success",
  admin: "bg-danger-lt text-danger",
};

function fmtDate(value: string): string {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toISOString().slice(0, 10);
}

export default async function ManageUsersPage() {
  const profile = await requireProfile("admin");

  let users: UserRow[] = [];
  try {
    users = await query<UserRow>(
      `select u.id, u.email, p.full_name, p.role, p.shs_class, p.programme, u.created_at
         from users u
         left join profiles p on p.id = u.id
        order by u.created_at desc
        limit 200`
    );
  } catch {
    users = [];
  }

  const counts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Admin · Users"
        title="Manage Users 👤"
        sub={`${users.length} account${users.length === 1 ? "" : "s"} on the platform.`}
      />

      <div className="mb-4">
        <Link
          href="/dashboard/admin"
          className="text-[13px] font-bold text-brand transition hover:underline"
        >
          ← Back to Admin Overview
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-[12px] font-bold">
        {(["student", "teacher", "parent", "admin"] as const).map((r) => (
          <span
            key={r}
            className={`rounded-full px-3 py-1 capitalize ${ROLE_BADGE[r]}`}
          >
            {r}: {counts[r] ?? 0}
          </span>
        ))}
      </div>

      <Widget label="All Accounts">
        {users.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">
            No users found yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-[10px] border border-line">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-faint text-left text-muted">
                  <th className="px-3.5 py-2 font-bold">Name</th>
                  <th className="px-3.5 py-2 font-bold">Email</th>
                  <th className="px-3.5 py-2 font-bold">Role</th>
                  <th className="px-3.5 py-2 font-bold">Class</th>
                  <th className="px-3.5 py-2 font-bold">Programme</th>
                  <th className="px-3.5 py-2 font-bold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-line">
                    <td className="px-3.5 py-2.5 font-semibold text-ink">
                      {u.full_name ?? "—"}
                    </td>
                    <td className="px-3.5 py-2.5 text-muted">{u.email}</td>
                    <td className="px-3.5 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${
                          ROLE_BADGE[u.role] ?? "bg-faint text-muted"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-muted">
                      {u.shs_class ?? "—"}
                    </td>
                    <td className="px-3.5 py-2.5 text-muted">
                      {u.programme ?? "—"}
                    </td>
                    <td className="px-3.5 py-2.5 text-muted">
                      {fmtDate(u.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Widget>
    </DashboardShell>
  );
}
