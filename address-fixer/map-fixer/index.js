import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'shared/components/base/map-marker';
import useAddressFinder from 'hooks/useAddressFinder';
import {TextField} from 'shared/components/base/controls';
import {CircleButton} from 'shared/components/base/buttons';
import {isEmpty} from 'shared/utils/functions';
import classNames from 'shared/utils/classnames';
import useKeyboard from 'shared/hooks/use-keyboard';

/**
 * This component presents a map tool to fix the location for a given  address, it
 * also allows to edit the given address.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client
 * @param location
 * @param address
 * @param circleDiameter
 * @param onCancel
 * @param onAccept
 * @returns {*}
 * @constructor
 */
const MapFixer = ({location = {}, address, onCancel, onAccept}) => {
  const {lat: latitude, lng: longitude} = location;
  const [classes] = useStyles(styles);
  const [mapLocation, setMapLocation] = useState(location);
  const [visibleKeyboard] = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [addressToFix, setAddressToFix] = useState(address);
  const {getLocationInfo} = useAddressFinder();
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;

  const onMapMove = async ({latitude: lat, longitude: lng}) => {
    const info = await getLocationInfo({lat, lng});
    const {address: newAddress} = info;
    setAddressToFix(newAddress);
    setMapLocation({lat, lng});
  };

  const handleAccept = () => {
    if (onAccept) {
      onAccept({
        address: addressToFix,
        location: {
          lat: mapLocation.lat,
          lng: mapLocation.lng,
        },
      });
    }
  };

  return (
    <View
      style={classNames({root: true, rootEditing: visibleKeyboard}, classes)}>
      <View style={classes.mapViewWrapper}>
        <MapView
          showsCompass
          onMapLoaded={() => setLoading(false)}
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
        <View style={classes.addressDisplay}>
          {!loading && (
            <View style={classes.addressTextWrapper}>
              <TextField
                primary
                value={addressToFix}
                onChange={({target: {value}}) => setAddressToFix(value)}
              />
            </View>
          )}
        </View>
        <View style={classes.footerButton}>
          {!loading && (
            <>
              <CircleButton
                disabled={isEmpty(addressToFix)}
                primary
                name="check"
                onPress={handleAccept}
              />
              <CircleButton name="times" onPress={onCancel} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

MapFixer.propTypes = {
  address: PropTypes.string,
  circleDiameter: PropTypes.number,
  enableMarker: PropTypes.bool,
  fillColor: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  strokeColor: PropTypes.string,
};

export default MapFixer;
