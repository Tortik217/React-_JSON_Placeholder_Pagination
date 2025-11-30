export const fetchJson = async <Response>(url: string, init?: RequestInit): Promise<Response> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  try {
    const data = (await response.json()) as Response;
    return data;
  } catch {
    throw new Error('Failed to parse JSON response');
  }
};
