import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'shared/components/base/icon';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';

/**
 * This component allows to render an icon with decoration
 * @author Jako <jakop.box@gmail.com>
 * @param name
 * @returns {*}
 * @constructor
 */
const PrettyIcon = ({name, classes: otherClasses = {}, size}) => {
  const [classes] = useStyles(styles);
  return (
    <View
      style={[
        classNames({root: true, rootSmall: size === 'sm'}, classes),
        otherClasses.root,
      ]}>
      <Icon
        name={name}
        style={[
          classes.icon,
          classNames({iconSm: size === 'sm'}, classes),
          otherClasses.icon,
        ]}
      />
    </View>
  );
};

const styles = ({palette}) => ({
  icon: {
    fontSize: 120,
    color: palette.blue,
  },
  iconSm: {
    fontSize: 60,
  },
  root: {
    borderRadius: 200,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blueLight,
    borderWidth: 4,
    borderColor: palette.blue,
  },
  rootSmall: {
    height: 120,
    width: 120,
  },
});

PrettyIcon.propTypes = {
  name: PropTypes.string,
};

PrettyIcon.defaultProps = {
  size: 'md',
};

export default PrettyIcon;
