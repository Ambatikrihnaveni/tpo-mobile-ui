
import gql from "graphql-tag";

export default gql`
mutation deleteQuiz($input: deleteQuizInput!) {
    deleteQuiz(input: $input) {
   _id
  }
}
`;