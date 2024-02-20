
import gql from "graphql-tag";

export default gql `

  query quiz($quizId:ID!) {
    quiz(id:$quizId){
        shopId
        productId
        lessonId
        quiz_question
        quiz_answer
        quiz_title
        quiz_options{
          optionA
          optionB
          optionC
          optionD
        }
        quiz_hint
    }
  }
`;
