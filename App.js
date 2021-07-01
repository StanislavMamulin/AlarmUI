import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import HomeScreen from './src/screens/Home/HomeScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
