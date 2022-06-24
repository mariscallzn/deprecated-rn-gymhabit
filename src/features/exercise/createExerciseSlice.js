import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {logger} from '../../inf/logger';
import {createExercise, queryMuscles} from './repositoryExercise';

export const createExerciseSlice = createSlice({
  name: 'createExercise',
  initialState: {
    exercises: [],
    muscles: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      //Get Muscles
      .addCase(getMuscles.pending, (_, action) => {
        logger(`${action.type}`, null);
      })
      .addCase(getMuscles.fulfilled, (state, action) => {
        logger(`${action.type}`, null);
        state.muscles = action.payload;
      })
      .addCase(getMuscles.rejected, (_, action) => {
        logger(`${action.type} ${action.payload}`, null);
      })

      //Add Exercise
      .addCase(addExercise.pending, (_, action) => {
        logger(`${action.type}`, null);
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        logger(`${action.type}`, null);
        state.exercises.push(action.payload);
      })
      .addCase(addExercise.rejected, (_, action) => {
        logger(`${action.type} ${action.payload}`, null);
      });
  },
});

//Async work
export const addExercise = createAsyncThunk(
  'exercises/addExercise',
  async (exercise, {rejectWithValue}) => {
    try {
      const result = await createExercise(exercise);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMuscles = createAsyncThunk(
  'muscles/getMuscles',
  async (_, {rejectWithValue}) => {
    try {
      const result = await queryMuscles();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Selector that conects to hook useSelector()
export const selectExercises = state => state.createExercise.exercises;
export const selectMuscles = state => state.createExercise.muscles;

// //Action objects
// export const {addExercise} = createExerciseSlice.actions;

//Reducer method
export default createExerciseSlice.reducer;
