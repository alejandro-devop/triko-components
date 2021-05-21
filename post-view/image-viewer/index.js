import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import PreImage from 'shared/components/base/pre-image';

/**
 * Renders a post image
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param open
 * @param onClose
 * @param image
 * @returns {*}
 * @constructor
 */
const ImageViewer = ({open, onClose, image = {}}) => {
  const [classes] = useStyles(styles);
  return (
    <Dialog contentStyles={classes.root} open={open} onClose={onClose}>
      <PreImage style={classes.image} source={{uri: image.url}} />
    </Dialog>
  );
};

export default ImageViewer;
