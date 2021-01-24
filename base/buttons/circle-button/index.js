import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import CircleWave from 'shared/components/anims/CircleWave';
import Text from 'shared/components/base/text';
import componentStyles from './styles';

/**
 * this component allows to create a circle button with icon
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client, Triko
 * @param delay
 * @param enableWave
 * @param disabled
 * @param name
 * @param onPress
 * @param primary
 * @param size
 * @param styles
 * @returns {null|*}
 * @constructor
 */
const CircleButton = ({
  delay,
  enableWave,
  disabled,
  label,
  badge,
  name,
  onPress,
  primary,
  size = 'md',
  styles = {},
}) => {
  const [classes] = useStyles(componentStyles);
  if (!name) {
    return null;
  }
  const WrapperComponent = disabled ? View : TouchableOpacity;
  const content = (
    <View style={classes.wrapper}>
      <WrapperComponent
        delay={delay}
        style={classNames(
          {
            root: true,
            primary,
            disabled,
            xl: size === 'xl',
            lg: size === 'lg',
            sm: size === 'sm',
            xs: size === 'xs',
          },
          [classes],
          styles.root,
        )}
        onPress={() => (!disabled && onPress ? onPress() : null)}>
        {Boolean(badge) && (
          <View style={classes.badgeWrapper}>
            <Text style={classes.badgeText}>{badge}</Text>
          </View>
        )}
        <Icon
          name={name}
          style={classNames(
            {
              icon: true,
              iconPrimary: primary,
              iconXl: size === 'xl',
              iconLg: size === 'lg',
              iconSm: size === 'sm',
            },
            [classes],
            styles.icon,
          )}
        />
      </WrapperComponent>
      {label && <Text style={[classes.labelText, styles.label]}>{label}</Text>}
    </View>
  );
  if (enableWave) {
    return (
      <CircleWave delay={0} duration={800}>
        {content}
      </CircleWave>
    );
  }
  return content;
};

CircleButton.propTypes = {
  onPress: PropTypes.func,
};

export default CircleButton;
