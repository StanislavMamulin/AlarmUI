import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexBasis: 200,
  },
  alarmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeWrapper: {
    flex: 1,
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 70,
  },
  switch: {

  },
  descriptionWrapper: {
    paddingVertical: 8,
  },
  descriptionText: {
    fontSize: 16,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsText: {
    fontSize: 18,
    color: 'white',
  },
  editButtons: {
    padding: 16,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default styles;
