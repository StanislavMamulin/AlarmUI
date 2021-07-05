import React from 'react';
import { View } from 'react-native';
import styles from './styles';

import DaysList from '../../components/DaysList/DaysList';

const HomeScreen = () => (
  <View style={styles.container}>
    <DaysList />
  </View>
);

export default HomeScreen;
