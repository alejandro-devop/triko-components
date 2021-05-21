import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import classNames from 'shared/utils/classnames';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

/**
 * This component allows to create a checkbox control
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param classes
 * @param disabled
 * @param label
 * @param name
 * @param onChange
 * @param onPress
 * @param value
 * @returns {*}
 * @constructor
 */
const CheckboxField = ({disabled, label, name, onChange, onPress, value}) => {
  const [classes] = useStyles(styles);
  const handleChange = () => {
    if (onPress) {
      onPress();
    }
    if (onChange) {
      onChange({target: {name, value: !value}});
    }
  };

  const content = (
    <View style={classNames({root: true, disabled}, [classes])}>
      <View
        style={classNames({boxWrapper: true, disabledBox: classes.boxWrapper}, [
          classes,
        ])}>
        {value && <Icon name="check" size={20} style={classes.icon} />}
      </View>
      {label && <Text style={classes.label}>{label}</Text>}
    </View>
  );

  return !disabled ? (
    <TouchableOpacity onPress={handleChange} style={classes.root}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

CheckboxField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  value: PropTypes.bool,
};

export default CheckboxField;
