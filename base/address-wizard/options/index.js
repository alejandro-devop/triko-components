import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'shared/hooks/use-styles';
import SwitchButton from 'shared/components/base/controls/switch-button';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

/**
 * Component to display the options available for the user when adding an address
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param onChange
 * @param value
 * @returns {*}
 * @constructor
 */
const Options = ({onChange, value}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const handleChange = ({target: {value: newValue}}) => onChange(newValue);
  return (
    <View style={classes.root}>
      <SwitchButton
        buttons={['enter_my_address_text', 'use_my_current_location_text']}
        label={_t('enter_address_method')}
        value={value}
        onChange={handleChange}
      />
    </View>
  );
};

Options.propTypes = {
  onChange: PropTypes.func, // Function triggered when an option change.
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // The current selected option
};

export default Options;
