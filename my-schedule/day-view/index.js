import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import useStyles from 'shared/hooks/use-styles';
import HourBlock from './HourBlock';
import Text from 'components/base/text';
import {getBlockInfo} from '../commons';
import useLocales from 'hooks/useLocales';

const DayView = ({
  beginHour = '04:00:00',
  endHour = '23:00:00',
  events = [],
  inputFormat = 'YYYY-MM-DD HH:mm:ss',
  interval = 1,
  currentMonth,
  currentDay,
}) => {
  const [classes] = useStyles(styles);
  const {months = []} = useLocales();
  const blockHeight = 60;
  const dayNumber = (currentDay < 0 ? '0' : '') + currentDay;
  const date = moment(
    `${currentMonth.format('YYYY-MM')}-${dayNumber}`,
    'YYYY-MM-DD HH:mm:ss',
  );

  const startDate = moment(
    `${date.format('YYYY-MM-DD')} ${beginHour}`,
    inputFormat,
  ).subtract(interval, 'hour');
  const endDate = moment(
    `${date.format('YYYY-MM-DD')} ${endHour}`,
    inputFormat,
  );
  const durationObj = moment.duration(endDate.diff(startDate));
  const dateBlocks = [...Array(durationObj.hours()).keys()].map(key => {
    startDate.add(interval, 'hour');
    return {
      hour: startDate.format('h:mm a'),
      date: startDate.format('YYYY-MM-DD'),
    };
  });
  const monthNumber = parseInt(currentMonth.format('M'), 10);
  const month = months[monthNumber - 1];
  return (
    <View style={classes.root}>
      <View style={classes.monthWrapper}>
        <Text style={classes.monthText}>{`${month} ${currentDay}`}</Text>
      </View>
      <View style={classes.row}>
        <View style={classes.hoursWrapper}>
          {dateBlocks.map((item, key) => (
            <View style={classes.hourBlock} key={`column-hour-${key}`}>
              <View style={classes.hourTextWrapper}>
                <Text style={[classes.hourText, {height: blockHeight}]}>
                  {item.hour}
                </Text>
                <View style={classes.tip} />
              </View>
            </View>
          ))}
        </View>
        <View style={classes.eventsWrapper}>
          {dateBlocks.map((item, key) => {
            const {
              duration,
              isOccupied,
              firstBlock,
              title,
              inRange,
            } = getBlockInfo(currentDay, events, item, inputFormat, 22);
            return (
              <HourBlock
                duration={duration}
                isFirst={key === 0}
                isLast={key === dateBlocks.length - 1}
                firstBlock={firstBlock}
                key={`item-block-${key}`}
                hourObj={item}
                isOccupied={isOccupied}
                inRange={inRange}
                blockHeight={blockHeight}
                title={title}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = ({palette}) => ({
  hourTextWrapper: {},
  hourText: {
    top: -10,
    right: 20,
    fontSize: 16,
  },
  hourBlock: {
    flex: 1,
  },
  root: {
    marginTop: 20,
    paddingBottom: 100,
  },
  eventsWrapper: {
    flex: 8,
  },
  hoursWrapper: {
    flex: 3,
    alignItems: 'flex-end',
  },
  monthWrapper: {
    marginBottom: 35,
    alignItems: 'center',
  },
  monthText: {
    color: palette.gray,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
});

export default DayView;
