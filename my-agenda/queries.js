import gql from 'graphql-tag';

export const GET_EVENTS = gql`
  query getEvents(
    $triko: Int
    $locale: String = "en"
    $from: String
    $to: String
  ) {
    response: trikoCalendars(
      triko_id: $triko
      locale: $locale
      startDateTime: $from
      endDateTime: $to
    ) {
      id
      service_request_id
      title
      start
      end
      attrs
      type: calendartype {
        id
        name
      }
      request: servicerequest {
        id
      }
    }
  }
`;
