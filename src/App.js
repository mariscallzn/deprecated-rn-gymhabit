// In App.js in a new project

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './app/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateExerciseScreen from './features/exercise/CreateExercise';
import {dbSetup} from './database/gymhabitDB';
import {logger} from './inf/logger';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    runDbSetup();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CreateExercise"
            component={CreateExerciseScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const runDbSetup = async () => {
  try {
    await dbSetup();
  } catch (error) {
    logger(`DB: Initial setup ${error}`, null);
  }
};

export default App;
