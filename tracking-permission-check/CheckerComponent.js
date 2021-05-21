import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import {useSession} from 'hooks/index';

const CheckerComponent = ({shouldRequest}) => {
  const {
    setKey,
    stack: {trackingPermissions},
  } = useSession();
  let timer = null;

  const checkStatus = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'denied') {
      setKey('trackingPermissions', false);
    } else if (trackingStatus === 'authorized') {
      setKey('trackingPermissions', true);
    } else {
      setKey('trackingPermissions', false);
    }
  };

  const requestStatus = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'not-determined') {
      const response = await requestTrackingPermission();
      if (response === 'denied') {
        setKey('trackingPermissions', false);
      } else if (response === 'authorized') {
        setKey('trackingPermissions', true);
      }
    } else if (trackingStatus === 'denied') {
      setKey('trackingPermissions', false);
    }
  };

  useEffect(() => {
    if (shouldRequest) {
      requestStatus();
    }
    if (trackingPermissions === false) {
      timer = setInterval(() => {
        checkStatus();
      }, 8000);
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkStatus();
      if (trackingPermissions === false) {
        checkStatus();
      }
      return () => {};
    }, []),
  );
  return <></>;
};

export default CheckerComponent;
