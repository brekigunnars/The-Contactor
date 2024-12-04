import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import ContactItem from '../../components/ContactItem';
import * as Contacts from 'expo-contacts';


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
  
      // Deduplicate contacts by ID
      const uniqueContacts = contactData.reduce((acc, contact) => {
        if (!acc.some((c) => c.id === contact.id)) {
          acc.push(contact);
        }
        return acc;
      }, []);
  
      const sortedContacts = uniqueContacts.sort((a, b) =>
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
    return unsubscribe;
  }, [navigation]);

  // Handle long press on a contact
  const handleLongPress = (contact) => {
    Alert.alert(
      'Contact Options',
      `What would you like to do with ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Edit Contact',
          onPress: () => navigation.navigate('EditContact', { contact }),
        },
        {
          text: 'Delete Contact',
          onPress: () => handleDeleteContact(contact),
          style: 'destructive',
        },
      ]
    );
  };
  const importContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your contacts to import them.');
      return;
    }
  
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
    });
  
    if (data.length > 0) {
      const importedContacts = data.map((contact) => ({
        id: contact.id, // Use the OS contact's id
        name: contact.name || 'Unnamed Contact',
        phoneNumber: contact.phoneNumbers?.[0]?.number || 'No Phone Number',
        photo: contact.image?.uri || null,
      }));
  
      // Deduplicate contacts by ensuring unique IDs
      const updatedContacts = [...contacts]; // Current contacts list
      for (const importedContact of importedContacts) {
        if (!updatedContacts.find((c) => c.id === importedContact.id || c.name === importedContact.name)) {
          updatedContacts.push(importedContact);
        // Add only if not already in the list
        }
      }
  
      // Save the deduplicated contacts
      saveImportedContacts(updatedContacts);
    } else {
      Alert.alert('No Contacts', 'No contacts found on your device.');
    }
  };
  
  
  const saveImportedContacts = async (contacts) => {
    try {
      await ensureContactsDirectoryExists(); // Ensure directory exists
  
      for (const contact of contacts) {
        const fileName = `${sanitizeFileName(contact.name)}-${contact.id}.json`;
        const fileUri = `${CONTACTS_DIR}${fileName}`;
  
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          // Save contact to the file system
          const sanitizedContact = {
            ...contact,
            photo: contact.photo || null, // Allow optional photo
          };
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(sanitizedContact));
          console.log('Contact saved:', fileUri);
        }
      }
  
      Alert.alert('Success', 'Contacts imported successfully!');
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error('Error importing contacts:', error);
      Alert.alert('Error', 'Failed to import contacts.');
    }
  };
  
  
  
  

  const ensureContactsDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(CONTACTS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CONTACTS_DIR, { intermediates: true });
    }
  };

  const sanitizeFileName = (name) => {
    return name.replace(/[^a-zA-Z0-9-_]/g, '_'); // Replace invalid characters with '_'
  };
  
  
  // Delete a contact
  const handleDeleteContact = async (contact) => {
    try {
      const fileName = `${sanitizeFileName(contact.name)}-${contact.id}.json`;
      const fileUri = `${CONTACTS_DIR}${fileName}`;
  
      console.log('Attempting to delete:', fileUri);
  
      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        // Delete the file if it exists
        await FileSystem.deleteAsync(fileUri);
        console.log('Contact deleted successfully:', fileUri);
      } else {
        console.warn('File does not exist. Skipping deletion:', fileUri);
      }
  
      // Refresh the contact list
      fetchContacts();
      Alert.alert('Success', 'Contact deleted successfully!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      Alert.alert('Error', 'Failed to delete contact.');
    }
  };
  
  
  
  

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
        <TouchableOpacity
          style={styles.importButton}
          onPress={importContacts}
        >
          <Text style={styles.importButtonText}>Import Contacts</Text>
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
        keyExtractor={(item) => `${item.id}-${item.name}`} // Ensure unique keys
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            onPress={() => navigation.navigate('ContactDetails', { contact: item })}
          >
            <ContactItem contact={item} />
          </TouchableOpacity>
        )}
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
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 10,
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
    color: '#007AFF',
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
  importButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 15,
  },
  importButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },  
});

export default Home;
