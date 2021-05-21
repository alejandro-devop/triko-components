import React from 'react';
import FastImage from 'react-native-fast-image';
import {useStyles} from '@triko-app/hooks';
const getResizeMode = (rm) => {
  switch (rm) {
    case 'contain':
      return FastImage.resizeMode.contain;
    case 'cover':
      return FastImage.resizeMode.cover;
    case 'stretch':
      return FastImage.resizeMode.stretch;
    case 'center':
      return FastImage.resizeMode.center;
    default:
      return FastImage.resizeMode.contain;
  }
};
const Image = ({resizeMode = 'contain', source, style}) => {
  const [classes] = useStyles(styles);
  const rm = getResizeMode(resizeMode);
  return (
    <FastImage resizeMode={rm} source={source} style={[classes.root, style]} />
  );
};

const styles = () => ({
  root: {
    // resizeMode: '',
  },
});

export default Image;
