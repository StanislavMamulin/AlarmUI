import React from 'react';
import { View } from 'react-native';
import styles from './styles';

import Header from '../../components/Header/Header';
import DaysList from '../../components/DaysList/DaysList'

const HomeScreen = () => (
  <View>
    <Header />
    <DaysList />
  </View>
);

export default HomeScreen;
