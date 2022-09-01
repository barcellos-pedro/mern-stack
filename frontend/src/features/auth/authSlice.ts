import { createSlice } from '@reduxjs/toolkit';
import { useLocalStorageItem } from '../../hooks/useLocalStorageItem';

import { AuthState } from '../../types/AuthState';
import { UserDAO } from '../../types/UserDAO';
import { login, register } from './authThunks';

// Get user from localStorage
// eslint-disable-next-line react-hooks/rules-of-hooks
const user = useLocalStorageItem<UserDAO>('user');

const initialState: AuthState = {
  user,
  error: false,
  loading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset(state) {
      state.error = false;
      state.loading = false;
      state.message = '';
    },
    logout(state) {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
        state.user = null;
        state.message = action.payload as string; // message from thunkAPI.rejectWithValue
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload as UserDAO;
        state.loading = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = true;
        state.user = null;
        state.message = action.payload as string; // message from thunkAPI.rejectWithValue
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload as UserDAO;
        state.loading = false;
      });
  },
});

// Extract actions object and reducer
const { actions, reducer } = authSlice;

// Export actions to dispatch
export const { logout, reset } = actions;

// Export reducer to use on configureStore
export default reducer;
