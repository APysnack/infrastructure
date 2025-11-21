import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    // Fetch current user on component mount to check if user is authenticated
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    error,
    isAuthenticated,
  };
};
