import gql from "graphql-tag";
export default gql`
mutation Payments($input: PaymentsInput!){
    Payments(input:$input){
      orders{
        _id
      }
    }
  }
  `