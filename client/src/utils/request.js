const API_BASE_URL = 'http://localhost:3000';

export const request = async (endpoint, method, payload = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  const token = getToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const authHeader = res.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      setToken(token);
    }
    
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

// Token storage and retrieval
export const getToken = () => localStorage.getItem('authToken');
export const setToken = (token) => localStorage.setItem('authToken', token);
export const clearToken = () => localStorage.removeItem('authToken');

export const get = (endpoint) => request(endpoint, 'GET');
export const post = (endpoint, payload) => request(endpoint, 'POST', payload);
export const put = (endpoint, payload) => request(endpoint, 'PUT', payload);
export const patch = (endpoint, payload) => request(endpoint, 'PATCH', payload);
export const del = (endpoint) => request(endpoint, 'DELETE');
