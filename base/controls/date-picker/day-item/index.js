import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';
import styles from './styles';

/**
 * This component renders a dialog which allows to select the day.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param day
 * @param disabled
 * @param selected
 * @param onSelect
 * @param size
 * @returns {*}
 * @constructor
 */
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

export default DayItem;
