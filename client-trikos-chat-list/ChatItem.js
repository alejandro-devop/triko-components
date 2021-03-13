import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import avatar from 'assets/avatars/profile-photo.jpg';
import PreImage from 'shared/components/base/pre-image';
import Text from 'components/base/text';
import {getElapsedTime} from 'shared/utils/functions';
import classNames from 'shared/utils/classnames';
import useTranslation from 'hooks/useTranslation';
import Slide from 'shared/components/anims/Slide';

const ChatItem = ({chatItem = {}, delay = 0, maxChars = 30, onPress}) => {
  const [classes] = useStyles(styles);
  const {triko: trikos = [], lastMessage, messages, date} = chatItem;
  const [triko = {}] = trikos;
  const {user = {}, pi = {}} = triko;
  const {first_name: firstName = '', last_name: lastName = ''} = pi;
  const {photo_url: photoUrl} = user;

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
          {Boolean(lastMessage.message) && (
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

const avatarSize = 60;

const styles = ({palette}) => ({
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },
  avatarWrapper: {
    width: avatarSize,
    height: avatarSize,
    marginRight: 20,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: 30,
  },
  root: {
    flexDirection: 'row',
    backgroundColor: palette.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 30,
  },
  rootActive: {
    backgroundColor: palette.orange,
  },
  text: {
    color: palette.blue,
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 2,
  },
  textActive: {
    color: '#FFF',
  },
  textPreview: {
    fontSize: 10,
  },
  timeText: {
    fontSize: 10,
  },
  unReadWrapper: {
    backgroundColor: palette.blue,
    padding: 2,
    minWidth: 20,
    minHeight: 20,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unReadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default ChatItem;
