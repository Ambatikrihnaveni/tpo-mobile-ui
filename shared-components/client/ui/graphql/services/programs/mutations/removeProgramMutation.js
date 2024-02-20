import gql from "graphql-tag";

export default gql`
mutation removeProgram($shopId: String,$programId: [String]){
  removeProgram(shopId: $shopId,programId:$programId){
    _id
  }
}
`;
