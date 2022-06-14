import {configureStore} from '@reduxjs/toolkit';
import createExerciseReducer from '../features/exercise/createExerciseSlice';

export default configureStore({
  reducer: {
    createExercise: createExerciseReducer,
  },
});
