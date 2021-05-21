import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import RadioButton from 'components/base/controls/radio-button';
import Label from 'shared/components/base/label';
import CheckboxField from 'components/base/controls/checkbox-field';
import Text from 'shared/components/base/text';

const defaultSizes = ['sm', 'md', 'lg'];

const PackageSizePicker = ({
  label,
  name,
  onChange,
  sizes = defaultSizes,
  value = 0,
}) => {
  const [classes] = useStyles(styles);

  const handleChange = (newSelected) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: newSelected,
        },
      });
    }
  };

  return (
    <View style={classes.root}>
      {/*{label && <Text style={classes.label}>{label}</Text>}*/}
      {label && <Label style={classes.label}>{label}</Label>}
      <View style={classes.itemsWrapper}>
        {sizes.map((item, key) => (
          <View style={classes.itemWrapper} key={`item-${key}-name`}>
            <RadioButton
              circle
              secondary
              value={value === item}
              label={`size_${item}`}
              onChange={() => handleChange(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default PackageSizePicker;
