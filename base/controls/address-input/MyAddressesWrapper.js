import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import MyAddressesList from 'shared/components/my-address-list';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';

/**
 * My AddressesList Component is isolated and it has not dialog, so we
 * use this wrapper to place it inside a dialog.
 * @param enableAddButton
 * @param isTriko
 * @param useWizard
 * @param open
 * @param onAddAddress
 * @param onSelectAddress
 * @param onClose
 * @returns {*}
 * @constructor
 */
const MyAddressesWrapper = ({
  enableAddButton,
  isTriko,
  open,
  onAddAddress,
  onSelectAddress,
  onClose,
  useWizard,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Dialog
      contentStyles={classes.root}
      open={open}
      onClose={onClose}
      title={_t('my_address_title')}>
      <MyAddressesList
        enableAddButton={enableAddButton}
        isTriko={isTriko}
        onAddAddress={onAddAddress}
        onSelectAddress={onSelectAddress}
        useWizard={useWizard}
      />
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
