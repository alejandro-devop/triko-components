import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import AvatarWrapper from './avatar-wrapper';
import MessagesWrapper from './messages-wrapper';
import TextBoxWrapper from './textbox-wrapper';
import moment from 'moment';
import useSession from 'hooks/useSession';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_CHATROOM} from './queries';
import {isEmpty} from 'utils/functions';

/**
 * This component handles the chat between a triko and a client.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param isTriko
 * @param onClose
 * @param request
 * @returns {*}
 * @constructor
 */
const Chat = ({isTriko, onClose, request = {}}) => {
  const {client = {}, triko = {}, attrs = {}} = request;
  const {pi = {}, user: userTo} = isTriko ? client : triko;
  const {
    stack: {user = {}},
  } = useSession();
  const [saveChat, {loading: loadingChat}] = useMutation(SAVE_CHATROOM);
  const [newMessages, setNewMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  /**
   * This function allows to create a new chat room.
   * @returns {Promise<void>}
   */
  const createChatRoom = async () => {
    const {data} = await saveChat({
      variables: {
        request: request.id,
      },
    });
    if (data.response) {
      setChatId(data.response.id);
    }
  };

  /**
   * We only want to create a new chat room if the request does not have one assigned
   */
  useEffect(() => {
    if (isEmpty(attrs.chat_id)) {
      createChatRoom();
    } else {
      setChatId(attrs.chat_id);
    }
  }, []);

  /**
   * Every time a message is saved, we create a temporary message with the loader, while the real
   * message is being saved, once is saved we removed from the temporary messages.
   * @param message
   */
  const onSendMessage = (message) => {
    setNewMessages([
      ...newMessages,
      {
        id: moment().unix(),
        needsSave: true,
        message: message,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        sender: {
          id: user.id,
          photo_url: user.photo_url,
        },
      },
    ]);
  };

  /**
   * When the real message is saved we remove the temporary message from the stack.
   * @param newMessageData
   * @param oldMessage
   */
  const onSaveMessage = (newMessageData, oldMessage) => {
    setNewMessages(
      newMessages.map((item) => {
        if (item.id === oldMessage.id) {
          item = newMessageData;
        }
        return item;
      }),
    );
  };
  return (
    <>
      {!loadingChat && (
        <Wrapper>
          <AvatarWrapper
            photo={userTo.photo_url}
            name={`${pi.first_name} ${pi.last_name}`}
            onClose={onClose}
          />
          <MessagesWrapper
            onSaveMessage={onSaveMessage}
            chatId={chatId}
            userTo={userTo}
            newMessages={newMessages}
          />
          <TextBoxWrapper
            onSendMessage={onSendMessage}
            trikoName={pi.first_name}
          />
        </Wrapper>
      )}
    </>
  );
};

Chat.propTypes = {
  onClose: PropTypes.func,
  request: PropTypes.shape({
    triko: PropTypes.shape({
      user: PropTypes.object,
      pi: PropTypes.object,
    }),
    attrs: PropTypes.any,
  }),
};

export default Chat;
