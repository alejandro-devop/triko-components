import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import MenuOption from './menu-option';
import useNavigate from 'shared/hooks/use-navigate';

/**
 * This component renders the user profile options
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options
 * @returns {*}
 * @constructor
 */
const ProfileOptions = ({options = []}) => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const handleOptionPress = ({path, action}) => {
    if (action) {
      action();
    } else if (path) {
      navigation.navigate(path);
    }
  };

  return (
    <View style={classes.root}>
      {options.map((item, key) => (
        <MenuOption
          key={`menu-item-${key}`}
          onPress={() => handleOptionPress(item)}
          option={item}
        />
      ))}
    </View>
  );
};

ProfileOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.func,
      label: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
};

export default ProfileOptions;
