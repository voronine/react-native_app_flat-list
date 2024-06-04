import axios from 'axios';
import { API_URL } from '../utils/constants';

export const fetchCharacters = async page => {
  const response = await axios.get(`${API_URL}/people/?page=${page}`);
  const characters = await Promise.all(
    response.data.results.map(async character => {
      const homeworldResponse = await axios.get(character.homeworld);
      character.homeworld = homeworldResponse.data.name;

      if (character.species.length > 0) {
        const speciesResponse = await axios.get(character.species[0]);
        character.species = speciesResponse.data.name;
      } else {
        character.species = 'Unknown';
      }

      return character;
    }),
  );
  return { results: characters, next: response.data.next };
};

export const fetchCharacterDetails = async id => {
  const response = await axios.get(`${API_URL}/people/${id}/`);

  const character = response.data;

  const homeworldResponse = await axios.get(character.homeworld);
  character.homeworld = homeworldResponse.data.name;

  if (character.species.length > 0) {
    const speciesResponse = await axios.get(character.species[0]);
    character.species = speciesResponse.data.name;
  } else {
    character.species = 'Unknown';
  }

  return character;
};
