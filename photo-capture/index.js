import React, {useState} from 'react';
import {View} from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import ButtonControl from './button-control';
import useToggle from 'shared/hooks/use-toggle';
import styles from './styles';
import Dialog from 'shared/components/dialogs/dialog';
import Button from 'shared/components/base/buttons/button';
import {useStyles} from '@triko-app/hooks';
import ImagePicker from 'react-native-image-picker';
import useTranslation from 'shared/hooks/use-translate';

const PhotoCapture = ({
  control,
  label,
  onCancel,
  onError,
  onCustom,
  onSelected,
  value,
  otherOptions = {},
}) => {
  const [openDialog, toggleDialog] = useToggle();
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();

  const options = {
    title: _t('select_an_image_from_gallery'),
    cancelButtonTitle: _t('image_picker_cancel'),
    takePhotoButtonTitle: _t('image_picker_take_photo'),
    chooseFromLibraryButtonTitle: _t('image_picker_from_gallery'),
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.6,
    multiple: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    ...otherOptions,
  };

  const handlePickupFromGallery = async () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel && onCancel) {
        onCancel(response.didCancel);
      } else if (response.error && onError) {
        onError(response.error);
      } else if (response.customButton && onCustom) {
        onCustom(response.customButton);
      } else if (onSelected) {
        onSelected(response);
      }
      toggleDialog();
    });
  };

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel && onCancel) {
        onCancel(response.didCancel);
      } else if (response.error && onError) {
        onError(response.error);
      } else if (response.customButton && onCustom) {
        onCustom(response.customButton);
      } else if (onSelected) {
        onSelected(response);
      }
      toggleDialog();
    });
  };

  return (
    <>
      {!control && (
        <ButtonControl
          label={label}
          photo={value}
          onPress={() => toggleDialog()}
        />
      )}
      {openDialog && (
        <Dialog
          contentStyles={classes.root}
          title={label}
          open={openDialog}
          onClose={() => toggleDialog()}>
          <View style={classes.actions}>
            <Button onPress={handleTakePhoto} primary>
              take_a_photo
            </Button>
            <Button onPress={handlePickupFromGallery} secondary>
              pickup_from_gallery
            </Button>
          </View>
        </Dialog>
      )}
    </>
  );
};

export default PhotoCapture;
