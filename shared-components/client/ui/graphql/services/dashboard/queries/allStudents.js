import gql from "graphql-tag";

export default gql`
query allStudents($query: String) {
    allStudents(query: $query) {
        _id
        name
    }
}
`