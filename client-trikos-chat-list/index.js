import React from 'react';
import {View} from 'react-native';
import Loader from './Loader';
import useStyles from 'shared/hooks/use-styles';
import ChatIcon from 'assets/icons/comments-bubble.png';
import ChatItem from './ChatItem';
import EmptySet from 'main/screens/commons/EmptySet';
import {useChatList} from 'shared/components/chat-room/hooks';
import {useSession} from 'hooks/index';
import useNavigate from 'shared/hooks/use-navigate';

const ClientChatList = () => {
  const {loading, chats = []} = useChatList({isClient: true});
  const [classes] = useStyles(styles);
  const {setKey} = useSession();
  const {navigation} = useNavigate();

  const onSelectItem = (item) => {
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
            onPress={() => onSelectItem(chatItem)}
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
