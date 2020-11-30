import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import Icon from 'components/base/icon';
import styles from './styles';

/**
 * This component allows to create a button with
 * link presentation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param style
 * @param children
 * @param disableUnderline
 * @param primary
 * @param onPress
 * @returns {*}
 * @constructor
 */
const LinkButton = ({
  children,
  disableUnderline,
  icon,
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
              disableUnderline,
            },
            classes,
          ),
          style,
        ]}
        variant="link">
        {children}
      </Text>
      {icon && (
        <Icon
          name={icon}
          style={[
            classNames(
              {
                icon: true,
                text: true,
                primary,
                disableUnderline,
              },
              classes,
            ),
            style,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default LinkButton;
