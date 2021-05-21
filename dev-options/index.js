import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import {useStyles} from '@triko-app/hooks';
import useApplicationConfig from 'shared/hooks/use-application-env';

/**
 * This component allows to display if the application is in development state.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {*}
 * @constructor
 */
const DevOptions = () => {
  const [classes] = useStyles(styles);
  const {env} = useApplicationConfig();
  if (env !== 'dev') {
    return null;
  }
  return (
    <TouchableOpacity style={classes.root}>
      <Icon name="code" style={classes.icon} />
      <Text style={classes.text}>DEV</Text>
    </TouchableOpacity>
  );
};

const styles = () => ({
  icon: {color: '#FFF'},
  root: {
    backgroundColor: '#00a152',
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    top: '25%',
    opacity: 0.6,
    zIndex: 1500,
  },
  text: {
    marginTop: 2,
    color: '#FFF',
    fontSize: 8,
  },
});

export default DevOptions;
