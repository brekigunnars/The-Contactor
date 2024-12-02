import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const SaveButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
