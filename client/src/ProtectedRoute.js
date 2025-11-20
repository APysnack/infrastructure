import { useCurrentUser } from './utils/graphqlQueries';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { data, loading } = useCurrentUser();
  const user = data?.currentUser;

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
