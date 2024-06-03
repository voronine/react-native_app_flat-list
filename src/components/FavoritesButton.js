import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesButton = ({ character }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.url === character.url);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (isFavorite) {
          removeFromFavorites(character);
        } else {
          addToFavorites(character);
        }
      }}
    >
      <Text style={styles.icon}>
        {isFavorite ? '\u2764' : '\u2661'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 30,
    color: 'red',
  },
});

export default FavoritesButton;
