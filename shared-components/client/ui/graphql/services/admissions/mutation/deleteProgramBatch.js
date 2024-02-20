import gql from "graphql-tag";

export default gql`
  mutation deleteBatch($input: deleteBatchInput!){
    deleteBatch(input: $input){
            batch{
                _id
            }
        }
  }
`;