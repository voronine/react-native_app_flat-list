import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [totals, setTotals] = useState({ male: 0, female: 0, other: 0 });

  const addToFavorites = (character) => {
    if (!favorites.some(fav => fav.url === character.url)) {
      setFavorites([...favorites, character]);
      updateTotals(character, 1);
    }
  };

  const removeFromFavorites = (character) => {
    setFavorites(favorites.filter(fav => fav.url !== character.url));
    updateTotals(character, -1);
  };

  const updateTotals = (character, increment) => {
    let gender = character.gender;
    if (gender !== 'male' && gender !== 'female') {
      gender = 'other';
    }
    setTotals(prevTotals => ({
      ...prevTotals,
      [gender]: prevTotals[gender] + increment
    }));
  };

  const resetFavorites = () => {
    setFavorites([]);
    setTotals({ male: 0, female: 0, other: 0 });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, totals, addToFavorites, removeFromFavorites, resetFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
