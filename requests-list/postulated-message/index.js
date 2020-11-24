import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import {useStyles} from 'hooks/index';
import styles from './styles';
import {startedStatuses} from 'shared/hooks/use-request-status';

const PostulatedMessage = ({request = {}, isTriko}) => {
  const [classes] = useStyles(styles);
  const {triko: trikos = [], transition = {}} = request;
  const {workflow} = transition;
  const [triko = {}] = trikos;
  const isPostulated = isTriko
    ? trikos.map((item) => item.id).includes(triko.id)
    : false;
  if (!isPostulated || startedStatuses.includes(workflow)) {
    return null;
  }
  return (
    <View style={classes.postulatedWrapper}>
      <Text style={classes.postulatedText}>postulated_text</Text>
    </View>
  );
};

export default PostulatedMessage;
