import React, {useRef, useState} from 'react';
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import textStyles from 'shared/components/base/text/styles';
import palette from 'themes/styles/palette';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import styles from './styles';

const ToggleButton = ({onPress, initialState = true}) => {
  const [textClasses] = useStyles(textStyles);
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const animation = useRef(new Animated.Value(initialState ? 1 : 0)).current;
  const [toggled, setToggled] = useState(!!initialState);
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <TouchableWithoutFeedback
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => setContainerWidth(width)}
      onPress={() => {
        setToggled(!toggled);
        Animated.timing(animation, {
          duration: 300,
          toValue: +!toggled,
          easing: Easing.linear(),
        }).start();
        if (onPress) {
          onPress();
        }
      }}>
      <Animated.View style={dynamicStyles.container(animation)}>
        <Animated.Text
          style={[textClasses.caption, dynamicStyles.text(true, animation)]}>
          {_t('user_visibility_toggle_off')}
        </Animated.Text>
        <Animated.Text
          style={[textClasses.caption, dynamicStyles.text(false, animation)]}>
          {_t('user_visibility_toggle_on')}
        </Animated.Text>
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
            <Icon name={toggled ? 'eye' : 'eye-slash'} style={classes.icon} />
          </Animated.View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const dynamicStyles = {
  container: animation => ({
    alignItems: 'center',
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [palette.grayLighter, palette.success],
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
