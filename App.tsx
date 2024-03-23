import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, LogBox} from 'react-native';
import store from './src/store'; // Import RootState
import Routes from './src/routes/routes';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

AppRegistry.registerComponent('todolistapp', () => App);

export default App;
