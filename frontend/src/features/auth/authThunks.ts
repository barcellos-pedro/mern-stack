import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login } from '../../types/Login';

import { UserDTO } from '../../types/UserDTO';
import authService from './authService';

const handleError = (thunkAPI: any, error: any, fallbackMsg: string) => {
  const message = error?.response?.data?.message || fallbackMsg;
  return thunkAPI.rejectWithValue(message);
};

/**
 * Register User
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
      return handleError(
        thunkAPI,
        error,
        'Error to create your account. Please, try again'
      );
    }
  }
);

/**
 * Login User
 */
export const login = createAsyncThunk(
  'auth/login',
  async (formData: Login, thunkAPI) => {
    try {
      const { data } = await authService.login(formData);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error: any) {
      return handleError(
        thunkAPI,
        error,
        'Error during login. Please, try again.'
      );
    }
  }
);
