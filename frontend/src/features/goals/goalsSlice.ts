import { createSlice } from '@reduxjs/toolkit';
import { GoalsState } from '../../types/GoalsState';
import { getGoals } from './goalsThunks';

const initialState: GoalsState = {
  error: false,
  loading: false,
  message: '',
  goals: [],
};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset(state) {
      state.error = false;
      state.loading = false;
      state.message = '';
    },
    clearGoals(state) {
      state.goals = [];
    },
  },
  extraReducers(builder) {
    builder
      // Get Goals
      .addCase(getGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload as string;
        state.loading = false;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.loading = false;
      });
  },
});

// Extract actions object and reducer
const  { actions, reducer } = goalsSlice;

// Export actions to dispatch
export const { reset, clearGoals } = actions;

// Export reducer to use on configureStore
export default reducer;
