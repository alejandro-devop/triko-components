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

export const SAVE_MARKET_PLACE = gql`
  mutation saveMarketPlace(
    $id: Int
    $city: Int
    $categories: String
    $name: String
    $description: String
    $address: String
    $lat: String
    $lng: String
    $attrs: String
  ) {
    response: marketplace(
      market_place_id: $id
      city_id: $city
      categories_ids: $categories
      name: $name
      description: $description
      address: $address
      latitude: $lat
      longitude: $lng
      attrs: $attrs
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
