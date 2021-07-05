import React, { useState } from 'react';
import { Pressable, View, Text, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { addAlarm } from '../../redux/alarmsSlice';

import AddAlarm from '../AddAlarm/AddAlarm';

import { styles, buttonStyle } from './styles';

const Header = ({ date = new Date() }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentDate = new Date(parseInt(date, 10));
  const now = new Date();
  const currentTime = new Date(currentDate.setHours(now.getHours(), now.getMinutes()));
  const dispatch = useDispatch();

  const day = moment(currentDate).format('LL');

  const addAlarmHandler = () => {
    setModalVisible(true);
  };

  const onPressCancel = () => {
    setModalVisible(false);
  };

  const onPressAdd = (alarm) => {
    setModalVisible(false);
    dispatch(addAlarm(alarm));
  };

  return (
    <View style={[styles.container, styles.centeredView]}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); }}
      >
        <AddAlarm date={currentTime} onPressCancel={onPressCancel} onPressAdd={onPressAdd} />
      </Modal>

      <Text style={styles.dateText}>{day}</Text>
      <Pressable
        style={({ pressed }) => buttonStyle({ pressed }).addAlarmButton}
        onPress={addAlarmHandler}
      >
        <Text style={styles.addAlarmText}>+ ADD ALARM</Text>
      </Pressable>
    </View>
  );
};

export default Header;
