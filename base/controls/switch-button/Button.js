import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import Text from 'shared/components/base/text';

/**
 * This component renders the button for switch buttons.
 * @author Jako <jakop.box@gmail.com>
 * @param active
 * @param children
 * @param onPress
 * @returns {*}
 * @constructor
 */
const Button = ({active, children, onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <TouchableOpacity
        onPress={onPress}
        style={classNames(
          {
            button: true,
            buttonActive: active,
          },
          classes,
        )}>
        <Text style={classes.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ({palette}) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blueLightAccent,
    borderRadius: 30,
    paddingVertical: 5,
  },
  buttonActive: {
    backgroundColor: palette.blueAccent,
  },
  root: {
    width: '50%',
    paddingHorizontal: 5,
  },
  text: {
    color: '#FFF',
  },
});

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onPress: PropTypes.func,
};

export default Button;
