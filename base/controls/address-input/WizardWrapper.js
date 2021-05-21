import React from 'react';
import Dialog from 'shared/components/dialogs/dialog';
import useTranslation from 'shared/hooks/use-translate';
import {useStyles} from '@triko-app/hooks';
import PermissionsManager from 'shared/components/permissions-manager';

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
      <PermissionsManager
        permissions={['location']}
        message={_t('permissions_location_explanation_address')}>
        {children}
      </PermissionsManager>
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
