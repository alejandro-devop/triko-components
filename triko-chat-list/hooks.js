import {useMemo} from 'react';
import {GET_TRIKO_REQUESTS} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

/**
 * This hook lists the user chat list
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{chats: *, loading: *}}
 */
export const useChatList = () => {
  const {
    stack: {triko = {}, locale},
  } = useSession();
  const {loading, data = {}} = useQuery(GET_TRIKO_REQUESTS, {
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
    variables: {
      triko: triko.id,
      locale,
    },
  });
  const response = data.response;
  const chats = useMemo(() => {
    const chatList = [];
    if (Array.isArray(response)) {
      response.forEach((item) => {
        const {chat = {}} = item;
        if (chat && chat.messages && chat.messages.length > 0) {
          const messagesCount = chat.messages.length;
          const lastMessage = chat.messages[messagesCount - 1];
          chatList.push({
            request: item,
            client: item.client,
            lastMessage,
            messages: messagesCount,
            date: lastMessage.date,
          });
        }
      });
    }
    return chatList;
  }, [response]);
  return {
    chats,
    loading,
  };
};
