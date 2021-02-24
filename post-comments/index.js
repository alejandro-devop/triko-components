import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Loader from './loader';
import CommentItem from './comment-item';

const PostComments = ({loading, isTriko, post = {}, refreshPost}) => {
  const [classes] = useStyles(styles);
  const {comments = [], id} = post;
  return (
    <View style={classes.root}>
      {loading && <Loader />}
      {!loading &&
        comments.map((comment, key) => (
          <CommentItem
            onRemoved={refreshPost}
            isTriko={isTriko}
            comment={comment}
            delay={key * 100}
            key={`comment-${comment.id}`}
            postId={id}
          />
        ))}
    </View>
  );
};

export default PostComments;
