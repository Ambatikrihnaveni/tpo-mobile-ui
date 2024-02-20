import gql from "graphql-tag";

export default gql`
  mutation transferredPayments($input: transferredPaymentsInput!) {
    transferredPayments(input: $input) 
  }
`;