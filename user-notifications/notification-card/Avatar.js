import React from 'react';
import {View} from 'react-native';
import Icon from 'shared/components/base/icon';
import {useStyles} from '@triko-app/hooks';

const Avatar = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.iconWrapper}>
      <Icon name="user" style={classes.icon} from="fw4" />
    </View>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: '#FFF',
  },
  iconWrapper: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: palette.blue,
  },
});

export default Avatar;
