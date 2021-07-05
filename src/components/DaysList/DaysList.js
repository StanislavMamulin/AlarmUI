import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Day from '../Day/Day';
import { addEmptyDays, addInitDays } from '../../redux/alarmsSlice';
import { startOfTheDay } from '../../utils/time';

const mapStateToData = (daysAlarm) => (
  Object.keys(daysAlarm)
    .sort()
    .map((dayTimestamp) => (
      { id: dayTimestamp, alarmsForDay: daysAlarm[dayTimestamp] }
    ))
);

const DaysList = () => {
  const { alarms } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState(mapStateToData(alarms));
  const flatListRef = useRef();

  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    if (!Object.keys(alarms).length) {
      dispatch(addInitDays());
    }
  }, []);

  useEffect(() => {
    const newData = mapStateToData(alarms);
    setData(() => newData);
  }, [alarms]);

  const renderDays = ({ item }) => {
    const { alarmsForDay, id } = item;
    return <Day alarmsOfTheDay={alarmsForDay} dayDate={id} />;
  };

  const onEndReached = () => {
    dispatch(addEmptyDays({ numberOfDays: 7, inTheEnd: true }));
  };

  const onScrollEnd = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;
    const pageNum = Math.round(contentOffset.x / layoutMeasurement.width);
    // on start reached
    if (pageNum === 1) {
      const addDaysNumber = 7;
      dispatch(addEmptyDays({ numberOfDays: addDaysNumber, inTheEnd: false }));

      const offsetAfterAddDays = contentOffset.x + (windowWidth * addDaysNumber);
      flatListRef.current.scrollToOffset({ offset: offsetAfterAddDays, animated: false });
    }
  };

  const todayIndex = () => {
    if (data.length !== 0) {
      const today = startOfTheDay(new Date());
      const indexOfToday = data.findIndex((day) => parseInt(day.id, 10) === today);
      return indexOfToday !== -1 ? indexOfToday : 0;
    }
    return 0;
  };

  const getItemLayout = (_, index) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        extraData={alarms}
        renderItem={renderDays}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onEndReached={onEndReached}
        onMomentumScrollEnd={onScrollEnd}
        initialScrollIndex={todayIndex()}
        getItemLayout={getItemLayout}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DaysList;
