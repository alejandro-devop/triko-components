import React from 'react';
import PropTypes from 'prop-types';
import IconFW from 'react-native-vector-icons/FontAwesome5';
import IconFW4 from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {useStyles} from '@triko-app/hooks';

export const FONTAWESOME5 = 'fw5';
export const FONTAWESOME4 = 'fw4';

/**
 * This function allows to get the proper component depending on the desired type
 * @param type
 * @returns {Class<Icon<FontAwesome5Glyphs>>|Class<Icon<FontAwesomeGlyphs>>}
 */
const resolveComponent = (type) => {
  switch (type) {
    case FONTAWESOME5:
      return IconFW;
    case FONTAWESOME4:
      return IconFW4;
    default:
      return IconFW;
  }
};

/**
 * This component allows to generate icons with the same properties and size.
 * @author Alejandro <alejandro.devop@gmail.com>
 */
const Icon = ({from, name, size, style}) => {
  const Component = resolveComponent(from);
  const [classes] = useStyles(styles);
  return <Component name={name} style={[classes.root, style]} size={size} />;
};

Icon.defaultProps = {
  from: FONTAWESOME5,
  name: '',
  size: 20,
};

Icon.propTypes = {
  from: PropTypes.oneOf(['fw5', 'fw4']),
  name: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Icon;
