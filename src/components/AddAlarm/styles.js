import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
    backgroundColor: 'white',
  },
  datePickerWrapper: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
  },
  descriptionInput: {
    height: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',

    marginVertical: 8,

    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  buttonsContainer: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor: 'white',
  },
  buttons: {
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default styles;
