import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

type WeekDay = {
  day: string;
  number: number;
};

type WeekDayProps = {
  weekDay: WeekDay;
  daySelected: number;
  onDayPress: (dayNumber: number) => void;
};

type CalendarWeekProp = {
  week: Array<WeekDay>;
  daySelected: number;
  onDayPress: (number: number) => void;
};

const CalendarDay = (props: WeekDayProps) => {
  const isSelected = props.daySelected === props.weekDay.number;
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
        props.onDayPress(props.weekDay.number);
      }}
      style={[styles.calendarDay, selectedState.item]}>
      <Text style={[styles.calendarDay_content_day, selectedState.text]}>
        {props.weekDay.day}
      </Text>
      <Text style={[styles.calendarDay_content_number, selectedState.text]}>
        {props.weekDay.number}
      </Text>
      <View style={styles.calendarDay_content_circle_incompleted} />
    </TouchableOpacity>
  );
};

const CalendarWeek = (props: CalendarWeekProp) => (
  <View style={styles.calendarWeek}>
    {props.week.map(element => {
      return (
        <CalendarDay
          key={element.number}
          weekDay={element}
          onDayPress={props.onDayPress}
          daySelected={props.daySelected}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
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

export default CalendarWeek;
