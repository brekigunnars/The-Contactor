import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking } from 'react-native';

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
  backButton: {
    color: '#007AFF',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoPlaceholderText: {
    color: '#999',
    fontSize: 14,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  contactPhone: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactDetails;
