import gql from 'graphql-tag';

export const UPDATE_TRANSPORTS = gql`
  mutation updateTransport($id: Int, $triko: Int, $isDefault: Int) {
    response: updatetrikotransporttype(
      triko_transport_type_id: $id
      triko_id: $triko
      is_default: $isDefault
    ) {
      id
      isDefault: is_default
      type: transporttype {
        id
        name
        icon
      }
    }
  }
`;
