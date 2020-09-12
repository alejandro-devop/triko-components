import React, {useEffect, useRef, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Animated, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

/**
 * This component allows to generate a slide animation
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client, Triko
 * @param children
 * @param delay
 * @param direction
 * @param duration
 * @param onAnimationCompleted
 * @param style
 * @returns {*}
 * @constructor
 */
const SlideAnimation = ({
  contentOnDone,
  children,
  delay = 100,
  direction = 'right',
  duration = 300,
  style,
  onAnimationCompleted,
}) => {
  const animControl = useRef(new Animated.Value(0.001)).current;
  const [end, setEnd] = useState(false);

  const initAnimation = useCallback(() => {
    Animated.timing(animControl, {
      toValue: 1,
      duration,
      delay,
    }).start(() => {
      if (onAnimationCompleted && !end) {
        onAnimationCompleted();
      }
      setTimeout(() => {
        setEnd(true);
      }, duration * 0.5);
    });
  }, [animControl, delay, duration]);

  useEffect(() => {
    if (!end) {
      initAnimation();
    }
  }, [end, initAnimation]);

  const getDirection = movement => {
    const styles = {};
    if (direction === 'left') {
      styles.left = movement;
    } else if (direction === 'right') {
      styles.right = movement;
    } else if (direction === 'bottom') {
      styles.bottom = movement;
    } else if (direction === 'top') {
      styles.top = movement;
    }
    return styles;
  };

  const containerDimension =
    direction === 'left' || direction === 'right' ? screenWidth : screenHeight;

  const movement = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [-containerDimension, 0],
  });

  const anim = getDirection(movement);
  return (
    <Animated.View style={[style, anim]}>
      {!contentOnDone ? children : end ? children : null}
    </Animated.View>
  );
};

SlideAnimation.propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  style: PropTypes.any,
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default SlideAnimation;
