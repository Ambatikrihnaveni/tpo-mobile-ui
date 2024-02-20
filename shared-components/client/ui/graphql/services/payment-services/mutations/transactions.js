import gql from "graphql-tag";

export default gql`
  mutation transactions($input: TransactionsInput!) {
    transactions(input: $input)
  }
`;