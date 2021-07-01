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

export {
  timestampWithoutMS,
  getCurrentTimestampWithoutMS,
  stringDateToObjectDate,
  startOfTheDay,
};
