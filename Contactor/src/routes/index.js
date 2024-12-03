import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import CreateContact from '../views/CreateContact';
import ContactDetails from '../views/ContactDetails'; // Import ContactDetails if added
import EditContact from '../views/EditContact'; // Import EditContact


const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} // Hide header for Home screen
      />
      <Stack.Screen
        name="CreateContact"
        component={CreateContact}
        options={{ title: 'Add New Contact' }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={({ route }) => ({
          title: route.params.contact.name || 'Contact Details',
        })} // Set dynamic title for ContactDetails
      />
      <Stack.Screen
        name="EditContact"
        component={EditContact}
        options={{ title: 'Edit Contact' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
