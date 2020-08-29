import React, {useState, useEffect} from 'react';
import TextField from 'shared/components/base/controls/text-field';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import useCityFinder from 'shared/components/base/controls/g-city-select/useCityFinder';
import SelectableList from 'shared/components/base/selectable-list';

let timer = null;

const GCitySelect = ({
  autoFocus,
  delay = 600,
  label,
  onChange,
  name,
  placeholder,
}) => {
  const [classes] = useStyles(styles);
  const [selected, setSelected] = useState(null);
  const {cities = [], findCities} = useCityFinder();
  const onChangeQuery = async ({target: {value}}) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      findCities(value);
    }, delay);
  };
  useEffect(
    () => () => {
      clearTimeout(timer);
    },
    [],
  );

  const items = cities.map(item => ({
    value: item,
    label: item,
  }));

  const onSelect = ({value}) => {
    setSelected(value);
    if (onChange) {
      onChange({
        target: {
          name,
          value,
        },
      });
    }
  };

  return (
    <View style={classes.root}>
      <TextField
        autoFocus={autoFocus}
        label={label}
        placeholder={placeholder}
        primary
        onChange={onChangeQuery}
      />
      {cities.length > 0 && (
        <SelectableList items={items} onSelect={onSelect} value={selected} />
      )}
    </View>
  );
};

const styles = () => ({
  root: {
  },
});

export default GCitySelect;
