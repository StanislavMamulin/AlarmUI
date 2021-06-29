import React from 'react';
import { Pressable, View, Text } from 'react-native';
// import moment from 'moment';
import moment from 'moment/min/moment-with-locales';
import { styles, buttonStyle } from './styles';

const Header = ({ date = new Date() }) => {
  const date2 = moment(date).format('LL');

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date2}</Text>
      <Pressable style={
          ({ pressed }) => buttonStyle({ pressed }).addAlarmButton
        }
      >
        <Text style={styles.addAlarmText}>+ ADD ALARM</Text>
      </Pressable>
    </View>
  );
};

export default Header;
