import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import classNames from 'shared/utils/classnames';
import MapMarker from 'shared/components/base/map-marker';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';
import useCurrentLocation from 'shared/hooks/use-current-location';
import LoaderScreen from 'shared/components/loaders/loader-screen';
import {isEmpty} from 'shared/utils/functions';

const AddressMapPicker = ({onChange}) => {
  const [classes] = useStyles(styles);
  const {loading, position, getCurrentLocation} = useCurrentLocation();
  const {_t} = useTranslation();
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;

  const onMapMove = async ({latitude: lat, longitude: lng}) => {
    if (onChange) {
      onChange({lat, lng});
    }
  };

  const getUserLocation = async () => {
    await getCurrentLocation();
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={classes.root}>
      {loading && (
        <View style={classes.loaderWrapper}>
          <LoaderScreen />
        </View>
      )}
      {!loading && !isEmpty(position.lat) && (
        <View style={classes.mapWrapper}>
          <MapView
            showsCompass
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={classNames({mapView: true}, classes)}
            onRegionChangeComplete={onMapMove}
            initialRegion={{
              latitude: position.lat,
              longitude: position.lng,
              latitudeDelta,
              longitudeDelta,
            }}
          />
          <MapMarker wrapperStyles={classes.marker} />
        </View>
      )}
    </View>
  );
};

const styles = () => ({
  loaderWrapper: {
    alignItems: 'center',
    height: 200,
  },
  marker: {
    position: 'absolute',
    top: 130,
    left: '50%',
    width: 50,
    height: 50,
    transform: [{translateX: -25}, {translateY: -50}],
  },
  mapWrapper: {
    marginTop: 10,
    height: 260,
  },
  mapView: {
    height: 260,
  },
  root: {},
});

export default AddressMapPicker;
