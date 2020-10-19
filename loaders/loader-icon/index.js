import React, {useEffect, useCallback} from 'react';
import {View, Animated, Image} from 'react-native';
import trikoUserLogo from 'shared/assets/trikouser_logo.png';
import trikoWorkLogo from 'shared/assets/trikowork_logo.png';
import PropTypes from 'prop-types';
import useStyles from 'hooks/useStyles';
import styles from './styles';

/**
 * This component renders an animated icon for loaders
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param duration
 * @param delay
 * @param isTriko
 * @returns {*}
 * @constructor
 */
const LoaderIcon = ({duration = 1000, delay = 0, isTriko = true}) => {
  const animControl = new Animated.Value(0);
  const [classes] = useStyles(styles);
  const initAnimatiom = useCallback(() => {
    animControl.setValue(0);
    Animated.timing(animControl, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      initAnimatiom();
    });
  }, [animControl, delay, duration]);

  useEffect(() => {
    initAnimatiom();
  }, [initAnimatiom]);

  const scale = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.75],
  });

  const opacity = animControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <View style={[classes.root]}>
      <Animated.View style={[classes.wave, {opacity, transform: [{scale}]}]} />
      <Image
        style={classes.image}
        source={isTriko ? trikoWorkLogo : trikoUserLogo}
      />
    </View>
  );
};

LoaderIcon.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  isTriko: PropTypes.bool,
};

export default LoaderIcon;
