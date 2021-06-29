const timestampWithoutMS = (timestamp) => Math.floor(timestamp / 1000);
const getCurrentTimestampWithoutMS = () => timestampWithoutMS(new Date().getTime());

export { timestampWithoutMS, getCurrentTimestampWithoutMS };
