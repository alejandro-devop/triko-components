import gql from 'graphql-tag';

export const GET_MEASURES = gql`
  query getMeasures($id: Int, $locale: String = "en", $region: Int) {
    response: measuresunits(id: $id, locale: $locale, region_id: $region) {
      id
      name
      shortname
      description
    }
  }
`;
