import React, {useState} from 'react';
import {View} from 'react-native';
import IconButton from 'shared/components/base/buttons/icon-button';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import {formatNumber} from './commons';

const PickerControl = ({onChange, value = 0, min = 0, max = 60, step = 1}) => {
  const [classes] = useStyles(styles);
  const [currentValue, setValue] = useState(parseInt(value, 10));
  const formattedValue = formatNumber(currentValue);

  const handleChange = (decrease) => {
    let newValue = currentValue + (decrease ? -step : step);
    if (newValue >= max) {
      newValue = min;
    }
    if (newValue < 0) {
      newValue = max - step;
    }
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <View style={classes.root}>
      <IconButton
        name="chevron-up"
        iconStyles={classes.icon}
        onPress={handleChange}
      />
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{formattedValue}</Text>
      </View>
      <IconButton
        name="chevron-down"
        iconStyles={classes.icon}
        onPress={() => handleChange(true)}
      />
    </View>
  );
};

const styles = ({palette}) => ({
  input: {
    textAlign: 'center',
  },
  icon: {
    color: palette.blue,
  },
  root: {
    width: 60,
    height: 120,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: palette.gray,
  },
  textWrapper: {
    backgroundColor: palette.white,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
});

export default PickerControl;
