import gql from "graphql-tag";

export default gql`
  mutation updateBatch($input: [UpdateBatchInput!]) {
    updateBatch(input: $input) {
      _id
      shopId
      programId
    }
  }
`;