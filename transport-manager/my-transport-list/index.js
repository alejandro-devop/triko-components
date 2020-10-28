import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import useSession from 'hooks/useSession';
import useStyles from 'hooks/useStyles';
import styles from '../styles/my-transport.style';
import CircleButton from 'components/base/buttons/circle-button';
import TransportItem from '../transport-item';

/**
 * This component renders the triko transport list.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param toggleAdd
 * @param onSelectTransport
 * @returns {*}
 * @constructor
 */
const MyTransportsList = ({toggleAdd, onSelectTransport}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {triko = {}},
  } = useSession();
  const transports = triko.transports || [];
  const defaultTransport =
    transports.find((item) => item.type.isDefault === 1) || {};

  return (
    <ScrollView>
      <View style={classes.root}>
        {transports.map((item, key) => (
          <TransportItem
            selected={defaultTransport.id === item.id}
            key={`transport-item-${key}`}
            transport={item}
            onSelect={() => onSelectTransport(item)}
          />
        ))}
        <View style={classes.actions}>
          <CircleButton name="plus" primary onPress={toggleAdd} />
        </View>
      </View>
    </ScrollView>
  );
};

MyTransportsList.propTypes = {
  toggleAdd: PropTypes.func,
  onSelectTransport: PropTypes.func,
};

export default MyTransportsList;
