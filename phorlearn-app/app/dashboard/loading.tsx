export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <span className="text-lg font-extrabold tracking-tight">
          ⭐ PhorLearn
        </span>
        <span className="rounded-full bg-brand-mid px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
          SHS
        </span>
        <div className="ml-auto h-8 w-8 animate-pulse rounded-full bg-white/20" />
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        {/* Heading skeleton */}
        <div className="mb-6 space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-line" />
          <div className="h-8 w-64 animate-pulse rounded bg-line" />
          <div className="h-3 w-48 animate-pulse rounded bg-line" />
        </div>

        {/* Card skeletons */}
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-card">
                <div className="mb-4 h-3 w-28 animate-pulse rounded bg-line" />
                <div className="space-y-3">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-3 w-full animate-pulse rounded bg-line"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-card">
                <div className="mb-4 h-3 w-24 animate-pulse rounded bg-line" />
                <div className="space-y-2.5">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-9 w-full animate-pulse rounded-lg bg-line"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
