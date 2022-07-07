import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {logger} from '../../inf/logger';
import {
  createWorkout,
  queryWorkoutByDate,
  updateESet,
  updateTask,
} from '../workout/repositoryWorkout';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWorkoutByDate.pending, (_, action) => {
        logger(`${action.type}`, null);
      })
      .addCase(getWorkoutByDate.fulfilled, (state, action) => {
        logger(`${action.type}`, null);
      })
      .addCase(getWorkoutByDate.rejected, (_, action) => {
        logger(`${action.type} ${action.payload}`, null);
      });
  },
});

export const getWorkoutByDate = createAsyncThunk(
  'workouts/getWorkoutByDate',
  async (date, {rejectWithValue}) => {
    try {
      const result = await queryWorkoutByDate(date);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export default mainSlice.reducer;
