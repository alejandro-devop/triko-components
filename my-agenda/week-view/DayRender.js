import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import Text from 'components/base/text';
import {getBlockInfo} from '../commons';
import useTranslation from 'hooks/useTranslation';

const DayRender = ({
  blockWidth,
  blockHeight,
  day,
  onSelectDay,
  hourBlocks = [],
  events = [],
  inputFormat = 'YYYY-MM-DD HH:mm:ss',
  maxChars = 10,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View
      style={classes.root}
      onSelectDay={() => (onSelectDay ? onSelectDay(day) : null)}>
      {hourBlocks.map((hourObj, key) => {
        const {
          duration = 1,
          firstBlock,
          isOccupied,
          inRange,
          title,
        } = getBlockInfo(day, events, hourObj, inputFormat, maxChars);
        const shouldRender = duration === 1 || (duration > 1 && firstBlock);
        if (!shouldRender) {
          return null;
        }
        const ComponentWrapper =
          inRange && !isOccupied ? TouchableOpacity : View;
        return (
          <ComponentWrapper
            key={`day-column-${key}`}
            style={[
              classNames(
                {
                  blockItem: true,
                  blockItemInRange: inRange,
                  blockItemOccupied: isOccupied,
                },
                classes,
              ),
              {width: blockWidth, height: blockHeight * duration},
            ]}>
            <Text
              style={[
                classNames(
                  {
                    insideText: true,
                    inRangeText: inRange,
                    occupiedText: isOccupied,
                  },
                  classes,
                ),
              ]}>
              {_t(isOccupied ? 'label_occupied' : title)}
            </Text>
            {inRange && !isOccupied && <View style={classes.tip} />}
            {/*<Text>{duration}</Text>*/}
          </ComponentWrapper>
        );
      })}
    </View>
  );
};

const styles = ({palette}) => ({
  blockItem: {
    borderColor: palette.grayLight,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blueLight,
  },
  blockItemInRange: {
    backgroundColor: palette.blue,
  },
  blockItemOccupied: {
    backgroundColor: '#FFF',
  },
  insideText: {
    fontSize: 8,
  },
  inRangeText: {
    color: '#FFF',
  },
  occupiedText: {
    color: palette.gray,
  },
  root: {},
  tip: {
    width: 16,
    height: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FFF',
    position: 'absolute',
    backgroundColor: palette.blue,
    left: -8,
    top: -8,
  },
});

export default DayRender;
