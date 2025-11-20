import { post, get, put, patch, del } from './request';

export const registerUser = async (email, password, passwordConfirmation) => {
  const payload = {
    user: { email, password, password_confirmation: passwordConfirmation },
  };

  const response = await post('/signup', payload);

  return response;
};

export const getCurrentUser = async () => {
  return get('/current_user');
};
