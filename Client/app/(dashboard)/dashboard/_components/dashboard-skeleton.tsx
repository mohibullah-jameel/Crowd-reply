export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="h-9 w-40 bg-[var(--border)] rounded-lg animate-pulse" />
            <div className="h-5 w-64 bg-[var(--border)] rounded mt-2 animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-[var(--border)] rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl animate-pulse"
            />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-40 bg-[var(--border)] rounded-lg animate-pulse" />
          <div className="h-10 w-40 bg-[var(--border)] rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
