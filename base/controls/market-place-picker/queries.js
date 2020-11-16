import gql from 'graphql-tag';

export const GET_MARKET_PLACES = gql`
  query serachMarkets(
    $name: String
    $categories: String
    $locale: String = "en"
  ) {
    response: searchmarketplaces(
      marketplace: $name
      categories_ids: $categories
      locale: $locale
    ) {
      id
      city_id
      market_place_id
      name
      description
      latitude
      longitude
      attrs
      parent {
        id
        city_id
        market_place_id
        name
        description
        latitude
        longitude
        attrs
      }
    }
  }
`;
