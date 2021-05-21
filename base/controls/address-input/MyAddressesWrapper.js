import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import ScrollView from 'shared/components/commons/scrollview';
import MyAddressesList from 'shared/components/my-address-list';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';

/**
 * My AddressesList Component is isolated and it has not dialog, so we
 * use this wrapper to place it inside a dialog.
 * @param enableAddButton
 * @param isTriko
 * @param disableRemove
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
  disableRemove,
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
      disableScroll
      open={open}
      onClose={onClose}
      title={_t('my_address_title')}>
      <ScrollView>
        <MyAddressesList
          disableRemove={disableRemove}
          enableAddButton={enableAddButton}
          isTriko={isTriko}
          onAddAddress={onAddAddress}
          onSelectAddress={onSelectAddress}
          useWizard={useWizard}
        />
      </ScrollView>
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
