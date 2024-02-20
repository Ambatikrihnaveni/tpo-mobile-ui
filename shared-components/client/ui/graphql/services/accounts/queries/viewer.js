import gql from "graphql-tag";

export default gql`

query getViewer {
    viewer {
      _id
      firstName
      language
      lastName
      name
      primaryEmailAddress
      adminUIShops {
        _id
        brandAssets {
          navbarBrandImage {
            large
          }
        }
        name
        shopLogoUrls {
          primaryShopLogoUrl
        }
      }
      shopId{
        _id
        name
      }
      role
      phoneNumber
      isProfile
      profile{
        bio
        address
        qualification
        experience
        price
        isStatus
        isApproved
        availableDays
        picture
        categories
        selectedFromTime
        selectedToTime
        certificates
      }
      quizzes{
        quizId
        result
        given_answer
        
      }
    }
  }
  `;