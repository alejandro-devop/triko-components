import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from 'hooks/index';
import Icon from 'components/base/icon';
import styles from './styles';
import useTranslation from 'hooks/useTranslation';
import LinkButton from 'components/base/buttons/link-button';
import {getDistance, formatDistance} from 'utils/functions';

/**
 * This component renders the distance between the triko and the service destination
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param userLocation
 * @param request
 * @returns {null|*}
 * @constructor
 */
const DistanceRender = ({userLocation = {}, request = {}, onViewOnMap}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {latitude, longitude} = request.attrs;
  const distance = getDistance(userLocation, {lat: latitude, lng: longitude});
  if (!distance) {
    return null;
  }
  return (
    <View style={classes.root}>
      <View style={classes.textWrapper}>
        <Icon name="map-marker" style={classes.icon} />
        <Text style={classes.text}>
          {_t('proximity_text', {distance: formatDistance(distance)})}
        </Text>
      </View>
      {onViewOnMap && (
        <LinkButton
          primary
          onPress={onViewOnMap}
          style={classes.linkButtonText}
          styles={{root: classes.linkButton}}>
          {_t('view_in_map')}
        </LinkButton>
      )}
    </View>
  );
};

export default DistanceRender;
