import gql from 'graphql-tag';

export const GET_REGION_CONFIG = gql`
  query getRegionConfig($region: Int) {
    response: configs(region_id: $region) {
      applications {
        triko: trikowork {
          version
        }
        client: trikoclient {
          version
        }
      }
      emails {
        backgroundCheck
      }
      orders {
        prefix
      }
      rate {
        rateStep
        minimunRate
        maximunRate
        shopperComission
        shopperMinimumRate
      }
      payments {
        placetopay {
          place2payUrl
          paymentContactEmail
        }
      }
      support {
        contactWhatsApp
        contactEmail
        supportEmailSubject
        whatsappMessage
        termsUrl
      }
    }
  }
`;
