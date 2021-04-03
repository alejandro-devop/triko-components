import React, {useEffect, useRef} from 'react';
import GPSState from 'react-native-gps-state';
import {useSession} from 'hooks/index';

const GpsChecker = ({children}) => {
  const checkState = useRef(null);
  const {setKey} = useSession();
  const handleCheckState = async () => {
    try {
      const state = await GPSState.getStatus();
      switch (state) {
        case GPSState.NOT_DETERMINED:
          break;
        case GPSState.RESTRICTED:
          // GPSState.openLocationSettings();
          setKey('gpsEnabled', false);
          break;

        case GPSState.DENIED:
          // alert('It`s a shame that you do not allowed us to use location :(');
          break;

        case GPSState.AUTHORIZED_ALWAYS:
          setKey('gpsEnabled', true);
          break;

        case GPSState.AUTHORIZED_WHENINUSE:
          setKey('gpsEnabled', true);
          break;
      }
    } catch (e) {
      console.clear();
      console.log('Error while validating: ', e);
    }
  };
  useEffect(() => {
    checkState.current = handleCheckState;
    checkState.current();
  }, []);
  return <>{children}</>;
};

export default GpsChecker;
