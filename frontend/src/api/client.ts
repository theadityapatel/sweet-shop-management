const API_URL = 'http://localhost:4000/api';

export function getToken() {
  return localStorage.getItem('token');
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const headers: any = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    throw new Error('API error');
  }

  return res.json();
}
