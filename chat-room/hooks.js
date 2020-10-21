import {useState, useMemo} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_MESSAGES, SEND_MESSAGE, GET_TRIKO_REQUESTS} from './queries';
import useNotify from 'hooks/useNotification';
import {useSession} from 'hooks/index';

/**
 * This hook helps to send individual messages
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{sendMessage: *, loading: *}}
 */
export const useMessageSender = (options = {}) => {
  const {chatId, recipientUser = {}} = options;
  const [loading, setLoading] = useState(false);
  const {
    stack: {user = {}},
  } = useSession();
  const [sendRequest] = useMutation(SEND_MESSAGE);
  const {error} = useNotify();
  const sendMessage = async ({message, onSaved}) => {
    setLoading(true);
    try {
      const {data = {}} = await sendRequest({
        variables: {
          sender: user.id,
          receiver: recipientUser.id,
          message,
          chat: chatId,
        },
      });
      if (onSaved) {
        onSaved(data.response);
      }
      setLoading(false);
    } catch (e) {
      error('Error while sending the message');
      setLoading(false);
    }
  };
  return {
    loading,
    sendMessage,
  };
};

/**
 * This hook  allows to fetch the triko and client messages
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{readMessages: *, messages: *[], refresh: *, loading: *, user: *}}
 */
export const useMessagesFetcher = (options = {}) => {
  const {chatId, newMessages = []} = options;
  const {
    stack: {user = {}, readMessages = {}},
  } = useSession();

  const {data = {}, loading, refetch} = useQuery(GET_MESSAGES, {
    fetchPolicy: 'no-cache',
    variables: {
      id: chatId,
    },
  });

  const refresh = async () => {
    await refetch();
  };
  const messages = [
    ...(data.response && Array.isArray(data.response.messages)
      ? data.response.messages
      : []),
  ];

  const messageIds = messages.map((item) => item.id);

  return {
    loading,
    messages: [
      ...messages,
      ...newMessages.filter((item) => !messageIds.includes(item.id)),
    ],
    readMessages,
    refresh,
    user,
  };
};

/**
 * This hook lists the user chat list
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{chats: *, loading: *}}
 */
export const useChatList = (options = {}) => {
  const {isClient} = options;
  const {
    stack: {client = {}, triko = {}, locale},
  } = useSession();
  const {loading, data = {}} = useQuery(
    isClient ? GET_TRIKO_REQUESTS : GET_TRIKO_REQUESTS,
    {
      fetchPolicy: 'no-cache',
      pollInterval: 5000,
      variables: {
        ...(isClient
          ? {
              client: client.id,
            }
          : {
              triko: triko.id,
            }),
        locale,
      },
    },
  );
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
            triko: item.triko,
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
