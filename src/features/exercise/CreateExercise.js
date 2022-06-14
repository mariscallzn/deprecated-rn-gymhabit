import React, {useState} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectExercises, addExercise} from './createExerciseSlice';

//TODO Create a style class or object
const CreateExercise = () => {
  const exercises = useSelector(selectExercises);
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState('');

  const renderItem = ({item}) => <Item exerciseName={item.exerciseName} />;

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
              //TODO: I need to think how to pass data more structured and see if this is working
              exerciseName: exerciseName,
            }),
          );
        }}
      />
      <FlatList
        data={exercises}
        keyExtractor={item => item.exerciseName}
        renderItem={renderItem}
      />
    </View>
  );
};

const Item = ({exerciseName}) => (
  <View>
    <Text>{exerciseName}</Text>
  </View>
);

export default CreateExercise;
