import React, {useRef} from 'react';
import {Linking, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ScrollView from 'shared/components/commons/scrollview';
import DestinationMarker from 'components/base/destination-marker';
import {isEmpty} from 'shared/utils/functions';
import TrikoMarker from 'components/base/triko-marker';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import palette from 'themes/styles/palette';
import CircleButton from 'shared/components/base/buttons/bordered-button';
import Dialog from 'shared/components/dialogs/dialog';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const PADDING = 20;
const edgePadding = {
  left: PADDING,
  top: PADDING * 4,
  right: PADDING,
  bottom: PADDING,
};

const MapRender = ({
  destination = {},
  onClose,
  onDirectionReady,
  open,
  origin = {},
  title,
  photo,
}) => {
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;
  const mapRef = useRef(null);
  const [classes] = useStyles(styles);
  const handleViewMap = () => {
    Linking.openURL(
      `https://waze.com/ul?ll=${destination.latitude},${destination.longitude}&navigate=yes`,
    ).catch((error) => {});
  };
  const initializeMap = () => {
    const panCoords = [];
    if (destination.latitude && destination.longitude) {
      panCoords.push(destination);
    }
    if (origin.latitude && origin.longitude) {
      panCoords.push(origin);
    }
    mapRef.current.fitToCoordinates(panCoords, {
      animated: true,
      edgePadding,
    });
  };
  const {latitude: desLatitude, longitude: desLongitude} = destination;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      contentStyles={classes.root}
      disableScroll
      title={title}>
      <ScrollView>
        <View style={classes.mapWrapper}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            onMapReady={initializeMap}
            // cacheEnabled={true}
            // pitchEnabled={false}
            // rotateEnabled={false}
            // scrollEnabled={false}
            // zoomEnabled={false}
            // pointerEvents="none"
            // showsCompass={false}
            // showsBuildings={false}
            // showsTraffic={false}
            // zoomTapEnabled={false}
            // zoomControlEnabled={false}
            style={classes.map}
            initialRegion={{
              latitude: parseFloat(origin.latitude),
              longitude: parseFloat(origin.longitude),
              latitudeDelta,
              longitudeDelta,
            }}>
            <DestinationMarker
              position={{
                lat: parseFloat(desLatitude),
                lng: parseFloat(desLongitude),
              }}
            />
            {!isEmpty(origin.latitude) && !isEmpty(origin.longitude) && (
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
      </ScrollView>
    </Dialog>
  );
};

export default MapRender;
