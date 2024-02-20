import gql from "graphql-tag";

export default gql`
mutation removeTutors($shopId: ID! $tutorIds: [ID!]) {
    removeTutors(
        shopId: $shopId 
        tutorIds: $tutorIds
    ){
        _id
        name
    }
}
`