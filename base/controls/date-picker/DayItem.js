import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

const DayItem = ({day, disabled, selected, onSelect, size = 30}) => {
  const [classes] = useStyles(styles);
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <WrapperComponent
      onPress={() => (!disabled ? onSelect() : null)}
      style={[
        classNames(
          {
            root: true,
            selected,
            disabled,
          },
          classes,
        ),
        {
          width: size,
          height: size,
        },
      ]}>
      <Text
        style={classNames(
          {
            text: true,
            textSelected: selected,
          },
          classes,
        )}>
        {day}
      </Text>
    </WrapperComponent>
  );
};

const styles = ({palette}) => ({
  root: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: palette.blue,
  },
  disabled: {
    opacity: 0.2,
  },
  text: {
    color: palette.gray,
    textAlign: 'center',
  },
  textSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default DayItem;
