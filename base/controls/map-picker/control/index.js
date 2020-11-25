import React from 'react';
import TextField from 'shared/components/base/controls/text-field';
import Icon from 'shared/components/base/icon';
import palette from 'themes/styles/palette';

const Control = ({
  label,
  placeholder,
  required,
  primary,
  toggleView,
  value,
}) => {
  return (
    <TextField
      label={label}
      onlyMask
      required={required}
      placeholder={placeholder}
      primary={primary}
      onPress={toggleView}
      value={value}
      addOn={<Icon name="map-marker" style={{color: palette.blue}} />}
    />
  );
};

export default Control;
