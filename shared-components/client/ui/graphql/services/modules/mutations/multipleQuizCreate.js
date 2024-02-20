import gql from "graphql-tag";

export default gql`
mutation multipleQuizCreate($input: multipleQuizCreateInput!) {
    multipleQuizCreate(input: $input) {
     _id
    }
  }
  `;