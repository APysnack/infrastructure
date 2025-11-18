const API_BASE_URL = 'http://localhost:3000';


export const get = (endpoint) => request(endpoint, 'GET');
export const post = (endpoint, payload) => request(endpoint, 'POST', payload);
export const put = (endpoint, payload) => request(endpoint, 'PUT', payload);
export const patch = (endpoint, payload) => request(endpoint, 'PATCH', payload);
export const del = (endpoint) => request(endpoint, 'DELETE');

export const request = async (endpoint, method, payload = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error making ${method} request to ${endpoint}:`, err);
    throw err;
  }
};
