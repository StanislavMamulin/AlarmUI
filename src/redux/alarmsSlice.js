/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { startOfTheDay } from '../utils/time';

const initAlarms = {};

export const alarmsSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: initAlarms,
  },
  reducers: {
    addAlarm: (state, action) => {
      const { payload: alarm } = action;
      const dayOfAlarm = startOfTheDay(alarm.date);

      if (!state.alarms[dayOfAlarm]) {
        state.alarms[dayOfAlarm] = [alarm];
      } else {
        state.alarms[dayOfAlarm].push(alarm);
      }
    },
    updateAlarm: (state, action) => {
      const { id, date, changes } = action.payload;
      const day = startOfTheDay(date);

      const alarmsForDay = state.alarms[day];
      const alarmsToChange = alarmsForDay.find((alarm) => alarm.id === id);
      if (alarmsToChange) {
        Object.assign(alarmsToChange, changes);
      }
    },
    resetAlarms: (state) => {
      state.alarms = initAlarms;
    },
    addEmptyDays: (state, action) => {
      const { numberOfDays, inTheEnd } = action.payload;

      const dateKeys = Object.keys(state.alarms).sort();
      if (inTheEnd) {
        const lastDate = dateKeys[dateKeys.length - 1];
        const m = moment(parseInt(lastDate, 10));

        for (let d = 0; d < numberOfDays; d += 1) {
          m.add(1, 'd');
          state.alarms[m.format('x')] = [];
        }
      } else {
        const firstDate = dateKeys[0];
        const m = moment(parseInt(firstDate, 10));

        for (let d = 0; d < numberOfDays; d += 1) {
          m.subtract(1, 'd');
          state.alarms[m.format('x')] = [];
        }
      }
    },
    addInitDays: (state) => {
      // add -7 days before and 7 day after today
      const halfDaysQuantity = 7;
      const now = new Date();
      const m = moment(now).startOf('day').subtract(halfDaysQuantity + 1, 'day');

      for (let d = 0; d <= halfDaysQuantity * 2; d += 1) {
        m.add(1, 'day');
        const dayTimestamp = m.format('x');
        if (state.alarms[dayTimestamp]) {
          continue;
        }
        state.alarms[dayTimestamp] = [];
      }
    },
  },
});

const { actions, reducer } = alarmsSlice;
export const {
  addAlarm,
  updateAlarm,
  resetAlarms,
  addEmptyDays,
  addInitDays,
} = actions;

export default reducer;
