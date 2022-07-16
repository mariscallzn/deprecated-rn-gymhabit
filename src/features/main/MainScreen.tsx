import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ListRenderItem,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarWeek from './components/CalendarWeek';

const DAY_DATA = [
  {
    id: '1',
    week: [
      {day: 'Mo', number: 5},
      {day: 'Tu', number: 6},
      {day: 'We', number: 7},
      {day: 'Th', number: 8},
      {day: 'Fr', number: 9},
      {day: 'Sa', number: 10},
      {day: 'Su', number: 11},
    ],
  },
  {
    id: '2',
    week: [
      {day: 'Mo', number: 12},
      {day: 'Tu', number: 13},
      {day: 'We', number: 14},
      {day: 'Th', number: 15},
      {day: 'Fr', number: 16},
      {day: 'Sa', number: 17},
      {day: 'Su', number: 18},
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
  //TODO Default -. first day of the week
  const [selectedDay, setSelectedDay] = useState<number>(5);

  //TODO Create type
  const renderCalendarItem: ListRenderItem<{
    id: string;
    week: Array<{day: string; number: number}>;
  }> = ({item}) => {
    return (
      <CalendarWeek
        week={item.week}
        daySelected={selectedDay}
        onDayPress={(dayNumber: number) => {
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
        renderItem={renderCalendarItem}
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
});

export default MainScreen;
