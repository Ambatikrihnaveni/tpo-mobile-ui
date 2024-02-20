import gql from "graphql-tag";

export default gql`
query programs(
    $shopId: ID!
    $type: String
    $query: String
){
    programs(
        shopId: $shopId
        type: $type
        query: $query
    ){
        _id
        name
        type
        shopId
        createdBy
        createdAt
        program_content
        field
        products{
            _id
        }
    }
}
`