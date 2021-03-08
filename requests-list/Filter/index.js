import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import Button from 'components/base/buttons/button';
import {useStyles} from 'hooks/index';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component allows to render the filters for requests.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param currentFilter
 * @param filterPrimary
 * @param onChange
 * @param options
 * @returns {*}
 * @constructor
 */
const Filter = ({currentFilter, filterPrimary, onChange, options = []}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {options.map((option, key) => {
        const isActive = key === currentFilter;
        return (
          <Button
            primary={filterPrimary}
            secondary={!isActive}
            alternative={isActive && !filterPrimary}
            key={`option-${key}`}
            onPress={() => onChange(key)}
            style={classes.button}
            size="xs">
            {_t(option)}
          </Button>
        );
      })}
    </View>
  );
};

Filter.propTypes = {
  currentFilter: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Filter;
