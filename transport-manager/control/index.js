import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from '../styles/control.style';
import {useStyles} from '@triko-app/hooks';
import Icon from 'components/base/icon';
import AnimatedArrowLeft from 'components/anims/AnimatedArrowLeft';
import PreImage from 'shared/components/base/pre-image';

/**
 * This component renders a button to toggle the manager.
 * @author Jako <jakop.box@gmail.com>
 * @param selectedTransport
 * @param displayGuide
 * @param toggleDialog
 * @returns {*}
 * @constructor
 */
const Control = ({selectedTransport = {}, displayGuide, toggleDialog}) => {
  const [classes] = useStyles(styles);
  const {type = {}, icon} = selectedTransport;
  if (!type) {
    return null;
  }
  return (
    <TouchableOpacity style={classes.root} onPress={toggleDialog}>
      {icon ? (
        <PreImage style={classes.image} source={{uri: icon}} />
      ) : (
        <Icon name={'bicycle'} style={classes.icon} />
      )}
      {displayGuide && (
        <View style={classes.arrowWrapper}>
          <AnimatedArrowLeft
            iconStyles={classes.guide}
            style={classes.guideWrapper}
            icon="hand-point-left"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Control;
