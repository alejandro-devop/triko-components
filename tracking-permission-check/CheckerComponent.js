import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import {useSession} from 'hooks/index';

const CheckerComponent = () => {
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

  useEffect(() => {
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
