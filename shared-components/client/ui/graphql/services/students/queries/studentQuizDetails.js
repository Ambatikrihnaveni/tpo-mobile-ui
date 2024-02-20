import gql from "graphql-tag";

export default gql`
query studentQuizData($studentId:ID, $lessonId:ID){
    studentQuizData(studentId:$studentId, lessonId:$lessonId){
        quiz{
            quiz_answer
            quiz_title
            quizId
            given_answer
            result
            quiz_hint
            submittedDate
        }
        lessonName
    }
}`