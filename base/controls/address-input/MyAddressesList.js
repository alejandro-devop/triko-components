import React from 'react';
import AddressesList from 'shared/components/base/address-picker/AddressesList';

const MyAddressesList = ({onAddNew, open, onSelect, onClose, selected}) => {
  return (
    <AddressesList
      open={open}
      onSelect={onSelect}
      toggleForm={onAddNew}
      onClose={onClose}
      selected={selected}
    />
  );
};

export default MyAddressesList;
