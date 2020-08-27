import React, {useEffect, useCallback} from 'react';
import {View, Animated, Image} from 'react-native';
import logo from 'shared/assets/trikowork_logo.png';
import PropTypes from 'prop-types';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';

const LoaderIcon = ({duration = 1000, delay = 0}) => {
  const animControl = new Animated.Value(0);
  const [classes] = useStyles(styles);
  const initAnimatiom = useCallback(() => {
    animControl.setValue(0);
    Animated.timing(animControl, {
      toValue: 1,
      duration,
      delay,
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
      <Image style={classes.image} source={logo} />
    </View>
  );
};

LoaderIcon.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default LoaderIcon;
