import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchCharacterDetails } from '../services/api';
import FavoritesButton from '../components/FavoritesButton';
import { Loader } from '../components/Loader';

const CharacterDetailsScreen = ({ route }) => {
  const [character, setCharacter] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const getCharacter = async () => {
      const data = await fetchCharacterDetails(id);
      setCharacter(data);
    };
    getCharacter();
  }, [id]);

  if (!character) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{character.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{character.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Birth Year:</Text>
        <Text style={styles.value}>{character.birth_year}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Homeworld:</Text>
        <Text style={styles.value}>{character.homeworld}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Species:</Text>
        <Text style={styles.value}>{character.species}</Text>
      </View>
      <FavoritesButton character={character} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
  },
  value: {
    fontSize: 16,
  },
});

export default CharacterDetailsScreen;
