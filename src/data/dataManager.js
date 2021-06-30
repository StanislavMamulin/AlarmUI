import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringDateToObjectDate } from '../utils/time';

const storageKeyForAlarm = (alarm) => String(new Date(alarm.date).setHours(0, 0, 0, 0));
const storageKeyForADay = (date) => String(new Date(date).setHours(0, 0, 0, 0));

const createAlarm = async (alarm) => {
  const dayStorageKey = storageKeyForAlarm(alarm);

  let alarmJSON = JSON.stringify([alarm]);
  try {
    const existAlarmsJSON = await AsyncStorage.getItem(dayStorageKey);
    if (existAlarmsJSON) {
      const existAlarms = JSON.parse(existAlarmsJSON, stringDateToObjectDate);
      alarmJSON = JSON.stringify([...existAlarms, alarm]);
    }

    await AsyncStorage.setItem(dayStorageKey, alarmJSON);
  } catch (error) {
    console.error(error);
  }
};

const getAlarmsForAKey = async (storageKey) => {
  try {
    const alarmsJSON = await AsyncStorage.getItem(storageKey);
    if (alarmsJSON) {
      return JSON.parse(alarmsJSON, stringDateToObjectDate);
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAlarmsForDay = (date) => {
  const dayStorageKey = storageKeyForADay(date);
  return getAlarmsForAKey(dayStorageKey);
};

const getAlarmsForPeriod = async (beginDate, endDate) => {
  const beginKey = storageKeyForADay(beginDate);
  const endKey = storageKeyForADay(endDate);
  try {
    const daysInStorage = await AsyncStorage.getAllKeys();

    const daysToReceive = daysInStorage.filter((dayKey) => dayKey >= beginKey && dayKey <= endKey);
    const alarms = await Promise.all(daysToReceive.map((dayKey) => getAlarmsForAKey(dayKey)));

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

    const key = storageKeyForAlarm(changedAlarm);
    await AsyncStorage.mergeItem(key, JSON.stringify(alarms));
  } catch (error) {
    console.error(error);
  }
};

const removeDay = async (date) => {
  try {
    await AsyncStorage.removeItem(storageKeyForADay(date));
  } catch (error) {
    console.error(error);
  }
};

export {
  createAlarm,
  storageKeyForAlarm as keyForAlarm,
  getAlarmsForDay,
  getAlarmsForPeriod,
  changeAlarm,
  removeDay,
};
