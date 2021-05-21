import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import {useStyles} from '@triko-app/hooks';
import {optionStyles} from './styles';
import ImageIcon from 'shared/components/base/image-icon';

/**
 * This component allows to render a list option.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param selected
 * @param label
 * @param icon
 * @param onPress
 * @returns {null|*}
 * @constructor
 */
const Option = ({icon, label, onPress, selected}) => {
  const [classes] = useStyles(optionStyles);
  if (!label) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={classNames({root: true, selected}, [classes])}>
      {Boolean(icon) && (
        <View style={classes.iconContainer}>
          <ImageIcon
            source={{uri: icon}}
            wrapperClass={classes.iconWrapper}
            imageClass={classes.icon}
          />
        </View>
      )}
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default Option;
