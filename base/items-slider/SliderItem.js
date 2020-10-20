import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from 'hooks';
import classNames from 'utils/classnames';

const SliderItem = ({
  Component,
  item,
  itemKey,
  itemWidth,
  itemProps = {},
  itemStyles,
  onSelect,
  selected,
}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[classes.root, {width: itemWidth, height: itemWidth}, itemStyles]}>
      {Component && (
        <Component
          selected={selected}
          item={item}
          itemKey={itemKey}
          itemWidth={itemWidth}
          {...itemProps}
        />
      )}
      {!Component && (
        <View style={classNames({emptyRoot: true, selected}, [classes])} />
      )}
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  root: {},
  emptyRoot: {
    width: '95%',
    height: '95%',
    borderRadius: 10,
    backgroundColor: palette.grayLighter,
  },
  selected: {
    backgroundColor: palette.blue2,
  },
});

export default SliderItem;
