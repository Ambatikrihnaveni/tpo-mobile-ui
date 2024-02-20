import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query getTransactions($accountId:ID!, $role:String, $shopId:ID) {
    getTransactions(accountId:$accountId,role:$role,shopId:$shopId){
        date
       transactionId
       instituteName
       amount
       currencyCode
    }
  }
`;