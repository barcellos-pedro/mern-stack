import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserDTO } from '../../types/UserDTO';
import authService from './authService';

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
      const message =
        error?.response?.data?.message ||
        'Error when creating the user. Try again.';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
