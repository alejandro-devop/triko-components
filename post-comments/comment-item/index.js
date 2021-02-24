import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Text from 'shared/components/base/text';
import PreImage from 'shared/components/base/pre-image';
import defaultImage from 'assets/avatars/profile-photo.jpg';
import {getElapsedTime, isEmpty} from 'shared/utils/functions';
import moment from 'moment';
import {useSession} from 'hooks/index';
import CircleButton from 'shared/components/base/buttons/circle-button';
import {useCommentRemove} from 'shared/components/post-view/hooks';
import CircularLoader from 'shared/components/loaders/circular-loader';
import Slide from 'shared/components/anims/Slide';

const CommentItem = ({
  comment = {},
  delay,
  format = 'YYYY-MM-DD HH:mm:ss',
  onRemoved,
  isTriko,
  postId,
}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {client = {}},
  } = useSession();
  const [removed, setRemoved] = useState(false);
  const {created_at, text, author = {}, id} = comment;
  const currentTime = moment().format(format);
  const [removeComment, loading] = useCommentRemove(id, postId);
  const postedDate = (!isEmpty(created_at)
    ? moment(created_at, format)
    : moment()
  ).format(format);
  const {user = {}, pi = {}} = author;
  const {photo} = user;
  const {firstName, lastName} = pi;
  const elapsedTime = getElapsedTime(postedDate, currentTime);
  const isMe = client.id === author.id;
  const handleRemove = async () => {
    await removeComment();
    setRemoved(true);
    if (onRemoved) {
      onRemoved();
    }
  };
  return (
    <Slide direction="right" delay={delay} style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          style={classes.avatar}
          source={!isEmpty(photo) ? {uri: photo} : defaultImage}
        />
      </View>
      <View style={classes.commentWrapper}>
        <Text style={[classes.textAvatar, classes.text]}>
          {isMe ? 'me_text' : `${firstName} ${lastName}`}
        </Text>
        <View style={classes.bubbleWrapper}>
          <Text style={[classes.text]}>{text}</Text>
          {isMe && !removed && (
            <View style={classes.buttonWrapper}>
              {loading ? (
                <CircularLoader />
              ) : (
                <CircleButton
                  onPress={handleRemove}
                  name="trash"
                  primary
                  size="xxs"
                />
              )}
            </View>
          )}
        </View>
        <View style={classes.actionsWrapper}>
          <Text
            replacements={{elapsed: elapsedTime}}
            style={[classes.text, classes.textElapsed]}>
            elapsed_text
          </Text>
        </View>
      </View>
    </Slide>
  );
};

export default CommentItem;
