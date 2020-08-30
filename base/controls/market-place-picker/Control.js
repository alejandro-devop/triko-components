import React from 'react';
import TextField from 'shared/components/base/controls/text-field';

const Control = ({placeholder, disabled, onPress, primary, secondary}) => {
  return (
    <TextField
      onlyMask
      disabled={disabled}
      // placeholderStyles={}
      onPress={onPress}
      secondary
      placeholder={placeholder}
      value={`${primary} ${secondary ? '(' + secondary + ')' : ''}`}
    />
  );
};

export default Control;
