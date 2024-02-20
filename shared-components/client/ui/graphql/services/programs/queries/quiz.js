import gql from "graphql-tag";

export default gql`
  query getQuiz($quizId:ID!, ) {
    getQuiz(quizId:$quizId, ){
      _id
      quiz_question
      quiz_answer
      quiz_hint
      quiz_title
      quiz_options{
        optionA
        optionB
        optionC
        optionD
      }
    }
  }
`;