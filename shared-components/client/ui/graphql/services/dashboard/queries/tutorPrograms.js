import gql from "graphql-tag";

export default gql`
query tutorPrograms(
    $type: String
){
    tutorPrograms(
        type: $type
    ){
        _id
        name
        type
        shopId
        createdBy
        createdAt
        field
        program_content
    }
}
`