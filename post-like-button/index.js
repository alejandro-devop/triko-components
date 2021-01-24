import React from 'react';
import IconButton from 'shared/components/base/buttons/circle-button';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';

const PostLikeButton = () => {
  const [classes] = useStyles(styles);
  const isLiked = false;
  return (
    <>
      <IconButton
        name="thumbs-up"
        label={isLiked ? 'remove_text' : 'like_text'}
        size="sm"
        primary={isLiked}
        styles={{label: classes.label}}
      />
    </>
  );
};

export default PostLikeButton;
