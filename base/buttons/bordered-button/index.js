import React from 'react';
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
  onPress,
  success,
  danger,
  secondary,
  warning,
  size,
  classes: otherClasses = {},
}) => {
  const [classes] = useStyles(styles);
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <View style={[classes.root, otherClasses.root]}>
      <WrapperComponent
        onPress={() => (!disabled && onPress ? onPress() : null)}
        style={classNames(
          {
            buttonWrapper: true,
            secondaryButton: secondary,
            disabled,
            wrapperSuccess: success,
            wrapperDanger: danger,
            wrapperWarning: warning,
            wrapperSm: size === 'sm',
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
            },
            classes,
          )}
        />
      </WrapperComponent>
      {label && (
        <Text
          style={classNames(
            {
              label: true,
              labelSecondary: secondary,
              labelDisabled: disabled,
              labelWarning: warning,
              labelDanger: danger,
            },
            classes,
          )}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default BorderedButton;
