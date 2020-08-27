import gql from "graphql-tag";

export const GET_ID_TYPES = gql`
    query getIDTypes($region: Int, $locale: String = "en") {
        response: IDs_types(region_id: $region, locale: $locale) {
            id
            name
            attrs
        }
    }
`;
