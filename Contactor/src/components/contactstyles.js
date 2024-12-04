import { StyleSheet } from "react-native";

 
const styles = StyleSheet.create({
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#222',
    },
    contactImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#444', // Placeholder background
      marginRight: 15,
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    contactPhone: {
      fontSize: 14,
      color: '#aaa',
    },
  });

export default styles;