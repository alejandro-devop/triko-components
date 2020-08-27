import React, {useState} from 'react';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import PropTypes from 'prop-types';
import palette from 'themes/styles/palette';

/**
 * This component allows to create a password field
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param style
 * @param disabled
 * @param disableToggle
 * @param label
 * @param onChange
 * @param placeholder
 * @param name
 * @param value
 * @returns {*}
 * @constructor
 */
const PasswordField = ({
  style,
  error,
  disabled,
  disableToggle,
  label,
  onChange,
  placeholder,
  name,
  value,
  primary,
  ..._props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TextField
      error={error}
      primary={primary}
      addOn={
        !disableToggle ? (
          <IconButton
            name={isVisible ? 'eye-slash' : 'eye'}
            iconStyles={{color: primary ? palette.blue : '#FFF'}}
            onPress={() => setIsVisible(!isVisible)}
          />
        ) : null
      }
      disabled={disabled}
      label={label}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      secureTextEntry={!isVisible}
      autoCapitalize="none"
      style={style}
      value={value}
      {..._props}
    />
  );
};

PasswordField.propTypes = {
  disabled: PropTypes.bool,
  disableToggle: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default PasswordField;
