import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'shared/components/base/icon';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component allows to render an icon with decoration
 * @author Jako <jakop.box@gmail.com>
 * @param name
 * @returns {*}
 * @constructor
 */
const PrettyIcon = ({name, classes: otherClasses = {}}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, otherClasses.root]}>
      <Icon name={name} style={[classes.icon, otherClasses.icon]} />
    </View>
  );
};

const styles = ({palette}) => ({
  icon: {
    fontSize: 120,
    color: palette.blue,
  },
  root: {
    borderRadius: 200,
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blueLight,
    borderWidth: 4,
    borderColor: palette.blue,
  },
});

PrettyIcon.propTypes = {
  name: PropTypes.string,
};

export default PrettyIcon;
