import React from 'react';
import TextField from 'shared/components/base/controls/text-field';

const Control = ({placeholder, disabled, onPress, value}) => {
  let inputValue = null;
  if (value && typeof value === 'object') {
    const {primary, secondary} = value;
    inputValue = primary + (secondary ? `(${secondary})` : '');
  }
  return (
    <TextField
      onlyMask
      disabled={disabled}
      onPress={onPress}
      secondary
      placeholder={placeholder}
      value={inputValue}
    />
  );
};

export default Control;
