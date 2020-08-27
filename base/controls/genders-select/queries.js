import gql from "graphql-tag";

export const GET_GENDERS = gql`
    query getGenders($locale: String = "en") {
        response: genders(locale: $locale) {
            id
            name
        }
    }
`;
