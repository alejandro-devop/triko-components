import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

const ProductItem = ({
  name,
  icon = 'box-open',
  category,
  selected,
  onPress,
}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      style={classNames({root: true, selected}, classes)}
      onPress={onPress}>
      <View style={classes.iconWrapper}>
        <Icon name={icon} style={classes.icon} />
      </View>
      <View style={classes.textContent}>
        <Text
          style={classNames(
            {productText: true, selectedText: selected},
            classes,
          )}>
          {name}
        </Text>
        {category && (
          <Text variant="caption" style={classNames({selectedText: selected}, classes)}>
            {category}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: palette.blue,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    backgroundColor: '#FFF',
    borderRadius: 100,
  },
  productText: {
    color: palette.blueDark,
    fontWeight: '400',
  },
  root: {
    backgroundColor: palette.blueLight,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: palette.blue,
  },
  selectedText: {
    color: '#FFF',
  },
  textContent: {},
});

export default ProductItem;
