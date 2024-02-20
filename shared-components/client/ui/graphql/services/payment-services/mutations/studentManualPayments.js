import gql from "graphql-tag";

export default gql`
  mutation studentManualPayments($input: StudentManualPaymentsInput!){
    studentManualPayments(input: $input)
  }
 
`;
