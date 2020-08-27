import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import {isEmpty} from 'shared/utils/functions';
import Icon from 'shared/components/base/icon';

const Filter = ({onChange, placeholder, primary, alwaysVisible}) => {
  const [classes] = useStyles(styles);
  const [filter, setFilter] = useState('');
  const [opened, setOpened] = useState(Boolean(alwaysVisible));
  const clearFilter = () => {
    setFilter('');
    if (onChange) {
      onChange('');
    }
  };
  const handleChange = ({target: {value}}) => {
    setFilter(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <View style={classes.root}>
      {opened && (
        <TextField
          value={filter}
          onChange={handleChange}
          placeholder={placeholder}
          primary={primary}
          preOn={<Icon name="search" />}
          addOn={
            !isEmpty(filter) ? (
              <IconButton name="eraser" onPress={clearFilter} />
            ) : null
          }
        />
      )}
      {!alwaysVisible && (
        <View style={classes.buttonWrapper}>
          <IconButton
            name={opened ? 'times' : 'search'}
            onPress={() => setOpened(!opened)}
          />
        </View>
      )}
    </View>
  );
};

export default Filter;
