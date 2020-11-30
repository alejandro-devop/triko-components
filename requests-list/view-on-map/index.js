import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import Dialog from 'shared/components/dialogs/dialog';
import MapRenderer from './map-renderer';
import {formatDistance, getDistance, isEmpty} from 'shared/utils/functions';
import Text from 'shared/components/base/text';

/**
 *
 * @param open
 * @param onClose
 * @param latitude
 * @param longitude
 * @returns {*}
 * @constructor
 */
const ViewOnMap = ({open, onClose, latitude, longitude}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {currentLocation},
  } = useSession();
  const distance = getDistance(
    {lat: latitude, lng: longitude},
    {lat: currentLocation.latitude, lng: currentLocation.longitude},
  );

  return (
    <Dialog contentStyles={classes.root} open={open} onClose={onClose}>
      <View style={classes.content}>
        {!isEmpty(latitude) && !isEmpty(longitude) && (
          <MapRenderer circle latitude={latitude} longitude={longitude} />
        )}
        <View style={classes.distanceWrapper}>
          <Text style={[classes.text, classes.textLabel]}>
            distance_from_you
          </Text>
          <View style={classes.distanceTextWrapper}>
            <Text style={[classes.text, classes.textDistance]}>
              {formatDistance(distance)}
            </Text>
          </View>
        </View>
      </View>
    </Dialog>
  );
};

ViewOnMap.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewOnMap;
