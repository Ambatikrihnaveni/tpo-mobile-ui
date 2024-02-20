import gql from "graphql-tag";

export default gql`
  mutation deleteProduct($input: DeleteProductInput!){
    deleteProduct(input: $input){
        product {
            _id
        }
    }
  }
 
`;
