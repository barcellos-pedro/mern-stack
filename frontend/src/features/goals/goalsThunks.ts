import { createAsyncThunk } from '@reduxjs/toolkit';
import goalsService from './goalsService';

const handleError = (thunkAPI: any, error: any, fallbackMsg: string) => {
  const message = error?.response?.data?.message || fallbackMsg;
  return thunkAPI.rejectWithValue(message);
};

export const getGoals = createAsyncThunk(
  'goals/getGoals',
  async (token: string, thunkAPI) => {
    if (!token) {
      throw new Error('Not authorized');
    }
    try {
      const { data } = await goalsService.getGoals(token);
      return data;
    } catch (error) {
      return handleError(
        thunkAPI,
        error,
        'Error loading Goals. Please try again later.'
      );
    }
  }
);
