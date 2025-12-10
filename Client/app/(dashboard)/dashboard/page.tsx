import { Suspense } from "react";
import { getTasks, getPlatformSummary } from "@/services";
import type { Platform, Status, TaskFilters } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { DashboardClient, DashboardSkeleton } from "./_components";

interface DashboardPageProps {
  searchParams: Promise<{
    page?: string;
    status?: Status;
    platform?: Platform;
  }>;
}

async function DashboardContent({ searchParams }: DashboardPageProps) {
  const params = await searchParams;

  const filters: TaskFilters = {
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: DEFAULT_PAGE_SIZE,
    status: params.status,
    platform: params.platform,
  };

  const [tasksResult, statsResult] = await Promise.all([
    getTasks(filters, { revalidate: 0, tags: ["tasks"] }),
    getPlatformSummary({ revalidate: 60, tags: ["stats"] }),
  ]);

  return (
    <DashboardClient
      tasks={tasksResult.tasks}
      pagination={tasksResult.pagination}
      stats={statsResult.stats}
      error={tasksResult.error}
    />
  );
}

export default async function DashboardPage(props: DashboardPageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent searchParams={props.searchParams} />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
