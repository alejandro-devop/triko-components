import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useStyles} from 'hooks/index';
import styles from './styles';

/**
 * Component to render the destination for a request service
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param latitude
 * @param longitude
 * @returns {*}
 * @constructor
 */
const MapRender = ({latitude, longitude}) => {
  const latitudeDelta = 0.002;
  const circleRef = useRef(null);
  const longitudeDelta = 0.002;
  const [classes] = useStyles(styles);

  useEffect(() => {
    setTimeout(() => {
      circleRef.current.setNativeProps({fillColor: 'rgba(105, 190, 249, 0.4)'});
    }, 200);
  }, [circleRef]);

  return (
    <View style={classes.mapWrapper}>
      <MapView
        provider={PROVIDER_GOOGLE}
        cacheEnabled={true}
        rotateEnabled={false}
        showsCompass={false}
        showsBuildings={false}
        showsTraffic={false}
        zoomControlEnabled={false}
        style={classes.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta,
          longitudeDelta,
        }}>
        <MapView.Circle
          ref={circleRef}
          key={(latitude + longitude).toString()}
          center={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          radius={80}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      </MapView>
    </View>
  );
};

MapRender.propTypes = {
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MapRender;
