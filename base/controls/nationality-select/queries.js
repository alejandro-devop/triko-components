import gql from 'graphql-tag';

export const GET_COUNTRIES = gql`
  query {
    response: countries {
      id
      iso2
      name
    }
  }
`;
