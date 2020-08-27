import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'shared/components/base/controls';
import IconButton from 'shared/components/base/buttons/icon-button';

/**
 * This component displays teh selected address by the user.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param label
 * @param onPress
 * @param placeholder
 * @param value
 * @returns {*}
 * @constructor
 */
const AddressControl = ({label, onPress, placeholder, value = {}}) => {
  const {title, address} = value || {};
  return (
    <TextField
      primary
      addOn={<IconButton onPress={onPress} name="map-marker" />}
      value={address ? `${title || ''} (${address})` : null}
      label={label}
      onlyMask
      onPress={onPress}
      placeholder={placeholder}
    />
  );
};

AddressControl.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default AddressControl;
