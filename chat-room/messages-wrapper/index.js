import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Keyboard} from 'react-native';
import useStyles from 'hooks/useStyles';
import MessageItem from '../message-item';
import usePusherSubscriber from 'hooks/usePusherSubscriber';
import {EVENT__MESSAGE} from 'helpers/PusherClient';
import EmptyIcon from '../EmptyIcon';
import {useMessagesFetcher} from '../hooks';
import {CircularLoader} from 'components/base/loaders';
import styles from './styles';
import profilePhoto from 'assets/avatars/real-profile-photo.jpg';
import ImageIcon from 'components/ImageIcon';

/**
 * This component renders the presentation for the message container, it also fetch the chat messages
 * @author Jako <jakop.box@gmail.com>
 * @param chatId
 * @param userTo
 * @param newMessages
 * @param onSaveMessage
 * @returns {*}
 * @constructor
 */
const MessagesWrapper = ({chatId, userTo, newMessages = [], onSaveMessage}) => {
  const [classes] = useStyles(styles);
  const scrollRef = useRef(null);
  const {subscribeEvent, unSubscribeEvent} = usePusherSubscriber();
  const {loading, messages, user, refresh} = useMessagesFetcher({
    chatId,
    newMessages,
  });

  useEffect(() => {
    scrollRef.current.scrollToEnd();
    const inListener = Keyboard.addListener('keyboardDidShow', () =>
      scrollRef.current.scrollToEnd(),
    );
    const id = subscribeEvent(EVENT__MESSAGE, onGetNewMessages);
    return () => {
      inListener.remove();
      unSubscribeEvent(EVENT__MESSAGE, id);
    };
  }, [messages]);

  const onGetNewMessages = async () => {
    await refresh();
  };

  const onMessageSaved = async (newMessage, oldMessage) => {
    try {
      onSaveMessage(newMessage, oldMessage);
      await refresh();
    } catch (e) {
      console.log('Trying to refetch', e);
    }
  };

  return (
    <View style={classes.root}>
      {!loading && messages.length === 0 && <EmptyIcon />}
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({animated: true})
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={classes.scrollView}>
        {loading && <CircularLoader />}
        {!loading &&
          messages.map((message, key) => (
            <MessageItem
              avatar={null}
              delay={key * 100}
              key={`message-${key}`}
              chatId={chatId}
              onMessageSaved={onMessageSaved}
              messageItem={message}
              userFrom={user}
              userTo={userTo}
            />
          ))}
      </ScrollView>
    </View>
  );
};

MessagesWrapper.propTypes = {
  chatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userTo: PropTypes.shape({id: PropTypes.number}),
  newMessages: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number})),
  onSaveMessage: PropTypes.func,
};

export default MessagesWrapper;
