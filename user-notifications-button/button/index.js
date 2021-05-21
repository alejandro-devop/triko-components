import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import PreImage from 'shared/components/base/pre-image';
import {useStyles} from '@triko-app/hooks';
import bellIcon from 'shared/assets/icons/notify-bell.png';
import styles from './styles';
import Scale from 'shared/components/anims/Scale';
import classNames from 'shared/utils/classnames';

/**
 * This component renders the bell button for the notifications
 * @author Alejandro <alejandro.devop@gmail.com>p
 * @version
 * @param count
 * @param onPress
 * @param isTriko
 * @returns {*}
 * @constructor
 */
const Button = ({count, isTriko, onPress}) => {
  const [classes] = useStyles(styles);
  return (
    <Scale delay={1000} style={classes.root}>
      <TouchableOpacity onPress={onPress}>
        <PreImage style={classes.image} source={bellIcon} />
        <View style={classNames({caret: true, caretTriko: isTriko}, classes)}>
          <Text style={classes.caretText}>{count < 10 ? count : '9+'}</Text>
        </View>
      </TouchableOpacity>
    </Scale>
  );
};

Button.propTypes = {
  count: PropTypes.number,
  onPress: PropTypes.func,
  isTriko: PropTypes.bool,
};

export default Button;
