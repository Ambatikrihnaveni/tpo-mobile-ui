import gql from "graphql-tag";

export default gql`
mutation updateQuiz($input: updateQuizInput!) {
    updateQuiz(input: $input) {
   _id
  }
}
`;
