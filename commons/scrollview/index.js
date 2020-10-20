import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ScrollView as ScrollViewBase} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';

/**
 * This component renders a scroll view with custom styles
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @param disableScroll
 * @returns {*}
 * @constructor
 */
const ScrollView = ({children, useKeyboard}) => {
  const [classes] = useStyles(styles);
  if (useKeyboard) {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={classes.root}
        contentContainerStyle={classes.scroll}>
        {children}
      </KeyboardAwareScrollView>
    );
  }
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
  useKeyboard: PropTypes.bool,
};

export default ScrollView;
