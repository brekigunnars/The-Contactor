import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import ContactItem from '../../components/ContactItem';

const CONTACTS_DIR = `${FileSystem.documentDirectory}contacts/`;

const Home = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch contacts from the file system
  const fetchContacts = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(CONTACTS_DIR);
      if (!dirInfo.exists) {
        setContacts([]);
        return;
      }

      const files = await FileSystem.readDirectoryAsync(CONTACTS_DIR);
      const contactData = await Promise.all(
        files.map(async (fileName) => {
          const fileUri = `${CONTACTS_DIR}${fileName}`;
          const content = await FileSystem.readAsStringAsync(fileUri);
          return JSON.parse(content);
        })
      );

      const sortedContacts = contactData.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );

      setContacts(sortedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      Alert.alert('Error', 'Failed to load contacts.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchContacts); // Fetch contacts on screen focus
    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateContact')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id} // Use unique ID for the key
        renderItem={({ item }) => <ContactItem contact={item} />} // Pass the contact data to ContactItem
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Contacts Yet</Text>
          </View>
        )}
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
