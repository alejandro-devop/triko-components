import gql from 'graphql-tag';

export const GET_FRIENDSHIP_REQUESTS = gql`
  query getMyRequests($client: Int, $locale: String = "es") {
    send: friendship(client_id: $client, locale: $locale) {
      byMe: clientRequestedSended {
        id
        user {
          id
          phone: phonenumber
          photo: photo_url
        }
        pi: personalinformation {
          id
          firstName: first_name
          lastName: last_name
        }
      }
    }
    received: clients(id: $client, locale: $locale) {
      id
      friends
      friendship {
        friends: clientAccepted {
          id
          user {
            id
            photo: photo_url
          }
          pi: personalinformation {
            firstName: first_name
            lastName: last_name
          }
        }
        requests: clientRequested {
          id
          user {
            id
            photo: photo_url
          }
          pi: personalinformation {
            firstName: first_name
            lastName: last_name
          }
        }
      }
    }
  }
`;
