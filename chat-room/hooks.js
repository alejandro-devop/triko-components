import {useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_MESSAGES, SEND_MESSAGE} from './queries';
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
