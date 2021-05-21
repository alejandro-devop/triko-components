import React from 'react';
import PropTypes from 'prop-types';
import BaseMessage from './BaseMessage';
import {useStyles} from '@triko-app/hooks';

/**
 * This component allows to create a error text message
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client,Triko
 * @param text String Text to be displayed in the message
 * @param icon
 * @param delay
 * @returns {*}
 * @constructor
 */
const ErrorMessage = ({delay, icon = 'times', text}) => {
  const [classes] = useStyles(styles);
  return (
    <BaseMessage
      delay={delay}
      icon={icon}
      text={text}
      textClass={classes.text}
      wrapperClass={classes.root}
    />
  );
};

const styles = ({palette}) => ({
  root: {
    backgroundColor: palette.redLight,
  },
  text: {
    color: palette.redDark,
  },
});

ErrorMessage.propTypes = {
  delay: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default ErrorMessage;
