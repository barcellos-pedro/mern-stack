import { createSlice } from '@reduxjs/toolkit';

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
