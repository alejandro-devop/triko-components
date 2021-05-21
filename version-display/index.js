import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import useApplicationConfig from 'shared/hooks/use-application-env';

/**
 * This component displays the current application version
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param otherClasses
 * @returns {*}
 * @constructor
 */
const VersionDisplay = ({classes: otherClasses = {}}) => {
  const [classes] = useStyles(styles);
  const {version} = useApplicationConfig();
  return (
    <SafeAreaView style={[classes.root, otherClasses.root]}>
      <Text style={[classes.text, otherClasses.text]}>{`v${version}`}</Text>
    </SafeAreaView>
  );
};

const styles = ({palette}) => ({
  root: {
    position: 'absolute',
  },
  text: {
    fontSize: 10,
    color: palette.gray,
  },
});

VersionDisplay.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
};

VersionDisplay.defaultProps = {
  classes: {},
};

export default VersionDisplay;
