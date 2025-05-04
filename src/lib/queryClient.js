import { QueryClient } from '@tanstack/react-query';

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText);
  }
  return res;
}

export async function apiRequest(
  url,
  options = {},
  onUnauthorized = 'returnNull'
) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      if (onUnauthorized === 'returnNull') {
        return null;
      } else {
        throw new Error('Unauthorized');
      }
    }

    await throwIfResNotOk(res);

    if (res.status === 204) {
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getQueryFn = (options) => {
  return async ({ queryKey }) => {
    const [url, params] = queryKey;
    const query = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).filter(([, v]) => v !== undefined)
          )
        ).toString()}`
      : '';

    return apiRequest(`${url}${query}`, {}, options.on401);
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      queryFn: getQueryFn({ on401: 'throw' }),
    },
  },
});