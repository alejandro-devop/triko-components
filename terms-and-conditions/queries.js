import gql from 'graphql-tag';

export const GET_TERMS = gql`
  query getTerms($regionCode: String) {
    response: termsandconditions(region_code: $regionCode) {
      id
      region_id
      terms_and_conditions
      privacy_policy
    }
  }
`;
