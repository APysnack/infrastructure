import { post, get, put, patch, del, setToken, clearToken, getToken } from './request';

export const registerUser = async (email, password, passwordConfirmation) => {
  const payload = {
    user: { email, password, password_confirmation: passwordConfirmation }
  };

  const response = await post('/signup', payload);
  
  if (response.token) {
    setToken(response.token);
  }
  
  return response;
};

export const loginUser = async (email, password) => {
  const payload = {
    user: { email, password }
  };

  const response = await post('/login', payload);
  
  if (response.data?.token) {
    setToken(response.data.token);
  }
  
  return response;
};

export const logoutUser = async () => {
  try {
    await del('/logout');
  } finally {
    clearToken();
  }
};

export const getCurrentUser = async () => {
  if (!getToken()) {
    return null;
  }
  return get('/current_user');
};

export const isAuthenticated = () => {
  console.log("IAMHERE")
  console.log(getToken())
  return !!getToken();
};
