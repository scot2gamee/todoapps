import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoScreen from '../page/TodoList';
import TodoDetailScreen from '../page/TodoDetail';

const Stack = createStackNavigator();
function main() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Todo'}>
      <Stack.Screen name={'Todo'} component={TodoScreen} />
      <Stack.Screen name={'TodoDetail'} component={TodoDetailScreen} />
    </Stack.Navigator>
  );
}

function app() {
  return <NavigationContainer>{main()}</NavigationContainer>;
}

export default app;
