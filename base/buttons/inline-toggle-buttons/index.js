import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import styles from './styles';

/**
 * This component renders the buttons for switch between user chats and clients
 * @version 1.0.0
 * @param buttons
 * @param currentButton
 * @returns {*}
 * @constructor
 */
const ToggleButtons = ({buttons = [], currentButton = 0}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {buttons.map((button, key) => {
        const {label} = button;
        const active = currentButton === key;
        return (
          <TouchableOpacity
            key={`button-${key}`}
            style={classNames({button: true, buttonActive: active}, classes)}>
            <Text style={classes.buttonText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

ToggleButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({label: PropTypes.string})),
  currentButton: PropTypes.number,
};

export default ToggleButtons;
