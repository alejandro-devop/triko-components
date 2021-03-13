import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'components/base/icon';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {isEmpty} from 'shared/utils/functions';
import PreImage from 'shared/components/base/pre-image';
import Dialog from 'shared/components/dialogs/dialog';
import useToggle from 'shared/hooks/use-toggle';
import Button from 'shared/components/base/buttons/button';
import styles from './styles';

const ImagePicker = ({
  icon = 'image',
  label = 'select_image_label',
  onChange,
  secondary,
}) => {
  const [classes] = useStyles(styles);
  const [openDialog, toggleDialog] = useToggle();
  const [photo, setPhoto] = useState(null);
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
      setPhoto(imageData);
      if (onChange) {
        onChange(imageData);
      }
    }
    toggleDialog();
  };
  const handleOpenCamera = async () => {
    const response = await fromCamera();
    const {uri, data} = response;
    const imageData = {
      uri,
      data,
    };
    if (uri) {
      setPhoto(imageData);
      if (onChange) {
        onChange(imageData);
      }
    }
    toggleDialog();
  };
  return (
    <>
      <View style={classes.root}>
        <TouchableOpacity style={classes.button} onPress={() => toggleDialog()}>
          <View
            style={classNames(
              {iconWrapper: true, iconSecondary: secondary},
              classes,
            )}>
            {photo && (
              <PreImage source={{uri: photo.uri}} style={classes.image} />
            )}
            {!photo && <Icon name={icon} style={classes.icon} />}
          </View>
          <View style={classes.textWrapper}>
            <Text style={classes.label}>{_t(label)}</Text>
            {Boolean(photo) && (
              <Text variant="caption" style={classes.uploadedLabel}>
                ({_t('photo_uploaded_text')})
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Dialog
        open={openDialog}
        onClose={() => toggleDialog()}
        contentStyles={classes.dialog}>
        <View style={classes.dialogContent}>
          <Button primary onPress={handleOpenLibrary}>
            select_from_your_library
          </Button>
          <Button secondary onPress={handleOpenCamera}>
            take_a_photo
          </Button>
        </View>
      </Dialog>
    </>
  );
};

export default ImagePicker;
