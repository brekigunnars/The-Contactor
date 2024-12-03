import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ContactDetails = ({ route, navigation }) => {
  const { contact } = route.params; // Retrieve the passed contact data

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditContact', { contact })}
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
        <Text style={styles.title}>Contact Details</Text>
      </View>

      {/* Contact Photo */}
      <View style={styles.photoContainer}>
        {contact.photo ? (
          <Image source={{ uri: contact.photo }} style={styles.photo} />
        ) : (
          <View style={styles.placeholderPhoto} />
        )}
      </View>

      {/* Contact Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{contact.name}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{contact.phoneNumber}</Text>
      </View>
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#222',
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
});

export default ContactDetails;
