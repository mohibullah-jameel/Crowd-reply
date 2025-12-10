import { http } from "@/lib/fetch-client";
import type { PlatformSummary, BackendSuccessResponse, User } from "@/types";

export async function getPlatformSummary(options?: {
  revalidate?: number;
  tags?: string[];
}): Promise<{
  stats: PlatformSummary[];
  error: string | null;
}> {
  const result = await http.get<BackendSuccessResponse<PlatformSummary[]>>(
    "/api/stats/platform-summary",
    {
      revalidate: options?.revalidate ?? 60,
      tags: options?.tags ?? ["stats", "platform-summary"],
    }
  );

  if (!result.ok || !result.data) {
    return {
      stats: [],
      error: result.error,
    };
  }

  return {
    stats: result.data.data,
    error: null,
  };
}

export async function getTestUser(): Promise<{
  user: User | null;
  error: string | null;
}> {
  const result = await http.get<BackendSuccessResponse<User>>(
    "/api/stats/test-user",
    { cache: "no-store" }
  );

  if (!result.ok || !result.data) {
    return {
      user: null,
      error: result.error,
    };
  }

  return {
    user: result.data.data,
    error: null,
  };
}
