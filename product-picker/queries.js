import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query getProducts(
    $product: String
    $categories: String
    $locale: String = "en"
  ) {
    response: searchproduct(
      product: $product
      categories_ids: $categories
      locale: $locale
    ) {
      id
      name
      description
      categories {
        id
        category {
          id
          name
        }
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation addProduct(
    $market: Int
    $product: Int
    $categories: String
    $name: String
    $description: String
    $attrs: String
  ) {
    response: product(
      marketplace_id: $market
      product_id: $product
      categories_ids: $categories
      name: $name
      description: $description
      attrs: $attrs
    ) {
      id
      name
      product_id
      description
      attrs
      categories {
        category {
          name
        }
      }
    }
  }
`;
