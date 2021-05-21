import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';

/**
 * This component renders the shopper needs item.
 * @author Jako <jakop.box@gmail.com>
 * @param active
 * @param item
 * @param onPress
 * @param labelKey
 * @returns {*}
 * @constructor
 */
const Item = ({active, item, onPress, labelKey = 'name'}) => {
  const [classes] = useStyles(styles);
  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const label = item[labelKey];
  return (
    <View style={classes.root}>
      <TouchableOpacity
        onPress={handlePress}
        style={classNames(
          {
            contentWrapper: true,
            contentWrapperActive: active,
          },
          classes,
        )}>
        <Text style={classes.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ({palette}) => ({
  contentWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blueLightAccent,
    borderRadius: 30,
  },
  contentWrapperActive: {
    backgroundColor: palette.blueAccent,
  },
  root: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});

Item.defaultProps = {
  labelKey: 'name',
};

Item.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
  }),
  onPress: PropTypes.func,
  labelKey: PropTypes.string,
};

export default Item;
