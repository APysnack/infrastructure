const API_BASE_URL = 'http://localhost:3000';

export const request = async (endpoint, method, payload = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Include cookies with every request
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

    const contentType = res.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await res.json()
      : { message: await res.text() };

    if (!res.ok) {
      throw new Error(data.message || `HTTP error! status: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error(`Error making ${method} request to ${endpoint}:`, err);
    throw err;
  }
};

// Token storage using cookies (HTTP-only cookies are managed by the server)
// These functions are kept for backwards compatibility but are no longer used
export const getToken = () => {
  // Since HTTP-only cookies can't be accessed from JS, we check if user has active session
  return 'cookie-based-auth'; // Return truthy to indicate potential auth
};
export const setToken = (token) => {
  // Token setting is now handled by the server via Set-Cookie header
};
export const clearToken = () => {
  // Cookie clearing is now handled by the server on logout
};

export const get = (endpoint) => request(endpoint, 'GET');
export const post = (endpoint, payload) => request(endpoint, 'POST', payload);
export const put = (endpoint, payload) => request(endpoint, 'PUT', payload);
export const patch = (endpoint, payload) => request(endpoint, 'PATCH', payload);
export const del = (endpoint) => request(endpoint, 'DELETE');
