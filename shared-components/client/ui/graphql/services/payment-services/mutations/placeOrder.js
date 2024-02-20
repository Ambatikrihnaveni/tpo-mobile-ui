import gql from "graphql-tag";

export default gql`
  mutation placeOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
     orders{
      _id
     }
      
    }
  }
`;