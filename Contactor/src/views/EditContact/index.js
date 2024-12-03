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

const CONTACTS_DIR = `${FileSystem.documentDirectory}contacts/`;

const EditContact = ({ route, navigation }) => {
  const { contact } = route.params; // Receive the contact data
  const [image, setImage] = useState(contact.photo);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phoneNumber);

  const updateContact = async () => {
    if (!name || !phone || !image) {
      Alert.alert('Error', 'Please fill out all fields and add a photo.');
      return;
    }
  
    try {
      // The original file name based on the original contact data
      const originalFileName = `${contact.name}-${contact.id}.json`;
      const originalFileUri = `${CONTACTS_DIR}${originalFileName}`;
  
      // Delete the old file
      const fileInfo = await FileSystem.getInfoAsync(originalFileUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(originalFileUri);
      }
  
      // Create a new file name with updated information
      const newFileName = `${name}-${contact.id}.json`; // Keep the same ID
      const newFileUri = `${CONTACTS_DIR}${newFileName}`;
  
      const updatedContact = {
        id: contact.id, // Keep the same ID
        name,
        phoneNumber: phone,
        photo: image,
      };
  
      await FileSystem.writeAsStringAsync(newFileUri, JSON.stringify(updatedContact));
      Alert.alert('Success', 'Contact updated successfully!');
      navigation.goBack(); // Navigate back to the Contact Details screen
    } catch (error) {
      console.error('Error updating contact:', error);
      Alert.alert('Error', 'Failed to update contact.');
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Contact</Text>
        <TouchableOpacity onPress={updateContact}>
          <Text style={styles.doneButton}>Save</Text>
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
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
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
    marginBottom: 30,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
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

export default EditContact;
