import { createSlice } from '@reduxjs/toolkit';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { AuthState } from '../../types/AuthState';
import { UserDAO } from '../../types/UserDAO';
import { login, register } from './authThunks';

// Get user from localStorage
// eslint-disable-next-line react-hooks/rules-of-hooks
const user = useLocalStorage<UserDAO>('user');

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
        console.log(action);
        state.user = action.payload as UserDAO;
        state.loading = false;
      });
  },
});

// Export actions to use on dispatch later
export const { reset, logout } = authSlice.actions;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;
