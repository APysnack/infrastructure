import { get } from './request';
import { useCurrentUser } from './graphqlQueries';

// Legacy REST API function - kept for backward compatibility if needed
export const getCurrentUserRest = async () => {
  return get('/current_user');
};

// GraphQL hook for getting current user
export const useGetCurrentUser = useCurrentUser;
