import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Text from 'shared/components/base/text';
import styles from './styles';
import {useStyles} from 'hooks/index';

/**
 * This component renders a single menu option
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onPress
 * @param option
 * @returns {*}
 * @constructor
 */
const MenuOption = ({onPress, option = {}}) => {
  const {label} = option;
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity onPress={onPress} style={classes.root}>
      <Text style={classes.optionText}>{label}</Text>
    </TouchableOpacity>
  );
};

MenuOption.propTypes = {
  onPress: PropTypes.func,
  option: PropTypes.shape({
    action: PropTypes.func,
    label: PropTypes.string,
    path: PropTypes.string,
  }),
};

export default MenuOption;
