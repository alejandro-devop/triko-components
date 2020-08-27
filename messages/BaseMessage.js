import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import Icon from 'shared/components/base/icon';

/**
 * This component gives the base for every simple message.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.1
 * @app Client,Triko
 * @param icon
 * @param wrapperClass
 * @param textClass
 * @param text
 * @returns {*}
 * @constructor
 */
const BaseMessage = ({icon, textClass, text, wrapperClass}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, wrapperClass]}>
      {icon && <Icon name={icon} style={[classes.icon, textClass]} />}
      <View style={classes.textWrapper}>
        <Text style={[classes.text, textClass]} variant="caption">
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  icon: {
    marginHorizontal: 10,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
  },
  textWrapper: {
    flex: 1,
  },
};

BaseMessage.propTypes = {
  delay: PropTypes.number,
  icon: PropTypes.string,
  textClass: PropTypes.any,
  text: PropTypes.string,
  wrapperClass: PropTypes.any,
};

export default BaseMessage;
