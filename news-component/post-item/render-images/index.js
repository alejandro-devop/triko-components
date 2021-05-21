import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import ImagePreview from '../image-preview';

const RenderImages = ({postId = '0', images = []}) => {
  const [classes] = useStyles(styles);
  const [image] = images;
  return (
    <View style={classes.root}>
      <ImagePreview url={image.url} />
    </View>
  );
};

export default RenderImages;
