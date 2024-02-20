
import gql from "graphql-tag";

export default gql`
mutation deleteAssignment($input: deleteAssignmentInput!) {
    deleteAssignment(input: $input) {
   _id
  }
}
`;