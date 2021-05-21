import React from 'react';
import {Linking, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Dialog from 'shared/components/dialogs/dialog';
import classNames from 'shared/utils/classnames';
import Button from 'components/base/buttons/button';
import TrikoMarker from 'components/base/triko-marker';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

const MapViewer = ({open, onClose, position = {}, title}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const latitudeDelta = 0.002;
  const longitudeDelta = 0.002;
  const openInMap = () => {
    const {lat, lng} = position;
    Linking.openURL(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`);
  };

  return (
    <Dialog
      contentStyles={classes.dialog}
      disableScroll
      open={open}
      onClose={onClose}
      title={title}>
      <View style={classes.root}>
        <MapView
          showsUserLocation
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
          provider={PROVIDER_GOOGLE}
          style={classNames({mapView: true}, classes)}
          initialRegion={{
            ...position,
            latitudeDelta,
            longitudeDelta,
          }}>
          <TrikoMarker
            hideAvatar
            position={{lat: position.latitude, lng: position.longitude}}
          />
        </MapView>
      </View>
      <View style={classes.actions}>
        <Button onPress={openInMap} secondary>
          {_t('open_on_map')}
        </Button>
      </View>
    </Dialog>
  );
};

export default MapViewer;
