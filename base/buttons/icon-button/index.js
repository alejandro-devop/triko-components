import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Platform, View} from 'react-native';
import styles from './styles';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import Icon from 'shared/components/base/icon';

const defaultSize = Platform.select({ios: 20, android: 18});

/**
 * This component allows to create a button which presentation is an icon.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param name
 * @param onPress
 * @param disabled
 * @param iconType
 * @param iconStyles
 * @param size
 * @param style
 * @returns {*}
 * @constructor
 */
const IconButton = ({
  disabled,
  classes: otherClasses = {},
  iconType,
  iconStyles,
  name,
  onPress,
  size = defaultSize,
  style,
}) => {
  const [classes] = useStyles(styles);
  const WrapperComponent = disabled ? View : TouchableOpacity;
  return (
    <WrapperComponent
      onPress={() => (disabled || !onPress ? null : onPress())}
      style={[
        classNames(
          {
            root: true,
            disabled,
          },
          classes,
        ),
        style,
      ]}>
      <Icon
        name={name}
        from={iconType}
        size={size}
        style={[classes.icon, iconStyles]}
      />
    </WrapperComponent>
  );
};

IconButton.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
  name: PropTypes.string,
  onPress: PropTypes.func,
  iconType: PropTypes.string,
  iconStyles: PropTypes.oneOfType([PropTypes.object]),
  size: PropTypes.number,
  style: PropTypes.object,
};

export default IconButton;
