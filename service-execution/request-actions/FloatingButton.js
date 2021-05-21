import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';

const FloatingButton = ({disabled, onPress, primary, icon}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = !disabled ? TouchableOpacity : View;
  return (
    <ComponentWrapper
      onPress={onPress}
      style={classNames(
        {root: true, rootDisabled: disabled, primary},
        classes,
      )}>
      <Icon name={icon} style={classes.icon} />
    </ComponentWrapper>
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
  rootDisabled: {
    opacity: 0.2,
  },
});

export default FloatingButton;
