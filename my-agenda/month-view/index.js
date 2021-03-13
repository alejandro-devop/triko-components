import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import DayItem from './DayItem';
import Text from 'components/base/text';
import _ from 'lodash';
import useLocales from 'shared/hooks/use-locales';

const MonthView = ({
  currentMonth,
  daysInMonth,
  daysMap = [],
  currentDay,
  events = [],
  getEvents,
}) => {
  const [classes] = useStyles(styles);
  const [blockWidth, setBlockWidth] = useState(0);
  const {months = []} = useLocales();
  const {days = []} = useLocales();
  const onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setBlockWidth(Math.floor(layout.width / 7));
  };
  const dayOfWeek = currentMonth.format('ddd');
  const offsetDays = daysMap.findIndex((item) => item === dayOfWeek);
  const monthNumber = parseInt(currentMonth.format('M'), 10);
  const month = months[monthNumber - 1];
  return (
    <View style={classes.root} onLayout={onLayout}>
      <View style={classes.monthNameWrapper}>
        <Text style={classes.monthNameText}>{month}</Text>
      </View>
      {blockWidth > 0 && (
        <View style={classes.daysWrapper}>
          <View style={classes.daysHeaderWrapper}>
            {days.map((dayName, key) => (
              <View
                style={[classes.dayHeader, {width: blockWidth}]}
                key={`day-name-${key}`}>
                <Text style={classes.dayHeaderText}>
                  {dayName.substring(0, 3)}
                </Text>
              </View>
            ))}
          </View>
          {_.times(offsetDays, (key) => (
            <View
              style={[classes.dayOffset, {width: blockWidth}]}
              key={`offset-day-${key}`}
            />
          ))}
          {_.times(daysInMonth, (key) => {
            const dayNumber = key + 1;
            return (
              <DayItem
                active={currentDay === dayNumber}
                disabled={currentDay > dayNumber}
                key={`month-day-${dayNumber}-${key}`}
                day={dayNumber}
                size={blockWidth}
                events={getEvents(dayNumber, events)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  dayOffset: {
    borderColor: palette.grayLight,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: palette.grayLighter,
    opacity: 0.7,
  },
  dayHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    borderRightWidth: 1,
    borderColor: palette.grayLight,
  },
  dayHeaderText: {
    fontSize: 14,
    color: palette.orange,
    fontWeight: '600',
  },
  daysHeaderWrapper: {
    flexDirection: 'row',
  },
  daysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: palette.grayLight,
  },
  monthNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: palette.blue,
    paddingVertical: 8,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  monthNameText: {
    fontWeight: '600',
    color: '#FFF',
  },
  root: {
    width: '100%',
    minHeight: 100,
  },
});

export default MonthView;
