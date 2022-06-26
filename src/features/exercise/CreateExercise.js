import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  selectExercises,
  addExercise,
  selectCatalog,
  getCatalog,
  getExercises,
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
