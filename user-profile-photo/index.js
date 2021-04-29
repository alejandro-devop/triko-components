import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PhotoDisplay from './photo-display';
import PhotoUpdate from './photo-update';
import FacePhotoUploader from 'components/required-documents/document-handlers/profile-photo/FacePhotoUploader';

/**
 * This component renders the user profile photo and allows to update it
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param disableEdit
 * @param hideRate
 * @param isTriko
 * @param onlyView
 * @param size
 * @returns {*}
 * @constructor
 */
const UserProfilePhoto = ({disableEdit, hideRate, isTriko, onlyView, size}) => {
  const [open, setOpen] = useState(false);
  const toggleUpdate = () => setOpen(!open);
  return (
    <>
      <PhotoDisplay
        disableEdit={disableEdit}
        hideRate={hideRate}
        isTriko={isTriko}
        onlyView={onlyView}
        toggleUpdate={toggleUpdate}
        size={size}
      />
      {open && (
        <PhotoUpdate isTriko={isTriko} open={open} onClose={toggleUpdate} />
      )}
    </>
  );
};

UserProfilePhoto.propTypes = {
  disableEdit: PropTypes.bool,
  hideRate: PropTypes.bool,
  isTriko: PropTypes.bool,
  onlyView: PropTypes.bool,
  size: PropTypes.string,
};

export default UserProfilePhoto;
