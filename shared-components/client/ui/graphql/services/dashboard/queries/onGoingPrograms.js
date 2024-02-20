import gql from "graphql-tag";

export default gql`
query onGoingPrograms($query: String) {
    onGoingPrograms(query: $query) {
        _id
        name
        program{
            _id
            name
        }
        admins{
            _id
            name
        }
        institute{
            _id
            name
        }
    }
}
`