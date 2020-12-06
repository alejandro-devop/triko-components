import React, {useState, useEffect, useCallback} from 'react';
import {Linking, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import BoxControl from './box-control';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from 'shared/components/permissions-manager';
import {request} from 'react-native-permissions';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';

const LocationPermissionChecker = () => {
  const [visible, setVisible] = useState(true);
  const {appPermissions, reCheck} = useHasPermissions({
    permissions: [APP_PERMISSIONS.ACCESS_LOCATION],
  });
  let timer = null;
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/location-permission-checker/index.js',
  });

  useEffect(() => {
    if (!appPermissions[APP_PERMISSIONS.ACCESS_LOCATION]) {
      timer = setInterval(() => {
        reCheck();
      }, 5000);
    } else {
      clearInterval(timer);
    }
    if (appPermissions[APP_PERMISSIONS.ACCESS_LOCATION] && visible) {
      setVisible(false);
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [appPermissions, visible]);

  if (appPermissions[APP_PERMISSIONS.ACCESS_LOCATION] || !visible) {
    return null;
  }

  const handleRequestPermissions = async () => {
    try {
      const permissionName =
        Platform.OS === 'ios'
          ? IOS_PERMISSIONS.location
          : ANDROID_PERMISSIONS.location;
      const response = await request(permissionName);
      if (response === 'unavailable' || response === 'blocked') {
        Linking.openSettings();
      } else if (response === 'granted') {
        setVisible(false);
      }
    } catch (e) {
      reportError(e);
      error('Error while requesting the permission');
    }
  };
  return visible ? (
    <BoxControl onRequestPermissions={handleRequestPermissions} />
  ) : null;
};

export default LocationPermissionChecker;
