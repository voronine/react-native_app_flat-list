import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import Full from '../assets/image/heart-empty.png';
import Empty from '../assets/image/heart2.png';

const FavoritesButton = ({ character }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
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
      }}>
      <Image source={isFavorite ? Empty : Full} style={styles.icon} />
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
    width: 20,
    height: 20,
  },
});

export default FavoritesButton;
