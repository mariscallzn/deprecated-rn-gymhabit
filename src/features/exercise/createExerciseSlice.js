import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {logger} from '../../inf/logger';
import {createExercise, getExercises} from './repositoryExercise';

export const createExerciseSlice = createSlice({
  name: 'createExercise',
  initialState: {
    exercises: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addExercise.fulfilled, (state, action) => {
        logger('addExercise.fulfilled', null);
        state.exercises.push(action.payload);
      })
      .addCase(addExercise.rejected, action => {
        logger('addExercise.rejected', action.error.message);
      })
      .addCase(addExercise.pending, state => {
        logger('addExercise.pending', null);
      });
  },
});

//Async work
export const addExercise = createAsyncThunk(
  'exercises/addExercise',
  //TODO: Pass the whole object
  async exerciseName => {
    const tmp = await getExercises();
    const result = await createExercise({
      name: exerciseName,
    });
    return result;
  },
);

//Selector that conects to hook useSelector()
export const selectExercises = state => state.createExercise.exercises;

// //Action objects
// export const {addExercise} = createExerciseSlice.actions;

//Reducer method
export default createExerciseSlice.reducer;
