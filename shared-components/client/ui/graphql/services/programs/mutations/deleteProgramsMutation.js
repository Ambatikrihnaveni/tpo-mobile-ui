import gql from "graphql-tag";

export default gql`
mutation deletePrograms($programIds:[ID!]){
    deletePrograms(programIds:$programIds){
        _id
    }
}
`;
