import {useEffect} from 'react';
import {Keyboard} from 'react-native';

const KeyboardListener = ({onShow, onHide}) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (onShow) {
          onShow();
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (onHide) {
          onHide();
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return null;
};

export default KeyboardListener;
