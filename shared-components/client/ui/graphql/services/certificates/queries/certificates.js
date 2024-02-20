import gql from "graphql-tag";

export default gql`
  query certificates($shopId:ID!) {
    certificates(shopId:$shopId){
_id
shopId
templateImage
createdBy
createdAt
}
  }`