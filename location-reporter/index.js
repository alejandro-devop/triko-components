import React, {useEffect} from 'react';
import useHasPermissions, {
  APP_PERMISSIONS,
} from 'shared/hooks/use-has-permissions';
import GetUserLocation from './GetUserLocation';
import useUserPositionUpdate from 'shared/hooks/use-user-position-update';
import {isEmpty} from 'shared/utils/functions';

/**
 * This component validates that the user can access the device location
 * if so, it instances the location finder component, which gets the user location
 * using an interval of 30 seconds by default, every cycle it saves the user current location.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param interval
 * @returns {null|*}
 * @constructor
 */
const LocationReporter = ({interval = 10000}) => {
  let timer = null;
  const {updateLocation} = useUserPositionUpdate();
  const {appPermissions, reCheck} = useHasPermissions({
    permissions: [APP_PERMISSIONS.ACCESS_LOCATION],
  });
  const hasPermission =
    appPermissions[APP_PERMISSIONS.ACCESS_LOCATION] === true;
  /**
   * This function checks if the user has permission to access location,
   * if so, it clears an interval which checks for permissions every 10 seconds by default.
   * @returns {Promise<void>}
   */
  const checkLocationPermissions = async () => {
    await reCheck();
    if (appPermissions.location === true) {
      clearTimeout(timer);
    }
  };

  /**
   * This function is called when the user location is fetched.
   * @param locationInfo
   * @returns {Promise<void>}
   */
  const handleLocationChange = async (locationInfo = {}) => {
    const {latitude, longitude} = locationInfo;
    if (!isEmpty(latitude) && !isEmpty(longitude)) {
      await updateLocation({lat: latitude, lng: longitude});
    }
  };

  useEffect(() => {
    /**
     * If the user has no permission to location we need to ensure we detect
     * when the user granted this permission, this interval checks every 10 seconds for that
     * permission.
     */
    if (!hasPermission) {
      timer = setInterval(() => {
        checkLocationPermissions();
      }, interval);
    }
    return () => {
      clearInterval(timer);
    };
  }, [appPermissions]);

  if (hasPermission) {
    return <GetUserLocation onLocationChange={handleLocationChange} />;
  }
  return null;
};

export default LocationReporter;
