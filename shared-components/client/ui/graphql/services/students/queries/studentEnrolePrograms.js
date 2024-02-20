import gql from "graphql-tag";

export default gql`
  query studentEnrolePrograms( $type:String) {
    studentEnrolePrograms(type:$type){
        _id
        name
      }
    }
`;
