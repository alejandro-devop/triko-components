import React from 'react';
import TextField from 'shared/components/base/controls/text-field';
import PropTypes from 'prop-types';

/**
 * This component allows to create an input specific to enter email.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param style
 * @param disabled
 * @param label
 * @param onChange
 * @param placeholder
 * @param name
 * @returns {*}
 * @constructor
 */
const EmailField = ({
  style,
  error,
  disabled,
  label,
  onChange,
  placeholder,
  name,
  value,
  ..._props
}) => (
  <TextField
    error={error}
    disabled={disabled}
    keyboardType="email-address"
    label={label}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    style={style}
    autoCapitalize="none"
    autoCompleteType="off"
    autoCorrect={false}
    value={value}
    {..._props}
  />
);

EmailField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default EmailField;
