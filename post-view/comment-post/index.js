import React, {useState} from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import TextArea from 'shared/components/base/controls/text-area';
import CircleButton from 'shared/components/base/buttons/circle-button';

const PostComment = ({onCancel}) => {
  const [comment, setComment] = useState('');
  const [classes] = useStyles(styles);
  const handleSend = () => {};
  const handleCancel = () => {
    setComment('');
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <View style={classes.root}>
      <TextArea
        maxChars={200}
        onChange={({target: {value}}) => setComment(value)}
        primary
        placeholder="type_a_comment"
        value={comment}
      />
      <View style={classes.actions}>
        <CircleButton name="check" primary onPress={handleSend} />
        <CircleButton name="times" onPress={handleCancel} />
      </View>
    </View>
  );
};

export default PostComment;
