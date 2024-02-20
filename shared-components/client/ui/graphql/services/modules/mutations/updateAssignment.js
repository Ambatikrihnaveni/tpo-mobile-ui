import gql from "graphql-tag";

export default gql`
mutation updateAssignment($input: UpdateAssignmentInput!) {
    updateAssignment(input: $input) {
   assignment_title
  }
}
`;