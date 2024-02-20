import gql from "graphql-tag";

export default gql`
  mutation deleteStudentGroup($input: deleteStudentInput!){
    deleteStudentGroup(input: $input){
    _id
    }
  }
`;
