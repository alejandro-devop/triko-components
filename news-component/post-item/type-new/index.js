import useStyles from 'shared/hooks/use-styles';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import React from 'react';
import styles from './styles';
import RenderImages from '../render-images';

const TypeNew = ({onView, post = {}}) => {
  const {content, images = []} = post;
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity onPress={onView} style={classes.root}>
      {images.length > 0 && <RenderImages images={images} postId={post.id} />}
      <View style={classes.content}>
        <Text style={classes.text}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TypeNew;
