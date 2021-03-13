import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Slide from 'shared/components/anims/Slide';
import styles from './styles/guidance-item.style';
import useStyles from 'hooks/useStyles';
import PreImage from 'components/pre-image';
import CircleButton from 'components/base/buttons/circle-button';
import StepInfo from './StepInfo';
import avatar from 'assets/avatars/triko-avatar.png';
import StepCount from './StepCount';
import GestureRecognizer from 'react-native-swipe-gestures';

/**
 * This component renders a single guide item.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onDone
 * @param steps
 * @returns {null|*}
 * @constructor
 */
const GuidanceItem = ({onDone, steps = []}) => {
  const [classes] = useStyles(styles);
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const totalSteps = steps.length;

  const handleNext = () => {
    let nextStep = currentStep + 1;
    if (nextStep + 1 > totalSteps) {
      onDone();
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    let nextStep = currentStep - 1;
    if (nextStep >= 0) {
      setCurrentStep(nextStep);
    }
  };

  if (!step) {
    return null;
  }

  const onSwipeRight = () => {
    handleBack();
  };
  const onSwipeLeft = () => {
    handleNext();
  };

  const lastStep = currentStep + 1 === totalSteps;

  return (
    <Slide direction="bottom" style={classes.root} delay={100}>
      <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft}>
        <View style={classes.body}>
          <View style={classes.imageWrapper}>
            <PreImage style={classes.image} source={avatar} />
          </View>
          <StepInfo title={step.title} description={step.description} />
        </View>
        {totalSteps > 1 && (
          <StepCount steps={steps.length} currentStep={currentStep} />
        )}
        <View style={classes.actions}>
          <CircleButton name="chevron-left" size="sm" onPress={onSwipeRight} />
          <CircleButton
            name={lastStep ? 'check' : 'chevron-right'}
            size="sm"
            onPress={onSwipeLeft}
          />
        </View>
      </GestureRecognizer>
    </Slide>
  );
};

GuidanceItem.proptypes = {
  onDone: PropTypes.func,
  steps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default GuidanceItem;
