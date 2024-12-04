import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const InputField = ({ placeholder, value, onChangeText, keyboardType = 'default' }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default InputField;