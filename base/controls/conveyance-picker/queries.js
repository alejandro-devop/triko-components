import gql from 'graphql-tag';

export const GET_CONVEYANCES = gql`
  query getTransportTypes($id: Int, $locale: String) {
    response: transporttypes(id: $id, locale: $locale) {
      id
      name
      icon
      attrs
    }
  }
`;
