import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import {
  createAlarm,
  getAlarmsForDay,
  getAlarmsForPeriod,
  changeAlarm,
  removeDay,
  startOfTheDayForAlarm,
} from './dataManager';

const getAlarm = (testData = {}) => {
  const defaultTestAlarm = {
    id: nanoid(),
    date: new Date().getTime(),
    isActive: true,
    description: 'Rise and shine, Mr. Freeman',
  };

  const unionAlarm = { ...defaultTestAlarm, ...testData };
  unionAlarm.date = (typeof unionAlarm.date === 'object') ? unionAlarm.date.getTime() : unionAlarm.date;

  return unionAlarm;
};

describe('AsyncStorage test', () => {
  test('correct storage of alarm in AsyncStorage', async () => {
    const newAlarm = getAlarm();

    await createAlarm(newAlarm);

    const key = startOfTheDayForAlarm(newAlarm);
    const alarm = await AsyncStorage.getItem(key);

    expect(alarm).not.toBeNull();
    expect(alarm).toEqual([newAlarm]);

    await AsyncStorage.removeItem(key);
  });

  test('multiple alarms in one day should create an array with one key', async () => {
    const newAlarm1 = getAlarm();
    const newAlarm2 = getAlarm({
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    });
    await createAlarm(newAlarm1);
    await createAlarm(newAlarm2);

    const key = startOfTheDayForAlarm(newAlarm1);
    const alarms = await AsyncStorage.getItem(key);

    expect(alarms).not.toBeNull();
    expect(alarms.length).toEqual(2);
    expect(alarms).toEqual([newAlarm1, newAlarm2]);
    await AsyncStorage.removeItem(key);
  });

  test('multiple alarms in diffirent days should create an array with diffirent keys', async () => {
    const newAlarm1 = getAlarm();

    const newAlarm2 = getAlarm({
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    });

    const newAlarm3 = getAlarm({
      date: new Date(2021, 1, 1, 11, 10),
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    });

    const newAlarm4 = getAlarm({
      date: new Date(2021, 1, 1, 11, 11),
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    });

    const newAlarm5 = getAlarm({
      date: new Date(2021, 1, 2, 11, 11),
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    });

    await createAlarm(newAlarm1);
    await createAlarm(newAlarm2);
    await createAlarm(newAlarm3);
    await createAlarm(newAlarm4);
    await createAlarm(newAlarm5);

    const keys = await AsyncStorage.getAllKeys();
    expect(keys.length).toEqual(3);

    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm1));
    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm3));
    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm5));
  });

  test('should return alarms for the day', async () => {
    const testDate = new Date();
    const newAlarm = getAlarm();

    await createAlarm(newAlarm);

    const alarms = await getAlarmsForDay(testDate);
    expect(alarms).toEqual([newAlarm]);

    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm));
  });

  test('should return alarms for period', async () => {
    const testDate = new Date(2021, 2, 2, 11, 11);
    const newAlarm = getAlarm({
      date: testDate,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    });

    const testDate2 = new Date(2021, 2, 5, 11, 10);
    const newAlarm2 = getAlarm({
      date: testDate2,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    });

    const testDate3 = new Date(2021, 3, 3, 11, 10);
    const newAlarm3 = getAlarm({
      date: testDate3,
      isActive: true,
      description: 'Rise and shine, Mr. Freeman',
    });

    const testDate4 = new Date(2021, 4, 4, 11, 11);
    const newAlarm4 = getAlarm({
      date: testDate4,
      isActive: false,
      description: 'Rise and shine, Mr. Freeman!!!!',
    });

    await createAlarm(newAlarm);
    await createAlarm(newAlarm2);
    await createAlarm(newAlarm3);
    await createAlarm(newAlarm4);

    const alarms = await getAlarmsForPeriod(testDate, testDate3);
    expect(alarms.length).toEqual(3);
    expect(alarms).toEqual([[newAlarm], [newAlarm2], [newAlarm3]]);

    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm));
    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm2));
    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm3));
    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm4));
  });

  test('should change alarm data', async () => {
    const newAlarm = getAlarm({
      date: new Date(2021, 2, 2, 11, 11),
    });

    const newAlarm2 = getAlarm({
      date: new Date(2021, 2, 2, 11, 11),
    });

    await createAlarm(newAlarm);
    await createAlarm(newAlarm2);

    const startAlarms = await getAlarmsForDay(newAlarm2.date);
    expect(startAlarms.length).toEqual(2);

    const changedAlarm2 = { ...newAlarm2 };
    changedAlarm2.isActive = false;
    changedAlarm2.description = 'WAKE UP';

    expect(changedAlarm2).not.toEqual(newAlarm2);

    await changeAlarm(changedAlarm2);

    const endAlarms = await getAlarmsForDay(newAlarm2.date);
    expect(endAlarms.length).toEqual(2);
    expect(endAlarms).toEqual([newAlarm, changedAlarm2]);

    await AsyncStorage.removeItem(startOfTheDayForAlarm(newAlarm));
  });

  test('should remove a day from Storage', async () => {
    const newAlarm = getAlarm({
      date: new Date(2021, 2, 2, 11, 11),
    });

    const newAlarm2 = {
      date: new Date(2021, 3, 2, 11, 11),
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
  const newAlarm = getAlarm({ date: inputDate });
  const beginOfTheDay = (new Date(2021, 1, 1, 0, 0, 0, 0)).getTime();
  expect(startOfTheDayForAlarm(newAlarm)).toEqual(beginOfTheDay);
});
