import gql from 'graphql-tag';

export const GET_TRIKO_INFO = gql`
  query getTrikoInfo($triko: Int, $locale: String = "en") {
    response: trikos(id: $triko, locale: $locale) {
      id
      rating
      motto
      user {
        id
        photo: photo_url
        email
        phone: phonenumber
        attrs
      }
      services {
        id
        icon
        name
        price_base
        type: servicetype {
          id
          icon
          name
        }
      }
      medals {
        id
        name
        icon
      }
      pi: personalinformation {
        firstName: first_name
        lastName: last_name
        first_name
        last_name
      }
      bank: bankinformation {
        bank
        type
        nequi
        accountNumber
        qr
      }
    }
  }
`;

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
