import gql from "graphql-tag";

export default gql`
  query tutors() {
    deleteAccount(input: $input) {
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
      role
      shopId
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
      }
    }
  }
`;
