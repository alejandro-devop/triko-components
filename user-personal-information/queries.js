import gql from 'graphql-tag';

export const SAVE_PERSONAL_INFORMATION = gql`
  mutation savePersonalInfo(
    $piID: Int
    $city: Int
    $civilStatus: Int
    $idType: Int
    $gender: Int
    $firstName: String
    $lastName: String
    $birthDate: String
    $client: Int
    $locale: String = "en"
    $idNumber: String
  ) {
    response: personalinformation(
      personal_information_id: $piID
      city_id: $city
      civil_status_id: $civilStatus
      id_type_id: $idType
      gender_id: $gender
      first_name: $firstName
      last_name: $lastName
      birth_date: $birthDate
      client_id: $client
      locale: $locale
      id_number: $idNumber
    ) {
      id
      city {
        id
        name
        country {
          id
          name
        }
      }
      civilstatus {
        id
        name
      }
      idtype {
        id
        name
      }
      gender {
        id
        name
      }
      id_number
      first_name
      last_name
      birth_date
    }
  }
`;
