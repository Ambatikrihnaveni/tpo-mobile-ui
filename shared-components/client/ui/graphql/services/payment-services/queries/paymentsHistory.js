import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query paymentHistory($accountId:ID!, $startDate:String, $endDate:String, $role:String) {
    paymentHistory(accountId:$accountId,startDate:$startDate, endDate:$endDate, role:$role){
        date
        programName
        type 
        students
        price
        trainingPartner
        groupName
    }
  }
`;