import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Slide from 'shared/components/anims/Slide';
import {useStyles} from '@triko-app/hooks';
import RequestType from './type-request';
import RecommendationType from './type-recommendation';
import Avatar from './avatar';
import NewType from './type-new';
import classNames from 'shared/utils/classnames';
import PostButtons from './post-buttons';
import useNavigate from 'shared/hooks/use-navigate';
import PostLikeButton from 'shared/components/post-like-button';
import LikesResume from 'shared/components/post-like-button/likes-resume';
import styles from './styles';
import useToggle from 'shared/hooks/use-toggle';
import PostComment from 'shared/components/post-view/comment-post';
import {POST_TYPE_POST, POST_TYPE_REQUEST} from '../consts';

const TYPE_NEW = 'new';
const TYPE_RECOMMENDATION = 'recommendation';
const TYPE_REQUEST = 'request';

const resolveComponent = (type) => {
  switch (type) {
    case POST_TYPE_POST:
      return NewType;
    case TYPE_RECOMMENDATION:
      return RecommendationType;
    case POST_TYPE_REQUEST:
      return RequestType;
    default:
      return NewType;
  }
};

const PostItem = ({delay, isTriko, post, refreshPosts}) => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {
    type,
    postType,
    author,
    clientsLikes = [],
    trikosLikes = [],
    date,
    disableActions,
    comments = [],
    likes = 2,
  } = post;
  const [openedComment, toggleComment] = useToggle(false);
  const Component = resolveComponent(postType.id);
  const isRecommendation = type === TYPE_RECOMMENDATION;
  const isPost = type === TYPE_NEW;
  const isRequest = type === TYPE_REQUEST;

  const handleViewPost = () => {
    navigation.navigate('post-view', {post});
  };

  const likeIds = (isTriko ? trikosLikes : clientsLikes).map((item) => item.id);
  const actions = [
    {
      icon: 'comment',
      count: comments.length,
      action: toggleComment,
      active: true,
    },
  ];
  const handleSaved = () => {
    toggleComment();
    refreshPosts();
  };
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
            title={post.title}
            isRecommendation={isRecommendation}
            isPost={isPost}
            isRequest={isRequest}
          />
        </View>
        <View style={classes.contentWrapper}>
          <Component post={post} isTriko={isTriko} onView={handleViewPost} />
          <LikesResume likes={isTriko ? trikosLikes : clientsLikes} readOnly />
          {!disableActions && (
            <PostButtons
              pre={
                <PostLikeButton
                  likes={likeIds}
                  isTriko={isTriko}
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
          {openedComment && (
            <View style={classes.commentWrapper}>
              <PostComment
                secondary
                isTriko={isTriko}
                post={post}
                onSaved={handleSaved}
                onCancel={() => toggleComment()}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Slide>
  );
};

export default PostItem;
