import React, {useEffect, useState} from 'react';
import {useSession} from 'hooks/index';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import PermissionDialog from './permission-dialog';
import GPSMessage from 'shared/components/location-permission-screen/gps-message';
import NoTrackingPermission from './no-tracking-permission';

const LocationPermissionScreen = ({
  children,
  disableDialog,
  hide,
  hideAskAgain,
  disableCancel,
  fallBack,
  features = [
    'permissions_feature_1',
    'permissions_feature_2',
    'permissions_feature_3',
    'permissions_feature_4',
  ],
  styles = {},
}) => {
  const {
    stack: {
      hidePermissionsDialog,
      notShowAgain,
      gpsEnabled,
      trackingPermissions,
    },
    setKey,
    setAll,
  } = useSession();
  const [open, setOpen] = useState(false);
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
      setOpen(true);
      if (!notShowAgain && !hasPermission) {
        setKey('hidePermissionsDialog', false);
      }
    }, 1500);
  }, []);

  if (!trackingPermissions) {
    return <NoTrackingPermission />;
  }

  const getContent = () => {
    if (hide && !hasPermission) {
      return null;
    }
    if (hasPermission && !gpsEnabled) {
      return <GPSMessage />;
    }
    return children;
  };
  return (
    <>
      {!hasPermission && fallBack && fallBack()}
      {!hasPermission && !hidePermissionsDialog && open && (
        <PermissionDialog
          disableDialog={disableDialog}
          disableCancel={disableCancel}
          hideAskAgain={hideAskAgain}
          features={features}
          onGranted={handleGranted}
          open
          onClose={closeDialog}
          styles={styles}
        />
      )}
      {getContent()}
    </>
  );
};

export default LocationPermissionScreen;
