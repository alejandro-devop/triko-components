import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Text from 'components/base/text';
import classNames from 'shared/utils/classnames';

const MeasureItem = ({label, onPress, selected}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={classNames({root: true, selected}, classes)}>
      <Text style={classNames({text: true, selectedText: selected}, classes)}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  root: {
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selected: {
    backgroundColor: palette.blueAccent,
  },
  text: {
    fontWeight: '600',
    color: palette.blue,
  },
  selectedText: {
    color: '#FFF',
  },
});

export default MeasureItem;
