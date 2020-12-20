import gql from 'graphql-tag';

export const SAVE_ADDRESS_CLIENT = gql`
  mutation addAddress(
    $id: Int
    $address: String
    $client: Int
    $buildingType: Int!
    $title: String
    $isMain: Int
    $lat: String
    $lng: String
    $locale: String = "en"
  ) {
    response: clientAddress(
      client_address_id: $id
      address: $address
      client_id: $client
      building_type_id: $buildingType
      title: $title
      isMain: $isMain
      latitude: $lat
      longitude: $lng
      locale: $locale
    ) {
      id
      title
      address
      description
      buildingtype {
        id
        name
        icon
      }
      type: buildingtype {
        id
        name
        icon
      }
      isMain
      lat: latitude
      lng: longitude
      title
    }
  }
`;

export const SAVE_ADDRESS_TRIKO = gql`
  mutation addAddress(
    $id: Int
    $address: String
    $description: String
    $triko: Int
    $title: String
    $isMain: Int
    $lat: String
    $lng: String
    $locale: String = "en"
  ) {
    response: trikoaddress(
      triko_address_id: $id
      address: $address
      description: $description
      triko_id: $triko
      title: $title
      isMain: $isMain
      latitude: $lat
      longitude: $lng
      locale: $locale
    ) {
      id
      title
      address
      description
      isMain
      lat: latitude
      lng: longitude
      title
    }
  }
`;
