import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import styles from './styles';
import classNames from 'shared/utils/classnames';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component allows to render a button.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client, Triko
 * @param children
 * @param classes
 * @param onPress
 * @param style
 * @param size
 * @returns {*}
 * @constructor
 */
const Button = ({
  children,
  disabled,
  onPress,
  primary,
  secondary,
  size = 'md',
  icon,
  style,
  textStyle,
}) => {
  const [classes] = useStyles(styles);
  const content = children && (
    <Text
      style={[
        classNames(
          {
            buttonText: true,
            textDisabled: disabled,
            textPrimary: primary,
            textSecondary: secondary,
            xsButtonText: size === 'xs',
            xxsButtonText: size === 'xxs',
          },
          [classes],
        ),
        textStyle,
      ]}>
      {children}
    </Text>
  );

  const rootClasses = classNames(
    {
      baseButton: true,
      disabled,
      primary,
      secondary,
      xxsButton: size === 'xxs',
      xsButton: size === 'xs',
      smButton: size === 'sm',
      lgButton: size === 'lg',
    },
    [classes],
    style,
  );
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <WrapperComponent
      onPress={() => (disabled || !onPress ? null : onPress())}
      style={rootClasses}>
      {content}
      {icon && (
        <Icon
          name={icon}
          style={classNames(
            {
              icon: true,
              iconPrimary: primary,
              iconSecondary: secondary,
              iconDisabled: disabled,
            },
            classes,
          )}
        />
      )}
    </WrapperComponent>
  );
};

Button.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.any]),
};

export default Button;
