import gql from 'graphql-tag';

export const GET_TRANSLATIONS = gql`
  query getTranslations($group: String, $locale: String, $regionCode: String) {
    dictionary: dictionaries(group: $group, locale: $locale) {
      translation
    }
    region: regions(code: $regionCode) {
      id
      name
    }
  }
`;
