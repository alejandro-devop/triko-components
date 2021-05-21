import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';
import Text from 'shared/components/base/text';

/**
 * This component renders the button for switch buttons.
 * @author Jako <jakop.box@gmail.com>
 * @param active
 * @param children
 * @param onPress
 * @param secondary
 * @returns {*}
 * @constructor
 */
const Button = ({active, children, onPress, secondary}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = active ? View : TouchableOpacity;
  return (
    <View style={classes.root}>
      <ComponentWrapper
        onPress={() => (!active ? onPress() : null)}
        style={classNames(
          {
            button: true,
            buttonSecondary: secondary,
            buttonActive: active,
            buttonActiveSecondary: secondary && active,
          },
          classes,
        )}>
        <Text
          style={classNames({text: true, textSecondary: secondary}, classes)}>
          {children}
        </Text>
      </ComponentWrapper>
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
  buttonSecondary: {
    backgroundColor: palette.orangeAlt,
  },
  buttonActiveSecondary: {
    backgroundColor: palette.orange,
  },
  root: {
    width: '50%',
    paddingHorizontal: 5,
  },
  text: {
    color: '#FFF',
  },
  textSecondary: {
    fontWeight: '400',
  },
});

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onPress: PropTypes.func,
};

export default Button;
