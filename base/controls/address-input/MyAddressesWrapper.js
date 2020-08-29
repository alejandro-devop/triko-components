import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import MyAddressesList from 'shared/components/my-address-list';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';

const MyAddressesWrapper = ({open, onAddAddress, onClose}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Dialog
      contentStyles={classes.root}
      open={open}
      onClose={onClose}
      title={_t('my_address_title')}>
      <MyAddressesList onAddAddress={onAddAddress} />
    </Dialog>
  );
};

const styles = () => ({
  root: {
    maxHeight: '80%',
    height: '80%',
  },
});

export default MyAddressesWrapper;
