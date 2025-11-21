import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GET_CURRENT_USER,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  SIGN_OUT_MUTATION,
} from '../../utils/graphqlQueries';
import client from '../../utils/apolloClient';

// Async thunk for signing in
export const signInUser = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: { email, password },
      });

      if (data.signIn.success) {
        // Refetch current user to update Apollo cache
        await client.query({ query: GET_CURRENT_USER });
        return data.signIn.user;
      } else {
        return rejectWithValue(data.signIn.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up
export const signUpUser = createAsyncThunk(
  'user/signUp',
  async ({ email, password, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { email, password, passwordConfirmation },
      });

      if (data.signUp.success) {
        // Refetch current user to update Apollo cache
        await client.query({ query: GET_CURRENT_USER });
        return data.signUp.user;
      } else {
        return rejectWithValue(data.signUp.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing out
export const signOutUser = createAsyncThunk('user/signOut', async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: SIGN_OUT_MUTATION,
    });

    if (data.signOut.success) {
      return null;
    } else {
      return rejectWithValue(data.signOut.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_CURRENT_USER,
      });

      return data.currentUser;
    } catch (error) {
      // User is not authenticated, return null instead of rejecting
      return null;
    }
  }
);

const initialState = {
  user: null,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Sign Up
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Sign Out
    builder
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear user on logout error
        state.user = null;
      });

    // Fetch Current User
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
