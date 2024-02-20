import gql from "graphql-tag";

export default gql`
  mutation assignStudentsToBatch($input: assignStudentsToBatchInput!){
    assignStudentsToBatch(input: $input)
  }
 
`;
