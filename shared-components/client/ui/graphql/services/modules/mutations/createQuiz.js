import gql from "graphql-tag";

export default gql`
mutation createQuiz($input: CreateQuizInput!) {
    createQuiz(input: $input) {
   _id
  }
}
`;
