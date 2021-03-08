import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSession} from 'hooks/index';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import PermissionDialog from './permission-dialog';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

/**
 * Component that displays a message to allow the location permissions
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @param disableDialog
 * @param onClose
 * @param hide
 * @param hideAskAgain
 * @param features
 * @returns {*}
 * @constructor
 */
const LocationPermissionScreen = ({
  children,
  disableDialog,
  onClose,
  hide,
  hideAskAgain,
  features,
}) => {
  const {
    stack: {hidePermissionsDialog, notShowAgain},
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
    if (onClose) {
      onClose();
    }
  };
  const {loading, appPermissions = {}, reCheck} = useHasPermissions({
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

  const getContent = () => {
    if (hide && !hasPermission) {
      return null;
    }
    return children;
  };

  return (
    <>
      {!hasPermission && !hidePermissionsDialog && open && (
        <PermissionDialog
          loading={loading}
          disableDialog={disableDialog}
          hideAskAgain={hideAskAgain}
          features={features}
          onGranted={handleGranted}
          open
          onClose={closeDialog}
        />
      )}
      {getContent()}
      {hidePermissionsDialog && hide && !hasPermission && (
        <LoadingCurtain disableModal />
      )}
    </>
  );
};

LocationPermissionScreen.defaultProps = {
  features: [
    'permissions_feature_1',
    'permissions_feature_2',
    'permissions_feature_3',
    'permissions_feature_4',
  ],
};

LocationPermissionScreen.propTypes = {
  children: PropTypes.node, // Component which will be wrapped by the permission
  disableDialog: PropTypes.bool, // Controls whether the component displays a dialog or not.
  onClose: PropTypes.func, // Function to close the dialog (In case disable dialog is false
  hide: PropTypes.bool, // Hide the content wrapped for this component if the permission is not granted.
  hideAskAgain: PropTypes.bool, // Hide the option "Ask again"
  features: PropTypes.arrayOf(PropTypes.string), // Array of features why you need this permission (must be a text target of translation).
};

export default LocationPermissionScreen;
