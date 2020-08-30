import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'shared/components/base/map-marker';

/**
 * This component allows to display the location of a given address
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param address
 * @returns {null|*}
 * @constructor
 */
const MapPreview = ({location = {}}) => {
  const [classes] = useStyles(styles);

  const latitudeDelta = 0.005;
  const longitudeDelta = 0.005;
  const {lat: latitude, lng: longitude} = location || {};

  if (!location.lat && !location.lng) {
    // ToDo: Catch the address error
    return null;
  }

  return (
    <View style={classes.mapViewWrapper}>
      <MapView
        showsUserLocation
        pointerEvents="none"
        showsCompass={false}
        showsBuildings={false}
        showsTraffic={false}
        zoomTapEnabled={false}
        zoomControlEnabled={false}
        cacheEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={classes.mapView}
        region={{
          longitude: longitude,
          latitude: latitude,
          latitudeDelta,
          longitudeDelta,
        }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
      />
      <MapMarker wrapperStyles={classes.marker} />
    </View>
  );
};

const styles = () => ({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    transform: [{translateX: -25}, {translateY: -50}],
  },
  mapViewWrapper: {
    height: 300,
    width: '100%',
    backgroundColor: 'red',
    // maxHeight: 180,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});

MapPreview.propTypes = {
  address: PropTypes.any,
  addressObject: PropTypes.any,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  defaultLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  onLocationFound: PropTypes.func,
};

export default MapPreview;
