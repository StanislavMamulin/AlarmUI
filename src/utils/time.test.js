import {
  isNight,
  NIGHT_UPPER_THRESHOLD_HOUR,
  NIGHT_LOWER_THRESHOLD_HOUR,
} from './time';

test('correct definition of night time (22-06)', () => {
  const dayHours = new Date().setHours(18);
  const eveningHours = new Date().setHours(21, 59);
  const beginOfTheNight = new Date().setHours(NIGHT_UPPER_THRESHOLD_HOUR, 0);
  const endOfTheNight = new Date().setHours(NIGHT_LOWER_THRESHOLD_HOUR, 59);
  const beginOfTheMorning = new Date().setHours(6, 0);

  expect(isNight(dayHours)).toBeFalsy();
  expect(isNight(eveningHours)).toBeFalsy();
  expect(isNight(beginOfTheNight)).toBeTruthy();
  expect(isNight(endOfTheNight)).toBeTruthy();
  expect(isNight(beginOfTheMorning)).toBeFalsy();
});
