import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
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

const ACTIVITY = [
  {
    id: 'k1',
    text: 'Mock',
  },
  {
    id: 'l2',
    text: 'Mock',
  },
];

const MainScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const renderItem = ({item}) => {
    return (
      <CalendarWeek
        weekDays={item.week}
        selectedItem={selectedDay}
        onDayPress={dayNumber => {
          setSelectedDay(dayNumber);
        }}
      />
    );
  };

  const renderItemActivity = ({item}) => {
    return <TaskCard />;
  };

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
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
      />
      <FlatList
        style={styles.flatList_calendar}
        data={ACTIVITY}
        renderItem={renderItemActivity}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const CalendarWeek = ({weekDays, onDayPress, selectedItem}) => (
  <View style={styles.calendarWeek}>
    {weekDays.map(element => {
      return (
        <CalendarDay
          weekDay={element}
          onDayPress={onDayPress}
          selectedItem={selectedItem}
        />
      );
    })}
  </View>
);

const CalendarDay = ({weekDay, onDayPress, selectedItem}) => {
  const isSelected = selectedItem === weekDay.number;
  const selectedState = {
    item: {
      backgroundColor: isSelected ? '#021125' : 'white',
      borderRadius: isSelected ? 56 : 0,
    },
    text: {
      color: isSelected ? 'white' : '#2B374D',
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onDayPress(weekDay.number);
      }}
      style={[styles.calendarDay, selectedState.item]}>
      <Text style={[styles.calendarDay_content_day, selectedState.text]}>
        {weekDay.day}
      </Text>
      <Text style={[styles.calendarDay_content_number, selectedState.text]}>
        {weekDay.number}
      </Text>
      <View style={styles.calendarDay_content_circle_incompleted} />
    </TouchableOpacity>
  );
};

const TaskCard = () => {
  return (
    <View>
      <Text>Barbell Chest Press</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  calendarDay: {
    paddingStart: 8,
    paddingEnd: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  calendarDay_content_day: {
    marginTop: 8,
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '400',
  },
  calendarDay_content_number: {
    marginTop: 4,
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarDay_content_circle_incompleted: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
  },
});

export default MainScreen;
