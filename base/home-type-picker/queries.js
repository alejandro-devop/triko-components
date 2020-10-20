import gql from 'graphql-tag';

/**
 * Query to list the building types.
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
