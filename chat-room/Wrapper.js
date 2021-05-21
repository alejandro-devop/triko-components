import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';

/**
 * This component renders a wrapper for the chat component.
 * @param children
 * @returns {*}
 * @constructor
 */
const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return <View style={classes.root}>{children}</View>;
};

const styles = () => ({
  outer: {
    flexBasis: 1,
  },
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
