import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/api';

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
