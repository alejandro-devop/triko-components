import React, {useEffect, useCallback} from 'react';
import {View, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component allows to generate a wave animation.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param children
 * @param duration
 * @param delay
 * @returns {*}
 * @constructor
 */
const CircleWave = ({children, duration = 2000, delay = 0}) => {
  const animControl = new Animated.Value(0);
  const [classes] = useStyles(styles);
  const initAnimation = useCallback(() => {
    animControl.setValue(0);
    Animated.timing(animControl, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      initAnimation();
    });
  }, [animControl, Easing, delay, duration]);

  useEffect(() => {
    initAnimation();
  }, [initAnimation]);

  const scale = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [1.4, 0.2],
  });

  const opacity = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  return (
    <View style={[classes.root]}>
      <Animated.View style={[classes.wave, {opacity, transform: [{scale}]}]} />
      {children}
    </View>
  );
};

CircleWave.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
};

const styles = ({palette}) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    opacity: 0.1,
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: palette.blue,
    position: 'absolute',
  },
});

export default CircleWave;
