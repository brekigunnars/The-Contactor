import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import CreateContact from '../views/CreateContact';

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateContact"
        component={CreateContact}
        options={{ title: 'Add New Contact' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
