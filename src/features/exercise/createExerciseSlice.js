import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  createWorkout,
  queryWorkoutByDate,
  updateESet,
  updateTask,
} from '../workout/repositoryWorkout';
import {
  createExercise,
  queryCatalog,
  queryExercises,
} from './repositoryExercise';

export const createExerciseSlice = createSlice({
  name: 'createExercise',
  initialState: {
    exercises: [],
    catalog: {
      muscles: [],
      equipment: [],
    },
    isCatalogLoaded: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      //Get Catalog
      .addCase(getCatalog.pending, (state, action) => {})
      .addCase(getCatalog.fulfilled, (state, action) => {
        if (state.isCatalogLoaded === false) {
          state.isCatalogLoaded = true;
          state.catalog = {
            muscles: action.payload.muscles,
            equipment: action.payload.equipment,
          };
        }
      })
      .addCase(getCatalog.rejected, (_, action) => {})

      //Get Exercises
      .addCase(getExercises.pending, (_, action) => {})
      .addCase(getExercises.fulfilled, (state, action) => {
        state.exercises = action.payload;
      })
      .addCase(getExercises.rejected, (_, action) => {})

      //Add Exercise
      .addCase(addExercise.pending, (_, action) => {})
      .addCase(addExercise.fulfilled, (state, action) => {
        state.exercises.push(action.payload);
      })
      .addCase(addExercise.rejected, (_, action) => {})

      //TODO: Remove it from here
      .addCase(addWorkout.pending, (_, action) => {})
      .addCase(addWorkout.fulfilled, (state, action) => {})
      .addCase(addWorkout.rejected, (_, action) => {})

      //TODO: Remove it from here
      .addCase(updateTaskS.pending, (_, action) => {})
      .addCase(updateTaskS.fulfilled, (state, action) => {})
      .addCase(updateTaskS.rejected, (_, action) => {})

      //TODO: Remove it from here
      .addCase(updateESetS.pending, (_, action) => {})
      .addCase(updateESetS.fulfilled, (state, action) => {})
      .addCase(updateESetS.rejected, (_, action) => {});
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

export const addWorkout = createAsyncThunk(
  'workouts/addWorkout',
  async (workout, {rejectWithValue}) => {
    try {
      const result = await createWorkout(workout);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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

export const updateTaskS = createAsyncThunk(
  'workouts/updateTask',
  async (task, {rejectWithValue}) => {
    try {
      const result = await updateTask(task);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateESetS = createAsyncThunk(
  'workouts/updateESetS',
  async (eSet, {rejectWithValue}) => {
    try {
      const result = await updateESet(eSet);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getCatalog = createAsyncThunk(
  'catalog/getCatalog',
  async (_, {rejectWithValue}) => {
    try {
      const result = await queryCatalog();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getExercises = createAsyncThunk(
  'exercises/getExercises',
  async (_, {rejectWithValue}) => {
    try {
      const result = await queryExercises();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Selector that conects to hook useSelector()
export const selectExercises = state => state.createExercise.exercises;
export const selectCatalog = state => state.createExercise.catalog;

// //Action objects
// export const {addExercise} = createExerciseSlice.actions;

//Reducer method
export default createExerciseSlice.reducer;
