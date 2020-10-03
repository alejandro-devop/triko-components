import React from 'react';
import {View} from 'react-native';
import Slide from 'components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import RequestType from './RequestType';
import RecommendationType from './RecommendationType';
import Avatar from './Avatar';
import NewType from './NewType';
import classNames from 'shared/utils/classnames';
import PostButtons from './PostButtons';

const TYPE_NEW = 'new';
const TYPE_RECOMMENDATION = 'recommendation';
const TYPE_REQUEST = 'request';

const resolveComponent = type => {
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

const PostItem = ({delay, post}) => {
  const [classes] = useStyles(styles);
  const {type, author, date, disableActions} = post;
  const Component = resolveComponent(type);
  const isRecommendation = type === TYPE_RECOMMENDATION;
  const isPost = type === TYPE_NEW;
  const isRequest = type === TYPE_REQUEST;

  const actions = [
    {icon: 'thumbs-up', count: 2, action: () => alert('Like!'), active: true},
    {icon: 'comment', count: 2, action: () => alert('Comment'), active: true},
    {icon: 'bookmark', action: () => alert('Book mark'), active: true},
    {icon: 'share-square', action: () => alert('Share'), active: true},
    {icon: 'volume-mute', action: () => alert('Mute'), active: false},
  ];

  return (
    <Slide
      direction={'right'}
      style={classNames(
        {root: true, rootRecommendation: isRecommendation},
        classes,
      )}
      delay={delay}>
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
        {!disableActions && (
          <PostButtons buttons={actions} alt={isRecommendation} />
        )}
      </View>
    </Slide>
  );
};

const styles = ({palette}) => ({
  contentWrapper: {
    paddingLeft: 70,
  },
  fullName: {},
  fullNameRecommendation: {},
  heading: {},
  root: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    minHeight: 200,
    backgroundColor: palette.blueLight,
    marginBottom: 20,
    borderRadius: 30,
  },
  rootRecommendation: {
    backgroundColor: palette.orange,
  },
});

export default PostItem;
