import React, { useEffect, useState, useRef } from 'react';
import {
  SectionList,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateAlarm } from '../../redux/alarmsSlice';
import Header from '../Header/Header';
import AddAlarm from '../AddAlarm/AddAlarm';

import AlarmItem from '../AlarmItem/AlarmItem';
import { getStringedTime, isNight } from '../../utils/time';
import styles from './styles';

const Day = ({ alarmsOfTheDay, dayDate }) => {
  const dispatch = useDispatch();

  const [dayAlarms, setDayAlarms] = useState([]);
  const [nightAlarms, setNightAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const timeToChange = useRef(new Date());
  const idToChange = useRef();

  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    const newNightAlarms = [];
    const newDayAlarms = [];
    alarmsOfTheDay.forEach((alarm) => {
      if (isNight(alarm.date)) {
        newNightAlarms.push(alarm);
      } else {
        newDayAlarms.push(alarm);
      }
    });

    setDayAlarms(() => newDayAlarms);
    setNightAlarms(() => newNightAlarms);
  }, [alarmsOfTheDay]);

  const DATA = [
    {
      title: 'Night',
      data: nightAlarms,
    },
    {
      title: 'Day',
      data: dayAlarms,
    },
  ];

  const activeChangedHandler = (id, date, value) => {
    dispatch(updateAlarm({ id, date, changes: { isActive: value } }));
  };
  const descriptionChangedHandler = (id, date, descriptionText) => {
    dispatch(updateAlarm({ id, date, changes: { description: descriptionText } }));
  };

  const timeChangePress = (id, date) => {
    timeToChange.current = new Date(date);
    idToChange.current = id;
    setModalVisible(true);
  };

  const onPressCancel = () => {
    setModalVisible(false);
  };

  const onPressAdd = (alarm) => {
    setModalVisible(false);
    const { id, date } = alarm;
    dispatch(updateAlarm({ id, date, changes: { date } }));
  };

  const renderAlarm = (alarm) => {
    const { id, date, description, isActive } = alarm.item;
    const timeString = getStringedTime(date);

    return (
      <AlarmItem
        id={id}
        date={date}
        description={description}
        isActive={isActive}
        time={timeString}
        handlers={{ activeChangedHandler, descriptionChangedHandler, timeChangePress }}
      />
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionWrapper}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  );

  const noAlarmsHere = () => (
    <View style={styles.centeredView}>
      <Text style={styles.emptyPageText}>There are no alarms for this day yet</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { width: windowWidth }]}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={100}
    >
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); }}
      >
        <AddAlarm
          date={timeToChange.current}
          onPressCancel={onPressCancel}
          onPressAdd={onPressAdd}
          id={idToChange.current}
        />
      </Modal>
      <Header date={dayDate} />
      {alarmsOfTheDay.length === 0 ? noAlarmsHere() : (
        <SectionList
          sections={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderAlarm}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Day;
