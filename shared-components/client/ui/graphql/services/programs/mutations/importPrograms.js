import gql from "graphql-tag";

export default gql`
  mutation importProgram($input: ImportProgramInput!) {
    importProgram(input: $input)
  }
`;