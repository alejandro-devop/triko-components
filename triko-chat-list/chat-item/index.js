import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import avatar from 'assets/avatars/profile-photo.jpg';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import {getElapsedTime} from 'shared/utils/functions';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import Slide from 'shared/components/anims/Slide';
import styles from './styles';

/**
 * This component renders a single chat item for the trikolaborator.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param chatItem
 * @param delay
 * @param maxChars
 * @param onPress
 * @returns {*}
 * @constructor
 */
const ChatItem = ({chatItem = {}, delay = 0, maxChars = 30, onPress}) => {
  const [classes] = useStyles(styles);
  const {client = {}, lastMessage, messages, date} = chatItem;
  const {
    user: {photo_url: photoUrl},
    pi: {first_name: firstName, last_name: lastName},
  } = client;

  const {_t} = useTranslation();
  const fullName = `${firstName} ${lastName.substring(0, 1)}.`;
  const elapsed = lastMessage ? getElapsedTime(date).split(' ')[0] : 0;
  return (
    <Slide direction="right" delay={delay}>
      <TouchableOpacity
        onPress={onPress}
        style={classNames({root: true}, classes)}>
        <View style={classes.avatarWrapper}>
          <PreImage
            style={classes.avatar}
            source={photoUrl ? {uri: photoUrl} : avatar}
          />
        </View>
        <View style={classes.content}>
          <Text style={classNames({fullName: true, text: true}, classes)}>
            {`${fullName}`}
          </Text>
          {lastMessage.message && (
            <Text style={classNames({textPreview: true, text: true}, classes)}>
              {`${_t('chat_says_label')}: ${
                lastMessage.message.length >= maxChars
                  ? lastMessage.message.substring(0, maxChars) + '...'
                  : lastMessage.message
              }`}
            </Text>
          )}
          <Text style={classNames({timeText: true, text: true}, classes)}>
            {_t('chat_elapsed_time', {time: elapsed})}
          </Text>
        </View>
        <View style={classes.unReadWrapper}>
          <Text style={classes.unReadText}>{messages}</Text>
        </View>
      </TouchableOpacity>
    </Slide>
  );
};

export default ChatItem;
