import { post, get, put, patch, del } from './request';

export const registerUser = async (email, password, passwordConfirmation) => {
  const payload = {
    user: { email, password, password_confirmation: passwordConfirmation },
  };

  const response = await post('/signup', payload);

  return response;
};

export const loginUser = async (email, password) => {
  const payload = {
    user: { email, password },
  };

  const response = await post('/login', payload);

  return response;
};

export const logoutUser = async () => {
  await del('/logout');
};

export const getCurrentUser = async () => {
  return get('/current_user');
};
