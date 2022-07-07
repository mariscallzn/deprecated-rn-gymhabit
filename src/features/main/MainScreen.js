import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DAY_DATA = [
  {
    id: '1',
    week: [
      {day: 'Mo', number: '5'},
      {day: 'Tu', number: '6'},
      {day: 'We', number: '7'},
      {day: 'Th', number: '8'},
      {day: 'Fr', number: '9'},
      {day: 'Sa', number: '10'},
      {day: 'Su', number: '11'},
    ],
  },
  {
    id: '2',
    week: [
      {day: 'Mo', number: '12'},
      {day: 'Tu', number: '13'},
      {day: 'We', number: '14'},
      {day: 'Th', number: '15'},
      {day: 'Fr', number: '16'},
      {day: 'Sa', number: '17'},
      {day: 'Su', number: '18'},
    ],
  },
];

const MainScreen = () => {
  const dispatch = useDispatch();

  const renderItem = ({item}) => <CalendarWeek weekDays={item.week} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.selectedDay}>Today</Text>
      <FlatList
        style={styles.flatList_calendar}
        data={DAY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width}
      />
    </SafeAreaView>
  );
};

const CalendarWeek = ({weekDays}) => (
  <View style={styles.calendarWeek}>
    {weekDays.map(element => {
      return <CalendarDay weekDay={element} />;
    })}
  </View>
);

const CalendarDay = ({weekDay}) => (
  <TouchableOpacity onPress={() => {}} style={styles.calendarDay}>
    <Text style={styles.calendarDay_content_day}>{weekDay.day}</Text>
    <Text style={styles.calendarDay_content_number}>{weekDay.number}</Text>
    <View
      style={{
        borderColor: 'gray',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  selectedDay: {
    fontSize: 36,
    color: '#2B374D',
    fontWeight: '700',
    paddingTop: 16,
    paddingStart: 16,
  },
  flatList_calendar: {
    marginTop: 8,
    flexGrow: 0,
  },
  calendarWeek: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calendarDay: {
    paddingStart: 8,
    paddingEnd: 8,
    alignItems: 'center',
  },
  calendarDay_content_day: {
    marginTop: 8,
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '300',
  },
  calendarDay_content_number: {
    marginTop: 4,
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
