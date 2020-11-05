import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import {useStyles} from 'hooks/index';
import styles from './styles';

const WizardDialog = ({children, open, onClose}) => {
  const [classes] = useStyles(styles);
  return (
    <Dialog onClose={onClose} open={open} contentStyles={classes.root}>
      {children}
    </Dialog>
  );
};

export default WizardDialog;
