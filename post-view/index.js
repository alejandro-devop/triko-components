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
import {useGetPost} from './hooks';
import Loader from './loader';
import LikesResume from 'shared/components/post-like-button/likes-resume';
import {useSession} from 'hooks/index';

const PostView = ({postId, isTriko}) => {
  const [classes] = useStyles(styles);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [openedComment, toggleComment] = useToggle(false);
  const {
    stack: {client = {}, triko = {}},
  } = useSession();
  const {loading, post = {}, refresh} = useGetPost(
    postId,
    client.id,
    triko.id,
    isTriko,
  );
  const {
    title,
    content,
    images = [],
    likes,
    clientsLikes = [],
    trikosLikes = [],
    comments = [],
    author,
    published,
  } = !isEmpty(post) && !loading ? post : {};
  const handleImageView = (image) => setImageToDisplay(image);
  const handleCommentSaved = async () => {
    toggleComment();
    await refresh();
  };
  console.log('Data: ', post);
  const likeIds = (isTriko ? trikosLikes : clientsLikes).map((item) => item.id);
  return (
    <>
      <View style={classes.root}>
        {loading && <Loader />}
        {!loading && (
          <>
            <Text variant="title">{title}</Text>
            <Author author={author} published={published} />
            {images.length > 0 && (
              <ImagesRender onViewImage={handleImageView} images={images} />
            )}
            <View style={classes.contentWrapper}>
              <Text style={classes.textContent}>{content}</Text>
            </View>
            {openedComment && (
              <CommentPost
                post={post}
                isTriko={isTriko}
                onSaved={handleCommentSaved}
                onCancel={() => toggleComment()}
              />
            )}
            <LikesResume likes={clientsLikes} max={9} />
            <View style={classes.actions}>
              <PostLikeButton
                postId={post.id}
                isTriko={isTriko}
                count={likes}
                likes={likeIds}
                onSaved={refresh}
              />
              <View style={classes.actionWrapper}>
                <CircleButton
                  badge={comments.length}
                  label="comment_post_text"
                  primary={openedComment}
                  onPress={() => toggleComment()}
                  styles={{label: classes.label}}
                  size="sm"
                  name="comment"
                />
              </View>
            </View>
          </>
        )}
        <PostComments
          isTriko={isTriko}
          refreshPost={refresh}
          post={post}
          loading={loading}
        />
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
