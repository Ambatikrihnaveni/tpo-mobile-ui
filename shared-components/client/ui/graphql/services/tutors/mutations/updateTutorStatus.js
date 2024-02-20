import gql from "graphql-tag";

export default gql`
  mutation updateTutorStatus($input: UpdateTutorStatusInput!) {
    updateTutorStatus(input: $input)
  }
`;