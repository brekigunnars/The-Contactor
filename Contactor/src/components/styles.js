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
import * as ImagePicker from 'expo-image-picker';

const CreateContact = ({ navigation }) => {
  const [image, setImage] = useState(null); // State to hold the selected or captured image
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Request permissions for accessing the media library
  const requestGalleryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need permission to access your media library to choose a photo.'
      );
      return false;
    }
    return true;
  };

  // Function to pick an image from the gallery
  const pickImageFromGallery = async () => {
    console.log('Opening gallery...');
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Image, // Updated to MediaType.Image
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image selected:', result.assets[0].uri);
      setImage(result.assets[0].uri); // Update the image state immediately
    } else {
      console.log('Gallery selection canceled');
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take a picture.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Photo taken:', result.assets[0].uri);
      setImage(result.assets[0].uri); // Update the image state immediately
    } else {
      console.log('Camera capture canceled');
    }
  };

  // Save the contact and navigate back
  const saveContact = () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    Alert.alert('Success', 'Contact saved successfully!');
    navigation.goBack();
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
    backgroundColor: '#000', // Dark mode background
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
