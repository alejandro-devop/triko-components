import React, {useState} from 'react';
import Control from './Control';
import PhotoDialog from './PhotoDialog';
import useTranslation from 'shared/hooks/use-translate';
import {isEmpty} from 'shared/utils/functions';
import usePhotoCapture from 'components/shopper-request/shopper-cart/use-photo-capture';

const PhotoButton = ({
  icon = 'cloud-upload-alt',
  label,
  value = {},
  onTaken,
}) => {
  const [openVisible, setOpenVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const toggleVisible = () => setOpenVisible(!openVisible);
  const {uri: photo} = value || {};
  const {_t} = useTranslation();
  const capturePhoto = usePhotoCapture({
    customButtons: !isEmpty(photo)
      ? [{name: 'vu', title: _t('image_picker_view_photo')}]
      : [],
  });
  const onPickImage = async () => {
    if (locked) {
      return false;
    }
    setLocked(true);
    capturePhoto({
      onCustom: (button) => {
        if (button === 'vu') {
          toggleVisible();
        }
      },
      onPhotoSelected: (response) => {
        const {uri, data} = response;
        if (onTaken) {
          onTaken({
            uri,
            data,
          });
        }
        setLocked(false);
      },
    });
  };
  return (
    <>
      <Control
        disabled={locked}
        label={label}
        icon={icon}
        onPress={onPickImage}
        photo={photo}
      />
      {openVisible && <PhotoDialog onClose={toggleVisible} photo={photo} />}
    </>
  );
};

export default PhotoButton;
