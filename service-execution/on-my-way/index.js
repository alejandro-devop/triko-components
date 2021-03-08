import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from 'hooks';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import TrikoMarker from 'main/components/base/triko-marker';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import palette from 'themes/styles/palette';
import {CircleButton} from 'components/base/buttons';
import Label from 'components/base/label';
import {useMutation} from '@apollo/react-hooks';
import useNotify from 'shared/hooks/use-notification';
import LoadingCurtain from 'components/base/dialogs/loading-curtain';
import {STATUS_ACCEPTED} from 'config/request-statuses';
import {UPDATE_REQUEST} from 'components/pending-services-/queries';
import useTranslation from 'shared/hooks/use-translate';
import DestinationMarker from 'components/base/destination-marker';
import useSession from 'hooks/useSession';

const PADDING = 20;
const edgePadding = {
  left: PADDING,
  top: PADDING * 5,
  right: PADDING,
  bottom: PADDING,
};

const OnMyWay = ({userLocation = {}, request = {}}) => {
  const mapRef = useRef(null);
  const [arriveTime, setArriveTime] = useState(0);
  const [sending, setSending] = useState(false);
  const {stack = {}} = useSession();
  const {
    user: {photo_url: photo},
  } = stack;
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  const {error} = useNotify();
  const {lat: latitude, lng: longitude} = userLocation;
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;
  const {attrs = {}} = request;
  const [updateRequest, {loading}] = useMutation(UPDATE_REQUEST);
  const {transition = {}} = request;
  const {workflow} = transition;
  const {longitude: clientLongitude, latitude: clientLatitude} = attrs;
  const origin = {
    latitude,
    longitude,
  };
  const destination = {
    latitude: parseFloat(clientLatitude),
    longitude: parseFloat(clientLongitude),
  };
  const initializeMap = () => {
    mapRef.current.fitToCoordinates([origin, destination], {
      animated: true,
      edgePadding,
    });
  };

  const onDirectionReady = ({duration}) => {
    setArriveTime(Math.round(duration));
  };

  const onChangeTransition = async () => {
    setSending(true);
    try {
      await updateRequest({
        variables: {
          request: request.id,
        },
      });
      setSending(false);
    } catch (e) {
      console.log('Errro: ', e);
      error('Error while marking the request');
      setSending(false);
    }
  };

  return (
    <>
      {loading && <LoadingCurtain />}
      <View style={classes.root}>
        <View style={classes.mapViewWrapper}>
          <MapView
            ref={mapRef}
            onMapReady={initializeMap}
            provider={PROVIDER_GOOGLE}
            style={classes.mapView}
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
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta,
              longitudeDelta,
            }}>
            <DestinationMarker
              position={{lat: destination.latitude, lng: destination.longitude}}
            />
            <TrikoMarker
              avatar={photo}
              position={{lat: latitude, lng: longitude}}
            />
            <MapViewDirections
              onReady={onDirectionReady}
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor={palette.orange}
              strokeWidth={5}
            />
          </MapView>
        </View>
        <View style={classes.actionsWrapper}>
          <Label>
            {_t(
              workflow === STATUS_ACCEPTED
                ? 'service_execution_on_my_way'
                : 'service_execution_in_the_location_call',
            )}
          </Label>
          <CircleButton
            disabled={sending}
            primary
            styles={{
              root: classes.actionButton,
              icon: classes.actionButtonIcon,
            }}
            name={workflow === STATUS_ACCEPTED ? 'running' : 'street-view'}
            onPress={onChangeTransition}
          />
        </View>
        <View style={classes.infoWrapper}>
          <Text variant="caption" style={classes.time}>
            {_t('execution_service_estimated_time', {time: arriveTime})}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OnMyWay;
