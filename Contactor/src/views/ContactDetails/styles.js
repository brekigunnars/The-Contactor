import { StyleSheet } from "react-native";

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

export default styles;