import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import IconButton from 'shared/components/base/buttons/circle-button';
import useStyles from 'shared/hooks/use-styles';
import Icon from 'shared/components/base/icon';
import styles from './styles';
import Text from 'shared/components/base/text';
import {useSendLike} from 'shared/components/post-like-button/hooks';
import CircularLoader from 'shared/components/loaders/circular-loader';
import {useSession} from 'hooks/index';
import classNames from 'shared/utils/classnames';

const PostLikeButton = ({alt, count = 0, postId, likes = [], onSaved}) => {
  const [classes] = useStyles(styles);
  const [sendLike, loading] = useSendLike(postId);
  const {
    stack: {client = {}},
  } = useSession();
  const isLiked = likes.includes(client.id);
  const handleLike = async () => {
    await sendLike(isLiked);
    if (onSaved) {
      onSaved();
    }
  };
  return (
    <View style={classNames({root: true, rootLiked: isLiked && alt}, classes)}>
      {loading ? (
        <CircularLoader size={30} />
      ) : (
        <>
          {alt ? (
            <TouchableOpacity onPress={handleLike} style={classes.altButton}>
              <Icon
                name="thumbs-up"
                style={classNames({icon: true, iconLiked: isLiked}, classes)}
              />
            </TouchableOpacity>
          ) : (
            <IconButton
              name="thumbs-up"
              label={isLiked ? 'remove_text' : 'like_text'}
              size="sm"
              primary={isLiked}
              onPress={handleLike}
              styles={{label: classes.label}}
            />
          )}
          {count > 0 && (
            <View style={classes.badgeWrapper}>
              <Text style={classes.badgeText}>{count}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PostLikeButton;
