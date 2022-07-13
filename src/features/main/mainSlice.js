import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {queryWorkoutByDate} from '../workout/repositoryWorkout';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWorkoutByDate.pending, (_, action) => {})
      .addCase(getWorkoutByDate.fulfilled, (state, action) => {})
      .addCase(getWorkoutByDate.rejected, (_, action) => {});
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
