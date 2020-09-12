import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import DaysHeader from './DaysHeader';
import HoursRender from './HoursRender';
import DayRender from './DayRender';
import Guide from './Guide';
import useStyles from 'shared/hooks/use-styles';
import useLocales from 'hooks/useLocales';
import Text from 'components/base/text';
import moment from 'moment';

const WeekView = ({
  currentDay,
  beginHour = '04:00:00',
  endHour = '23:00:00',
  interval = 1,
  inputFormat = 'YYYY-MM-DD HH:mm:ss',
  events = [],
  getEvents,
}) => {
  const [classes] = useStyles(styles);
  const {days = []} = useLocales();
  const [blockWidth, setBlockWidth] = useState(50);
  const {months = []} = useLocales();
  const currentDate = moment();

  const startDate = moment(
    `${currentDate.format('YYYY-MM-DD')} ${beginHour}`,
    inputFormat,
  ).subtract(interval, 'hour');
  const endDate = moment(
    `${currentDate.format('YYYY-MM-DD')} ${endHour}`,
    inputFormat,
  );
  const duration = moment.duration(endDate.diff(startDate));
  const dateBlocks = [...Array(duration.hours()).keys()].map(key => {
    startDate.add(interval, 'hour');
    return {
      hour: startDate.format('h:mm a'),
      date: startDate.format('YYYY-MM-DD'),
    };
  });

  const blockHeight = 35;

  const daysToRender = days.map((dayName, key) => {
    const currentWeek = moment()
      .startOf('isoWeek')
      .add(key, 'days');
    return {
      dayLetter: dayName.substring(0, 1),
      day: dayName,
      dayNumber: parseInt(currentWeek.format('D'), 10),
      date: currentWeek.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  const monthNumber = parseInt(currentDate.format('M'), 10);
  const month = months[monthNumber - 1];
  return (
    <View style={classes.root}>
      <Guide />
      <View style={classes.monthWrapper}>
        <Text style={classes.monthText}>{month}</Text>
      </View>
      {blockWidth && (
        <>
          <View style={classes.row}>
            <HoursRender blockHeight={blockHeight} dateBlocks={dateBlocks} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={classes.wrapper}>
                <DaysHeader
                  currentDay={currentDay}
                  blockWidth={blockWidth * 1.5}
                  days={daysToRender}
                />
                <View style={classes.daysColumnsWrapper}>
                  {daysToRender.map(({dayNumber}, key) => (
                    <DayRender
                      day={dayNumber}
                      key={`day-column-${key}`}
                      hourBlocks={dateBlocks}
                      blockWidth={blockWidth * 1.5}
                      blockHeight={blockHeight}
                      events={getEvents(dayNumber, events)}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  daysColumnsWrapper: {
    flexDirection: 'row',
    borderColor: palette.grayLight,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  hoursColumn: {},
  monthWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  monthText: {
    color: palette.gray,
  },
  root: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
  },
  wrapper: {
    paddingLeft: 10,
  },
});

export default WeekView;
