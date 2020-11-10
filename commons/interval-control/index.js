import {useEffect} from 'react';

const IntervalControl = ({interval, onCycle, onUnmount, onStart}) => {
  let timer = null;
  useEffect(() => {
    if (onStart) {
      onStart();
    }
    timer = setInterval(() => {
      if (onCycle) {
        onCycle();
      }
    }, interval);
    return () => {
      clearInterval(timer);
      if (onUnmount) {
        onUnmount();
      }
    };
  }, []);
  return null;
};

export default IntervalControl;
