import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import {
  createAlarm,
  getAlarmsForDay,
  getAlarmsForPeriod,
  changeAlarm,
  removeDay,
  storageKeyForAlarm,
} from './dataManager';

import { stringDateToObjectDate } from '../utils/time';

describe('AsyncStorage test', () => {
  test('correct storage of alarm in AsyncStorage', async () => {
    const testDate = new Date();
    const newAlarm = {
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    await createAlarm(newAlarm);

    const key = storageKeyForAlarm(newAlarm);
    const alarmJSON = await AsyncStorage.getItem(key);

    expect(alarmJSON).not.toBeNull();

    const alarm = JSON.parse(alarmJSON, stringDateToObjectDate);
    expect(alarm).toEqual([newAlarm]);

    await AsyncStorage.removeItem(key);
  });

  test('multiple alarms in one day should create an array with one key', async () => {
    const testDate = new Date();
    const newAlarm1 = {
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };
    const testDate2 = new Date();
    const newAlarm2 = {
      date: testDate2,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    };

    await createAlarm(newAlarm1);
    await createAlarm(newAlarm2);

    const key = storageKeyForAlarm(newAlarm1);
    const alarmsJSON = await AsyncStorage.getItem(key);

    expect(alarmsJSON).not.toBeNull();

    const alarms = JSON.parse(alarmsJSON, stringDateToObjectDate);

    expect(alarms.length).toEqual(2);
    expect(alarms).toEqual([newAlarm1, newAlarm2]);
    await AsyncStorage.removeItem(key);
  });

  test('multiple alarms in diffirent days should create an array with diffirent keys', async () => {
    const testDate = new Date();
    const newAlarm1 = {
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };
    const testDate2 = new Date();
    const newAlarm2 = {
      date: testDate2,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    };
    const testDate3 = new Date(2021, 1, 1, 11, 10);
    const newAlarm3 = {
      date: testDate3,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };
    const testDate4 = new Date(2021, 1, 1, 11, 11);
    const newAlarm4 = {
      date: testDate4,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    };
    const testDate5 = new Date(2021, 1, 2, 11, 11);
    const newAlarm5 = {
      date: testDate5,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    };

    await createAlarm(newAlarm1);
    await createAlarm(newAlarm2);
    await createAlarm(newAlarm3);
    await createAlarm(newAlarm4);
    await createAlarm(newAlarm5);

    const keys = await AsyncStorage.getAllKeys();
    expect(keys.length).toEqual(3);

    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm1));
    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm3));
    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm5));
  });

  test('should return alarms for the day', async () => {
    const testDate = new Date();

    const newAlarm = {
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    await createAlarm(newAlarm);

    const alarms = await getAlarmsForDay(testDate);
    expect(alarms).toEqual([newAlarm]);

    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm));
  });
  test('should return alarms for period', async () => {
    const testDate = new Date(2021, 2, 2, 11, 11);
    const id1 = nanoid();
    const newAlarm = {
      id: id1,
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    const testDate2 = new Date(2021, 2, 5, 11, 10);
    const id2 = nanoid();
    const newAlarm2 = {
      id: id2,
      date: testDate2,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    const testDate3 = new Date(2021, 3, 3, 11, 10);
    const id3 = nanoid();
    const newAlarm3 = {
      id: id3,
      date: testDate3,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    const testDate4 = new Date(2021, 4, 4, 11, 11);
    const id4 = nanoid();
    const newAlarm4 = {
      id: id4,
      date: testDate4,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    };

    await createAlarm(newAlarm);
    await createAlarm(newAlarm2);
    await createAlarm(newAlarm3);
    await createAlarm(newAlarm4);

    const alarms = await getAlarmsForPeriod(testDate, testDate3);
    expect(alarms.length).toEqual(3);
    expect(alarms).toEqual([[newAlarm], [newAlarm2], [newAlarm3]]);

    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm));
    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm2));
    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm3));
    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm4));
  });

  test('should change alarm data', async () => {
    const testDate = new Date(2021, 2, 2, 11, 11);
    const id1 = nanoid();
    const newAlarm = {
      id: id1,
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    const testDate2 = new Date(2021, 2, 2, 11, 11);
    const id2 = nanoid();
    const newAlarm2 = {
      id: id2,
      date: testDate2,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    await createAlarm(newAlarm);
    await createAlarm(newAlarm2);

    const startAlarms = await getAlarmsForDay(newAlarm2.date);
    expect(startAlarms.length).toEqual(2);

    const changedAlarm2 = { ...newAlarm2 };
    changedAlarm2.isActive = false;

    expect(changedAlarm2).not.toEqual(newAlarm2);

    await changeAlarm(changedAlarm2);

    const endAlarms = await getAlarmsForDay(newAlarm2.date);
    expect(endAlarms.length).toEqual(2);
    expect(endAlarms).toEqual([newAlarm, changedAlarm2]);

    await AsyncStorage.removeItem(storageKeyForAlarm(newAlarm));
  });

  test('should remove a day from Storage', async () => {
    const testDate = new Date(2021, 2, 2, 11, 11);
    const id1 = nanoid();
    const newAlarm = {
      id: id1,
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    const testDate2 = new Date(2021, 3, 2, 11, 11);
    const id2 = nanoid();
    const newAlarm2 = {
      id: id2,
      date: testDate2,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    };

    await createAlarm(newAlarm);
    await createAlarm(newAlarm2);

    const daysCount = (await AsyncStorage.getAllKeys()).length;
    expect(daysCount).toEqual(2);

    removeDay(newAlarm.date);
    const daysCountAfterRemove = (await AsyncStorage.getAllKeys()).length;
    expect(daysCountAfterRemove).toEqual(1);
  });
});

// key for a day
test('should set time to 00:00:00', () => {
  const inputDate = new Date(2021, 1, 1, 15, 30, 45, 60);
  const newAlarm = {
    date: inputDate,
    isActive: true,
    description: 'Rise and shine, Mr. Freeman',
  };
  const beginOfTheDay = String(new Date(2021, 1, 1, 0, 0, 0, 0).getTime());
  expect(storageKeyForAlarm(newAlarm)).toEqual(beginOfTheDay);
});
