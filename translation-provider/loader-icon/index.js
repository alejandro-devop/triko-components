import React from 'react';
import {Animated, View, Image, StyleSheet} from 'react-native';
import logo from 'assets/logos/triko_logo2.jpg';
import palette from 'themes/styles/palette';

/**
 * This component renders a animated loader for loader screen.
 *
 * @class LoaderIcon
 * @extends {React.Component}
 */
class LoaderIcon extends React.Component {
  animControl = null;
  constructor(props) {
    super(props);
    this.animControl = new Animated.Value(0);
  }

  componentDidMount() {
    this.initAnimation();
  }

  initAnimation = () => {
    const {duration = 1000, delay = 0} = this.props;
    this.animControl.setValue(0);
    Animated.timing(this.animControl, {
      toValue: 1,
      duration,
      delay,
    }).start(() => {
      this.initAnimation();
    });
  };

  render() {
    const scale = this.animControl.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.75],
    });
    const opacity = this.animControl.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });
    return (
      <View style={[classes.root]}>
        <Animated.View
          style={[classes.wave, {opacity, transform: [{scale}]}]}
        />
        <Image style={classes.image} source={logo} />
      </View>
    );
  }
}
const classes = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  wave: {
    opacity: 0.5,
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: palette.blue,
    position: 'absolute',
  },
});
export default LoaderIcon;
