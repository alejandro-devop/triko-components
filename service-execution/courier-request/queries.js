import gql from 'graphql-tag';

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $detail: Int
    $cart: Int
    $remove: Boolean
    $product: String
    $locale: String = "locale"
  ) {
    response: cart(
      service_request_detail_id: $detail
      cart_id: $cart
      remove: $remove
      product: $product
      locale: $locale
    ) {
      id
      details: servicesrequestsdetails {
        id
        products {
          id
          image {
            url_download_file
          }
          measureunit {
            id
            name
          }
          quantity: qty
          price
          product {
            id
            name
            categories {
              category {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
