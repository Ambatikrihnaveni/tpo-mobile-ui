import gql from "graphql-tag";
export default gql`
mutation createRazorpayOrder($amount: Int!) {
  createRazorpayOrder(amount: $amount) {
    order_id
  }
}
`;