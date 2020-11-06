import React, {useState} from 'react';
import PhotoDisplay from './photo-display';
import PhotoUpdate from './photo-update';

const UserProfilePhoto = ({hideRate, isTriko, onlyView, size}) => {
  const [open, setOpen] = useState(false);
  const toggleUpdate = () => setOpen(!open);
  return (
    <>
      <PhotoDisplay
        hideRate={hideRate}
        isTriko={isTriko}
        onlyView={onlyView}
        toggleUpdate={toggleUpdate}
        size={size}
      />
      {open && <PhotoUpdate open={open} onClose={toggleUpdate} />}
    </>
  );
};

export default UserProfilePhoto;
