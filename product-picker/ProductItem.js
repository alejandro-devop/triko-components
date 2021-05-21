import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';

const ProductItem = ({
  added,
  name,
  icon = 'box-open',
  category,
  selected,
  onPress,
}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = added ? View : TouchableOpacity;
  return (
    <ComponentWrapper
      style={classNames({root: true, rootDisabled: added, selected}, classes)}
      onPress={() => (added ? null : onPress())}>
      <View style={classes.iconWrapper}>
        <Icon name={icon} style={classes.icon} />
      </View>
      <View style={classes.textContent}>
        <View>
          <Text
            style={classNames(
              {productText: true, selectedText: selected},
              classes,
            )}>
            {name}
          </Text>
          {added && (
            <View
              style={classNames({line: true, lineSelected: selected}, classes)}
            />
          )}
        </View>
        {category && (
          <Text
            variant="caption"
            style={classNames({selectedText: selected}, classes)}>
            {category}
          </Text>
        )}
      </View>
      {added && (
        <Icon
          style={classNames(
            {checkedIcon: true, checkedIconSelected: selected},
            classes,
          )}
          name="check-circle"
        />
      )}
    </ComponentWrapper>
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
  rootDisabled: {
    opacity: 0.6,
  },
  selectedText: {
    color: '#FFF',
  },
  textContent: {
    flex: 1,
  },
  checkedIcon: {
    color: palette.blue,
    fontSize: 26,
    marginRight: 10,
  },
  checkedIconSelected: {
    color: '#FFF',
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: palette.blueDark,
    position: 'absolute',
    top: 13,
  },
  lineSelected: {
    backgroundColor: '#FFF',
  },
});

export default ProductItem;
