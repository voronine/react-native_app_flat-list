import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { fetchCharacters } from '../services/api';
import { FavoritesContext } from '../context/FavoritesContext';
import AddToFavoritesButton from '../components/FavoritesButton';
import Heart from '../assets/image/heart-black.png';
import Look_up from '../assets/image/look-up.png';

const CharactersListScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    name: 'asc',
    birth_year: 'asc',
    gender: 'asc',
    home: 'asc',
    species: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { totals, addFavorite, resetFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const loadCharacters = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    const data = await fetchCharacters(page);
    setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
    setPage(prevPage => prevPage + 1);
    setHasMore(data.next !== null);
    setLoading(false);
  }, [loading, hasMore, page]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filtered = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortBy = field => {
    const order = sortOrder[field] === 'asc' ? 'desc' : 'asc';
    const sortedCharacters = [...filtered].sort((a, b) => {
      const aValue = a[field] || '';
      const bValue = b[field] || '';
      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    setCharacters(sortedCharacters);
    setSortOrder({ ...sortOrder, [field]: order });
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetFavorites} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Clear fans</Text>
      </TouchableOpacity>

      <View style={styles.totalsContainer}>
        <View style={styles.totalPart}>
          <Text style={styles.totalPartCount}>{totals.male}</Text>
          <Text style={styles.totalPartText}>Female Fans</Text>
        </View>
        <View style={styles.totalPart}>
          <Text style={styles.totalPartCount}>{totals.female}</Text>
          <Text style={styles.totalPartText}>Male Fans</Text>
        </View>
        <View style={styles.totalPart}>
          <Text style={styles.totalPartCount}>{totals.other}</Text>
          <Text style={styles.totalPartText}>Others</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.search}>
          <Image source={Look_up} style={styles.look_up} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.headerFirst}>
            <Image source={Heart} style={styles.icon} />
          </Text>

          <TouchableOpacity
            onPress={() => sortBy('name')}
            style={styles.headerCell}>
            <Text style={styles.headerCellText}>
              Name {sortOrder.name === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortBy('birth_year')}
            style={styles.headerCell}>
            <Text style={styles.headerCellText}>
              Birth Year {sortOrder.birth_year === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortBy('gender')}
            style={styles.headerCell}>
            <Text style={styles.headerCellText}>
              Gender {sortOrder.gender === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortBy('home')}
            style={styles.headerCell}>
            <Text style={styles.headerCellText}>
              Home World {sortOrder.home === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortBy('species')}
            style={styles.headerCell}>
            <Text style={styles.headerCellText}>
              Species {sortOrder.species === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>
        </View>

        {filtered.length > 0 ? (
          <FlatList
            data={filtered}
            keyExtractor={item => item.url}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CharacterDetails', {
                    id: item.url.split('/').slice(-2, -1)[0],
                  })
                }
                style={styles.row}>
                <View style={styles.cellFirst}>
                  <AddToFavoritesButton
                    character={item}
                    addFavorite={addFavorite}
                  />
                </View>

                <View style={styles.item}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.cell}>{item.birth_year}</Text>
                <Text style={styles.cell}>{item.gender}</Text>
                <Text style={styles.cell}>{item.homeworld}</Text>
                <Text style={styles.cell}>{item.species}</Text>
              </TouchableOpacity>
            )}
            onEndReached={loadCharacters}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text style={styles.noResultsText}>No result found.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  resetButton: {
    marginVertical: 10,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: -60,
    right: 20,
    zIndex: 1,
  },
  resetButtonText: {
    textTransform: 'uppercase',
    color: 'red',
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    gap: 10,
    marginBottom: 10,
  },
  totalPart: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  totalPartCount: {
    fontSize: 22,
    fontWeight: '800',
  },
  totalPartText: {
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#fff',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  look_up: {
    width: 30,
    height: 30,
  },
  searchInput: {
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 15,
    height: 15,
  },
  headerFirst: {
    width: 30,
    paddingRight: 10,
    paddingTop: 15,
    paddingLeft: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    height: 50,
    letterSpacing: 0.5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  headerCellText: {
    flex: 1,
    fontWeight: '600',
    paddingRight: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  cellFirst: {
    width: 30,
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 5,
  },
  cell: {
    flex: 1,
    paddingRight: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
    paddingRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 120,
    fontSize: 16,
    color: 'gray',
  },
});

export default CharactersListScreen;
