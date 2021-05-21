import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import PreImage from 'components/pre-image';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import styles from '../styles/transport-item.style';
import Icon from 'components/base/icon';

/**
 * This component renders a single transport item.
 * @version  1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param transport
 * @param onSelect
 * @param selected
 * @returns {*}
 * @constructor
 */
const TransportItem = ({transport = {}, onSelect, selected}) => {
  const [classes] = useStyles(styles);
  const {icon, name} = transport;
  return (
    <TouchableOpacity style={classes.itemRoot} onPress={onSelect}>
      <View style={classes.iconWrapper}>
        <PreImage source={{uri: icon}} style={classes.icon} />
      </View>
      <View style={classes.textWrapper}>
        <Text>{name}</Text>
      </View>
      {selected && (
        <View style={classes.checkWrapper}>
          <Icon style={classes.checkIcon} name="check" />
        </View>
      )}
    </TouchableOpacity>
  );
};

TransportItem.propTypes = {
  transport: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default TransportItem;
