import { StyleSheet } from "react-native";

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

export default styles;