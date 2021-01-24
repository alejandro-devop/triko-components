import React, {useState} from 'react';
import {View} from 'react-native';
import Author from './author';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import PostComments from 'shared/components/post-comments';
import CircleButton from 'shared/components/base/buttons/circle-button';
import PostLikeButton from 'shared/components/post-like-button';
import useToggle from 'shared/hooks/use-toggle';
import CommentPost from './comment-post';
import ImagesRender from './images-render';
import ImageViewer from 'shared/components/post-view/image-viewer';
import {isEmpty} from 'shared/utils/functions';

const PostView = ({postId}) => {
  const [classes] = useStyles(styles);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [openedComment, toggleComment] = useToggle(false);
  // const {loading, post} = useGetPost(postId);
  // console.log('post: ', post);
  const mock = {
    id: 7,
    postType: {
      id: 1,
      name: 'Post',
    },
    content: 'Un post con',
    comments: [],
    title: 'Post con imagen',
    likes: 0,
    clientsLikes: [],
    trikosLikes: [],
    is_public: 1,
    published: '2020-01-23 20:00:00',
    author: {
      id: 11,
      user: {
        id: 28,
        photo:
          'https://api-staging.triko.co/storage//users/24/avatar/303251d0-52b3-11eb-a520-a1e7af237322.png',
      },
      pi: {
        firstName: 'Alfredito',
        lastName: 'Gutierrez',
      },
    },
    images: [
      {
        url:
          'https://i.pinimg.com/736x/04/c3/8b/04c38b6c25bae26ebfa2e5e2820e9c35.jpg',
      },
    ],
  };
  const {title, content, images = [], author, published} = mock;
  const post = mock;
  const handleImageView = (image) => setImageToDisplay(image);
  return (
    <>
      <View style={classes.root}>
        {/*<Loader />*/}
        <Text variant="title">{title}</Text>
        <Author author={author} published={published} />
        {images.length > 0 && (
          <ImagesRender onViewImage={handleImageView} images={images} />
        )}
        <View style={classes.contentWrapper}>
          <Text style={classes.textContent}>{content}</Text>
        </View>
        {openedComment && <CommentPost onCancel={toggleComment} />}
        <View style={classes.actions}>
          <PostLikeButton post={post} />
          <View style={classes.actionWrapper}>
            <CircleButton
              label="comment_post_text"
              primary={openedComment}
              onPress={toggleComment}
              styles={{label: classes.label}}
              size="sm"
              name="comment"
            />
          </View>
        </View>
        <PostComments />
      </View>
      {!isEmpty(imageToDisplay) && (
        <ImageViewer
          open
          onClose={() => setImageToDisplay(null)}
          image={imageToDisplay}
        />
      )}
    </>
  );
};

export default PostView;
