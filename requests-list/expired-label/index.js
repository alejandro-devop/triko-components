import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import {useStyles} from 'hooks/index';
import styles from './styles';

const ExpiredLabel = () => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={classes.text}>expired</Text>
    </View>
  );
};

export default ExpiredLabel;
