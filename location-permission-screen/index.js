import React, {useEffect} from 'react';
import {useSession} from 'hooks/index';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import PermissionDialog from './permission-dialog';

const LocationPermissionScreen = ({children, features = []}) => {
  const {
    stack: {hidePermissionsDialog, notShowAgain},
    setKey,
    setAll,
  } = useSession();
  const closeDialog = (notShow) => {
    if (notShow === true) {
      setAll({
        hidePermissionsDialog: true,
        notShowAgain: true,
      });
    } else {
      setKey('hidePermissionsDialog', true);
    }
  };
  const {appPermissions = {}, reCheck} = useHasPermissions({
    permissions: [APP_PERMISSIONS.ACCESS_LOCATION],
  });
  const hasPermission =
    appPermissions[APP_PERMISSIONS.ACCESS_LOCATION] === true;

  const handleGranted = async () => {
    reCheck();
    setKey('hidePermissionsDialog', true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!notShowAgain && !hasPermission) {
        setKey('hidePermissionsDialog', false);
      }
    }, 1000);
  }, []);
  return (
    <>
      {!hasPermission && !hidePermissionsDialog && (
        <PermissionDialog
          features={features}
          onGranted={handleGranted}
          open
          onClose={closeDialog}
        />
      )}
      {children}
    </>
  );
};

export default LocationPermissionScreen;
