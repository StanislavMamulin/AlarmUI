import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './alarmsSlice';

export default configureStore({
  reducer: alarmReducer,
});
