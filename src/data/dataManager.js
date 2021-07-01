import AsyncStorage from '@react-native-async-storage/async-storage';
import { startOfTheDay } from '../utils/time';

const startOfTheDayForAlarm = (alarm) => startOfTheDay(alarm.date);

const createAlarm = async (alarm) => {
  const day = startOfTheDayForAlarm(alarm);
  let alarmsToAdd = [alarm];

  try {
    const existAlarms = await AsyncStorage.getItem(day);
    if (existAlarms) {
      alarmsToAdd = [...existAlarms, alarm];
    }

    await AsyncStorage.setItem(day, alarmsToAdd);
  } catch (error) {
    console.error(error);
  }
};

const getAlarmsForDay = async (date) => {
  const day = startOfTheDay(date);

  try {
    const alarm = await AsyncStorage.getItem(day);
    return alarm;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAlarmsForPeriod = async (beginDate, endDate) => {
  const beginKey = startOfTheDay(beginDate);
  const endKey = startOfTheDay(endDate);
  try {
    const daysInStorage = await AsyncStorage.getAllKeys();

    const daysToReceive = daysInStorage
      .filter((dayKey) => dayKey >= beginKey && dayKey <= endKey);
    const alarms = await Promise.all(daysToReceive
      .map((dayKey) => getAlarmsForDay(parseInt(dayKey, 10))));

    return alarms;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const changeAlarm = async (changedAlarm) => {
  try {
    const alarms = await getAlarmsForDay(changedAlarm.date);

    const alarmForChange = alarms.find((alarm) => alarm.id === changedAlarm.id);
    Object.assign(alarmForChange, changedAlarm);
  } catch (error) {
    console.error(error);
  }
};

const removeDay = async (date) => {
  try {
    await AsyncStorage.removeItem(startOfTheDay(date));
  } catch (error) {
    console.error(error);
  }
};

export {
  createAlarm,
  getAlarmsForDay,
  getAlarmsForPeriod,
  changeAlarm,
  removeDay,
  startOfTheDayForAlarm,
};
