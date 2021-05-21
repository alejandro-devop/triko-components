import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import SelectableItem from './SelectableItem';

const SelectableList = ({items = [], labelKey, onSelect, value, valueKey}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {items.map((item, key) => (
        <SelectableItem
          key={`selectable-${key}`}
          label={item[labelKey]}
          selected={value === item[valueKey]}
          onSelect={() => (onSelect ? onSelect(item) : null)}
        />
      ))}
    </View>
  );
};

const styles = () => ({
  root: {
    marginTop: 20,
  },
});

SelectableList.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};

export default SelectableList;
