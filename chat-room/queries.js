import gql from 'graphql-tag';

export const SAVE_CHATROOM = gql`
  mutation createChatRoom($request: Int, $attrs: String) {
    response: chat(service_request_id: $request, attrs: $attrs) {
      id
      idActive
      attrs
      chatsmessages {
        id
        sender_id
        receiver_id
        message
        receiver {
          id
          photo_url
        }
        sender {
          id
          photo_url
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $chat: Int
    $sender: Int
    $receiver: Int
    $message: String
    $attrs: String
  ) {
    response: chatmessage(
      chat_id: $chat
      sender_id: $sender
      receiver_id: $receiver
      message: $message
      attrs: $attrs
    ) {
      id
      message
      sender {
        id
        photo_url
      }
      receiver {
        id
        photo_url
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getChats($id: Int, $locale: String = "en") {
    response: chats(id: $id, locale: $locale) {
      id
      messages: chatsmessages {
        id
        message
        sender {
          id
          photo_url
        }
        receiver {
          id
          photo_url
        }
      }
    }
  }
`;

export const GET_TRIKO_REQUESTS = gql`
  query getPendingRequests($client: Int, $triko: Int, $locale: String = "en") {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      locale: $locale
      onlyOwned: true
    ) {
      id
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        tip
        transport
        payment_method
      }
      client {
        id
        user {
          id
          photo_url
        }
        pi: personalinformation {
          first_name
          last_name
        }
      }
      triko {
        id
        user {
          id
          photo_url
        }
        pi: personalinformation {
          first_name
          last_name
        }
      }
      chat {
        id
        messages: chatsmessages {
          id
          message
          date: created_at
        }
      }
    }
  }
`;
