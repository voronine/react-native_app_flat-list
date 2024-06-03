import React from 'react';
import FavoritesProvider from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
};

export default App;
