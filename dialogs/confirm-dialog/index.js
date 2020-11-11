import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import Text from 'shared/components/base/text';
import Dialog from 'shared/components/dialogs/dialog';
import CircleButton from 'shared/components/base/buttons/circle-button';

/**
 * This component renders a dialog modal which offers two options, accept or cancel
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param message
 * @param onAccept
 * @param onCancel
 * @param onClose
 * @param open
 * @param title
 * @returns {*}
 * @constructor
 */
const ConfirmDialog = ({message, onAccept, onCancel, onClose, open, title}) => {
  const [classes] = useStyles(styles);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      contentStyles={classes.root}
      title={title}>
      <View style={classes.messageContent}>
        <Text style={classes.message}>{message}</Text>
      </View>
      <View style={classes.actions}>
        <CircleButton name="times" onPress={onCancel} size="lg" />
        <CircleButton name="check" onPress={onAccept} primary size="lg" />
      </View>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  message: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default ConfirmDialog;
