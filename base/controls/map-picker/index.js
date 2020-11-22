import React from 'react';
import PropTypes from 'prop-types';
import useToggle from 'shared/hooks/use-toggle';
import Control from './control';
import AddressWizard from 'shared/components/base/address-wizard';

const MapPicker = ({label, name, onChange, placeholder, primary, value}) => {
  const [visible, toggleVisible] = useToggle(false);
  const handleChangeAddress = (addressData) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: addressData,
        },
      });
    }
    toggleVisible();
  };
  const {address} = value ? value : {};
  return (
    <>
      <Control
        label={label}
        placeholder={placeholder}
        primary={primary}
        toggleView={toggleVisible}
        value={address}
      />
      {visible && (
        <AddressWizard
          open={visible}
          onClose={toggleVisible}
          onSaved={handleChangeAddress}
          skipForm
          useDialog
          useWizard
        />
      )}
    </>
  );
};

export default MapPicker;
