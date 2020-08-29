import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextField} from 'shared/components/base/controls';
import IconButton from 'shared/components/base/buttons/icon-button';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component displays teh selected address by the user.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param label
 * @param onPress
 * @param placeholder
 * @param secondary
 * @param value
 * @returns {*}
 * @constructor
 */
const InputControl = ({
  error,
  label,
  onPress,
  placeholder,
  required,
  secondary,
  value = {},
}) => {
  const {title, address} = value || {};
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <TextField
        primary
        secondary={secondary}
        addOn={<IconButton onPress={onPress} name="map-marker" />}
        value={address ? `${title || ''} (${address})` : null}
        error={error}
        label={label}
        onlyMask
        onPress={onPress}
        placeholder={placeholder}
        required={required}
      />
    </View>
  );
};

InputControl.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
  }),
};

const styles = () => ({
  root: {},
});

export default InputControl;
