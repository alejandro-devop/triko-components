import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import {getElapsedTime, isEmpty} from 'shared/utils/functions';
import defaultImage from 'assets/avatars/profile-photo.jpg';
import Text from 'shared/components/base/text';
import {useSession} from 'hooks/index';
import moment from 'moment';

const Author = ({author = {}, format = 'YYYY-MM-DD HH:mm:ss', published}) => {
  const currentTime = moment();
  const publishedDate = (
    !isEmpty(published) ? moment(published, format) : moment()
  ).format(format);

  const {user = {}, pi = {}} = author;
  const {photo} = user;
  const [classes] = useStyles(styles);
  const {firstName, lastName} = pi;
  const {
    stack: {client = {}},
  } = useSession();
  const elapsed = getElapsedTime(publishedDate, currentTime);
  return (
    <View style={classes.root}>
      <View style={classes.avatarWrapper}>
        <PreImage
          style={classes.image}
          source={!isEmpty(photo) ? {uri: photo} : defaultImage}
        />
      </View>
      <View style={classes.textWrapper}>
        <Text style={classes.text}>
          {client.id === author.id
            ? 'publish_by_me'
            : `${firstName} ${lastName}`}
        </Text>
        <Text
          replacements={{elapsed}}
          style={[classes.text, classes.textElapsed]}>
          elapsed_text
        </Text>
      </View>
    </View>
  );
};

export default Author;
