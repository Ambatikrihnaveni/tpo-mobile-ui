import gql from "graphql-tag";

export default gql`
  mutation createProgram($input: CreateProgramInput!) {
    createProgram(input: $input) {
        _id
        type
        shopId
        createdAt
        createdBy
        field
      
    }
  }
`;
