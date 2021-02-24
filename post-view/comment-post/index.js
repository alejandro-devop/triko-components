import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import TextArea from 'shared/components/base/controls/text-area';
import CircleButton from 'shared/components/base/buttons/circle-button';
import {isEmpty} from 'shared/utils/functions';
import {useSaveComment} from 'shared/components/post-view/hooks';
import {LoadingCurtain} from 'components/base/dialogs';

const PostComment = ({onCancel, onSaved, secondary, post = {}, isTriko}) => {
  const [comment, setComment] = useState('');
  const {id} = post;
  const [savePost, loading] = useSaveComment(id, isTriko);
  const [classes] = useStyles(styles);
  const handleCancel = () => {
    setComment('');
    if (onCancel) {
      onCancel();
    }
  };
  const handleSend = async () => {
    await savePost({comment});
    if (onSaved) {
      onSaved();
    }
  };
  return (
    <View style={classes.root}>
      <TextArea
        maxChars={200}
        onChange={({target: {value}}) => setComment(value)}
        primary={!secondary}
        placeholder="type_a_comment"
        value={comment}
      />
      <View style={classes.actions}>
        <CircleButton
          disabled={isEmpty(comment)}
          name="check"
          primary
          onPress={handleSend}
        />
        <CircleButton name="times" onPress={handleCancel} />
      </View>
      {loading && <LoadingCurtain disableModal />}
    </View>
  );
};

export default PostComment;
