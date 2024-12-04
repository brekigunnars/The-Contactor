import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './contactstyles';

const ContactItem = ({ contact }) => (
  <View style={styles.contactItem}>
    {/* Display contact photo */}
    <Image
      source={{ uri: contact.photo }}
      style={styles.contactImage}
    />
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
    </View>
  </View>
);

export default ContactItem;