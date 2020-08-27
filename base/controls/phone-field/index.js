import React from 'react';
import TextField from 'shared/components/base/controls/text-field';
import PropTypes from 'prop-types';

/**
 * This component allows to create a input specific to enter
 * phone numbers.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param error
 * @param style
 * @param disabled
 * @param label
 * @param onChange
 * @param placeholder
 * @param value
 * @param name
 * @returns {*}
 * @constructor
 */
const PhoneField = ({
  error,
  style,
  disabled,
  label,
  onChange,
  placeholder,
  prependControl,
  preOn,
  name,
  value,
  ..._props
}) => (
  <TextField
    error={error}
    disabled={disabled}
    keyboardType="phone-pad"
    label={label}
    name={name}
    preOn={preOn}
    onChange={onChange}
    placeholder={placeholder}
    prependControl={prependControl}
    style={style}
    value={value}
    {..._props}
  />
);

PhoneField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default PhoneField;
