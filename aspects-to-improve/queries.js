import gql from 'graphql-tag';

export const GET_ASPECTS_TO_IMPROVE = gql`
  query getAspectsToImprove($id: Int, $locale: String = "en") {
    response: aspectsimprove(id: $id, locale: $locale) {
      id
      name
      attrs
    }
  }
`;
