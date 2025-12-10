type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
}

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  status: number;
  ok: boolean;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchClient<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<FetchResult<TResponse>> {
  const {
    method = "GET",
    body,
    headers = {},
    cache,
    revalidate,
    tags,
  } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const fetchOptions: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  if (cache) {
    fetchOptions.cache = cache;
  }

  if (revalidate !== undefined || tags) {
    fetchOptions.next = {};
    if (revalidate !== undefined) fetchOptions.next.revalidate = revalidate;
    if (tags) fetchOptions.next.tags = tags;
  }

  try {
    const response = await fetch(url, fetchOptions);
    const text = await response.text();
    const data = text ? (JSON.parse(text) as TResponse) : null;

    if (!response.ok) {
      const errorData = data as { error?: string; message?: string } | null;
      return {
        data: null,
        error:
          errorData?.error ||
          errorData?.message ||
          `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        ok: false,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
      ok: true,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 500,
      ok: false,
    };
  }
}

export const http = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, "method" | "body">) =>
    fetchClient<T>(endpoint, { ...options, method: "GET" }),

  post: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">
  ) =>
    fetchClient<TResponse, TBody>(endpoint, {
      ...options,
      method: "POST",
      body,
    }),

  put: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">
  ) =>
    fetchClient<TResponse, TBody>(endpoint, {
      ...options,
      method: "PUT",
      body,
    }),

  patch: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">
  ) =>
    fetchClient<TResponse, TBody>(endpoint, {
      ...options,
      method: "PATCH",
      body,
    }),

  delete: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, "method" | "body">
  ) => fetchClient<T>(endpoint, { ...options, method: "DELETE" }),
};
