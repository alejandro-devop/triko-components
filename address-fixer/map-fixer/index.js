import React, {useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'shared/components/base/map-marker';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'components/base/buttons/button';

/**
 * This component presents a map tool to fix the location for a given  address, it
 * also allows to edit the given address.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param location
 * @param address
 * @returns {*}
 * @constructor
 */
const MapFixer = ({location = {}, updateAddress}) => {
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

MapFixer.propTypes = {};

export default MapFixer;
