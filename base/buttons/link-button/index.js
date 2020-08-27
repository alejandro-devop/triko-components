import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import styles from './styles';

/**
 * This component allows to create a button with
 * link presentation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param style
 * @param children
 * @param primary
 * @param onPress
 * @returns {*}
 * @constructor
 */
const LinkButton = ({
  children,
  onPress,
  primary,
  style,
  styles: customStyles = {},
}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[classes.root, customStyles.root]}>
      <Text
        style={[
          classNames(
            {
              text: true,
              primary,
            },
            classes,
          ),
          style,
        ]}
        variant="link">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object]),
};

export default LinkButton;
