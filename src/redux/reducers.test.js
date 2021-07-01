import { nanoid } from 'nanoid';
import store from './store';
import { addAlarm, updateAlarm, resetAlarms } from './alarmsSlice';
import { startOfTheDay } from '../utils/time';

const daysCount = (state) => Object.keys(state).length;

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

afterEach(() => { store.dispatch(resetAlarms()); });

test('shoud add alarm to store', () => {
  let state = store.getState().alarms;
  expect(daysCount(state)).toEqual(0);

  store.dispatch(addAlarm(getAlarm()));
  state = store.getState().alarms;
  expect(daysCount(state)).toEqual(1);

  store.dispatch(addAlarm(getAlarm()));
  state = store.getState().alarms;
  const day = startOfTheDay(new Date());
  expect(daysCount(state)).toEqual(1);
  expect(state[day].length).toEqual(2);

  const anotherDay = new Date(2020, 9, 10, 22, 11).getTime();
  const anotherDayAlarm = getAlarm({ date: anotherDay });
  store.dispatch(addAlarm(anotherDayAlarm));
  state = store.getState().alarms;
  expect(daysCount(state)).toEqual(2);
});

test('should update alarm property', () => {
  let state = store.getState().alarms;

  const testDate = new Date();
  const testAlarm = getAlarm({ date: testDate });

  store.dispatch(addAlarm(testAlarm));
  state = store.getState().alarms;
  const day = startOfTheDay(testDate);
  expect(state[day][0]).toEqual(testAlarm);

  let alarm = state[day][0];
  expect(alarm.isActive).toEqual(true);

  // change isActive flag
  store.dispatch(updateAlarm({
    id: alarm.id,
    date: alarm.date,
    changes: { isActive: false },
  }));

  state = store.getState().alarms;
  [alarm] = state[day];
  expect(alarm.isActive).toEqual(false);

  // change description
  const newDescription = 'WAKE UP!!!';
  store.dispatch(updateAlarm({
    id: alarm.id,
    date: alarm.date,
    changes: { description: newDescription },
  }));

  state = store.getState().alarms;
  [alarm] = state[day];
  expect(alarm.description).toEqual(newDescription);
});
