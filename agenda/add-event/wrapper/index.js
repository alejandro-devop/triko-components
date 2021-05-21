import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

export default Wrapper;
