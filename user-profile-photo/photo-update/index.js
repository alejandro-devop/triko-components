import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Button from 'shared/components/base/buttons/button';
import {useStyles} from 'hooks/index';
import styles from './styles';
import PhotoDisplay from '../photo-display';
import usePhotoCapture from 'shared/hooks/use-photo-capture';
import {useAvatarUpdate} from '../hooks';
import {LoadingCurtain} from 'components/base/dialogs';

/**
 * This component controls the avatar update dialog
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onClose
 * @param open
 * @returns {*}
 * @constructor
 */
const PhotoUpdate = ({onClose, open}) => {
  const [classes] = useStyles(styles);
  const capturePhoto = usePhotoCapture();
  const {loading, updatePhoto} = useAvatarUpdate();
  const handleCapturePhoto = () => {
    capturePhoto({
      onPhotoSelected: (response) => {
        const {data} = response;
        updatePhoto({fileData: data});
      },
    });
  };
  return (
    <Dialog onClose={onClose} open={open} contentStyles={classes.root}>
      <PhotoDisplay hideRate onlyView size="lg" />
      <View style={classes.actionsWrapper}>
        <Button primary onPress={handleCapturePhoto}>
          change_photo
        </Button>
      </View>
      {loading && <LoadingCurtain disableModal />}
    </Dialog>
  );
};

PhotoUpdate.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default PhotoUpdate;
