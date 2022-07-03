import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  selectExercises,
  addExercise,
  selectCatalog,
  getCatalog,
  getExercises,
  addWorkout,
  getWorkoutByDate,
  updateTaskS,
  updateESetS,
} from './createExerciseSlice';

//TODO Create a style class or object
const CreateExerciseScreen = () => {
  const exercises = useSelector(selectExercises);
  const catalog = useSelector(selectCatalog, shallowEqual);
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState('');

  useEffect(() => {
    dispatch(getCatalog());
    if (exercises.length === 0) {
      dispatch(getExercises());
    }
  });

  const renderItem = ({item}) => <Item exercise={item} />;

  return (
    <View>
      <TextInput
        placeholder="Exercise name"
        onChangeText={newExerciseName => setExerciseName(newExerciseName)}
        defaultValue={exerciseName}
      />
      <Button
        title="Add"
        onPress={() => {
          dispatch(
            addExercise({
              name: exerciseName,
              muscles: [
                catalog.muscles[0],
                catalog.muscles[1],
                catalog.muscles[2],
                catalog.muscles[3],
              ],
              equipment: [
                catalog.equipment[0],
                catalog.equipment[1],
                catalog.equipment[2],
              ],
            }),
          );
          setExerciseName('');
        }}
      />
      <Button
        title="Add workout"
        onPress={() => {
          dispatch(
            addWorkout({
              date: new Date(),
              exercises: exercises,
            }),
          );
        }}
      />
      <Button
        title="Query Workout By Date"
        onPress={() => {
          dispatch(getWorkoutByDate(new Date()));
        }}
      />
      <Button
        title="Update Task"
        onPress={() => {
          dispatch(
            updateTaskS({
              id: '5a779d59-89bd-4a9d-97ea-8533616dc758',
              eSets: [
                {
                  weight: 40,
                  weight_unit: 'lb',
                  reps: 12,
                  rest: 30,
                },
              ],
            }),
          );
        }}
      />
      <Button
        title="Update Set"
        onPress={() => {
          dispatch(
            updateESetS({
              id: '66e43730-1fd2-4f31-9548-8eb54baf07a7',
              weight: 30,
              weightUnit: 'Km',
              reps: 15,
              rest: 30,
            }),
          );
        }}
      />
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const Item = ({exercise}) => (
  <View>
    <Text>{exercise.name}</Text>
    <Text>Muscles: {exercise.muscles.length}</Text>
    <Text>Equipment: {exercise.equipment.length}</Text>
    <Text>______</Text>
  </View>
);

export default CreateExerciseScreen;
