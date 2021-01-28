import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Slide from 'components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import RequestType from './type-request';
import RecommendationType from './type-recommendation';
import Avatar from './avatar';
import NewType from './type-new';
import classNames from 'shared/utils/classnames';
import PostButtons from './post-buttons';
import useNavigate from 'shared/hooks/use-navigate';
import PostLikeButton from 'shared/components/post-like-button';
import LikesResume from 'shared/components/post-like-button/likes-resume';

const TYPE_NEW = 'new';
const TYPE_RECOMMENDATION = 'recommendation';
const TYPE_REQUEST = 'request';

const resolveComponent = (type) => {
  switch (type) {
    case TYPE_NEW:
      return NewType;
    case TYPE_RECOMMENDATION:
      return RecommendationType;
    case TYPE_REQUEST:
      return RequestType;
    default:
      return NewType;
  }
};

const PostItem = ({delay, post, refreshPosts}) => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {
    type,
    author,
    clientsLikes = [],
    date,
    disableActions,
    comments = [],
    likes = 2,
  } = post;
  const Component = resolveComponent(type);
  const isRecommendation = type === TYPE_RECOMMENDATION;
  const isPost = type === TYPE_NEW;
  const isRequest = type === TYPE_REQUEST;

  const handleViewPost = () => {
    navigation.navigate('post-view', {post});
  };
  const likeIds = clientsLikes.map((item) => item.id);
  const actions = [
    {
      icon: 'comment',
      count: comments.length,
      active: true,
    },
  ];
  return (
    <Slide
      direction={'right'}
      style={classNames(
        {root: true, rootRecommendation: isRecommendation},
        classes,
      )}
      delay={delay}>
      <TouchableOpacity onPress={handleViewPost}>
        <View style={classes.avatarWrapper}>
          <Avatar
            author={author}
            date={date}
            isRecommendation={isRecommendation}
            isPost={isPost}
            isRequest={isRequest}
          />
        </View>
        <View style={classes.contentWrapper}>
          <Component post={post} />
          <LikesResume likes={clientsLikes} readOnly />
        </View>
        {!disableActions && (
          <PostButtons
            pre={
              <PostLikeButton
                likes={likeIds}
                onSaved={refreshPosts}
                alt
                count={likes}
                postId={post.id}
              />
            }
            buttons={actions}
            alt={isRecommendation}
          />
        )}
      </TouchableOpacity>
    </Slide>
  );
};

const styles = ({palette}) => ({
  contentWrapper: {
    paddingLeft: 70,
    minHeight: 100,
  },
  fullName: {},
  fullNameRecommendation: {},
  heading: {},
  root: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: palette.blueLight,
    marginBottom: 20,
    borderRadius: 30,
  },
  rootRecommendation: {
    backgroundColor: palette.orange,
  },
});

export default PostItem;
