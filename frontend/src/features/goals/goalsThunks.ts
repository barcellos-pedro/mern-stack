import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import goalsService from './goalsService';

// Helpers
const NOT_AUTHORIZED_ERROR = 'Not authorized';

const getToken = (thunkAPI: any): string | undefined => {
  const rootState = thunkAPI.getState() as RootState;
  return rootState.auth.user?.token;
};

const handleError = (thunkAPI: any, error: any, fallbackMsg: string) => {
  const message = error?.response?.data?.message || fallbackMsg;
  return thunkAPI.rejectWithValue(message);
};

// Async actions
export const getGoals = createAsyncThunk(
  'goals/getGoals',
  async (token: string, thunkAPI) => {
    if (!token) {
      throw new Error(NOT_AUTHORIZED_ERROR);
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

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (payload: { text: string }, thunkAPI) => {
    const token = getToken(thunkAPI);
    if (!token) {
      throw new Error(NOT_AUTHORIZED_ERROR);
    }

    try {
      const { data } = await goalsService.createGoal(payload, token);
      return data;
    } catch (error) {
      return handleError(
        thunkAPI,
        error,
        'Error to create Goal. Please try again later.'
      );
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (id: string, thunkAPI) => {
    const token = getToken(thunkAPI);
    if (!token) {
      throw new Error(NOT_AUTHORIZED_ERROR);
    }

    try {
      const { data } = await goalsService.deleteGoal(id, token);
      return data;
    } catch (error) {
      return handleError(
        thunkAPI,
        error,
        'Error to delete Goal. Please try again later.'
      );
    }
  }
);

export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (payload: { text: string; id: string }, thunkAPI) => {
    const token = getToken(thunkAPI);
    if (!token) {
      throw new Error(NOT_AUTHORIZED_ERROR);
    }

    try {
      const { data } = await goalsService.updateGoal(payload, token);
      return data;
    } catch (error) {
      return handleError(
        thunkAPI,
        error,
        'Error to delete Goal. Please try again later.'
      );
    }
  }
);
