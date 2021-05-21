import React from 'react';
import PropTypes from 'prop-types';
import {Platform, TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';
import {useStyles} from '@triko-app/hooks';
import ImageIcon from 'shared/components/base/image-icon';

/**
 * This component renders a single element from the user addresses
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param addressItem
 * @param onPress
 * @param selected
 * @returns {*}
 * @constructor
 */
const AddressItem = ({addressItem = {}, onPress, selected}) => {
  const {title, address} = addressItem;
  const [classes] = useStyles(styles);
  const {type = {}} = addressItem;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={classNames({root: true, selected}, [classes])}>
      <View style={classes.iconWrapper}>
        {type.icon ? (
          <ImageIcon
            source={{uri: type.icon}}
            wrapperClass={classes.imageWrapper}
          />
        ) : (
          <Icon name="map-marker" />
        )}
      </View>
      <View>
        <Text>{title}</Text>
        <Text variant="caption">{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  selected: {
    backgroundColor: palette.blue1,
  },
  iconWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.grayLighter,
    marginRight: 20,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    padding: 3,
    backgroundColor: '#FFF',
  },
  root: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        borderColor: 'transparent',
        borderRadius: 50,
        borderWidth: 1,
        borderBottomColor: palette.grayLighter,
      },
      android: {
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.grayLighter,
      },
    }),
  },
});

AddressItem.propTypes = {
  addressItem: PropTypes.shape({
    address: PropTypes.any,
    title: PropTypes.string,
  }),
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

export default AddressItem;
