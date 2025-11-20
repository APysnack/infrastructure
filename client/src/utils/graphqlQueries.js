import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      message
      user {
        id
        email
        createdAt
        updatedAt
      }
      token
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut {
      success
      message
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      success
      message
      user {
        id
        email
      }
    }
  }
`;

export const useUsers = () => {
  return useQuery(GET_USERS);
};

export const useUser = (userId) => {
  return useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip query if userId is not provided
  });
};

export const useSignIn = () => {
  return useMutation(SIGN_IN_MUTATION);
};

export const useSignOut = () => {
  return useMutation(SIGN_OUT_MUTATION);
};

export const useSignUp = () => {
  return useMutation(SIGN_UP_MUTATION);
};
