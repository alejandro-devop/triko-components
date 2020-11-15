import React, {useRef} from 'react';
import styles from './styles';
import {Linking} from 'react-native';
import {useStyles} from 'hooks/index';
import Dialog from 'shared/components/dialogs/dialog';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import DestinationMarker from 'components/base/destination-marker';
import TrikoMarker from 'components/base/triko-marker';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import palette from 'themes/styles/palette';
import {View} from 'react-native';
import {isEmpty} from 'shared/utils/functions';
import CircleButton from 'shared/components/base/buttons/bordered-button';

const PADDING = 20;
const edgePadding = {
  left: PADDING,
  top: PADDING * 4,
  right: PADDING,
  bottom: PADDING,
};

const ViewOnMap = ({
  open,
  onClose,
  destination = {},
  onDirectionReady,
  triko = {},
  title,
}) => {
  const mapRef = useRef(null);
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;
  const [classes] = useStyles(styles);
  const {user = {}} = triko;
  const {photo_url: photo} = user;
  const userAttrs = JSON.parse(user.attrs || '{}');
  const {latitude, longitude} = destination;
  const origin = {
    latitude: userAttrs.latitude,
    longitude: userAttrs.longitude,
  };

  const handleViewMap = () => {
    Linking.openURL(
      `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`,
    ).catch((error) => {});
  };

  const initializeMap = () => {
    const panCoords = [];
    if (destination.latitude && destination.longitude) {
      panCoords.push(destination);
    }
    if (userAttrs.latitude && userAttrs.longitude) {
      panCoords.push(origin);
    }
    mapRef.current.fitToCoordinates(panCoords, {
      animated: true,
      edgePadding,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      contentStyles={classes.root}
      title={title}>
      <View style={classes.mapWrapper}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          onMapReady={initializeMap}
          cacheEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          pointerEvents="none"
          showsCompass={false}
          showsBuildings={false}
          showsTraffic={false}
          zoomTapEnabled={false}
          zoomControlEnabled={false}
          style={classes.map}
          initialRegion={{
            latitude: parseFloat(origin.latitude),
            longitude: parseFloat(origin.longitude),
            latitudeDelta,
            longitudeDelta,
          }}>
          <DestinationMarker
            position={{lat: parseFloat(latitude), lng: parseFloat(longitude)}}
          />
          {!isEmpty(userAttrs.latitude) && !isEmpty(origin.longitude) && (
            <TrikoMarker
              avatar={photo}
              position={{lat: origin.latitude, lng: origin.longitude}}
            />
          )}
          <MapViewDirections
            onReady={onDirectionReady}
            origin={destination}
            destination={origin}
            apikey={GOOGLE_API_KEY}
            strokeColor={palette.blue}
            strokeWidth={5}
          />
        </MapView>
      </View>
      <View style={classes.actions}>
        <CircleButton
          onPress={handleViewMap}
          icon="map"
          primary
          label="open_in_maps"
        />
      </View>
    </Dialog>
  );
};

export default ViewOnMap;
