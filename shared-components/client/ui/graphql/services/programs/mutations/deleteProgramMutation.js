import gql from "graphql-tag";

export default gql`
  mutation deleteProgram($input: deleteProgramInput!){
    deleteProgram(input: $input){
            _id
        }
  }
 
`;
