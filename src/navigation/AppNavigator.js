import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from '../screens/CharactersListScreen';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharactersList">
        <Stack.Screen name="Fans" component={CharactersListScreen} />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
