import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Icon from 'components/base/icon';
import Text from 'components/base/text';

const BellCount = ({count = 0}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Icon style={classes.icon} name="bell" />
      <Text style={classes.count}>{count}</Text>
    </View>
  );
};

const styles = ({palette}) => ({
  count: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 18,
    position: 'absolute',
    right: 8,
    top: 5,
  },
  icon: {
    fontSize: 22,
    color: '#FFF',
  },
  root: {
    flexDirection: 'row',
    position: 'absolute',
    top: -35,
    right: -20,
    backgroundColor: palette.orange,
    width: 55,
    height: 55,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BellCount;
