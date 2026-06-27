import { requireProfile } from "@/lib/auth";
import { DashboardShell, PageHead } from "@/components/DashboardShell";
import HealthExplorer from "./HealthExplorer";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const profile = await requireProfile("student");

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Health & Wellness"
        title="Know Your Body, Grow Your Best"
        sub="Explore how your body works, how to move, eat and rest well — the interactive way. Less reading, more discovering."
      />

      <HealthExplorer />

    </DashboardShell>
  );
}
