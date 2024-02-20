import gql from "graphql-tag";

export default gql`
  mutation deleteAccount($input: DeleteAccountInput!) {
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
     
    }
  }
`;

