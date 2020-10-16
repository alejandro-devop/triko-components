import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, View, TouchableWithoutFeedback} from 'react-native';
import dynamicStyles from './animated.styles';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import classNames from 'shared/utils/classnames';

/**
 * This component allows to render a special switch button
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param onPress
 * @param disabled
 * @param initialState
 * @returns {*}
 * @constructor
 */
const SwitchButton = ({onPress, disabled, initialState = true}) => {
  const [classes] = useStyles(styles);
  const animation = useRef(new Animated.Value(initialState ? 1 : 0)).current;
  const [toggled, setToggled] = useState(!!initialState);
  const [containerWidth, setContainerWidth] = useState(0);
  const ComponentWrapper = disabled ? View : TouchableWithoutFeedback;
  const handleOnPress = () => {
    setToggled(!toggled);
    Animated.timing(animation, {
      duration: 300,
      toValue: +!toggled,
      easing: Easing.linear(),
    }).start();
    if (onPress) {
      onPress();
    }
  };
  return (
    <ComponentWrapper
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => setContainerWidth(width)}
      onPress={() => (!disabled ? handleOnPress() : null)}>
      <Animated.View
        style={dynamicStyles.container(animation, {active: toggled, disabled})}>
        {containerWidth > 0 && (
          <Animated.View
            style={[
              classNames(
                {
                  control: true,
                  controlActive: !toggled,
                },
                classes,
              ),
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-1, containerWidth - 26],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </Animated.View>
    </ComponentWrapper>
  );
};

SwitchButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  initialState: PropTypes.bool,
};

export default SwitchButton;
