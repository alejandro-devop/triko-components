import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component renders the presentation for an address record.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param address
 * @param onPress
 * @returns {*}
 * @constructor
 */
const AddressItem = ({address, onPress}) => {
  const [classes] = useStyles(styles);
  const {
    primaryText: label,
    secondaryText: caption,
    department,
    country,
  } = address;
  const unnecessaryText = `, ${department}, ${country}`;
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classes.iconWrapper}>
        <Icon name="map-marker" />
      </View>
      <View style={classes.textWrapper}>
        <Text style={classes.label}>{label}</Text>
        {unnecessaryText && (
          <Text variant="caption">{caption.replace(unnecessaryText, '')}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: palette.grayLighter,
  },
  iconWrapper: {
    marginRight: 20,
  },
  label: {
    fontSize: 15,
  },
});

AddressItem.propTypes = {
  address: PropTypes.object,
  onPress: PropTypes.func,
};

export default AddressItem;
