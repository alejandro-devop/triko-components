import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'shared/components/base/map-marker';
import useNotify from 'shared/hooks/use-notification';
import useAddressFinder from 'hooks/useAddressFinder';
import {TextField} from 'shared/components/base/controls';
import {CircleButton} from 'shared/components/base/buttons';
import {isEmpty} from 'shared/utils/functions';
import classNames from 'shared/utils/classnames';
import useKeyboard from 'shared/hooks/use-keyboard';
import useUserLocation from 'hooks/useUserLocation';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';

const AddressMapPicker = ({onCancel, onAccept, enableMarker}) => {
  const [classes] = useStyles(styles);
  const [mapLocation, setMapLocation] = useState({});
  const {location = {}, loading} = useUserLocation();
  const [visibleKeyboard] = useKeyboard();
  const [addressToFix, setAddressToFix] = useState(null);
  const [shouldReFetchAddress, setShouldReFetchAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);
  const {getLocationInfo} = useAddressFinder();
  const {error} = useNotify();
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;

  const onMapMove = async ({latitude: lat, longitude: lng}) => {
    try {
      const info = await getLocationInfo({lat, lng});
      setMapLocation({lat, lng});
      const {address: newAddress} = info;
      setAddressToFix(newAddress);
      setShouldReFetchAddress(true);
    } catch (err) {
      console.log('Error checking bounds', err);
      error('Error checking the bound');
    }
  };

  const onSaveAddress = () => {
    setEditingAddress(false);
  };

  const onCancelEdit = () => {
    setEditingAddress(false);
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
  const {lat: latitude, lng: longitude} = location || {};
  return (
    <View
      style={classNames({root: true, rootEditing: visibleKeyboard}, classes)}>
      {(loading || loadingMap) && <LoadingCurtain disableModal />}
      {!loading && !isEmpty(latitude) && !isEmpty(longitude) && (
        <>
          <View style={classes.mapViewWrapper}>
            <MapView
              showsCompass
              onMapLoaded={() => setLoadingMap(false)}
              showsUserLocation
              provider={PROVIDER_GOOGLE}
              style={classNames({mapView: true}, classes)}
              onRegionChangeComplete={onMapMove}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta,
              }}>
              {enableMarker && (
                <MapView.Marker
                  coordinate={{
                    latitude: mapLocation.lat,
                    longitude: mapLocation.lng,
                  }}
                  title={'title'}
                  description={'description'}
                />
              )}
            </MapView>
            <MapMarker wrapperStyles={classes.marker} />
            <View style={classes.addressDisplay}>
              {!loading && (
                <>
                  <View style={classes.addressTextWrapper}>
                    {!editingAddress && (
                      <Text style={classes.addressDisplayText}>
                        {addressToFix}
                      </Text>
                    )}
                    {editingAddress && (
                      <TextField
                        primary
                        value={addressToFix}
                        onChange={({target: {value}}) => setAddressToFix(value)}
                      />
                    )}
                  </View>
                  <View style={classes.addressActionsWrapper}>
                    {!editingAddress && (
                      <CircleButton
                        name="pen"
                        size="sm"
                        onPress={() => setEditingAddress(true)}
                      />
                    )}
                    {editingAddress && (
                      <>
                        <CircleButton
                          primary
                          size="sm"
                          name="check"
                          onPress={onSaveAddress}
                        />
                        <CircleButton
                          name="times"
                          size="sm"
                          onPress={onCancelEdit}
                        />
                      </>
                    )}
                  </View>
                </>
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
        </>
      )}
    </View>
  );
};

AddressMapPicker.propTypes = {
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

export default AddressMapPicker;
