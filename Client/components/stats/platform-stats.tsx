import type { PlatformSummary } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface PlatformStatsProps {
  stats: PlatformSummary[];
}

function StatCard({ stat }: { stat: PlatformSummary }) {
  const config = PLATFORM_CONFIG[stat.platform];
  const publishRate =
    stat.totalTasks > 0
      ? Math.round((stat.publishedTasks / stat.totalTasks) * 100)
      : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <Badge color={config.color} bgColor={config.bgColor} className="text-sm font-semibold">
          {config.label}
        </Badge>
        <span className="text-xs text-[var(--muted)]">
          {publishRate}% published
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-2xl font-bold">{stat.totalTasks}</p>
          <p className="text-xs text-[var(--muted)]">Total Tasks</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--status-published)]">
            {stat.publishedTasks}
          </p>
          <p className="text-xs text-[var(--muted)]">Published</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{formatPrice(stat.totalPrice)}</p>
          <p className="text-xs text-[var(--muted)]">Total Value</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full transition-all"
          style={{ width: `${publishRate}%`, backgroundColor: config.color.match(/#[a-fA-F0-9]+/)?.[0] }}
        />
      </div>
    </Card>
  );
}

export function PlatformStats({ stats }: PlatformStatsProps) {
  if (stats.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-[var(--muted)]">No platform statistics available</p>
      </Card>
    );
  }

  
  const totals = stats.reduce(
    (acc, stat) => ({
      totalTasks: acc.totalTasks + stat.totalTasks,
      publishedTasks: acc.publishedTasks + stat.publishedTasks,
      totalPrice: acc.totalPrice + stat.totalPrice,
    }),
    { totalTasks: 0, publishedTasks: 0, totalPrice: 0 }
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Platform Analytics</h2>
        <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <span>
            <strong className="text-[var(--foreground)]">{totals.totalTasks}</strong> total
          </span>
          <span>
            <strong className="text-[var(--status-published)]">{totals.publishedTasks}</strong> published
          </span>
          <span>
            <strong className="text-[var(--foreground)]">{formatPrice(totals.totalPrice)}</strong> value
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.platform} stat={stat} />
        ))}
      </div>
    </div>
  );
}

