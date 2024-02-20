import gql from "graphql-tag";

export default gql`
  mutation updateProgram($input: UpdateProgramInput!) {
    updateProgram(input: $input) {
      _id
      type
      shopId
      createdAt
      createdBy
    }
  }
`;