import { requireProfile } from "@/lib/auth";
import { dashboardPathForRole, ROLE_META, type Role } from "@/lib/roles";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Faq {
  q: string;
  a: string;
}

const GENERAL_FAQS: Faq[] = [
  {
    q: "Is PhorLearn free to use?",
    a: "Yes. Lessons, past questions, the Resource Library and the AI Study Helper (powered by Google Gemini) are all free — no billing required.",
  },
  {
    q: "How do I update my profile picture?",
    a: "Click your avatar at the top-right of any page to open your Profile, then upload a JPG, PNG, WEBP or GIF (up to 4 MB).",
  },
  {
    q: "How do I move between screens?",
    a: "Use the top navigation tabs, or the Back / Next stepper shown at the top and bottom of each student screen to step through them in order.",
  },
  {
    q: "I forgot my password — what do I do?",
    a: "Password reset is not yet automated in this prototype. Create a new account, or contact your school administrator to help recover access.",
  },
];

const ROLE_FAQS: Record<Role, Faq[]> = {
  student: [
    {
      q: "How do timed past-question papers work?",
      a: "Open Past Questions, pick a subject and year, then answer one question at a time. You get instant feedback and an explanation. You can press A–D to answer and ← / → to navigate. Your progress is saved if you refresh, and your score is added to your history when you submit.",
    },
    {
      q: "How does the AI Study Helper work?",
      a: "On any lesson page, the Study Helper knows the subject and topic you're viewing. Ask a question (or tap a suggested prompt) and it gives a short, WASSCE-focused explanation. Your chats are saved per topic.",
    },
    {
      q: "How is my progress tracked?",
      a: "Quizzes update your subject progress, weekly stats and quiz average automatically. See the Progress page for grade projections.",
    },
    {
      q: "Where do I find the curriculum and real past papers?",
      a: "The Resource Library (and the download bar on each Past Questions subject) links to the official NaCCA curriculum, WAEC past papers and video lessons. Use the search box to find a specific resource.",
    },
  ],
  teacher: [
    {
      q: "How do I set an assignment or upload a lesson?",
      a: "On your dashboard, use the Set Assignment and Upload Lesson forms. Assignments appear for your students; uploaded lessons show in your Lesson Materials list.",
    },
    {
      q: "Whose performance can I see?",
      a: "You see the students in your assigned class, with per-student performance bars and your class average.",
    },
  ],
  parent: [
    {
      q: "How do I see my ward's performance?",
      a: "Your dashboard shows your ward's subject performance, weekly activity (study time, lessons, streak) and any focus areas below 65%.",
    },
    {
      q: "Can I get a report?",
      a: "Use the Email Report button on your dashboard to receive a summary of your ward's recent activity.",
    },
  ],
  admin: [
    {
      q: "What can I manage as an admin?",
      a: "The admin dashboard shows platform statistics, a user breakdown by SHS class and top subjects, plus actions for managing users and content.",
    },
  ],
};

function FaqItem({ item }: { item: Faq }) {
  return (
    <details className="group rounded-[10px] border border-line bg-white px-4 py-3 transition open:border-brand">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink">
        {item.q}
        <span className="ml-3 text-muted transition group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.a}</p>
    </details>
  );
}

export default async function HelpPage() {
  const profile = await requireProfile();
  const meta = ROLE_META[profile.role as Role];
  const roleFaqs = ROLE_FAQS[profile.role as Role] ?? [];

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Help & Support"
        title="How can we help?"
        sub="Answers to common questions. Expand any item to read more."
      />

      <Widget label={`${meta.icon} For ${meta.label}s`} className="mb-4">
        <div className="space-y-2">
          {roleFaqs.map((f) => (
            <FaqItem key={f.q} item={f} />
          ))}
        </div>
      </Widget>

      <Widget label="General" className="mb-4">
        <div className="space-y-2">
          {GENERAL_FAQS.map((f) => (
            <FaqItem key={f.q} item={f} />
          ))}
        </div>
      </Widget>

      <div className="rounded-xl border border-line bg-faint p-4 text-[13px] leading-relaxed text-muted">
        Still stuck? Reach out to your school administrator or teacher for
        account help. For study questions, the{" "}
        <span className="font-semibold text-ink2">AI Study Helper</span> on any
        lesson page is available any time.
      </div>

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
