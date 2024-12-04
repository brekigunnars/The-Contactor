import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'; // Import react-native-uuid

const CONTACTS_DIR = `${FileSystem.documentDirectory}contacts/`;

const CreateContact = ({ navigation }) => {
  const [image, setImage] = useState(null); // State for the photo
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Ensure the contacts directory exists
  const ensureDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(CONTACTS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CONTACTS_DIR, { intermediates: true });
    }
  };

  // Save the contact to the file system
  const saveContact = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Name and Phone Number are required.');
      return;
    }

    try {
      await ensureDirectoryExists();

      // Generate a UUID and format the file name
      const uniqueId = uuid.v4();
      const fileName = `${sanitizeFileName(name)}-${uniqueId}.json`;
      const fileUri = `${CONTACTS_DIR}${fileName}`;

      const contact = {
        id: uniqueId,
        name,
        phoneNumber: phone,
        photo: image || null, // Optional photo
      };

      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(contact));
      Alert.alert('Success', 'Contact saved successfully!');
      navigation.goBack(); // Navigate back to the Home screen
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact.');
    }
  };

  // Function to pick an image from the gallery
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the photo state
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the photo state
    }
  };

  // Function to sanitize the file name
  const sanitizeFileName = (name) => {
    return name.replace(/[^a-zA-Z0-9-_]/g, '_'); // Replace invalid characters with '_'
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Contact</Text>
        <TouchableOpacity onPress={saveContact}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Section */}
      <View style={styles.photoContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.photo} />
        ) : (
          <TouchableOpacity onPress={pickImageFromGallery} style={styles.photoButton}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
        )}
        <View style={styles.photoOptions}>
          <TouchableOpacity onPress={takePhoto} style={styles.optionButton}>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery} style={styles.optionButton}>
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 18,
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photoButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoText: {
    color: '#999',
    fontSize: 16,
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
});

export default CreateContact;
