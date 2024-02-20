import gql from "graphql-tag";

export default gql`
mutation removeCertificate($id:ID! $shopId:ID!){
    removeCertificate(id:$id shopId:$shopId){
    _id
    }
}`