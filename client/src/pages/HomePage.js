import { useCurrentUser } from '../utils/graphqlQueries';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { data, loading } = useCurrentUser();
  const user = data?.currentUser;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/members" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomePage;
