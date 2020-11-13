import gql from 'graphql-tag';

export const GET_REQUEST = gql`
  query getPendingRequests(
    $id: Int
    $client: Int
    $triko: Int
    $locale: String = "en"
  ) {
    response: servicesrequests(
      id: $id
      client_id: $client
      triko_id: $triko
      locale: $locale
    ) {
      id
      address
      duration
      type: servicerequesttype {
        id
        name
      }
      application_date
      chat {
        id
        messages: chatsmessages {
          id
          sender {
            id
          }
        }
      }
      order {
        id
        order_code
        payment_method_id
        method: paymentmethod {
          name
          icon
          attrs {
            type
          }
        }
        subtotal
        taxtotal
        total
        details {
          concept {
            name
          }
          total
        }
        transition: workflowtransition {
          workflow
        }
      }
      history {
        id
        transition: workflowtransition {
          workflow
        }
        transitionStep: transition
        created_at
        user: user_id
      }
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        tip
        transport
        payment_method
      }
      details: servicesrequestsdetails {
        id
        service {
          id
          name
          icon
          type: servicetype {
            id
            name
            icon
          }
        }
      }
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        tip
        transport
        payment_method
      }
      transition: workflowtransition {
        workflow
      }
      triko {
        id
        rating
        pi: personalinformation {
          id
          id_number
          first_name
          last_name
          birth_date
          city {
            id
            name
          }
          idtype {
            id
            name
          }
          gender {
            id
            name
          }
          civilstatus {
            id
            name
          }
        }
        user {
          id
          photo_url
          phonenumber
          attrs
        }
      }
      client {
        id
        pi: personalinformation {
          id
          id_number
          first_name
          last_name
          birth_date
          city {
            id
            name
          }
          idtype {
            id
            name
          }
          gender {
            id
            name
          }
          civilstatus {
            id
            name
          }
        }
        user {
          id
          photo_url
          phonenumber
          attrs
        }
      }
    }
  }
`;

export const SAVE_RATING = gql`
  mutation sendRating(
    $request: Int
    $rating: Int
    $isClient: Boolean
    $comment: String
    $locale: String = "en"
  ) {
    response: servicerequestrating(
      service_request_id: $request
      apply_client: $isClient
      rating: $rating
      comment: $comment
      locale: $locale
    ) {
      id
    }
  }
`;
