import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView as ScrollViewBase} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';

/**
 * This component renders a scroll view with custom styles
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @returns {*}
 * @constructor
 */
const ScrollView = ({children}) => {
  const [classes] = useStyles(styles);
  return (
    <ScrollViewBase
      showsVerticalScrollIndicator={false}
      style={classes.root}
      contentContainerStyle={classes.scroll}>
      {children}
    </ScrollViewBase>
  );
};

ScrollView.propTypes = {
  children: PropTypes.node,
};

export default ScrollView;
