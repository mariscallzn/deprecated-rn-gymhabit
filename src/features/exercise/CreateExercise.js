import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  selectExercises,
  addExercise,
  getMuscles,
  selectMuscles,
} from './createExerciseSlice';

//TODO Create a style class or object
const CreateExerciseScreen = () => {
  const exercises = useSelector(selectExercises);
  const muscles = useSelector(selectMuscles, shallowEqual);
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState('');

  useEffect(() => {
    if (muscles.length === 0) {
      dispatch(getMuscles());
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
              muscles: [muscles[0]],
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
    <Text>{`${exercise.muscles[0].name}`}</Text>
    <Text>______</Text>
  </View>
);

export default CreateExerciseScreen;
