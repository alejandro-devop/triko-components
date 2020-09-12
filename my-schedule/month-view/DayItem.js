import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import classNames from 'shared/utils/classnames';
import _ from 'lodash';

const DayItem = ({
  active,
  day,
  disabled,
  currentDay,
  events = [],
  dayKey,
  maxEventsPerDay = 2,
  size,
}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = disabled ? View : TouchableOpacity;
  const eventsToDisplay = events.slice(0, maxEventsPerDay);
  const otherEvents = events.slice(maxEventsPerDay);
  return (
    <ComponentWrapper
      style={[
        classNames({root: true, disabled}, classes),
        {width: size, height: size},
      ]}>
      <View
        style={classNames(
          {dayWrapper: true, dayWrapperActive: active},
          classes,
        )}>
        <Text
          style={classNames({dayText: true, dayTextActive: active}, classes)}>
          {day}
        </Text>
      </View>
      <View style={classes.eventsWrapper}>
        {_.times(eventsToDisplay.length, key => (
          <View style={classes.eventItem} />
        ))}
        {otherEvents.length > 0 && (
          <View style={classes.otherEventsWrapper}>
            <Text style={classes.otherEventsText}>+{otherEvents.length}</Text>
          </View>
        )}
      </View>
    </ComponentWrapper>
  );
};

const styles = ({palette}) => ({
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.gray,
  },
  dayTextActive: {
    color: '#FFF',
  },
  dayWrapper: {
    position: 'absolute',
    top: 2,
    left: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 100,
  },
  dayWrapperActive: {
    backgroundColor: palette.blue,
  },
  disabled: {
    backgroundColor: palette.grayLighter,
  },
  otherEventsText: {
    fontSize: 12,
  },
  otherEventsWrapper: {
    marginBottom: 5,
  },
  eventItem: {
    width: 8,
    height: 8,
    marginRight: 4,
    backgroundColor: palette.orange,
    marginBottom: 4,
    borderRadius: 10,
  },
  eventsWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: palette.grayLight,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    opacity: 0.7,
  },
  rootLeftBordered: {
    borderLeftWidth: 1,
  },
});

export default DayItem;
