import React from 'react';
import Image from 'shared/components/base/image';
import {useStyles} from 'hooks/index';

const ImageBackground = ({source, style}) => {
  const [classes] = useStyles(styles);
  return <Image source={source} style={[classes.image, style]} />;
};

const styles = () => ({
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImageBackground;
