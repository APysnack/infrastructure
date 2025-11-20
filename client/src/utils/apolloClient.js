import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:3000/graphql',
  credentials: 'include', // Include cookies for authentication
});

// Optional: Add a middleware link to handle authentication headers if needed
const authLink = new ApolloLink((operation, forward) => {
  // You can add authentication headers here if needed
  // For example, if you're using JWT tokens stored in localStorage:
  // const token = localStorage.getItem('authToken');
  // if (token) {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // Enable debugging in development
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client;
