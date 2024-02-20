import gql from "graphql-tag";

export default gql`
mutation createAssignment($input: CreateAssignmentInput!) {
    createAssignment(input: $input) {
   _id
  }
}
`;