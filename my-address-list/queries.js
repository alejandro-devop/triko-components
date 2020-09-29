import gql from 'graphql-tag';

export const GET_CLIENT_ADDRESSES = gql`
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

export const GET_TRIKO_ADDRESSES = gql`
  query getTrikoAddress($id: Int, $triko: Int, $locale: String) {
    response: trikoaddress(id: $id, triko_id: $triko, locale: $locale) {
      id
      isMain
      triko_id
      title
      address
      lat: latitude
      lng: longitude
      attrs
    }
  }
`;
