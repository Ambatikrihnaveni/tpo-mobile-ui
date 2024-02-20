import gql from "graphql-tag";


export default gql`
mutation updateBatch($input: UpdateBatchInput!) {
  updateBatch(input: $input) {
    batch{
      _id
      name
      shopId
      programId
      batchStartTime
      batchEndTime
      createdAt
      createdBy
    }
  }
}
`;