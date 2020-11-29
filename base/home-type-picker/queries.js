import gql from 'graphql-tag';

/**
 * Query to list the building types.
 * @param id Int To fetch a specific building type
 * @param locale String To manage the translation
 * @version 1.0.0
 * @app Client.
 * @type {DocumentNode}
 */
export const GET_BUILDING_TYPES = gql`
  query getBuildingTypes($id: Int, $locale: String = "en") {
    response: buildingstypes(id: $id, locale: $locale) {
      id
      name
      icon
    }
  }
`;
