import gql from "graphql-tag";

export default gql `

  query studentLesson($studentId:ID! ,$lessonId:ID!) {
    studentLesson(studentId:$studentId,lessonId:$lessonId){
        _id
        lessonName
        date
        tutor{
          _id
          name 
          userMedia {
            _id
            URLs {
              thumbnail
              small
            }
            priority
          } 
        }
        quizzes{
           quiz_title
           quiz_question
           quiz_answer
           quiz_hint
           quiz_options{
            optionA
            optionB
            optionC
            optionD
           } 
        }
        assignments{
            _id
            assignment_title
            summary
            time_limit
            time_limit_type
            total_points
            min_pass_points
            productId
            lessonId
            shopId
            createdAt
            createdBy
        }
        quizStatus
        assignmentStatus
        quizScore
        assignmentScore
        totalAssignmentMarks
        totalQuizMarks
    }
  }
`;
