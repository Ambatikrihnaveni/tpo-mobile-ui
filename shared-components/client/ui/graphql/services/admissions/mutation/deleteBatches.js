import gql from "graphql-tag";

export default gql`
mutation deleteBatches($batchIds: [ID!]){
    deleteBatches(batchIds: $batchIds){
        _id
    }
}
`;