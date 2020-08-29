import React from 'react';
import {TouchableOpacity} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import classNames from 'shared/utils/classnames';

const SelectableItem = ({label, onSelect, selected}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      style={classNames({root: true, selected}, classes)}
      onPress={onSelect}>
      <Text style={classes.text}>{label}</Text>
      <Icon name="check-circle" style={classes.icon} />
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: palette.blue,
  },
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: palette.grayLighter,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: palette.blueLight,
  },
  text: {
    fontSize: 17,
    flex: 1,
    marginRight: 4,
  },
});

export default SelectableItem;
