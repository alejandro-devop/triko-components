import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';

/**
 * This component allows to create a form label.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param classes
 * @param children
 * @param required
 * @param secondary
 * @returns {*}
 * @constructor
 */
const Label = ({children, required, disabled, secondary, style}) => {
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
      {required && (
        <Text
          style={[
            classNames(
              {text: true, secondary: secondary, disabledText: disabled},
              classes,
            ),
            style,
          ]}>
          {'* '}
        </Text>
      )}
      <Text
        style={[
          classNames(
            {text: true, secondary: secondary, disabledText: disabled},
            classes,
          ),
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
