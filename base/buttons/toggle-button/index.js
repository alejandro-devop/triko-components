import React, {useRef, useState} from 'react';
import {Animated, Easing, View, TouchableWithoutFeedback} from 'react-native';
import textStyles from 'shared/components/base/text/styles';
import palette from 'themes/styles/palette';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

const ToggleButton = ({
  onPress,
  disabled,
  onLabel = 'user_visibility_toggle_on',
  offLabel = 'user_visibility_toggle_off',
  onIcon = 'eye',
  offIcon = 'eye-slash',
  disableText,
  initialState = true,
  secondary,
}) => {
  const [textClasses] = useStyles(textStyles);
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
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
        style={dynamicStyles.container(animation, {secondary, disabled})}>
        {!disableText && (
          <>
            <Animated.Text
              style={[
                textClasses.caption,
                dynamicStyles.text(true, animation),
              ]}>
              {_t(offLabel)}
            </Animated.Text>
            <Animated.Text
              style={[
                textClasses.caption,
                dynamicStyles.text(false, animation),
              ]}>
              {_t(onLabel)}
            </Animated.Text>
          </>
        )}
        {containerWidth > 0 && (
          <Animated.View
            style={[
              classes.control,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, containerWidth - 30],
                    }),
                  },
                ],
              },
            ]}>
            {onIcon && offIcon && (
              <Icon name={toggled ? onIcon : offIcon} style={classes.icon} />
            )}
          </Animated.View>
        )}
      </Animated.View>
    </ComponentWrapper>
  );
};

const dynamicStyles = {
  container: (animation, {secondary, disabled}) => ({
    alignItems: 'center',
    backgroundColor: disabled
      ? palette.grayLight
      : animation.interpolate({
          inputRange: [0, 1],
          outputRange: secondary
            ? [palette.orangeLight, palette.orange]
            : [palette.blueLight, palette.blue],
        }),
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 30,
  }),
  text: (inverted, animation, pos = 10) => ({
    color: !inverted ? '#FFF' : palette.gray,
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: inverted ? [1, 0] : [0, 1],
    }),
    transform: [{translateY: inverted ? pos : -pos}],
  }),
};
export default ToggleButton;
