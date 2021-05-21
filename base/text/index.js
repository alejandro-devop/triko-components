import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {Text as TextBase} from 'react-native';
import classNames from 'shared/utils/classnames';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component allows to render a simple text, it injects the common styling
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param children
 * @param classes
 * @param replacements
 * @param style
 * @param variant type of text to be printed.
 * @returns {*}
 * @constructor
 */
const Text = ({children, replacements, style, color, variant}) => {
  const [classes, theme] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <TextBase
      style={[
        classNames(
          {
            root: true,
            caption: variant === 'caption',
            label: variant === 'label',
            link: variant === 'link',
            paragraph: variant === 'text',
            title: variant === 'title',
            titlePrimary: variant === 'title-primary',
            subtitle: variant === 'subtitle',
          },
          [classes, theme],
          style,
        ),
        color ? {color} : null,
      ]}>
      {_t(children, replacements)}
    </TextBase>
  );
};

Text.defaultProps = {
  color: null,
  variant: 'text',
};

Text.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  replacements: PropTypes.oneOfType([PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.any]),
  variant: PropTypes.oneOf([
    'text',
    'title',
    'subtitle',
    'label',
    'caption',
    'title-primary',
    'link',
  ]),
};

export default Text;
