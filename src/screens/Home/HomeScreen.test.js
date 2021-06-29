import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

test('home screen renders correctly', () => {
  const { getByText } = render(<HomeScreen />);

  const addButton = getByText(/add alarm/i);
  expect(addButton).toBeTruthy();
});
