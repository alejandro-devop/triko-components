import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import styles from './styles';

const BorderedButton = ({
  disabled,
  icon = '',
  label,
  delayAction,
  delayActionTimeout = 2000,
  filled,
  onPress,
  success,
  danger,
  secondary,
  warning,
  size,
  classes: otherClasses = {},
}) => {
  const [classes] = useStyles(styles);
  const [disabledAction, setDisabled] = useState(false);
  const WrapperComponent = disabled ? View : TouchableOpacity;
  const handlePress = () => {
    if (onPress && delayAction) {
      setDisabled(true);
      onPress();
      setTimeout(() => {
        setDisabled(false);
      }, delayActionTimeout);
    } else if (onPress) {
      onPress();
    }
  };
  return (
    <View style={[classes.root, otherClasses.root]}>
      <WrapperComponent
        // onPress={() => (!disabled && onPress ? onPress() : null)}
        onPress={() => (disabled || disabledAction ? null : handlePress())}P
        style={classNames(
          {
            buttonWrapper: true,
            secondaryButton: secondary,
            disabled,
            wrapperSuccess: success,
            wrapperDanger: danger,
            wrapperWarning: warning,
            wrapperSm: size === 'sm',
            wrapperXs: size === 'xs',
            buttonWrapperFilled: filled,
          },
          classes,
        )}>
        <Icon
          name={icon}
          style={classNames(
            {
              icon: true,
              iconSecondary: secondary,
              iconDisabled: disabled,
              iconSuccess: success,
              iconDanger: danger,
              iconWarning: warning,
              iconSm: size === 'sm',
              iconXs: size === 'xs',
            },
            classes,
          )}
        />
      </WrapperComponent>
      {label && (
        <Text
          style={[
            classNames(
              {
                label: true,
                labelSecondary: secondary,
                labelDisabled: disabled,
                labelWarning: warning,
                labelDanger: danger,
              },
              classes,
            ),
            otherClasses.label,
          ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default BorderedButton;
