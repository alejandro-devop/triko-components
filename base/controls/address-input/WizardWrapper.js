import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import useTranslation from 'hooks/useTranslation';
import useStyles from 'shared/hooks/use-styles';

const WizardWrapper = ({children, open, onClose, title}) => {
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={_t(title || 'add_address_title')}
      disableScroll
      contentStyles={classes.root}>
      {children}
    </Dialog>
  );
};

const styles = () => ({
  root: {
    maxHeight: 600,
    height: '90%',
  },
});

export default WizardWrapper;
