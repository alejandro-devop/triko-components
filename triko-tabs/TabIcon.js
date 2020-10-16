import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import PreImage from 'components/pre-image';
import useStyles from 'hooks/useStyles';
import Text from 'components/base/text';
import classNames from 'utils/classnames';
import styles from './styles';

/**
 * This component renders the single tab button.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param Component
 * @param icon
 * @param photo
 * @param label
 * @param onPress
 * @param selected
 * @returns {*}
 * @constructor
 */
const TabIcon = ({Component, icon, photo, label, onPress, selected}) => {
  const [classes] = useStyles(styles);
  const menuIcon = icon ? (selected ? icon.active : icon.normal) : null;
  return (
    <TouchableOpacity style={classes.root} onPress={onPress}>
      <View style={classNames({wrapper: true, selected}, classes)}>
        <>
          {menuIcon && (
            <PreImage
              style={classes.icon}
              source={photo ? {uri: photo} : menuIcon}
            />
          )}
          {Component && <Component />}
        </>
      </View>
      <Text style={classes.label}>{label}</Text>
    </TouchableOpacity>
  );
};

TabIcon.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.any]),
  icon: PropTypes.oneOfType([PropTypes.any]),
  photo: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

export default TabIcon;
