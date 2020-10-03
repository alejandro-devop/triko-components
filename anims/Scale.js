import React, {useState, useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import useStyles from 'shared/hooks/use-styles';

/**
 * this component controls a scale animation for every children component
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client, Triko
 * @param duration
 * @param delay
 * @param children
 * @param style
 * @returns {*}
 * @constructor
 */
const ScaleAnimation = ({
  duration = 300,
  delay = 100,
  children,
  style = {},
}) => {
  const [classes] = useStyles(styles);
  const [end, setEnd] = useState(false);
  const animControl = useRef(new Animated.Value(0)).current;

  const initAnimation = useCallback(() => {
    Animated.timing(animControl, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setEnd(true);
      }, duration + 200);
    });
  }, [animControl, delay, duration]);

  useEffect(() => {
    if (!end) {
      initAnimation();
    }
  }, [end, initAnimation]);

  const scale = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const anim = {transform: [{scale}]};

  return (
    <Animated.View style={[classes.root, style, anim]}>
      {children}
    </Animated.View>
  );
};

const styles = {
  root: {},
};

ScaleAnimation.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default ScaleAnimation;
