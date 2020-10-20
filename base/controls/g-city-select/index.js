import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextField from 'shared/components/base/controls/text-field';
import CircularLoader from 'shared/components/loaders/circular-loader';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import useCityFinder from 'shared/components/base/controls/g-city-select/useCityFinder';
import SelectableList from 'shared/components/base/selectable-list';
import Text from 'components/base/text';
import styles from './styles';

let timer = null;

const GCitySelect = ({
  autoFocus,
  delay = 600,
  label,
  onChange,
  name,
  placeholder,
  searchPlaceholder,
}) => {
  const [classes] = useStyles(styles);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const {cities = [], findCities, loading} = useCityFinder();
  const onChangeQuery = async ({target: {value}}) => {
    setQuery(value);
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

  const items = cities.map((item) => ({
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
      {loading && (
        <View style={classes.loaderWrapper}>
          <CircularLoader />
        </View>
      )}
      {cities.length > 0 && (
        <SelectableList items={items} onSelect={onSelect} value={selected} />
      )}
      {query.length === 0 && (
        <View style={classes.caption}>
          <Text style={classes.captionText} variant="caption">
            {searchPlaceholder}
          </Text>
        </View>
      )}
    </View>
  );
};

GCitySelect.propTypes = {
  autoFocus: PropTypes.bool,
  delay: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

export default GCitySelect;
