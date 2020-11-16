import gql from 'graphql-tag';

export const SAVE_RATING = gql`
  mutation sendRating(
    $request: Int
    $rating: Int
    $comment: String
    $locale: String = "en"
  ) {
    response: servicerequestrating(
      service_request_id: $request
      rating: $rating
      comment: $comment
      locale: $locale
    ) {
      id
    }
  }
`;

export const SAVE_QUALIFICATION = gql`
  mutation qualifyService(
    $request: Int
    $medals: String
    $locale: String = "en"
  ) {
    response: servicerequestqualification(
      service_request_id: $request
      medal_ids: $medals
      locale: $locale
    ) {
      id
      medal {
        id
        name
        icon
      }
    }
  }
`;

export const SAVE_ASPECTS_TO_IMPROVE = gql`
  mutation saveAspectToImprove(
    $request: Int
    $aspects: String
    $locale: String = "en"
  ) {
    servicerequestaspectimprove(
      service_request_id: $request
      aspect_improve_ids: $aspects
      locale: $locale
    ) {
      id
      aspectimprove {
        id
        name
        attrs
      }
    }
  }
`;
