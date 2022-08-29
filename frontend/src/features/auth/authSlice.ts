import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const localStorageUser: string | null = localStorage.getItem('user');
const parsedUser = localStorageUser || null;

const initialState = {
  user: parsedUser || null,
  error: false,
  success: false,
  loading: false,
  message: '',
};

// Register User (Async Thunk/Fn)
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
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
      state.user = null;
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = '';
    },
  },
  extraReducers() {},
});

// Export actions
export const { reset } = authSlice.actions;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;
