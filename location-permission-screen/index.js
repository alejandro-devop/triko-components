import React, {useEffect, useState} from 'react';
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
  const [readyToCheck, setReadyToCheck] = useState(false);
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
      setReadyToCheck(true);
    }, 1000);
  }, []);

  return (
    <>
      {readyToCheck && !hasPermission && !hidePermissionsDialog && (
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
