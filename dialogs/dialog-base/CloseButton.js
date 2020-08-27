import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useStyles from 'shared/hooks/use-styles';
import {closeButtonStyles as styles} from './styles';
/**
 * This component renders the modal close button.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param onPress
 * @returns {*}
 * @constructor
 */
const CloseButton = ({onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.wrapper}>
      <TouchableOpacity onPress={onPress} style={classes.button}>
        <Icon name="times" size={20} style={classes.icon} />
      </TouchableOpacity>
    </View>
  );
};

CloseButton.propTypes = {
  onPress: PropTypes.func,
};

export default CloseButton;
