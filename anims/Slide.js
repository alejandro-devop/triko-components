import React, {useEffect, useRef, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Animated, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

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
  const view = useRef(null);
  const [end, setEnd] = useState(false);
  useEffect(() => {}, []);

  const getAnimation = () => {
    switch (direction) {
      case 'bottom':
        return 'fadeInUpBig';
      case 'top':
        return 'fadeInDownBig';
      case 'left':
        return 'fadeInRightBig';
      case 'right':
        return 'fadeInLeftBig';
      default:
        return 'slideInUp';
    }
  };
  const handleAnimationEnd = () => {
    setEnd(true);
    if (onAnimationCompleted) {
      onAnimationCompleted();
    }
  };
  // const anim = getDirection(movement);
  return (
    <Animatable.View
      animation={getAnimation()}
      ref={view}
      onAnimationEnd={handleAnimationEnd}
      duration={duration}
      style={[style]}
      delay={delay}>
      {!contentOnDone ? children : end ? children : null}
    </Animatable.View>
  );
};

SlideAnimation.propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  style: PropTypes.any,
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default SlideAnimation;
