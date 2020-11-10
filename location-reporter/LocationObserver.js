import React, {useEffect} from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import useLocationObserver from 'shared/hooks/use-location-observer';
import {useSession, useStyles} from 'hooks/index';

/**
 * This component watches the user location and
 * @param interval
 * @returns {null}
 * @constructor
 */
const LocationObserver = ({interval = 10000, onLocationChange}) => {
  const [classes] = useStyles(styles);
  const {
    initialize,
    initialized,
    location,
    stopObserver,
  } = useLocationObserver();
  const {
    stack: {currentLocation = {}},
  } = useSession();
  let timer = null;

  /**
   * We use this function so we can transfer the fresh location.
   * @returns {Promise<void>}
   */
  const changePosition = async (newLocation) => {
    const {latitude, longitude} = newLocation;
    const hasChanged =
      latitude !== currentLocation.latitude &&
      longitude !== currentLocation.longitude;
    if (onLocationChange && hasChanged) {
      onLocationChange(newLocation);
    }
  };

  // useEffect(() => {
  //   // timer = setInterval(() => {
  //   //   changePosition();
  //   // }, interval);
  // }, [location]);
  useEffect(() => {
    changePosition(location);
  }, [location, currentLocation]);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
    timer = setInterval(() => {
      // changePosition();
    }, interval);
    return () => {
      console.clear();
      console.log('Clearing observer!');
      stopObserver();
      clearInterval(timer);
    };
  }, []);
  return (
    <View style={classes.root}>
      <Text style={classes.text}>lat: {location.latitude}</Text>
      <Text style={classes.text}>lng: {location.longitude}</Text>
    </View>
  );
};

const styles = () => ({
  root: {
    position: 'absolute',
    zIndex: 10000,
    bottom: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    left: 10,
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  text: {
    fontSize: 14,
  },
});

export default LocationObserver;
