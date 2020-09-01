import React, {useState} from 'react';
import Control from './Control';
import PhotoDialog from './PhotoDialog';
import useTranslation from 'hooks/useTranslation';
import {isEmpty} from 'shared/utils/functions';
import usePhotoCapture from 'components/shopper-request/shopper-cart/use-photo-capture';

const PhotoButton = ({
  icon = 'cloud-upload-alt',
  label,
  value = {},
  onTaken,
}) => {
  const [openVisible, setOpenVisible] = useState(false);
  const toggleVisible = () => setOpenVisible(!openVisible);
  const {uri: photo} = value || {};
  const {_t} = useTranslation();
  const capturePhoto = usePhotoCapture({
    customButtons: !isEmpty(photo)
      ? [{name: 'vu', title: _t('image_picker_view_photo')}]
      : [],
  });
  const onPickImage = async () => {
    capturePhoto({
      onCustom: button => {
        if (button === 'vu') {
          toggleVisible();
        }
      },
      onPhotoSelected: response => {
        const {uri, data} = response;
        if (onTaken) {
          onTaken({
            uri,
            data,
          });
        }
      },
    });
  };
  return (
    <>
      <Control label={label} icon={icon} onPress={onPickImage} photo={photo} />
      {openVisible && <PhotoDialog onClose={toggleVisible} photo={photo} />}
    </>
  );
};

export default PhotoButton;
