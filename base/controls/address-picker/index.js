import React, {useState} from 'react';
import InputControl from './InputControl';
import MyAddressesList from './MyAddressesList';

const AddressPicker = ({label, placeholder}) => {
  const [openList, setOpenList] = useState(true);
  const toggleDialog = () => setOpenList(!openList);
  return (
    <>
      <InputControl label={label} placeholder={placeholder} />
      <MyAddressesList open={openList} onClose={toggleDialog} />
    </>
  );
};

export default AddressPicker;
