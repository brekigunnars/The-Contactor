import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const pickImageFromGallery = async () => {
    console.log('Button Pressed: Opening gallery...');
    const hasPermission = await requestGalleryPermissions();
    console.log('Gallery Permission:', hasPermission);
  
    if (!hasPermission) return;
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Image, // Ensure this is correct
        allowsEditing: true,
        quality: 1,
      });
  
      console.log('Gallery Result:', result); // Log the result
  
      if (!result.canceled) {
        console.log('Image Selected:', result.assets[0].uri);
        setImage(result.assets[0].uri);
      } else {
        console.log('Gallery selection canceled');
      }
    } catch (error) {
      console.error('Error opening gallery:', error); // Log any errors
      Alert.alert('Error', 'Something went wrong while opening the gallery.');
    }
  };
  
  

  const takePhoto = async () => {
    // Ensure camera permissions are granted
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take pictures.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity style={styles.imagePickerOption} onPress={takePhoto}>
        <Text style={styles.imagePickerText}>Take a Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePickerOption} onPress={pickImageFromGallery}>
        <Text style={styles.imagePickerText}>Pick from Gallery</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
    </View>
  );
;

export default ImagePickerComponent;
