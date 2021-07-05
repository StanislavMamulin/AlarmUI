import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 200,
    flexGrow: 0,

    padding: 8,
    marginTop: -4,
    marginHorizontal: -4,
    marginBottom: 16,
    backgroundColor: 'white',

    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  dateText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addAlarmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

const buttonStyle = ({ pressed }) => StyleSheet.create({
  addAlarmButton: {
    width: 200,
    backgroundColor: pressed ? '#21AB82' : '#49DCB1',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 8,

    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: pressed ? 2 : 5 },
    elevation: 6,
  },
});

export { styles, buttonStyle };
