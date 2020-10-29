import React from 'react';
import {View} from 'react-native';
import classNames from 'shared/utils/classnames';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';

const DaysHeader = ({blockWidth, days = [], currentDay}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.daysWrapper}>
      {days.map(({dayLetter, dayNumber}, key) => (
        <View
          key={`day-item-${key}`}
          style={[
            classNames(
              {dayWrapper: true, dayWrapperActive: currentDay === dayNumber},
              classes,
            ),
            {width: blockWidth},
          ]}>
          <Text
            style={[
              classNames(
                {dayText: true, dayTextActive: currentDay === dayNumber},
                classes,
              ),
            ]}>
            {dayLetter}
          </Text>
          <Text
            style={classNames(
              {dayNumber: true, dayNumberActive: currentDay === dayNumber},
              classes,
            )}>
            {dayNumber}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = ({palette}) => ({
  dayText: {
    color: palette.gray,
    fontSize: 14,
  },
  dayTextActive: {
    color: '#FFF',
  },
  dayNumber: {
    fontSize: 14,
    color: palette.orange,
    fontWeight: '600',
  },
  dayNumberActive: {
    color: '#FFF',
  },
  dayWrapper: {
    paddingVertical: 4,
    alignItems: 'center',
  },
  dayWrapperActive: {
    backgroundColor: palette.orange,
    borderRadius: 20,
  },
  daysWrapper: {
    flexDirection: 'row',
  },
});

export default DaysHeader;
