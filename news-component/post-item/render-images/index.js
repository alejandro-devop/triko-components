import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import PreImage from 'shared/components/base/pre-image';

const RenderImages = ({postId = '0', images = []}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {images.map((image, key) => (
        <View style={classes.imageWrapper} key={`image-${key}-post${postId}`}>
          <PreImage source={{uri: image.url}} style={classes.image} />
        </View>
      ))}
    </View>
  );
};

export default RenderImages;
