import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query ordersByAccountId($accountId:ID!, $role:String) {
    ordersByAccountId(accountId:$accountId,role:$role){
        date
        groupName
        programName
        batchName
        price
        studentData
        isPayment
        instituteName
        transferredPaymentsStatus
        orderId
        manualPayment
        manualPaymentStatus
        studentName
        trainingPartner
        programType
        currencyCode
    }
  }
`;