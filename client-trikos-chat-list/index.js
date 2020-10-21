import React from 'react';
import {View} from 'react-native';
import Loader from './Loader';
import useStyles from 'shared/hooks/use-styles';
import ChatIcon from 'assets/icons/comments-bubble.png';
import ChatItem from './ChatItem';
import EmptySet from 'main/screens/commons/EmptySet';
import {useChatList} from 'shared/components/chat-room/hooks';

const ClientChatList = () => {
  const {loading, chats = []} = useChatList({isClient: true});
  const [classes] = useStyles(styles);
  console.log('chats: ', chats);
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
          />
        ))}
    </View>
  );
};

const styles = () => ({
  root: {
    paddingHorizontal: 20,
  },
});

export default ClientChatList;
