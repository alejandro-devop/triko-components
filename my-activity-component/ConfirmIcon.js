import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import PreImage from 'shared/components/base/pre-image';
import checkIcon from 'assets/icons/check-icon.png';

const ConfirmIcon = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <PreImage source={checkIcon} style={classes.icon} />
    </View>
  );
};

const styles = () => ({
  icon: {
    width: 30,
    height: 30,
  },
  root: {
    top: 5,
    marginLeft: 10,
  },
});

export default ConfirmIcon;
