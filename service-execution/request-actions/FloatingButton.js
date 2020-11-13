import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useStyles} from 'hooks/index';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';

const FloatingButton = ({onPress, primary, icon}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={classNames({root: true, primary}, classes)}>
      <Icon name={icon} style={classes.icon} />
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: '#FFF',
    fontSize: 28,
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: palette.blue,
    borderRadius: 10,
  },
});

export default FloatingButton;
