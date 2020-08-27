import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import palette from 'themes/styles/palette';

/**
 * Este componente permite renderizar una flecha para indicar acción (Dirección abajo)
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class AnimatedArrowUp extends React.PureComponent {
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
      duration: this.props.duration || 2000,
    }).start(() => this.startMove());
  };

  render() {
    const movement = this.animControl.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15],
    });
    const {icon = 'chevron-down'} = this.props;
    return (
      <View style={styles.root}>
        <Animated.View
          style={[
            styles.animRoot,
            {
              transform: [{translateY: movement}],
            },
            ,
          ]}>
          <Icon style={styles.icon} name={icon} size={40} />
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
  },
  icon: {
    color: palette.blue,
  },
});

export default AnimatedArrowUp;
