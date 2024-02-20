import gql from "graphql-tag";

export default gql`
query defaultShops($query: String) {
    defaultShops(query: $query) {
        _id
        name
        programs
    }
}
`