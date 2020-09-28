import gql from 'graphql-tag';

export const GET_BANKS = gql`
  query getBanks {
    response: placetopaybanklists {
      bankCode
      bankName
    }
  }
`;
