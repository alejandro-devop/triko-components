import React from 'react';
import PropTypes from 'prop-types';
import BaseMessage from './BaseMessage';
import useStyles from 'shared/hooks/use-styles';

/**
 * This component allows to create a warning text message
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client,Triko
 * @param text String Text to be displayed in the message
 * @param icon
 * @param delay
 * @returns {*}
 * @constructor
 */
const WarningMessage = ({delay, icon = 'exclamation-triangle', text}) => {
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
    backgroundColor: palette.yellowLight,
  },
  text: {
    color: palette.yellowDark,
  },
});

WarningMessage.propTypes = {
  delay: PropTypes.number,
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default WarningMessage;
