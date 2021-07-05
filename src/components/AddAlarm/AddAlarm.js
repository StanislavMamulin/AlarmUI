import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import styles from './styles';

const getAlarm = (alarmInfo = {}) => {
  const defaultAlarm = {
    id: nanoid(),
    date: new Date().getTime(),
    isActive: true,
    description: '',
  };

  const unionAlarm = { ...defaultAlarm, ...alarmInfo };
  unionAlarm.date = (typeof unionAlarm.date === 'object') ? unionAlarm.date.getTime() : unionAlarm.date;

  return unionAlarm;
};

const AddAlarm = ({ date, onPressCancel, onPressAdd, id = nanoid() }) => {
  const [alarmDate, setAlarmDate] = useState(date);
  const [alarmDescription, setAlarmDescription] = useState('');

  const cancelHandler = () => {
    setAlarmDescription('');
    onPressCancel();
  };

  const addHandler = () => {
    setAlarmDescription('');
    const newAlarm = getAlarm({ date: alarmDate, description: alarmDescription, id });
    onPressAdd(newAlarm);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="postion"
    >
      <View style={styles.datePickerWrapper}>
        <DatePicker
          date={alarmDate}
          mode="time"
          style={styles.datePicker}
          onDateChange={setAlarmDate}
        />
      </View>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Alarm description"
        maxLength={100}
        multiline
        value={alarmDescription}
        onChangeText={setAlarmDescription}
      />

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.buttons, styles.cancelButton]}
          onPress={cancelHandler}
        >
          <Text style={styles.buttonsText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.buttons, styles.addButton]}
          onPress={addHandler}
        >
          <Text style={styles.buttonsText}>OK</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddAlarm;
