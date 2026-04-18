/**
 * Generic fetch wrapper with consistent error handling
 */

interface FetchOptions extends RequestInit {
  errorMessage?: string;
}

/**
 * Fetch with standardized error handling
 * Throws an error with the API's error message or a fallback
 */
export async function fetchWithErrorHandling<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { errorMessage = "请求失败", ...fetchOptions } = options;

  const resp = await fetch(url, fetchOptions);

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? `${errorMessage} (${resp.status})`,
    );
  }

  return resp.json() as Promise<T>;
}
