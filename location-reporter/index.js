import React, {useEffect, useState} from 'react';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import useLocationObserver from 'shared/hooks/use-location-observer';
import {useSession} from 'hooks/index';

const LocationObserver = ({interval = 5000}) => {
  const {
    initialize,
    location = {},
    stopObserver,
    initialized,
  } = useLocationObserver();
  const {
    setAll,
    stack: {currentLocation = {}},
  } = useSession();
  let timer = null;

  const checkPosition = () => {
    const previous = {...currentLocation};
    const current = {...location};
    if (previous.latitude !== current.latitude) {
      const newPositionInfo = {
        previousLocation: previous,
        currentLocation: current,
      };
      setAll(newPositionInfo);
    }
  };

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
    timer = setInterval(() => {
      checkPosition();
    }, interval);

    return () => {
      stopObserver();
      clearInterval(timer);
    };
  }, []);

  return null;
};

const LocationReporter = ({delay = 3000}) => {
  const [shouldStart, setShouldStart] = useState(false);
  const {appPermissions} = useHasPermissions({
    permissions: [APP_PERMISSIONS.ACCESS_LOCATION],
  });
  useEffect(() => {
    setTimeout(() => {
      setShouldStart(true);
    }, delay);
  }, []);

  if (shouldStart && appPermissions[APP_PERMISSIONS.ACCESS_LOCATION] === true) {
    return <LocationObserver />;
  }
  return null;
};

export default LocationReporter;
