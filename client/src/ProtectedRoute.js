import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/api';

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
