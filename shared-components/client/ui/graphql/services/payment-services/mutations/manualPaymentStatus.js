import gql from "graphql-tag";

export default gql`
  mutation manualPaymentsStatus($input: ManualPaymentStatusInput!) {
    manualPaymentsStatus(input: $input) 
  }
`;