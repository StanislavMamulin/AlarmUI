const timestampWithoutMS = (timestamp) => Math.floor(timestamp / 1000);
const getCurrentTimestampWithoutMS = () => timestampWithoutMS(new Date().getTime());
const stringDateToObjectDate = (key, value) => {
  if (key === '') return value;
  if (key === 'date') {
    return new Date(value);
  }

  return value;
};

const startOfTheDay = (date) => new Date(date).setHours(0, 0, 0, 0);

const NIGHT_UPPER_THRESHOLD_HOUR = 22;
const NIGHT_LOWER_THRESHOLD_HOUR = 5;
const isNight = (date) => {
  const hour = new Date(date).getHours();

  return hour >= NIGHT_UPPER_THRESHOLD_HOUR || hour <= NIGHT_LOWER_THRESHOLD_HOUR;
};

const getStringedTime = (date) => {
  const timeString = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [time, meridiem] = timeString.split(' ');

  const postfix = meridiem ? ` ${meridiem}` : '';
  return time.slice(0, 5) + postfix;
};

export {
  timestampWithoutMS,
  getCurrentTimestampWithoutMS,
  stringDateToObjectDate,
  startOfTheDay,
  isNight,
  NIGHT_UPPER_THRESHOLD_HOUR,
  NIGHT_LOWER_THRESHOLD_HOUR,
  getStringedTime,
};
