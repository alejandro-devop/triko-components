import gql from 'graphql-tag';

export const SAVE_EVENT = gql`
  mutation saveEvent(
    $triko: Int
    $eventId: Int
    $remove: Boolean
    $attrs: String
    $locale: String = "es"
    $event: String
  ) {
    trikoCalendar(
      triko_id: $triko
      event_id: $eventId
      event: $event
      remove: $remove
      attrs: $attrs
      locale: $locale
    ) {
      id
      service_request_id
      title
      start
      end
      calendartype {
        id
        name
        attrs
      }
    }
  }
`;
