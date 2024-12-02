import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background like the screenshot
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF', // Blue "+" button
  },
  searchBar: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  contactItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  contactName: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;