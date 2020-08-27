import React, {useState} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {Platform, TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import DayItem from './DayItem';
import useLocales from 'hooks/useLocales';
import useStyles from 'shared/hooks/use-styles';
import IconButton from 'shared/components/base/buttons/icon-button';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';

const daysMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = ({
  day,
  year,
  month,
  days,
  currentMonth,
  currentYear,
  yearsFrom = 70,
  yearsTo = 0,
  onSelectDay,
  onChangeYear,
  onChangeMonth,
  onSelectMonth,
  disablePast,
  today,
}) => {
  const {months, days: dayNames} = useLocales();
  const [blockWidth, setWidth] = useState(0);
  const [visibleYearEdit, setVisibleYearEdit] = useState(false);
  const [visibleMonthEdit, setVisibleMonthEdit] = useState(false);
  const currentDate = moment();
  const date = moment(`${year}-${month}-1`, 'YYYY-M-D');
  const dayOfWeek = date.format('ddd');
  const offsetDays = daysMap.findIndex(item => item === dayOfWeek);
  const [classes] = useStyles(styles);
  const monthName = months[month - 1];
  const onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setWidth(Math.floor(layout.width / 7));
  };
  const toggleYearEdit = () => setVisibleYearEdit(!visibleYearEdit);
  const toggleMonthEdit = () => setVisibleMonthEdit(!visibleMonthEdit);

  const onSelectYear = selectedYear => {
    if (onChangeYear) {
      onChangeYear(selectedYear);
    }
    toggleYearEdit();
  };

  return (
    <>
      <View style={classes.root}>
        <TouchableOpacity style={classes.yearWrapper} onPress={toggleYearEdit}>
          <View style={classes.offset} />
          <View style={classes.textWrapper}>
            <Text style={classes.yearText}>{year}</Text>
          </View>
          <IconButton
            name="pen"
            onPress={toggleYearEdit}
            iconStyles={classes.icon}
          />
        </TouchableOpacity>
        <View style={classes.monthWrapper}>
          <IconButton
            disabled={disablePast && month <= currentMonth}
            name="chevron-left"
            onPress={() => onChangeMonth(true)}
          />
          <TouchableOpacity
            style={classes.monthTouch}
            onPress={toggleMonthEdit}>
            <Text style={classes.monthText}>{monthName}</Text>
          </TouchableOpacity>
          <IconButton name="chevron-right" onPress={onChangeMonth} />
        </View>
        <View style={classes.dayWrapper}>
          {dayNames.map(dayName => (
            <View style={[classes.day, {width: blockWidth}]} key={dayName}>
              <Text variant="caption">{dayName.substring(0, 2)}</Text>
            </View>
          ))}
        </View>
        <View onLayout={onLayout} style={classes.daysWrapper}>
          {_.times(offsetDays, key => (
            <View style={[{width: blockWidth}]} key={`offset-day-${key}`} />
          ))}
          {_.times(days, key => {
            const currDay = key + 1;
            return (
              <DayItem
                onSelect={() => onSelectDay(currDay)}
                key={`${monthName}-${key}-${currDay}`}
                disabled={
                  disablePast && month <= currentMonth && currDay < today
                }
                day={currDay}
                size={blockWidth}
                selected={
                  month === currentMonth &&
                  year === currentYear &&
                  currDay === parseInt(day, 10)
                }
              />
            );
          })}
        </View>
      </View>
      {visibleYearEdit && (
        <YearPicker
          fromDate={currentYear + (disablePast ? 0 : -yearsFrom)}
          open={visibleYearEdit}
          onClose={toggleYearEdit}
          onSelect={onSelectYear}
          year={year}
          to={parseInt(currentDate.format('YYYY'), 10) + yearsTo}
        />
      )}
      {visibleMonthEdit && (
        <MonthPicker
          open={visibleMonthEdit}
          onClose={toggleMonthEdit}
          onSelect={selectedMonth => {
            onSelectMonth(selectedMonth);
            toggleMonthEdit();
          }}
          year={year}
          month={month}
        />
      )}
    </>
  );
};

const styles = ({palette}) => ({
  root: {
    backgroundColor: palette.white,
    marginBottom: 20,
  },
  day: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWrapper: {
    flexDirection: 'row',
  },
  offset: {
    width: Platform.select({ios: 50, android: 40}),
  },
  daysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  icon: {
    color: '#FFF',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  monthText: {
    flex: 1,
    color: palette.gray,
    textAlign: 'center',
  },
  yearText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: Platform.select({ios: 20, android: 18}),
  },
  yearWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  monthTouch: {
    flex: 1,
    flexDirection: 'row',
  },
  monthWrapper: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
  },
});

export default Calendar;
