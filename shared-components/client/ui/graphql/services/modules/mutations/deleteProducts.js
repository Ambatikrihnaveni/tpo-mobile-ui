import gql from "graphql-tag";

export default gql`
mutation deleteProducts($productIds: [ID!]){
    deleteProducts(productIds: $productIds){
        _id
    }
}
`;
