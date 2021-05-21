import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';

/**
 * This component allows to wrap the control
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param children
 * @returns {*}
 * @constructor
 */
const InputWrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

const styles = {
  root: {
    paddingHorizontal: 20,
  },
};

export default InputWrapper;
