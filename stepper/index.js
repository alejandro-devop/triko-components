import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import _ from 'lodash';
import getStyles from './styles';
import classNames from 'shared/utils/classnames';
import useStyles from 'shared/hooks/use-styles';

const stepSize = 12;

/**
 * This component allows to create a stepper tracker.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param current
 * @param steps
 * @param secondary
 * @param title
 * @returns {null|*}
 * @constructor
 */
const Stepper = ({current = 0, secondary, steps = 0, title}) => {
  const [classes] = useStyles(getStyles(stepSize));
  // We use this to calc the progress with.
  const [availableWidth, setAvailableWidth] = useState(0);
  if (steps < 1) {
    return null;
  }
  const progressWidth = (availableWidth / (steps - 1)) * current;
  const offset = stepSize * 0.25 * (current / 100);
  return (
    <View style={classes.root}>
      {title && (
        <Text
          style={classNames({title: true, secondaryText: secondary}, classes)}>
          {title}
        </Text>
      )}
      <View style={classes.stepsWrapper}>
        <View
          style={classes.progressTrack}
          onLayout={({nativeEvent: {layout}}) => {
            setAvailableWidth(layout.width);
          }}
        />
        {_.times(steps, index => (
          <View
            key={`step-index-${index}`}
            style={classNames(
              {
                step: true,
                stepActive: current >= index,
              },
              [classes],
            )}
          />
        ))}
        <View style={[classes.progressBar, {width: progressWidth + offset}]} />
      </View>
    </View>
  );
};

Stepper.propTypes = {
  classes: PropTypes.object,
  current: PropTypes.number,
  steps: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default Stepper;
