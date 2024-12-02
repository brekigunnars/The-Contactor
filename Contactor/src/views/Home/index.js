import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Home = ({ navigation }) => {
  // Placeholder for the empty contact list
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Contacts Yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateContact')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#999"
      />

      {/* Empty Contact List */}
      <FlatList
        data={[]} // Empty data for now
        keyExtractor={(item) => item.id}
        renderItem={() => null} // No rendering for empty list
        ListEmptyComponent={renderEmptyList} // Render when no data
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 10, // Adds padding between header and the search bar
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF', // Blue "+" button
  },
  searchBar: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default Home;
