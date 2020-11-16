import gql from 'graphql-tag';

export const GET_MEDALS = gql`
  query getMedals($locale: String, $type: Int) {
    response: medals(locale: $locale, medal_type_id: $type) {
      id
      name
      icon
      attrs
      medaltype {
        id
        name
      }
    }
  }
`;
