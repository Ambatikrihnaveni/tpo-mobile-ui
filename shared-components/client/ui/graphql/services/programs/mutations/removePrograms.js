import gql from "graphql-tag";

export default gql`
mutation removePrograms($shopId: String,$programIds: [String]){
  removePrograms(shopId: $shopId,programIds:$programIds){
    _id
  }
}
`;
