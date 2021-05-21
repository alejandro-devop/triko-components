import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import Icon from 'components/base/icon';
import styles from './styles';
import useTranslation from 'shared/hooks/use-translate';
import LinkButton from 'components/base/buttons/link-button';
import {getDistance, formatDistance} from 'utils/functions';
import classNames from 'shared/utils/classnames';

/**
 * This component renders the distance between the triko and the service destination
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.1
 * @param userLocation
 * @param request
 * @param onViewOnMap
 * @param isTriko
 * @returns {null|*}
 * @constructor
 */
const DistanceRender = ({
  isTriko,
  userLocation = {},
  request = {},
  onViewOnMap,
}) => {
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
        <Icon
          name="map-marker"
          style={classNames({icon: true, iconTriko: isTriko}, classes)}
        />
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

DistanceRender.propTypes = {
  isTriko: PropTypes.bool,
  userLocation: PropTypes.shape({
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  request: PropTypes.shape({
    attrs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  onViewOnMap: PropTypes.func,
};

export default DistanceRender;
