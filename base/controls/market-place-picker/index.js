import React from 'react';
import Control from './Control';

const MarketPlacePicker = ({label, placeholder, primary, secondary}) => {
  return (
    <>
      <Control
        label={label}
        placeholder={placeholder}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
};

export default MarketPlacePicker;
