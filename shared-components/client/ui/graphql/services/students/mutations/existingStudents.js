import gql from "graphql-tag";

export default gql`
  mutation addExistingStudentsToStudentGroup($input: addExistingStudentsToStudentGroupInput!) {
    addExistingStudentsToStudentGroup(input: $input) 
  }
`;