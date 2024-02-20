import gql from "graphql-tag";

export default gql`
  mutation createBatch($input: CreateBatchInput!) {
    createBatch(input: $input) {
      batch {
        _id
        shopId
        createdAt
        createdBy
        programId
      }
    }
  }
`;
