import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';
import classNames from 'shared/utils/classnames';

const HourBlock = ({
  duration = 1,
  hourObj = {},
  inRange,
  isFirst,
  isLast,
  firstBlock,
  isOccupied,
  blockHeight,
  title,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const shouldRender = duration === 1 || (duration > 1 && firstBlock);
  if (!shouldRender) {
    return null;
  }
  return (
    <View
      style={[
        classNames(
          {
            root: true,
            isFirst,
            rootLast: isLast,
            rootOccupied: isOccupied,
            rootInRange: inRange,
          },
          classes,
        ),
        {height: blockHeight * duration, maxHeight: blockHeight * duration},
      ]}>
      <Text
        style={[
          classNames(
            {
              inRangeText: inRange,
            },
            classes,
          ),
        ]}>
        {_t(title)}
      </Text>
      {inRange && <View style={classes.tip} />}
    </View>
  );
};

const styles = ({palette}) => ({
  eventContent: {},
  hourText: {
    fontSize: 18,
    color: palette.gray,
  },
  isFirst: {
    borderTopWidth: 2,
  },
  inRangeText: {
    color: '#FFF',
    fontWeight: '600',
  },
  root: {
    flexDirection: 'row',
    height: 60,
    flex: 8,
    backgroundColor: palette.blueLight,
    borderColor: palette.blue,
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  rootLast: {
    borderBottomWidth: 0,
  },
  rootOccupied: {
    backgroundColor: '#FFF',
  },
  rootInRange: {
    backgroundColor: palette.blue,
    borderRadius: 10,
  },
  timeWrapper: {
    flex: 2,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  tip: {
    width: 20,
    height: 20,
    backgroundColor: palette.blue,
    borderColor: '#FFF',
    borderWidth: 1,
    position: 'absolute',
    left: -8,
    zIndex: 1000,
    top: -10,
    borderRadius: 100,
  },
});

export default HourBlock;
