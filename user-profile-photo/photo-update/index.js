import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Button from 'shared/components/base/buttons/button';
import {useStyles} from 'hooks/index';
import styles from './styles';
import PhotoDisplay from '../photo-display';
import {useAvatarUpdate} from '../hooks';
import {LoadingCurtain} from 'components/base/dialogs';
import ImagePickerDialog from 'shared/components/base/controls/image-picker/ImagePickerDialog';
import useToggle from 'shared/hooks/use-toggle';
import useErrorReporter from 'shared/hooks/use-error-reporter';

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
  const {loading, updatePhoto} = useAvatarUpdate();
  const [openUpdate, toggleUpdate] = useToggle();
  const reportError = useErrorReporter({
    path: 'src/shared/components/user-profile-photo/photo-update/index.js',
  });
  const handleCapturePhoto = async ({data}) => {
    try {
      await updatePhoto({fileData: data});
    } catch (e) {
      reportError(e, {
        message: 'Error while updating the profile photo',
        code: 'TUA-000015',
      });
    }
  };
  return (
    <>
      <Dialog
        onClose={onClose}
        open={open && !openUpdate}
        contentStyles={classes.root}>
        <PhotoDisplay hideRate onlyView size="lg" />
        <View style={classes.actionsWrapper}>
          <Button primary onPress={() => toggleUpdate()}>
            change_photo
          </Button>
        </View>
        {loading && <LoadingCurtain disableModal />}
      </Dialog>
      {openUpdate && (
        <ImagePickerDialog
          open={openUpdate}
          onClose={() => toggleUpdate()}
          onChange={handleCapturePhoto}
        />
      )}
    </>
  );
};

PhotoUpdate.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default PhotoUpdate;
