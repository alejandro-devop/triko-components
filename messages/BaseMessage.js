import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
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
 * @param replacements
 * @returns {*}
 * @constructor
 */
const BaseMessage = ({icon, textClass, text, wrapperClass, replacements}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, wrapperClass]}>
      {icon && <Icon name={icon} style={[classes.icon, textClass]} />}
      <View style={classes.textWrapper}>
        <Text
          style={[classes.text, textClass]}
          variant="caption"
          replacements={replacements}>
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
  replacements: PropTypes.oneOfType([PropTypes.object]),
  textClass: PropTypes.any,
  text: PropTypes.string,
  wrapperClass: PropTypes.any,
};

export default BaseMessage;
