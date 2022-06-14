// In App.js in a new project

import * as React from 'react';
import {Provider} from 'react-redux';
import store from './app/store';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateExercise from './features/exercise/CreateExercise';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={CreateExercise} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
