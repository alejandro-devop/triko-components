import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import classNames from 'utils/classnames';
import ImageIcon from 'components/ImageIcon';
import profilePhoto from 'assets/avatars/real-profile-photo.jpg';
import {useMessageSender} from '../hooks';
import Scale from 'shared/components/anims/Scale';
import styles from './styles';

/**
 * This component renders a single message presentation
 * @author Jako <jakop.box@gmail.com>
 * @param chatId
 * @param delay
 * @param userFrom
 * @param userTo
 * @param messageItem
 * @param onMessageSaved
 * @returns {*}
 * @constructor
 */
const MessageItem = ({
  chatId,
  delay = 0,
  userFrom = {},
  userTo = {},
  messageItem = {},
  onMessageSaved,
}) => {
  const [classes] = useStyles(styles);
  const {message, sender = {}, needsSave} = messageItem;
  const itsMe = sender.id === userFrom.id;
  const {loading, sendMessage} = useMessageSender({
    chatId,
    recipientUser: userTo,
  });
  const [saved, setSaved] = useState(!needsSave);

  const onSaveMessage = async () => {
    await sendMessage({
      message,
      onSaved: (newMessageData) => {
        setSaved(true);
        onMessageSaved(newMessageData, messageItem);
      },
    });
  };

  useEffect(() => {
    if (!saved && !loading) {
      onSaveMessage();
    }
  }, []);
  return (
    <Scale
      delay={delay}
      duration={500}
      direction={itsMe ? 'right' : 'left'}
      style={classNames(
        {
          root: true,
          isLoading: loading,
          itsMe,
        },
        [classes],
      )}>
      <View
        style={classNames({contentWrapper: true, meContainer: itsMe}, [
          classes,
        ])}>
        <View style={itsMe ? classes.carretRight : classes.carretLeft} />
        <View
          style={classNames({messageBubble: true, myMessage: itsMe}, [
            classes,
          ])}>
          <Text
            style={classNames(
              {
                message: true,
                myMessageText: itsMe,
              },
              [classes],
            )}>
            {message}
          </Text>
          {loading && (
            <View style={classes.loaderWrapper}>
              <ActivityIndicator size={20} color={'#FFF'} />
            </View>
          )}
        </View>
      </View>
    </Scale>
  );
};

MessageItem.propTypes = {
  chatId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userFrom: PropTypes.shape({
    id: PropTypes.number,
  }),
  userTo: PropTypes.shape({
    id: PropTypes.number,
  }),
  messageItem: PropTypes.shape({
    message: PropTypes.string,
    sender: PropTypes.shape({id: PropTypes.number}),
    needsSave: PropTypes.bool,
  }),
  onMessageSaved: PropTypes.func,
};

export default MessageItem;
