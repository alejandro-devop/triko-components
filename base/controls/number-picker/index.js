import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import Label from 'shared/components/base/label';

const NumberPicker = ({
  label,
  labelSecondary,
  name,
  onChange,
  step = 1,
  min = 0,
  max = 5,
  value = 0,
  secondary,
  primary,
}) => {
  const [classes] = useStyles(styles);
  const handleChange = (toIncrease) => {
    const nextValue = value + toIncrease;
    if (nextValue > max || nextValue < min) {
      return false;
    }
    if (onChange) {
      onChange({target: {name, value: nextValue}});
    }
  };
  return (
    <View style={[classes.root]}>
      {label && <Label secondary={labelSecondary || secondary}>{label}</Label>}
      <View style={classes.controlWrapper}>
        <View style={classes.buttonWrapper}>
          <IconButton
            name="minus"
            disabled={value === min}
            iconStyles={classes.icon}
            onPress={() => handleChange(-step)}
          />
        </View>
        <View style={classes.inputWrapper}>
          <TextField
            onlyMask
            primary={primary}
            placeholderStyles={classes.input}
            secondary={secondary}
            value={value.toString()}
          />
        </View>
        <View style={classes.buttonWrapper}>
          <IconButton
            name="plus"
            disabled={value === max}
            iconStyles={classes.icon}
            onPress={() => handleChange(step)}
          />
        </View>
      </View>
    </View>
  );
};

export default NumberPicker;
