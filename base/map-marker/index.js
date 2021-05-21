import React from 'react';
import {Image, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import markerImage from 'shared/assets/triko-work-marker.png';
import styles from './styles';

const MapMarker = ({wrapperStyles, iconStyles, size = 25}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, wrapperStyles]}>
      <Image source={markerImage} style={[classes.image, iconStyles]} />
      <View style={classes.tip} />
    </View>
  );
};

export default MapMarker;
