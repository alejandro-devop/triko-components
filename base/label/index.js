import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

/**
 * This component allows to create a form label.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
const Label = ({children, disabled, style}) => {
  const [classes] = useStyles(styles);
  return (
    <View
      style={classNames(
        {
          root: true,
          disabled: disabled,
        },
        classes,
      )}>
      <Text
        style={[
          classNames({text: true, disabledText: disabled}, classes),
          style,
        ]}>
        {children}
      </Text>
    </View>
  );
};

Label.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.any]),
};

export default Label;
