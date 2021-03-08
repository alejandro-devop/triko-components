import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'components/base/text';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'shared/components/base/map-marker';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component presents a map tool to fix the location for a given  address, it also allows to edit the given address.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param location
 * @param address
 * @returns {*}
 * @constructor
 */
const MapFixer = ({location, updateAddress}) => {
  const {lat: latitude, lng: longitude} = location || {};
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;

  const onMapMove = async ({latitude: lat, longitude: lng}) => {
    if (updateAddress) {
      updateAddress({lat, lng});
    }
  };

  if (!location) {
    return null;
  }
  return (
    <View style={classes.root}>
      <View style={classes.mapWrapper}>
        <MapView
          showsCompass
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={classNames({mapView: true}, classes)}
          onRegionChangeComplete={onMapMove}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        />
        <MapMarker wrapperStyles={classes.marker} />
        <View style={classes.topPlaceholder}>
          <Text style={classes.placeholder}>
            {_t('map_fixer_top_placeholder')}
          </Text>
        </View>
      </View>
    </View>
  );
};
MapFixer.defaultProps = {
  location: {},
};
MapFixer.propTypes = {
  // The current location to be fixed
  location: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  updateAddress: PropTypes.func, // A function which will be triggered when the user moves the map marker.
};

export default MapFixer;
