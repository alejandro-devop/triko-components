import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation sendContactSupport(
    $region: Int
    $email: String
    $phone: String
    $fullName: String
    $message: String
  ) {
    response: contactsupportemail(
      region_id: $region
      email: $email
      phonenumber: $phone
      fullname: $fullName
      message: $message
    ) {
      email
      phonenumber
      fullname
      sended
    }
  }
`;
