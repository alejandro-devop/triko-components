import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import _ from 'lodash';
import styles from './styles/step-count.style';
import classNames from 'utils/classnames';

/**
 * This component renders the total steps.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param steps
 * @param currentStep
 * @returns {number|*}
 * @constructor
 */
const StepCount = ({steps = 0, currentStep = 0}) => {
  const [classes] = useStyles(styles);
  if (steps === 0) {
    return 0;
  }
  return (
    <View style={classes.root}>
      {_.times(steps, (key) => (
        <View
          key={`step-${key}`}
          style={classNames({step: true, active: currentStep === key}, classes)}
        />
      ))}
    </View>
  );
};

StepCount.propTyepes = {
  steps: PropTypes.number,
  currentStep: PropTypes.number,
};

export default StepCount;
