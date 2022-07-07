import {configureStore} from '@reduxjs/toolkit';
import createExerciseReducer from '../features/exercise/createExerciseSlice';
import mainReducer from '../features/main/mainSlice';

export default configureStore({
  reducer: {
    createExercise: createExerciseReducer,
    main: mainReducer,
  },
});
