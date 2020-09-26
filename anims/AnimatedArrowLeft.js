import React from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import palette from 'themes/styles/palette';

/**
 * Este componente permite renderizar una flecha para indicar acción (Dirección abajo)
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class AnimatedArrowLeft extends React.PureComponent {
  animControl = null;

  constructor(props) {
    super(props);
    this.animControl = new Animated.Value(0);
  }

  componentDidMount() {
    this.startMove();
  }

  startMove = () => {
    this.animControl.setValue(0);
    Animated.timing(this.animControl, {
      toValue: 1,
      duration: 1000,
      easing: Easing.in(),
      useNativeDriver: true,
    }).start(() => this.startMove());
  };

  render() {
    const movement = this.animControl.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15],
    });
    const {icon = 'chevron-left', iconStyles, style} = this.props;
    return (
      <View style={[styles.root]}>
        <Animated.View
          style={[
            styles.animRoot,
            {
              transform: [{translateX: movement}],
            },
            style,
          ]}>
          <Icon style={[styles.icon, iconStyles]} name={icon} size={25} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  animRoot: {
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: palette.blue,
  },
});

export default AnimatedArrowLeft;
