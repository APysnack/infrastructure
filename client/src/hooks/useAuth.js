import { useCurrentUser } from '../utils/graphqlQueries';

export const useAuth = () => {
  const { data, loading } = useCurrentUser();
  const user = data?.currentUser;

  return { user, loading, isAuthenticated: !!user };
};
