import gql from 'graphql-tag';

export const GET_TRIKO_REQUESTS = gql`
  query getPendingRequests($client: Int, $triko: Int, $locale: String = "en") {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      locale: $locale
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
