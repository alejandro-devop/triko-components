import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';

const ScaleAnimation = ({
  animation = 'zoomIn',
  duration = 300,
  delay = 100,
  children,
  style = {},
  onAnimationCompleted,
}) => {
  const view = useRef(null);
  const [end, setEnd] = useState(false);
  useEffect(() => {}, []);
  const handleAnimationEnd = () => {
    setEnd(true);
    if (onAnimationCompleted) {
      onAnimationCompleted();
    }
  };

  return (
    <Animatable.View
      ref={view}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
      duration={duration}
      style={[style]}
      delay={delay}>
      {children}
    </Animatable.View>
  );
};

ScaleAnimation.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default ScaleAnimation;
