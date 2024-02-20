import gql from "graphql-tag";

export default gql`
  mutation removeStudentsFromGroup($input: removeStudentsFromGroupInput!){
    removeStudentsFromGroup(input: $input)
  }
`;
