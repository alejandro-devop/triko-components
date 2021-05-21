import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import GPSState from 'react-native-gps-state';
import PrettyIcon from 'shared/components/pretty-icon';
import {useFocusEffect} from '@react-navigation/native';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import InfoMessage from 'shared/components/messages/InfoMessage';
import Button from 'shared/components/base/buttons/button';
import {set} from 'react-native-reanimated';

const GPSMessage = () => {
  const [classes] = useStyles(styles);
  const {
    setKey,
    stack: {gpsEnabled},
  } = useSession();
  let timer = null;
  const handleCheckState = async () => {
    try {
      console.log('Checking state...');
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
    } catch (e) {}
  };

  const onPress = () => {
    GPSState.openLocationSettings();
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Focus!');
      handleCheckState();
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (!gpsEnabled) {
      timer = setInterval(() => {
        handleCheckState();
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={classes.root}>
      <PrettyIcon name="location-arrow" size="sm" />
      <InfoMessage text="gps_disabled_message" />
      <View style={classes.actions}>
        <Button primary onPress={onPress}>
          enable_location_service
        </Button>
      </View>
    </View>
  );
};

const styles = () => ({
  root: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default GPSMessage;
