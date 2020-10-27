import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import styles from './styles/guides-wrapper.style';
import GuidanceItem from './GuidanceItem';
import useGuide from 'shared/hooks/use-guide';

/**
 * This component wraps guides and locate them at the bottom of the screen.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {null|*}
 * @constructor
 */
const GuidesWrapper = () => {
  const [classes] = useStyles(styles);
  const {steps, onPop} = useGuide();
  if (steps.length === 0) {
    return null;
  }
  return (
    <View style={classes.root}>
      <GuidanceItem steps={steps} onDone={onPop} />
    </View>
  );
};

export default GuidesWrapper;
