import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';

/**
 * This component renders a wrapper for the shopper needs
 * @author Jako <jakop.box@gmail.com>
 * @param children
 * @returns {*}
 * @constructor
 */
const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

const styles = () => ({
  root: {
    marginVertical: 20,
  },
});

export default Wrapper;
