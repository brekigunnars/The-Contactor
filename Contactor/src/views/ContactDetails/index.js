import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import styles from './styles';

const ContactDetails = ({ route, navigation }) => {
  const { contact } = route.params;

  // Function to initiate a call
  const handleCall = async () => {
    if (!contact.phoneNumber) {
      Alert.alert('Error', 'This contact has no phone number.');
      return;
    }

    const url = `tel:${contact.phoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Your device does not support making calls.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contact Details</Text>
      </View>

      {/* Photo */}
      {contact.photo ? (
        <Image source={{ uri: contact.photo }} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoPlaceholderText}>No Photo</Text>
        </View>
      )}

      {/* Contact Info */}
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>

      {/* Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactDetails;