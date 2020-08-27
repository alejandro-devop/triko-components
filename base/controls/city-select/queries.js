import gql from "graphql-tag";

export const GET_CITIES = gql`
    query getCities($countryId: Int = 0, $size: Int = 10, $page: Int = 1) {
        response: cities(
            country_id: $countryId
            page_size: $size
            page_number: $page
        ) {
            cities: data {
                id
                name
                code
            }
        }
    }
`;
