import React from 'react';
import {View} from 'react-native';
import Button from 'shared/components/base/buttons/button';
import Dialog from 'shared/components/dialogs/dialog';
import styles from './styles';
import {useStyles} from 'hooks/index';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {isEmpty} from 'shared/utils/functions';
import useTranslation from 'shared/hooks/use-translate';

const ImagePickerDialog = ({open, onClose, onChange, photo}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();

  const {fromGallery, fromCamera} = usePhotoCapture({
    customButtons: !isEmpty(photo)
      ? [{name: 'vu', title: _t('image_picker_view_photo')}]
      : [],
  });

  const handleOpenLibrary = async () => {
    const response = await fromGallery();
    const {uri, data} = response;
    const imageData = {
      uri,
      data,
    };
    if (uri) {
      if (onChange) {
        onChange(imageData);
      }
    }
    onClose();
  };
  const handleOpenCamera = async () => {
    const response = await fromCamera();
    const {uri, data} = response;
    const imageData = {
      uri,
      data,
    };
    if (uri) {
      if (onChange) {
        onChange(imageData);
      }
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} contentStyles={classes.dialog}>
      <View style={classes.dialogContent}>
        <Button primary onPress={handleOpenLibrary}>
          select_from_your_library
        </Button>
        <Button secondary onPress={handleOpenCamera}>
          take_a_photo
        </Button>
      </View>
    </Dialog>
  );
};

export default ImagePickerDialog;
