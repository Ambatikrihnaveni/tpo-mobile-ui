import gql from "graphql-tag";
//Student Programs
export default gql`
query studentPrograms($query: String) {
    studentPrograms(query: $query) {
        _id
        name
    }
}`