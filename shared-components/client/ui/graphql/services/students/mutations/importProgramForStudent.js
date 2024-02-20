import gql from "graphql-tag";

export default gql`
  mutation importProgramForStudent($input: ImportProgramForStudentInput!) {
    importProgramForStudent(input: $input) 
  }
`;