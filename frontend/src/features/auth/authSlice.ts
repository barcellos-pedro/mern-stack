import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/AuthState';
import { UserDAO } from '../../types/UserDAO';
import { UserDTO } from '../../types/UserDTO';
import authService from './authService';

// Get user from localStorage
const localStorageUser: string | null = localStorage.getItem('user');
const user: UserDAO | null = localStorageUser
  ? JSON.parse(localStorageUser)
  : null;

const initialState: AuthState = {
  user,
  error: false,
  success: false,
  loading: false,
  message: '',
};

/**
 * Register User Async Thunk/Function
 */
export const register = createAsyncThunk(
  'auth/register',
  async (user: UserDTO, thunkAPI) => {
    try {
      const { data } = await authService.register(user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset(state) {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
        state.user = null;
        state.message = action.payload as string;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
      });
  },
});

// Export actions to use on dispatch later
export const { reset } = authSlice.actions;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;
