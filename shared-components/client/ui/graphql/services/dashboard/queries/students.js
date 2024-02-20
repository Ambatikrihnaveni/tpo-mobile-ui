import gql from "graphql-tag";

export default gql`
  
query students(
    $shopId: ID
    $query: String
) {
students(
    shopId: $shopId
    query: $query
) {
    _id
    emailRecords{
        address
        verified
    }
    profile{
        isStatus
        isApproved
        address
        qualification
        status
        year
        address           
    }
    role
    userId
    isProfile
    name
    phoneNumber
  }
}
`;