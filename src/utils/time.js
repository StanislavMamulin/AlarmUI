const timestampWithoutMS = (timestamp) => Math.floor(timestamp / 1000);
const getCurrentTimestampWithoutMS = () => timestampWithoutMS(new Date().getTime());
const stringDateToObjectDate = (key, value) => {
  if (key === '') return value;
  if (key === 'date') {
    return new Date(value);
  }

  return value;
};

export {
  timestampWithoutMS,
  getCurrentTimestampWithoutMS,
  stringDateToObjectDate,
};
