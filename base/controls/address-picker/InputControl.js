import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextField} from 'components/base/controls';
import IconButton from 'components/base/buttons/icon-button';
import useStyles from 'hooks/useStyles';

/**
 * This component displays teh selected address by the user.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param label
 * @param onPress
 * @param placeholder
 * @param value
 * @returns {*}
 * @constructor
 */
const InputControl = ({label, onPress, placeholder, value = {}}) => {
  const {title, address} = value || {};
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <TextField
        primary
        addOn={<IconButton onPress={onPress} name="map-marker" />}
        value={address ? `${title || ''} (${address})` : null}
        label={label}
        onlyMask
        onPress={onPress}
        placeholder={placeholder}
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
  root: {
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
  },
});

export default InputControl;
