import gql from 'graphql-tag';

export const GET_STATES = gql`
  query getStates($country: Int) {
    response: states(country_id: $country) {
      id
      name
    }
  }
`;
