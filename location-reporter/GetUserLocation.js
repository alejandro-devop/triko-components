import React from 'react';
import {useSession} from 'hooks/index';
import IntervalControl from 'shared/components/commons/interval-control';
import useUserLocation from 'shared/hooks/use-user-location';

/**
 * This component gets the user location every 30 seconds
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param interval
 * @param onLocationChange
 * @returns {*}
 * @constructor
 */
const GetUserLocation = ({interval = 10000, onLocationChange}) => {
  const {
    stack: {currentLocation = {}},
  } = useSession();
  const {loading, getLocation} = useUserLocation({
    onLocationFound: (newPos) => {
      checkUserPosition(newPos);
    },
  });

  const checkUserPosition = ({lat, lng}) => {
    const {latitude, longitude} = currentLocation;
    if (latitude !== lat && lng !== longitude) {
      const newPos = {latitude: lat, longitude: lng};
      if (onLocationChange) {
        onLocationChange(newPos);
      }
    }
  };

  const handleTimeCycle = async () => {
    await getLocation();
  };
  return (
    <>
      {!loading && (
        <IntervalControl interval={interval} onCycle={handleTimeCycle} />
      )}
    </>
  );
};

export default GetUserLocation;
