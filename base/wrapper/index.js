import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import styles from './styles';

/**
 * This component wraps the picker.
 * @param children
 * @returns {*}
 * @constructor
 */
const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

export default Wrapper;
