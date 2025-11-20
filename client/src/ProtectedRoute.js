import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from './utils/api';

const ProtectedRoute = ({ element }) => {
  const [isAuth, setIsAuth] = useState(null); // null = checking, true = auth, false = not auth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch current user to verify authentication
        const user = await getCurrentUser();
        setIsAuth(!!user);
      } catch (error) {
        // If request fails, user is not authenticated
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  return isAuth ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
