import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import useTranslation from 'hooks/useTranslation';
import classNames from 'shared/utils/classnames';
import PreImage from 'shared/components/base/pre-image';
import useStyles from 'shared/hooks/use-styles';

const PhotoDialog = ({open, photo, onClose}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();

  return (
    <Dialog
      contentStyles={classNames({defaultDialog: true}, classes)}
      title={_t('image_picker_view_photo')}
      open={open}
      onClose={onClose}>
      <PreImage source={{uri: photo}} style={classes.image} />
    </Dialog>
  );
};

const styles = () => ({
  defaultDialog: {
    height: 500,
  },
  image: {
    minHeight: 500,
    maxWidth: 500,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PhotoDialog;
