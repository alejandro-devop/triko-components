import useStyles from 'shared/hooks/use-styles';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import React from 'react';
import styles from './styles';
import RenderImages from '../render-images';

const TypeNew = ({post = {}}) => {
  const {content, images = [], cta, ctaLabel = 'Call to cation'} = post;
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {images.length > 0 && <RenderImages images={images} postId={post.id} />}
      <Text style={classes.text}>{content}</Text>
    </View>
  );
};

export default TypeNew;
