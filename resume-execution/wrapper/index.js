import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';

const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

export default Wrapper;
