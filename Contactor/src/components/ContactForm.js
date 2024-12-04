import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import InputField from './InputField';
import ImagePickerComponent from './ImagePickerComponent';
import SaveButton from './SaveButton';

const CONTACTS_DIR = `${FileSystem.documentDirectory}contacts/`;

const ContactForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(CONTACTS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CONTACTS_DIR, { intermediates: true });
    }
  };

  const saveContact = async () => {
    if (!name || !phone || !image) {
      Alert.alert('Error', 'Please fill in all fields and select a picture.');
      return;
    }

    const contact = {
      id: Date.now().toString(),
      name,
      phone,
      image,
    };

    try {
      await ensureDirExists();

      const filePath = `${CONTACTS_DIR}${contact.id}.json`;
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(contact));

      Alert.alert('Success', 'Contact saved successfully!');
      onSave();
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact.');
    }
  };

  return (
    <View>
      <InputField
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <InputField
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <ImagePickerComponent image={image} setImage={setImage} />
      <SaveButton onPress={saveContact} />
    </View>
  );
};

export default ContactForm;
