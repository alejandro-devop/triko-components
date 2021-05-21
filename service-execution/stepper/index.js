import React from 'react';
import {View} from 'react-native';
import Wrapper from './wrapper';
import StepItem from './step-item';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const Stepper = ({
  lockActions,
  activeStep,
  collapsed,
  isTriko,
  request = {},
  steps = [],
}) => {
  const [classes] = useStyles(styles);
  return (
    <Wrapper collapsed={collapsed}>
      <View style={[classes.panel, classes.primary]}>
        {collapsed && (
          <StepItem
            lockActions={lockActions}
            active
            isCurrent
            isTriko={isTriko}
            request={request}
            step={steps[activeStep]}
            collapsed
          />
        )}
        {!collapsed &&
          steps.map((item, key) => (
            <StepItem
              lockActions={lockActions}
              active={activeStep >= key}
              isCurrent={activeStep === key}
              isTriko={isTriko}
              isFirst={key === 0}
              isLast={key === steps.length - 1}
              key={`step-${key}`}
              request={request}
              step={item}
            />
          ))}
      </View>
    </Wrapper>
  );
};

export default Stepper;
