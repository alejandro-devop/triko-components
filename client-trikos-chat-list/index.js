import React from 'react';
import {View} from 'react-native';
import Loader from './Loader';
import useStyles from 'shared/hooks/use-styles';
import ChatIcon from 'assets/icons/comments-bubble.png';
import ChatItem from './ChatItem';
import EmptySet from 'main/screens/commons/EmptySet';
import mocks from './chat.mocks';
import useMock from 'hooks/useMock';

const ClientChatList = () => {
  const {loading, data = {}} = useMock(mocks);

  const chatList = data.response || [];
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {loading && <Loader />}
      {!loading && chatList.length === 0 && (
        <EmptySet source={ChatIcon} label="no_messages_from_trikos" />
      )}
      {!loading &&
        chatList.map((chatItem, key) => (
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
