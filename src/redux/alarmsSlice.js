/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
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
  },
});

export const { addAlarm, updateAlarm, resetAlarms } = alarmsSlice.actions;

export default alarmsSlice.reducer;
