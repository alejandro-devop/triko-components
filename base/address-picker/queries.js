import gql from 'graphql-tag';

/**
 * Query to list the client addresses
 * @version 1.0.0
 * @app Client
 * @type {DocumentNode}
 */
export const GET_ADDRESSES = gql`
  query getAddresses($id: Int, $client: Int, $locale: String = "en") {
    response: clientsaddresses(id: $id, client_id: $client, locale: $locale) {
      id
      title
      address
      description
      type: buildingtype {
        id
        name
        icon
      }
      isMain
      lat: latitude
      lng: longitude
    }
  }
`;
