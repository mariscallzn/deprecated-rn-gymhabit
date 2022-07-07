// In App.js in a new project

import * as React from 'react';
import {Provider} from 'react-redux';
import store from './app/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainScreen from './features/main/MainScreen';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
