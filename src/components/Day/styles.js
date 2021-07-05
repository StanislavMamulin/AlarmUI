import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionWrapper: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyPageText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
