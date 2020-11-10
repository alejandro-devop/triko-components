import React from 'react';
import {View} from 'react-native';
import Loader from './loader';
import useStyles from 'shared/hooks/use-styles';
import ChatIcon from 'assets/icons/comments-bubble.png';
import ChatItem from './chat-item';
import EmptySet from 'main/screens/commons/EmptySet';
import {useChatList} from 'shared/components/chat-room/hooks';
import useNavigate from 'shared/hooks/use-navigate';
import {useSession} from 'hooks/index';
import styles from './styles';

/**
 * This component renders the chat for the triko
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {*}
 * @constructor
 */
const TrikoChatList = () => {
  const {loading, chats = []} = useChatList();
  const {setKey} = useSession();
  const {navigation} = useNavigate();

  const [classes] = useStyles(styles);
  const onSelectChat = (item) => {
    setKey('selectedChat', item);
    navigation.navigate('chat-room');
  };
  return (
    <View style={classes.root}>
      {loading && <Loader />}
      {!loading && chats.length === 0 && (
        <EmptySet source={ChatIcon} label="no_messages_from_trikos" />
      )}
      {!loading &&
        chats.map((chatItem, key) => (
          <ChatItem
            chatItem={chatItem}
            delay={200 * key}
            key={`chat-item-${key}`}
            onPress={() => onSelectChat(chatItem)}
          />
        ))}
    </View>
  );
};

export default TrikoChatList;
