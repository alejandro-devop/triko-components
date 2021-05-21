import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import CheckerComponent from './CheckerComponent';
import {useSession} from 'hooks/index';

const TrackingPermissionChecker = ({children, shouldRequest}) => {
  const {setKey} = useSession();
  useEffect(() => {
    if (Platform.OS === 'android') {
      setKey('trackingPermissions', true);
    }
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <CheckerComponent shouldRequest={shouldRequest} />
      )}
      {children}
    </>
  );
};

export default TrackingPermissionChecker;
