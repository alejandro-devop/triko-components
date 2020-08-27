import React from 'react';
import Dialog from 'components/base/dialogs/dialog';
import useStyles from 'hooks/useStyles';

const MyAddressesList = ({open, onClose}) => {
  const [classes] = useStyles(styles);
  return (
    <Dialog
      contentStyles={classes.root}
      disableScroll
      onClose={onClose}
      open={open}
      title={'My addresses book'}>
      {null}
    </Dialog>
  );
};

const styles = () => ({
  root: {
    maxHeight: '90%',
    height: '90%',
  },
});

export default MyAddressesList;