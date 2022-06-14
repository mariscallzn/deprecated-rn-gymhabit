import {createSlice} from '@reduxjs/toolkit';

export const createExerciseSlice = createSlice({
  name: 'createExercise',
  initialState: {
    exercises: [],
  },
  reducers: {
    addExercise: (state, action) => {
      console.log(action.payload);
      state.exercises.push(action.payload);
    },
  },
});

//Selector that conects to hook useSelector()
export const selectExercises = state => state.createExercise.exercises;

//Action objects
export const {addExercise} = createExerciseSlice.actions;

//Reducer method
export default createExerciseSlice.reducer;
