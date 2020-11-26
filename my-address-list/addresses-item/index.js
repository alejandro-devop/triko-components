import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import IconButton from 'shared/components/base/buttons/icon-button';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';
import useStyles from 'shared/hooks/use-styles';
import ImageIcon from 'shared/components/base/image-icon';
import styles from './styles';

/**
 * This component renders a single element from the user addresses
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param addressItem
 * @param disableSelect
 * @param onPress
 * @param onRemove
 * @param selected
 * @returns {*}
 * @constructor
 */
const AddressItem = ({
  addressItem = {},
  disableSelect,
  onRemove,
  onPress,
  selected,
}) => {
  const {title, address} = addressItem;
  const [classes] = useStyles(styles);
  const {type = {}} = addressItem;
  const Wrapper = !disableSelect ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={() => (!disableSelect && onPress ? onPress() : null)}
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
      <View style={classes.textWrapper}>
        <Text>{title}</Text>
        <Text variant="caption">{address}</Text>
      </View>
      <IconButton
        name="trash"
        iconStyles={classes.removeIcon}
        onPress={onRemove}
      />
    </Wrapper>
  );
};

AddressItem.propTypes = {
  addressItem: PropTypes.shape({
    address: PropTypes.any,
    title: PropTypes.string,
  }),
  onPress: PropTypes.func,
  onRemove: PropTypes.func,
  selected: PropTypes.bool,
};

export default AddressItem;
