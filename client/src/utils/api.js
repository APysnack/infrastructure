import { post, get, put, patch, del } from './request';

export const registerUser = async (email, password, passwordConfirmation) => {
  const payload = {
    user: { email, password, password_confirmation: passwordConfirmation }
  };

  return post('/signup', payload);
};
