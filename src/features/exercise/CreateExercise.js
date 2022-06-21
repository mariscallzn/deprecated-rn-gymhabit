import React, {useState} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectExercises, addExercise} from './createExerciseSlice';

//TODO Create a style class or object
const CreateExerciseScreen = () => {
  const exercises = useSelector(selectExercises);
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState('');

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
          dispatch(addExercise(exerciseName));
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
  </View>
);

export default CreateExerciseScreen;
