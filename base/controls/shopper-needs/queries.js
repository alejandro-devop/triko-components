import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query getCategories($id: Int, $region: Int, $locale: String = "en") {
    response: categoriesnames(id: $id, region_id: $region, locale: $locale) {
      id
      region_id
      name
      description
    }
  }
`;
